import {
  MotivationLetter,
  MotivationLetterTemplate,
  MotivationLetterTone,
} from '../entities/MotivationLetter';

export interface MotivationLetterRepository {
  // Letter CRUD operations
  findById(id: string): Promise<MotivationLetter | null>;
  findByUserId(userId: string): Promise<MotivationLetter[]>;
  findByJobOfferId(jobOfferId: string): Promise<MotivationLetter[]>;
  create(
    letterData: Omit<MotivationLetter, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<MotivationLetter>;
  update(
    id: string,
    letterData: Partial<MotivationLetter>
  ): Promise<MotivationLetter>;
  delete(id: string): Promise<boolean>;

  // Letter versioning
  findVersions(parentLetterId: string): Promise<MotivationLetter[]>;
  createVersion(
    parentLetterId: string,
    changes: Partial<MotivationLetter>
  ): Promise<MotivationLetter>;

  // Letter search and filtering
  findByStatus(
    userId: string,
    status: MotivationLetter['status']
  ): Promise<MotivationLetter[]>;
  findByScoreRange(
    userId: string,
    minScore: number,
    maxScore: number
  ): Promise<MotivationLetter[]>;
  findRecentLetters(userId: string, limit: number): Promise<MotivationLetter[]>;

  // Template operations
  findAllTemplates(): Promise<MotivationLetterTemplate[]>;
  findTemplateById(id: string): Promise<MotivationLetterTemplate | null>;
  findTemplatesByCategory(
    category: string
  ): Promise<MotivationLetterTemplate[]>;

  // Tone operations
  findAllTones(): Promise<MotivationLetterTone[]>;
  findToneById(id: string): Promise<MotivationLetterTone | null>;

  // Analytics
  getLetterStatistics(userId: string): Promise<LetterStatistics>;
  getTemplateUsageStats(): Promise<TemplateUsageStats[]>;
  getToneEffectivenessStats(): Promise<ToneEffectivenessStats[]>;
}

export interface MotivationLetterService {
  // Letter generation
  generateLetter(request: GenerateLetterRequest): Promise<MotivationLetter>;
  regenerateLetter(
    letterId: string,
    changes?: Partial<GenerateLetterRequest>
  ): Promise<MotivationLetter>;

  // Letter optimization
  optimizeLetter(letterId: string): Promise<MotivationLetter>;
  analyzeLetter(letterId: string): Promise<LetterAnalysisResult>;

  // Letter management
  duplicateLetter(
    letterId: string,
    newJobOfferId?: string
  ): Promise<MotivationLetter>;
  archiveLetter(letterId: string): Promise<boolean>;

  // Recommendations
  getRecommendedTemplates(
    userId: string,
    jobOfferId?: string
  ): Promise<MotivationLetterTemplate[]>;
  getRecommendedTones(
    userId: string,
    jobOfferId?: string
  ): Promise<MotivationLetterTone[]>;

  // Export
  exportLetter(
    letterId: string,
    format: 'pdf' | 'docx' | 'txt' | 'html'
  ): Promise<Buffer>;
}

export interface GenerateLetterRequest {
  userId: string;
  jobOfferId?: string;
  templateId: string;
  toneId: string;
  customizations: MotivationLetter['customizations'];
  additionalContext?: string;
}

export interface LetterAnalysisResult {
  score: number;
  strengths: string[];
  suggestions: string[];
  keywordAnalysis: {
    matched: string[];
    missing: string[];
    density: number;
  };
  readabilityMetrics: {
    fleschScore: number;
    averageSentenceLength: number;
    complexWords: number;
  };
  competitorComparison: {
    averageScore: number;
    percentile: number;
    topPerformers: number;
  };
}

export interface LetterStatistics {
  totalLetters: number;
  averageScore: number;
  bestScore: number;
  improvementRate: number;
  mostUsedTemplate: string;
  mostUsedTone: string;
  averageWordCount: number;
  totalTimeSaved: number; // in hours
}

export interface TemplateUsageStats {
  templateId: string;
  templateName: string;
  usageCount: number;
  averageScore: number;
  successRate: number;
}

export interface ToneEffectivenessStats {
  toneId: string;
  toneName: string;
  usageCount: number;
  averageScore: number;
  responseRate: number;
  bestForIndustries: string[];
}
