// Entities
export * from './entities/User';
export * from './entities/JobOffer';
export * from './entities/MotivationLetter';
export * from './entities/FollowUpLetter';
export * from './entities/LetterGeneration';

// Repositories
export * from './repositories/UserRepository';
export * from './repositories/MotivationLetterRepository';
export * from './repositories/FollowUpLetterRepository';

// Services
export * from './services/LetterGenerationService';
export * from './services/LetterAnalyticsService';

// Re-export commonly used types
export type {
  // User types
  User,
  UserProfile,
  UserPreferences,

  // Job types
  JobOffer,
  Company,

  // Letter types
  MotivationLetter,
  FollowUpLetter,
  Application,

  // Generation types
  LetterGenerationRequest,
  LetterGenerationResult,
  GenerationStep,
  QualityMetrics,

  // Service interfaces
  UserRepository,
  MotivationLetterRepository,
  FollowUpLetterRepository,
  LetterGenerationService,
  LetterAnalyticsService,
} from './entities/User';
