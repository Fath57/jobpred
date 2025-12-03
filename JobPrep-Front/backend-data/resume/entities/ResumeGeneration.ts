export interface ResumeGenerationRequest {
  id: string;
  userId: string;
  type: 'new' | 'update' | 'optimize' | 'customize';
  templateId: string;
  styleId: string;
  targetPosition?: string;
  targetIndustry?: string;
  customizations: ResumeCustomizations;
  contentSources: ContentSource[];
  preferences: GenerationPreferences;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  estimatedCompletionTime?: number; // in seconds
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  errorMessage?: string;
}

export interface ResumeCustomizations {
  sections: SectionCustomization[];
  layout: LayoutCustomization;
  styling: StylingCustomization;
  content: ContentCustomization;
  atsOptimization: ATSOptimization;
}

export interface SectionCustomization {
  sectionType: string;
  isIncluded: boolean;
  title?: string;
  order: number;
  maxItems?: number;
  customFields: CustomField[];
}

export interface CustomField {
  name: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'list';
  value: any;
  isRequired: boolean;
}

export interface LayoutCustomization {
  pageLayout: 'single-column' | 'two-column' | 'three-column' | 'sidebar';
  pageSize: 'A4' | 'Letter' | 'Legal';
  margins: Spacing;
  spacing: SpacingCustomization;
  headerStyle: 'minimal' | 'standard' | 'detailed' | 'creative';
  footerStyle: 'none' | 'minimal' | 'detailed';
}

export interface SpacingCustomization {
  sectionGap: number;
  itemGap: number;
  lineHeight: number;
  paragraphSpacing: number;
}

export interface StylingCustomization {
  colorScheme: ColorSchemeCustomization;
  typography: TypographyCustomization;
  visualElements: VisualElementsCustomization;
}

export interface ColorSchemeCustomization {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  useGradients: boolean;
  colorIntensity: number; // 0-100
}

export interface TypographyCustomization {
  primaryFont: string;
  secondaryFont: string;
  fontSize: FontSizeCustomization;
  fontWeights: FontWeightCustomization;
  textAlignment: TextAlignmentCustomization;
}

export interface FontSizeCustomization {
  base: number;
  heading1: number;
  heading2: number;
  heading3: number;
  small: number;
}

export interface FontWeightCustomization {
  normal: number;
  medium: number;
  bold: number;
  headings: number;
}

export interface TextAlignmentCustomization {
  headers: 'left' | 'center' | 'right';
  body: 'left' | 'center' | 'right' | 'justify';
  contact: 'left' | 'center' | 'right';
}

export interface VisualElementsCustomization {
  useBorders: boolean;
  useIcons: boolean;
  useProgressBars: boolean;
  useTimeline: boolean;
  iconStyle: 'outline' | 'filled' | 'minimal';
  borderStyle: 'solid' | 'dashed' | 'dotted';
}

export interface ContentCustomization {
  summaryStyle: 'paragraph' | 'bullets' | 'highlights';
  experienceFormat: 'detailed' | 'concise' | 'achievement-focused';
  skillsDisplay: 'list' | 'grid' | 'bars' | 'tags';
  dateFormat: string;
  includePhoto: boolean;
  photoStyle: 'circle' | 'square' | 'rounded';
  languageLevel: 'beginner-friendly' | 'professional' | 'technical';
}

export interface ATSOptimization {
  enabled: boolean;
  targetSystems: string[];
  keywordOptimization: boolean;
  formatOptimization: boolean;
  structureOptimization: boolean;
  keywordDensity: number; // 0-100
}

export interface ContentSource {
  type:
    | 'profile'
    | 'linkedin'
    | 'manual'
    | 'previous_resume'
    | 'job_description';
  sourceId?: string;
  data: any;
  priority: number; // 1-10
  lastUpdated: Date;
}

export interface GenerationPreferences {
  language: string;
  tone: 'professional' | 'friendly' | 'confident' | 'creative' | 'formal';
  length: 'concise' | 'standard' | 'detailed';
  focus: 'skills' | 'experience' | 'achievements' | 'education' | 'balanced';
  industrySpecific: boolean;
  includeKeywords: string[];
  excludeKeywords: string[];
}

export interface ResumeGenerationResult {
  id: string;
  requestId: string;
  resumeId: string;
  generationSteps: GenerationStep[];
  processingTime: number; // in seconds
  aiModel: string;
  aiVersion: string;
  qualityMetrics: GenerationQualityMetrics;
  optimizations: OptimizationResult[];
  createdAt: Date;
}

export interface GenerationStep {
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  duration?: number; // in seconds
  details?: string;
  progress?: number; // 0-100
  errorMessage?: string;
}

export interface GenerationQualityMetrics {
  contentRelevance: number; // 0-100
  structureOptimization: number; // 0-100
  atsCompatibility: number; // 0-100
  keywordOptimization: number; // 0-100
  readabilityScore: number; // 0-100
  visualAppeal: number; // 0-100
  overallScore: number; // 0-100
  confidenceLevel: number; // 0-100
}

export interface OptimizationResult {
  type: 'content' | 'structure' | 'formatting' | 'keywords' | 'ats';
  description: string;
  beforeScore: number;
  afterScore: number;
  improvement: number;
  changes: OptimizationChange[];
}

export interface OptimizationChange {
  section: string;
  changeType: 'added' | 'modified' | 'removed' | 'reordered';
  description: string;
  impact: 'low' | 'medium' | 'high';
  reasoning: string;
}

export interface ResumeOptimization {
  id: string;
  resumeId: string;
  userId: string;
  optimizationType:
    | 'ats'
    | 'keywords'
    | 'structure'
    | 'content'
    | 'visual'
    | 'industry_specific';
  targetJobId?: string;
  targetIndustry?: string;
  optimizationRules: OptimizationRule[];
  results: OptimizationResults;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  errorMessage?: string;
}

export interface OptimizationRule {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'structure' | 'formatting' | 'keywords';
  priority: number; // 1-10
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
}

export interface RuleCondition {
  field: string;
  operator:
    | 'equals'
    | 'contains'
    | 'greater_than'
    | 'less_than'
    | 'exists'
    | 'not_exists';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface RuleAction {
  type: 'add' | 'modify' | 'remove' | 'reorder' | 'highlight' | 'suggest';
  target: string;
  value?: any;
  description: string;
}

export interface OptimizationResults {
  appliedRules: AppliedRule[];
  scoreImprovement: number;
  changesCount: number;
  estimatedImpact: string;
  recommendations: OptimizationRecommendation[];
}

export interface AppliedRule {
  ruleId: string;
  ruleName: string;
  success: boolean;
  changes: OptimizationChange[];
  impact: number; // score improvement
  errorMessage?: string;
}

export interface OptimizationRecommendation {
  type: 'immediate' | 'short_term' | 'long_term';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: number; // score points
  effort: 'low' | 'medium' | 'high';
}

export interface ResumeComparison {
  id: string;
  userId: string;
  resumeIds: string[];
  comparisonType: 'version' | 'template' | 'optimization' | 'competitor';
  metrics: ComparisonMetric[];
  insights: ComparisonInsight[];
  recommendations: string[];
  createdAt: Date;
}

export interface ComparisonMetric {
  metric: string;
  values: ComparisonValue[];
  winner: string; // resumeId
  significance: 'low' | 'medium' | 'high';
  explanation: string;
}

export interface ComparisonValue {
  resumeId: string;
  value: number;
  rank: number;
  percentageDifference: number;
}

export interface ComparisonInsight {
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  title: string;
  description: string;
  affectedResumes: string[];
  actionable: boolean;
  recommendations: string[];
}

export interface ResumeFeedback {
  id: string;
  resumeId: string;
  userId: string;
  feedbackType: 'user_rating' | 'ai_analysis' | 'expert_review' | 'peer_review';
  source: string;
  rating?: number; // 1-5
  feedback?: string;
  categories: FeedbackCategory[];
  suggestions: FeedbackSuggestion[];
  isHelpful?: boolean;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackCategory {
  category: 'content' | 'structure' | 'design' | 'ats' | 'keywords' | 'overall';
  score: number; // 0-100
  comments?: string;
  suggestions?: string[];
  examples?: string[];
}

export interface FeedbackSuggestion {
  type: 'improvement' | 'enhancement' | 'alternative' | 'addition';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  category: string;
}
