import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, ApiError } from './types';

// Configuration de base
// Align with backend default (Nest global prefix api/v1 on port 3001)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
const API_TIMEOUT = 10000; // 10 secondes

// Instance Axios centralisée
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interface pour les options de requête étendues
export interface ApiRequestOptions extends AxiosRequestConfig {
  showLoading?: boolean;
  showError?: boolean;
  retryCount?: number;
}

// Store pour gérer l'état global des requêtes
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// Fonction pour traiter la queue des requêtes échouées
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Interceptor pour les requêtes sortantes
apiClient.interceptors.request.use(
  config => {
    // Ajouter le token d'authentification si disponible
    // 1) Try localStorage
    let token: string | null = null;
    try {
      token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    } catch (_) {}

    // 2) Fallback to cookies if not in localStorage
    if (!token && typeof document !== 'undefined') {
      try {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const authCookie = cookies.find(c => c.startsWith('auth_token='));
        if (authCookie) token = decodeURIComponent(authCookie.split('=')[1]);
      } catch (_) {}
    }

    // Only set Authorization if not already explicitly provided
    if (token && !config.headers?.Authorization) {
      if (!config.headers) config.headers = {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    // Ajouter un timestamp pour éviter le cache
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // Log des requêtes en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor pour les réponses entrantes
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Log des réponses en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }

    // Retourner directement les données si la structure est correcte
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log des erreurs
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `❌ API Error: ${error.response?.status} ${originalRequest.url}`,
        error.response?.data
      );
    }

    // Gestion du token expiré (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Si un refresh est en cours, mettre en queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
            {
              refreshToken,
            }
          );

          const { token, refreshToken: newRefreshToken } = response.data.data;

          localStorage.setItem('auth_token', token);
          localStorage.setItem('refresh_token', newRefreshToken);

          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          processQueue(null, token);

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Rediriger vers la page de login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Gestion des autres erreurs
    const apiError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        'Une erreur est survenue',
      status: error.response?.status || 500,
      code: error.response?.data?.code,
      details: error.response?.data?.details,
    };

    // Afficher les erreurs globales si nécessaire
    if (originalRequest.showError !== false) {
      // Ici vous pouvez intégrer votre système de notifications
      // toast.error(apiError.message);
    }

    return Promise.reject(apiError);
  }
);

// Fonctions utilitaires pour les requêtes
export const api = {
  // GET
  get: <T = any>(
    url: string,
    options?: ApiRequestOptions
  ): Promise<AxiosResponse<ApiResponse<T>>> => apiClient.get(url, options),

  // POST
  post: <T = any>(
    url: string,
    data?: any,
    options?: ApiRequestOptions
  ): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.post(url, data, options),

  // PUT
  put: <T = any>(
    url: string,
    data?: any,
    options?: ApiRequestOptions
  ): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.put(url, data, options),

  // PATCH
  patch: <T = any>(
    url: string,
    data?: any,
    options?: ApiRequestOptions
  ): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.patch(url, data, options),

  // DELETE
  delete: <T = any>(
    url: string,
    options?: ApiRequestOptions
  ): Promise<AxiosResponse<ApiResponse<T>>> => apiClient.delete(url, options),

  // UPLOAD (pour les fichiers)
  upload: <T = any>(
    url: string,
    formData: FormData,
    options?: ApiRequestOptions
  ): Promise<AxiosResponse<ApiResponse<T>>> =>
    apiClient.post(url, formData, {
      ...options,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...options?.headers,
      },
    }),
};

// Export de l'instance pour usage direct si nécessaire
export default apiClient;
