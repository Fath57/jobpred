import {
  OnboardingAnalytics,
  FlowAnalytics,
  StepAnalytics,
} from '../entities/User';

export interface OnboardingAnalyticsRepository {
  // Event tracking
  trackEvent(
    userId: string,
    sessionId: string,
    event: OnboardingEvent
  ): Promise<void>;
  trackStepEvent(
    sessionId: string,
    stepId: string,
    event: StepEvent
  ): Promise<void>;
  trackUserInteraction(
    sessionId: string,
    interaction: UserInteraction
  ): Promise<void>;
  trackPerformanceMetric(
    sessionId: string,
    metric: PerformanceMetric
  ): Promise<void>;

  // Analytics aggregation
  getOnboardingAnalytics(period: DatePeriod): Promise<OnboardingAnalytics>;
  getFlowAnalytics(flowId: string, period: DatePeriod): Promise<FlowAnalytics>;
  getStepAnalytics(stepId: string, period: DatePeriod): Promise<StepAnalytics>;
  getUserAnalytics(userId: string): Promise<UserOnboardingAnalytics>;

  // Funnel analysis
  getFunnelAnalysis(
    flowId: string,
    period: DatePeriod
  ): Promise<FunnelAnalysis>;
  getCohortAnalysis(
    cohortDefinition: CohortDefinition,
    period: DatePeriod
  ): Promise<CohortAnalysis>;
  getRetentionAnalysis(period: DatePeriod): Promise<RetentionAnalysis>;

  // Segmentation analysis
  getSegmentAnalysis(
    segmentDefinition: SegmentDefinition,
    period: DatePeriod
  ): Promise<SegmentAnalysis>;
  getUserSegments(): Promise<UserSegment[]>;
  getSegmentPerformance(
    segmentId: string,
    period: DatePeriod
  ): Promise<SegmentPerformance>;

  // Predictive analytics
  getPredictiveInsights(userId: string): Promise<PredictiveInsight[]>;
  getChurnPrediction(userId: string): Promise<ChurnPrediction>;
  getCompletionPrediction(sessionId: string): Promise<CompletionPrediction>;

  // A/B testing analytics
  getExperimentAnalytics(experimentId: string): Promise<ExperimentAnalytics>;
  getVariantPerformance(
    experimentId: string,
    variantId: string
  ): Promise<VariantPerformance>;
  calculateStatisticalSignificance(
    experimentId: string
  ): Promise<StatisticalSignificance>;

  // Real-time analytics
  getRealTimeMetrics(): Promise<RealTimeMetrics>;
  getActiveUsers(): Promise<ActiveUserMetrics>;
  getCurrentConversions(): Promise<ConversionMetrics>;

  // Custom analytics
  executeCustomQuery(query: AnalyticsQuery): Promise<AnalyticsResult>;
  createCustomReport(reportDefinition: ReportDefinition): Promise<CustomReport>;
  scheduleReport(
    reportId: string,
    schedule: ReportSchedule
  ): Promise<ScheduledReport>;
}

export interface OnboardingAnalyticsService {
  // Insights generation
  generateInsights(
    userId?: string,
    period?: DatePeriod
  ): Promise<OnboardingInsight[]>;
  generateFlowInsights(
    flowId: string,
    period: DatePeriod
  ): Promise<FlowInsight[]>;
  generateUserInsights(userId: string): Promise<UserInsight[]>;

  // Optimization recommendations
  getOptimizationRecommendations(
    flowId: string
  ): Promise<OptimizationRecommendation[]>;
  getPersonalizationRecommendations(
    userId: string
  ): Promise<PersonalizationRecommendation[]>;
  getContentRecommendations(stepId: string): Promise<ContentRecommendation[]>;

  // Benchmarking
  getBenchmarkAnalysis(flowId: string): Promise<BenchmarkAnalysis>;
  getIndustryBenchmarks(industry: string): Promise<IndustryBenchmarks>;
  getCompetitorAnalysis(): Promise<CompetitorAnalysis>;

  // Reporting
  generateExecutiveReport(period: DatePeriod): Promise<ExecutiveReport>;
  generateOperationalReport(period: DatePeriod): Promise<OperationalReport>;
  generateUserExperienceReport(period: DatePeriod): Promise<UXReport>;

  // Data visualization
  getVisualizationData(
    chartType: string,
    filters: AnalyticsFilters
  ): Promise<VisualizationData>;
  createDashboard(dashboardConfig: DashboardConfig): Promise<Dashboard>;
  updateDashboard(
    dashboardId: string,
    updates: DashboardUpdate
  ): Promise<Dashboard>;
}

export interface OnboardingEvent {
  type:
    | 'session_start'
    | 'session_end'
    | 'step_start'
    | 'step_complete'
    | 'step_skip'
    | 'error'
    | 'help_request'
    | 'feedback'
    | 'conversion';
  timestamp: Date;
  properties: Record<string, any>;
  metadata: EventMetadata;
}

export interface StepEvent {
  type:
    | 'enter'
    | 'exit'
    | 'interaction'
    | 'validation'
    | 'error'
    | 'help'
    | 'completion'
    | 'skip';
  timestamp: Date;
  duration?: number; // in seconds
  properties: Record<string, any>;
  metadata: EventMetadata;
}

export interface UserInteraction {
  type:
    | 'click'
    | 'scroll'
    | 'input'
    | 'focus'
    | 'blur'
    | 'hover'
    | 'keypress'
    | 'gesture';
  element: string;
  value?: any;
  timestamp: Date;
  coordinates?: { x: number; y: number };
  metadata: InteractionMetadata;
}

export interface PerformanceMetric {
  metric: string;
  value: number;
  unit: string;
  timestamp: Date;
  context: Record<string, any>;
}

export interface EventMetadata {
  sessionId: string;
  userId: string;
  flowId: string;
  stepId?: string;
  deviceInfo: DeviceInfo;
  browserInfo: BrowserInfo;
  locationInfo: LocationInfo;
}

export interface InteractionMetadata {
  sessionId: string;
  stepId: string;
  elementType: string;
  elementId: string;
  pageUrl: string;
  viewport: { width: number; height: number };
}

export interface UserOnboardingAnalytics {
  userId: string;
  totalSessions: number;
  completedSessions: number;
  abandonedSessions: number;
  totalTimeSpent: number; // in seconds
  averageSessionDuration: number; // in seconds
  stepsCompleted: number;
  stepsSkipped: number;
  errorsEncountered: number;
  helpRequested: number;
  satisfactionScores: number[];
  conversionEvents: ConversionEvent[];
  engagementScore: number; // 0-100
  progressVelocity: number; // steps per day
  retentionProbability: number; // 0-100
}

export interface FunnelAnalysis {
  flowId: string;
  period: DatePeriod;
  steps: FunnelStep[];
  overallConversion: number; // 0-100
  dropoffPoints: FunnelDropoffPoint[];
  optimizationOpportunities: FunnelOptimization[];
}

export interface FunnelStep {
  stepId: string;
  stepName: string;
  order: number;
  entries: number;
  completions: number;
  conversionRate: number; // 0-100
  averageTime: number; // in seconds
  dropoffRate: number; // 0-100
}

export interface FunnelDropoffPoint {
  fromStep: string;
  toStep: string;
  dropoffRate: number; // 0-100
  dropoffReasons: DropoffReason[];
  recoveryOpportunities: RecoveryOpportunity[];
}

export interface DropoffReason {
  reason: string;
  frequency: number; // percentage
  category:
    | 'technical'
    | 'usability'
    | 'content'
    | 'motivation'
    | 'time'
    | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RecoveryOpportunity {
  opportunity: string;
  potentialRecovery: number; // percentage
  implementation: string[];
  effort: 'low' | 'medium' | 'high';
}

export interface FunnelOptimization {
  step: string;
  optimization: string;
  expectedImprovement: number; // percentage
  effort: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface CohortDefinition {
  name: string;
  criteria: CohortCriteria[];
  timeframe: string;
  size?: number;
}

export interface CohortCriteria {
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'greater_than'
    | 'less_than'
    | 'in'
    | 'not_in'
    | 'contains';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface CohortAnalysis {
  cohortDefinition: CohortDefinition;
  period: DatePeriod;
  cohortSize: number;
  retentionRates: RetentionRate[];
  behaviorPatterns: BehaviorPattern[];
  conversionMetrics: CohortConversionMetrics;
  insights: CohortInsight[];
}

export interface RetentionRate {
  period: string;
  rate: number; // 0-100
  activeUsers: number;
  churnedUsers: number;
  newUsers: number;
}

export interface BehaviorPattern {
  pattern: string;
  frequency: number; // percentage
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  recommendations: string[];
}

export interface CohortConversionMetrics {
  signupToStart: number; // 0-100
  startToCompletion: number; // 0-100
  completionToActivation: number; // 0-100
  activationToRetention: number; // 0-100
}

export interface CohortInsight {
  insight: string;
  significance: 'low' | 'medium' | 'high';
  evidence: string[];
  implications: string[];
  recommendations: string[];
}

export interface RetentionAnalysis {
  period: DatePeriod;
  overallRetention: RetentionMetrics;
  cohortRetention: CohortRetentionData[];
  retentionFactors: RetentionFactor[];
  churnAnalysis: ChurnAnalysis;
  retentionStrategies: RetentionStrategy[];
}

export interface RetentionMetrics {
  day1: number; // 0-100
  day7: number; // 0-100
  day30: number; // 0-100
  day90: number; // 0-100
  averageLifetime: number; // in days
  churnRate: number; // 0-100
}

export interface CohortRetentionData {
  cohort: string;
  cohortSize: number;
  retentionCurve: number[];
  averageLifetime: number;
  churnRate: number;
}

export interface RetentionFactor {
  factor: string;
  correlation: number; // -1 to 1
  impact: 'positive' | 'negative' | 'neutral';
  significance: 'low' | 'medium' | 'high';
  actionable: boolean;
}

export interface ChurnAnalysis {
  churnRate: number; // 0-100
  churnReasons: ChurnReason[];
  churnPredictors: ChurnPredictor[];
  preventionStrategies: ChurnPrevention[];
}

export interface ChurnReason {
  reason: string;
  frequency: number; // percentage
  category:
    | 'product'
    | 'experience'
    | 'support'
    | 'competition'
    | 'price'
    | 'other';
  preventable: boolean;
}

export interface ChurnPredictor {
  predictor: string;
  weight: number; // 0-1
  accuracy: number; // 0-100
  leadTime: number; // in days
  actionable: boolean;
}

export interface ChurnPrevention {
  strategy: string;
  effectiveness: number; // 0-100
  implementation: string[];
  cost: 'low' | 'medium' | 'high';
  timeframe: string;
}

export interface RetentionStrategy {
  strategy: string;
  targetSegment: string;
  expectedImpact: number; // percentage
  implementation: string[];
  success_metrics: string[];
  timeline: string;
}

export interface SegmentDefinition {
  name: string;
  criteria: SegmentCriteria[];
  isStatic: boolean;
  refreshFrequency?: string;
}

export interface SegmentCriteria {
  field: string;
  operator: string;
  value: any;
  weight?: number;
  logicalOperator?: 'AND' | 'OR';
}

export interface SegmentAnalysis {
  segmentDefinition: SegmentDefinition;
  period: DatePeriod;
  segmentSize: number;
  segmentGrowth: number; // percentage
  behaviorProfile: SegmentBehaviorProfile;
  performanceMetrics: SegmentPerformanceMetrics;
  conversionMetrics: SegmentConversionMetrics;
  insights: SegmentInsight[];
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  criteria: SegmentCriteria[];
  characteristics: SegmentCharacteristics;
  behavior: SegmentBehavior;
  value: SegmentValue;
}

export interface SegmentCharacteristics {
  demographics: Record<string, any>;
  psychographics: Record<string, any>;
  technographics: Record<string, any>;
  firmographics?: Record<string, any>;
}

export interface SegmentBehavior {
  engagementLevel: 'low' | 'medium' | 'high';
  preferredChannels: string[];
  contentPreferences: string[];
  interactionPatterns: string[];
  conversionPatterns: string[];
}

export interface SegmentValue {
  lifetime_value: number;
  acquisition_cost: number;
  retention_rate: number;
  growth_potential: 'low' | 'medium' | 'high';
  strategic_importance: 'low' | 'medium' | 'high';
}

export interface SegmentPerformance {
  segmentId: string;
  period: DatePeriod;
  metrics: SegmentMetrics;
  trends: SegmentTrend[];
  comparisons: SegmentComparison[];
  opportunities: SegmentOpportunity[];
}

export interface SegmentMetrics {
  size: number;
  growth: number; // percentage
  engagement: number; // 0-100
  conversion: number; // 0-100
  retention: number; // 0-100
  satisfaction: number; // 1-5
  lifetime_value: number;
}

export interface SegmentTrend {
  metric: string;
  trend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  magnitude: number; // percentage change
  timeframe: string;
  significance: 'low' | 'medium' | 'high';
}

export interface SegmentComparison {
  comparedTo: string;
  metric: string;
  difference: number; // percentage
  significance: 'low' | 'medium' | 'high';
  interpretation: string;
}

export interface SegmentOpportunity {
  opportunity: string;
  potential: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  implementation: string[];
}

export interface SegmentBehaviorProfile {
  engagementPatterns: EngagementPattern[];
  contentPreferences: ContentPreference[];
  interactionStyles: InteractionStyle[];
  decisionFactors: DecisionFactor[];
}

export interface EngagementPattern {
  pattern: string;
  frequency: number; // percentage
  context: string[];
  triggers: string[];
  outcomes: string[];
}

export interface ContentPreference {
  contentType: string;
  preference: number; // 0-100
  engagement: number; // 0-100
  effectiveness: number; // 0-100
}

export interface InteractionStyle {
  style: string;
  frequency: number; // percentage
  effectiveness: number; // 0-100
  context: string[];
}

export interface DecisionFactor {
  factor: string;
  importance: number; // 0-100
  influence: 'positive' | 'negative' | 'neutral';
  actionable: boolean;
}

export interface SegmentPerformanceMetrics {
  completionRate: number; // 0-100
  averageTime: number; // in seconds
  errorRate: number; // 0-100
  helpRequestRate: number; // 0-100
  satisfactionScore: number; // 1-5
  npsScore: number; // -100 to 100
}

export interface SegmentConversionMetrics {
  overallConversion: number; // 0-100
  microConversions: MicroConversion[];
  conversionFunnel: ConversionFunnelStep[];
  conversionFactors: ConversionFactor[];
}

export interface MicroConversion {
  event: string;
  rate: number; // 0-100
  value: number;
  importance: 'low' | 'medium' | 'high';
}

export interface ConversionFunnelStep {
  step: string;
  entries: number;
  conversions: number;
  rate: number; // 0-100
  dropoffReasons: string[];
}

export interface ConversionFactor {
  factor: string;
  correlation: number; // -1 to 1
  impact: 'positive' | 'negative' | 'neutral';
  actionable: boolean;
  optimization: string[];
}

export interface SegmentInsight {
  type: 'behavior' | 'preference' | 'opportunity' | 'risk' | 'trend';
  insight: string;
  significance: 'low' | 'medium' | 'high';
  evidence: string[];
  implications: string[];
  recommendations: string[];
  actionable: boolean;
}

export interface PredictiveInsight {
  type: 'completion' | 'churn' | 'engagement' | 'conversion' | 'satisfaction';
  prediction: string;
  probability: number; // 0-100
  confidence: number; // 0-100
  timeframe: string;
  factors: PredictiveFactor[];
  recommendations: PredictiveRecommendation[];
}

export interface PredictiveFactor {
  factor: string;
  weight: number; // 0-1
  direction: 'positive' | 'negative';
  confidence: number; // 0-100
  actionable: boolean;
}

export interface PredictiveRecommendation {
  recommendation: string;
  expectedImpact: number; // percentage
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  implementation: string[];
}

export interface ChurnPrediction {
  userId: string;
  churnProbability: number; // 0-100
  timeToChurn: number; // in days
  confidence: number; // 0-100
  riskFactors: ChurnRiskFactor[];
  preventionActions: ChurnPreventionAction[];
  interventionTiming: string;
}

export interface ChurnRiskFactor {
  factor: string;
  weight: number; // 0-1
  currentValue: any;
  threshold: any;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ChurnPreventionAction {
  action: string;
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  timing: 'immediate' | 'short_term' | 'long_term';
  implementation: string[];
}

export interface CompletionPrediction {
  sessionId: string;
  completionProbability: number; // 0-100
  estimatedTimeToCompletion: number; // in minutes
  confidence: number; // 0-100
  successFactors: SuccessFactor[];
  riskFactors: CompletionRiskFactor[];
  optimizationActions: CompletionOptimization[];
}

export interface SuccessFactor {
  factor: string;
  weight: number; // 0-1
  currentStatus: 'positive' | 'neutral' | 'negative';
  leverage: string[];
}

export interface CompletionRiskFactor {
  factor: string;
  weight: number; // 0-1
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string[];
}

export interface CompletionOptimization {
  optimization: string;
  expectedImpact: number; // percentage
  effort: 'low' | 'medium' | 'high';
  timing: 'immediate' | 'short_term' | 'long_term';
  implementation: string[];
}

export interface ExperimentAnalytics {
  experimentId: string;
  status: 'running' | 'completed' | 'paused' | 'stopped';
  participants: number;
  duration: number; // in days
  variants: ExperimentVariantAnalytics[];
  overallResults: ExperimentOverallResults;
  segmentResults: ExperimentSegmentResults[];
  insights: ExperimentInsight[];
}

export interface ExperimentVariantAnalytics {
  variantId: string;
  participants: number;
  conversions: number;
  conversionRate: number; // 0-100
  averageTime: number; // in seconds
  satisfactionScore: number; // 1-5
  retentionRate: number; // 0-100
  performance: VariantPerformanceMetrics;
}

export interface VariantPerformanceMetrics {
  completionRate: number; // 0-100
  errorRate: number; // 0-100
  helpRequestRate: number; // 0-100
  engagementScore: number; // 0-100
  userSatisfaction: number; // 1-5
}

export interface ExperimentOverallResults {
  winner?: string; // variant ID
  confidence: number; // 0-100
  significance: number; // 0-1
  lift: number; // percentage
  statisticalPower: number; // 0-1
  sampleSizeAdequacy: boolean;
}

export interface ExperimentSegmentResults {
  segment: string;
  results: ExperimentOverallResults;
  insights: string[];
  recommendations: string[];
}

export interface ExperimentInsight {
  type: 'performance' | 'behavior' | 'segment' | 'unexpected' | 'technical';
  insight: string;
  significance: 'low' | 'medium' | 'high';
  evidence: string[];
  implications: string[];
  recommendations: string[];
}

export interface StatisticalSignificance {
  experimentId: string;
  primaryMetric: string;
  pValue: number;
  confidence: number; // 0-100
  significance: number; // 0-1
  effect_size: number;
  power: number; // 0-1
  sampleSize: number;
  minimumDetectableEffect: number;
  recommendation: 'continue' | 'stop' | 'extend' | 'redesign';
}

export interface RealTimeMetrics {
  timestamp: Date;
  activeUsers: number;
  activeSessions: number;
  currentConversions: number;
  currentErrors: number;
  systemLoad: number; // 0-100
  responseTime: number; // in milliseconds
  throughput: number; // requests per second
}

export interface ActiveUserMetrics {
  total: number;
  byStep: StepUserCount[];
  byFlow: FlowUserCount[];
  bySegment: SegmentUserCount[];
  byDevice: DeviceUserCount[];
  byLocation: LocationUserCount[];
}

export interface StepUserCount {
  stepId: string;
  stepName: string;
  activeUsers: number;
  averageTime: number; // in seconds
}

export interface FlowUserCount {
  flowId: string;
  flowName: string;
  activeUsers: number;
  completionRate: number; // 0-100
}

export interface SegmentUserCount {
  segment: string;
  activeUsers: number;
  engagementLevel: 'low' | 'medium' | 'high';
}

export interface DeviceUserCount {
  device: string;
  activeUsers: number;
  performance: number; // 0-100
}

export interface LocationUserCount {
  location: string;
  activeUsers: number;
  conversionRate: number; // 0-100
}

export interface ConversionMetrics {
  totalConversions: number;
  conversionRate: number; // 0-100
  conversionsByType: ConversionByType[];
  conversionsBySource: ConversionBySource[];
  conversionTrends: ConversionTrend[];
  conversionFunnel: ConversionFunnelMetrics;
}

export interface ConversionByType {
  type: string;
  conversions: number;
  rate: number; // 0-100
  value: number;
}

export interface ConversionBySource {
  source: string;
  conversions: number;
  rate: number; // 0-100
  quality: number; // 0-100
}

export interface ConversionTrend {
  period: string;
  conversions: number;
  rate: number; // 0-100
  change: number; // percentage
}

export interface ConversionFunnelMetrics {
  steps: ConversionFunnelStep[];
  overallConversion: number; // 0-100
  bottlenecks: string[];
  opportunities: string[];
}

export interface AnalyticsQuery {
  type: 'aggregation' | 'segmentation' | 'funnel' | 'cohort' | 'custom';
  filters: AnalyticsFilter[];
  groupBy: string[];
  metrics: string[];
  timeframe: DatePeriod;
  limit?: number;
  orderBy?: string;
}

export interface AnalyticsFilter {
  field: string;
  operator: string;
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface AnalyticsResult {
  query: AnalyticsQuery;
  data: any[];
  metadata: ResultMetadata;
  executionTime: number; // in milliseconds
  cached: boolean;
}

export interface ResultMetadata {
  totalRows: number;
  columns: ColumnMetadata[];
  aggregations: Record<string, any>;
  filters_applied: AnalyticsFilter[];
}

export interface ColumnMetadata {
  name: string;
  type: string;
  description: string;
  nullable: boolean;
}

export interface ReportDefinition {
  name: string;
  description: string;
  type: 'executive' | 'operational' | 'analytical' | 'custom';
  sections: ReportSection[];
  filters: ReportFilter[];
  schedule?: ReportSchedule;
  recipients: string[];
  format: 'pdf' | 'html' | 'csv' | 'json';
}

export interface ReportSection {
  name: string;
  type: 'metrics' | 'chart' | 'table' | 'text' | 'insights';
  content: ReportSectionContent;
  order: number;
}

export interface ReportSectionContent {
  query?: AnalyticsQuery;
  visualization?: VisualizationConfig;
  text?: string;
  insights?: InsightConfig;
}

export interface VisualizationConfig {
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap' | 'funnel' | 'cohort';
  xAxis: string;
  yAxis: string;
  groupBy?: string;
  aggregation?: string;
  styling: ChartStyling;
}

export interface ChartStyling {
  colors: string[];
  theme: 'light' | 'dark' | 'custom';
  size: { width: number; height: number };
  legend: boolean;
  grid: boolean;
  animations: boolean;
}

export interface InsightConfig {
  type: 'automatic' | 'manual' | 'ai_generated';
  sources: string[];
  filters: AnalyticsFilter[];
  threshold: number;
}

export interface ReportFilter {
  field: string;
  operator: string;
  value: any;
  userConfigurable: boolean;
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  time: string; // HH:MM format
  timezone: string;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
}

export interface CustomReport {
  id: string;
  definition: ReportDefinition;
  generatedAt: Date;
  data: ReportData;
  metadata: ReportMetadata;
  status: 'generating' | 'completed' | 'failed';
}

export interface ReportData {
  sections: ReportSectionData[];
  summary: ReportSummary;
  insights: ReportInsight[];
  recommendations: ReportRecommendation[];
}

export interface ReportSectionData {
  sectionName: string;
  data: any;
  visualization?: VisualizationData;
  insights?: string[];
}

export interface ReportSummary {
  keyMetrics: KeyMetric[];
  trends: TrendSummary[];
  highlights: string[];
  concerns: string[];
}

export interface KeyMetric {
  name: string;
  value: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

export interface TrendSummary {
  metric: string;
  direction: 'increasing' | 'decreasing' | 'stable';
  magnitude: number; // percentage
  significance: 'low' | 'medium' | 'high';
}

export interface ReportInsight {
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly' | 'achievement';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number; // 0-100
  evidence: string[];
}

export interface ReportRecommendation {
  priority: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
  rationale: string[];
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  implementation: string[];
}

export interface ReportMetadata {
  generationTime: number; // in seconds
  dataFreshness: Date;
  coverage: number; // 0-100
  accuracy: number; // 0-100
  limitations: string[];
}

export interface ScheduledReport {
  id: string;
  reportId: string;
  schedule: ReportSchedule;
  lastGenerated?: Date;
  nextGeneration: Date;
  status: 'active' | 'paused' | 'failed';
  recipients: ReportRecipient[];
}

export interface ReportRecipient {
  email: string;
  name: string;
  role: string;
  preferences: RecipientPreferences;
}

export interface RecipientPreferences {
  format: 'pdf' | 'html' | 'summary';
  frequency: 'all' | 'changes_only' | 'threshold_based';
  threshold?: number;
  sections: string[];
}

export interface VisualizationData {
  type: string;
  data: DataPoint[];
  labels: string[];
  metadata: VisualizationMetadata;
}

export interface DataPoint {
  x: any;
  y: any;
  label?: string;
  color?: string;
  size?: number;
  metadata?: Record<string, any>;
}

export interface VisualizationMetadata {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  unit: string;
  aggregation: string;
  timeframe: string;
}

export interface DashboardConfig {
  name: string;
  description: string;
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  filters: DashboardFilter[];
  refreshInterval: number; // in seconds
  permissions: DashboardPermission[];
}

export interface DashboardLayout {
  type: 'grid' | 'flex' | 'custom';
  columns: number;
  rows: number;
  responsive: boolean;
  spacing: number;
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'text' | 'alert';
  title: string;
  position: WidgetPosition;
  size: WidgetSize;
  config: WidgetConfig;
  dataSource: WidgetDataSource;
}

export interface WidgetPosition {
  x: number;
  y: number;
  z?: number;
}

export interface WidgetSize {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface WidgetConfig {
  visualization?: VisualizationConfig;
  styling?: WidgetStyling;
  interactions?: WidgetInteraction[];
  alerts?: WidgetAlert[];
}

export interface WidgetStyling {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
}

export interface WidgetInteraction {
  type: 'click' | 'hover' | 'drill_down' | 'filter';
  action: string;
  target?: string;
}

export interface WidgetAlert {
  condition: string;
  threshold: number;
  severity: 'info' | 'warning' | 'error' | 'critical';
  notification: boolean;
}

export interface WidgetDataSource {
  type: 'query' | 'api' | 'static' | 'real_time';
  source: string;
  query?: AnalyticsQuery;
  refreshInterval?: number; // in seconds
  caching?: boolean;
}

export interface DashboardFilter {
  name: string;
  type: 'date' | 'select' | 'multiselect' | 'text' | 'number';
  field: string;
  defaultValue?: any;
  options?: FilterOption[];
  global: boolean;
}

export interface FilterOption {
  label: string;
  value: any;
  description?: string;
}

export interface DashboardPermission {
  role: string;
  permissions: string[];
  restrictions?: DashboardRestriction[];
}

export interface DashboardRestriction {
  type: 'data' | 'widget' | 'filter' | 'export';
  restriction: string;
  condition?: string;
}

export interface Dashboard {
  id: string;
  config: DashboardConfig;
  data: DashboardData;
  metadata: DashboardMetadata;
  lastUpdated: Date;
}

export interface DashboardData {
  widgets: WidgetData[];
  filters: FilterData[];
  alerts: DashboardAlert[];
}

export interface WidgetData {
  widgetId: string;
  data: any;
  lastUpdated: Date;
  status: 'loading' | 'loaded' | 'error';
  error?: string;
}

export interface FilterData {
  filterName: string;
  value: any;
  appliedAt: Date;
}

export interface DashboardAlert {
  widgetId: string;
  alertType: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  triggeredAt: Date;
  acknowledged: boolean;
}

export interface DashboardMetadata {
  viewCount: number;
  lastViewed: Date;
  averageViewDuration: number; // in seconds
  mostViewedWidget: string;
  performance: DashboardPerformance;
}

export interface DashboardPerformance {
  loadTime: number; // in seconds
  dataFreshness: number; // in seconds
  errorRate: number; // 0-100
  availability: number; // 0-100
}

export interface DashboardUpdate {
  config?: Partial<DashboardConfig>;
  widgets?: DashboardWidget[];
  filters?: DashboardFilter[];
  permissions?: DashboardPermission[];
}

export interface AnalyticsFilters {
  dateRange?: DatePeriod;
  userSegments?: string[];
  flows?: string[];
  steps?: string[];
  devices?: string[];
  locations?: string[];
  experiments?: string[];
  customFilters?: Record<string, any>;
}
