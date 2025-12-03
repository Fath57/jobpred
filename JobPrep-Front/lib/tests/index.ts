// Index file for tests domain
export { hardSkillsData } from './hardSkillsData';
export { softSkillsData } from './softSkillsData';
export { languageSkillsData } from './languageSkillsData';
export { personalitySkillsData } from './personalitySkillsData';
export { hrInterviewPrepData } from './hrInterviewPrepData';
export { testFeedbackData } from './testFeedbackData';

// Re-export types for easier imports
export type {
  Category as HardSkillsCategory,
  Question as HardSkillsQuestion,
  Test as HardSkillsTest,
  TestResult as HardSkillsTestResult,
  UserProgress as HardSkillsUserProgress,
} from './hardSkillsData';

export type {
  Category as SoftSkillsCategory,
  Question as SoftSkillsQuestion,
  Test as SoftSkillsTest,
  TestResult as SoftSkillsTestResult,
  Scenario,
  UserProgress as SoftSkillsUserProgress,
} from './softSkillsData';

export type {
  Language,
  SkillType,
  Question as LanguageQuestion,
  Test as LanguageTest,
  TestResult as LanguageTestResult,
  UserProgress as LanguageUserProgress,
} from './languageSkillsData';

export type {
  Framework,
  Question as PersonalityQuestion,
  Test as PersonalityTest,
  PersonalityType,
  TestResult as PersonalityTestResult,
  UserProgress as PersonalityUserProgress,
} from './personalitySkillsData';

export type {
  InterviewType,
  Question as InterviewQuestion,
  InterviewSession,
  InterviewResult,
  Company,
  UserProgress as InterviewUserProgress,
} from './hrInterviewPrepData';

export type {
  TestPerformance,
  CategoryInsight,
  SkillGap,
  CareerReadiness,
  RecommendedTest,
  PersonalizedInsight,
  ProgressEvolution,
  BenchmarkComparison,
  TestFeedbackData,
} from './testFeedbackData';
