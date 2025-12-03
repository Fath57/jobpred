export interface LetterGenerationRequest {
  id: string;
  userId: string;
  type: 'motivation' | 'follow_up';
  jobOfferId?: string;
  applicationId?: string;
  templateId: string;
  toneId?: string;
  timingOptionId?: string;
  customizations: Record<string, any>;
  additionalContext?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  estimatedCompletionTime?: number; // in seconds
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  errorMessage?: string;
}

export interface LetterGenerationResult {
  id: string;
  requestId: string;
  letterId: string;
  generationSteps: GenerationStep[];
  processingTime: number; // in seconds
  aiModel: string;
  aiVersion: string;
  qualityMetrics: QualityMetrics;
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
  errorMessage?: string;
}

export interface QualityMetrics {
  contentRelevance: number; // 0-100
  languageQuality: number; // 0-100
  personalization: number; // 0-100
  professionalismScore: number; // 0-100
  readabilityScore: number; // 0-100
  keywordOptimization: number; // 0-100
  overallScore: number; // 0-100
  confidenceLevel: number; // 0-100
}

export interface LetterFeedback {
  id: string;
  letterId: string;
  userId: string;
  type: 'user_rating' | 'ai_analysis' | 'expert_review';
  rating?: number; // 1-5
  feedback?: string;
  suggestions: string[];
  categories: FeedbackCategory[];
  isHelpful?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackCategory {
  category:
    | 'content'
    | 'structure'
    | 'tone'
    | 'personalization'
    | 'grammar'
    | 'relevance';
  score: number; // 0-100
  comments?: string;
  suggestions?: string[];
}

export interface LetterAnalytics {
  id: string;
  letterId: string;
  userId: string;
  applicationId?: string;
  metrics: AnalyticsMetrics;
  events: AnalyticsEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsMetrics {
  openRate?: number;
  responseRate?: number;
  interviewRate?: number;
  timeToResponse?: number; // in hours
  engagementScore?: number; // 0-100
  effectivenessScore?: number; // 0-100
}

export interface AnalyticsEvent {
  type:
    | 'letter_sent'
    | 'letter_opened'
    | 'response_received'
    | 'interview_scheduled'
    | 'rejection_received';
  timestamp: Date;
  details?: Record<string, any>;
  source?: string;
}
