import {
  ResumeGenerationRequest,
  ResumeGenerationResult,
  GenerationStep,
} from '../entities/ResumeGeneration';
import { Resume } from '../entities/Resume';

export interface ResumeGenerationService {
  // Core generation
  generateResume(request: ResumeGenerationRequest): Promise<Resume>;
  regenerateResume(
    resumeId: string,
    changes?: Partial<ResumeGenerationRequest>
  ): Promise<Resume>;

  // Generation monitoring
  getGenerationStatus(requestId: string): Promise<GenerationStatus>;
  cancelGeneration(requestId: string): Promise<boolean>;

  // Content generation
  generateSection(
    sectionType: string,
    userData: any,
    context: GenerationContext
  ): Promise<SectionContent>;
  generateSummary(userData: any, targetPosition?: string): Promise<string>;
  generateExperienceDescription(
    experience: any,
    targetPosition?: string
  ): Promise<string>;

  // Optimization
  optimizeContent(
    content: string,
    optimizationType: OptimizationType
  ): Promise<OptimizedContent>;
  optimizeForKeywords(content: string, keywords: string[]): Promise<string>;
  optimizeForATS(resume: Resume, targetSystems?: string[]): Promise<Resume>;

  // Quality assurance
  validateResumeQuality(resumeId: string): Promise<QualityValidationResult>;
  improveResumeQuality(resumeId: string, targetScore: number): Promise<Resume>;

  // Batch operations
  generateBatchResumes(
    requests: ResumeGenerationRequest[]
  ): Promise<BatchGenerationResult>;

  // AI model management
  getAvailableModels(): Promise<AIModel[]>;
  selectOptimalModel(request: ResumeGenerationRequest): Promise<string>;

  // Template and style management
  applyTemplate(resumeId: string, templateId: string): Promise<Resume>;
  applyStyle(resumeId: string, styleId: string): Promise<Resume>;
  customizeLayout(
    resumeId: string,
    layoutChanges: LayoutChanges
  ): Promise<Resume>;
}

export interface GenerationStatus {
  requestId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep: string;
  estimatedTimeRemaining?: number; // in seconds
  steps: GenerationStep[];
  result?: Resume;
  errorMessage?: string;
  warnings?: string[];
}

export interface GenerationContext {
  targetPosition?: string;
  targetIndustry?: string;
  companyInfo?: CompanyInfo;
  jobRequirements?: string[];
  userPreferences: UserPreferences;
  marketTrends: MarketTrend[];
}

export interface CompanyInfo {
  name: string;
  industry: string;
  size: string;
  culture: string[];
  values: string[];
  technologies?: string[];
}

export interface UserPreferences {
  tone: 'professional' | 'friendly' | 'confident' | 'creative' | 'formal';
  length: 'concise' | 'standard' | 'detailed';
  focus: 'skills' | 'experience' | 'achievements' | 'education' | 'balanced';
  language: string;
  includePersonalInfo: boolean;
  emphasizeQuantifiableResults: boolean;
}

export interface MarketTrend {
  trend: string;
  impact: 'low' | 'medium' | 'high';
  relevance: number; // 0-100
  description: string;
  keywords: string[];
}

export interface SectionContent {
  content: string;
  metadata: SectionMetadata;
  suggestions: ContentSuggestion[];
  alternatives: string[];
}

export interface SectionMetadata {
  wordCount: number;
  keywordsUsed: string[];
  tone: string;
  readabilityScore: number;
  impactScore: number; // 0-100
  atsCompatibility: number; // 0-100
}

export interface ContentSuggestion {
  type: 'improvement' | 'enhancement' | 'alternative';
  description: string;
  implementation: string;
  expectedImpact: string;
  priority: 'low' | 'medium' | 'high';
}

export interface OptimizationType {
  type:
    | 'ats'
    | 'keywords'
    | 'readability'
    | 'impact'
    | 'length'
    | 'industry_specific';
  parameters: OptimizationParameters;
}

export interface OptimizationParameters {
  targetKeywords?: string[];
  keywordDensity?: number; // 0-100
  maxLength?: number;
  minLength?: number;
  targetReadingLevel?: string;
  industryStandards?: IndustryStandard[];
  atsRequirements?: ATSRequirement[];
}

export interface IndustryStandard {
  standard: string;
  value: any;
  importance: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface ATSRequirement {
  system: string;
  requirement: string;
  compliance: boolean;
  fix?: string;
}

export interface OptimizedContent {
  originalContent: string;
  optimizedContent: string;
  improvements: ContentImprovement[];
  metrics: OptimizationMetrics;
  warnings: string[];
}

export interface ContentImprovement {
  type:
    | 'keyword_addition'
    | 'structure_change'
    | 'language_improvement'
    | 'formatting_fix';
  description: string;
  before: string;
  after: string;
  impact: number; // score improvement
  reasoning: string;
}

export interface OptimizationMetrics {
  scoreImprovement: number;
  keywordDensityImprovement: number;
  readabilityImprovement: number;
  atsCompatibilityImprovement: number;
  lengthOptimization: number;
}

export interface QualityValidationResult {
  isValid: boolean;
  overallScore: number; // 0-100
  issues: QualityIssue[];
  suggestions: QualitySuggestion[];
  metrics: QualityMetrics;
  compliance: ComplianceCheck[];
}

export interface QualityIssue {
  type: 'content' | 'structure' | 'formatting' | 'grammar' | 'ats' | 'keywords';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: IssueLocation;
  suggestedFix: string;
  impact: string;
  autoFixable: boolean;
}

export interface IssueLocation {
  section?: string;
  subsection?: string;
  paragraph?: number;
  sentence?: number;
  line?: number;
  character?: number;
}

export interface QualitySuggestion {
  type: 'improvement' | 'enhancement' | 'optimization' | 'best_practice';
  category: 'content' | 'structure' | 'formatting' | 'keywords' | 'ats';
  description: string;
  implementation: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface QualityMetrics {
  contentQuality: number; // 0-100
  structureQuality: number; // 0-100
  formattingQuality: number; // 0-100
  atsCompatibility: number; // 0-100
  keywordOptimization: number; // 0-100
  readabilityScore: number; // 0-100
  overallScore: number; // 0-100
  confidenceLevel: number; // 0-100
}

export interface ComplianceCheck {
  standard: string;
  compliant: boolean;
  score: number; // 0-100
  issues: string[];
  recommendations: string[];
}

export interface BatchGenerationResult {
  batchId: string;
  totalRequests: number;
  completedRequests: number;
  failedRequests: number;
  results: Resume[];
  errors: BatchGenerationError[];
  summary: BatchGenerationSummary;
  processingTime: number; // in seconds
}

export interface BatchGenerationError {
  requestIndex: number;
  requestId: string;
  errorMessage: string;
  errorCode: string;
  timestamp: Date;
}

export interface BatchGenerationSummary {
  averageScore: number;
  averageGenerationTime: number; // in seconds
  successRate: number; // percentage
  commonIssues: string[];
  topPerformingTemplates: string[];
  recommendations: string[];
}

export interface AIModel {
  id: string;
  name: string;
  version: string;
  capabilities: ModelCapability[];
  languages: string[];
  maxTokens: number;
  averageProcessingTime: number; // in seconds
  qualityScore: number; // 0-100
  costPerRequest: number;
  specializations: string[];
  isActive: boolean;
  lastUpdated: Date;
}

export interface ModelCapability {
  capability: string;
  proficiency: number; // 0-100
  description: string;
  examples: string[];
}

export interface LayoutChanges {
  pageLayout?: 'single-column' | 'two-column' | 'three-column' | 'sidebar';
  sectionOrder?: string[];
  spacing?: SpacingChanges;
  typography?: TypographyChanges;
  colors?: ColorChanges;
}

export interface SpacingChanges {
  sectionGap?: number;
  itemGap?: number;
  margins?: Spacing;
  lineHeight?: number;
}

export interface TypographyChanges {
  primaryFont?: string;
  secondaryFont?: string;
  fontSize?: FontSizeChanges;
  fontWeights?: FontWeightChanges;
}

export interface FontSizeChanges {
  base?: number;
  heading1?: number;
  heading2?: number;
  heading3?: number;
  small?: number;
}

export interface FontWeightChanges {
  normal?: number;
  medium?: number;
  bold?: number;
  headings?: number;
}

export interface ColorChanges {
  primary?: string;
  secondary?: string;
  accent?: string;
  text?: string;
  background?: string;
}

export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ResumePersonalizationService {
  // Personalization
  personalizeContent(
    resumeId: string,
    context: PersonalizationContext
  ): Promise<Resume>;
  extractPersonalizationData(
    userId: string,
    targetJob?: string
  ): Promise<PersonalizationData>;

  // Context analysis
  analyzeJobDescription(jobDescription: string): Promise<JobAnalysis>;
  analyzeCompanyProfile(companyInfo: CompanyInfo): Promise<CompanyAnalysis>;

  // Matching and optimization
  calculateJobMatch(
    resumeId: string,
    jobDescription: string
  ): Promise<JobMatchResult>;
  optimizeForSpecificJob(
    resumeId: string,
    jobDescription: string
  ): Promise<Resume>;

  // Industry customization
  customizeForIndustry(resumeId: string, industry: string): Promise<Resume>;
  getIndustryBestPractices(industry: string): Promise<IndustryBestPractices>;
}

export interface PersonalizationContext {
  targetJob?: JobAnalysis;
  targetCompany?: CompanyAnalysis;
  userGoals: UserGoal[];
  marketConditions: MarketCondition[];
  competitorAnalysis?: CompetitorAnalysis;
}

export interface JobAnalysis {
  title: string;
  company: string;
  industry: string;
  requiredSkills: SkillRequirement[];
  preferredSkills: SkillRequirement[];
  responsibilities: string[];
  qualifications: string[];
  keywords: JobKeyword[];
  salaryRange?: SalaryRange;
  competitionLevel: 'low' | 'medium' | 'high' | 'very_high';
}

export interface SkillRequirement {
  skill: string;
  importance: 'required' | 'preferred' | 'nice_to_have';
  proficiencyLevel?: string;
  yearsRequired?: number;
  category: 'technical' | 'soft' | 'industry_specific';
}

export interface JobKeyword {
  keyword: string;
  frequency: number;
  importance: number; // 0-100
  category: string;
  context: string[];
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  benefits: string[];
}

export interface CompanyAnalysis {
  name: string;
  industry: string;
  size: string;
  culture: CultureAnalysis;
  values: string[];
  technologies: string[];
  recentNews: NewsItem[];
  competitivePosition: string;
}

export interface CultureAnalysis {
  type: 'startup' | 'corporate' | 'traditional' | 'innovative' | 'family';
  characteristics: string[];
  workStyle: string;
  communicationStyle: string;
  decisionMaking: string;
}

export interface NewsItem {
  title: string;
  date: Date;
  summary: string;
  relevance: number; // 0-100
  keywords: string[];
}

export interface UserGoal {
  type:
    | 'career_change'
    | 'promotion'
    | 'skill_development'
    | 'industry_switch'
    | 'salary_increase';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timeline: string;
  description: string;
  successMetrics: string[];
}

export interface MarketCondition {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  strength: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

export interface CompetitorAnalysis {
  competitorProfiles: CompetitorProfile[];
  marketPosition: string;
  differentiators: string[];
  gaps: string[];
  opportunities: string[];
}

export interface CompetitorProfile {
  anonymizedId: string;
  strengths: string[];
  weaknesses: string[];
  experience: string;
  skills: string[];
  score: number; // 0-100
}

export interface PersonalizationData {
  userHighlights: string[];
  relevantExperiences: string[];
  matchingSkills: string[];
  uniqueSellingPoints: string[];
  culturalAlignment: string[];
  quantifiedAchievements: string[];
  industryKnowledge: string[];
  transferableSkills: string[];
}

export interface JobMatchResult {
  overallMatch: number; // 0-100
  skillsMatch: number; // 0-100
  experienceMatch: number; // 0-100
  educationMatch: number; // 0-100
  cultureMatch: number; // 0-100
  matchingElements: MatchingElement[];
  missingElements: MissingElement[];
  recommendations: MatchRecommendation[];
  competitiveAdvantage: string[];
}

export interface MatchingElement {
  element: string;
  type: 'skill' | 'experience' | 'education' | 'certification' | 'achievement';
  matchStrength: number; // 0-100
  relevance: number; // 0-100
  differentiator: boolean;
}

export interface MissingElement {
  element: string;
  type: 'skill' | 'experience' | 'education' | 'certification';
  importance: 'required' | 'preferred' | 'nice_to_have';
  impact: number; // 0-100
  alternatives: string[];
  learningPath?: LearningPath;
}

export interface LearningPath {
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  resources: LearningResource[];
  milestones: string[];
  cost?: string;
}

export interface LearningResource {
  type: 'course' | 'certification' | 'book' | 'project' | 'mentorship';
  name: string;
  provider: string;
  duration: string;
  cost?: string;
  rating?: number;
  url?: string;
}

export interface MatchRecommendation {
  type: 'highlight' | 'add' | 'modify' | 'remove' | 'reorder';
  section: string;
  description: string;
  implementation: string;
  expectedImpact: number; // match percentage improvement
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface IndustryBestPractices {
  industry: string;
  commonSections: IndustrySectionGuideline[];
  keywordTrends: IndustryKeywordTrend[];
  formatPreferences: FormatPreference[];
  successFactors: IndustrySuccessFactor[];
  avoidanceList: string[];
}

export interface IndustrySectionGuideline {
  section: string;
  importance: 'required' | 'recommended' | 'optional';
  typicalContent: string[];
  bestPractices: string[];
  commonMistakes: string[];
}

export interface IndustryKeywordTrend {
  keyword: string;
  trend: 'rising' | 'stable' | 'declining';
  frequency: number; // percentage
  importance: number; // 0-100
  context: string[];
}

export interface FormatPreference {
  aspect: string;
  preference: string;
  reasoning: string;
  adoption: number; // percentage
  impact: 'low' | 'medium' | 'high';
}

export interface IndustrySuccessFactor {
  factor: string;
  importance: number; // 0-100
  description: string;
  implementation: string[];
  examples: string[];
}
