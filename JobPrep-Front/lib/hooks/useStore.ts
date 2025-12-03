'use client';

import { useCallback } from 'react';
import {
  useAppStore,
  useAppSettings,
  useNotifications,
  useGlobalLoading,
  useSidebar,
} from '../stores/appStore';
import { useAuthStore, useAuth, useAuthActions } from '../stores/authStore';
import {
  useUserStore,
  useUserProfile,
  useMotivationLetters,
  useFollowUpLetters,
  useResumes,
  useTests,
  useSpeechSessions,
} from '../stores/userStore';

// Hook utilitaire pour combiner plusieurs stores
export function useAppState() {
  const auth = useAuthStore();
  const app = useAppStore();
  const user = useUserStore();

  return {
    auth,
    app,
    user,
  };
}

// Hook pour les actions globales
export function useAppActions() {
  const { addNotification, setGlobalLoading } = useAppStore();
  const { logout } = useAuthStore();
  const { clearErrors, clearData } = useUserStore();

  // Action pour déconnecter et nettoyer l'état
  const logoutAndClear = useCallback(() => {
    logout();
    clearData();
    clearErrors();

    addNotification({
      type: 'info',
      title: 'Déconnexion',
      message: 'Vous avez été déconnecté avec succès.',
    });
  }, [logout, clearData, clearErrors, addNotification]);

  // Action pour gérer les erreurs globales
  const handleGlobalError = useCallback(
    (error: any, context?: string) => {
      const errorMessage =
        error?.message ||
        error?.response?.data?.message ||
        'Une erreur inattendue est survenue';

      addNotification({
        type: 'error',
        title: 'Erreur',
        message: context ? `${context}: ${errorMessage}` : errorMessage,
      });

      // Log l'erreur pour le debugging
      console.error('Global Error:', { error, context });
    },
    [addNotification]
  );

  // Action pour gérer les succès globaux
  const handleGlobalSuccess = useCallback(
    (message: string, context?: string) => {
      addNotification({
        type: 'success',
        title: 'Succès',
        message: context ? `${context}: ${message}` : message,
      });
    },
    [addNotification]
  );

  return {
    logoutAndClear,
    handleGlobalError,
    handleGlobalSuccess,
    addNotification,
    setGlobalLoading,
  };
}

// Hook pour l'initialisation de l'application
export function useAppInitialization() {
  const { isAuthenticated, token, fetchProfile } = useAuthStore();
  const { setTheme } = useAppStore();

  const initializeApp = useCallback(async () => {
    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('app-theme') as
      | 'light'
      | 'dark'
      | 'system';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Si l'utilisateur est authentifié, récupérer son profil
    if (isAuthenticated && token) {
      try {
        await fetchProfile();
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // Si le profil ne peut pas être récupéré, déconnecter l'utilisateur
        useAuthStore.getState().logout();
      }
    }
  }, [isAuthenticated, token, setTheme, fetchProfile]);

  return {
    initializeApp,
  };
}

// Hook pour les permissions et autorisations
export function usePermissions() {
  const { user } = useAuthStore();

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;

      // Logique simple basée sur le rôle
      // Vous pouvez étendre cela avec un système de permissions plus complexe
      switch (user.role) {
        case 'admin':
          return true; // Admin a tous les droits
        case 'user':
          // Définir les permissions pour les utilisateurs normaux
          const userPermissions = [
            'read:profile',
            'write:profile',
            'read:letters',
            'write:letters',
          ];
          return userPermissions.includes(permission);
        default:
          return false;
      }
    },
    [user]
  );

  const hasRole = useCallback(
    (role: string | string[]): boolean => {
      if (!user) return false;

      if (Array.isArray(role)) {
        return role.includes(user.role);
      }

      return user.role === role;
    },
    [user]
  );

  const isAdmin = useCallback((): boolean => {
    return hasRole('admin');
  }, [hasRole]);

  const isUser = useCallback((): boolean => {
    return hasRole('user');
  }, [hasRole]);

  return {
    hasPermission,
    hasRole,
    isAdmin,
    isUser,
    user,
  };
}

// Hook pour les statistiques et métriques
export function useAppMetrics() {
  const { user } = useAuthStore();
  const { notifications } = useAppStore();
  const { motivationLetters, followUpLetters, resumes, tests, speechSessions } =
    useUserStore();

  const getMetrics = useCallback(() => {
    return {
      user: {
        totalNotifications: notifications.length,
        unreadNotifications: notifications.filter(n => !n.read).length,
      },
      content: {
        totalMotivationLetters: motivationLetters.length,
        totalFollowUpLetters: followUpLetters.length,
        totalResumes: resumes.length,
        totalTests: tests.length,
        totalSpeechSessions: speechSessions.length,
      },
      progress: {
        completedTests: tests.filter(t => t.completedAt).length,
        totalTests: tests.length,
        testCompletionRate:
          tests.length > 0
            ? (tests.filter(t => t.completedAt).length / tests.length) * 100
            : 0,
      },
    };
  }, [
    notifications,
    motivationLetters,
    followUpLetters,
    resumes,
    tests,
    speechSessions,
  ]);

  return {
    getMetrics,
  };
}

// Hook pour la gestion des préférences utilisateur
export function useUserPreferences() {
  const { theme, language, sidebarCollapsed } = useAppStore();
  const { setTheme, setLanguage, setSidebarCollapsed } = useAppStore();

  const updateTheme = useCallback(
    (newTheme: 'light' | 'dark' | 'system') => {
      setTheme(newTheme);
      localStorage.setItem('app-theme', newTheme);
    },
    [setTheme]
  );

  const updateLanguage = useCallback(
    (newLanguage: 'fr' | 'en') => {
      setLanguage(newLanguage);
      localStorage.setItem('app-language', newLanguage);
    },
    [setLanguage]
  );

  const updateSidebarState = useCallback(
    (collapsed: boolean) => {
      setSidebarCollapsed(collapsed);
      localStorage.setItem('sidebar-collapsed', collapsed.toString());
    },
    [setSidebarCollapsed]
  );

  const resetPreferences = useCallback(() => {
    updateTheme('system');
    updateLanguage('fr');
    updateSidebarState(false);
  }, [updateTheme, updateLanguage, updateSidebarState]);

  return {
    theme,
    language,
    sidebarCollapsed,
    updateTheme,
    updateLanguage,
    updateSidebarState,
    resetPreferences,
  };
}

// Hook pour la synchronisation des données
export function useDataSync() {
  const { fetchProfile } = useAuthStore();
  const {
    fetchMotivationLetters,
    fetchFollowUpLetters,
    fetchResumes,
    fetchTests,
    fetchSpeechSessions,
  } = useUserStore();
  const { setGlobalLoading } = useAppStore();

  const syncAllData = useCallback(async () => {
    setGlobalLoading(true, 'Synchronisation des données...');

    try {
      await Promise.all([
        fetchProfile(),
        fetchMotivationLetters(),
        fetchFollowUpLetters(),
        fetchResumes(),
        fetchTests(),
        fetchSpeechSessions(),
      ]);
    } catch (error) {
      console.error('Data sync failed:', error);
      throw error;
    } finally {
      setGlobalLoading(false);
    }
  }, [
    fetchProfile,
    fetchMotivationLetters,
    fetchFollowUpLetters,
    fetchResumes,
    fetchTests,
    fetchSpeechSessions,
    setGlobalLoading,
  ]);

  const syncUserData = useCallback(async () => {
    setGlobalLoading(true, 'Synchronisation du profil...');

    try {
      await fetchProfile();
    } catch (error) {
      console.error('User data sync failed:', error);
      throw error;
    } finally {
      setGlobalLoading(false);
    }
  }, [fetchProfile, setGlobalLoading]);

  return {
    syncAllData,
    syncUserData,
  };
}

// Re-export des hooks des stores pour faciliter l'import
export {
  // AppStore hooks
  useAppSettings,
  useNotifications,
  useGlobalLoading,
  useSidebar,

  // AuthStore hooks
  useAuth,
  useAuthActions,

  // UserStore hooks
  useUserProfile,
  useMotivationLetters,
  useFollowUpLetters,
  useResumes,
  useTests,
  useSpeechSessions,
};