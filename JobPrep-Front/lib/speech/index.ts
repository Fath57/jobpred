// Index file for speech domain
export { speechSoftSkillsData } from './speechSoftSkillsData';
export { speechHardSkillsData } from './speechHardSkillsData';
export { speechLanguageSkillsData } from './speechLanguageSkillsData';
export { speechPersonalitySkillsData } from './speechPersonalitySkillsData';
export { speechTestFeedbackData } from './speechTestFeedbackData';
export { speechHrInterviewPrepData } from './speechHrInterviewPrepData';

// Re-export types for easier imports
export type {
  CallSession,
  VoiceAnalysis,
  InterviewQuestion,
  SessionReport,
  AvailableSlot,
  UserProgress,
} from './speechSoftSkillsData';

export type {
  TechnicalCallSession,
  TechnicalVoiceAnalysis,
  TechnicalQuestion,
  TechnicalSessionReport,
  TechnicalDomain,
  UserTechnicalProgress,
} from './speechHardSkillsData';

export type {
  LanguageCallSession,
  LanguageVoiceAnalysis,
  LanguageSessionReport,
  Language,
  SkillFocusArea,
  LanguageInterviewer,
  LanguageSlot,
  UserLanguageProgress,
} from './speechLanguageSkillsData';

export type {
  PersonalityCallSession,
  PersonalityVoiceAnalysis,
  PersonalitySessionReport,
  PersonalityFramework,
  AssessmentType,
  PersonalityInterviewer,
  PersonalitySlot,
  UserPersonalityProgress,
} from './speechPersonalitySkillsData';

export type {
  SpeechTestPerformance,
  SpeechCategoryInsight,
  VoiceSkillGap,
  VoiceCareerReadiness,
  RecommendedVoiceTest,
  VoicePersonalizedInsight,
  VoiceProgressEvolution,
  VoiceBenchmarkComparison,
  VoiceAnalysisSummary,
  SpeechTestFeedbackData,
} from './speechTestFeedbackData';

export type {
  HrCallSession,
  HrVoiceAnalysis,
  HrInterviewQuestion,
  HrSessionReport,
  HrInterviewType,
  HrAvailableSlot,
  HrUserProgress,
} from './speechHrInterviewPrepData';
