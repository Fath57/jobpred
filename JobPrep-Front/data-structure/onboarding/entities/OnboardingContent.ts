export interface OnboardingContent {
  id: string;
  type:
    | 'welcome'
    | 'tutorial'
    | 'tip'
    | 'guide'
    | 'video'
    | 'interactive'
    | 'assessment';
  title: string;
  description: string;
  content: ContentBlock[];
  metadata: ContentMetadata;
  targeting: ContentTargeting;
  scheduling: ContentScheduling;
  analytics: ContentAnalytics;
  isActive: boolean;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ContentBlock {
  id: string;
  type:
    | 'text'
    | 'image'
    | 'video'
    | 'audio'
    | 'interactive'
    | 'form'
    | 'quiz'
    | 'checklist'
    | 'timeline'
    | 'comparison';
  order: number;
  content: any;
  styling: BlockStyling;
  behavior: BlockBehavior;
  conditions: DisplayCondition[];
}

export interface BlockStyling {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  width?: string;
  height?: string;
  animation?: AnimationConfig;
}

export interface AnimationConfig {
  type: 'fade' | 'slide' | 'bounce' | 'zoom' | 'rotate' | 'flip';
  direction?: 'up' | 'down' | 'left' | 'right' | 'in' | 'out';
  duration: number; // in milliseconds
  delay?: number; // in milliseconds
  easing?: string;
  repeat?: number;
  infinite?: boolean;
}

export interface BlockBehavior {
  isInteractive: boolean;
  onClick?: ActionConfig;
  onHover?: ActionConfig;
  onScroll?: ActionConfig;
  autoplay?: boolean;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number; // in seconds
}

export interface ActionConfig {
  type:
    | 'navigate'
    | 'modal'
    | 'tooltip'
    | 'highlight'
    | 'scroll'
    | 'api_call'
    | 'custom';
  target?: string;
  parameters?: Record<string, any>;
  animation?: AnimationConfig;
}

export interface DisplayCondition {
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_contains'
    | 'greater_than'
    | 'less_than'
    | 'in'
    | 'not_in';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface ContentMetadata {
  tags: string[];
  categories: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
  language: string;
  accessibility: AccessibilityInfo;
  seo: SEOInfo;
}

export interface AccessibilityInfo {
  hasAltText: boolean;
  hasTranscripts: boolean;
  hasSubtitles: boolean;
  keyboardNavigable: boolean;
  screenReaderFriendly: boolean;
  colorContrastRatio: number;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

export interface SEOInfo {
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

export interface ContentTargeting {
  audienceSegments: string[];
  experienceLevels: string[];
  industries: string[];
  roles: string[];
  demographics: TargetingDemographics;
  behavioral: BehavioralTargeting;
  contextual: ContextualTargeting;
}

export interface TargetingDemographics {
  ageRanges: string[];
  locations: string[];
  languages: string[];
  educationLevels: string[];
  incomeRanges: string[];
}

export interface BehavioralTargeting {
  previousActions: string[];
  engagementLevel: 'low' | 'medium' | 'high';
  completionHistory: string[];
  preferredContentTypes: string[];
  deviceUsage: string[];
  timeOfDay: string[];
  dayOfWeek: string[];
}

export interface ContextualTargeting {
  currentStep: string[];
  progressLevel: string[];
  timeSpentRange: string;
  errorsEncountered: string[];
  helpRequested: boolean;
  satisfactionScore?: number;
}

export interface ContentScheduling {
  isScheduled: boolean;
  startDate?: Date;
  endDate?: Date;
  timezone: string;
  frequency?: ScheduleFrequency;
  conditions: ScheduleCondition[];
}

export interface ScheduleFrequency {
  type: 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';
  interval?: number;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
  timeOfDay?: string;
}

export interface ScheduleCondition {
  type: 'user_action' | 'time_based' | 'progress_based' | 'external_trigger';
  condition: string;
  parameters: Record<string, any>;
}

export interface ContentAnalytics {
  views: number;
  uniqueViews: number;
  completions: number;
  completionRate: number;
  averageTimeSpent: number; // in seconds
  interactions: number;
  shares: number;
  likes: number;
  comments: number;
  ratings: ContentRating[];
  feedback: ContentFeedback[];
  performanceMetrics: ContentPerformanceMetrics;
}

export interface ContentRating {
  userId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

export interface ContentFeedback {
  userId: string;
  type: 'helpful' | 'not_helpful' | 'suggestion' | 'error' | 'compliment';
  message: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  createdAt: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface ContentPerformanceMetrics {
  engagementScore: number; // 0-100
  effectivenessScore: number; // 0-100
  satisfactionScore: number; // 1-5
  conversionImpact: number; // 0-100
  retentionImpact: number; // 0-100
  dropoffReduction: number; // 0-100
}

export interface OnboardingTip {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'tip' | 'best_practice';
  category: string;
  triggers: TipTrigger[];
  targeting: TipTargeting;
  display: TipDisplay;
  analytics: TipAnalytics;
  isActive: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TipTrigger {
  type:
    | 'step_enter'
    | 'step_exit'
    | 'field_focus'
    | 'error_occur'
    | 'time_spent'
    | 'idle_time'
    | 'custom';
  condition: string;
  delay?: number; // in seconds
  frequency: 'once' | 'always' | 'daily' | 'weekly';
}

export interface TipTargeting {
  userSegments: string[];
  experienceLevels: string[];
  progressLevels: string[];
  errorPatterns: string[];
  behaviorPatterns: string[];
}

export interface TipDisplay {
  position: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'overlay';
  style: 'tooltip' | 'modal' | 'banner' | 'sidebar' | 'inline';
  animation: AnimationConfig;
  dismissible: boolean;
  autoDismiss: boolean;
  autoDismissDelay?: number; // in seconds
  showOnce: boolean;
}

export interface TipAnalytics {
  impressions: number;
  clicks: number;
  dismissals: number;
  helpfulness: number; // 1-5
  conversionImpact: number; // 0-100
  userFeedback: TipFeedback[];
}

export interface TipFeedback {
  userId: string;
  helpful: boolean;
  comment?: string;
  createdAt: Date;
}

export interface OnboardingNotification {
  id: string;
  type: 'email' | 'sms' | 'push' | 'in_app' | 'webhook';
  template: NotificationTemplate;
  triggers: NotificationTrigger[];
  targeting: NotificationTargeting;
  scheduling: NotificationScheduling;
  content: NotificationContent;
  analytics: NotificationAnalytics;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject?: string;
  body: string;
  htmlBody?: string;
  variables: TemplateVariable[];
  styling: NotificationStyling;
  personalization: NotificationPersonalization;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'object';
  defaultValue?: any;
  isRequired: boolean;
  description: string;
}

export interface NotificationStyling {
  theme: 'light' | 'dark' | 'brand' | 'custom';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    sizes: Record<string, string>;
  };
  layout: {
    width: string;
    padding: string;
    borderRadius: string;
  };
}

export interface NotificationPersonalization {
  useUserName: boolean;
  useUserProgress: boolean;
  useUserGoals: boolean;
  useUserPreferences: boolean;
  dynamicContent: DynamicContentRule[];
}

export interface DynamicContentRule {
  condition: string;
  content: string;
  priority: number;
}

export interface NotificationTrigger {
  type: 'immediate' | 'delayed' | 'scheduled' | 'conditional';
  event: string;
  delay?: number; // in minutes
  condition?: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  maxOccurrences?: number;
}

export interface NotificationTargeting {
  userSegments: string[];
  progressStates: string[];
  engagementLevels: string[];
  timeZones: string[];
  preferredChannels: string[];
  optOutRespected: boolean;
}

export interface NotificationScheduling {
  timezone: string;
  sendTime?: string; // HH:MM format
  daysOfWeek: number[];
  blackoutPeriods: BlackoutPeriod[];
  rateLimiting: RateLimiting;
}

export interface BlackoutPeriod {
  startDate: Date;
  endDate: Date;
  reason: string;
  affectedChannels: string[];
}

export interface RateLimiting {
  maxPerHour: number;
  maxPerDay: number;
  maxPerWeek: number;
  respectUserPreferences: boolean;
}

export interface NotificationContent {
  subject?: string;
  body: string;
  htmlBody?: string;
  attachments: NotificationAttachment[];
  callToAction: CallToAction[];
  personalizationData: Record<string, any>;
}

export interface NotificationAttachment {
  name: string;
  url: string;
  mimeType: string;
  size: number;
  isInline: boolean;
}

export interface CallToAction {
  text: string;
  url: string;
  type: 'primary' | 'secondary';
  tracking: CTATracking;
}

export interface CTATracking {
  trackClicks: boolean;
  trackConversions: boolean;
  utmParameters: Record<string, string>;
  customParameters: Record<string, string>;
}

export interface NotificationAnalytics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  bounced: number;
  unsubscribed: number;
  complained: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  unsubscribeRate: number;
  complaintRate: number;
}

export interface OnboardingExperiment {
  id: string;
  name: string;
  description: string;
  hypothesis: string;
  type: 'a_b_test' | 'multivariate' | 'split_url' | 'feature_flag';
  status: 'draft' | 'running' | 'paused' | 'completed' | 'archived';
  variants: ExperimentVariant[];
  targeting: ExperimentTargeting;
  metrics: ExperimentMetric[];
  settings: ExperimentSettings;
  results: ExperimentResults;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ExperimentVariant {
  id: string;
  name: string;
  description: string;
  isControl: boolean;
  trafficAllocation: number; // 0-100
  changes: VariantChange[];
  performance: VariantPerformance;
}

export interface VariantChange {
  type: 'content' | 'design' | 'flow' | 'behavior' | 'feature';
  target: string;
  change: any;
  description: string;
}

export interface ExperimentTargeting {
  audienceSegments: string[];
  trafficPercentage: number; // 0-100
  geoTargeting: string[];
  deviceTargeting: string[];
  timeTargeting: TimeTargeting;
  customCriteria: string[];
}

export interface TimeTargeting {
  startDate: Date;
  endDate?: Date;
  daysOfWeek: number[];
  hoursOfDay: number[];
  timezone: string;
}

export interface ExperimentMetric {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'guardrail';
  description: string;
  calculation: string;
  target?: number;
  direction: 'increase' | 'decrease' | 'no_change';
  significance: number; // 0-1
  power: number; // 0-1
}

export interface ExperimentSettings {
  minimumSampleSize: number;
  minimumDuration: number; // in days
  maximumDuration: number; // in days
  significanceLevel: number; // 0-1
  powerLevel: number; // 0-1
  earlyStoppingEnabled: boolean;
  earlyStoppingRules: EarlyStoppingRule[];
}

export interface EarlyStoppingRule {
  metric: string;
  condition: string;
  action: 'stop' | 'pause' | 'alert';
  threshold: number;
}

export interface ExperimentResults {
  status: 'running' | 'completed' | 'inconclusive' | 'stopped';
  duration: number; // in days
  participants: number;
  conversions: number;
  conversionRate: number;
  confidence: number; // 0-100
  significance: number; // 0-1
  winner?: string; // variant ID
  lift: number; // percentage
  insights: ExperimentInsight[];
  recommendations: string[];
}

export interface ExperimentInsight {
  type: 'statistical' | 'behavioral' | 'segment' | 'temporal' | 'technical';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
}
