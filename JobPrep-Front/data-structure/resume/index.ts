// Entities
export * from './entities/User';
export * from './entities/Resume';
export * from './entities/ResumeAnalysis';
export * from './entities/ResumeGeneration';

// Repositories
export * from './repositories/UserRepository';
export * from './repositories/ResumeRepository';
export * from './repositories/ResumeAnalysisRepository';

// Services
export * from './services/ResumeGenerationService';
export * from './services/ResumeAnalyticsService';

// Re-export commonly used types
export type {
  // User types
  User,
  UserProfile,
  PersonalInfo,
  Experience,
  Education,
  Skills,
  TechnicalSkill,
  Language,
  Certification,
  Project,

  // Resume types
  Resume,
  ResumeContent,
  ResumeTemplate,
  ResumeStyle,
  ResumeAnalytics,
  ResumeAIAnalysis,

  // Analysis types
  ResumeAnalysis,
  AnalysisResults,
  AnalysisRecommendation,
  KeywordAnalysisResult,
  ATSCompatibilityResult,

  // Generation types
  ResumeGenerationRequest,
  ResumeGenerationResult,
  GenerationStep,
  QualityMetrics,

  // Service interfaces
  UserRepository,
  ResumeRepository,
  ResumeAnalysisRepository,
  ResumeGenerationService,
  ResumeAnalyticsService,
} from './entities/User';
