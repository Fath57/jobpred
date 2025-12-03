export interface FollowUpLetter {
  id: string;
  userId: string;
  applicationId: string;
  templateId: string;
  timingOptionId: string;
  subject: string;
  content: string;
  status:
    | 'draft'
    | 'generated'
    | 'scheduled'
    | 'sent'
    | 'responded'
    | 'archived';
  score: number; // 0-100
  wordCount: number;
  readingTime: number; // in minutes
  expectedResponseRate: number; // 0-100
  customizations: FollowUpLetterCustomizations;
  aiAnalysis: FollowUpLetterAnalysis;
  scheduledSendDate?: Date;
  sentAt?: Date;
  responseReceived?: boolean;
  responseDate?: Date;
  responseType?: 'positive' | 'negative' | 'neutral' | 'interview_scheduled';
  createdAt: Date;
  updatedAt: Date;
}

export interface FollowUpLetterCustomizations {
  objective:
    | 'status_update'
    | 'express_interest'
    | 'add_value'
    | 'schedule_meeting'
    | 'provide_references';
  insistenceLevel: number; // 1-5
  includeElements: string[];
  newInformation?: string;
  preferredChannel: 'email' | 'linkedin' | 'phone';
  scheduleSuggestion: boolean;
  includePortfolio: boolean;
  mentionReferral: boolean;
}

export interface FollowUpLetterAnalysis {
  strengths: string[];
  suggestions: string[];
  nextSteps: string[];
  timingScore: number; // 0-100
  contentRelevance: number; // 0-100
  professionalismScore: number; // 0-100
  urgencyLevel: 'low' | 'medium' | 'high';
  recommendedActions: string[];
}

export interface Application {
  id: string;
  userId: string;
  jobOfferId: string;
  motivationLetterId?: string;
  cvId?: string;
  status:
    | 'applied'
    | 'under_review'
    | 'interview_scheduled'
    | 'rejected'
    | 'accepted'
    | 'withdrawn';
  appliedDate: Date;
  followUpUrgency: 'low' | 'medium' | 'high' | 'critical';
  matchScore: number; // 0-100
  lastInteraction: ApplicationInteraction;
  interactions: ApplicationInteraction[];
  tags: string[];
  notes?: string;
  recruiterInfo?: RecruiterInfo;
  interviewDetails?: InterviewDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationInteraction {
  id: string;
  type:
    | 'application_sent'
    | 'follow_up_sent'
    | 'response_received'
    | 'interview_scheduled'
    | 'interview_completed'
    | 'rejection_received'
    | 'offer_received';
  date: Date;
  details?: string;
  channel?: 'email' | 'phone' | 'linkedin' | 'platform';
  initiatedBy: 'candidate' | 'company';
}

export interface RecruiterInfo {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  linkedinProfile?: string;
  company: string;
}

export interface InterviewDetails {
  type: 'phone' | 'video' | 'in_person' | 'panel';
  date: Date;
  duration?: number; // in minutes
  interviewer: string;
  interviewerRole?: string;
  platform?: string; // for video interviews
  location?: string; // for in-person interviews
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: string;
  nextSteps?: string;
}

export interface TimingOption {
  id: string;
  name: string;
  description: string;
  recommendedDelay: string;
  effectiveness: 'low' | 'medium' | 'high';
  responseRate: number; // 0-100
  bestFor: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FollowUpTemplate {
  id: string;
  name: string;
  type: 'polite' | 'assertive' | 'value-add' | 'creative';
  description: string;
  tone: string;
  length: string;
  effectiveness: number; // 0-100
  rating: number;
  usageCount: number;
  bestFor: string[];
  structure: string[];
  content: string; // Template content with placeholders
  placeholders: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
