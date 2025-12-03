import { User, UserProfile } from '../entities/User';

export interface UserRepository {
  // User CRUD operations
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;

  // User profile operations
  findProfileByUserId(userId: string): Promise<UserProfile | null>;
  createProfile(
    profileData: Omit<UserProfile, 'createdAt' | 'updatedAt'>
  ): Promise<UserProfile>;
  updateProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<UserProfile>;

  // Profile sections management
  addExperience(
    userId: string,
    experience: UserProfile['experiences'][0]
  ): Promise<UserProfile>;
  updateExperience(
    userId: string,
    experienceId: string,
    experience: Partial<UserProfile['experiences'][0]>
  ): Promise<UserProfile>;
  removeExperience(userId: string, experienceId: string): Promise<UserProfile>;

  addEducation(
    userId: string,
    education: UserProfile['education'][0]
  ): Promise<UserProfile>;
  updateEducation(
    userId: string,
    educationId: string,
    education: Partial<UserProfile['education'][0]>
  ): Promise<UserProfile>;
  removeEducation(userId: string, educationId: string): Promise<UserProfile>;

  addCertification(
    userId: string,
    certification: UserProfile['certifications'][0]
  ): Promise<UserProfile>;
  updateCertification(
    userId: string,
    certificationId: string,
    certification: Partial<UserProfile['certifications'][0]>
  ): Promise<UserProfile>;
  removeCertification(
    userId: string,
    certificationId: string
  ): Promise<UserProfile>;

  addProject(
    userId: string,
    project: UserProfile['projects'][0]
  ): Promise<UserProfile>;
  updateProject(
    userId: string,
    projectId: string,
    project: Partial<UserProfile['projects'][0]>
  ): Promise<UserProfile>;
  removeProject(userId: string, projectId: string): Promise<UserProfile>;

  // Skills management
  updateSkills(
    userId: string,
    skills: UserProfile['skills']
  ): Promise<UserProfile>;
  addTechnicalSkill(
    userId: string,
    skill: UserProfile['skills']['technical'][0]
  ): Promise<UserProfile>;
  updateTechnicalSkill(
    userId: string,
    skillName: string,
    skill: Partial<UserProfile['skills']['technical'][0]>
  ): Promise<UserProfile>;
  removeTechnicalSkill(userId: string, skillName: string): Promise<UserProfile>;

  // Languages management
  updateLanguages(
    userId: string,
    languages: UserProfile['languages']
  ): Promise<UserProfile>;
  addLanguage(
    userId: string,
    language: UserProfile['languages'][0]
  ): Promise<UserProfile>;
  updateLanguage(
    userId: string,
    languageName: string,
    language: Partial<UserProfile['languages'][0]>
  ): Promise<UserProfile>;
  removeLanguage(userId: string, languageName: string): Promise<UserProfile>;

  // User search and filtering
  findByIndustry(industry: string): Promise<User[]>;
  findByExperienceLevel(level: string): Promise<User[]>;
  findBySkills(skills: string[]): Promise<User[]>;
  findActiveUsers(): Promise<User[]>;

  // User statistics
  getUserCount(): Promise<number>;
  getUsersByRegistrationDate(startDate: Date, endDate: Date): Promise<User[]>;
  calculateProfileCompleteness(userId: string): Promise<number>;
  getUserAnalytics(userId: string): Promise<UserAnalytics>;
}

export interface UserService {
  // Authentication
  authenticate(email: string, password: string): Promise<User | null>;
  register(userData: RegisterUserData): Promise<User>;

  // Profile management
  completeProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<UserProfile>;
  importFromLinkedIn(userId: string, linkedInData: any): Promise<UserProfile>;
  importFromPDF(userId: string, pdfFile: Buffer): Promise<UserProfile>;

  // Profile analysis
  analyzeProfile(userId: string): Promise<ProfileAnalysis>;
  getProfileSuggestions(userId: string): Promise<ProfileSuggestion[]>;

  // User analytics
  getUserDashboardData(userId: string): Promise<UserDashboardData>;
  getUserProgress(userId: string): Promise<UserProgress>;
  getUserInsights(userId: string): Promise<UserInsight[]>;
}

export interface RegisterUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  industry?: string;
  experienceLevel: string;
  targetPosition?: string;
  linkedinUrl?: string;
}

export interface UserAnalytics {
  profileViews: number;
  resumeDownloads: number;
  resumeShares: number;
  applicationsSent: number;
  responsesReceived: number;
  interviewsScheduled: number;
  lastActivity: Date;
  engagementScore: number; // 0-100
  profileStrength: number; // 0-100
}

export interface UserDashboardData {
  user: User;
  profile: UserProfile;
  analytics: UserAnalytics;
  recentActivity: ActivityItem[];
  recommendations: DashboardRecommendation[];
  achievements: Achievement[];
}

export interface ActivityItem {
  id: string;
  type:
    | 'resume_created'
    | 'resume_updated'
    | 'resume_downloaded'
    | 'profile_updated'
    | 'application_sent';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface DashboardRecommendation {
  type: 'profile' | 'resume' | 'skills' | 'applications';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: string;
  estimatedImpact: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'profile' | 'resume' | 'skills' | 'applications' | 'engagement';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  unlockedAt: Date;
  progress?: number; // 0-100 for progressive achievements
}

export interface UserProgress {
  profileCompleteness: number; // 0-100
  skillsAssessed: number;
  resumesCreated: number;
  certificationsEarned: number;
  averageResumeScore: number;
  improvementRate: number; // percentage
  milestones: Milestone[];
  nextGoals: Goal[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achievedAt: Date;
  category: string;
  impact: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number; // 0-100
  category: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ProfileAnalysis {
  completeness: number; // 0-100
  strength: number; // 0-100
  marketability: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  missingElements: string[];
  recommendations: ProfileRecommendation[];
  competitorComparison: ProfileComparison;
}

export interface ProfileRecommendation {
  type: 'add' | 'improve' | 'remove' | 'reorder';
  section: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
}

export interface ProfileComparison {
  industryAverage: number;
  topPerformers: number;
  yourRanking: number;
  percentile: number;
  competitiveAdvantages: string[];
  improvementAreas: string[];
}

export interface ProfileSuggestion {
  type: 'skill' | 'experience' | 'education' | 'certification' | 'project';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  reasoning: string;
  marketValue: number; // 0-100
  difficulty: 'easy' | 'medium' | 'hard';
  timeToImplement: string;
}

export interface UserInsight {
  type: 'performance' | 'market' | 'skills' | 'career' | 'optimization';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  recommendations: string[];
  dataPoints: InsightDataPoint[];
}

export interface InsightDataPoint {
  metric: string;
  value: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  benchmark: number;
  interpretation: string;
}
