export interface TestAnalyticsService {
  // Event tracking
  trackTestEvent(
    testId: string,
    userId: string,
    event: TestEvent
  ): Promise<void>;
  trackUserInteraction(
    sessionId: string,
    interaction: UserInteraction
  ): Promise<void>;
  trackPerformanceMetric(
    userId: string,
    metric: PerformanceMetric
  ): Promise<void>;

  // Real-time analytics
  getTestMetrics(testId: string): Promise<TestMetrics>;
  getUserMetrics(userId: string): Promise<UserMetrics>;
  getGlobalMetrics(): Promise<GlobalMetrics>;

  // Performance analysis
  analyzeTestPerformance(
    testId: string,
    period?: DatePeriod
  ): Promise<TestPerformanceReport>;
  analyzeUserPerformance(
    userId: string,
    period?: DatePeriod
  ): Promise<UserPerformanceReport>;
  analyzeCategoryPerformance(
    category: string,
    period?: DatePeriod
  ): Promise<CategoryPerformanceReport>;

  // Comparative analysis
  compareTestPerformance(testIds: string[]): Promise<TestComparisonReport>;
  compareUserPerformance(userIds: string[]): Promise<UserComparisonReport>;
  benchmarkPerformance(
    userId: string,
    benchmarkType: BenchmarkType
  ): Promise<BenchmarkReport>;

  // Predictive analytics
  predictTestSuccess(
    userId: string,
    testId: string
  ): Promise<SuccessPrediction>;
  predictLearningOutcome(
    userId: string,
    learningPath: string
  ): Promise<LearningOutcomePrediction>;
  predictMarketTrends(category: string): Promise<MarketTrendPrediction>;

  // Insights generation
  generatePersonalizedInsights(userId: string): Promise<PersonalizedInsight[]>;
  generateTestInsights(testId: string): Promise<TestInsight[]>;
  generateIndustryInsights(industry: string): Promise<IndustryInsight[]>;

  // Reporting
  generateUserReport(
    userId: string,
    reportType: ReportType,
    period: DatePeriod
  ): Promise<AnalyticsReport>;
  generateTestReport(
    testId: string,
    reportType: ReportType,
    period: DatePeriod
  ): Promise<AnalyticsReport>;
  generateGlobalReport(
    reportType: ReportType,
    period: DatePeriod
  ): Promise<AnalyticsReport>;

  // A/B Testing
  createABTest(testConfig: ABTestConfig): Promise<ABTest>;
  trackABTestResult(
    testId: string,
    userId: string,
    variant: string,
    outcome: TestOutcome
  ): Promise<void>;
  analyzeABTestResults(testId: string): Promise<ABTestResults>;

  // Cohort analysis
  createCohort(cohortDefinition: CohortDefinition): Promise<Cohort>;
  analyzeCohortPerformance(cohortId: string): Promise<CohortAnalysis>;
  compareCohorts(cohortIds: string[]): Promise<CohortComparison>;

  // Funnel analysis
  analyzeLearningFunnel(userId: string): Promise<LearningFunnelAnalysis>;
  analyzeTestFunnel(testId: string): Promise<TestFunnelAnalysis>;
  optimizeFunnel(funnelId: string): Promise<FunnelOptimization>;
}

export interface TestEvent {
  type:
    | 'test_started'
    | 'test_completed'
    | 'test_paused'
    | 'test_resumed'
    | 'test_abandoned'
    | 'question_answered'
    | 'question_skipped';
  timestamp: Date;
  metadata: Record<string, any>;
  sessionId: string;
  questionId?: string;
  answer?: any;
  timeSpent?: number;
}

export interface UserInteraction {
  type:
    | 'click'
    | 'scroll'
    | 'focus'
    | 'blur'
    | 'keypress'
    | 'mouse_move'
    | 'resize';
  timestamp: Date;
  element: string;
  data: Record<string, any>;
  sessionId: string;
}

export interface PerformanceMetric {
  metric: string;
  value: number;
  timestamp: Date;
  context: Record<string, any>;
  category: string;
  testId?: string;
  sessionId?: string;
}

export interface TestMetrics {
  testId: string;
  realTimeStats: RealTimeStats;
  performanceMetrics: TestPerformanceMetrics;
  engagementMetrics: TestEngagementMetrics;
  qualityMetrics: TestQualityMetrics;
  trends: MetricTrend[];
}

export interface RealTimeStats {
  activeUsers: number;
  testsInProgress: number;
  completionsToday: number;
  averageScore: number;
  completionRate: number;
  averageTime: number;
}

export interface TestPerformanceMetrics {
  totalAttempts: number;
  completionRate: number;
  averageScore: number;
  scoreDistribution: ScoreDistribution;
  timeMetrics: TimeMetrics;
  difficultyMetrics: DifficultyMetrics;
}

export interface TestEngagementMetrics {
  startRate: number;
  completionRate: number;
  retakeRate: number;
  shareRate: number;
  recommendationRate: number;
  userSatisfaction: number;
  npsScore: number;
}

export interface TestQualityMetrics {
  reliability: number;
  validity: number;
  discriminationIndex: number;
  itemDifficulty: number;
  contentValidity: number;
  constructValidity: number;
  criterionValidity: number;
}

export interface MetricTrend {
  metric: string;
  period: string;
  trend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  changeRate: number;
  significance: 'low' | 'medium' | 'high';
  factors: string[];
}

export interface UserMetrics {
  userId: string;
  performanceMetrics: UserPerformanceMetrics;
  engagementMetrics: UserEngagementMetrics;
  learningMetrics: UserLearningMetrics;
  progressMetrics: UserProgressMetrics;
  behaviorMetrics: UserBehaviorMetrics;
}

export interface UserPerformanceMetrics {
  overallScore: number;
  categoryScores: CategoryScore[];
  improvementRate: number;
  consistency: number;
  efficiency: number;
  accuracy: number;
  speed: number;
}

export interface UserEngagementMetrics {
  sessionFrequency: number;
  sessionDuration: number;
  testCompletionRate: number;
  streakDays: number;
  lastActivity: Date;
  engagementScore: number;
  retentionProbability: number;
}

export interface UserLearningMetrics {
  learningVelocity: number;
  retentionRate: number;
  applicationRate: number;
  transferRate: number;
  masteryRate: number;
  adaptationSpeed: number;
  learningEfficiency: number;
}

export interface UserProgressMetrics {
  goalsCompleted: number;
  milestonesAchieved: number;
  skillsImproved: number;
  certificationsEarned: number;
  levelProgression: number;
  timeToGoal: number;
  progressConsistency: number;
}

export interface UserBehaviorMetrics {
  testSelectionPattern: string;
  studyPattern: string;
  timePreference: string;
  difficultyPreference: string;
  helpSeekingBehavior: string;
  socialLearningBehavior: string;
  motivationPattern: string;
}

export interface GlobalMetrics {
  platformMetrics: PlatformMetrics;
  userMetrics: GlobalUserMetrics;
  contentMetrics: GlobalContentMetrics;
  performanceMetrics: GlobalPerformanceMetrics;
  growthMetrics: GrowthMetrics;
  qualityMetrics: GlobalQualityMetrics;
}

export interface PlatformMetrics {
  totalUsers: number;
  activeUsers: number;
  totalTests: number;
  totalSessions: number;
  totalTime: number;
  averageSessionDuration: number;
  platformUptime: number;
}

export interface GlobalUserMetrics {
  newUsers: number;
  returningUsers: number;
  userRetention: RetentionMetrics;
  userEngagement: EngagementDistribution;
  userSatisfaction: number;
  churnRate: number;
}

export interface RetentionMetrics {
  day1: number;
  day7: number;
  day30: number;
  day90: number;
  cohortRetention: CohortRetentionData[];
}

export interface CohortRetentionData {
  cohort: string;
  size: number;
  retention: number[];
  averageLifetime: number;
}

export interface EngagementDistribution {
  highlyEngaged: number;
  moderatelyEngaged: number;
  lowEngaged: number;
  atRisk: number;
  dormant: number;
}

export interface GlobalContentMetrics {
  totalQuestions: number;
  averageQuality: number;
  contentUtilization: number;
  contentEffectiveness: number;
  updateFrequency: number;
  contentSatisfaction: number;
}

export interface GlobalPerformanceMetrics {
  averageScore: number;
  scoreImprovement: number;
  completionRate: number;
  successRate: number;
  learningEffectiveness: number;
  skillDevelopment: number;
}

export interface GrowthMetrics {
  userGrowthRate: number;
  contentGrowthRate: number;
  engagementGrowthRate: number;
  revenueGrowthRate: number;
  marketPenetration: number;
  competitivePosition: string;
}

export interface GlobalQualityMetrics {
  systemReliability: number;
  dataAccuracy: number;
  userExperience: number;
  contentQuality: number;
  supportQuality: number;
  overallQuality: number;
}

export interface TestPerformanceReport {
  testId: string;
  period: DatePeriod;
  summary: TestPerformanceSummary;
  detailedAnalysis: TestDetailedAnalysis;
  userSegmentation: TestUserSegmentation;
  recommendations: TestRecommendation[];
  trends: PerformanceTrend[];
  benchmarks: TestBenchmark[];
}

export interface TestPerformanceSummary {
  totalAttempts: number;
  uniqueUsers: number;
  completionRate: number;
  averageScore: number;
  averageTime: number;
  userSatisfaction: number;
  improvementRate: number;
}

export interface TestDetailedAnalysis {
  questionAnalysis: QuestionAnalysis[];
  difficultyAnalysis: DifficultyAnalysis;
  timeAnalysis: DetailedTimeAnalysis;
  errorAnalysis: TestErrorAnalysis;
  learningAnalysis: TestLearningAnalysis;
}

export interface QuestionAnalysis {
  questionId: string;
  performance: QuestionPerformanceData;
  statistics: QuestionStatistics;
  issues: QuestionIssue[];
  recommendations: QuestionRecommendation[];
}

export interface QuestionPerformanceData {
  attempts: number;
  correctRate: number;
  averageTime: number;
  skipRate: number;
  difficultyIndex: number;
  discriminationIndex: number;
  pointBiserialCorrelation: number;
}

export interface DifficultyAnalysis {
  intendedDifficulty: string;
  actualDifficulty: number;
  difficultyAccuracy: number;
  difficultyDistribution: DifficultyDistribution[];
  adaptationEffectiveness: number;
}

export interface DifficultyDistribution {
  level: string;
  questions: number;
  averagePerformance: number;
  userSatisfaction: number;
  timeSpent: number;
}

export interface DetailedTimeAnalysis {
  overallTime: TimeStatistics;
  questionTime: QuestionTimeAnalysis[];
  paceAnalysis: PaceAnalysis;
  efficiencyAnalysis: EfficiencyAnalysis;
}

export interface TimeStatistics {
  mean: number;
  median: number;
  standardDeviation: number;
  min: number;
  max: number;
  percentiles: Percentile[];
}

export interface Percentile {
  percentile: number;
  value: number;
}

export interface QuestionTimeAnalysis {
  questionId: string;
  averageTime: number;
  timeDistribution: TimeDistribution[];
  timeEfficiency: number;
  rushingRate: number;
  procrastinationRate: number;
}

export interface TimeDistribution {
  range: string;
  count: number;
  percentage: number;
  performance: number;
}

export interface PaceAnalysis {
  optimalPace: number;
  actualPace: number;
  paceVariability: number;
  paceConsistency: number;
  paceAdaptation: number;
}

export interface EfficiencyAnalysis {
  timeEfficiency: number;
  accuracyEfficiency: number;
  overallEfficiency: number;
  efficiencyFactors: EfficiencyFactor[];
}

export interface EfficiencyFactor {
  factor: string;
  impact: number;
  optimization: string[];
}

export interface TestErrorAnalysis {
  commonErrors: CommonTestError[];
  errorPatterns: TestErrorPattern[];
  errorDistribution: ErrorDistribution[];
  errorImpact: ErrorImpact;
}

export interface CommonTestError {
  error: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedQuestions: string[];
  userSegments: string[];
  solutions: string[];
}

export interface TestErrorPattern {
  pattern: string;
  description: string;
  frequency: number;
  predictors: string[];
  interventions: string[];
}

export interface ErrorDistribution {
  errorType: string;
  distribution: DistributionData[];
  trends: ErrorTrend[];
}

export interface DistributionData {
  segment: string;
  count: number;
  percentage: number;
  severity: string;
}

export interface ErrorTrend {
  period: string;
  change: number;
  direction: 'increasing' | 'decreasing' | 'stable';
  factors: string[];
}

export interface ErrorImpact {
  performanceImpact: number;
  learningImpact: number;
  engagementImpact: number;
  satisfactionImpact: number;
  retentionImpact: number;
}

export interface TestLearningAnalysis {
  learningEffectiveness: number;
  knowledgeRetention: number;
  skillTransfer: number;
  learningCurve: LearningCurveData;
  masteryProgression: MasteryProgression;
}

export interface LearningCurveData {
  initialPerformance: number;
  finalPerformance: number;
  improvementRate: number;
  plateauPoints: PlateauPoint[];
  breakthroughPoints: BreakthroughPoint[];
}

export interface PlateauPoint {
  point: number;
  duration: number;
  performance: number;
  factors: string[];
  interventions: string[];
}

export interface BreakthroughPoint {
  point: number;
  improvement: number;
  triggers: string[];
  sustainability: number;
}

export interface MasteryProgression {
  masteryRate: number;
  timeToMastery: number;
  masteryFactors: MasteryFactor[];
  masteryPredictors: string[];
}

export interface MasteryFactor {
  factor: string;
  correlation: number;
  impact: 'positive' | 'negative' | 'neutral';
  actionable: boolean;
}

export interface TestUserSegmentation {
  segments: UserSegment[];
  segmentPerformance: SegmentPerformance[];
  segmentBehavior: SegmentBehavior[];
  segmentNeeds: SegmentNeeds[];
}

export interface UserSegment {
  segment: string;
  size: number;
  characteristics: string[];
  demographics: SegmentDemographics;
  psychographics: SegmentPsychographics;
}

export interface SegmentDemographics {
  ageDistribution: AgeDistribution[];
  experienceDistribution: ExperienceDistribution[];
  industryDistribution: IndustryDistribution[];
  locationDistribution: LocationDistribution[];
}

export interface AgeDistribution {
  ageRange: string;
  percentage: number;
  performance: number;
  engagement: number;
}

export interface ExperienceDistribution {
  experienceLevel: string;
  percentage: number;
  performance: number;
  preferences: string[];
}

export interface IndustryDistribution {
  industry: string;
  percentage: number;
  performance: number;
  specificNeeds: string[];
}

export interface LocationDistribution {
  location: string;
  percentage: number;
  performance: number;
  culturalFactors: string[];
}

export interface SegmentPsychographics {
  motivations: string[];
  preferences: string[];
  behaviors: string[];
  attitudes: string[];
  values: string[];
}

export interface SegmentPerformance {
  segment: string;
  averageScore: number;
  completionRate: number;
  improvementRate: number;
  engagement: number;
  satisfaction: number;
  retention: number;
}

export interface SegmentBehavior {
  segment: string;
  behaviorPatterns: BehaviorPattern[];
  preferences: SegmentPreferences;
  engagementPatterns: EngagementPattern[];
}

export interface BehaviorPattern {
  pattern: string;
  frequency: number;
  context: string[];
  outcomes: string[];
}

export interface SegmentPreferences {
  testTypes: string[];
  difficulty: string;
  duration: string;
  format: string[];
  timing: string;
  support: string[];
}

export interface EngagementPattern {
  pattern: string;
  frequency: number;
  triggers: string[];
  outcomes: string[];
  optimization: string[];
}

export interface SegmentNeeds {
  segment: string;
  primaryNeeds: string[];
  secondaryNeeds: string[];
  painPoints: string[];
  opportunities: string[];
  solutions: string[];
}

export interface TestRecommendation {
  type: 'content' | 'structure' | 'difficulty' | 'timing' | 'personalization';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  rationale: string[];
  implementation: string[];
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  successMetrics: string[];
}

export interface PerformanceTrend {
  metric: string;
  timeframe: string;
  trend: 'improving' | 'declining' | 'stable' | 'volatile';
  magnitude: number;
  significance: 'low' | 'medium' | 'high';
  factors: TrendFactor[];
  predictions: TrendPrediction[];
}

export interface TrendFactor {
  factor: string;
  contribution: number;
  type: 'internal' | 'external' | 'seasonal' | 'cyclical';
  controllable: boolean;
  actions: string[];
}

export interface TrendPrediction {
  timeframe: string;
  predictedValue: number;
  confidence: number;
  scenarios: PredictionScenario[];
}

export interface PredictionScenario {
  scenario: string;
  probability: number;
  outcome: number;
  factors: string[];
  implications: string[];
}

export interface TestBenchmark {
  benchmarkType: string;
  comparison: BenchmarkComparison;
  position: string;
  gaps: BenchmarkGap[];
  opportunities: string[];
  threats: string[];
}

export interface BenchmarkComparison {
  metric: string;
  yourValue: number;
  benchmarkValue: number;
  difference: number;
  percentile: number;
  ranking: string;
}

export interface BenchmarkGap {
  area: string;
  gap: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  closingStrategy: string[];
  timeframe: string;
  effort: 'low' | 'medium' | 'high';
}

export interface UserPerformanceReport {
  userId: string;
  period: DatePeriod;
  summary: UserPerformanceSummary;
  detailedAnalysis: UserDetailedAnalysis;
  progressTracking: UserProgressTracking;
  recommendations: UserRecommendation[];
  predictions: UserPrediction[];
  benchmarks: UserBenchmark[];
}

export interface UserPerformanceSummary {
  testsCompleted: number;
  averageScore: number;
  totalTime: number;
  improvementRate: number;
  currentLevel: string;
  goalsAchieved: number;
  certificationsEarned: number;
}

export interface UserDetailedAnalysis {
  categoryAnalysis: UserCategoryAnalysis[];
  skillAnalysis: UserSkillAnalysis[];
  learningAnalysis: UserLearningAnalysis;
  behaviorAnalysis: UserBehaviorAnalysis;
  engagementAnalysis: UserEngagementAnalysis;
}

export interface UserCategoryAnalysis {
  category: string;
  performance: CategoryPerformanceData;
  progression: CategoryProgression;
  comparison: CategoryComparison;
  recommendations: string[];
}

export interface CategoryPerformanceData {
  testsCompleted: number;
  averageScore: number;
  bestScore: number;
  improvement: number;
  consistency: number;
  efficiency: number;
}

export interface CategoryProgression {
  startLevel: string;
  currentLevel: string;
  targetLevel: string;
  progressRate: number;
  timeToTarget: string;
  milestones: ProgressMilestone[];
}

export interface CategoryComparison {
  industryAverage: number;
  peerAverage: number;
  topPerformers: number;
  percentile: number;
  ranking: string;
}

export interface UserSkillAnalysis {
  skill: string;
  currentLevel: string;
  proficiency: number;
  growth: number;
  marketValue: number;
  competitiveness: number;
  developmentPriority: string;
  learningPath: string[];
}

export interface UserLearningAnalysis {
  learningStyle: string;
  learningEfficiency: number;
  retentionRate: number;
  applicationRate: number;
  transferRate: number;
  adaptationSpeed: number;
  learningPreferences: LearningPreferences;
  optimizations: LearningOptimization[];
}

export interface LearningPreferences {
  contentType: string[];
  difficulty: string;
  pace: string;
  format: string[];
  timing: string;
  support: string[];
}

export interface LearningOptimization {
  area: string;
  currentEfficiency: number;
  targetEfficiency: number;
  strategies: string[];
  expectedImprovement: number;
  timeframe: string;
}

export interface UserBehaviorAnalysis {
  behaviorPatterns: UserBehaviorPattern[];
  motivationFactors: MotivationFactor[];
  engagementDrivers: EngagementDriver[];
  barriers: LearningBarrier[];
  opportunities: BehaviorOpportunity[];
}

export interface UserBehaviorPattern {
  pattern: string;
  frequency: number;
  context: string[];
  effectiveness: number;
  recommendations: string[];
}

export interface MotivationFactor {
  factor: string;
  strength: number;
  stability: number;
  triggers: string[];
  sustainment: string[];
}

export interface EngagementDriver {
  driver: string;
  impact: number;
  frequency: number;
  optimization: string[];
}

export interface LearningBarrier {
  barrier: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  frequency: number;
  impact: string;
  solutions: string[];
}

export interface BehaviorOpportunity {
  opportunity: string;
  potential: number;
  effort: 'low' | 'medium' | 'high';
  implementation: string[];
  expectedOutcome: string;
}

export interface UserEngagementAnalysis {
  engagementLevel: string;
  engagementScore: number;
  engagementTrends: EngagementTrend[];
  engagementFactors: EngagementFactor[];
  retentionRisk: RetentionRisk;
  engagementOptimization: EngagementOptimization[];
}

export interface EngagementTrend {
  metric: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  period: string;
  magnitude: number;
  factors: string[];
}

export interface EngagementFactor {
  factor: string;
  correlation: number;
  impact: 'positive' | 'negative' | 'neutral';
  actionable: boolean;
  interventions: string[];
}

export interface RetentionRisk {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  riskFactors: RiskFactor[];
  interventions: RetentionIntervention[];
  timeline: string;
}

export interface RiskFactor {
  factor: string;
  weight: number;
  trend: string;
  mitigation: string[];
}

export interface RetentionIntervention {
  intervention: string;
  effectiveness: number;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  successProbability: number;
}

export interface EngagementOptimization {
  strategy: string;
  currentLevel: number;
  targetLevel: number;
  actions: string[];
  expectedImprovement: number;
  implementation: string;
}

export interface UserProgressTracking {
  overallProgress: OverallProgressData;
  goalProgress: GoalProgressData[];
  skillProgress: SkillProgressData[];
  milestoneProgress: MilestoneProgressData[];
  trajectoryAnalysis: TrajectoryAnalysis;
}

export interface OverallProgressData {
  currentLevel: string;
  progressRate: number;
  timeInvested: number;
  efficiency: number;
  consistency: number;
  momentum: number;
  trajectory: string;
}

export interface GoalProgressData {
  goalId: string;
  progress: number;
  onTrack: boolean;
  timeRemaining: number;
  completionProbability: number;
  blockers: string[];
  accelerators: string[];
}

export interface SkillProgressData {
  skill: string;
  startLevel: string;
  currentLevel: string;
  targetLevel: string;
  progressRate: number;
  timeToTarget: string;
  confidence: number;
}

export interface MilestoneProgressData {
  milestone: string;
  progress: number;
  achieved: boolean;
  timeToAchievement: string;
  requirements: RequirementStatus[];
}

export interface RequirementStatus {
  requirement: string;
  completed: boolean;
  progress: number;
  blockers: string[];
}

export interface TrajectoryAnalysis {
  currentTrajectory: string;
  projectedOutcome: string;
  confidenceLevel: number;
  influencingFactors: TrajectoryFactor[];
  alternativeScenarios: TrajectoryScenario[];
  optimizations: TrajectoryOptimization[];
}

export interface TrajectoryFactor {
  factor: string;
  impact: number;
  controllable: boolean;
  trend: string;
  interventions: string[];
}

export interface TrajectoryScenario {
  scenario: string;
  probability: number;
  outcome: string;
  requirements: string[];
  timeline: string;
}

export interface TrajectoryOptimization {
  optimization: string;
  impact: number;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  successProbability: number;
}

export interface UserRecommendation {
  type: 'learning' | 'practice' | 'goal' | 'strategy' | 'resource';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  rationale: string[];
  implementation: string[];
  expectedBenefit: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  successProbability: number;
}

export interface UserPrediction {
  type:
    | 'performance'
    | 'goal_achievement'
    | 'skill_development'
    | 'engagement'
    | 'retention';
  prediction: string;
  probability: number;
  timeframe: string;
  confidence: number;
  factors: PredictionFactor[];
  scenarios: UserPredictionScenario[];
  recommendations: string[];
}

export interface UserPredictionScenario {
  scenario: string;
  probability: number;
  outcome: string;
  timeline: string;
  requirements: string[];
  risks: string[];
}

export interface UserBenchmark {
  benchmarkType: string;
  comparison: UserBenchmarkComparison;
  position: string;
  percentile: number;
  gaps: UserBenchmarkGap[];
  opportunities: string[];
}

export interface UserBenchmarkComparison {
  metric: string;
  yourValue: number;
  benchmarkValue: number;
  difference: number;
  interpretation: string;
  trend: string;
}

export interface UserBenchmarkGap {
  area: string;
  gap: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  closingStrategy: string[];
  timeframe: string;
  effort: 'low' | 'medium' | 'high';
  priority: number;
}

export interface CategoryPerformanceReport {
  category: string;
  period: DatePeriod;
  summary: CategoryPerformanceSummary;
  testAnalysis: CategoryTestAnalysis[];
  userAnalysis: CategoryUserAnalysis;
  trends: CategoryTrend[];
  benchmarks: CategoryBenchmark[];
  recommendations: CategoryRecommendation[];
}

export interface CategoryPerformanceSummary {
  totalTests: number;
  totalUsers: number;
  averageScore: number;
  completionRate: number;
  userSatisfaction: number;
  growthRate: number;
  marketShare: number;
}

export interface CategoryTestAnalysis {
  testId: string;
  performance: TestPerformanceData;
  popularity: TestPopularityData;
  quality: TestQualityData;
  userFeedback: TestUserFeedback;
}

export interface TestPerformanceData {
  attempts: number;
  completions: number;
  averageScore: number;
  averageTime: number;
  retakeRate: number;
  improvementRate: number;
}

export interface TestPopularityData {
  views: number;
  starts: number;
  completions: number;
  shares: number;
  recommendations: number;
  popularityRank: number;
}

export interface TestQualityData {
  reliability: number;
  validity: number;
  userRating: number;
  expertRating: number;
  contentQuality: number;
  technicalQuality: number;
}

export interface TestUserFeedback {
  averageRating: number;
  totalReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  commonPraise: string[];
  commonCriticisms: string[];
}

export interface CategoryUserAnalysis {
  userDemographics: CategoryUserDemographics;
  userBehavior: CategoryUserBehavior;
  userPerformance: CategoryUserPerformance;
  userSatisfaction: CategoryUserSatisfaction;
}

export interface CategoryUserDemographics {
  totalUsers: number;
  newUsers: number;
  returningUsers: number;
  userDistribution: UserDistribution[];
  growthRate: number;
}

export interface UserDistribution {
  dimension: string;
  segments: DistributionSegment[];
}

export interface DistributionSegment {
  segment: string;
  count: number;
  percentage: number;
  performance: number;
  engagement: number;
}

export interface CategoryUserBehavior {
  averageTestsPerUser: number;
  averageTimePerUser: number;
  retentionRate: number;
  engagementLevel: string;
  behaviorPatterns: CategoryBehaviorPattern[];
}

export interface CategoryBehaviorPattern {
  pattern: string;
  frequency: number;
  userSegments: string[];
  outcomes: string[];
  optimization: string[];
}

export interface CategoryUserPerformance {
  averageScore: number;
  scoreDistribution: ScoreDistribution;
  improvementRate: number;
  masteryRate: number;
  performanceFactors: PerformanceFactor[];
}

export interface PerformanceFactor {
  factor: string;
  correlation: number;
  impact: 'positive' | 'negative' | 'neutral';
  significance: 'low' | 'medium' | 'high';
  actionable: boolean;
}

export interface CategoryUserSatisfaction {
  overallSatisfaction: number;
  npsScore: number;
  satisfactionFactors: SatisfactionFactor[];
  improvementAreas: string[];
  satisfactionTrends: SatisfactionTrend[];
}

export interface SatisfactionFactor {
  factor: string;
  impact: number;
  currentLevel: number;
  targetLevel: number;
  improvement: string[];
}

export interface SatisfactionTrend {
  period: string;
  score: number;
  change: number;
  factors: string[];
}

export interface CategoryTrend {
  metric: string;
  timeframe: string;
  trend: 'growing' | 'declining' | 'stable' | 'volatile';
  magnitude: number;
  drivers: string[];
  implications: string[];
  predictions: CategoryPrediction[];
}

export interface CategoryPrediction {
  timeframe: string;
  prediction: string;
  probability: number;
  confidence: number;
  factors: string[];
  scenarios: string[];
}

export interface CategoryBenchmark {
  benchmarkType: string;
  comparison: CategoryBenchmarkComparison;
  competitivePosition: string;
  marketShare: number;
  differentiators: string[];
  threats: string[];
  opportunities: string[];
}

export interface CategoryBenchmarkComparison {
  metric: string;
  yourValue: number;
  industryAverage: number;
  topPerformers: number;
  marketLeader: number;
  gap: number;
  trend: string;
}

export interface CategoryRecommendation {
  type: 'content' | 'user_experience' | 'marketing' | 'product' | 'strategy';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  rationale: string[];
  implementation: string[];
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  successMetrics: string[];
  riskFactors: string[];
}

// Additional interfaces for comprehensive analytics coverage

export interface BenchmarkType {
  type:
    | 'industry'
    | 'position'
    | 'experience_level'
    | 'company_size'
    | 'geographic'
    | 'demographic';
  parameters: Record<string, any>;
}

export interface BenchmarkReport {
  benchmarkType: BenchmarkType;
  comparisons: BenchmarkComparison[];
  position: BenchmarkPosition;
  insights: BenchmarkInsight[];
  recommendations: BenchmarkRecommendation[];
  actionPlan: BenchmarkActionPlan;
}

export interface BenchmarkPosition {
  overall: string;
  percentile: number;
  ranking: number;
  competitiveAdvantages: string[];
  competitiveDisadvantages: string[];
  marketPosition: string;
}

export interface BenchmarkInsight {
  insight: string;
  significance: 'low' | 'medium' | 'high';
  implications: string[];
  opportunities: string[];
  threats: string[];
}

export interface BenchmarkRecommendation {
  area: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actions: string[];
  expectedImpact: string;
  timeframe: string;
  effort: 'low' | 'medium' | 'high';
}

export interface BenchmarkActionPlan {
  shortTerm: string[];
  mediumTerm: string[];
  longTerm: string[];
  quickWins: string[];
  strategicInitiatives: string[];
  resourceRequirements: string[];
}

export interface LearningOutcomePrediction {
  learningPath: string;
  predictedOutcome: LearningOutcome;
  probability: number;
  timeframe: string;
  confidence: number;
  factors: LearningFactor[];
  risks: LearningRisk[];
  optimizations: LearningOptimization[];
}

export interface LearningOutcome {
  skillsAcquired: string[];
  competencyLevel: string;
  certifications: string[];
  careerImpact: string;
  marketValue: number;
  timeInvestment: number;
}

export interface LearningFactor {
  factor: string;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
  controllable: boolean;
  optimization: string[];
}

export interface LearningRisk {
  risk: string;
  probability: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string[];
  monitoring: string[];
}

export interface MarketTrendPrediction {
  category: string;
  timeframe: string;
  trends: MarketTrend[];
  opportunities: MarketOpportunity[];
  threats: MarketThreat[];
  recommendations: MarketRecommendation[];
  confidence: number;
}

export interface MarketTrend {
  trend: string;
  direction: 'growing' | 'declining' | 'stable' | 'emerging';
  magnitude: number;
  drivers: string[];
  timeline: string;
  implications: string[];
}

export interface MarketOpportunity {
  opportunity: string;
  potential: number;
  timeframe: string;
  requirements: string[];
  competition: 'low' | 'medium' | 'high';
  barriers: string[];
}

export interface MarketThreat {
  threat: string;
  probability: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  timeframe: string;
  mitigation: string[];
  monitoring: string[];
}

export interface MarketRecommendation {
  type: 'product' | 'strategy' | 'positioning' | 'investment' | 'partnership';
  priority: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
  rationale: string[];
  implementation: string[];
  expectedOutcome: string;
  timeframe: string;
  investment: string;
}

export interface ReportType {
  type:
    | 'summary'
    | 'detailed'
    | 'executive'
    | 'technical'
    | 'comparative'
    | 'predictive';
  format: 'pdf' | 'html' | 'json' | 'csv' | 'excel';
  audience: 'user' | 'admin' | 'stakeholder' | 'analyst' | 'executive';
  customizations: ReportCustomization[];
}

export interface ReportCustomization {
  section: string;
  included: boolean;
  level: 'summary' | 'detailed' | 'comprehensive';
  visualizations: string[];
  filters: Record<string, any>;
}

export interface AnalyticsReport {
  reportId: string;
  reportType: ReportType;
  period: DatePeriod;
  generatedAt: Date;
  summary: ReportSummary;
  sections: ReportSection[];
  visualizations: ReportVisualization[];
  insights: ReportInsight[];
  recommendations: ReportRecommendation[];
  appendices: ReportAppendix[];
}

export interface ReportSummary {
  keyMetrics: KeyMetric[];
  highlights: string[];
  concerns: string[];
  trends: string[];
  recommendations: string[];
}

export interface KeyMetric {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  significance: 'low' | 'medium' | 'high';
  target?: number;
}

export interface ReportSection {
  section: string;
  title: string;
  content: SectionContent;
  visualizations: string[];
  insights: string[];
  recommendations: string[];
}

export interface SectionContent {
  type: 'text' | 'table' | 'chart' | 'metrics' | 'analysis';
  data: any;
  formatting: ContentFormatting;
}

export interface ContentFormatting {
  style: string;
  layout: string;
  colors: string[];
  fonts: string[];
  spacing: number;
}

export interface ReportVisualization {
  id: string;
  type:
    | 'line_chart'
    | 'bar_chart'
    | 'pie_chart'
    | 'scatter_plot'
    | 'heatmap'
    | 'funnel'
    | 'gauge';
  title: string;
  data: VisualizationData;
  configuration: VisualizationConfig;
  insights: string[];
}

export interface VisualizationData {
  datasets: Dataset[];
  labels: string[];
  metadata: Record<string, any>;
}

export interface Dataset {
  label: string;
  data: number[];
  color: string;
  type?: string;
}

export interface VisualizationConfig {
  responsive: boolean;
  interactive: boolean;
  animations: boolean;
  legend: boolean;
  tooltips: boolean;
  customOptions: Record<string, any>;
}

export interface ReportInsight {
  type: 'trend' | 'anomaly' | 'opportunity' | 'risk' | 'achievement';
  title: string;
  description: string;
  significance: 'low' | 'medium' | 'high' | 'critical';
  evidence: string[];
  implications: string[];
  actions: string[];
}

export interface ReportRecommendation {
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description: string;
  rationale: string[];
  implementation: ImplementationPlan;
  expectedOutcome: string;
  successMetrics: string[];
  risks: string[];
}

export interface ImplementationPlan {
  phases: ImplementationPhase[];
  timeline: string;
  resources: string[];
  dependencies: string[];
  milestones: string[];
}

export interface ImplementationPhase {
  phase: string;
  duration: string;
  activities: string[];
  deliverables: string[];
  success_criteria: string[];
}

export interface ReportAppendix {
  title: string;
  type:
    | 'methodology'
    | 'data_sources'
    | 'definitions'
    | 'calculations'
    | 'limitations';
  content: string;
  references: string[];
}
