export interface OnboardingFlow {
  id: string;
  name: string;
  description: string;
  version: string;
  isActive: boolean;
  isDefault: boolean;
  targetAudience: FlowTargetAudience;
  steps: FlowStep[];
  branching: FlowBranching[];
  personalization: FlowPersonalization;
  analytics: FlowAnalytics;
  settings: FlowSettings;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface FlowTargetAudience {
  experienceLevels: string[];
  industries: string[];
  roles: string[];
  demographics: AudienceDemographics;
  psychographics: AudiencePsychographics;
}

export interface AudienceDemographics {
  ageRanges: string[];
  locations: string[];
  educationLevels: string[];
  employmentStatus: string[];
}

export interface AudiencePsychographics {
  motivations: string[];
  painPoints: string[];
  goals: string[];
  preferences: string[];
  behaviors: string[];
}

export interface FlowStep {
  id: string;
  name: string;
  type:
    | 'welcome'
    | 'personal_info'
    | 'professional_info'
    | 'goals'
    | 'assessment'
    | 'upload'
    | 'preferences'
    | 'confirmation'
    | 'custom';
  title: string;
  subtitle?: string;
  description: string;
  order: number;
  isRequired: boolean;
  isSkippable: boolean;
  estimatedTime: number; // in minutes
  icon?: string;
  color?: string;
  layout: StepLayout;
  content: StepContent;
  validation: StepValidation;
  navigation: StepNavigation;
  help: StepHelp;
  analytics: StepAnalytics;
}

export interface StepLayout {
  template: 'single_column' | 'two_column' | 'wizard' | 'card' | 'fullscreen';
  width: 'narrow' | 'medium' | 'wide' | 'full';
  background?: string;
  padding: 'small' | 'medium' | 'large';
  alignment: 'left' | 'center' | 'right';
}

export interface StepContent {
  fields: FormField[];
  sections: ContentSection[];
  media: MediaContent[];
  actions: ActionButton[];
  progressIndicator: boolean;
  breadcrumbs: boolean;
}

export interface FormField {
  id: string;
  name: string;
  type:
    | 'text'
    | 'email'
    | 'phone'
    | 'password'
    | 'number'
    | 'date'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'checkbox'
    | 'radio'
    | 'slider'
    | 'upload'
    | 'autocomplete';
  label: string;
  placeholder?: string;
  description?: string;
  helpText?: string;
  isRequired: boolean;
  isVisible: boolean;
  isDisabled: boolean;
  order: number;
  width: 'full' | 'half' | 'third' | 'quarter';
  validation: FieldValidation;
  options?: FieldOption[];
  dependencies: FieldDependency[];
  formatting: FieldFormatting;
}

export interface FieldValidation {
  rules: ValidationRule[];
  messages: ValidationMessage[];
  realTimeValidation: boolean;
  showValidationIcon: boolean;
}

export interface ValidationMessage {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  condition?: string;
}

export interface FieldOption {
  value: string | number | boolean;
  label: string;
  description?: string;
  icon?: string;
  image?: string;
  disabled?: boolean;
  group?: string;
  metadata?: Record<string, any>;
}

export interface FieldDependency {
  field: string;
  condition: string; // JavaScript expression
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
}

export interface FieldFormatting {
  mask?: string;
  prefix?: string;
  suffix?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  decimalPlaces?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
}

export interface ContentSection {
  id: string;
  type:
    | 'text'
    | 'list'
    | 'grid'
    | 'carousel'
    | 'accordion'
    | 'tabs'
    | 'timeline';
  title?: string;
  content: string;
  order: number;
  styling: SectionStyling;
  animation?: SectionAnimation;
}

export interface SectionStyling {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface SectionAnimation {
  type: 'fade' | 'slide' | 'bounce' | 'zoom' | 'rotate';
  duration: number; // in milliseconds
  delay?: number; // in milliseconds
  easing?: string;
}

export interface MediaContent {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'interactive';
  url: string;
  alt?: string;
  caption?: string;
  order: number;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface ActionButton {
  id: string;
  type: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon';
  label: string;
  action:
    | 'next'
    | 'previous'
    | 'skip'
    | 'save'
    | 'submit'
    | 'cancel'
    | 'help'
    | 'custom';
  icon?: string;
  position: 'left' | 'center' | 'right';
  isVisible: boolean;
  isDisabled: boolean;
  conditions: ButtonCondition[];
  styling: ButtonStyling;
}

export interface ButtonCondition {
  condition: string; // JavaScript expression
  action: 'show' | 'hide' | 'enable' | 'disable';
}

export interface ButtonStyling {
  variant: 'solid' | 'outline' | 'ghost' | 'link';
  size: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  width?: 'auto' | 'full' | 'fit';
}

export interface StepValidation {
  isRequired: boolean;
  requiredFields: string[];
  customValidation?: string; // JavaScript function
  validationTrigger: 'onChange' | 'onBlur' | 'onSubmit';
  showErrorSummary: boolean;
  blockNavigation: boolean;
}

export interface StepNavigation {
  showPrevious: boolean;
  showNext: boolean;
  showSkip: boolean;
  showProgress: boolean;
  autoAdvance: boolean;
  autoAdvanceDelay?: number; // in seconds
  customNavigation?: CustomNavigation;
}

export interface CustomNavigation {
  type: 'tabs' | 'sidebar' | 'breadcrumbs' | 'stepper' | 'none';
  position: 'top' | 'bottom' | 'left' | 'right';
  showLabels: boolean;
  showIcons: boolean;
  allowJumping: boolean;
}

export interface StepHelp {
  hasHelp: boolean;
  helpType: 'tooltip' | 'modal' | 'sidebar' | 'inline' | 'popover';
  helpContent: HelpContent;
  helpTrigger: 'click' | 'hover' | 'focus' | 'auto';
  helpPosition: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export interface StepAnalytics {
  trackViews: boolean;
  trackTime: boolean;
  trackInteractions: boolean;
  trackErrors: boolean;
  trackDropoffs: boolean;
  customEvents: AnalyticsEvent[];
}

export interface AnalyticsEvent {
  name: string;
  trigger: string; // JavaScript expression
  properties: Record<string, any>;
}

export interface FlowBranching {
  id: string;
  name: string;
  condition: string; // JavaScript expression
  sourceStepId: string;
  targetStepId: string;
  action: 'redirect' | 'skip' | 'insert' | 'replace';
  priority: number;
  isActive: boolean;
}

export interface FlowPersonalization {
  isEnabled: boolean;
  rules: PersonalizationRule[];
  adaptiveContent: AdaptiveContent[];
  dynamicSteps: DynamicStep[];
  aiRecommendations: boolean;
}

export interface PersonalizationRule {
  id: string;
  name: string;
  condition: string; // JavaScript expression
  action: PersonalizationAction;
  priority: number;
  isActive: boolean;
}

export interface PersonalizationAction {
  type:
    | 'show_content'
    | 'hide_content'
    | 'change_content'
    | 'add_step'
    | 'remove_step'
    | 'change_order'
    | 'set_value';
  target: string;
  value?: any;
  content?: string;
}

export interface AdaptiveContent {
  id: string;
  stepId: string;
  fieldId?: string;
  variants: ContentVariant[];
  selectionCriteria: string; // JavaScript expression
  testingEnabled: boolean;
}

export interface ContentVariant {
  id: string;
  name: string;
  content: any;
  weight: number; // for A/B testing
  performance: VariantPerformance;
}

export interface VariantPerformance {
  views: number;
  completions: number;
  conversionRate: number;
  averageTime: number;
  satisfactionScore: number;
}

export interface DynamicStep {
  id: string;
  name: string;
  template: FlowStep;
  insertionRules: InsertionRule[];
  isActive: boolean;
}

export interface InsertionRule {
  condition: string; // JavaScript expression
  insertAfter: string; // step ID
  priority: number;
}

export interface FlowAnalytics {
  totalStarts: number;
  totalCompletions: number;
  completionRate: number;
  averageCompletionTime: number; // in seconds
  dropoffRate: number;
  dropoffPoints: FlowDropoffPoint[];
  userSatisfaction: number; // 1-5
  npsScore: number; // -100 to 100
  conversionMetrics: FlowConversionMetrics;
  performanceMetrics: FlowPerformanceMetrics;
}

export interface FlowDropoffPoint {
  stepId: string;
  stepName: string;
  dropoffRate: number;
  dropoffReasons: DropoffReason[];
  recoveryActions: RecoveryAction[];
}

export interface DropoffReason {
  reason: string;
  frequency: number;
  category:
    | 'technical'
    | 'usability'
    | 'content'
    | 'time'
    | 'motivation'
    | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RecoveryAction {
  action: string;
  successRate: number;
  implementation: string;
  effort: 'low' | 'medium' | 'high';
}

export interface FlowConversionMetrics {
  signupToStart: number;
  startToCompletion: number;
  completionToActivation: number;
  activationToRetention: number;
  overallConversion: number;
}

export interface FlowPerformanceMetrics {
  averageLoadTime: number; // in seconds
  errorRate: number;
  mobileUsability: number; // 0-100
  accessibilityScore: number; // 0-100
  seoScore: number; // 0-100
}

export interface FlowSettings {
  isPublic: boolean;
  requiresAuthentication: boolean;
  allowGuestAccess: boolean;
  sessionTimeout: number; // in minutes
  autoSave: boolean;
  autoSaveInterval: number; // in seconds
  allowBackNavigation: boolean;
  allowStepJumping: boolean;
  showProgressBar: boolean;
  showStepNumbers: boolean;
  enableKeyboardNavigation: boolean;
  enableMobileOptimization: boolean;
  enableAccessibility: boolean;
  enableAnalytics: boolean;
  enableABTesting: boolean;
  enablePersonalization: boolean;
  dataRetention: DataRetentionSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings;
}

export interface DataRetentionSettings {
  retainIncompleteData: boolean;
  incompleteDataRetentionDays: number;
  retainCompletedData: boolean;
  completedDataRetentionDays: number;
  anonymizeAfterDays: number;
  deleteAfterDays: number;
  backupEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface SecuritySettings {
  encryptData: boolean;
  requireSSL: boolean;
  enableCSRF: boolean;
  enableRateLimit: boolean;
  rateLimitRequests: number;
  rateLimitWindow: number; // in minutes
  allowedDomains: string[];
  blockedIPs: string[];
  enableCaptcha: boolean;
  captchaThreshold: number;
}

export interface IntegrationSettings {
  webhooks: WebhookConfig[];
  apiIntegrations: APIIntegration[];
  analyticsIntegrations: AnalyticsIntegration[];
  marketingIntegrations: MarketingIntegration[];
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  headers: Record<string, string>;
  isActive: boolean;
  retryAttempts: number;
  retryDelay: number; // in seconds
}

export interface APIIntegration {
  id: string;
  name: string;
  type: 'crm' | 'email' | 'analytics' | 'storage' | 'ai' | 'custom';
  endpoint: string;
  authentication: APIAuthentication;
  mapping: FieldMapping[];
  isActive: boolean;
}

export interface APIAuthentication {
  type: 'none' | 'api_key' | 'bearer_token' | 'oauth2' | 'basic_auth';
  credentials: Record<string, string>;
  refreshToken?: string;
  expiresAt?: Date;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: string; // JavaScript function
  isRequired: boolean;
}

export interface AnalyticsIntegration {
  id: string;
  provider:
    | 'google_analytics'
    | 'mixpanel'
    | 'amplitude'
    | 'segment'
    | 'custom';
  trackingId: string;
  events: TrackedEvent[];
  isActive: boolean;
}

export interface TrackedEvent {
  name: string;
  trigger: string;
  properties: Record<string, any>;
  category: string;
}

export interface MarketingIntegration {
  id: string;
  provider: 'mailchimp' | 'hubspot' | 'salesforce' | 'marketo' | 'custom';
  listId?: string;
  tags: string[];
  customFields: Record<string, string>;
  isActive: boolean;
}

export interface OnboardingSession {
  id: string;
  userId: string;
  flowId: string;
  status: 'active' | 'completed' | 'abandoned' | 'expired';
  currentStepId: string;
  startedAt: Date;
  lastActiveAt: Date;
  completedAt?: Date;
  timeSpent: number; // in seconds
  data: SessionData;
  metadata: SessionMetadata;
  analytics: SessionAnalytics;
}

export interface SessionData {
  formData: Record<string, any>;
  stepHistory: StepHistory[];
  uploads: SessionUpload[];
  assessmentResults: Record<string, any>;
  preferences: Record<string, any>;
  customData: Record<string, any>;
}

export interface StepHistory {
  stepId: string;
  enteredAt: Date;
  exitedAt?: Date;
  timeSpent: number; // in seconds
  interactions: Interaction[];
  errors: StepError[];
  completed: boolean;
  skipped: boolean;
}

export interface Interaction {
  type: 'click' | 'input' | 'scroll' | 'focus' | 'blur' | 'hover' | 'keypress';
  element: string;
  value?: any;
  timestamp: Date;
  coordinates?: { x: number; y: number };
}

export interface StepError {
  type: 'validation' | 'technical' | 'user' | 'system';
  message: string;
  field?: string;
  code?: string;
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface SessionUpload {
  id: string;
  fieldId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed';
  uploadedAt: Date;
  processedAt?: Date;
  analysis?: FileAnalysis;
}

export interface SessionMetadata {
  deviceInfo: DeviceInfo;
  browserInfo: BrowserInfo;
  locationInfo: LocationInfo;
  referralInfo: ReferralInfo;
  experimentInfo?: ExperimentInfo;
}

export interface BrowserInfo {
  userAgent: string;
  browser: string;
  version: string;
  engine: string;
  platform: string;
  language: string;
  cookiesEnabled: boolean;
  javaScriptEnabled: boolean;
}

export interface LocationInfo {
  ipAddress: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  isp: string;
  coordinates?: { lat: number; lng: number };
}

export interface ReferralInfo {
  source: string;
  medium: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPage: string;
}

export interface ExperimentInfo {
  experimentId: string;
  variantId: string;
  assignedAt: Date;
  exposureLogged: boolean;
}

export interface SessionAnalytics {
  pageViews: number;
  uniquePageViews: number;
  bounceRate: number;
  exitRate: number;
  averageTimeOnPage: number;
  interactions: number;
  errorsEncountered: number;
  helpRequested: number;
  satisfactionScore?: number;
  conversionEvents: ConversionEvent[];
}

export interface ConversionEvent {
  event: string;
  timestamp: Date;
  value?: number;
  properties: Record<string, any>;
}
