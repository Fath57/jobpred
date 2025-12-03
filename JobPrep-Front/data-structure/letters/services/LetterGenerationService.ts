import {
  LetterGenerationRequest,
  LetterGenerationResult,
  GenerationStep,
  QualityMetrics,
} from '../entities/LetterGeneration';
import { MotivationLetter } from '../entities/MotivationLetter';
import { FollowUpLetter } from '../entities/FollowUpLetter';

export interface LetterGenerationService {
  // Core generation
  generateMotivationLetter(
    request: MotivationLetterGenerationRequest
  ): Promise<MotivationLetter>;
  generateFollowUpLetter(
    request: FollowUpLetterGenerationRequest
  ): Promise<FollowUpLetter>;

  // Generation monitoring
  getGenerationStatus(requestId: string): Promise<GenerationStatus>;
  cancelGeneration(requestId: string): Promise<boolean>;

  // Quality assurance
  validateLetterQuality(letterId: string): Promise<QualityValidationResult>;
  improveLetterQuality(
    letterId: string,
    targetScore: number
  ): Promise<MotivationLetter | FollowUpLetter>;

  // Batch operations
  generateBatchLetters(
    requests: BatchGenerationRequest[]
  ): Promise<BatchGenerationResult>;

  // AI model management
  getAvailableModels(): Promise<AIModel[]>;
  selectOptimalModel(request: any): Promise<string>;
}

export interface MotivationLetterGenerationRequest {
  userId: string;
  jobOfferId?: string;
  templateId: string;
  toneId: string;
  customizations: {
    formalityLevel: number;
    length: string;
    keyPoints: string[];
    additionalInfo?: string;
    language: string;
    includePortfolio: boolean;
    includeSalaryExpectations: boolean;
  };
  additionalContext?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface FollowUpLetterGenerationRequest {
  userId: string;
  applicationId: string;
  templateId: string;
  timingOptionId: string;
  customizations: {
    objective: string;
    insistenceLevel: number;
    includeElements: string[];
    newInformation?: string;
    preferredChannel: string;
    scheduleSuggestion: boolean;
  };
  additionalContext?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface GenerationStatus {
  requestId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep: string;
  estimatedTimeRemaining?: number; // in seconds
  steps: GenerationStep[];
  result?: MotivationLetter | FollowUpLetter;
  errorMessage?: string;
}

export interface QualityValidationResult {
  isValid: boolean;
  score: number; // 0-100
  issues: QualityIssue[];
  suggestions: QualitySuggestion[];
  metrics: QualityMetrics;
}

export interface QualityIssue {
  type:
    | 'grammar'
    | 'structure'
    | 'content'
    | 'tone'
    | 'length'
    | 'personalization';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location?: {
    paragraph: number;
    sentence: number;
  };
  suggestedFix?: string;
}

export interface QualitySuggestion {
  type: 'improvement' | 'enhancement' | 'optimization';
  category: 'content' | 'structure' | 'tone' | 'personalization';
  description: string;
  impact: 'low' | 'medium' | 'high';
  implementation: string;
}

export interface BatchGenerationRequest {
  requests: (
    | MotivationLetterGenerationRequest
    | FollowUpLetterGenerationRequest
  )[];
  priority: 'low' | 'medium' | 'high';
  maxConcurrency?: number;
}

export interface BatchGenerationResult {
  batchId: string;
  totalRequests: number;
  completedRequests: number;
  failedRequests: number;
  results: (MotivationLetter | FollowUpLetter)[];
  errors: BatchGenerationError[];
  processingTime: number; // in seconds
}

export interface BatchGenerationError {
  requestIndex: number;
  errorMessage: string;
  errorCode: string;
}

export interface AIModel {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  languages: string[];
  maxTokens: number;
  averageProcessingTime: number; // in seconds
  qualityScore: number; // 0-100
  costPerRequest: number;
  isActive: boolean;
}

export interface LetterPersonalizationService {
  // Personalization
  personalizeContent(
    content: string,
    context: PersonalizationContext
  ): Promise<string>;
  extractPersonalizationData(
    userId: string,
    jobOfferId?: string
  ): Promise<PersonalizationData>;

  // Context analysis
  analyzeJobOffer(jobOfferId: string): Promise<JobOfferAnalysis>;
  analyzeUserProfile(userId: string): Promise<UserProfileAnalysis>;

  // Matching
  calculateJobMatch(
    userId: string,
    jobOfferId: string
  ): Promise<JobMatchResult>;
}

export interface PersonalizationContext {
  user: {
    name: string;
    experience: string;
    skills: string[];
    achievements: string[];
  };
  job?: {
    title: string;
    company: string;
    requirements: string[];
    culture: string[];
  };
  application?: {
    appliedDate: Date;
    status: string;
    interactions: number;
  };
}

export interface PersonalizationData {
  userHighlights: string[];
  relevantExperiences: string[];
  matchingSkills: string[];
  uniqueSellingPoints: string[];
  culturalAlignment: string[];
  quantifiedAchievements: string[];
}

export interface JobOfferAnalysis {
  keyRequirements: string[];
  preferredSkills: string[];
  companyValues: string[];
  cultureKeywords: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
  competitionLevel: 'low' | 'medium' | 'high';
  urgencyIndicators: string[];
}

export interface UserProfileAnalysis {
  strengths: string[];
  experiences: string[];
  achievements: string[];
  skills: string[];
  careerProgression: string[];
  uniqueFactors: string[];
  improvementAreas: string[];
}

export interface JobMatchResult {
  overallMatch: number; // 0-100
  skillsMatch: number; // 0-100
  experienceMatch: number; // 0-100
  cultureMatch: number; // 0-100
  matchingElements: string[];
  missingElements: string[];
  recommendations: string[];
}
