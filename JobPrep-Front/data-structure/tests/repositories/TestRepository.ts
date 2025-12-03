import { Test, Question, TestSession, TestResult } from '../entities/Test';

export interface TestRepository {
  // Test CRUD operations
  findById(id: string): Promise<Test | null>;
  findByCategory(category: string): Promise<Test[]>;
  findBySubcategory(subcategory: string): Promise<Test[]>;
  findByDifficulty(difficulty: string): Promise<Test[]>;
  findByTags(tags: string[]): Promise<Test[]>;
  create(testData: Omit<Test, 'id' | 'createdAt' | 'updatedAt'>): Promise<Test>;
  update(id: string, testData: Partial<Test>): Promise<Test>;
  delete(id: string): Promise<boolean>;

  // Question management
  findQuestionsByTestId(testId: string): Promise<Question[]>;
  findQuestionById(id: string): Promise<Question | null>;
  createQuestion(
    questionData: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Question>;
  updateQuestion(
    id: string,
    questionData: Partial<Question>
  ): Promise<Question>;
  deleteQuestion(id: string): Promise<boolean>;

  // Test session management
  findSessionById(id: string): Promise<TestSession | null>;
  findSessionsByUserId(userId: string): Promise<TestSession[]>;
  findSessionsByTestId(testId: string): Promise<TestSession[]>;
  createSession(
    sessionData: Omit<TestSession, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<TestSession>;
  updateSession(
    id: string,
    sessionData: Partial<TestSession>
  ): Promise<TestSession>;

  // Test results
  findResultById(id: string): Promise<TestResult | null>;
  findResultsByUserId(userId: string): Promise<TestResult[]>;
  findResultsByTestId(testId: string): Promise<TestResult[]>;
  createResult(
    resultData: Omit<TestResult, 'id' | 'createdAt'>
  ): Promise<TestResult>;

  // Search and filtering
  searchTests(query: string, filters: TestFilters): Promise<Test[]>;
  findRecommendedTests(userId: string, category?: string): Promise<Test[]>;
  findPopularTests(category?: string, limit?: number): Promise<Test[]>;
  findRecentTests(userId: string, limit?: number): Promise<Test[]>;

  // Analytics
  getTestStatistics(testId: string): Promise<TestStatistics>;
  getUserTestStatistics(userId: string): Promise<UserTestStatistics>;
  getGlobalTestStatistics(): Promise<GlobalTestStatistics>;
}

export interface TestService {
  // Test management
  createTest(testData: CreateTestRequest): Promise<Test>;
  updateTest(testId: string, updates: UpdateTestRequest): Promise<Test>;
  publishTest(testId: string): Promise<Test>;
  archiveTest(testId: string): Promise<boolean>;

  // Test taking
  startTest(
    userId: string,
    testId: string,
    options?: TestOptions
  ): Promise<TestSession>;
  submitAnswer(
    sessionId: string,
    questionId: string,
    answer: any
  ): Promise<TestSession>;
  pauseTest(sessionId: string): Promise<TestSession>;
  resumeTest(sessionId: string): Promise<TestSession>;
  completeTest(sessionId: string): Promise<TestResult>;

  // Adaptive testing
  getNextQuestion(sessionId: string): Promise<Question | null>;
  adjustDifficulty(sessionId: string, performance: number): Promise<void>;

  // Results and feedback
  generateResult(sessionId: string): Promise<TestResult>;
  generateFeedback(resultId: string): Promise<TestFeedback>;
  generateCertificate(resultId: string): Promise<Certificate>;

  // Recommendations
  getRecommendedTests(
    userId: string,
    preferences?: TestPreferences
  ): Promise<RecommendedTest[]>;
  getPersonalizedLearningPath(
    userId: string,
    goals: LearningGoal[]
  ): Promise<LearningPath>;

  // Analytics and insights
  analyzeTestPerformance(testId: string): Promise<TestPerformanceAnalysis>;
  analyzeUserProgress(userId: string): Promise<UserProgressAnalysis>;
  generateInsights(userId: string): Promise<PersonalizedInsight[]>;
}

export interface TestFilters {
  category?: string;
  subcategory?: string;
  difficulty?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  tags?: string[];
  skills?: string[];
  isCertified?: boolean;
  isAdaptive?: boolean;
  language?: string;
  rating?: {
    min?: number;
    max?: number;
  };
}

export interface CreateTestRequest {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  difficulty: string;
  estimatedDuration: number;
  tags: string[];
  skills: string[];
  prerequisites: string[];
  learningObjectives: string[];
  questions: CreateQuestionRequest[];
  isAdaptive: boolean;
  isCertified: boolean;
}

export interface CreateQuestionRequest {
  type: string;
  category: string;
  difficulty: string;
  question: string;
  context?: string;
  instructions?: string;
  timeLimit?: number;
  points: number;
  options?: QuestionOptionRequest[];
  correctAnswers?: string[];
  explanation?: string;
  hints?: string[];
  skillWeights: SkillWeightRequest[];
}

export interface QuestionOptionRequest {
  text: string;
  value: string | number;
  isCorrect?: boolean;
  explanation?: string;
}

export interface SkillWeightRequest {
  skillName: string;
  weight: number;
  category: string;
}

export interface UpdateTestRequest {
  title?: string;
  description?: string;
  difficulty?: string;
  estimatedDuration?: number;
  tags?: string[];
  skills?: string[];
  prerequisites?: string[];
  learningObjectives?: string[];
  isActive?: boolean;
}

export interface TestOptions {
  timeLimit?: number;
  allowPause?: boolean;
  allowReview?: boolean;
  randomizeQuestions?: boolean;
  randomizeOptions?: boolean;
  showProgress?: boolean;
  immediateResults?: boolean;
}

export interface TestFeedback {
  resultId: string;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  nextSteps: string[];
  resources: string[];
  detailedAnalysis: any; // Specific to test type
}

export interface Certificate {
  id: string;
  resultId: string;
  userId: string;
  testId: string;
  certificateNumber: string;
  issuedAt: Date;
  expiresAt?: Date;
  score: number;
  level: string;
  skills: string[];
  verificationUrl: string;
  isVerified: boolean;
}

export interface RecommendedTest {
  test: Test;
  relevanceScore: number; // 0-100
  reasoning: string[];
  expectedBenefit: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  prerequisites: string[];
  estimatedImprovement: number; // points
}

export interface TestPreferences {
  categories: string[];
  difficulty: string;
  maxDuration: number;
  learningStyle: string;
  goals: string[];
  availableTime: number; // minutes per week
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  difficulty: string;
  steps: LearningPathStep[];
  milestones: LearningMilestone[];
  prerequisites: string[];
  outcomes: string[];
}

export interface LearningPathStep {
  step: number;
  title: string;
  description: string;
  testIds: string[];
  estimatedTime: string;
  difficulty: string;
  skills: string[];
  prerequisites: string[];
  outcomes: string[];
}

export interface LearningMilestone {
  milestone: string;
  description: string;
  requirements: string[];
  reward: string;
  estimatedDate: Date;
}

export interface TestStatistics {
  testId: string;
  totalAttempts: number;
  completionRate: number; // percentage
  averageScore: number;
  averageTime: number; // in minutes
  difficultyRating: number; // 0-100
  userSatisfaction: number; // 0-100
  passRate: number; // percentage
  retakeRate: number; // percentage
  questionStatistics: QuestionStatistics[];
}

export interface QuestionStatistics {
  questionId: string;
  attempts: number;
  correctRate: number; // percentage
  averageTime: number; // in seconds
  skipRate: number; // percentage
  difficultyIndex: number; // 0-1
  discriminationIndex: number; // 0-1
}

export interface UserTestStatistics {
  userId: string;
  totalTests: number;
  completedTests: number;
  averageScore: number;
  totalTimeSpent: number; // in minutes
  improvementRate: number; // percentage
  strongestCategories: string[];
  weakestCategories: string[];
  recentPerformance: PerformanceData[];
  achievements: string[];
}

export interface PerformanceData {
  date: Date;
  testId: string;
  category: string;
  score: number;
  improvement: number;
  timeSpent: number;
}

export interface GlobalTestStatistics {
  totalTests: number;
  totalUsers: number;
  totalAttempts: number;
  averageScore: number;
  popularCategories: CategoryPopularity[];
  performanceTrends: PerformanceTrend[];
  userEngagement: EngagementMetrics;
}

export interface CategoryPopularity {
  category: string;
  attempts: number;
  popularity: number; // percentage
  averageScore: number;
  growth: number; // percentage
}

export interface PerformanceTrend {
  period: string;
  metric: string;
  value: number;
  change: number; // percentage
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface EngagementMetrics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionDuration: number; // in minutes
  retentionRate: number; // percentage
  completionRate: number; // percentage
}

export interface TestPerformanceAnalysis {
  testId: string;
  performanceMetrics: TestPerformanceMetrics;
  questionAnalysis: QuestionPerformanceAnalysis[];
  userSegmentation: UserSegment[];
  improvementRecommendations: TestImprovementRecommendation[];
  benchmarkComparison: TestBenchmarkComparison;
}

export interface TestPerformanceMetrics {
  averageScore: number;
  scoreDistribution: ScoreDistribution;
  completionRate: number;
  averageTime: number;
  userSatisfaction: number;
  difficultyAccuracy: number;
  learningEffectiveness: number;
}

export interface ScoreDistribution {
  ranges: ScoreRange[];
  mean: number;
  median: number;
  standardDeviation: number;
  skewness: number;
}

export interface ScoreRange {
  min: number;
  max: number;
  count: number;
  percentage: number;
}

export interface QuestionPerformanceAnalysis {
  questionId: string;
  performance: QuestionPerformance;
  issues: QuestionIssue[];
  recommendations: QuestionRecommendation[];
}

export interface QuestionPerformance {
  correctRate: number;
  averageTime: number;
  skipRate: number;
  difficultyIndex: number;
  discriminationIndex: number;
  reliability: number;
}

export interface QuestionIssue {
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  frequency: number;
}

export interface QuestionRecommendation {
  type:
    | 'revision'
    | 'removal'
    | 'difficulty_adjustment'
    | 'option_modification';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  expectedImpact: string;
  implementation: string;
}

export interface UserSegment {
  segment: string;
  size: number; // percentage
  characteristics: string[];
  performance: SegmentPerformance;
  needs: string[];
  recommendations: string[];
}

export interface SegmentPerformance {
  averageScore: number;
  completionRate: number;
  engagement: number;
  satisfaction: number;
  improvementRate: number;
}

export interface TestImprovementRecommendation {
  area: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  implementation: string[];
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
}

export interface TestBenchmarkComparison {
  industry: string;
  position: string;
  benchmarks: Benchmark[];
  competitivePosition: string;
  differentiators: string[];
  improvementOpportunities: string[];
}

export interface Benchmark {
  metric: string;
  yourValue: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
  interpretation: string;
}

export interface UserProgressAnalysis {
  userId: string;
  overallProgress: OverallProgress;
  categoryProgress: CategoryProgress[];
  skillDevelopment: SkillDevelopment[];
  learningPatterns: LearningPattern[];
  achievements: ProgressAchievement[];
  recommendations: ProgressRecommendation[];
  predictions: ProgressPrediction[];
}

export interface OverallProgress {
  totalTests: number;
  averageScore: number;
  improvementRate: number;
  consistencyScore: number;
  engagementLevel: number;
  learningVelocity: number;
  currentLevel: string;
  nextMilestone: string;
}

export interface CategoryProgress {
  category: string;
  testsCompleted: number;
  averageScore: number;
  improvement: number;
  currentLevel: string;
  strengths: string[];
  weaknesses: string[];
  nextRecommendedTest: string;
}

export interface SkillDevelopment {
  skill: string;
  initialLevel: string;
  currentLevel: string;
  targetLevel: string;
  progress: number; // 0-100
  trajectory: 'accelerating' | 'steady' | 'plateauing' | 'declining';
  timeToTarget: string;
  developmentActions: string[];
}

export interface LearningPattern {
  pattern: string;
  description: string;
  frequency: number;
  impact: 'positive' | 'negative' | 'neutral';
  recommendations: string[];
}

export interface ProgressAchievement {
  achievement: string;
  unlockedAt: Date;
  category: string;
  rarity: string;
  impact: string;
  nextAchievement?: string;
}

export interface ProgressRecommendation {
  type:
    | 'test_selection'
    | 'study_plan'
    | 'skill_focus'
    | 'time_management'
    | 'goal_setting';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  actions: string[];
  expectedOutcome: string;
  timeframe: string;
}

export interface ProgressPrediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: number; // 0-100
  factors: string[];
  recommendations: string[];
}

export interface PersonalizedInsight {
  type: 'strength' | 'opportunity' | 'trend' | 'recommendation' | 'warning';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  actions: string[];
  dataPoints: InsightDataPoint[];
  confidence: number; // 0-100
}

export interface InsightDataPoint {
  metric: string;
  value: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  benchmark: number;
  percentile: number;
  interpretation: string;
}
