export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  currentPosition?: string;
  experienceLevel: 'Junior' | 'Intermédiaire' | 'Senior' | 'Expert';
  industry?: string;
  targetPosition?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  onboardingStatus: OnboardingStatus;
  onboardingProgress: number; // 0-100
}

export interface OnboardingStatus {
  isCompleted: boolean;
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  skippedSteps: string[];
  startedAt: Date;
  completedAt?: Date;
  lastActiveAt: Date;
  timeSpent: number; // in seconds
}

export interface OnboardingProfile {
  userId: string;
  personalInfo: OnboardingPersonalInfo;
  professionalInfo: OnboardingProfessionalInfo;
  preferences: OnboardingPreferences;
  goals: OnboardingGoal[];
  assessments: OnboardingAssessment[];
  uploads: OnboardingUpload[];
  customizations: OnboardingCustomization[];
  analytics: OnboardingAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingPersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  location: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  dateOfBirth?: Date;
  nationality?: string;
  profilePhoto?: string;
  bio?: string;
  interests: string[];
  languages: OnboardingLanguage[];
}

export interface OnboardingLanguage {
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Natif';
  certified: boolean;
  certificationName?: string;
}

export interface OnboardingProfessionalInfo {
  currentPosition?: string;
  currentCompany?: string;
  experienceLevel: 'Junior' | 'Intermédiaire' | 'Senior' | 'Expert';
  industry: string;
  targetPosition: string;
  targetIndustry?: string;
  targetSalaryRange?: SalaryRange;
  workMode: 'À distance' | 'Hybride' | 'Présentiel';
  availability: AvailabilityInfo;
  skills: OnboardingSkill[];
  experiences: OnboardingExperience[];
  education: OnboardingEducation[];
  certifications: OnboardingCertification[];
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  negotiable: boolean;
}

export interface AvailabilityInfo {
  startDate: Date;
  noticePeriod: string;
  flexibility: 'Immédiat' | 'Flexible' | 'Spécifique';
  constraints: string[];
}

export interface OnboardingSkill {
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool' | 'framework';
  level: number; // 1-100
  yearsOfExperience?: number;
  certified: boolean;
  priority: 'high' | 'medium' | 'low';
  wantToImprove: boolean;
}

export interface OnboardingExperience {
  position: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  industry: string;
  teamSize?: number;
  budget?: string;
}

export interface OnboardingEducation {
  degree: string;
  field: string;
  institution: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  grade?: string;
  description?: string;
  relevantCoursework: string[];
}

export interface OnboardingCertification {
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  isRelevant: boolean;
}

export interface OnboardingPreferences {
  communicationStyle: 'Direct' | 'Diplomatique' | 'Analytique' | 'Expressif';
  learningStyle: 'Visuel' | 'Auditif' | 'Kinesthésique' | 'Lecture/Écriture';
  workStyle: 'Collaboratif' | 'Indépendant' | 'Hybride';
  feedbackPreference: 'Immédiat' | 'Régulier' | 'Sur demande';
  motivationFactors: string[];
  stressManagement: string[];
  careerPriorities: CareerPriority[];
  personalityTraits: PersonalityTrait[];
}

export interface CareerPriority {
  priority: string;
  importance: number; // 1-10
  description?: string;
}

export interface PersonalityTrait {
  trait: string;
  strength: number; // 1-10
  category:
    | 'leadership'
    | 'communication'
    | 'analytical'
    | 'creative'
    | 'social';
}

export interface OnboardingGoal {
  id: string;
  type:
    | 'career_change'
    | 'promotion'
    | 'skill_development'
    | 'salary_increase'
    | 'work_life_balance'
    | 'industry_switch';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
  specificTargets: string[];
  successMetrics: string[];
  currentStatus: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  progress: number; // 0-100
  milestones: GoalMilestone[];
  resources: GoalResource[];
}

export interface GoalMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  completedAt?: Date;
  requirements: string[];
}

export interface GoalResource {
  type: 'course' | 'book' | 'mentor' | 'certification' | 'project' | 'network';
  name: string;
  description: string;
  url?: string;
  cost?: string;
  duration?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface OnboardingAssessment {
  id: string;
  type: 'personality' | 'skills' | 'values' | 'interests' | 'aptitude';
  name: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  results?: AssessmentResult;
  completedAt?: Date;
  timeSpent?: number; // in seconds
  isRequired: boolean;
  order: number;
}

export interface AssessmentResult {
  overallScore?: number;
  categoryScores: CategoryScore[];
  insights: string[];
  recommendations: string[];
  strengths: string[];
  developmentAreas: string[];
  personalityType?: string;
  careerMatches: CareerMatch[];
}

export interface CategoryScore {
  category: string;
  score: number;
  level: string;
  description: string;
}

export interface CareerMatch {
  position: string;
  matchPercentage: number;
  reasons: string[];
  requirements: string[];
  salaryRange?: SalaryRange;
  growthPotential: string;
}

export interface OnboardingUpload {
  id: string;
  type:
    | 'cv'
    | 'cover_letter'
    | 'portfolio'
    | 'certificate'
    | 'photo'
    | 'document';
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  status: 'uploaded' | 'processing' | 'processed' | 'failed';
  analysis?: FileAnalysis;
  uploadedAt: Date;
  processedAt?: Date;
  isPublic: boolean;
  tags: string[];
}

export interface FileAnalysis {
  extractedText?: string;
  detectedLanguage?: string;
  keywordsFound: string[];
  skillsDetected: string[];
  experienceYears?: number;
  educationLevel?: string;
  qualityScore: number; // 0-100
  suggestions: string[];
  errors: string[];
}

export interface OnboardingCustomization {
  id: string;
  type: 'theme' | 'layout' | 'content' | 'workflow' | 'notifications';
  name: string;
  value: any;
  isDefault: boolean;
  appliedAt: Date;
}

export interface OnboardingAnalytics {
  totalTimeSpent: number; // in seconds
  sessionsCount: number;
  averageSessionDuration: number; // in seconds
  completionRate: number; // 0-100
  dropoffPoints: DropoffPoint[];
  engagementScore: number; // 0-100
  satisfactionScore?: number; // 1-5
  npsScore?: number; // -100 to 100
  feedbackProvided: boolean;
  lastActivity: Date;
  deviceInfo: DeviceInfo[];
  referralSource?: string;
}

export interface DropoffPoint {
  step: string;
  stepNumber: number;
  dropoffRate: number; // 0-100
  commonReasons: string[];
  timeSpentBeforeDropoff: number; // in seconds
}

export interface DeviceInfo {
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  screenResolution: string;
  sessionDuration: number; // in seconds
  timestamp: Date;
}

export interface OnboardingFeedback {
  id: string;
  userId: string;
  step?: string;
  rating: number; // 1-5
  feedback: string;
  category: 'usability' | 'content' | 'technical' | 'suggestion' | 'complaint';
  isAnonymous: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
  actionTaken?: string;
  resolvedAt?: Date;
  createdAt: Date;
}

export interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  targetAudience: string[];
  steps: OnboardingStep[];
  estimatedDuration: number; // in minutes
  completionRate: number; // 0-100
  satisfactionScore: number; // 1-5
  isActive: boolean;
  isDefault: boolean;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingStep {
  id: string;
  name: string;
  title: string;
  description: string;
  type: 'form' | 'assessment' | 'upload' | 'tutorial' | 'confirmation';
  order: number;
  isRequired: boolean;
  isSkippable: boolean;
  estimatedTime: number; // in minutes
  components: StepComponent[];
  validationRules: ValidationRule[];
  nextStepConditions: NextStepCondition[];
  helpContent?: HelpContent;
}

export interface StepComponent {
  id: string;
  type:
    | 'input'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'upload'
    | 'slider'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'custom';
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  isRequired: boolean;
  options?: ComponentOption[];
  validation?: ComponentValidation;
  defaultValue?: any;
  order: number;
}

export interface ComponentOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface ComponentValidation {
  type:
    | 'required'
    | 'email'
    | 'phone'
    | 'url'
    | 'min_length'
    | 'max_length'
    | 'pattern'
    | 'custom';
  value?: any;
  message: string;
}

export interface ValidationRule {
  field: string;
  rule:
    | 'required'
    | 'email'
    | 'phone'
    | 'url'
    | 'min_length'
    | 'max_length'
    | 'pattern'
    | 'custom';
  value?: any;
  message: string;
  condition?: string; // JavaScript expression
}

export interface NextStepCondition {
  condition: string; // JavaScript expression
  nextStepId: string;
  action?: 'skip' | 'redirect' | 'complete';
}

export interface HelpContent {
  title: string;
  content: string;
  videoUrl?: string;
  links: HelpLink[];
  faqs: FAQ[];
}

export interface HelpLink {
  title: string;
  url: string;
  type: 'internal' | 'external';
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
