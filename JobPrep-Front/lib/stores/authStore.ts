import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api, API_ENDPOINTS } from '../api';
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ApiError,
} from '../api';
import Cookies from 'js-cookie';

interface AuthState {
  // État
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Fonction pour gérer les tokens dans les cookies et le localStorage
const setTokens = (token: string | null, refreshToken: string | null) => {
  if (token) {
    Cookies.set('auth_token', token, { secure: true, sameSite: 'strict' });
    localStorage.setItem('auth_token', token);
  } else {
    Cookies.remove('auth_token');
    localStorage.removeItem('auth_token');
  }

  if (refreshToken) {
    Cookies.set('refresh_token', refreshToken, { secure: true, sameSite: 'strict' });
    localStorage.setItem('refresh_token', refreshToken);
  } else {
    Cookies.remove('refresh_token');
    localStorage.removeItem('refresh_token');
  }
};

// Créer un storage personnalisé pour gérer la suppression complète
const customStorage = {
  ...createJSONStorage(() => localStorage),
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    // Supprimer les tokens des cookies et du localStorage
    setTokens(null, null);
  },
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    try {
      const data = JSON.parse(str);
      // Vérifier si les tokens existent toujours dans localStorage/cookies
      const localToken = localStorage.getItem('auth_token');
      const cookieToken = Cookies.get('auth_token');
      if (!localToken && !cookieToken) {
        localStorage.removeItem(name);
        return null;
      }
      return str;
    } catch {
      return null;
    }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // État initial
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post<AuthResponse | any>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials
          );
          const payload: any = (response.data as any)?.data ?? response.data;
          const token: string = payload.token || payload.access_token;
          const refreshToken: string | null = payload.refreshToken || null;

          // Sauvegarder les tokens
          setTokens(token, refreshToken);

          // Récupérer le profil utilisateur
          const profileResponse = await api.get(API_ENDPOINTS.AUTH.PROFILE);
          const user = profileResponse.data;

          set({
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          setTokens(null, null);
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: apiError.message,
          });
          throw error;
        }
      },

      // Register
      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post<AuthResponse | any>(
            API_ENDPOINTS.AUTH.REGISTER,
            userData
          );
          
          // Adapter la réponse au nouveau format de l'API
          const payload = response.data;
          const token = payload.access_token;
          const refreshToken = payload.refresh_token || null;

          // Sauvegarder les tokens
          setTokens(token, refreshToken);

          // Récupérer le profil utilisateur
          const profileResponse = await api.get(API_ENDPOINTS.AUTH.PROFILE);
          const user = profileResponse.data;

          set({
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          setTokens(null, null);
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: apiError.message,
          });
          throw error;
        }
      },

      // Fetch Profile
      fetchProfile: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
          const user = response.data;

          set({
            user,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message,
          });
          throw error;
        }
      },

      // Logout
      logout: () => {
        // Appeler l'endpoint de logout si nécessaire
        api.post(API_ENDPOINTS.AUTH.LOGOUT).catch(() => {
          // Ignorer les erreurs de logout
        });

        // Nettoyer les tokens
        setTokens(null, null);

        // Nettoyer le state et le storage
        set(
          {
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          },
          true // Forcer la mise à jour du storage persistant
        );

        // Nettoyer le localStorage via notre storage personnalisé
        customStorage.removeItem('auth-storage');

        // Rediriger vers la page de connexion
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },

      // Refresh token
      refreshAuthToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const response = await api.post<AuthResponse | any>(
            API_ENDPOINTS.AUTH.REFRESH,
            {
              refreshToken,
            }
          );
          const payload: any = (response.data as any)?.data ?? response.data;
          const token: string = payload.token || payload.access_token;
          const newRefreshToken: string | null = payload.refreshToken || null;

          // Sauvegarder les nouveaux tokens
          setTokens(token, newRefreshToken);

          // Récupérer le profil utilisateur
          const profileResponse = await api.get(API_ENDPOINTS.AUTH.PROFILE);
          const user = profileResponse.data;

          set({
            user,
            token,
            refreshToken: newRefreshToken,
            isAuthenticated: true,
          });
        } catch (error) {
          // Si le refresh échoue, déconnecter l'utilisateur
          get().logout();
          throw error;
        }
      },

      // Update profile
      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.put<User>(
            API_ENDPOINTS.AUTH.PROFILE,
            userData
          );
          const updatedUser = response.data;

          set({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message,
          });
          throw error;
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Set loading
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: customStorage,
      partialize: state => ({
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Vérifier si les tokens existent toujours
        const localToken = localStorage.getItem('auth_token');
        const cookieToken = Cookies.get('auth_token');
        
        if (state) {
          if (!localToken && !cookieToken) {
            // Si les tokens n'existent plus, réinitialiser l'état
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
          } else {
            // Si au moins un token existe, s'assurer que l'état est correctement défini
            state.token = localToken || cookieToken;
            state.isAuthenticated = true;
            // Tenter de récupérer le profil utilisateur
            api.get(API_ENDPOINTS.AUTH.PROFILE)
              .then(response => {
                useAuthStore.setState({ user: response.data });
              })
              .catch(() => {
                // En cas d'erreur, réinitialiser l'état
                useAuthStore.setState({
                  token: null,
                  refreshToken: null,
                  isAuthenticated: false,
                  user: null
                });
                setTokens(null, null);
              });
          }
        }
      },
    }
  )
);

// Sélecteurs utiles
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
  };
};

export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    login: store.login,
    register: store.register,
    logout: store.logout,
    updateProfile: store.updateProfile,
    fetchProfile: store.fetchProfile,
    clearError: store.clearError,
  };
};