import {
  OnboardingProfile,
  OnboardingFlow,
  OnboardingSession,
  OnboardingTemplate,
} from '../entities/User';

export interface OnboardingService {
  // Core onboarding flow
  initializeOnboarding(
    userId: string,
    flowId?: string
  ): Promise<OnboardingInitializationResult>;
  startOnboardingSession(
    userId: string,
    flowId: string
  ): Promise<OnboardingSession>;
  continueOnboarding(sessionId: string): Promise<OnboardingContinuationResult>;
  completeOnboardingStep(
    sessionId: string,
    stepId: string,
    data: any
  ): Promise<StepCompletionResult>;
  skipOnboardingStep(
    sessionId: string,
    stepId: string,
    reason?: string
  ): Promise<OnboardingSession>;
  pauseOnboarding(sessionId: string): Promise<OnboardingSession>;
  resumeOnboarding(sessionId: string): Promise<OnboardingSession>;
  completeOnboarding(sessionId: string): Promise<OnboardingCompletionResult>;

  // Flow management
  getOptimalFlow(userId: string): Promise<OnboardingFlow>;
  personalizeFlow(userId: string, flowId: string): Promise<PersonalizedFlow>;
  adaptFlowDynamically(sessionId: string): Promise<FlowAdaptation>;
  validateFlowConfiguration(
    flow: OnboardingFlow
  ): Promise<FlowValidationResult>;

  // Content delivery
  getStepContent(
    sessionId: string,
    stepId: string
  ): Promise<StepContentDelivery>;
  getPersonalizedContent(
    userId: string,
    contentType: string,
    context?: any
  ): Promise<PersonalizedContent>;
  getContextualHelp(
    sessionId: string,
    stepId: string,
    context?: any
  ): Promise<ContextualHelp>;
  getProgressiveDisclosure(
    sessionId: string,
    stepId: string
  ): Promise<ProgressiveDisclosureContent>;

  // User guidance and assistance
  provideSmartSuggestions(
    sessionId: string,
    stepId: string
  ): Promise<SmartSuggestion[]>;
  detectUserStruggle(sessionId: string): Promise<StruggleDetection>;
  offerProactiveHelp(sessionId: string): Promise<ProactiveHelp>;
  handleUserQuestion(
    sessionId: string,
    question: string
  ): Promise<QuestionResponse>;

  // Progress tracking and analytics
  trackUserProgress(sessionId: string): Promise<ProgressTracking>;
  analyzeUserBehavior(sessionId: string): Promise<BehaviorAnalysis>;
  predictUserOutcome(sessionId: string): Promise<OutcomePrediction>;
  identifyOptimizationOpportunities(
    sessionId: string
  ): Promise<OptimizationOpportunity[]>;

  // Personalization and adaptation
  buildUserProfile(userId: string, data: any): Promise<UserProfileBuilding>;
  updatePersonalizationModel(
    userId: string,
    interactions: UserInteraction[]
  ): Promise<PersonalizationUpdate>;
  generatePersonalizedRecommendations(
    userId: string
  ): Promise<PersonalizedRecommendation[]>;
  adaptToUserPreferences(
    sessionId: string,
    preferences: UserPreferences
  ): Promise<PreferenceAdaptation>;

  // Quality assurance and optimization
  validateUserInput(
    sessionId: string,
    stepId: string,
    input: any
  ): Promise<InputValidationResult>;
  detectAnomalies(sessionId: string): Promise<AnomalyDetection>;
  optimizeUserExperience(sessionId: string): Promise<UXOptimization>;
  measureUserSatisfaction(sessionId: string): Promise<SatisfactionMeasurement>;

  // Integration and data management
  syncWithExternalSystems(
    userId: string,
    systems: string[]
  ): Promise<SyncResult>;
  exportUserData(userId: string, format: string): Promise<DataExport>;
  importUserData(
    userId: string,
    data: any,
    source: string
  ): Promise<DataImport>;
  migrateUserData(
    userId: string,
    fromVersion: string,
    toVersion: string
  ): Promise<DataMigration>;
}

export interface OnboardingInitializationResult {
  success: boolean;
  session: OnboardingSession;
  flow: OnboardingFlow;
  personalizations: PersonalizationApplied[];
  recommendations: InitializationRecommendation[];
  nextSteps: NextStep[];
  estimatedDuration: number; // in minutes
  completionProbability: number; // 0-100
}

export interface PersonalizationApplied {
  type: 'content' | 'flow' | 'design' | 'behavior';
  target: string;
  change: any;
  reason: string;
  confidence: number; // 0-100
}

export interface InitializationRecommendation {
  type: 'preparation' | 'timing' | 'environment' | 'mindset';
  recommendation: string;
  rationale: string;
  importance: 'low' | 'medium' | 'high';
}

export interface NextStep {
  stepId: string;
  stepName: string;
  description: string;
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  importance: 'optional' | 'recommended' | 'required';
}

export interface OnboardingContinuationResult {
  session: OnboardingSession;
  currentStep: OnboardingStep;
  progress: ProgressInfo;
  adaptations: SessionAdaptation[];
  recommendations: ContinuationRecommendation[];
  warnings: SessionWarning[];
}

export interface ProgressInfo {
  currentStep: number;
  totalSteps: number;
  completionPercentage: number; // 0-100
  timeSpent: number; // in seconds
  estimatedTimeRemaining: number; // in seconds
  milestones: ProgressMilestone[];
}

export interface ProgressMilestone {
  name: string;
  achieved: boolean;
  achievedAt?: Date;
  description: string;
  reward?: string;
}

export interface SessionAdaptation {
  type: 'content' | 'flow' | 'timing' | 'assistance';
  adaptation: string;
  reason: string;
  impact: 'low' | 'medium' | 'high';
  appliedAt: Date;
}

export interface ContinuationRecommendation {
  type: 'pacing' | 'focus' | 'assistance' | 'break';
  recommendation: string;
  rationale: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface SessionWarning {
  type: 'time' | 'complexity' | 'engagement' | 'technical';
  warning: string;
  severity: 'info' | 'warning' | 'error';
  action: string;
  dismissible: boolean;
}

export interface OnboardingCompletionResult {
  success: boolean;
  session: OnboardingSession;
  profile: OnboardingProfile;
  achievements: Achievement[];
  nextSteps: PostOnboardingStep[];
  recommendations: PostOnboardingRecommendation[];
  analytics: CompletionAnalytics;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'completion' | 'speed' | 'quality' | 'engagement' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  points: number;
  badge?: string;
  unlockedAt: Date;
}

export interface PostOnboardingStep {
  step: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: string;
  resources: string[];
  deadline?: Date;
}

export interface PostOnboardingRecommendation {
  type: 'feature' | 'content' | 'community' | 'learning' | 'goal';
  recommendation: string;
  rationale: string;
  benefit: string;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
}

export interface CompletionAnalytics {
  totalTime: number; // in seconds
  stepsCompleted: number;
  stepsSkipped: number;
  errorsEncountered: number;
  helpRequested: number;
  satisfactionScore?: number; // 1-5
  completionQuality: number; // 0-100
  engagementScore: number; // 0-100
}

export interface PersonalizedFlow {
  baseFlow: OnboardingFlow;
  personalizations: FlowPersonalization[];
  adaptedSteps: AdaptedStep[];
  estimatedDuration: number; // in minutes
  difficultyLevel: 'easy' | 'medium' | 'hard';
  completionProbability: number; // 0-100
}

export interface FlowPersonalization {
  type:
    | 'step_order'
    | 'step_content'
    | 'step_addition'
    | 'step_removal'
    | 'conditional_branching';
  target: string;
  personalization: any;
  reason: string;
  confidence: number; // 0-100
}

export interface AdaptedStep {
  originalStepId: string;
  adaptedStep: OnboardingStep;
  adaptations: StepAdaptation[];
  rationale: string;
}

export interface StepAdaptation {
  type: 'content' | 'layout' | 'validation' | 'help' | 'navigation';
  adaptation: any;
  reason: string;
  impact: 'low' | 'medium' | 'high';
}

export interface FlowAdaptation {
  sessionId: string;
  adaptationType: 'reactive' | 'predictive' | 'user_requested';
  adaptations: FlowAdaptationItem[];
  rationale: string;
  expectedImpact: AdaptationImpact;
  appliedAt: Date;
}

export interface FlowAdaptationItem {
  target: string;
  change: any;
  type: 'immediate' | 'next_step' | 'future_steps';
  reversible: boolean;
}

export interface AdaptationImpact {
  completionProbability: number; // change in percentage
  userSatisfaction: number; // change in percentage
  timeToCompletion: number; // change in percentage
  errorReduction: number; // change in percentage
}

export interface FlowValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  score: number; // 0-100
  recommendations: FlowRecommendation[];
}

export interface ValidationWarning {
  type: 'usability' | 'accessibility' | 'performance' | 'content' | 'flow';
  warning: string;
  severity: 'low' | 'medium' | 'high';
  impact: string;
  suggestion: string;
}

export interface ValidationSuggestion {
  type: 'improvement' | 'optimization' | 'best_practice';
  suggestion: string;
  benefit: string;
  effort: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
}

export interface FlowRecommendation {
  category: 'structure' | 'content' | 'design' | 'behavior' | 'analytics';
  recommendation: string;
  rationale: string[];
  expectedBenefit: string;
  implementation: string[];
  effort: 'low' | 'medium' | 'high';
}

export interface StepContentDelivery {
  step: OnboardingStep;
  content: DeliveredContent[];
  personalization: ContentPersonalization;
  context: DeliveryContext;
  metadata: ContentMetadata;
}

export interface DeliveredContent {
  contentId: string;
  type: string;
  content: any;
  personalized: boolean;
  adaptations: ContentAdaptation[];
  analytics: ContentAnalytics;
}

export interface ContentPersonalization {
  userSegment: string;
  personalizations: PersonalizationRule[];
  confidence: number; // 0-100
  fallback: any;
}

export interface DeliveryContext {
  sessionId: string;
  userId: string;
  stepId: string;
  userState: UserState;
  environmentContext: EnvironmentContext;
  temporalContext: TemporalContext;
}

export interface UserState {
  progress: number; // 0-100
  engagement: 'low' | 'medium' | 'high';
  mood: 'positive' | 'neutral' | 'negative' | 'frustrated';
  energy: 'low' | 'medium' | 'high';
  focus: 'low' | 'medium' | 'high';
  confidence: 'low' | 'medium' | 'high';
}

export interface EnvironmentContext {
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  screenSize: { width: number; height: number };
  connectionSpeed: 'slow' | 'medium' | 'fast';
  location: string;
  timezone: string;
}

export interface TemporalContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
  sessionDuration: number; // in seconds
  timeInStep: number; // in seconds
  timeSinceLastActivity: number; // in seconds
}

export interface PersonalizedContent {
  content: OnboardingContent[];
  personalizationScore: number; // 0-100
  adaptations: ContentAdaptation[];
  alternatives: AlternativeContent[];
  metadata: PersonalizationMetadata;
}

export interface AlternativeContent {
  content: OnboardingContent;
  suitabilityScore: number; // 0-100
  reason: string;
  conditions: string[];
}

export interface PersonalizationMetadata {
  algorithm: string;
  version: string;
  confidence: number; // 0-100
  factors: PersonalizationFactor[];
  fallbackUsed: boolean;
}

export interface PersonalizationFactor {
  factor: string;
  weight: number; // 0-1
  value: any;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface ContextualHelp {
  helpItems: HelpItem[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  delivery: HelpDelivery;
  personalization: HelpPersonalization;
  analytics: HelpAnalytics;
}

export interface HelpItem {
  id: string;
  type: 'tip' | 'tutorial' | 'faq' | 'video' | 'article' | 'contact';
  title: string;
  content: string;
  relevance: number; // 0-100
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  format: 'text' | 'video' | 'interactive' | 'audio';
}

export interface HelpDelivery {
  method: 'tooltip' | 'modal' | 'sidebar' | 'inline' | 'overlay';
  timing: 'immediate' | 'on_request' | 'proactive' | 'scheduled';
  trigger: string;
  dismissible: boolean;
  persistent: boolean;
}

export interface HelpPersonalization {
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  preferredFormat: string[];
  previousHelpUsage: HelpUsageHistory[];
}

export interface HelpUsageHistory {
  helpItemId: string;
  usedAt: Date;
  helpful: boolean;
  timeSpent: number; // in seconds
  outcome: 'resolved' | 'partial' | 'not_helpful';
}

export interface HelpAnalytics {
  views: number;
  usage: number;
  helpfulness: number; // 0-100
  averageTimeSpent: number; // in seconds
  successRate: number; // 0-100
  userFeedback: HelpFeedback[];
}

export interface HelpFeedback {
  userId: string;
  helpful: boolean;
  rating: number; // 1-5
  comment?: string;
  suggestions?: string;
  createdAt: Date;
}

export interface ProgressiveDisclosureContent {
  layers: ContentLayer[];
  currentLayer: number;
  totalLayers: number;
  navigationStrategy: NavigationStrategy;
  adaptiveRules: AdaptiveRule[];
}

export interface ContentLayer {
  level: number;
  name: string;
  content: any;
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  estimatedTime: number; // in minutes
  completionCriteria: CompletionCriteria;
}

export interface NavigationStrategy {
  type: 'linear' | 'adaptive' | 'user_controlled' | 'ai_guided';
  allowSkipping: boolean;
  allowBacktracking: boolean;
  autoAdvancement: boolean;
  advancementCriteria: AdvancementCriteria;
}

export interface AdvancementCriteria {
  type:
    | 'time_based'
    | 'interaction_based'
    | 'comprehension_based'
    | 'completion_based';
  threshold: any;
  fallback: string;
}

export interface AdaptiveRule {
  condition: string;
  action: 'show_layer' | 'hide_layer' | 'modify_content' | 'change_navigation';
  target: string;
  parameters: Record<string, any>;
}

export interface CompletionCriteria {
  type: 'time_spent' | 'interactions' | 'quiz_passed' | 'manual_confirmation';
  threshold: any;
  optional: boolean;
}

export interface SmartSuggestion {
  id: string;
  type:
    | 'input_suggestion'
    | 'next_action'
    | 'shortcut'
    | 'optimization'
    | 'learning';
  suggestion: string;
  rationale: string;
  confidence: number; // 0-100
  priority: 'low' | 'medium' | 'high';
  context: SuggestionContext;
  implementation: SuggestionImplementation;
}

export interface SuggestionContext {
  trigger: string;
  userState: UserState;
  stepContext: StepContext;
  historicalData: HistoricalData;
}

export interface StepContext {
  stepId: string;
  stepType: string;
  currentField?: string;
  completionStatus: number; // 0-100
  timeSpent: number; // in seconds
  errorsEncountered: string[];
}

export interface HistoricalData {
  similarUsers: SimilarUserData[];
  userHistory: UserHistoryData;
  patternMatches: PatternMatch[];
}

export interface SimilarUserData {
  userId: string;
  similarity: number; // 0-100
  successfulActions: string[];
  outcomes: string[];
}

export interface UserHistoryData {
  previousSessions: SessionSummary[];
  preferences: UserPreferences;
  successPatterns: string[];
  strugglePatterns: string[];
}

export interface SessionSummary {
  sessionId: string;
  completedAt: Date;
  duration: number; // in seconds
  stepsCompleted: number;
  satisfaction: number; // 1-5
  keyLearnings: string[];
}

export interface PatternMatch {
  pattern: string;
  confidence: number; // 0-100
  frequency: number;
  outcomes: string[];
  recommendations: string[];
}

export interface SuggestionImplementation {
  method: 'auto_apply' | 'user_confirm' | 'user_select' | 'background';
  timing: 'immediate' | 'delayed' | 'on_request';
  presentation: 'tooltip' | 'highlight' | 'modal' | 'inline';
  reversible: boolean;
}

export interface StruggleDetection {
  isStruggling: boolean;
  struggleLevel: 'mild' | 'moderate' | 'severe';
  indicators: StruggleIndicator[];
  causes: StruggleCause[];
  interventions: StruggleIntervention[];
  confidence: number; // 0-100
}

export interface StruggleIndicator {
  indicator: string;
  value: any;
  threshold: any;
  weight: number; // 0-1
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface StruggleCause {
  cause: string;
  probability: number; // 0-100
  category:
    | 'cognitive'
    | 'technical'
    | 'motivational'
    | 'environmental'
    | 'content';
  evidence: string[];
  addressable: boolean;
}

export interface StruggleIntervention {
  intervention: string;
  type: 'immediate' | 'short_term' | 'long_term';
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  implementation: string[];
  success_criteria: string[];
}

export interface ProactiveHelp {
  helpOffers: HelpOffer[];
  timing: HelpTiming;
  personalization: HelpPersonalization;
  effectiveness: ProactiveHelpEffectiveness;
}

export interface HelpOffer {
  id: string;
  type: 'guidance' | 'tutorial' | 'shortcut' | 'explanation' | 'encouragement';
  content: string;
  delivery: HelpDelivery;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  conditions: HelpCondition[];
}

export interface HelpTiming {
  trigger: 'time_based' | 'behavior_based' | 'progress_based' | 'error_based';
  delay: number; // in seconds
  frequency: 'once' | 'repeated' | 'adaptive';
  cooldown: number; // in seconds
}

export interface HelpCondition {
  condition: string;
  value: any;
  operator: string;
  weight: number; // 0-1
}

export interface ProactiveHelpEffectiveness {
  acceptanceRate: number; // 0-100
  helpfulness: number; // 0-100
  completionImpact: number; // percentage change
  satisfactionImpact: number; // percentage change
  timeImpact: number; // percentage change
}

export interface QuestionResponse {
  question: string;
  answer: string;
  confidence: number; // 0-100
  sources: ResponseSource[];
  relatedHelp: RelatedHelp[];
  followUpQuestions: string[];
  satisfaction?: number; // 1-5
}

export interface ResponseSource {
  type:
    | 'knowledge_base'
    | 'faq'
    | 'documentation'
    | 'ai_generated'
    | 'human_expert';
  source: string;
  relevance: number; // 0-100
  lastUpdated: Date;
}

export interface RelatedHelp {
  title: string;
  content: string;
  type: 'article' | 'video' | 'tutorial' | 'faq';
  relevance: number; // 0-100
  url?: string;
}

export interface ProgressTracking {
  sessionId: string;
  currentProgress: ProgressSnapshot;
  progressHistory: ProgressSnapshot[];
  milestones: MilestoneProgress[];
  predictions: ProgressPrediction[];
  insights: ProgressInsight[];
}

export interface ProgressSnapshot {
  timestamp: Date;
  stepId: string;
  completionPercentage: number; // 0-100
  timeSpent: number; // in seconds
  quality: number; // 0-100
  engagement: number; // 0-100
  confidence: number; // 0-100
  errors: number;
  helpRequests: number;
}

export interface MilestoneProgress {
  milestoneId: string;
  name: string;
  achieved: boolean;
  achievedAt?: Date;
  progress: number; // 0-100
  requirements: MilestoneRequirement[];
}

export interface MilestoneRequirement {
  requirement: string;
  completed: boolean;
  progress: number; // 0-100
  blockers: string[];
}

export interface ProgressPrediction {
  metric:
    | 'completion_time'
    | 'completion_probability'
    | 'satisfaction'
    | 'quality';
  prediction: number;
  confidence: number; // 0-100
  timeframe: string;
  factors: PredictionFactor[];
}

export interface PredictionFactor {
  factor: string;
  weight: number; // 0-1
  current_value: any;
  impact: 'positive' | 'negative' | 'neutral';
  actionable: boolean;
}

export interface ProgressInsight {
  type: 'achievement' | 'concern' | 'opportunity' | 'pattern' | 'anomaly';
  insight: string;
  significance: 'low' | 'medium' | 'high';
  evidence: string[];
  recommendations: string[];
  actionable: boolean;
}

export interface BehaviorAnalysis {
  sessionId: string;
  behaviorProfile: BehaviorProfile;
  patterns: BehaviorPattern[];
  anomalies: BehaviorAnomaly[];
  insights: BehaviorInsight[];
  recommendations: BehaviorRecommendation[];
}

export interface BehaviorProfile {
  engagementLevel: 'low' | 'medium' | 'high';
  interactionStyle: 'explorer' | 'methodical' | 'rusher' | 'hesitant';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  problemSolvingStyle:
    | 'analytical'
    | 'intuitive'
    | 'trial_error'
    | 'help_seeking';
  riskTolerance: 'low' | 'medium' | 'high';
  persistenceLevel: 'low' | 'medium' | 'high';
}

export interface BehaviorPattern {
  pattern: string;
  frequency: number; // percentage
  context: string[];
  triggers: string[];
  outcomes: string[];
  predictive_value: number; // 0-100
}

export interface BehaviorAnomaly {
  anomaly: string;
  severity: 'low' | 'medium' | 'high';
  deviation: number; // standard deviations
  context: string;
  possible_causes: string[];
  investigation_needed: boolean;
}

export interface BehaviorInsight {
  insight: string;
  category:
    | 'engagement'
    | 'learning'
    | 'motivation'
    | 'difficulty'
    | 'preference';
  confidence: number; // 0-100
  implications: string[];
  actionable: boolean;
  recommendations: string[];
}

export interface BehaviorRecommendation {
  type: 'content' | 'flow' | 'timing' | 'assistance' | 'motivation';
  recommendation: string;
  rationale: string[];
  expectedImpact: string;
  implementation: string[];
  effort: 'low' | 'medium' | 'high';
}

export interface OutcomePrediction {
  sessionId: string;
  predictions: OutcomePredictionItem[];
  overallConfidence: number; // 0-100
  factors: OutcomeFactor[];
  scenarios: OutcomeScenario[];
  recommendations: OutcomeRecommendation[];
}

export interface OutcomePredictionItem {
  outcome:
    | 'completion'
    | 'abandonment'
    | 'high_satisfaction'
    | 'low_satisfaction'
    | 'quick_completion'
    | 'slow_completion';
  probability: number; // 0-100
  timeframe: string;
  confidence: number; // 0-100
  conditions: string[];
}

export interface OutcomeFactor {
  factor: string;
  weight: number; // 0-1
  current_state: any;
  optimal_state: any;
  controllable: boolean;
  interventions: string[];
}

export interface OutcomeScenario {
  scenario: string;
  probability: number; // 0-100
  description: string;
  triggers: string[];
  outcomes: string[];
  interventions: string[];
}

export interface OutcomeRecommendation {
  goal: string;
  recommendations: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  timeframe: 'immediate' | 'short_term' | 'long_term';
  success_probability: number; // 0-100
}

export interface OptimizationOpportunity {
  id: string;
  type: 'efficiency' | 'engagement' | 'satisfaction' | 'completion' | 'quality';
  opportunity: string;
  potential: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  implementation: OptimizationImplementation;
  measurement: OptimizationMeasurement;
}

export interface OptimizationImplementation {
  steps: string[];
  resources: string[];
  dependencies: string[];
  risks: string[];
  timeline: string;
}

export interface OptimizationMeasurement {
  metrics: string[];
  baseline: Record<string, number>;
  targets: Record<string, number>;
  measurement_frequency: string;
  success_criteria: string[];
}

export interface UserProfileBuilding {
  userId: string;
  profile: OnboardingProfile;
  confidence: number; // 0-100
  completeness: number; // 0-100
  insights: ProfileInsight[];
  recommendations: ProfileRecommendation[];
  gaps: ProfileGap[];
}

export interface ProfileInsight {
  insight: string;
  category: 'skills' | 'preferences' | 'goals' | 'behavior' | 'potential';
  confidence: number; // 0-100
  evidence: string[];
  implications: string[];
}

export interface ProfileRecommendation {
  type: 'data_collection' | 'validation' | 'enrichment' | 'correction';
  recommendation: string;
  rationale: string;
  priority: 'low' | 'medium' | 'high';
  implementation: string[];
}

export interface ProfileGap {
  gap: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  impact: string;
  collection_methods: string[];
  estimated_effort: 'low' | 'medium' | 'high';
}

export interface PersonalizationUpdate {
  userId: string;
  updates: PersonalizationUpdateItem[];
  newInsights: PersonalizationInsight[];
  modelPerformance: ModelPerformance;
  recommendations: PersonalizationRecommendation[];
}

export interface PersonalizationUpdateItem {
  aspect: string;
  previous_value: any;
  new_value: any;
  confidence: number; // 0-100
  evidence: string[];
  impact: 'low' | 'medium' | 'high';
}

export interface PersonalizationInsight {
  insight: string;
  novelty: 'new' | 'updated' | 'confirmed';
  confidence: number; // 0-100
  actionable: boolean;
  applications: string[];
}

export interface ModelPerformance {
  accuracy: number; // 0-100
  precision: number; // 0-100
  recall: number; // 0-100
  f1_score: number; // 0-100
  improvement: number; // percentage
  last_updated: Date;
}

export interface PersonalizationRecommendation {
  type:
    | 'model_improvement'
    | 'data_collection'
    | 'feature_engineering'
    | 'algorithm_change';
  recommendation: string;
  expected_improvement: number; // percentage
  effort: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
}

export interface PreferenceAdaptation {
  sessionId: string;
  adaptations: PreferenceAdaptationItem[];
  impact: AdaptationImpact;
  userFeedback: AdaptationFeedback;
  rollback: RollbackPlan;
}

export interface PreferenceAdaptationItem {
  preference: string;
  adaptation: any;
  scope: 'session' | 'user' | 'global';
  reversible: boolean;
  applied_at: Date;
}

export interface AdaptationFeedback {
  explicit: ExplicitFeedback[];
  implicit: ImplicitFeedback[];
  satisfaction_change: number; // percentage
  engagement_change: number; // percentage
}

export interface ExplicitFeedback {
  type: 'rating' | 'comment' | 'preference' | 'complaint';
  feedback: any;
  timestamp: Date;
  context: string;
}

export interface ImplicitFeedback {
  signal: string;
  value: any;
  interpretation: string;
  confidence: number; // 0-100
  timestamp: Date;
}

export interface RollbackPlan {
  conditions: string[];
  steps: string[];
  timeline: string;
  impact_assessment: string;
}

export interface InputValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: InputSuggestion[];
  quality: number; // 0-100
  completeness: number; // 0-100
}

export interface InputSuggestion {
  field: string;
  suggestion: any;
  type: 'correction' | 'completion' | 'enhancement' | 'alternative';
  confidence: number; // 0-100
  rationale: string;
}

export interface AnomalyDetection {
  anomalies: Anomaly[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  investigation: AnomalyInvestigation;
  actions: AnomalyAction[];
}

export interface Anomaly {
  type: 'behavior' | 'performance' | 'data' | 'system' | 'security';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number; // 0-100
  evidence: string[];
  possible_causes: string[];
  first_detected: Date;
}

export interface AnomalyInvestigation {
  status: 'pending' | 'investigating' | 'resolved' | 'false_positive';
  assigned_to: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  findings: string[];
  resolution: string;
}

export interface AnomalyAction {
  action: string;
  type: 'immediate' | 'short_term' | 'long_term';
  priority: 'low' | 'medium' | 'high' | 'critical';
  implementation: string[];
  success_criteria: string[];
}

export interface UXOptimization {
  sessionId: string;
  optimizations: UXOptimizationItem[];
  expectedImpact: UXOptimizationImpact;
  implementation: UXOptimizationImplementation;
  measurement: UXOptimizationMeasurement;
}

export interface UXOptimizationItem {
  area: string;
  optimization: string;
  current_state: any;
  optimized_state: any;
  rationale: string;
  effort: 'low' | 'medium' | 'high';
}

export interface UXOptimizationImpact {
  user_satisfaction: number; // percentage change
  completion_rate: number; // percentage change
  time_to_completion: number; // percentage change
  error_reduction: number; // percentage change
  engagement_increase: number; // percentage change
}

export interface UXOptimizationImplementation {
  phases: UXOptimizationPhase[];
  timeline: string;
  resources: string[];
  testing: UXTestingPlan;
}

export interface UXOptimizationPhase {
  phase: string;
  optimizations: string[];
  duration: string;
  success_criteria: string[];
  rollback_plan: string[];
}

export interface UXTestingPlan {
  test_type: 'a_b_test' | 'multivariate' | 'user_testing' | 'analytics';
  duration: number; // in days
  sample_size: number;
  success_metrics: string[];
  stop_conditions: string[];
}

export interface UXOptimizationMeasurement {
  metrics: UXMetric[];
  baseline: Record<string, number>;
  targets: Record<string, number>;
  measurement_plan: string[];
}

export interface UXMetric {
  name: string;
  description: string;
  calculation: string;
  target: number;
  threshold: number;
  frequency: string;
}

export interface SatisfactionMeasurement {
  sessionId: string;
  overallSatisfaction: number; // 1-5
  dimensionalSatisfaction: DimensionalSatisfaction[];
  npsScore: number; // -100 to 100
  feedback: SatisfactionFeedback[];
  trends: SatisfactionTrend[];
  benchmarks: SatisfactionBenchmark[];
}

export interface DimensionalSatisfaction {
  dimension: string;
  score: number; // 1-5
  importance: number; // 0-100
  performance: number; // 0-100
  gap: number; // performance - importance
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface SatisfactionFeedback {
  type: 'rating' | 'comment' | 'suggestion' | 'complaint' | 'compliment';
  content: any;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: string;
  actionable: boolean;
  timestamp: Date;
}

export interface SatisfactionTrend {
  dimension: string;
  trend: 'improving' | 'declining' | 'stable';
  magnitude: number; // percentage change
  timeframe: string;
  significance: 'low' | 'medium' | 'high';
}

export interface SatisfactionBenchmark {
  dimension: string;
  internal_benchmark: number;
  industry_benchmark: number;
  best_in_class: number;
  gap: number;
  ranking: string;
}

export interface SyncResult {
  userId: string;
  systems: SystemSyncResult[];
  overallSuccess: boolean;
  conflicts: DataConflict[];
  resolutions: ConflictResolution[];
  recommendations: SyncRecommendation[];
}

export interface SystemSyncResult {
  system: string;
  success: boolean;
  recordsSynced: number;
  errors: SyncError[];
  warnings: SyncWarning[];
  duration: number; // in seconds
}

export interface DataConflict {
  field: string;
  localValue: any;
  remoteValue: any;
  system: string;
  resolution: 'manual' | 'automatic' | 'pending';
  priority: 'low' | 'medium' | 'high';
}

export interface ConflictResolution {
  conflictId: string;
  resolution: string;
  rationale: string;
  appliedValue: any;
  confidence: number; // 0-100
  reversible: boolean;
}

export interface SyncRecommendation {
  type:
    | 'data_quality'
    | 'sync_frequency'
    | 'conflict_prevention'
    | 'system_integration';
  recommendation: string;
  rationale: string;
  implementation: string[];
  effort: 'low' | 'medium' | 'high';
}

export interface SyncError {
  error: string;
  code: string;
  field?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
  resolution: string;
}

export interface SyncWarning {
  warning: string;
  field?: string;
  impact: string;
  recommendation: string;
}

export interface DataExport {
  userId: string;
  format: string;
  data: any;
  metadata: ExportMetadata;
  downloadUrl: string;
  expiresAt: Date;
}

export interface ExportMetadata {
  exportedAt: Date;
  dataVersion: string;
  recordCount: number;
  fileSize: number; // in bytes
  checksum: string;
  schema: ExportSchema;
}

export interface ExportSchema {
  version: string;
  fields: SchemaField[];
  relationships: SchemaRelationship[];
  constraints: SchemaConstraint[];
}

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  required: boolean;
  format?: string;
}

export interface SchemaRelationship {
  from: string;
  to: string;
  type: 'one_to_one' | 'one_to_many' | 'many_to_many';
  description: string;
}

export interface SchemaConstraint {
  field: string;
  constraint: string;
  value: any;
  description: string;
}

export interface DataImport {
  userId: string;
  source: string;
  importResult: ImportResult;
  validation: ImportValidation;
  transformation: DataTransformation;
  conflicts: ImportConflict[];
}

export interface ImportResult {
  success: boolean;
  recordsProcessed: number;
  recordsImported: number;
  recordsSkipped: number;
  recordsFailed: number;
  duration: number; // in seconds
  errors: ImportError[];
}

export interface ImportValidation {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  dataQuality: number; // 0-100
  completeness: number; // 0-100
}

export interface DataTransformation {
  transformations: TransformationRule[];
  applied: AppliedTransformation[];
  quality: TransformationQuality;
}

export interface TransformationRule {
  field: string;
  rule: string;
  parameters: Record<string, any>;
  description: string;
}

export interface AppliedTransformation {
  field: string;
  rule: string;
  before: any;
  after: any;
  success: boolean;
  error?: string;
}

export interface TransformationQuality {
  accuracy: number; // 0-100
  completeness: number; // 0-100
  consistency: number; // 0-100
  validity: number; // 0-100
}

export interface ImportConflict {
  field: string;
  existingValue: any;
  importedValue: any;
  resolution: 'keep_existing' | 'use_imported' | 'merge' | 'manual';
  confidence: number; // 0-100
}

export interface ImportError {
  record: number;
  field?: string;
  error: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
  suggestion: string;
}

export interface DataMigration {
  userId: string;
  fromVersion: string;
  toVersion: string;
  migrationResult: MigrationResult;
  backupInfo: BackupInfo;
  rollbackPlan: MigrationRollbackPlan;
}

export interface MigrationResult {
  success: boolean;
  recordsMigrated: number;
  transformationsApplied: number;
  duration: number; // in seconds
  issues: MigrationIssue[];
  verification: MigrationVerification;
}

export interface MigrationIssue {
  type:
    | 'data_loss'
    | 'transformation_error'
    | 'validation_failure'
    | 'performance_issue';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolution: string;
  impact: string;
}

export interface MigrationVerification {
  dataIntegrity: number; // 0-100
  functionalityIntact: boolean;
  performanceImpact: number; // percentage
  userImpact: string;
  rollbackRequired: boolean;
}

export interface BackupInfo {
  backupId: string;
  createdAt: Date;
  size: number; // in bytes
  location: string;
  retention: number; // in days
  verified: boolean;
}

export interface MigrationRollbackPlan {
  available: boolean;
  steps: string[];
  estimatedTime: number; // in minutes
  dataLoss: boolean;
  risks: string[];
  alternatives: string[];
}
