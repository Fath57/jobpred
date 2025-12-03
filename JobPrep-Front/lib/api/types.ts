// Types pour les réponses API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Types pour l'authentification
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  currentPosition?: string;
  experienceLevel: 'JUNIOR' | 'INTERMEDIATE' | 'SENIOR' | 'EXPERT';
  industry?: string;
  targetPosition?: string;
  onboardingStep: number; 
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  linkedin?: string;
 
}

// Types pour les lettres
export interface MotivationLetter {
  id: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface FollowUpLetter {
  id: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  interviewDate?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les CV
export interface Resume {
  id: string;
  userId: string;
  content: string;
  analysis?: ResumeAnalysis;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeAnalysis {
  id: string;
  resumeId: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  createdAt: string;
}

// Types pour les tests
export interface Test {
  id: string;
  userId: string;
  type: 'hard-skills' | 'soft-skills' | 'language' | 'personality' | 'hr-prep';
  questions: TestQuestion[];
  answers: TestAnswer[];
  score?: number;
  completedAt?: string;
  createdAt: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'rating';
  options?: string[];
  required: boolean;
}

export interface TestAnswer {
  questionId: string;
  answer: string | number;
}

// Types pour les simulations vocales
export interface SpeechSession {
  id: string;
  userId: string;
  type: 'interview' | 'presentation' | 'language';
  audioUrl?: string;
  transcript?: string;
  feedback?: SpeechFeedback;
  createdAt: string;
}

export interface SpeechFeedback {
  id: string;
  sessionId: string;
  pronunciation: number;
  fluency: number;
  confidence: number;
  suggestions: string[];
  createdAt: string;
}

// Types génériques pour les requêtes
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// --- Types Onboarding ---

// Enums alignés avec le backend Prisma et les composants frontend
export type ExperienceLevel = 'JUNIOR' | 'INTERMEDIATE' | 'SENIOR' | 'EXPERT';
export type WorkMode = 'REMOTE' | 'HYBRID' | 'IN_PERSON';
export type FormalityLevel = 'DECONTRACTE' | 'PROFESSIONAL' | 'FORMEL';

// Statuts d'onboarding
export type OnboardingStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

// Nom symbolique des étapes (côté réponses, ex. currentStep) - Côté backend : OnboardingStep enum
export type OnboardingStepName =
  | 'PERSONAL_INFO'
  | 'WE_KNOW_YOU'
  | 'PROFESSIONAL_INFO'
  | 'CV_UPLOAD'
  | 'JOB_DESCRIPTION'
  | 'COMPLETED';

// Démarrage / inscription simplifiée durant l’onboarding
export interface StartOnboardingDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  linkedin?: string;
  location?: string;
  experience?: ExperienceLevel;
  workMode?: WorkMode;
}

// Étape 1 - Version avec userId (pour les requêtes)
export interface Step1PersonalInfoRequestDto {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  location: string;
}

// Étape 1 - Version sans userId (pour les réponses du backend)
export interface Step1PersonalInfoDto {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  location: string;
}

// Génération “We know you” (prompt)
export interface GenerateWeKnowYouDto {
  fullName: string;
  desiredPosition: string;
  location?: string;
  linkedin?: string;
  additionalContext?: string;
}

// Réponse de la génération/recherche approfondie
export interface DeepResearchResponseDto {
  message: string;
  aiProfileDescription: string;
  research: string;
  sources: string[];
  confidence: number; // 0..100
  currentStep: OnboardingStepName; // ex: 'WE_KNOW_YOU'
}

// Étape 2 (soumission)
export interface Step2WeKnowYouDto {
  aiProfileDescription: string;
  customizedProfileDescription?: string;
}

// Étape 3 - Version avec userId (pour les requêtes)
export interface Step3ProfessionalInfoRequestDto {
  userId: string;
  desiredPosition: string;
  experience: ExperienceLevel;
  workMode: WorkMode;
}

// Étape 3 - Version sans userId (pour les réponses du backend)
export interface Step3ProfessionalInfoDto {
  desiredPosition: string;
  experience: ExperienceLevel;
  workMode: WorkMode;
}

// Étape 4 (résultat d’upload CV)
export interface Step4CvUploadDto {
  cvFilePath?: string;
  cvFileName?: string;
  cvFileSize?: number;
}

// Étape générique (utilisée pour POST /step/4 et autres variantes si besoin)
export interface OnboardingStepDto {
  userId: string;
  step: number;
  data: Record<string, any>;
  notes?: string;
}

// Étape 5 - Version avec userId (pour les requêtes)
export interface Step5JobDescriptionRequestDto {
  jobDescription: string;
  formalityLevel: FormalityLevel;
}

// Étape 5 - Version avec userId (pour les réponses du backend)
export interface Step5JobDescriptionDto {
  userId: string;
  jobDescription: string;
  formalityLevel: FormalityLevel;
}

// Progression globale
export interface OnboardingProgress {
  userId?: string;
  currentStep?: number; // 1..5 (6 = terminé)
  completed?: boolean;
  meta?: Record<string, any>;
}

// === ENTITÉS BACKEND ===

// Session d'onboarding
export interface OnboardingSession {
  id: string;
  userId: string;
  currentStep: OnboardingStepName;
  status: OnboardingStatus;
  completedSteps: OnboardingStepName[];
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// Profil candidat
export interface Candidate {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  location?: string;
  aiProfileDescription: string;
  customizedProfileDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// Préférences de poste du candidat
export interface CandidateJobPreference {
  id: string;
  candidateId: string;
  name?: string; // Nom généré par IA pour identifier la candidature
  desiredPosition: string;
  jobDescription?: string;
  experience?: ExperienceLevel;
  workMode?: WorkMode;
  formalityLevel?: FormalityLevel;
  isActive: boolean; // Indique si c'est la candidature active
  cvId?: string;
  cv?: AppFile;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Fichier d'application
export interface AppFile {
  id: string;
  userId: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  type: 'CV' | 'COVER_LETTER' | 'OTHER';
  createdAt: Date;
  updatedAt: Date;
}

// === RÉPONSES API SPÉCIFIQUES ===

// Réponse de démarrage d'onboarding
export interface StartOnboardingResponse {
  message: string;
  userId: string;
  sessionId: string;
  currentStep: OnboardingStepName;
  steps: OnboardingStepName[];
}

// Réponse de progression
export interface OnboardingProgressResponse {
  userId: string;
  currentStep: number;
  completed: boolean;
  completedSteps: OnboardingStepName[];
  session: OnboardingSession;
  candidate?: Candidate;
  jobPreference?: CandidateJobPreference;
}

// Types pour le pricing
export interface Option {
  id: string;
  name: string;
  description: string;
  amount: number;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PackOption {
  id: string;
  packId: string;
  optionId: string;
  quantity: number;
  option: Option;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  amount: number;
  code: string;
  isActive: boolean;
  packOptions: PackOption[];
  createdAt: string;
  updatedAt: string;
}

// DTOs pour les requêtes pricing
export interface CreateOptionDto {
  name: string;
  description: string;
  amount: number;
  code: string;
}

export interface UpdateOptionDto {
  name?: string;
  description?: string;
  amount?: number;
  code?: string;
  isActive?: boolean;
}

export interface CreatePackDto {
  name: string;
  description: string;
  amount: number;
  code: string;
  options: Array<{
    optionId: string;
    quantity: number;
  }>;
}

export interface UpdatePackDto {
  name?: string;
  description?: string;
  amount?: number;
  code?: string;
  isActive?: boolean;
  options?: Array<{
    optionId: string;
    quantity: number;
  }>;
}

export interface AddOptionToPackDto {
  quantity: number;
}

// === MULTIPLE APPLICATIONS (Nouvelles APIs) ===

// DTO pour créer une nouvelle candidature
export interface CreateApplicationDto {
  desiredPosition: string;
  experience: ExperienceLevel;
  workMode: WorkMode;
}

// DTO pour mettre à jour la description du poste d'une candidature
export interface UpdateApplicationJobDescriptionDto {
  jobDescription: string;
  formalityLevel?: FormalityLevel;
}

// Réponse de création de candidature
export interface CreateApplicationResponse {
  message: string;
  jobPreference: CandidateJobPreference;
}

// Réponse d'upload de CV pour une candidature
export interface UploadCvForApplicationResponse {
  message: string;
  fileName: string;
  path: string;
  jobPreferenceId: string;
}

// Réponse de mise à jour de description de poste
export interface UpdateApplicationJobDescriptionResponse {
  message: string;
  jobPreference: CandidateJobPreference;
}

// Réponse de liste des candidatures
export interface ListApplicationsResponse {
  applications: CandidateJobPreference[];
  activeApplication?: CandidateJobPreference;
}

// Réponse d'activation de candidature
export interface ActivateApplicationResponse {
  message: string;
  jobPreference: CandidateJobPreference;
}
