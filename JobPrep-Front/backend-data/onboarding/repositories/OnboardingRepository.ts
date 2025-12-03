import {
  OnboardingProfile,
  OnboardingFlow,
  OnboardingSession,
  OnboardingTemplate,
} from '../entities/User';

export interface OnboardingRepository {
  // Profile management
  findProfileByUserId(userId: string): Promise<OnboardingProfile | null>;
  createProfile(
    profileData: Omit<OnboardingProfile, 'createdAt' | 'updatedAt'>
  ): Promise<OnboardingProfile>;
  updateProfile(
    userId: string,
    profileData: Partial<OnboardingProfile>
  ): Promise<OnboardingProfile>;
  deleteProfile(userId: string): Promise<boolean>;

  // Flow management
  findFlowById(flowId: string): Promise<OnboardingFlow | null>;
  findActiveFlows(): Promise<OnboardingFlow[]>;
  findFlowsByAudience(audience: FlowTargetAudience): Promise<OnboardingFlow[]>;
  createFlow(
    flowData: Omit<OnboardingFlow, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<OnboardingFlow>;
  updateFlow(
    flowId: string,
    flowData: Partial<OnboardingFlow>
  ): Promise<OnboardingFlow>;
  deleteFlow(flowId: string): Promise<boolean>;

  // Session management
  findSessionById(sessionId: string): Promise<OnboardingSession | null>;
  findSessionsByUserId(userId: string): Promise<OnboardingSession[]>;
  findActiveSessionByUserId(userId: string): Promise<OnboardingSession | null>;
  createSession(
    sessionData: Omit<OnboardingSession, 'id' | 'startedAt' | 'lastActiveAt'>
  ): Promise<OnboardingSession>;
  updateSession(
    sessionId: string,
    sessionData: Partial<OnboardingSession>
  ): Promise<OnboardingSession>;
  completeSession(sessionId: string): Promise<OnboardingSession>;
  abandonSession(sessionId: string): Promise<OnboardingSession>;

  // Template management
  findTemplateById(templateId: string): Promise<OnboardingTemplate | null>;
  findActiveTemplates(): Promise<OnboardingTemplate[]>;
  findTemplatesByAudience(audience: string[]): Promise<OnboardingTemplate[]>;
  createTemplate(
    templateData: Omit<OnboardingTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<OnboardingTemplate>;
  updateTemplate(
    templateId: string,
    templateData: Partial<OnboardingTemplate>
  ): Promise<OnboardingTemplate>;
  deleteTemplate(templateId: string): Promise<boolean>;

  // Analytics
  getOnboardingStatistics(): Promise<OnboardingStatistics>;
  getFlowAnalytics(flowId: string, period: DatePeriod): Promise<FlowAnalytics>;
  getStepAnalytics(stepId: string, period: DatePeriod): Promise<StepAnalytics>;
  getUserJourney(userId: string): Promise<UserJourney>;

  // A/B Testing
  findExperimentById(
    experimentId: string
  ): Promise<OnboardingExperiment | null>;
  findActiveExperiments(): Promise<OnboardingExperiment[]>;
  createExperiment(
    experimentData: Omit<OnboardingExperiment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<OnboardingExperiment>;
  updateExperiment(
    experimentId: string,
    experimentData: Partial<OnboardingExperiment>
  ): Promise<OnboardingExperiment>;
  recordExperimentEvent(
    experimentId: string,
    variantId: string,
    userId: string,
    event: ExperimentEvent
  ): Promise<void>;

  // Content management
  findContentById(contentId: string): Promise<OnboardingContent | null>;
  findContentByStep(stepId: string): Promise<OnboardingContent[]>;
  createContent(
    contentData: Omit<OnboardingContent, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<OnboardingContent>;
  updateContent(
    contentId: string,
    contentData: Partial<OnboardingContent>
  ): Promise<OnboardingContent>;
  deleteContent(contentId: string): Promise<boolean>;
}

export interface OnboardingService {
  // User onboarding
  startOnboarding(userId: string, flowId?: string): Promise<OnboardingSession>;
  continueOnboarding(sessionId: string): Promise<OnboardingSession>;
  completeStep(
    sessionId: string,
    stepId: string,
    data: any
  ): Promise<StepCompletionResult>;
  skipStep(
    sessionId: string,
    stepId: string,
    reason?: string
  ): Promise<OnboardingSession>;
  goToPreviousStep(sessionId: string): Promise<OnboardingSession>;

  // Flow optimization
  getOptimalFlow(userId: string): Promise<OnboardingFlow>;
  personalizeFlow(userId: string, flowId: string): Promise<OnboardingFlow>;
  adaptFlowBasedOnProgress(sessionId: string): Promise<OnboardingFlow>;

  // Content delivery
  getStepContent(
    sessionId: string,
    stepId: string
  ): Promise<StepContentResponse>;
  getPersonalizedContent(
    userId: string,
    contentType: string
  ): Promise<OnboardingContent[]>;
  recordContentInteraction(
    sessionId: string,
    contentId: string,
    interaction: ContentInteraction
  ): Promise<void>;

  // Analytics and insights
  analyzeUserProgress(userId: string): Promise<ProgressAnalysis>;
  identifyDropoffRisks(sessionId: string): Promise<DropoffRisk[]>;
  generatePersonalizedRecommendations(
    userId: string
  ): Promise<OnboardingRecommendation[]>;

  // Experimentation
  assignToExperiment(
    userId: string,
    experimentId: string
  ): Promise<ExperimentAssignment>;
  trackExperimentEvent(
    sessionId: string,
    event: ExperimentEvent
  ): Promise<void>;
  getExperimentResults(experimentId: string): Promise<ExperimentResults>;

  // Notifications
  sendOnboardingNotification(
    userId: string,
    notificationType: string,
    data?: any
  ): Promise<boolean>;
  scheduleFollowUpNotifications(
    userId: string
  ): Promise<ScheduledNotification[]>;

  // Data export and import
  exportUserOnboardingData(userId: string): Promise<OnboardingDataExport>;
  importUserData(
    userId: string,
    data: OnboardingDataImport
  ): Promise<OnboardingProfile>;
}

export interface OnboardingStatistics {
  totalUsers: number;
  activeOnboardings: number;
  completedOnboardings: number;
  abandonedOnboardings: number;
  averageCompletionTime: number; // in minutes
  completionRate: number; // 0-100
  dropoffRate: number; // 0-100
  averageStepsCompleted: number;
  mostCommonDropoffStep: string;
  userSatisfactionScore: number; // 1-5
  conversionToActivation: number; // 0-100
  retentionAfterOnboarding: number; // 0-100
}

export interface DatePeriod {
  startDate: Date;
  endDate: Date;
  granularity: 'hour' | 'day' | 'week' | 'month';
}

export interface UserJourney {
  userId: string;
  sessions: OnboardingSession[];
  totalTimeSpent: number; // in seconds
  stepsCompleted: number;
  stepsSkipped: number;
  errorsEncountered: number;
  helpRequested: number;
  satisfactionScores: number[];
  conversionEvents: ConversionEvent[];
  dropoffPoints: DropoffPoint[];
  recoveryActions: RecoveryAction[];
}

export interface StepCompletionResult {
  success: boolean;
  session: OnboardingSession;
  nextStep?: OnboardingStep;
  validationErrors?: ValidationError[];
  recommendations?: string[];
  personalizedContent?: OnboardingContent[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning' | 'info';
}

export interface StepContentResponse {
  step: OnboardingStep;
  content: OnboardingContent[];
  personalization: PersonalizationData;
  experiments: ActiveExperiment[];
  recommendations: ContentRecommendation[];
}

export interface PersonalizationData {
  userSegment: string;
  experienceLevel: string;
  preferences: Record<string, any>;
  progressLevel: string;
  adaptations: ContentAdaptation[];
}

export interface ContentAdaptation {
  type: 'content' | 'layout' | 'behavior' | 'navigation';
  target: string;
  change: any;
  reason: string;
}

export interface ActiveExperiment {
  experimentId: string;
  variantId: string;
  changes: VariantChange[];
  trackingData: Record<string, any>;
}

export interface ContentRecommendation {
  type: 'tip' | 'help' | 'resource' | 'next_step' | 'alternative';
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  trigger: string;
}

export interface ContentInteraction {
  type:
    | 'view'
    | 'click'
    | 'scroll'
    | 'time_spent'
    | 'completion'
    | 'share'
    | 'like'
    | 'comment';
  element?: string;
  value?: any;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ProgressAnalysis {
  userId: string;
  currentProgress: number; // 0-100
  expectedProgress: number; // 0-100
  progressVelocity: number; // steps per day
  timeToCompletion: number; // in days
  riskFactors: RiskFactor[];
  strengths: string[];
  recommendations: ProgressRecommendation[];
  nextBestActions: NextBestAction[];
}

export interface RiskFactor {
  factor: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-100
  impact: string;
  mitigation: string[];
}

export interface ProgressRecommendation {
  type: 'acceleration' | 'engagement' | 'support' | 'content' | 'timing';
  title: string;
  description: string;
  implementation: string[];
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
}

export interface NextBestAction {
  action: string;
  priority: number; // 1-10
  expectedOutcome: string;
  timeframe: string;
  resources: string[];
}

export interface DropoffRisk {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-100
  indicators: RiskIndicator[];
  preventionActions: PreventionAction[];
  timeframe: string;
}

export interface RiskIndicator {
  indicator: string;
  value: any;
  threshold: any;
  weight: number; // 0-1
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface PreventionAction {
  action: string;
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  implementation: string;
  timing: 'immediate' | 'short_term' | 'long_term';
}

export interface OnboardingRecommendation {
  type: 'content' | 'flow' | 'timing' | 'support' | 'feature';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  rationale: string[];
  implementation: string[];
  expectedBenefit: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  successMetrics: string[];
}

export interface ExperimentAssignment {
  experimentId: string;
  variantId: string;
  assignedAt: Date;
  exposureLogged: boolean;
  trackingData: Record<string, any>;
}

export interface ExperimentEvent {
  type: 'exposure' | 'conversion' | 'engagement' | 'completion' | 'dropoff';
  timestamp: Date;
  properties: Record<string, any>;
  value?: number;
}

export interface ScheduledNotification {
  id: string;
  type: string;
  scheduledAt: Date;
  content: NotificationContent;
  channel: 'email' | 'sms' | 'push' | 'in_app';
  status: 'scheduled' | 'sent' | 'failed' | 'cancelled';
}

export interface OnboardingDataExport {
  userId: string;
  exportedAt: Date;
  profile: OnboardingProfile;
  sessions: OnboardingSession[];
  analytics: OnboardingAnalytics;
  experiments: ExperimentParticipation[];
  notifications: NotificationHistory[];
  feedback: OnboardingFeedback[];
}

export interface ExperimentParticipation {
  experimentId: string;
  variantId: string;
  assignedAt: Date;
  events: ExperimentEvent[];
  outcome?: string;
}

export interface NotificationHistory {
  notificationId: string;
  type: string;
  sentAt: Date;
  channel: string;
  status: string;
  opened?: boolean;
  clicked?: boolean;
  converted?: boolean;
}

export interface OnboardingDataImport {
  profile?: Partial<OnboardingProfile>;
  preferences?: Record<string, any>;
  goals?: OnboardingGoal[];
  assessments?: AssessmentResult[];
  customData?: Record<string, any>;
}

export interface OnboardingOptimizationService {
  // Flow optimization
  optimizeFlowForAudience(
    audience: FlowTargetAudience
  ): Promise<FlowOptimization>;
  identifyBottlenecks(flowId: string): Promise<FlowBottleneck[]>;
  suggestFlowImprovements(flowId: string): Promise<FlowImprovement[]>;

  // Content optimization
  optimizeContentForEngagement(contentId: string): Promise<ContentOptimization>;
  generatePersonalizedContent(
    userId: string,
    contentType: string
  ): Promise<OnboardingContent>;
  testContentVariants(
    contentId: string,
    variants: ContentVariant[]
  ): Promise<ContentTest>;

  // User experience optimization
  analyzeUserExperience(sessionId: string): Promise<UXAnalysis>;
  identifyFrictionPoints(flowId: string): Promise<FrictionPoint[]>;
  suggestUXImprovements(sessionId: string): Promise<UXImprovement[]>;

  // Performance optimization
  analyzePerformanceMetrics(flowId: string): Promise<PerformanceAnalysis>;
  optimizeLoadTimes(flowId: string): Promise<PerformanceOptimization>;
  identifyTechnicalIssues(sessionId: string): Promise<TechnicalIssue[]>;
}

export interface FlowOptimization {
  flowId: string;
  optimizations: Optimization[];
  expectedImpact: OptimizationImpact;
  implementation: ImplementationPlan;
  testing: TestingPlan;
}

export interface Optimization {
  type:
    | 'step_order'
    | 'step_removal'
    | 'step_addition'
    | 'content_change'
    | 'design_change'
    | 'behavior_change';
  description: string;
  rationale: string[];
  expectedBenefit: string;
  effort: 'low' | 'medium' | 'high';
  risk: 'low' | 'medium' | 'high';
}

export interface OptimizationImpact {
  completionRateIncrease: number; // percentage
  timeReduction: number; // percentage
  satisfactionIncrease: number; // percentage
  conversionIncrease: number; // percentage
  dropoffReduction: number; // percentage
}

export interface ImplementationPlan {
  phases: ImplementationPhase[];
  timeline: string;
  resources: string[];
  dependencies: string[];
  risks: string[];
  rollbackPlan: string[];
}

export interface ImplementationPhase {
  phase: string;
  duration: string;
  activities: string[];
  deliverables: string[];
  successCriteria: string[];
  dependencies: string[];
}

export interface TestingPlan {
  testType: 'a_b_test' | 'multivariate' | 'split_test' | 'gradual_rollout';
  duration: number; // in days
  sampleSize: number;
  successMetrics: string[];
  stopConditions: string[];
  rollbackTriggers: string[];
}

export interface FlowBottleneck {
  stepId: string;
  stepName: string;
  bottleneckType:
    | 'completion_time'
    | 'error_rate'
    | 'dropoff_rate'
    | 'help_requests'
    | 'user_confusion';
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: string;
  causes: string[];
  solutions: BottleneckSolution[];
}

export interface BottleneckSolution {
  solution: string;
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  implementation: string[];
}

export interface FlowImprovement {
  type: 'usability' | 'content' | 'design' | 'performance' | 'accessibility';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  currentState: string;
  proposedState: string;
  benefits: string[];
  implementation: string[];
  effort: 'low' | 'medium' | 'high';
  timeline: string;
}

export interface ContentOptimization {
  contentId: string;
  optimizations: ContentOptimizationItem[];
  expectedImpact: ContentOptimizationImpact;
  testingRecommendations: ContentTestingRecommendation[];
}

export interface ContentOptimizationItem {
  element: string;
  currentValue: any;
  optimizedValue: any;
  rationale: string;
  expectedImprovement: string;
}

export interface ContentOptimizationImpact {
  engagementIncrease: number; // percentage
  comprehensionIncrease: number; // percentage
  completionIncrease: number; // percentage
  satisfactionIncrease: number; // percentage
}

export interface ContentTestingRecommendation {
  testType: 'a_b_test' | 'multivariate' | 'user_testing';
  elements: string[];
  variants: number;
  duration: number; // in days
  successMetrics: string[];
}

export interface ContentTest {
  testId: string;
  contentId: string;
  variants: ContentVariant[];
  status: 'draft' | 'running' | 'completed' | 'paused';
  results?: ContentTestResults;
  startDate: Date;
  endDate?: Date;
}

export interface ContentTestResults {
  winner?: string; // variant ID
  confidence: number; // 0-100
  significance: number; // 0-1
  lift: number; // percentage
  insights: string[];
  recommendations: string[];
}

export interface UXAnalysis {
  sessionId: string;
  overallScore: number; // 0-100
  usabilityScore: number; // 0-100
  accessibilityScore: number; // 0-100
  performanceScore: number; // 0-100
  satisfactionScore: number; // 1-5
  painPoints: UXPainPoint[];
  strengths: UXStrength[];
  recommendations: UXRecommendation[];
}

export interface UXPainPoint {
  area: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userImpact: string;
  frequency: number; // percentage of users affected
  evidence: string[];
  solutions: UXSolution[];
}

export interface UXStrength {
  area: string;
  description: string;
  userBenefit: string;
  evidence: string[];
  leverageOpportunities: string[];
}

export interface UXSolution {
  solution: string;
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  implementation: string[];
}

export interface UXRecommendation {
  type: 'immediate' | 'short_term' | 'long_term';
  priority: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
  rationale: string[];
  expectedImpact: string;
  implementation: string[];
  successMetrics: string[];
}

export interface FrictionPoint {
  location: string;
  type: 'cognitive' | 'emotional' | 'physical' | 'technical' | 'motivational';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userImpact: string;
  frequency: number; // percentage
  causes: string[];
  solutions: FrictionSolution[];
}

export interface FrictionSolution {
  solution: string;
  type: 'design' | 'content' | 'flow' | 'technical' | 'behavioral';
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  implementation: string[];
  testing: string[];
}

export interface UXImprovement {
  area: string;
  currentExperience: string;
  improvedExperience: string;
  benefits: string[];
  implementation: UXImplementation;
  measurement: UXMeasurement;
}

export interface UXImplementation {
  steps: string[];
  timeline: string;
  resources: string[];
  dependencies: string[];
  risks: string[];
}

export interface UXMeasurement {
  metrics: string[];
  baseline: Record<string, number>;
  targets: Record<string, number>;
  measurement_plan: string[];
}

export interface PerformanceAnalysis {
  flowId: string;
  overallPerformance: number; // 0-100
  loadTimeAnalysis: LoadTimeAnalysis;
  errorAnalysis: ErrorAnalysis;
  resourceAnalysis: ResourceAnalysis;
  userExperienceImpact: UXImpactAnalysis;
  recommendations: PerformanceRecommendation[];
}

export interface LoadTimeAnalysis {
  averageLoadTime: number; // in seconds
  p95LoadTime: number; // in seconds
  slowestSteps: SlowStep[];
  loadTimeDistribution: LoadTimeDistribution[];
  factors: LoadTimeFactor[];
}

export interface SlowStep {
  stepId: string;
  stepName: string;
  averageLoadTime: number;
  p95LoadTime: number;
  bottlenecks: string[];
}

export interface LoadTimeDistribution {
  range: string;
  percentage: number;
  userImpact: string;
}

export interface LoadTimeFactor {
  factor: string;
  impact: number; // 0-100
  optimization: string[];
}

export interface ErrorAnalysis {
  errorRate: number; // 0-100
  errorTypes: ErrorType[];
  errorPatterns: ErrorPattern[];
  userImpact: ErrorImpact;
  resolutionStrategies: ErrorResolution[];
}

export interface ErrorType {
  type: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userImpact: string;
  causes: string[];
}

export interface ErrorPattern {
  pattern: string;
  frequency: number;
  context: string[];
  predictors: string[];
  prevention: string[];
}

export interface ErrorImpact {
  userExperienceImpact: number; // 0-100
  conversionImpact: number; // 0-100
  satisfactionImpact: number; // 0-100
  retentionImpact: number; // 0-100
}

export interface ErrorResolution {
  strategy: string;
  effectiveness: number; // 0-100
  implementation: string[];
  prevention: string[];
}

export interface ResourceAnalysis {
  resourceUsage: ResourceUsage[];
  optimization: ResourceOptimization[];
  costAnalysis: CostAnalysis;
}

export interface ResourceUsage {
  resource: string;
  usage: number;
  capacity: number;
  utilization: number; // 0-100
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ResourceOptimization {
  resource: string;
  currentUsage: number;
  optimizedUsage: number;
  savings: number; // percentage
  implementation: string[];
}

export interface CostAnalysis {
  currentCost: number;
  optimizedCost: number;
  savings: number;
  roi: number; // return on investment
  paybackPeriod: number; // in months
}

export interface UXImpactAnalysis {
  performanceImpactOnUX: number; // 0-100
  correlations: PerformanceUXCorrelation[];
  thresholds: PerformanceThreshold[];
  recommendations: string[];
}

export interface PerformanceUXCorrelation {
  metric: string;
  correlation: number; // -1 to 1
  significance: number; // 0-1
  interpretation: string;
}

export interface PerformanceThreshold {
  metric: string;
  goodThreshold: number;
  acceptableThreshold: number;
  poorThreshold: number;
  currentValue: number;
  status: 'good' | 'acceptable' | 'poor';
}

export interface PerformanceRecommendation {
  type: 'infrastructure' | 'code' | 'content' | 'caching' | 'cdn' | 'database';
  priority: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
  expectedImprovement: string;
  implementation: string[];
  effort: 'low' | 'medium' | 'high';
  cost: 'low' | 'medium' | 'high';
}

export interface PerformanceOptimization {
  optimizations: PerformanceOptimizationItem[];
  expectedImpact: PerformanceOptimizationImpact;
  implementation: PerformanceImplementationPlan;
}

export interface PerformanceOptimizationItem {
  area: string;
  optimization: string;
  currentValue: number;
  targetValue: number;
  improvement: number; // percentage
  effort: 'low' | 'medium' | 'high';
}

export interface PerformanceOptimizationImpact {
  loadTimeImprovement: number; // percentage
  errorReduction: number; // percentage
  resourceSavings: number; // percentage
  userExperienceImprovement: number; // 0-100
  costSavings: number; // percentage
}

export interface PerformanceImplementationPlan {
  phases: PerformancePhase[];
  timeline: string;
  resources: string[];
  monitoring: string[];
  rollback: string[];
}

export interface PerformancePhase {
  phase: string;
  optimizations: string[];
  duration: string;
  dependencies: string[];
  risks: string[];
  successCriteria: string[];
}

export interface TechnicalIssue {
  type:
    | 'performance'
    | 'error'
    | 'compatibility'
    | 'security'
    | 'accessibility'
    | 'usability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  frequency: number; // percentage
  affectedUsers: number; // percentage
  causes: string[];
  solutions: TechnicalSolution[];
  workarounds: string[];
}

export interface TechnicalSolution {
  solution: string;
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  implementation: string[];
  testing: string[];
  risks: string[];
}
