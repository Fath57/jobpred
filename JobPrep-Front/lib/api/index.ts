// Export central de l'API
export { api, apiClient } from './client';
export { API_ENDPOINTS } from './endpoints';
export type * from './types';

// Re-export des types les plus utilisés
export type {
  ApiResponse,
  ApiError,
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  MotivationLetter,
  FollowUpLetter,
  Resume,
  ResumeAnalysis,
  Test,
  SpeechSession,
  SpeechFeedback,
  PaginationParams,
  PaginatedResponse,
} from './types';
