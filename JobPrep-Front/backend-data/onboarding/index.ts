// Entities
export * from './entities/User';
export * from './entities/OnboardingFlow';
export * from './entities/OnboardingContent';

// Repositories
export * from './repositories/OnboardingRepository';
export * from './repositories/OnboardingAnalyticsRepository';

// Services
export * from './services/OnboardingService';

// Re-export commonly used types
export type {
  // User types
  User,
  OnboardingProfile,
  OnboardingStatus,
  OnboardingPersonalInfo,
  OnboardingProfessionalInfo,
  OnboardingPreferences,
  OnboardingGoal,
  OnboardingAssessment,
  OnboardingUpload,
  OnboardingAnalytics,
  OnboardingFeedback,

  // Flow types
  OnboardingFlow,
  OnboardingTemplate,
  OnboardingStep,
  FlowStep,
  StepComponent,
  FlowBranching,
  FlowPersonalization,
  FlowAnalytics,
  FlowSettings,

  // Session types
  OnboardingSession,
  SessionData,
  StepHistory,
  SessionMetadata,
  SessionAnalytics,

  // Content types
  OnboardingContent,
  ContentBlock,
  ContentMetadata,
  ContentTargeting,
  ContentScheduling,
  ContentAnalytics,
  OnboardingTip,
  OnboardingNotification,

  // Experiment types
  OnboardingExperiment,
  ExperimentVariant,
  ExperimentTargeting,
  ExperimentMetric,
  ExperimentSettings,
  ExperimentResults,

  // Service interfaces
  OnboardingRepository,
  OnboardingAnalyticsRepository,
  OnboardingService,
  OnboardingAnalyticsService,
  OnboardingOptimizationService,
} from './entities/User';
