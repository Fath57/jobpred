export interface Test {
  id: string;
  title: string;
  description: string;
  category:
    | 'hard_skills'
    | 'soft_skills'
    | 'language_skills'
    | 'personality_skills'
    | 'hr_interview_prep';
  subcategory: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  estimatedDuration: number; // in minutes
  questionsCount: number;
  passingScore: number; // 0-100
  maxScore: number; // 0-100
  tags: string[];
  skills: string[];
  prerequisites: string[];
  learningObjectives: string[];
  isActive: boolean;
  isAdaptive: boolean;
  isCertified: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  authorId: string;
  reviewStatus: 'draft' | 'review' | 'approved' | 'published' | 'archived';
}

export interface Question {
  id: string;
  testId: string;
  type:
    | 'multiple_choice'
    | 'single_choice'
    | 'true_false'
    | 'fill_blank'
    | 'essay'
    | 'code'
    | 'practical'
    | 'scenario'
    | 'scale'
    | 'ranking';
  category: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  question: string;
  context?: string;
  instructions?: string;
  timeLimit?: number; // in seconds
  points: number;
  order: number;
  isRequired: boolean;
  options?: QuestionOption[];
  correctAnswers?: string[];
  explanation?: string;
  hints?: string[];
  resources?: string[];
  skillWeights: SkillWeight[];
  metadata: QuestionMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionOption {
  id: string;
  text: string;
  value: string | number;
  isCorrect?: boolean;
  explanation?: string;
  order: number;
  metadata?: Record<string, any>;
}

export interface SkillWeight {
  skillName: string;
  weight: number; // 0-1
  category: string;
}

export interface QuestionMetadata {
  estimatedTime: number; // in seconds
  cognitiveLoad: 'low' | 'medium' | 'high';
  bloomsTaxonomy:
    | 'remember'
    | 'understand'
    | 'apply'
    | 'analyze'
    | 'evaluate'
    | 'create';
  difficultyRating: number; // 0-100
  discriminationIndex: number; // 0-1
  successRate: number; // 0-100
  averageTime: number; // in seconds
  skipRate: number; // 0-100
}

export interface TestSession {
  id: string;
  testId: string;
  userId: string;
  status:
    | 'not_started'
    | 'in_progress'
    | 'paused'
    | 'completed'
    | 'abandoned'
    | 'expired';
  startedAt: Date;
  completedAt?: Date;
  pausedAt?: Date;
  resumedAt?: Date;
  timeSpent: number; // in seconds
  currentQuestionIndex: number;
  answers: TestAnswer[];
  score?: number;
  level?: string;
  feedback?: string;
  sessionData: SessionData;
  environment: TestEnvironment;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestAnswer {
  questionId: string;
  answer: any;
  isCorrect?: boolean;
  points: number;
  timeSpent: number; // in seconds
  attempts: number;
  confidence?: number; // 0-100
  answeredAt: Date;
  metadata?: Record<string, any>;
}

export interface SessionData {
  browserInfo: BrowserInfo;
  deviceInfo: DeviceInfo;
  networkInfo: NetworkInfo;
  interactionEvents: InteractionEvent[];
  performanceMetrics: PerformanceMetrics;
}

export interface BrowserInfo {
  userAgent: string;
  browser: string;
  version: string;
  os: string;
  screenResolution: string;
  timezone: string;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  isTouchDevice: boolean;
  hasCamera: boolean;
  hasMicrophone: boolean;
  connectionType: string;
}

export interface NetworkInfo {
  connectionSpeed: string;
  latency: number; // in ms
  stability: 'stable' | 'unstable' | 'poor';
}

export interface InteractionEvent {
  type:
    | 'click'
    | 'keypress'
    | 'focus'
    | 'blur'
    | 'scroll'
    | 'resize'
    | 'visibility_change';
  timestamp: Date;
  data: Record<string, any>;
}

export interface PerformanceMetrics {
  pageLoadTime: number; // in ms
  questionLoadTimes: number[]; // in ms
  averageResponseTime: number; // in ms
  totalIdleTime: number; // in seconds
  focusLossCount: number;
  tabSwitchCount: number;
}

export interface TestEnvironment {
  location?: string;
  isProctored: boolean;
  allowedResources: string[];
  restrictions: TestRestriction[];
  securityLevel: 'low' | 'medium' | 'high' | 'maximum';
}

export interface TestRestriction {
  type:
    | 'no_copy_paste'
    | 'no_tab_switch'
    | 'no_right_click'
    | 'fullscreen_required'
    | 'camera_required'
    | 'microphone_required';
  enforced: boolean;
  violationAction: 'warn' | 'pause' | 'terminate';
}

export interface TestResult {
  id: string;
  sessionId: string;
  testId: string;
  userId: string;
  overallScore: number; // 0-100
  maxPossibleScore: number;
  percentage: number; // 0-100
  level: string;
  passed: boolean;
  timeSpent: number; // in seconds
  questionsAnswered: number;
  questionsCorrect: number;
  accuracy: number; // 0-100
  skillScores: SkillScore[];
  categoryScores: CategoryScore[];
  strengths: string[];
  weaknesses: string[];
  recommendations: TestRecommendation[];
  nextSteps: string[];
  certificateEarned: boolean;
  certificateId?: string;
  benchmarkComparison: BenchmarkComparison;
  detailedAnalysis: DetailedAnalysis;
  createdAt: Date;
}

export interface SkillScore {
  skillName: string;
  score: number; // 0-100
  level: string;
  questionsCount: number;
  correctAnswers: number;
  improvement: number; // vs previous test
  trend: 'improving' | 'stable' | 'declining';
}

export interface CategoryScore {
  category: string;
  score: number; // 0-100
  weight: number; // 0-1
  questionsCount: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  difficulty: string;
}

export interface TestRecommendation {
  type: 'study' | 'practice' | 'retake' | 'advance' | 'focus_area';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actionItems: string[];
  resources: RecommendationResource[];
  estimatedTime: string;
  expectedImprovement: number; // points
}

export interface RecommendationResource {
  type: 'course' | 'book' | 'video' | 'practice' | 'mentor' | 'certification';
  title: string;
  provider: string;
  url?: string;
  duration?: string;
  cost?: string;
  rating?: number;
  difficulty: string;
}

export interface BenchmarkComparison {
  industryAverage: number;
  positionAverage: number;
  experienceLevelAverage: number;
  topPerformers: number;
  yourPercentile: number;
  ranking: string;
  competitivePosition:
    | 'leading'
    | 'above_average'
    | 'average'
    | 'below_average'
    | 'needs_improvement';
}

export interface DetailedAnalysis {
  responsePatterns: ResponsePattern[];
  timeAnalysis: TimeAnalysis;
  difficultyProgression: DifficultyProgression;
  learningCurve: LearningCurve;
  cognitiveLoad: CognitiveLoadAnalysis;
  errorAnalysis: ErrorAnalysis;
}

export interface ResponsePattern {
  pattern: string;
  frequency: number; // percentage
  description: string;
  implications: string[];
  recommendations: string[];
}

export interface TimeAnalysis {
  averageTimePerQuestion: number; // in seconds
  timeDistribution: TimeDistribution[];
  rushingIndicators: boolean;
  procrastinationIndicators: boolean;
  optimalPacing: boolean;
}

export interface TimeDistribution {
  questionType: string;
  averageTime: number; // in seconds
  standardDeviation: number;
  efficiency: 'high' | 'medium' | 'low';
}

export interface DifficultyProgression {
  startingDifficulty: string;
  endingDifficulty: string;
  adaptationRate: number; // 0-100
  plateauPoints: number[];
  breakthroughPoints: number[];
}

export interface LearningCurve {
  initialPerformance: number; // 0-100
  finalPerformance: number; // 0-100
  improvementRate: number; // percentage
  learningEfficiency: 'high' | 'medium' | 'low';
  plateauReached: boolean;
}

export interface CognitiveLoadAnalysis {
  overallLoad: 'low' | 'medium' | 'high' | 'excessive';
  loadDistribution: LoadDistribution[];
  fatigueIndicators: boolean;
  optimalLoadReached: boolean;
}

export interface LoadDistribution {
  questionRange: string;
  cognitiveLoad: 'low' | 'medium' | 'high';
  performance: number; // 0-100
  timeSpent: number; // in seconds
}

export interface ErrorAnalysis {
  commonErrors: CommonError[];
  errorPatterns: ErrorPattern[];
  misconceptions: string[];
  knowledgeGaps: string[];
  improvementAreas: string[];
}

export interface CommonError {
  error: string;
  frequency: number; // percentage
  category: string;
  severity: 'low' | 'medium' | 'high';
  correction: string;
  prevention: string[];
}

export interface ErrorPattern {
  pattern: string;
  description: string;
  frequency: number; // percentage
  underlyingCause: string;
  remediation: string[];
}
