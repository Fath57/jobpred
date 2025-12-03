// Export central de tous les hooks
export * from './useApi';
export * from './useStore';

// Re-export des hooks les plus utilisés pour faciliter l'import
export {
  useApi,
  useMutation,
  useApiWithRetry,
  useBackgroundApi,
} from './useApi';

export {
  // Hooks utilitaires
  useAppState,
  useAppActions,
  useAppInitialization,
  usePermissions,
  useAppMetrics,
  useUserPreferences,
  useDataSync,

  // Hooks des stores (re-exportés)
  useAppSettings,
  useNotifications,
  useGlobalLoading,
  useSidebar,
  useAuth,
  useAuthActions,
  useUserProfile,
  useMotivationLetters,
  useFollowUpLetters,
  useResumes,
  useTests,
  useSpeechSessions,
} from './useStore';
