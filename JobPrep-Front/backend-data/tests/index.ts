// Entities
export * from './entities/User';
export * from './entities/Test';
export * from './entities/HardSkillsTest';
export * from './entities/SoftSkillsTest';
export * from './entities/LanguageSkillsTest';
export * from './entities/PersonalityTest';
export * from './entities/HRInterviewTest';

// Repositories
export * from './repositories/TestRepository';
export * from './repositories/UserTestRepository';

// Services
export * from './services/TestAnalyticsService';
export * from './services/TestGenerationService';

// Re-export commonly used types
export type {
  // User types
  User,
  UserTestProfile,
  UserSkillLevel,
  TestPreferences,
  LearningGoal,
  UserAchievement,
  TestCertification,
  ProgressTracking,

  // Test types
  Test,
  Question,
  TestSession,
  TestResult,
  TestAnswer,

  // Hard Skills types
  HardSkillsTest,
  TechnicalScore,
  CodeQualityAnalysis,
  ProblemSolvingAnalysis,

  // Soft Skills types
  SoftSkillsTest,
  CompetencyScore,
  BehavioralAnalysis,
  EmotionalIntelligenceAnalysis,

  // Language Skills types
  LanguageSkillsTest,
  LanguageSkillBreakdown,
  LinguisticAnalysis,
  CommunicativeCompetence,

  // Personality types
  PersonalityTest,
  PersonalityProfile,
  DimensionScore,
  CareerImplications,

  // HR Interview types
  HRInterviewTest,
  InterviewPerformance,
  InterviewCommunicationAnalysis,
  CompetencyEvaluation,

  // Service interfaces
  TestRepository,
  UserTestRepository,
  TestAnalyticsService,
  TestGenerationService,
} from './entities/User';
