import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // État de l'interface
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';

  // État des notifications
  notifications: Notification[];
  unreadCount: number;

  // État de chargement global
  globalLoading: boolean;
  loadingMessage: string | null;

  // Actions pour l'interface
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'fr' | 'en') => void;

  // Actions pour les notifications
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;

  // Actions pour le chargement global
  setGlobalLoading: (loading: boolean, message?: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  autoClose?: boolean;
  duration?: number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // État initial
      sidebarCollapsed: false,
      theme: 'system',
      language: 'fr',
      notifications: [],
      unreadCount: 0,
      globalLoading: false,
      loadingMessage: null,

      // Toggle sidebar
      toggleSidebar: () => {
        set(state => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        }));
      },

      // Set sidebar collapsed
      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
      },

      // Set theme
      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });

        // Appliquer le thème au DOM
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          // System theme
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches;
          if (prefersDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },

      // Set language
      setLanguage: (language: 'fr' | 'en') => {
        set({ language });
        // Ici vous pourriez déclencher un changement de langue dans votre i18n
      },

      // Add notification
      addNotification: (
        notification: Omit<Notification, 'id' | 'timestamp'>
      ) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
        };

        set(state => {
          const notifications = [newNotification, ...state.notifications];
          const unreadCount = notifications.filter(n => !n.read).length;

          return {
            notifications,
            unreadCount,
          };
        });

        // Auto-close si configuré
        if (newNotification.autoClose !== false) {
          const duration = newNotification.duration || 5000;
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, duration);
        }
      },

      // Remove notification
      removeNotification: (id: string) => {
        set(state => {
          const notifications = state.notifications.filter(n => n.id !== id);
          const unreadCount = notifications.filter(n => !n.read).length;

          return {
            notifications,
            unreadCount,
          };
        });
      },

      // Mark as read
      markAsRead: (id: string) => {
        set(state => {
          const notifications = state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          );
          const unreadCount = notifications.filter(n => !n.read).length;

          return {
            notifications,
            unreadCount,
          };
        });
      },

      // Mark all as read
      markAllAsRead: () => {
        set(state => {
          const notifications = state.notifications.map(n => ({
            ...n,
            read: true,
          }));

          return {
            notifications,
            unreadCount: 0,
          };
        });
      },

      // Clear all notifications
      clearAllNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0,
        });
      },

      // Set global loading
      setGlobalLoading: (loading: boolean, message?: string) => {
        set({
          globalLoading: loading,
          loadingMessage: message || null,
        });
      },
    }),
    {
      name: 'app-storage',
      partialize: state => ({
        // Persister les préférences utilisateur
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);

// Sélecteurs utiles
export const useAppSettings = () => {
  const store = useAppStore();
  return {
    sidebarCollapsed: store.sidebarCollapsed,
    theme: store.theme,
    language: store.language,
  };
};

export const useNotifications = () => {
  const store = useAppStore();
  return {
    notifications: store.notifications,
    unreadCount: store.unreadCount,
    addNotification: store.addNotification,
    removeNotification: store.removeNotification,
    markAsRead: store.markAsRead,
    markAllAsRead: store.markAllAsRead,
    clearAllNotifications: store.clearAllNotifications,
  };
};

export const useGlobalLoading = () => {
  const store = useAppStore();
  return {
    globalLoading: store.globalLoading,
    loadingMessage: store.loadingMessage,
    setGlobalLoading: store.setGlobalLoading,
  };
};

export const useSidebar = () => {
  const store = useAppStore();
  return {
    sidebarCollapsed: store.sidebarCollapsed,
    toggleSidebar: store.toggleSidebar,
    setSidebarCollapsed: store.setSidebarCollapsed,
  };
};
