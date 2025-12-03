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

  // User search and filtering
  findByIndustry(industry: string): Promise<User[]>;
  findByExperienceLevel(level: string): Promise<User[]>;
  findActiveUsers(): Promise<User[]>;

  // User statistics
  getUserCount(): Promise<number>;
  getUsersByRegistrationDate(startDate: Date, endDate: Date): Promise<User[]>;
  calculateProfileCompleteness(userId: string): Promise<number>;
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
  updatePreferences(
    userId: string,
    preferences: Partial<UserProfile['preferences']>
  ): Promise<UserProfile>;

  // User analytics
  getUserDashboardData(userId: string): Promise<UserDashboardData>;
  getUserProgress(userId: string): Promise<UserProgress>;
}

export interface RegisterUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  industry?: string;
  experienceLevel: string;
  targetPosition?: string;
}

export interface UserDashboardData {
  user: User;
  profile: UserProfile;
  stats: {
    lettersGenerated: number;
    applicationsSubmitted: number;
    interviewsScheduled: number;
    responseRate: number;
  };
  recentActivity: any[];
}

export interface UserProgress {
  profileCompleteness: number;
  skillsAssessed: number;
  certificationsEarned: number;
  averageLetterScore: number;
  improvementRate: number;
}
