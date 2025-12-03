import { ResumeAnalytics, PerformanceMetrics } from '../entities/Resume';

export interface ResumeAnalyticsService {
  // Event tracking
  trackEvent(
    resumeId: string,
    event: Omit<AnalyticsEvent, 'timestamp'>
  ): Promise<void>;
  trackResumeView(resumeId: string, viewerInfo: ViewerInfo): Promise<void>;
  trackResumeDownload(
    resumeId: string,
    downloadInfo: DownloadInfo
  ): Promise<void>;
  trackResumeShare(resumeId: string, shareInfo: ShareInfo): Promise<void>;
  trackApplicationSubmission(
    resumeId: string,
    applicationInfo: ApplicationInfo
  ): Promise<void>;
  trackResponse(resumeId: string, responseInfo: ResponseInfo): Promise<void>;

  // Metrics calculation
  calculateResumeMetrics(resumeId: string): Promise<ResumeAnalytics>;
  calculateUserMetrics(userId: string): Promise<UserAnalyticsMetrics>;
  calculateGlobalMetrics(): Promise<GlobalAnalyticsMetrics>;

  // Performance analysis
  analyzeResumePerformance(resumeId: string): Promise<PerformanceAnalysis>;
  compareResumePerformance(resumeIds: string[]): Promise<PerformanceComparison>;
  analyzeTemplatePerformance(
    templateId: string
  ): Promise<TemplatePerformanceAnalysis>;

  // Reporting
  generateUserReport(
    userId: string,
    period: DateRange
  ): Promise<UserAnalyticsReport>;
  generateResumeReport(
    resumeId: string,
    period: DateRange
  ): Promise<ResumeAnalyticsReport>;
  generateGlobalReport(period: DateRange): Promise<GlobalAnalyticsReport>;

  // Insights and recommendations
  getPersonalizedInsights(userId: string): Promise<PersonalizedInsight[]>;
  getResumeInsights(resumeId: string): Promise<ResumeInsight[]>;
  getIndustryBenchmarks(industry: string): Promise<IndustryBenchmarks>;
  getPositionBenchmarks(position: string): Promise<PositionBenchmarks>;

  // A/B Testing
  createABTest(testConfig: ABTestConfig): Promise<ABTest>;
  trackABTestResult(
    testId: string,
    resumeId: string,
    outcome: TestOutcome
  ): Promise<void>;
  analyzeABTestResults(testId: string): Promise<ABTestResults>;

  // Conversion tracking
  trackConversionFunnel(resumeId: string): Promise<ConversionFunnel>;
  analyzeConversionRates(userId: string): Promise<ConversionAnalysis>;

  // Predictive analytics
  predictResumeSuccess(resumeId: string): Promise<SuccessPrediction>;
  predictOptimalTiming(resumeId: string): Promise<TimingPrediction>;
  predictMarketTrends(industry: string): Promise<MarketTrendPrediction>;
}

export interface AnalyticsEvent {
  type:
    | 'view'
    | 'download'
    | 'share'
    | 'application'
    | 'response'
    | 'interview'
    | 'edit'
    | 'export';
  timestamp: Date;
  metadata: Record<string, any>;
  source: string;
  userAgent?: string;
  ipAddress?: string;
  location?: GeographicInfo;
}

export interface ViewerInfo {
  viewerType: 'owner' | 'recruiter' | 'peer' | 'anonymous';
  source: 'direct' | 'share_link' | 'platform' | 'search';
  duration?: number; // in seconds
  sectionsViewed: string[];
  deviceInfo: DeviceInfo;
  location?: GeographicInfo;
}

export interface DownloadInfo {
  format: 'pdf' | 'docx' | 'html' | 'txt';
  quality: 'draft' | 'standard' | 'high' | 'print';
  source: 'direct' | 'share_link' | 'application';
  deviceInfo: DeviceInfo;
  purpose?: 'application' | 'backup' | 'review' | 'sharing';
}

export interface ShareInfo {
  channel: 'email' | 'linkedin' | 'direct_link' | 'social_media';
  recipientType: 'recruiter' | 'peer' | 'mentor' | 'network';
  message?: string;
  expirySet: boolean;
  passwordProtected: boolean;
}

export interface ApplicationInfo {
  jobTitle: string;
  company: string;
  industry: string;
  applicationMethod: 'direct' | 'platform' | 'referral' | 'recruiter';
  customizations: string[];
  matchScore?: number;
}

export interface ResponseInfo {
  responseType: 'positive' | 'negative' | 'neutral' | 'interview_request';
  responseTime: number; // in hours
  source: 'email' | 'phone' | 'platform' | 'recruiter';
  feedback?: string;
  nextSteps?: string;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  screenResolution?: string;
}

export interface GeographicInfo {
  country: string;
  region?: string;
  city?: string;
  timezone: string;
}

export interface UserAnalyticsMetrics {
  totalResumes: number;
  activeResumes: number;
  averageScore: number;
  totalViews: number;
  totalDownloads: number;
  totalShares: number;
  totalApplications: number;
  responseRate: number; // 0-100
  interviewRate: number; // 0-100
  averageResponseTime: number; // in hours
  improvementRate: number; // percentage
  engagementScore: number; // 0-100
  marketabilityScore: number; // 0-100
}

export interface GlobalAnalyticsMetrics {
  totalUsers: number;
  totalResumes: number;
  totalViews: number;
  totalDownloads: number;
  averageUserScore: number;
  globalResponseRate: number;
  globalInterviewRate: number;
  mostPopularTemplate: string;
  mostPopularIndustry: string;
  averageGenerationTime: number; // in seconds
  platformGrowthRate: number; // percentage
}

export interface PerformanceAnalysis {
  resumeId: string;
  overallPerformance: number; // 0-100
  performanceMetrics: PerformanceMetric[];
  performanceFactors: PerformanceFactor[];
  benchmarkComparison: BenchmarkComparison;
  trends: PerformanceTrend[];
  recommendations: PerformanceRecommendation[];
  predictedOutcomes: PredictedOutcome[];
}

export interface PerformanceMetric {
  metric: string;
  value: number;
  benchmark: number;
  percentile: number;
  trend: 'improving' | 'stable' | 'declining';
  significance: 'low' | 'medium' | 'high';
}

export interface PerformanceFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number; // 0-1
  description: string;
  actionable: boolean;
  recommendations?: string[];
}

export interface BenchmarkComparison {
  industry: string;
  position: string;
  experienceLevel: string;
  yourScore: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
  competitivePosition: 'leading' | 'competitive' | 'average' | 'below_average';
}

export interface PerformanceTrend {
  metric: string;
  timeframe: string;
  direction: 'up' | 'down' | 'stable';
  magnitude: number;
  acceleration: 'increasing' | 'decreasing' | 'constant';
  predictedContinuation: boolean;
}

export interface PerformanceRecommendation {
  type: 'immediate' | 'short_term' | 'long_term';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: number; // performance improvement
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
}

export interface PredictedOutcome {
  outcome: 'response' | 'interview' | 'offer' | 'rejection';
  probability: number; // 0-100
  timeframe: string;
  confidence: number; // 0-100
  factors: string[];
}

export interface PerformanceComparison {
  resumes: ResumePerformanceData[];
  insights: ComparisonInsight[];
  bestPractices: BestPractice[];
  recommendations: string[];
  winningFactors: WinningFactor[];
}

export interface ResumePerformanceData {
  resumeId: string;
  title: string;
  score: number;
  responseRate: number;
  interviewRate: number;
  views: number;
  applications: number;
  strengths: string[];
  weaknesses: string[];
}

export interface ComparisonInsight {
  type: 'pattern' | 'anomaly' | 'opportunity' | 'risk';
  title: string;
  description: string;
  affectedResumes: string[];
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
}

export interface BestPractice {
  practice: string;
  description: string;
  implementation: string;
  evidence: string[];
  applicability: string[];
  impact: number; // 0-100
}

export interface WinningFactor {
  factor: string;
  frequency: number; // percentage in top performers
  impact: number; // 0-100
  description: string;
  implementation: string[];
  examples: string[];
}

export interface TemplatePerformanceAnalysis {
  templateId: string;
  templateName: string;
  usageStats: TemplateUsageStats;
  performanceMetrics: TemplatePerformanceMetrics;
  userFeedback: TemplateFeedbackSummary;
  industryPerformance: IndustryPerformanceData[];
  recommendations: TemplateRecommendation[];
}

export interface TemplateUsageStats {
  totalUsage: number;
  activeUsers: number;
  averageUsageDuration: number; // in days
  retentionRate: number; // percentage
  conversionRate: number; // percentage
  popularIndustries: string[];
  popularPositions: string[];
}

export interface TemplatePerformanceMetrics {
  averageScore: number;
  averageResponseRate: number;
  averageInterviewRate: number;
  averageViews: number;
  averageDownloads: number;
  userSatisfaction: number; // 0-100
  successRate: number; // percentage
}

export interface TemplateFeedbackSummary {
  averageRating: number; // 1-5
  totalReviews: number;
  positiveAspects: string[];
  improvementAreas: string[];
  commonComplaints: string[];
  recommendationRate: number; // percentage
}

export interface IndustryPerformanceData {
  industry: string;
  usageCount: number;
  averageScore: number;
  successRate: number;
  ranking: number;
  suitabilityScore: number; // 0-100
}

export interface TemplateRecommendation {
  type: 'design' | 'content' | 'structure' | 'functionality';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  expectedImpact: string;
  implementation: string;
  effort: 'low' | 'medium' | 'high';
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
  granularity: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface UserAnalyticsReport {
  userId: string;
  period: DateRange;
  summary: UserAnalyticsMetrics;
  trends: TrendAnalysis[];
  achievements: Achievement[];
  recommendations: ReportRecommendation[];
  nextSteps: string[];
  goals: AnalyticsGoal[];
}

export interface ResumeAnalyticsReport {
  resumeId: string;
  period: DateRange;
  summary: ResumeAnalytics;
  performance: PerformanceAnalysis;
  engagement: EngagementAnalysis;
  conversion: ConversionAnalysis;
  recommendations: ReportRecommendation[];
}

export interface GlobalAnalyticsReport {
  period: DateRange;
  summary: GlobalAnalyticsMetrics;
  trends: TrendAnalysis[];
  topPerformers: TopPerformer[];
  industryInsights: IndustryInsight[];
  platformInsights: PlatformInsight[];
  predictions: MarketPrediction[];
}

export interface TrendAnalysis {
  metric: string;
  trend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  changePercentage: number;
  period: string;
  significance: 'low' | 'medium' | 'high';
  factors: TrendFactor[];
}

export interface TrendFactor {
  factor: string;
  contribution: number; // percentage
  type: 'internal' | 'external' | 'seasonal' | 'market';
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'engagement' | 'improvement' | 'milestone';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  unlockedAt: Date;
  impact: string;
}

export interface ReportRecommendation {
  type: 'optimization' | 'strategy' | 'content' | 'timing' | 'targeting';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: string;
  timeframe: string;
  effort: 'low' | 'medium' | 'high';
}

export interface AnalyticsGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  progress: number; // 0-100
  deadline: Date;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

export interface EngagementAnalysis {
  engagementScore: number; // 0-100
  viewPatterns: ViewPattern[];
  interactionDepth: InteractionDepth;
  audienceAnalysis: AudienceAnalysis;
  contentPerformance: ContentPerformance[];
}

export interface ViewPattern {
  pattern: string;
  frequency: number; // percentage
  description: string;
  implications: string[];
  optimization: string[];
}

export interface InteractionDepth {
  averageViewDuration: number; // in seconds
  sectionsViewedPerSession: number;
  bounceRate: number; // percentage
  returnVisitorRate: number; // percentage
  engagementQuality: 'low' | 'medium' | 'high';
}

export interface AudienceAnalysis {
  demographics: AudienceDemographic[];
  behavior: AudienceBehavior[];
  preferences: AudiencePreference[];
  segments: AudienceSegment[];
}

export interface AudienceDemographic {
  dimension: string;
  distribution: DemographicDistribution[];
  insights: string[];
}

export interface DemographicDistribution {
  value: string;
  percentage: number;
  engagement: number; // 0-100
  conversion: number; // 0-100
}

export interface AudienceBehavior {
  behavior: string;
  frequency: number; // percentage
  correlation: BehaviorCorrelation[];
  impact: 'positive' | 'negative' | 'neutral';
}

export interface BehaviorCorrelation {
  metric: string;
  correlation: number; // -1 to 1
  significance: 'low' | 'medium' | 'high';
}

export interface AudiencePreference {
  preference: string;
  strength: number; // 0-100
  segment: string;
  implications: string[];
}

export interface AudienceSegment {
  segment: string;
  size: number; // percentage
  characteristics: string[];
  behavior: string[];
  value: number; // 0-100
  strategy: string[];
}

export interface ContentPerformance {
  section: string;
  viewRate: number; // percentage
  engagementScore: number; // 0-100
  conversionImpact: number; // 0-100
  optimizationOpportunities: string[];
}

export interface ConversionFunnel {
  stages: ConversionStage[];
  overallConversion: number; // percentage
  dropoffPoints: DropoffPoint[];
  optimizationOpportunities: string[];
}

export interface ConversionStage {
  stage: string;
  visitors: number;
  conversions: number;
  conversionRate: number; // percentage
  averageTime: number; // in hours
  dropoffRate: number; // percentage
}

export interface DropoffPoint {
  stage: string;
  dropoffRate: number; // percentage
  commonReasons: string[];
  impact: 'low' | 'medium' | 'high';
  solutions: string[];
}

export interface ConversionAnalysis {
  overallConversionRate: number; // percentage
  conversionFunnel: ConversionFunnel;
  conversionFactors: ConversionFactor[];
  optimizationOpportunities: ConversionOptimization[];
  predictions: ConversionPrediction[];
}

export interface ConversionFactor {
  factor: string;
  impact: number; // -100 to 100
  confidence: number; // 0-100
  actionable: boolean;
  recommendations: string[];
}

export interface ConversionOptimization {
  opportunity: string;
  potentialImprovement: number; // percentage
  effort: 'low' | 'medium' | 'high';
  implementation: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ConversionPrediction {
  scenario: string;
  probability: number; // 0-100
  timeframe: string;
  confidence: number; // 0-100
  factors: string[];
}

export interface PersonalizedInsight {
  type: 'performance' | 'opportunity' | 'trend' | 'benchmark' | 'prediction';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  recommendations: string[];
  dataPoints: InsightDataPoint[];
  confidence: number; // 0-100
}

export interface ResumeInsight {
  type: 'strength' | 'weakness' | 'opportunity' | 'threat' | 'trend';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  urgency: 'low' | 'medium' | 'high';
  actionable: boolean;
  recommendations: string[];
  evidence: string[];
}

export interface InsightDataPoint {
  metric: string;
  value: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  benchmark: number;
  percentile: number;
  interpretation: string;
}

export interface IndustryBenchmarks {
  industry: string;
  averageResponseRate: number;
  averageInterviewRate: number;
  averageResumeScore: number;
  topPerformingStrategies: string[];
  commonMistakes: string[];
  seasonalFactors: SeasonalFactor[];
  competitionLevel: 'low' | 'medium' | 'high' | 'very_high';
  growthTrends: GrowthTrend[];
}

export interface PositionBenchmarks {
  position: string;
  averageResponseRate: number;
  averageInterviewRate: number;
  averageResumeScore: number;
  keySuccessFactors: string[];
  commonRequirements: string[];
  salaryBenchmarks: SalaryBenchmark[];
  careerProgression: CareerProgressionData[];
}

export interface SeasonalFactor {
  factor: string;
  season: string;
  impact: number; // -100 to 100
  description: string;
  recommendations: string[];
}

export interface GrowthTrend {
  trend: string;
  direction: 'growing' | 'declining' | 'stable';
  magnitude: number; // percentage
  timeframe: string;
  drivers: string[];
}

export interface SalaryBenchmark {
  experienceLevel: string;
  location: string;
  averageSalary: number;
  salaryRange: SalaryRange;
  benefits: string[];
  growthRate: number; // percentage
}

export interface CareerProgressionData {
  fromLevel: string;
  toLevel: string;
  averageTime: string;
  successRate: number; // percentage
  requiredSkills: string[];
  typicalPath: string[];
}

export interface ABTestConfig {
  name: string;
  description: string;
  hypothesis: string;
  variants: ABTestVariant[];
  targetMetric: string;
  sampleSize: number;
  duration: number; // in days
  significanceLevel: number; // 0-1
  trafficAllocation: number; // 0-100
}

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  changes: VariantChange[];
  allocation: number; // percentage
}

export interface VariantChange {
  element: string;
  changeType: 'content' | 'design' | 'structure' | 'behavior';
  description: string;
  implementation: any;
}

export interface ABTest {
  id: string;
  config: ABTestConfig;
  status: 'draft' | 'running' | 'completed' | 'paused' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  participants: number;
  results?: ABTestResults;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestOutcome {
  variant: string;
  metric: string;
  value: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ABTestResults {
  testId: string;
  status: 'running' | 'completed' | 'inconclusive';
  participants: number;
  duration: number; // in days
  variants: VariantResult[];
  winner?: string; // variant id
  confidence: number; // 0-100
  significance: number; // 0-1
  insights: TestInsight[];
  recommendations: string[];
}

export interface VariantResult {
  variantId: string;
  participants: number;
  conversions: number;
  conversionRate: number; // percentage
  averageMetricValue: number;
  confidence: number; // 0-100
  improvement: number; // percentage vs control
}

export interface TestInsight {
  type: 'performance' | 'behavior' | 'segment' | 'unexpected';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  recommendations: string[];
}

export interface SuccessPrediction {
  resumeId: string;
  overallSuccessProbability: number; // 0-100
  predictions: OutcomePrediction[];
  factors: PredictionFactor[];
  confidence: number; // 0-100
  recommendations: PredictionRecommendation[];
  timeframe: string;
}

export interface OutcomePrediction {
  outcome: 'response' | 'interview' | 'offer' | 'rejection';
  probability: number; // 0-100
  timeframe: string;
  confidence: number; // 0-100
  factors: string[];
}

export interface PredictionFactor {
  factor: string;
  weight: number; // 0-1
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-100
  description: string;
  actionable: boolean;
}

export interface PredictionRecommendation {
  type: 'optimization' | 'timing' | 'targeting' | 'strategy';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  implementation: string;
  expectedImpact: number; // probability improvement
  effort: 'low' | 'medium' | 'high';
}

export interface TimingPrediction {
  resumeId: string;
  optimalTiming: OptimalTiming[];
  seasonalFactors: SeasonalFactor[];
  marketConditions: MarketCondition[];
  recommendations: TimingRecommendation[];
  confidence: number; // 0-100
}

export interface OptimalTiming {
  action: 'submit' | 'follow_up' | 'update' | 'reapply';
  optimalTime: Date;
  probability: number; // 0-100
  reasoning: string[];
  alternatives: AlternativeTiming[];
}

export interface AlternativeTiming {
  time: Date;
  probability: number; // 0-100
  tradeoffs: string[];
}

export interface TimingRecommendation {
  recommendation: string;
  timing: string;
  reasoning: string[];
  expectedOutcome: string;
  confidence: number; // 0-100
}

export interface MarketTrendPrediction {
  industry: string;
  timeframe: string;
  trends: PredictedTrend[];
  opportunities: MarketOpportunity[];
  risks: MarketRisk[];
  recommendations: MarketRecommendation[];
  confidence: number; // 0-100
}

export interface PredictedTrend {
  trend: string;
  direction: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  magnitude: number; // percentage
  probability: number; // 0-100
  drivers: string[];
  implications: string[];
}

export interface MarketOpportunity {
  opportunity: string;
  potential: number; // 0-100
  timeframe: string;
  requirements: string[];
  competition: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface MarketRisk {
  risk: string;
  probability: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  timeframe: string;
  mitigation: string[];
  indicators: string[];
}

export interface MarketRecommendation {
  type: 'skill_development' | 'positioning' | 'timing' | 'strategy';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  implementation: string[];
  timeframe: string;
  expectedImpact: string;
}

export interface TopPerformer {
  userId: string;
  metric: string;
  value: number;
  rank: number;
  anonymizedName: string;
  industry: string;
  position: string;
}

export interface IndustryInsight {
  industry: string;
  insight: string;
  impact: 'low' | 'medium' | 'high';
  trend: 'emerging' | 'growing' | 'stable' | 'declining';
  evidence: string[];
  implications: string[];
  recommendations: string[];
}

export interface PlatformInsight {
  insight: string;
  category: 'user_behavior' | 'feature_usage' | 'performance' | 'satisfaction';
  impact: 'low' | 'medium' | 'high';
  evidence: string[];
  recommendations: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface MarketPrediction {
  prediction: string;
  timeframe: string;
  probability: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'transformative';
  factors: string[];
  implications: string[];
  preparation: string[];
}
