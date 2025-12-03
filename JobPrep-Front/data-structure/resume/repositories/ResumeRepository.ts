import { Resume, ResumeTemplate, ResumeStyle } from '../entities/Resume';
import { ResumeAnalysis } from '../entities/ResumeAnalysis';

export interface ResumeRepository {
  // Resume CRUD operations
  findById(id: string): Promise<Resume | null>;
  findByUserId(userId: string): Promise<Resume[]>;
  findByStatus(userId: string, status: Resume['status']): Promise<Resume[]>;
  create(
    resumeData: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Resume>;
  update(id: string, resumeData: Partial<Resume>): Promise<Resume>;
  delete(id: string): Promise<boolean>;

  // Resume versioning
  findVersions(parentResumeId: string): Promise<Resume[]>;
  createVersion(
    parentResumeId: string,
    changes: Partial<Resume>
  ): Promise<Resume>;
  getLatestVersion(parentResumeId: string): Promise<Resume | null>;

  // Resume templates
  findAllTemplates(): Promise<ResumeTemplate[]>;
  findTemplateById(id: string): Promise<ResumeTemplate | null>;
  findTemplatesByCategory(category: string): Promise<ResumeTemplate[]>;
  findPopularTemplates(limit: number): Promise<ResumeTemplate[]>;

  // Resume styles
  findAllStyles(): Promise<ResumeStyle[]>;
  findStyleById(id: string): Promise<ResumeStyle | null>;
  findStylesByMood(mood: string): Promise<ResumeStyle[]>;

  // Resume search and filtering
  findByTemplateId(templateId: string): Promise<Resume[]>;
  findByTargetPosition(position: string): Promise<Resume[]>;
  findRecentResumes(userId: string, limit: number): Promise<Resume[]>;
  findSharedResumes(userId: string): Promise<Resume[]>;

  // Resume analytics
  getResumeStatistics(userId: string): Promise<ResumeStatistics>;
  getTemplateUsageStats(): Promise<TemplateUsageStats[]>;
  getStylePopularityStats(): Promise<StylePopularityStats[]>;

  // Resume sharing and export
  createShare(
    resumeId: string,
    shareData: CreateShareData
  ): Promise<ResumeShare>;
  findShareByToken(token: string): Promise<ResumeShare | null>;
  updateShareStats(shareId: string, action: 'view' | 'download'): Promise<void>;

  createExport(
    resumeId: string,
    exportData: CreateExportData
  ): Promise<ResumeExport>;
  findExportsByResumeId(resumeId: string): Promise<ResumeExport[]>;
  cleanupExpiredExports(): Promise<number>;
}

export interface ResumeService {
  // Resume generation
  generateResume(request: GenerateResumeRequest): Promise<Resume>;
  regenerateResume(
    resumeId: string,
    changes?: Partial<GenerateResumeRequest>
  ): Promise<Resume>;

  // Resume optimization
  optimizeResume(
    resumeId: string,
    optimizationType: OptimizationType
  ): Promise<Resume>;
  optimizeForJob(resumeId: string, jobDescription: string): Promise<Resume>;
  optimizeForATS(resumeId: string, targetSystems?: string[]): Promise<Resume>;

  // Resume analysis
  analyzeResume(
    resumeId: string,
    analysisType?: AnalysisType
  ): Promise<ResumeAnalysis>;
  compareResumes(resumeIds: string[]): Promise<ResumeComparison>;

  // Resume management
  duplicateResume(resumeId: string, newTitle?: string): Promise<Resume>;
  archiveResume(resumeId: string): Promise<boolean>;
  restoreResume(resumeId: string): Promise<Resume>;

  // Templates and styles
  getRecommendedTemplates(
    userId: string,
    targetPosition?: string
  ): Promise<ResumeTemplate[]>;
  getRecommendedStyles(
    userId: string,
    templateId?: string
  ): Promise<ResumeStyle[]>;

  // Export and sharing
  exportResume(
    resumeId: string,
    format: ExportFormat,
    quality?: ExportQuality
  ): Promise<Buffer>;
  shareResume(
    resumeId: string,
    shareOptions: ShareOptions
  ): Promise<ResumeShare>;

  // Feedback and improvement
  submitFeedback(
    resumeId: string,
    feedback: SubmitFeedbackData
  ): Promise<ResumeFeedback>;
  getFeedback(resumeId: string): Promise<ResumeFeedback[]>;
  getImprovementSuggestions(resumeId: string): Promise<ImprovementSuggestion[]>;
}

export interface GenerateResumeRequest {
  userId: string;
  templateId: string;
  styleId: string;
  title: string;
  targetPosition?: string;
  targetIndustry?: string;
  customizations: ResumeCustomizations;
  contentSources: ContentSource[];
  preferences: GenerationPreferences;
}

export interface OptimizationType {
  type:
    | 'ats'
    | 'keywords'
    | 'structure'
    | 'content'
    | 'visual'
    | 'industry_specific';
  targetJob?: string;
  targetIndustry?: string;
  specificRequirements?: string[];
}

export interface AnalysisType {
  type: 'full' | 'quick' | 'ats' | 'keyword' | 'structure' | 'content';
  includeComparison: boolean;
  includeBenchmarks: boolean;
  includeRecommendations: boolean;
}

export interface ExportFormat {
  format: 'pdf' | 'docx' | 'html' | 'txt' | 'json';
  quality: 'draft' | 'standard' | 'high' | 'print';
  includeMetadata: boolean;
  watermark?: string;
}

export interface ExportQuality {
  dpi: number;
  compression: 'none' | 'low' | 'medium' | 'high';
  colorProfile: 'sRGB' | 'CMYK' | 'Grayscale';
  embedFonts: boolean;
}

export interface ShareOptions {
  recipientEmail?: string;
  message?: string;
  expiryDate?: Date;
  allowDownload: boolean;
  requirePassword: boolean;
  password?: string;
  trackViews: boolean;
}

export interface CreateShareData {
  recipientEmail?: string;
  message?: string;
  expiryDate?: Date;
  allowDownload: boolean;
  requirePassword: boolean;
  password?: string;
}

export interface CreateExportData {
  format: 'pdf' | 'docx' | 'html' | 'txt' | 'json';
  quality: 'draft' | 'standard' | 'high' | 'print';
  includeMetadata: boolean;
  watermark?: string;
}

export interface SubmitFeedbackData {
  feedbackType: 'user_rating' | 'expert_review' | 'peer_review';
  rating?: number; // 1-5
  feedback?: string;
  categories: FeedbackCategoryData[];
  suggestions: string[];
  isPublic: boolean;
}

export interface FeedbackCategoryData {
  category: 'content' | 'structure' | 'design' | 'ats' | 'keywords' | 'overall';
  score: number; // 0-100
  comments?: string;
}

export interface ResumeStatistics {
  totalResumes: number;
  activeResumes: number;
  averageScore: number;
  bestScore: number;
  improvementRate: number;
  mostUsedTemplate: string;
  mostUsedStyle: string;
  totalViews: number;
  totalDownloads: number;
  totalShares: number;
  averageGenerationTime: number; // in seconds
}

export interface TemplateUsageStats {
  templateId: string;
  templateName: string;
  usageCount: number;
  averageScore: number;
  userSatisfaction: number; // 0-100
  successRate: number; // 0-100
  popularIndustries: string[];
}

export interface StylePopularityStats {
  styleId: string;
  styleName: string;
  usageCount: number;
  averageScore: number;
  userSatisfaction: number; // 0-100
  trendingScore: number; // 0-100
  popularWithTemplates: string[];
}

export interface ImprovementSuggestion {
  type: 'content' | 'structure' | 'formatting' | 'keywords' | 'ats';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  category: string;
  examples?: string[];
  resources?: string[];
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
