export interface MotivationLetter {
  id: string;
  userId: string;
  jobOfferId?: string;
  templateId: string;
  toneId: string;
  title: string;
  content: string;
  subject?: string;
  status: 'draft' | 'generated' | 'reviewed' | 'sent' | 'archived';
  score: number; // 0-100
  wordCount: number;
  readingTime: number; // in minutes
  language: string;
  customizations: MotivationLetterCustomizations;
  aiAnalysis: MotivationLetterAnalysis;
  version: number;
  parentLetterId?: string; // for versioning
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  responseReceived?: boolean;
  responseDate?: Date;
}

export interface MotivationLetterCustomizations {
  formalityLevel: number; // 1-5
  length: 'short' | 'medium' | 'long';
  keyPoints: string[];
  additionalInfo?: string;
  includePortfolio: boolean;
  includeSalaryExpectations: boolean;
  targetAudience?: string;
}

export interface MotivationLetterAnalysis {
  strengths: string[];
  suggestions: string[];
  keywordMatch: number; // 0-100
  readabilityScore: number; // 0-100
  toneConsistency: number; // 0-100
  structureScore: number; // 0-100
  personalizedElements: string[];
  improvementAreas: string[];
  competitorComparison?: {
    averageScore: number;
    percentile: number;
  };
}

export interface MotivationLetterTemplate {
  id: string;
  name: string;
  category: 'Professional' | 'Creative' | 'Modern' | 'Academic';
  description: string;
  structure: string;
  length: string;
  bestFor: string[];
  rating: number;
  usageCount: number;
  content: string; // Template content with placeholders
  placeholders: string[]; // List of available placeholders
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MotivationLetterTone {
  id: string;
  name: string;
  description: string;
  intensity: 'Faible' | 'Modéré' | 'Élevé';
  bestFor: string[];
  characteristics: string[];
  examples: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
