import { useState, useCallback, useRef, useEffect } from 'react';
import { api, ApiRequestOptions } from '../api';
import { useAppStore } from '../stores/appStore';
import type { AxiosResponse, AxiosError } from 'axios';
import type { ApiResponse, ApiError } from '../api';

// Hook pour les appels API avec gestion d'état
export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification, setGlobalLoading } = useAppStore();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fonction générique pour les requêtes
  const request = useCallback(
    async (
      apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
      options?: ApiRequestOptions
    ): Promise<T | null> => {
      // Annuler la requête précédente si elle existe
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Créer un nouveau AbortController
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      // Afficher le loading global si demandé
      if (options?.showLoading !== false) {
        setGlobalLoading(true, options.loadingMessage);
      }

      try {
        const response = await apiCall();
        const result = response.data.data;

        setData(result);

        // Afficher une notification de succès si demandé
        if (options?.showSuccess !== false && response.data.message) {
          addNotification({
            type: 'success',
            title: 'Succès',
            message: response.data.message,
          });
        }

        return result;
      } catch (err) {
        const error = err as AxiosError<ApiError>;
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Une erreur est survenue';

        setError(errorMessage);

        // Afficher une notification d'erreur si demandé
        if (options?.showError !== false) {
          addNotification({
            type: 'error',
            title: 'Erreur',
            message: errorMessage,
          });
        }

        throw error;
      } finally {
        setLoading(false);
        setGlobalLoading(false);
        abortControllerRef.current = null;
      }
    },
    [addNotification, setGlobalLoading]
  );

  // Fonctions spécifiques pour les méthodes HTTP
  const get = useCallback(
    (url: string, options?: ApiRequestOptions) =>
      request(
        () =>
          api.get<T>(url, {
            ...options,
            signal: abortControllerRef.current?.signal,
          }),
        options
      ),
    [request]
  );

  const post = useCallback(
    (url: string, data?: any, options?: ApiRequestOptions) =>
      request(
        () =>
          api.post<T>(url, data, {
            ...options,
            signal: abortControllerRef.current?.signal,
          }),
        options
      ),
    [request]
  );

  const put = useCallback(
    (url: string, data?: any, options?: ApiRequestOptions) =>
      request(
        () =>
          api.put<T>(url, data, {
            ...options,
            signal: abortControllerRef.current?.signal,
          }),
        options
      ),
    [request]
  );

  const patch = useCallback(
    (url: string, data?: any, options?: ApiRequestOptions) =>
      request(
        () =>
          api.patch<T>(url, data, {
            ...options,
            signal: abortControllerRef.current?.signal,
          }),
        options
      ),
    [request]
  );

  const del = useCallback(
    (url: string, options?: ApiRequestOptions) =>
      request(
        () =>
          api.delete<T>(url, {
            ...options,
            signal: abortControllerRef.current?.signal,
          }),
        options
      ),
    [request]
  );

  const upload = useCallback(
    (url: string, formData: FormData, options?: ApiRequestOptions) =>
      request(
        () =>
          api.upload<T>(url, formData, {
            ...options,
            signal: abortControllerRef.current?.signal,
          }),
        options
      ),
    [request]
  );

  // Fonction pour réinitialiser l'état
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Nettoyer à la destruction du composant
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    request,
    reset,
  };
}

// Hook spécialisé pour les mutations (POST, PUT, DELETE)
export function useMutation<T = any, V = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification, setGlobalLoading } = useAppStore();
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutate = useCallback(
    async (
      apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
      options?: ApiRequestOptions & {
        onSuccess?: (data: T) => void;
        onError?: (error: ApiError) => void;
        successMessage?: string;
      }
    ): Promise<T | null> => {
      // Annuler la requête précédente si elle existe
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      if (options?.showLoading !== false) {
        setGlobalLoading(true, options.loadingMessage);
      }

      try {
        const response = await apiCall();
        const result = response.data.data;

        // Appeler le callback de succès
        options?.onSuccess?.(result);

        // Afficher une notification de succès
        const successMessage =
          options?.successMessage ||
          response.data.message ||
          'Opération réussie';
        if (options?.showSuccess !== false && successMessage) {
          addNotification({
            type: 'success',
            title: 'Succès',
            message: successMessage,
          });
        }

        return result;
      } catch (err) {
        const error = err as AxiosError<ApiError>;
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Une erreur est survenue';

        setError(errorMessage);

        // Appeler le callback d'erreur
        options?.onError?.(error.response?.data || error);

        // Afficher une notification d'erreur
        if (options?.showError !== false) {
          addNotification({
            type: 'error',
            title: 'Erreur',
            message: errorMessage,
          });
        }

        throw error;
      } finally {
        setLoading(false);
        setGlobalLoading(false);
        abortControllerRef.current = null;
      }
    },
    [addNotification, setGlobalLoading]
  );

  // Nettoyer à la destruction du composant
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    mutate,
    loading,
    error,
  };
}

// Hook pour les requêtes avec retry automatique
export function useApiWithRetry<T = any>(
  maxRetries: number = 3,
  retryDelay: number = 1000
) {
  const {
    data,
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    reset,
  } = useApi<T>();

  const retryRequest = useCallback(
    async (
      apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
      options?: ApiRequestOptions
    ): Promise<T | null> => {
      let lastError: any;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await apiCall();
          return response.data.data;
        } catch (err) {
          lastError = err;

          // Si ce n'est pas la dernière tentative, attendre avant de réessayer
          if (attempt < maxRetries) {
            await new Promise(resolve =>
              setTimeout(resolve, retryDelay * attempt)
            );
          }
        }
      }

      throw lastError;
    },
    [maxRetries, retryDelay]
  );

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    retryRequest,
    reset,
  };
}

// Hook pour les requêtes en arrière-plan
export function useBackgroundApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiCall();
        const result = response.data.data;
        setData(result);
        return result;
      } catch (err) {
        const error = err as AxiosError<ApiError>;
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Une erreur est survenue';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    request,
  };
}
