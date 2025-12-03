// Export central de tous les stores
export { useAuthStore, useAuth, useAuthActions } from './authStore';
export {
  useAppStore,
  useAppSettings,
  useNotifications,
  useGlobalLoading,
  useSidebar,
} from './appStore';
export {
  useUserStore,
  useUserProfile,
  useMotivationLetters,
  useFollowUpLetters,
  useResumes,
  useTests,
  useSpeechSessions,
} from './userStore';
export { usePricingStore } from './pricingStore';


export { useOnboardingStore, useOnboarding, useOnboardingActions } from './onboardingStore';

// Re-export des types si nécessaire
export type { User, AuthResponse, LoginRequest, RegisterRequest, Option, Pack, CreateOptionDto, CreatePackDto } from '../api';
//export type { Notification } from './appStore';
