import { User, UserTestProfile } from '../entities/User';

export interface UserTestRepository {
  // User CRUD operations
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;

  // User test profile operations
  findTestProfileByUserId(userId: string): Promise<UserTestProfile | null>;
  createTestProfile(
    profileData: Omit<UserTestProfile, 'createdAt' | 'updatedAt'>
  ): Promise<UserTestProfile>;
  updateTestProfile(
    userId: string,
    profileData: Partial<UserTestProfile>
  ): Promise<UserTestProfile>;

  // Skill level management
  updateSkillLevel(
    userId: string,
    skillData: UserSkillLevel
  ): Promise<UserTestProfile>;
  getSkillProgression(
    userId: string,
    skillName: string
  ): Promise<SkillProgression>;

  // Learning goals management
  addLearningGoal(userId: string, goal: LearningGoal): Promise<UserTestProfile>;
  updateLearningGoal(
    userId: string,
    goalId: string,
    updates: Partial<LearningGoal>
  ): Promise<UserTestProfile>;
  completeLearningGoal(
    userId: string,
    goalId: string
  ): Promise<UserTestProfile>;

  // Achievements management
  addAchievement(
    userId: string,
    achievement: UserAchievement
  ): Promise<UserTestProfile>;
  getAchievements(userId: string): Promise<UserAchievement[]>;
  checkAchievementEligibility(userId: string): Promise<EligibleAchievement[]>;

  // Certifications management
  addCertification(
    userId: string,
    certification: TestCertification
  ): Promise<UserTestProfile>;
  updateCertification(
    userId: string,
    certificationId: string,
    updates: Partial<TestCertification>
  ): Promise<UserTestProfile>;
  verifyCertification(certificationId: string): Promise<boolean>;

  // Progress tracking
  updateProgress(
    userId: string,
    progressData: Partial<ProgressTracking>
  ): Promise<UserTestProfile>;
  getProgressHistory(
    userId: string,
    period: DatePeriod
  ): Promise<ProgressHistory>;

  // User analytics
  getUserAnalytics(userId: string): Promise<UserTestAnalytics>;
  getUserInsights(userId: string): Promise<UserTestInsight[]>;
  getUserRecommendations(userId: string): Promise<UserTestRecommendation[]>;

  // Search and filtering
  findUsersBySkillLevel(skill: string, level: string): Promise<User[]>;
  findUsersByAchievement(achievementId: string): Promise<User[]>;
  findActiveUsers(): Promise<User[]>;

  // Statistics
  getUserCount(): Promise<number>;
  getSkillDistribution(skill: string): Promise<SkillDistribution>;
  getAchievementStatistics(): Promise<AchievementStatistics>;
}

export interface UserTestService {
  // Profile management
  completeProfile(
    userId: string,
    profileData: Partial<UserTestProfile>
  ): Promise<UserTestProfile>;
  updatePreferences(
    userId: string,
    preferences: TestPreferences
  ): Promise<UserTestProfile>;

  // Skill assessment
  assessSkillLevel(
    userId: string,
    skillName: string,
    testResults: TestResult[]
  ): Promise<UserSkillLevel>;
  updateSkillProgression(
    userId: string,
    skillName: string,
    newScore: number
  ): Promise<SkillProgression>;

  // Goal management
  createLearningPlan(
    userId: string,
    goals: LearningGoal[]
  ): Promise<LearningPlan>;
  trackGoalProgress(userId: string, goalId: string): Promise<GoalProgress>;
  adjustGoals(
    userId: string,
    adjustments: GoalAdjustment[]
  ): Promise<UserTestProfile>;

  // Achievement system
  processAchievements(
    userId: string,
    testResult: TestResult
  ): Promise<UnlockedAchievement[]>;
  calculateAchievementProgress(userId: string): Promise<AchievementProgress[]>;

  // Certification management
  issueCertification(
    userId: string,
    testResult: TestResult
  ): Promise<TestCertification | null>;
  renewCertification(certificationId: string): Promise<TestCertification>;

  // Analytics and insights
  generateUserDashboard(userId: string): Promise<UserTestDashboard>;
  analyzeUserPerformance(userId: string): Promise<UserPerformanceAnalysis>;
  predictUserSuccess(
    userId: string,
    testId: string
  ): Promise<SuccessPrediction>;

  // Personalization
  getPersonalizedRecommendations(
    userId: string
  ): Promise<PersonalizedRecommendation[]>;
  adaptLearningPath(
    userId: string,
    performanceData: PerformanceData[]
  ): Promise<AdaptedLearningPath>;
}

export interface SkillProgression {
  skillName: string;
  progressHistory: SkillProgressPoint[];
  currentLevel: string;
  targetLevel: string;
  improvementRate: number;
  timeToTarget: string;
  milestones: SkillMilestone[];
  recommendations: string[];
}

export interface SkillProgressPoint {
  date: Date;
  score: number;
  level: string;
  testId?: string;
  improvement: number;
  notes?: string;
}

export interface SkillMilestone {
  milestone: string;
  targetScore: number;
  achieved: boolean;
  achievedAt?: Date;
  requirements: string[];
}

export interface EligibleAchievement {
  achievement: UserAchievement;
  progress: number; // 0-100
  requirements: AchievementRequirement[];
  estimatedUnlock: Date;
}

export interface AchievementRequirement {
  requirement: string;
  completed: boolean;
  progress: number; // 0-100
  description: string;
}

export interface DatePeriod {
  startDate: Date;
  endDate: Date;
  granularity: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface ProgressHistory {
  period: DatePeriod;
  dataPoints: ProgressDataPoint[];
  trends: ProgressTrend[];
  milestones: ProgressMilestone[];
  insights: string[];
}

export interface ProgressDataPoint {
  date: Date;
  metric: string;
  value: number;
  context?: string;
}

export interface ProgressTrend {
  metric: string;
  direction: 'up' | 'down' | 'stable';
  magnitude: number;
  significance: 'low' | 'medium' | 'high';
  period: string;
}

export interface ProgressMilestone {
  milestone: string;
  achievedAt: Date;
  significance: string;
  impact: string;
}

export interface UserTestAnalytics {
  overallPerformance: OverallPerformance;
  categoryBreakdown: CategoryBreakdown[];
  skillAnalysis: SkillAnalysis[];
  learningPatterns: LearningPattern[];
  engagementMetrics: EngagementMetrics;
  improvementTrajectory: ImprovementTrajectory;
  benchmarkComparison: UserBenchmarkComparison;
}

export interface OverallPerformance {
  averageScore: number;
  totalTests: number;
  totalTime: number; // in minutes
  improvementRate: number;
  consistencyScore: number;
  currentLevel: string;
  globalRanking: number;
  percentile: number;
}

export interface CategoryBreakdown {
  category: string;
  testsCompleted: number;
  averageScore: number;
  bestScore: number;
  improvement: number;
  timeSpent: number;
  level: string;
  ranking: number;
}

export interface SkillAnalysis {
  skill: string;
  currentLevel: string;
  proficiency: number; // 0-100
  confidence: number; // 0-100
  marketValue: number; // 0-100
  trendDirection: 'up' | 'down' | 'stable';
  lastAssessed: Date;
  nextAssessment: Date;
}

export interface LearningPattern {
  pattern: string;
  frequency: number;
  effectiveness: number; // 0-100
  context: string[];
  recommendations: string[];
}

export interface EngagementMetrics {
  loginFrequency: number; // per week
  sessionDuration: number; // average in minutes
  testCompletionRate: number; // percentage
  streakDays: number;
  lastActivity: Date;
  engagementScore: number; // 0-100
}

export interface ImprovementTrajectory {
  overallTrend: 'accelerating' | 'steady' | 'plateauing' | 'declining';
  improvementRate: number; // percentage per month
  projectedLevel: string;
  timeToNextLevel: string;
  factors: ImprovementFactor[];
}

export interface ImprovementFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  strength: number; // 0-100
  actionable: boolean;
  recommendations: string[];
}

export interface UserBenchmarkComparison {
  industry: string;
  position: string;
  experienceLevel: string;
  comparisons: BenchmarkComparison[];
  competitiveAdvantages: string[];
  improvementOpportunities: string[];
  marketPosition: string;
}

export interface BenchmarkComparison {
  metric: string;
  yourValue: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
  gap: number;
  interpretation: string;
}

export interface UserTestInsight {
  type: 'performance' | 'learning' | 'skill' | 'goal' | 'benchmark';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  recommendations: string[];
  dataSupport: string[];
  confidence: number; // 0-100
}

export interface UserTestRecommendation {
  type: 'test' | 'skill' | 'goal' | 'study' | 'practice';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  reasoning: string[];
  expectedBenefit: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  resources: string[];
}

export interface LearningPlan {
  id: string;
  userId: string;
  title: string;
  description: string;
  goals: LearningGoal[];
  timeline: PlanTimeline[];
  milestones: PlanMilestone[];
  resources: PlanResource[];
  assessments: PlanAssessment[];
  adaptations: PlanAdaptation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanTimeline {
  phase: string;
  startDate: Date;
  endDate: Date;
  objectives: string[];
  activities: string[];
  assessments: string[];
}

export interface PlanMilestone {
  milestone: string;
  targetDate: Date;
  requirements: string[];
  assessment: string;
  reward: string;
  achieved: boolean;
}

export interface PlanResource {
  type: string;
  name: string;
  description: string;
  url?: string;
  estimatedTime: string;
  difficulty: string;
  relevance: number; // 0-100
}

export interface PlanAssessment {
  assessment: string;
  type: string;
  frequency: string;
  purpose: string;
  successCriteria: string[];
}

export interface PlanAdaptation {
  trigger: string;
  adaptation: string;
  reasoning: string;
  implementedAt?: Date;
  effectiveness?: number; // 0-100
}

export interface GoalProgress {
  goalId: string;
  progress: number; // 0-100
  milestones: MilestoneProgress[];
  activities: ActivityProgress[];
  timeline: TimelineProgress;
  challenges: Challenge[];
  adjustments: GoalAdjustment[];
}

export interface MilestoneProgress {
  milestone: string;
  completed: boolean;
  completedAt?: Date;
  progress: number; // 0-100
  requirements: RequirementProgress[];
}

export interface RequirementProgress {
  requirement: string;
  completed: boolean;
  progress: number; // 0-100
  evidence?: string;
}

export interface ActivityProgress {
  activity: string;
  completed: boolean;
  progress: number; // 0-100
  timeSpent: number; // in minutes
  effectiveness: number; // 0-100
  notes?: string;
}

export interface TimelineProgress {
  originalEndDate: Date;
  currentEndDate: Date;
  onTrack: boolean;
  daysRemaining: number;
  completionProbability: number; // 0-100
}

export interface Challenge {
  challenge: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: string;
  solutions: string[];
  status: 'identified' | 'addressing' | 'resolved';
}

export interface GoalAdjustment {
  type: 'timeline' | 'scope' | 'resources' | 'approach';
  description: string;
  reasoning: string;
  impact: string;
  implementedAt: Date;
  effectiveness?: number; // 0-100
}

export interface UnlockedAchievement {
  achievement: UserAchievement;
  unlockedAt: Date;
  trigger: string;
  celebration: string;
  nextAchievement?: UserAchievement;
}

export interface AchievementProgress {
  achievement: UserAchievement;
  progress: number; // 0-100
  requirements: AchievementRequirement[];
  estimatedUnlock: Date;
  difficulty: string;
}

export interface UserTestDashboard {
  user: User;
  profile: UserTestProfile;
  analytics: UserTestAnalytics;
  recentActivity: RecentActivity[];
  recommendations: UserTestRecommendation[];
  achievements: UserAchievement[];
  goals: LearningGoal[];
  insights: UserTestInsight[];
}

export interface RecentActivity {
  type:
    | 'test_completed'
    | 'achievement_unlocked'
    | 'goal_achieved'
    | 'certification_earned'
    | 'skill_improved';
  title: string;
  description: string;
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface UserPerformanceAnalysis {
  overallPerformance: PerformanceAnalysis;
  categoryAnalysis: CategoryPerformanceAnalysis[];
  skillAnalysis: SkillPerformanceAnalysis[];
  learningEfficiency: LearningEfficiencyAnalysis;
  improvementOpportunities: ImprovementOpportunity[];
  strengths: PerformanceStrength[];
  predictions: PerformancePrediction[];
}

export interface PerformanceAnalysis {
  currentLevel: string;
  averageScore: number;
  improvementRate: number;
  consistency: number; // 0-100
  efficiency: number; // 0-100
  engagement: number; // 0-100
  trajectory: 'accelerating' | 'steady' | 'plateauing' | 'declining';
}

export interface CategoryPerformanceAnalysis {
  category: string;
  performance: PerformanceAnalysis;
  ranking: number;
  percentile: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface SkillPerformanceAnalysis {
  skill: string;
  currentLevel: string;
  proficiency: number; // 0-100
  growth: number; // percentage
  marketValue: number; // 0-100
  competitiveness: number; // 0-100
  developmentPriority: 'low' | 'medium' | 'high' | 'critical';
}

export interface LearningEfficiencyAnalysis {
  overallEfficiency: number; // 0-100
  timeUtilization: number; // 0-100
  retentionRate: number; // 0-100
  applicationRate: number; // 0-100
  adaptationSpeed: number; // 0-100
  learningStyle: string;
  optimizations: string[];
}

export interface ImprovementOpportunity {
  area: string;
  currentLevel: string;
  targetLevel: string;
  potential: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  actions: string[];
  expectedROI: number; // 0-100
}

export interface PerformanceStrength {
  strength: string;
  level: string;
  evidence: string[];
  leverage: string[];
  marketValue: number; // 0-100
  uniqueness: number; // 0-100
}

export interface PerformancePrediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: number; // 0-100
  factors: string[];
  scenarios: PredictionScenario[];
}

export interface PredictionScenario {
  scenario: string;
  probability: number; // 0-100
  outcome: number;
  factors: string[];
  recommendations: string[];
}

export interface SuccessPrediction {
  testId: string;
  successProbability: number; // 0-100
  predictedScore: number;
  confidence: number; // 0-100
  factors: PredictionFactor[];
  recommendations: string[];
  optimalTiming: Date;
}

export interface PredictionFactor {
  factor: string;
  weight: number; // 0-1
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-100
  actionable: boolean;
  description: string;
}

export interface PersonalizedRecommendation {
  type: 'test' | 'skill' | 'goal' | 'resource' | 'strategy';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  reasoning: string[];
  expectedBenefit: string;
  implementation: string[];
  timeframe: string;
  effort: 'low' | 'medium' | 'high';
  confidence: number; // 0-100
}

export interface AdaptedLearningPath {
  originalPath: LearningPath;
  adaptations: PathAdaptation[];
  newTimeline: PlanTimeline[];
  adjustedGoals: LearningGoal[];
  reasoning: string[];
  expectedOutcome: string;
}

export interface PathAdaptation {
  type: 'pace' | 'content' | 'sequence' | 'difficulty' | 'focus';
  description: string;
  reasoning: string;
  impact: string;
  implementation: string;
}

export interface SkillDistribution {
  skill: string;
  levels: LevelDistribution[];
  averageScore: number;
  improvementRate: number;
  marketDemand: number; // 0-100
  competitionLevel: 'low' | 'medium' | 'high' | 'very_high';
}

export interface LevelDistribution {
  level: string;
  count: number;
  percentage: number;
  averageScore: number;
  timeToNext: string;
}

export interface AchievementStatistics {
  totalAchievements: number;
  unlockedAchievements: number;
  rarityDistribution: RarityDistribution[];
  categoryDistribution: CategoryDistribution[];
  unlockRate: number; // per month
  engagementImpact: number; // 0-100
}

export interface RarityDistribution {
  rarity: string;
  count: number;
  percentage: number;
  averageUnlockTime: string;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
  popularityRank: number;
}
