export interface TestGenerationService {
  // Test creation and management
  generateTest(request: TestGenerationRequest): Promise<Test>;
  generateQuestions(request: QuestionGenerationRequest): Promise<Question[]>;
  optimizeTest(
    testId: string,
    optimizationCriteria: OptimizationCriteria
  ): Promise<Test>;

  // Adaptive testing
  initializeAdaptiveTest(
    userId: string,
    testId: string
  ): Promise<AdaptiveTestSession>;
  getNextAdaptiveQuestion(sessionId: string): Promise<AdaptiveQuestion>;
  updateAdaptiveModel(
    sessionId: string,
    response: QuestionResponse
  ): Promise<AdaptiveUpdate>;

  // Content generation
  generateTestContent(
    contentRequest: ContentGenerationRequest
  ): Promise<GeneratedContent>;
  generateExplanations(questionId: string): Promise<QuestionExplanation>;
  generateHints(
    questionId: string,
    difficulty: string
  ): Promise<QuestionHint[]>;

  // Quality assurance
  validateTestQuality(testId: string): Promise<QualityAssessment>;
  calibrateTest(
    testId: string,
    calibrationData: CalibrationData
  ): Promise<CalibratedTest>;

  // Personalization
  personalizeTest(userId: string, testId: string): Promise<PersonalizedTest>;
  generatePersonalizedQuestions(
    userId: string,
    skillGaps: SkillGap[]
  ): Promise<Question[]>;

  // Batch operations
  generateBatchTests(
    requests: TestGenerationRequest[]
  ): Promise<BatchGenerationResult>;

  // AI model management
  getAvailableModels(): Promise<AITestModel[]>;
  selectOptimalModel(request: TestGenerationRequest): Promise<string>;
  trainCustomModel(trainingData: ModelTrainingData): Promise<CustomModel>;
}

export interface TestGenerationRequest {
  title: string;
  description: string;
  category:
    | 'hard_skills'
    | 'soft_skills'
    | 'language_skills'
    | 'personality_skills'
    | 'hr_interview_prep';
  subcategory: string;
  targetAudience: TargetAudience;
  learningObjectives: LearningObjective[];
  difficulty: DifficultySpecification;
  duration: DurationSpecification;
  questionTypes: QuestionTypeSpecification[];
  contentSources: ContentSource[];
  qualityRequirements: QualityRequirements;
  customizations: TestCustomizations;
  generationOptions: GenerationOptions;
}

export interface TargetAudience {
  experienceLevel: string[];
  industry: string[];
  role: string[];
  demographics: AudienceDemographics;
  learningPreferences: LearningPreferences;
  constraints: AudienceConstraints;
}

export interface AudienceDemographics {
  ageRange?: string;
  educationLevel?: string[];
  geographicRegion?: string[];
  languagePreference?: string;
  culturalContext?: string[];
}

export interface LearningPreferences {
  preferredFormat: string[];
  interactionStyle: string;
  feedbackPreference: string;
  pacePreference: string;
  supportNeeds: string[];
}

export interface AudienceConstraints {
  timeConstraints: string;
  technologyConstraints: string[];
  accessibilityRequirements: string[];
  languageRequirements: string[];
}

export interface LearningObjective {
  objective: string;
  bloomsLevel:
    | 'remember'
    | 'understand'
    | 'apply'
    | 'analyze'
    | 'evaluate'
    | 'create';
  skillCategory: string;
  measurableOutcome: string;
  assessmentMethod: string;
  weight: number; // 0-1
}

export interface DifficultySpecification {
  overallDifficulty:
    | 'Débutant'
    | 'Intermédiaire'
    | 'Avancé'
    | 'Expert'
    | 'Adaptatif';
  difficultyDistribution: DifficultyDistribution;
  progressionPattern: 'linear' | 'exponential' | 'adaptive' | 'custom';
  calibrationMethod:
    | 'expert_judgment'
    | 'pilot_testing'
    | 'irt_analysis'
    | 'machine_learning';
}

export interface DifficultyDistribution {
  easy: number; // percentage
  medium: number; // percentage
  hard: number; // percentage
  expert: number; // percentage
}

export interface DurationSpecification {
  totalDuration: number; // in minutes
  questionTimeAllocation: TimeAllocation[];
  flexibilityOptions: FlexibilityOption[];
  timeManagementFeatures: string[];
}

export interface TimeAllocation {
  questionType: string;
  averageTime: number; // in seconds
  timeRange: {
    min: number;
    max: number;
  };
  timeWeight: number; // 0-1
}

export interface FlexibilityOption {
  option:
    | 'pause_allowed'
    | 'time_extension'
    | 'break_scheduling'
    | 'self_paced';
  enabled: boolean;
  parameters: Record<string, any>;
}

export interface QuestionTypeSpecification {
  type: string;
  count: number;
  weight: number; // 0-1
  difficulty: string;
  skills: string[];
  format: QuestionFormat;
  validation: ValidationRules;
}

export interface QuestionFormat {
  presentationStyle: string;
  interactionMethod: string;
  mediaElements: MediaElement[];
  accessibility: AccessibilityFeature[];
}

export interface MediaElement {
  type: 'image' | 'audio' | 'video' | 'interactive' | 'code' | 'diagram';
  purpose: string;
  specifications: MediaSpecification;
}

export interface MediaSpecification {
  quality: string;
  format: string;
  size: string;
  duration?: number;
  interactivity?: string[];
}

export interface AccessibilityFeature {
  feature:
    | 'screen_reader'
    | 'keyboard_navigation'
    | 'high_contrast'
    | 'font_scaling'
    | 'audio_description';
  implementation: string;
  compliance: string[];
}

export interface ValidationRules {
  answerValidation: AnswerValidation;
  contentValidation: ContentValidation;
  technicalValidation: TechnicalValidation;
}

export interface AnswerValidation {
  type:
    | 'exact_match'
    | 'pattern_match'
    | 'semantic_match'
    | 'range_check'
    | 'custom_logic';
  rules: ValidationRule[];
  errorHandling: ErrorHandling;
}

export interface ValidationRule {
  rule: string;
  parameters: Record<string, any>;
  errorMessage: string;
  severity: 'warning' | 'error' | 'critical';
}

export interface ErrorHandling {
  strategy: 'strict' | 'lenient' | 'adaptive';
  retryOptions: RetryOption[];
  feedbackLevel: 'minimal' | 'standard' | 'detailed';
}

export interface RetryOption {
  condition: string;
  maxRetries: number;
  penaltyType: 'none' | 'time' | 'score' | 'both';
  penaltyAmount: number;
}

export interface ContentValidation {
  grammarCheck: boolean;
  factualAccuracy: boolean;
  biasDetection: boolean;
  appropriatenessCheck: boolean;
  plagiarismCheck: boolean;
}

export interface TechnicalValidation {
  codeValidation: CodeValidation;
  performanceValidation: PerformanceValidation;
  securityValidation: SecurityValidation;
}

export interface CodeValidation {
  syntaxCheck: boolean;
  compilationCheck: boolean;
  executionCheck: boolean;
  testCaseValidation: boolean;
  codeQualityCheck: boolean;
}

export interface PerformanceValidation {
  timeComplexity: string;
  spaceComplexity: string;
  executionTime: number; // max in seconds
  memoryUsage: number; // max in MB
}

export interface SecurityValidation {
  vulnerabilityCheck: boolean;
  sanitizationCheck: boolean;
  permissionCheck: boolean;
  dataProtectionCheck: boolean;
}

export interface ContentSource {
  type:
    | 'expert_knowledge'
    | 'existing_content'
    | 'industry_standards'
    | 'academic_sources'
    | 'practical_examples';
  source: string;
  reliability: number; // 0-100
  currency: Date;
  scope: string[];
  licensing: LicensingInfo;
}

export interface LicensingInfo {
  license: string;
  permissions: string[];
  restrictions: string[];
  attribution: string;
  commercialUse: boolean;
}

export interface QualityRequirements {
  reliability: number; // 0-100
  validity: number; // 0-100
  fairness: number; // 0-100
  accessibility: number; // 0-100
  usability: number; // 0-100
  engagement: number; // 0-100
  learningEffectiveness: number; // 0-100
}

export interface TestCustomizations {
  branding: BrandingCustomization;
  layout: LayoutCustomization;
  behavior: BehaviorCustomization;
  scoring: ScoringCustomization;
  feedback: FeedbackCustomization;
}

export interface BrandingCustomization {
  logo: string;
  colors: ColorScheme;
  fonts: FontScheme;
  styling: StyleCustomization;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  warning: string;
  error: string;
}

export interface FontScheme {
  primary: string;
  secondary: string;
  monospace: string;
  sizes: FontSizes;
  weights: FontWeights;
}

export interface FontSizes {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

export interface FontWeights {
  light: number;
  normal: number;
  medium: number;
  bold: number;
}

export interface StyleCustomization {
  borderRadius: string;
  shadows: boolean;
  animations: boolean;
  transitions: boolean;
  customCSS: string;
}

export interface LayoutCustomization {
  questionLayout: string;
  navigationStyle: string;
  progressIndicator: string;
  questionNumbering: boolean;
  sectionBreaks: boolean;
}

export interface BehaviorCustomization {
  navigationRules: NavigationRule[];
  timingBehavior: TimingBehavior;
  interactionBehavior: InteractionBehavior;
  adaptiveBehavior: AdaptiveBehavior;
}

export interface NavigationRule {
  rule: string;
  condition: string;
  action: string;
  parameters: Record<string, any>;
}

export interface TimingBehavior {
  showTimer: boolean;
  timerStyle: string;
  timeWarnings: TimeWarning[];
  timeoutBehavior: string;
}

export interface TimeWarning {
  threshold: number; // percentage of time remaining
  message: string;
  style: string;
  action: string;
}

export interface InteractionBehavior {
  clickBehavior: string;
  hoverEffects: boolean;
  keyboardShortcuts: KeyboardShortcut[];
  gestureSupport: boolean;
}

export interface KeyboardShortcut {
  key: string;
  action: string;
  description: string;
  enabled: boolean;
}

export interface AdaptiveBehavior {
  difficultyAdaptation: boolean;
  contentAdaptation: boolean;
  paceAdaptation: boolean;
  styleAdaptation: boolean;
  adaptationTriggers: AdaptationTrigger[];
}

export interface AdaptationTrigger {
  trigger: string;
  condition: string;
  adaptation: string;
  parameters: Record<string, any>;
}

export interface ScoringCustomization {
  scoringMethod: 'simple' | 'weighted' | 'irt' | 'adaptive' | 'custom';
  pointSystem: PointSystem;
  penaltySystem: PenaltySystem;
  bonusSystem: BonusSystem;
  normalization: ScoreNormalization;
}

export interface PointSystem {
  basePoints: number;
  difficultyMultiplier: DifficultyMultiplier[];
  timeBonus: TimeBonusRule[];
  accuracyBonus: AccuracyBonusRule[];
}

export interface DifficultyMultiplier {
  difficulty: string;
  multiplier: number;
}

export interface TimeBonusRule {
  condition: string;
  bonus: number;
  maxBonus: number;
}

export interface AccuracyBonusRule {
  threshold: number; // percentage
  bonus: number;
  type: 'fixed' | 'percentage';
}

export interface PenaltySystem {
  wrongAnswerPenalty: number;
  timePenalty: TimePenaltyRule[];
  attemptPenalty: AttemptPenaltyRule[];
}

export interface TimePenaltyRule {
  condition: string;
  penalty: number;
  maxPenalty: number;
}

export interface AttemptPenaltyRule {
  attemptNumber: number;
  penalty: number;
  type: 'fixed' | 'percentage';
}

export interface BonusSystem {
  streakBonus: StreakBonusRule[];
  completionBonus: CompletionBonusRule[];
  improvementBonus: ImprovementBonusRule[];
}

export interface StreakBonusRule {
  streakLength: number;
  bonus: number;
  maxBonus: number;
}

export interface CompletionBonusRule {
  condition: string;
  bonus: number;
  type: 'fixed' | 'percentage';
}

export interface ImprovementBonusRule {
  improvementThreshold: number; // percentage
  bonus: number;
  maxBonus: number;
}

export interface ScoreNormalization {
  method: 'linear' | 'percentile' | 'z_score' | 'irt' | 'custom';
  parameters: Record<string, any>;
  referenceGroup: string;
}

export interface FeedbackCustomization {
  immediateResults: boolean;
  detailedExplanations: boolean;
  performanceInsights: boolean;
  improvementSuggestions: boolean;
  comparativeAnalysis: boolean;
  feedbackTiming: FeedbackTiming;
  feedbackContent: FeedbackContent;
}

export interface FeedbackTiming {
  questionLevel: 'immediate' | 'section_end' | 'test_end' | 'never';
  sectionLevel: 'immediate' | 'test_end' | 'never';
  testLevel: 'immediate' | 'delayed' | 'scheduled';
  delayDuration?: number; // in hours
}

export interface FeedbackContent {
  scoreBreakdown: boolean;
  correctAnswers: boolean;
  explanations: boolean;
  resources: boolean;
  nextSteps: boolean;
  comparisons: boolean;
  visualizations: boolean;
}

export interface GenerationOptions {
  aiModel: string;
  creativity: number; // 0-100
  diversity: number; // 0-100
  quality: number; // 0-100
  speed: 'fast' | 'balanced' | 'thorough';
  iterations: number;
  validation: boolean;
  humanReview: boolean;
  pilotTesting: boolean;
}

export interface QuestionGenerationRequest {
  testId: string;
  questionType: string;
  difficulty: string;
  skills: string[];
  learningObjectives: string[];
  count: number;
  constraints: QuestionConstraints;
  templates: QuestionTemplate[];
  examples: QuestionExample[];
}

export interface QuestionConstraints {
  timeLimit: number;
  wordLimit: number;
  complexityLimit: string;
  topicScope: string[];
  excludedTopics: string[];
  requiredElements: string[];
  forbiddenElements: string[];
}

export interface QuestionTemplate {
  templateId: string;
  structure: string;
  variables: TemplateVariable[];
  constraints: TemplateConstraints;
  examples: string[];
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'list' | 'object';
  constraints: VariableConstraints;
  examples: any[];
}

export interface VariableConstraints {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  values?: any[];
  validation?: string;
}

export interface TemplateConstraints {
  minVariables: number;
  maxVariables: number;
  requiredVariables: string[];
  mutuallyExclusive: string[][];
  dependencies: VariableDependency[];
}

export interface VariableDependency {
  variable: string;
  dependsOn: string;
  condition: string;
  action: string;
}

export interface QuestionExample {
  question: string;
  type: string;
  difficulty: string;
  quality: number; // 0-100
  usage: string[];
  metadata: Record<string, any>;
}

export interface OptimizationCriteria {
  objectives: OptimizationObjective[];
  constraints: OptimizationConstraint[];
  preferences: OptimizationPreference[];
  metrics: OptimizationMetric[];
}

export interface OptimizationObjective {
  objective:
    | 'maximize_reliability'
    | 'minimize_time'
    | 'maximize_engagement'
    | 'optimize_difficulty'
    | 'improve_validity';
  weight: number; // 0-1
  target?: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface OptimizationConstraint {
  constraint: string;
  type: 'hard' | 'soft';
  value: any;
  tolerance?: number;
}

export interface OptimizationPreference {
  preference: string;
  strength: number; // 0-100
  context: string[];
  tradeoffs: string[];
}

export interface OptimizationMetric {
  metric: string;
  currentValue: number;
  targetValue: number;
  weight: number; // 0-1
  measurement: string;
}

export interface AdaptiveTestSession {
  sessionId: string;
  userId: string;
  testId: string;
  adaptiveModel: AdaptiveModel;
  currentState: AdaptiveState;
  questionHistory: AdaptiveQuestionHistory[];
  parameters: AdaptiveParameters;
  performance: AdaptivePerformance;
}

export interface AdaptiveModel {
  modelType: 'irt' | 'cat' | 'bayesian' | 'ml_based' | 'hybrid';
  parameters: ModelParameters;
  calibration: ModelCalibration;
  accuracy: number; // 0-100
  reliability: number; // 0-100
}

export interface ModelParameters {
  theta: number; // ability estimate
  standardError: number;
  confidence: number; // 0-100
  convergence: boolean;
  iterations: number;
  updateRule: string;
}

export interface ModelCalibration {
  itemParameters: ItemParameter[];
  populationParameters: PopulationParameter[];
  calibrationDate: Date;
  sampleSize: number;
  reliability: number;
}

export interface ItemParameter {
  itemId: string;
  difficulty: number;
  discrimination: number;
  guessing?: number;
  slipping?: number;
  standardError: number;
}

export interface PopulationParameter {
  parameter: string;
  mean: number;
  standardDeviation: number;
  distribution: string;
}

export interface AdaptiveState {
  currentAbility: number;
  abilityRange: {
    min: number;
    max: number;
  };
  confidence: number; // 0-100
  precision: number;
  questionsAdministered: number;
  stoppingCriteria: StoppingCriteria;
}

export interface StoppingCriteria {
  maxQuestions: number;
  minQuestions: number;
  targetPrecision: number;
  maxTime: number; // in minutes
  convergenceThreshold: number;
  confidenceThreshold: number;
}

export interface AdaptiveQuestionHistory {
  questionId: string;
  difficulty: number;
  discrimination: number;
  response: any;
  correct: boolean;
  timeSpent: number;
  abilityEstimate: number;
  standardError: number;
  informationGain: number;
}

export interface AdaptiveParameters {
  selectionMethod: 'maximum_information' | 'bayesian' | 'weighted' | 'custom';
  exposureControl: ExposureControl;
  contentBalancing: ContentBalancing;
  termination: TerminationCriteria;
}

export interface ExposureControl {
  method: 'sympson_hetter' | 'stocking_lewis' | 'randomesque' | 'custom';
  parameters: Record<string, any>;
  maxExposure: number; // 0-1
  targetExposure: number; // 0-1
}

export interface ContentBalancing {
  enabled: boolean;
  constraints: ContentConstraint[];
  weights: ContentWeight[];
  flexibility: number; // 0-100
}

export interface ContentConstraint {
  dimension: string;
  minItems: number;
  maxItems: number;
  weight: number; // 0-1
}

export interface ContentWeight {
  category: string;
  weight: number; // 0-1
  priority: 'low' | 'medium' | 'high';
}

export interface TerminationCriteria {
  primary: TerminationRule;
  secondary: TerminationRule[];
  emergency: TerminationRule;
}

export interface TerminationRule {
  rule: string;
  threshold: number;
  condition: string;
  action: string;
}

export interface AdaptivePerformance {
  efficiency: number; // 0-100
  precision: number; // 0-100
  validity: number; // 0-100
  userSatisfaction: number; // 0-100
  adaptationQuality: number; // 0-100
}

export interface AdaptiveQuestion {
  question: Question;
  selectionReason: string;
  expectedInformation: number;
  difficulty: number;
  discrimination: number;
  adaptiveMetadata: AdaptiveQuestionMetadata;
}

export interface AdaptiveQuestionMetadata {
  informationFunction: number;
  selectionProbability: number;
  exposureRate: number;
  contentBalance: ContentBalanceInfo;
  alternativeQuestions: string[];
}

export interface ContentBalanceInfo {
  category: string;
  currentBalance: number;
  targetBalance: number;
  deviation: number;
}

export interface QuestionResponse {
  questionId: string;
  answer: any;
  timeSpent: number;
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface AdaptiveUpdate {
  newAbilityEstimate: number;
  standardError: number;
  informationGain: number;
  nextQuestionRecommendation: string;
  terminationRecommendation: boolean;
  adaptationQuality: number;
}

export interface ContentGenerationRequest {
  contentType:
    | 'question'
    | 'explanation'
    | 'hint'
    | 'example'
    | 'scenario'
    | 'case_study';
  subject: string;
  difficulty: string;
  audience: string;
  objectives: string[];
  constraints: ContentConstraints;
  style: ContentStyle;
  format: ContentFormat;
}

export interface ContentConstraints {
  length: LengthConstraint;
  complexity: ComplexityConstraint;
  vocabulary: VocabularyConstraint;
  topics: TopicConstraint;
  cultural: CulturalConstraint;
}

export interface LengthConstraint {
  minWords: number;
  maxWords: number;
  targetWords: number;
  flexibility: number; // 0-100
}

export interface ComplexityConstraint {
  maxComplexity: string;
  readingLevel: string;
  conceptualDepth: string;
  cognitiveLoad: string;
}

export interface VocabularyConstraint {
  level: string;
  specializedTerms: boolean;
  jargonLevel: string;
  clarificationRequired: boolean;
}

export interface TopicConstraint {
  includedTopics: string[];
  excludedTopics: string[];
  focusAreas: string[];
  breadthVsDepth: number; // 0-100
}

export interface CulturalConstraint {
  culturalSensitivity: boolean;
  regionalAdaptation: string[];
  languageVariant: string;
  culturalReferences: boolean;
}

export interface ContentStyle {
  tone: 'formal' | 'informal' | 'academic' | 'conversational' | 'professional';
  voice: 'active' | 'passive' | 'mixed';
  perspective: 'first_person' | 'second_person' | 'third_person';
  engagement: 'high' | 'medium' | 'low';
  creativity: number; // 0-100
}

export interface ContentFormat {
  structure: string;
  formatting: string[];
  mediaElements: string[];
  interactivity: string[];
  accessibility: string[];
}

export interface GeneratedContent {
  content: string;
  metadata: ContentMetadata;
  quality: ContentQuality;
  alternatives: ContentAlternative[];
  improvements: ContentImprovement[];
}

export interface ContentMetadata {
  wordCount: number;
  readingLevel: string;
  complexity: string;
  topics: string[];
  keywords: string[];
  sentiment: string;
  objectivity: number; // 0-100
}

export interface ContentQuality {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  engagement: number; // 0-100
  appropriateness: number; // 0-100
  originality: number; // 0-100
  pedagogicalValue: number; // 0-100
}

export interface ContentAlternative {
  content: string;
  variation: string;
  quality: number; // 0-100
  suitability: number; // 0-100
  differences: string[];
}

export interface ContentImprovement {
  area: string;
  suggestion: string;
  implementation: string;
  expectedImpact: number; // 0-100
  effort: 'low' | 'medium' | 'high';
}

export interface QuestionExplanation {
  questionId: string;
  explanations: Explanation[];
  pedagogicalNotes: PedagogicalNote[];
  commonMisconceptions: Misconception[];
  learningResources: LearningResource[];
}

export interface Explanation {
  type:
    | 'correct_answer'
    | 'incorrect_options'
    | 'concept'
    | 'method'
    | 'example';
  content: string;
  detail: 'brief' | 'standard' | 'comprehensive';
  audience: string;
  mediaElements: ExplanationMedia[];
}

export interface ExplanationMedia {
  type: 'image' | 'diagram' | 'video' | 'animation' | 'interactive';
  url: string;
  description: string;
  purpose: string;
}

export interface PedagogicalNote {
  note: string;
  context: string;
  application: string;
  effectiveness: number; // 0-100
}

export interface Misconception {
  misconception: string;
  frequency: number; // percentage
  explanation: string;
  correction: string;
  prevention: string[];
}

export interface LearningResource {
  type: 'article' | 'video' | 'course' | 'book' | 'practice' | 'tutorial';
  title: string;
  provider: string;
  url?: string;
  description: string;
  difficulty: string;
  duration: string;
  relevance: number; // 0-100
}

export interface QuestionHint {
  hintLevel: 'gentle' | 'moderate' | 'strong' | 'direct';
  content: string;
  timing: 'immediate' | 'after_attempt' | 'time_based' | 'request_based';
  effectiveness: number; // 0-100
  pedagogicalValue: number; // 0-100
}

export interface QualityAssessment {
  overallQuality: number; // 0-100
  dimensions: QualityDimension[];
  issues: QualityIssue[];
  recommendations: QualityRecommendation[];
  certification: QualityCertification;
}

export interface QualityDimension {
  dimension:
    | 'content_accuracy'
    | 'pedagogical_soundness'
    | 'technical_quality'
    | 'user_experience'
    | 'accessibility'
    | 'fairness';
  score: number; // 0-100
  weight: number; // 0-1
  assessment: DimensionAssessment;
  improvements: DimensionImprovement[];
}

export interface DimensionAssessment {
  criteria: AssessmentCriterion[];
  evidence: string[];
  methodology: string;
  confidence: number; // 0-100
}

export interface AssessmentCriterion {
  criterion: string;
  score: number; // 0-100
  weight: number; // 0-1
  evidence: string[];
  rationale: string;
}

export interface DimensionImprovement {
  improvement: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effort: 'low' | 'medium' | 'high';
  impact: number; // 0-100
  implementation: string[];
}

export interface QualityIssue {
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  location: string;
  impact: string;
  resolution: IssueResolution;
}

export interface IssueResolution {
  solutions: Solution[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  dependencies: string[];
}

export interface Solution {
  solution: string;
  description: string;
  effectiveness: number; // 0-100
  effort: 'low' | 'medium' | 'high';
  risks: string[];
  benefits: string[];
}

export interface QualityRecommendation {
  recommendation: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  rationale: string[];
  implementation: ImplementationGuidance;
  expectedOutcome: string;
  successMetrics: string[];
}

export interface ImplementationGuidance {
  steps: ImplementationStep[];
  timeline: string;
  resources: string[];
  dependencies: string[];
  risks: string[];
  mitigation: string[];
}

export interface ImplementationStep {
  step: string;
  description: string;
  duration: string;
  resources: string[];
  deliverables: string[];
  validation: string[];
}

export interface QualityCertification {
  certified: boolean;
  certificationLevel: 'basic' | 'standard' | 'premium' | 'excellence';
  certificationDate?: Date;
  validUntil?: Date;
  certifyingAuthority: string;
  certificationCriteria: CertificationCriterion[];
}

export interface CertificationCriterion {
  criterion: string;
  required: boolean;
  met: boolean;
  score: number; // 0-100
  evidence: string[];
}

export interface CalibrationData {
  expertRatings: ExpertRating[];
  pilotResults: PilotResult[];
  statisticalData: StatisticalData;
  validationStudies: ValidationStudy[];
}

export interface ExpertRating {
  expertId: string;
  expertise: string[];
  ratings: ItemRating[];
  confidence: number; // 0-100
  methodology: string;
}

export interface ItemRating {
  itemId: string;
  difficulty: number; // 0-100
  quality: number; // 0-100
  appropriateness: number; // 0-100
  bias: number; // 0-100
  comments: string;
}

export interface PilotResult {
  pilotId: string;
  sampleSize: number;
  demographics: PilotDemographics;
  results: PilotItemResult[];
  feedback: PilotFeedback[];
}

export interface PilotDemographics {
  ageDistribution: Record<string, number>;
  experienceDistribution: Record<string, number>;
  industryDistribution: Record<string, number>;
  educationDistribution: Record<string, number>;
}

export interface PilotItemResult {
  itemId: string;
  difficulty: number;
  discrimination: number;
  reliability: number;
  validity: number;
  bias: BiasAnalysis;
}

export interface BiasAnalysis {
  overallBias: number; // 0-100
  demographicBias: DemographicBias[];
  culturalBias: number; // 0-100
  linguisticBias: number; // 0-100
  recommendations: string[];
}

export interface DemographicBias {
  demographic: string;
  bias: number; // 0-100
  significance: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string[];
}

export interface PilotFeedback {
  category: string;
  feedback: string;
  frequency: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface StatisticalData {
  itemStatistics: ItemStatistics[];
  testStatistics: TestStatistics;
  reliabilityAnalysis: ReliabilityAnalysis;
  validityAnalysis: ValidityAnalysis;
}

export interface ItemStatistics {
  itemId: string;
  difficulty: number;
  discrimination: number;
  pointBiserial: number;
  standardError: number;
  fit: ItemFit;
}

export interface ItemFit {
  infit: number;
  outfit: number;
  acceptable: boolean;
  recommendations: string[];
}

export interface TestStatistics {
  reliability: number;
  validity: number;
  standardError: number;
  informationFunction: InformationFunction[];
  testLength: number;
  optimalLength: number;
}

export interface InformationFunction {
  abilityLevel: number;
  information: number;
  standardError: number;
  precision: number;
}

export interface ReliabilityAnalysis {
  cronbachAlpha: number;
  splitHalf: number;
  testRetest: number;
  interRater: number;
  marginalReliability: number;
  conditionalReliability: ConditionalReliability[];
}

export interface ConditionalReliability {
  abilityRange: string;
  reliability: number;
  standardError: number;
  sampleSize: number;
}

export interface ValidityAnalysis {
  contentValidity: ContentValidityEvidence;
  constructValidity: ConstructValidityEvidence;
  criterionValidity: CriterionValidityEvidence;
  consequentialValidity: ConsequentialValidityEvidence;
}

export interface ContentValidityEvidence {
  expertAgreement: number; // 0-100
  curriculumAlignment: number; // 0-100
  representativeness: number; // 0-100
  relevance: number; // 0-100
  evidence: string[];
}

export interface ConstructValidityEvidence {
  factorAnalysis: FactorAnalysisResult;
  convergentValidity: number; // 0-100
  discriminantValidity: number; // 0-100
  nomologicalNetwork: string[];
  evidence: string[];
}

export interface FactorAnalysisResult {
  factors: Factor[];
  goodnessOfFit: GoodnessOfFit;
  interpretation: string;
  recommendations: string[];
}

export interface Factor {
  factor: string;
  eigenvalue: number;
  varianceExplained: number;
  loadings: FactorLoading[];
}

export interface FactorLoading {
  itemId: string;
  loading: number;
  significance: boolean;
}

export interface GoodnessOfFit {
  chisquare: number;
  df: number;
  pvalue: number;
  rmsea: number;
  cfi: number;
  tli: number;
}

export interface CriterionValidityEvidence {
  concurrentValidity: ConcurrentValidityStudy[];
  predictiveValidity: PredictiveValidityStudy[];
  overallValidity: number; // 0-100
  evidence: string[];
}

export interface ConcurrentValidityStudy {
  criterion: string;
  correlation: number;
  sampleSize: number;
  significance: boolean;
  confidence: number; // 0-100
}

export interface PredictiveValidityStudy {
  outcome: string;
  correlation: number;
  timeframe: string;
  sampleSize: number;
  significance: boolean;
  confidence: number; // 0-100
}

export interface ConsequentialValidityEvidence {
  intendedConsequences: ConsequenceAnalysis[];
  unintendedConsequences: ConsequenceAnalysis[];
  fairnessAnalysis: FairnessAnalysis;
  stakeholderImpact: StakeholderImpact[];
}

export interface ConsequenceAnalysis {
  consequence: string;
  likelihood: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  evidence: string[];
  mitigation: string[];
}

export interface FairnessAnalysis {
  overallFairness: number; // 0-100
  demographicParity: number; // 0-100
  equalOpportunity: number; // 0-100
  calibration: number; // 0-100
  biasAudit: BiasAuditResult[];
}

export interface BiasAuditResult {
  biasType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedGroups: string[];
  evidence: string[];
  mitigation: string[];
  monitoring: string[];
}

export interface StakeholderImpact {
  stakeholder: string;
  impact: 'positive' | 'negative' | 'neutral' | 'mixed';
  magnitude: 'low' | 'medium' | 'high';
  evidence: string[];
  mitigation: string[];
}

export interface ValidationStudy {
  studyId: string;
  studyType: string;
  methodology: string;
  sampleSize: number;
  demographics: StudyDemographics;
  results: StudyResult[];
  conclusions: string[];
  limitations: string[];
}

export interface StudyDemographics {
  totalParticipants: number;
  demographics: Record<string, any>;
  representativeness: number; // 0-100
  biasAssessment: string[];
}

export interface StudyResult {
  measure: string;
  value: number;
  confidence: number; // 0-100
  significance: boolean;
  interpretation: string;
  implications: string[];
}

export interface CalibratedTest {
  testId: string;
  calibrationResults: CalibrationResults;
  adjustments: TestAdjustment[];
  qualityImprovement: QualityImprovement;
  recommendations: CalibrationRecommendation[];
}

export interface CalibrationResults {
  overallImprovement: number; // percentage
  reliabilityImprovement: number;
  validityImprovement: number;
  fairnessImprovement: number;
  itemImprovements: ItemImprovement[];
}

export interface ItemImprovement {
  itemId: string;
  beforeMetrics: ItemMetrics;
  afterMetrics: ItemMetrics;
  improvement: number; // percentage
  adjustments: string[];
}

export interface ItemMetrics {
  difficulty: number;
  discrimination: number;
  reliability: number;
  bias: number;
  quality: number;
}

export interface TestAdjustment {
  type:
    | 'item_modification'
    | 'item_removal'
    | 'item_addition'
    | 'scoring_change'
    | 'structure_change';
  description: string;
  rationale: string[];
  impact: AdjustmentImpact;
  implementation: string[];
}

export interface AdjustmentImpact {
  qualityImpact: number; // -100 to 100
  reliabilityImpact: number;
  validityImpact: number;
  fairnessImpact: number;
  userExperienceImpact: number;
}

export interface QualityImprovement {
  overallImprovement: number; // percentage
  dimensionImprovements: DimensionImprovement[];
  issueResolutions: IssueResolution[];
  newCapabilities: string[];
}

export interface CalibrationRecommendation {
  recommendation: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  implementation: string[];
  expectedBenefit: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
}

export interface PersonalizedTest {
  testId: string;
  userId: string;
  personalizations: Personalization[];
  adaptations: TestAdaptation[];
  customizations: UserCustomization[];
  performance: PersonalizationPerformance;
}

export interface Personalization {
  type:
    | 'content'
    | 'difficulty'
    | 'pace'
    | 'format'
    | 'feedback'
    | 'navigation';
  description: string;
  rationale: string[];
  implementation: string;
  effectiveness: number; // 0-100
}

export interface TestAdaptation {
  adaptation: string;
  trigger: string;
  implementation: string;
  parameters: Record<string, any>;
  effectiveness: number; // 0-100
}

export interface UserCustomization {
  customization: string;
  userPreference: any;
  systemRecommendation: any;
  finalSetting: any;
  satisfaction: number; // 0-100
}

export interface PersonalizationPerformance {
  effectiveness: number; // 0-100
  userSatisfaction: number; // 0-100
  learningImprovement: number; // 0-100
  engagementImprovement: number; // 0-100
  efficiencyGain: number; // 0-100
}

export interface BatchGenerationResult {
  batchId: string;
  totalRequests: number;
  completedRequests: number;
  failedRequests: number;
  results: Test[];
  errors: BatchGenerationError[];
  summary: BatchGenerationSummary;
  processingTime: number; // in seconds
}

export interface BatchGenerationError {
  requestIndex: number;
  requestId: string;
  errorType: string;
  errorMessage: string;
  errorCode: string;
  timestamp: Date;
  recovery: ErrorRecovery;
}

export interface ErrorRecovery {
  recoverable: boolean;
  retryAttempts: number;
  maxRetries: number;
  recoveryActions: string[];
  alternativeApproach: string;
}

export interface BatchGenerationSummary {
  successRate: number; // percentage
  averageQuality: number; // 0-100
  averageGenerationTime: number; // in seconds
  commonIssues: string[];
  bestPractices: string[];
  recommendations: string[];
  resourceUtilization: ResourceUtilization;
}

export interface ResourceUtilization {
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  storageUsage: number; // in MB
  networkUsage: number; // in MB
  costEstimate: number;
}

export interface AITestModel {
  modelId: string;
  name: string;
  version: string;
  capabilities: ModelCapability[];
  specializations: string[];
  performance: ModelPerformance;
  limitations: ModelLimitation[];
  requirements: ModelRequirement[];
  pricing: ModelPricing;
}

export interface ModelCapability {
  capability: string;
  proficiency: number; // 0-100
  reliability: number; // 0-100
  speed: number; // 0-100
  quality: number; // 0-100
}

export interface ModelPerformance {
  accuracy: number; // 0-100
  speed: number; // requests per second
  reliability: number; // 0-100
  scalability: number; // 0-100
  efficiency: number; // 0-100
  benchmarks: ModelBenchmark[];
}

export interface ModelBenchmark {
  benchmark: string;
  score: number;
  ranking: number;
  comparison: string;
  date: Date;
}

export interface ModelLimitation {
  limitation: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  workaround: string[];
  impact: string;
}

export interface ModelRequirement {
  requirement: string;
  type: 'hardware' | 'software' | 'data' | 'expertise' | 'compliance';
  specification: string;
  optional: boolean;
}

export interface ModelPricing {
  pricingModel:
    | 'per_request'
    | 'per_hour'
    | 'per_month'
    | 'per_user'
    | 'custom';
  basePrice: number;
  currency: string;
  tiers: PricingTier[];
  discounts: PricingDiscount[];
}

export interface PricingTier {
  tier: string;
  minUsage: number;
  maxUsage: number;
  pricePerUnit: number;
  features: string[];
}

export interface PricingDiscount {
  type: 'volume' | 'commitment' | 'academic' | 'nonprofit' | 'early_adopter';
  discount: number; // percentage
  conditions: string[];
  duration: string;
}

export interface ModelTrainingData {
  trainingSet: TrainingExample[];
  validationSet: TrainingExample[];
  testSet: TrainingExample[];
  metadata: TrainingMetadata;
  objectives: TrainingObjective[];
  constraints: TrainingConstraint[];
}

export interface TrainingExample {
  input: any;
  output: any;
  weight: number; // 0-1
  quality: number; // 0-100
  source: string;
  metadata: Record<string, any>;
}

export interface TrainingMetadata {
  datasetSize: number;
  dataQuality: number; // 0-100
  diversity: number; // 0-100
  representativeness: number; // 0-100
  biasAssessment: BiasAssessment;
  preprocessing: PreprocessingStep[];
}

export interface BiasAssessment {
  overallBias: number; // 0-100
  biasTypes: BiasType[];
  mitigation: BiasMitigation[];
  monitoring: BiasMonitoring[];
}

export interface BiasType {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  prevalence: number; // 0-100
  impact: string;
  detection: string[];
}

export interface BiasMitigation {
  strategy: string;
  effectiveness: number; // 0-100
  implementation: string[];
  monitoring: string[];
  validation: string[];
}

export interface BiasMonitoring {
  metric: string;
  threshold: number;
  frequency: string;
  alerting: string[];
  remediation: string[];
}

export interface PreprocessingStep {
  step: string;
  description: string;
  parameters: Record<string, any>;
  impact: string;
  reversible: boolean;
}

export interface TrainingObjective {
  objective: string;
  weight: number; // 0-1
  target: number;
  measurement: string;
  optimization: string;
}

export interface TrainingConstraint {
  constraint: string;
  type: 'hard' | 'soft';
  value: any;
  penalty: number;
  monitoring: string[];
}

export interface CustomModel {
  modelId: string;
  trainingResults: TrainingResults;
  performance: ModelPerformance;
  deployment: ModelDeployment;
  monitoring: ModelMonitoring;
}

export interface TrainingResults {
  trainingTime: number; // in hours
  iterations: number;
  convergence: boolean;
  finalLoss: number;
  validationAccuracy: number;
  testAccuracy: number;
  overfitting: OverfittingAnalysis;
}

export interface OverfittingAnalysis {
  overfitted: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  indicators: string[];
  mitigation: string[];
  validation: string[];
}

export interface ModelDeployment {
  deploymentId: string;
  environment: 'development' | 'staging' | 'production';
  configuration: DeploymentConfiguration;
  resources: DeploymentResources;
  monitoring: DeploymentMonitoring;
}

export interface DeploymentConfiguration {
  scalingPolicy: ScalingPolicy;
  loadBalancing: LoadBalancingConfig;
  security: SecurityConfig;
  backup: BackupConfig;
}

export interface ScalingPolicy {
  minInstances: number;
  maxInstances: number;
  targetUtilization: number;
  scaleUpPolicy: ScalePolicy;
  scaleDownPolicy: ScalePolicy;
}

export interface ScalePolicy {
  threshold: number;
  cooldown: number; // in seconds
  increment: number;
  maxIncrement: number;
}

export interface LoadBalancingConfig {
  algorithm: 'round_robin' | 'least_connections' | 'weighted' | 'ip_hash';
  healthCheck: HealthCheckConfig;
  sessionAffinity: boolean;
}

export interface HealthCheckConfig {
  endpoint: string;
  interval: number; // in seconds
  timeout: number; // in seconds
  retries: number;
  successThreshold: number;
}

export interface SecurityConfig {
  authentication: AuthenticationConfig;
  authorization: AuthorizationConfig;
  encryption: EncryptionConfig;
  auditing: AuditingConfig;
}

export interface AuthenticationConfig {
  method: 'api_key' | 'oauth' | 'jwt' | 'certificate' | 'multi_factor';
  parameters: Record<string, any>;
  expiration: number; // in seconds
  rotation: boolean;
}

export interface AuthorizationConfig {
  model: 'rbac' | 'abac' | 'acl' | 'custom';
  policies: AuthorizationPolicy[];
  enforcement: string;
}

export interface AuthorizationPolicy {
  policy: string;
  resources: string[];
  actions: string[];
  conditions: string[];
  effect: 'allow' | 'deny';
}

export interface EncryptionConfig {
  inTransit: boolean;
  atRest: boolean;
  algorithm: string;
  keyManagement: KeyManagementConfig;
}

export interface KeyManagementConfig {
  provider: string;
  rotation: boolean;
  rotationInterval: number; // in days
  backup: boolean;
}

export interface AuditingConfig {
  enabled: boolean;
  events: string[];
  retention: number; // in days
  storage: string;
  alerting: AlertingConfig;
}

export interface AlertingConfig {
  enabled: boolean;
  channels: string[];
  thresholds: AlertThreshold[];
  escalation: EscalationPolicy[];
}

export interface AlertThreshold {
  metric: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'eq' | 'ne';
  duration: number; // in seconds
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface EscalationPolicy {
  level: number;
  delay: number; // in minutes
  recipients: string[];
  actions: string[];
}

export interface BackupConfig {
  enabled: boolean;
  frequency: string;
  retention: number; // in days
  storage: string;
  encryption: boolean;
  testing: boolean;
}

export interface DeploymentResources {
  compute: ComputeResources;
  storage: StorageResources;
  network: NetworkResources;
  monitoring: MonitoringResources;
}

export interface ComputeResources {
  cpu: string;
  memory: string;
  gpu?: string;
  instances: number;
  reservations: ResourceReservation[];
}

export interface ResourceReservation {
  resource: string;
  amount: string;
  duration: string;
  cost: number;
}

export interface StorageResources {
  type: 'ssd' | 'hdd' | 'nvme' | 'cloud';
  capacity: string;
  iops: number;
  throughput: string;
  redundancy: string;
}

export interface NetworkResources {
  bandwidth: string;
  latency: string;
  availability: string;
  cdn: boolean;
  regions: string[];
}

export interface MonitoringResources {
  metrics: string[];
  logs: string[];
  traces: boolean;
  alerting: boolean;
  dashboards: string[];
}

export interface DeploymentMonitoring {
  healthMetrics: HealthMetric[];
  performanceMetrics: PerformanceMetric[];
  businessMetrics: BusinessMetric[];
  alerts: Alert[];
  dashboards: Dashboard[];
}

export interface HealthMetric {
  metric: string;
  value: number;
  threshold: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'improving' | 'stable' | 'degrading';
}

export interface BusinessMetric {
  metric: string;
  value: number;
  target: number;
  trend: 'improving' | 'stable' | 'degrading';
  impact: string;
}

export interface Alert {
  alertId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved';
  actions: string[];
}

export interface Dashboard {
  dashboardId: string;
  name: string;
  widgets: DashboardWidget[];
  layout: string;
  permissions: string[];
}

export interface DashboardWidget {
  widgetId: string;
  type: 'metric' | 'chart' | 'table' | 'alert' | 'log';
  configuration: WidgetConfiguration;
  data: WidgetData;
}

export interface WidgetConfiguration {
  title: string;
  size: string;
  position: string;
  refreshRate: number; // in seconds
  filters: Record<string, any>;
}

export interface WidgetData {
  source: string;
  query: string;
  transformation: string[];
  caching: boolean;
  realtime: boolean;
}

export interface ModelMonitoring {
  performanceMonitoring: PerformanceMonitoring;
  qualityMonitoring: QualityMonitoring;
  biasMonitoring: BiasMonitoring;
  driftMonitoring: DriftMonitoring;
  usageMonitoring: UsageMonitoring;
}

export interface PerformanceMonitoring {
  latency: LatencyMonitoring;
  throughput: ThroughputMonitoring;
  errorRate: ErrorRateMonitoring;
  availability: AvailabilityMonitoring;
}

export interface LatencyMonitoring {
  p50: number;
  p95: number;
  p99: number;
  max: number;
  trend: 'improving' | 'stable' | 'degrading';
  alerts: LatencyAlert[];
}

export interface LatencyAlert {
  threshold: number;
  duration: number;
  action: string;
  escalation: string[];
}

export interface ThroughputMonitoring {
  requestsPerSecond: number;
  capacity: number;
  utilization: number; // percentage
  trend: 'increasing' | 'stable' | 'decreasing';
  projections: ThroughputProjection[];
}

export interface ThroughputProjection {
  timeframe: string;
  projected: number;
  confidence: number; // 0-100
  factors: string[];
}

export interface ErrorRateMonitoring {
  errorRate: number; // percentage
  errorTypes: ErrorTypeDistribution[];
  trend: 'improving' | 'stable' | 'degrading';
  rootCauses: RootCause[];
}

export interface ErrorTypeDistribution {
  errorType: string;
  count: number;
  percentage: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RootCause {
  cause: string;
  frequency: number;
  impact: string;
  resolution: string[];
  prevention: string[];
}

export interface AvailabilityMonitoring {
  uptime: number; // percentage
  downtime: number; // in minutes
  incidents: Incident[];
  sla: SLAMetrics;
}

export interface Incident {
  incidentId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  impact: string;
  resolution: string;
}

export interface SLAMetrics {
  target: number; // percentage
  actual: number; // percentage
  breach: boolean;
  credits: number;
  penalties: number;
}

export interface QualityMonitoring {
  accuracyMonitoring: AccuracyMonitoring;
  consistencyMonitoring: ConsistencyMonitoring;
  fairnessMonitoring: FairnessMonitoring;
  validityMonitoring: ValidityMonitoring;
}

export interface AccuracyMonitoring {
  accuracy: number; // 0-100
  trend: 'improving' | 'stable' | 'degrading';
  benchmarks: AccuracyBenchmark[];
  degradationAlerts: DegradationAlert[];
}

export interface AccuracyBenchmark {
  benchmark: string;
  target: number;
  actual: number;
  gap: number;
  action: string;
}

export interface DegradationAlert {
  threshold: number;
  duration: number;
  action: string;
  escalation: string[];
}

export interface ConsistencyMonitoring {
  consistency: number; // 0-100
  variance: number;
  outliers: OutlierDetection[];
  stabilityMetrics: StabilityMetric[];
}

export interface OutlierDetection {
  method: string;
  threshold: number;
  outliers: Outlier[];
  investigation: string[];
}

export interface Outlier {
  id: string;
  value: number;
  deviation: number;
  timestamp: Date;
  context: Record<string, any>;
}

export interface StabilityMetric {
  metric: string;
  value: number;
  stability: 'stable' | 'unstable' | 'volatile';
  trend: string;
  factors: string[];
}

export interface FairnessMonitoring {
  fairnessMetrics: FairnessMetric[];
  biasDetection: BiasDetection[];
  equityAnalysis: EquityAnalysis;
  interventions: FairnessIntervention[];
}

export interface FairnessMetric {
  metric: string;
  value: number;
  target: number;
  status: 'acceptable' | 'concerning' | 'unacceptable';
  trend: string;
}

export interface BiasDetection {
  biasType: string;
  detected: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedGroups: string[];
  evidence: string[];
  mitigation: string[];
}

export interface EquityAnalysis {
  overallEquity: number; // 0-100
  groupEquity: GroupEquity[];
  disparities: Disparity[];
  recommendations: EquityRecommendation[];
}

export interface GroupEquity {
  group: string;
  equity: number; // 0-100
  representation: number; // percentage
  outcomes: GroupOutcome[];
}

export interface GroupOutcome {
  outcome: string;
  value: number;
  benchmark: number;
  gap: number;
  significance: boolean;
}

export interface Disparity {
  disparity: string;
  magnitude: number;
  significance: 'low' | 'medium' | 'high' | 'critical';
  causes: string[];
  interventions: string[];
}

export interface EquityRecommendation {
  recommendation: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  implementation: string[];
  expectedImpact: string;
  monitoring: string[];
}

export interface FairnessIntervention {
  intervention: string;
  trigger: string;
  implementation: string;
  effectiveness: number; // 0-100
  monitoring: string[];
}

export interface ValidityMonitoring {
  validityMetrics: ValidityMetric[];
  validityThreats: ValidityThreat[];
  validityEvidence: ValidityEvidence[];
  validityMaintenance: ValidityMaintenance[];
}

export interface ValidityMetric {
  metric: string;
  value: number;
  target: number;
  status: 'acceptable' | 'concerning' | 'unacceptable';
  evidence: string[];
}

export interface ValidityThreat {
  threat: string;
  likelihood: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  indicators: string[];
  mitigation: string[];
}

export interface ValidityEvidence {
  evidenceType: string;
  strength: number; // 0-100
  currency: Date;
  source: string;
  limitations: string[];
}

export interface ValidityMaintenance {
  activity: string;
  frequency: string;
  lastPerformed: Date;
  nextScheduled: Date;
  responsible: string;
  outcomes: string[];
}

export interface DriftMonitoring {
  dataDrift: DataDriftMonitoring;
  conceptDrift: ConceptDriftMonitoring;
  performanceDrift: PerformanceDriftMonitoring;
  interventions: DriftIntervention[];
}

export interface DataDriftMonitoring {
  driftDetected: boolean;
  driftMagnitude: number; // 0-100
  driftFeatures: DriftFeature[];
  driftTrend: 'increasing' | 'stable' | 'decreasing';
  alerts: DriftAlert[];
}

export interface DriftFeature {
  feature: string;
  drift: number; // 0-100
  significance: boolean;
  trend: string;
  impact: string;
}

export interface DriftAlert {
  alertType: string;
  threshold: number;
  triggered: boolean;
  timestamp: Date;
  action: string;
}

export interface ConceptDriftMonitoring {
  driftDetected: boolean;
  driftType: 'sudden' | 'gradual' | 'incremental' | 'recurring';
  driftMagnitude: number; // 0-100
  affectedConcepts: string[];
  adaptationNeeded: boolean;
}

export interface PerformanceDriftMonitoring {
  performanceDrift: number; // percentage change
  driftDirection: 'improving' | 'degrading';
  affectedMetrics: string[];
  rootCauses: string[];
  correctionNeeded: boolean;
}

export interface DriftIntervention {
  intervention: string;
  trigger: string;
  implementation: string;
  effectiveness: number; // 0-100
  cost: number;
  timeline: string;
}

export interface UsageMonitoring {
  usageMetrics: UsageMetric[];
  userBehavior: UserBehaviorMetrics;
  resourceUtilization: ResourceUtilizationMetrics;
  costAnalysis: CostAnalysis;
}

export interface UsageMetric {
  metric: string;
  value: number;
  unit: string;
  trend: 'increasing' | 'stable' | 'decreasing';
  forecast: UsageForecast[];
}

export interface UsageForecast {
  timeframe: string;
  predicted: number;
  confidence: number; // 0-100
  factors: string[];
}

export interface UserBehaviorMetrics {
  activeUsers: number;
  sessionDuration: number; // in minutes
  requestsPerSession: number;
  errorRate: number; // percentage
  satisfactionScore: number; // 0-100
}

export interface ResourceUtilizationMetrics {
  cpu: number; // percentage
  memory: number; // percentage
  storage: number; // percentage
  network: number; // percentage
  efficiency: number; // 0-100
}

export interface CostAnalysis {
  totalCost: number;
  costPerRequest: number;
  costPerUser: number;
  costTrends: CostTrend[];
  optimization: CostOptimization[];
}

export interface CostTrend {
  period: string;
  cost: number;
  change: number; // percentage
  drivers: string[];
}

export interface CostOptimization {
  opportunity: string;
  potential: number; // cost reduction
  effort: 'low' | 'medium' | 'high';
  implementation: string[];
  risks: string[];
}
