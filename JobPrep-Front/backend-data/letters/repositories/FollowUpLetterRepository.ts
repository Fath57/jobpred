import {
  FollowUpLetter,
  Application,
  TimingOption,
  FollowUpTemplate,
} from '../entities/FollowUpLetter';

export interface FollowUpLetterRepository {
  // Follow-up letter CRUD operations
  findById(id: string): Promise<FollowUpLetter | null>;
  findByUserId(userId: string): Promise<FollowUpLetter[]>;
  findByApplicationId(applicationId: string): Promise<FollowUpLetter[]>;
  create(
    letterData: Omit<FollowUpLetter, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<FollowUpLetter>;
  update(
    id: string,
    letterData: Partial<FollowUpLetter>
  ): Promise<FollowUpLetter>;
  delete(id: string): Promise<boolean>;

  // Application management
  findApplicationById(id: string): Promise<Application | null>;
  findApplicationsByUserId(userId: string): Promise<Application[]>;
  createApplication(
    applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Application>;
  updateApplication(
    id: string,
    applicationData: Partial<Application>
  ): Promise<Application>;

  // Follow-up scheduling
  findScheduledFollowUps(userId: string): Promise<FollowUpLetter[]>;
  findOverdueFollowUps(userId: string): Promise<Application[]>;

  // Templates and timing
  findAllTimingOptions(): Promise<TimingOption[]>;
  findAllFollowUpTemplates(): Promise<FollowUpTemplate[]>;
  findTemplateById(id: string): Promise<FollowUpTemplate | null>;

  // Analytics
  getFollowUpStatistics(userId: string): Promise<FollowUpStatistics>;
  getResponseRateByTiming(): Promise<TimingEffectivenessStats[]>;
  getTemplatePerformanceStats(): Promise<TemplatePerformanceStats[]>;
}

export interface FollowUpLetterService {
  // Follow-up generation
  generateFollowUp(request: GenerateFollowUpRequest): Promise<FollowUpLetter>;
  scheduleFollowUp(letterId: string, sendDate: Date): Promise<boolean>;

  // Application tracking
  trackApplication(
    applicationData: CreateApplicationData
  ): Promise<Application>;
  updateApplicationStatus(
    applicationId: string,
    status: Application['status']
  ): Promise<Application>;
  addInteraction(
    applicationId: string,
    interaction: Omit<ApplicationInteraction, 'id'>
  ): Promise<Application>;

  // Follow-up recommendations
  getRecommendedFollowUps(userId: string): Promise<FollowUpRecommendation[]>;
  getOptimalTiming(applicationId: string): Promise<TimingRecommendation>;

  // Automation
  processScheduledFollowUps(): Promise<ProcessedFollowUp[]>;
  sendFollowUpEmail(letterId: string): Promise<boolean>;

  // Analytics
  analyzeFollowUpEffectiveness(userId: string): Promise<EffectivenessAnalysis>;
}

export interface GenerateFollowUpRequest {
  userId: string;
  applicationId: string;
  templateId: string;
  timingOptionId: string;
  customizations: FollowUpLetter['customizations'];
  additionalContext?: string;
}

export interface CreateApplicationData {
  userId: string;
  jobOfferId: string;
  motivationLetterId?: string;
  cvId?: string;
  appliedDate: Date;
  notes?: string;
  tags?: string[];
}

export interface FollowUpRecommendation {
  applicationId: string;
  jobTitle: string;
  company: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction: string;
  suggestedTemplate: string;
  optimalTiming: string;
  expectedResponseRate: number;
  reasoning: string;
}

export interface TimingRecommendation {
  timingOptionId: string;
  recommendedDate: Date;
  reasoning: string;
  expectedResponseRate: number;
  alternativeOptions: {
    timingOptionId: string;
    date: Date;
    responseRate: number;
  }[];
}

export interface ProcessedFollowUp {
  letterId: string;
  status: 'sent' | 'failed' | 'scheduled';
  sentAt?: Date;
  errorMessage?: string;
}

export interface FollowUpStatistics {
  totalFollowUps: number;
  averageResponseRate: number;
  interviewsScheduled: number;
  averageResponseTime: number; // in hours
  bestPerformingTemplate: string;
  optimalTiming: string;
  successRate: number;
}

export interface TimingEffectivenessStats {
  timingOptionId: string;
  timingName: string;
  averageResponseRate: number;
  averageResponseTime: number;
  usageCount: number;
  bestForIndustries: string[];
}

export interface TemplatePerformanceStats {
  templateId: string;
  templateName: string;
  usageCount: number;
  averageScore: number;
  responseRate: number;
  interviewRate: number;
  bestForSituations: string[];
}

export interface EffectivenessAnalysis {
  overallEffectiveness: number; // 0-100
  responseRateTrend: 'improving' | 'stable' | 'declining';
  bestPerformingStrategies: string[];
  recommendedImprovements: string[];
  benchmarkComparison: {
    industryAverage: number;
    yourPerformance: number;
    percentile: number;
  };
}
