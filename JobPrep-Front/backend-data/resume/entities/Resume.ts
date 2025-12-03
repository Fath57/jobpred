export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  styleId: string;
  targetPosition?: string;
  targetIndustry?: string;
  status: 'draft' | 'active' | 'archived' | 'template';
  version: number;
  parentResumeId?: string; // for versioning
  content: ResumeContent;
  formatting: ResumeFormatting;
  settings: ResumeSettings;
  analytics: ResumeAnalytics;
  aiAnalysis: ResumeAIAnalysis;
  createdAt: Date;
  updatedAt: Date;
  lastViewedAt?: Date;
  downloadCount: number;
  shareCount: number;
}

export interface ResumeContent {
  sections: ResumeSection[];
  customSections: CustomResumeSection[];
  sectionOrder: string[];
  hiddenSections: string[];
}

export interface ResumeSection {
  id: string;
  type:
    | 'personal'
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'languages'
    | 'certifications'
    | 'projects'
    | 'awards'
    | 'publications'
    | 'volunteer'
    | 'references'
    | 'interests';
  title: string;
  isVisible: boolean;
  order: number;
  content: any; // Specific to section type
  formatting: SectionFormatting;
}

export interface CustomResumeSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list' | 'table';
  isVisible: boolean;
  order: number;
  formatting: SectionFormatting;
}

export interface SectionFormatting {
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  color: string;
  backgroundColor?: string;
  margin: Spacing;
  padding: Spacing;
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ResumeFormatting {
  template: ResumeTemplate;
  style: ResumeStyle;
  layout: ResumeLayout;
  typography: Typography;
  colors: ColorScheme;
  spacing: GlobalSpacing;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'Modern' | 'Classic' | 'Creative' | 'Minimal' | 'Professional';
  description: string;
  previewUrl: string;
  structure: TemplateStructure;
  isActive: boolean;
}

export interface TemplateStructure {
  layout: 'single-column' | 'two-column' | 'three-column' | 'sidebar';
  headerStyle: 'centered' | 'left-aligned' | 'split' | 'banner';
  sectionStyle: 'standard' | 'boxed' | 'timeline' | 'cards';
  footerStyle: 'minimal' | 'detailed' | 'none';
}

export interface ResumeStyle {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mood: string;
  isActive: boolean;
}

export interface ResumeLayout {
  pageSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margins: Spacing;
  columns: number;
  columnGap: number;
  headerHeight: number;
  footerHeight: number;
}

export interface Typography {
  primaryFont: string;
  secondaryFont: string;
  baseFontSize: number;
  lineHeight: number;
  headingScale: number[];
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    bold: number;
  };
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  divider: string;
}

export interface GlobalSpacing {
  unit: number; // Base spacing unit (e.g., 8px)
  sectionGap: number;
  itemGap: number;
  paragraphGap: number;
}

export interface ResumeSettings {
  language: string;
  dateFormat: string;
  includePhoto: boolean;
  photoStyle: 'circle' | 'square' | 'rounded';
  includeReferences: boolean;
  includePageNumbers: boolean;
  watermark?: string;
  privacy: PrivacySettings;
}

export interface PrivacySettings {
  hidePersonalInfo: boolean;
  hideContactInfo: boolean;
  hidePhoto: boolean;
  anonymizeCompanies: boolean;
  hideReferences: boolean;
}

export interface ResumeAnalytics {
  views: number;
  downloads: number;
  shares: number;
  applications: number;
  responses: number;
  interviews: number;
  lastActivity: Date;
  performanceMetrics: PerformanceMetrics;
}

export interface PerformanceMetrics {
  responseRate: number; // 0-100
  interviewRate: number; // 0-100
  averageResponseTime: number; // in hours
  topPerformingSections: string[];
  improvementAreas: string[];
}

export interface ResumeAIAnalysis {
  overallScore: number; // 0-100
  atsScore: number; // 0-100
  readabilityScore: number; // 0-100
  keywordDensity: number; // 0-100
  structureScore: number; // 0-100
  contentQuality: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  recommendations: AIRecommendation[];
  keywordAnalysis: KeywordAnalysis;
  competitorComparison: CompetitorComparison;
  lastAnalyzed: Date;
}

export interface AIRecommendation {
  type: 'content' | 'structure' | 'formatting' | 'keywords' | 'ats';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  implementation: string;
  estimatedImprovement: number; // points
}

export interface KeywordAnalysis {
  totalKeywords: number;
  relevantKeywords: string[];
  missingKeywords: string[];
  keywordDensity: Record<string, number>;
  industryKeywords: string[];
  competitorKeywords: string[];
}

export interface CompetitorComparison {
  industryAverage: number;
  topPerformers: number;
  yourRanking: number;
  percentile: number;
  gapAnalysis: string[];
}

export interface ResumeExport {
  id: string;
  resumeId: string;
  format: 'pdf' | 'docx' | 'html' | 'txt' | 'json';
  quality: 'draft' | 'standard' | 'high' | 'print';
  fileUrl: string;
  fileSize: number; // in bytes
  downloadCount: number;
  createdAt: Date;
  expiresAt?: Date;
}

export interface ResumeShare {
  id: string;
  resumeId: string;
  shareToken: string;
  shareUrl: string;
  recipientEmail?: string;
  message?: string;
  expiresAt?: Date;
  viewCount: number;
  downloadCount: number;
  isActive: boolean;
  createdAt: Date;
  lastAccessedAt?: Date;
}
