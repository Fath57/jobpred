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
  profileCompleteness: number; // 0-100
}

export interface UserTestProfile {
  userId: string;
  skillLevels: UserSkillLevel[];
  testPreferences: TestPreferences;
  learningGoals: LearningGoal[];
  achievements: UserAchievement[];
  certifications: TestCertification[];
  progressTracking: ProgressTracking;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSkillLevel {
  skillCategory:
    | 'hard_skills'
    | 'soft_skills'
    | 'language_skills'
    | 'personality_traits';
  skillName: string;
  currentLevel: string;
  targetLevel: string;
  assessedAt: Date;
  confidence: number; // 0-100
  improvementRate: number; // percentage
  lastTestScore?: number;
}

export interface TestPreferences {
  preferredDifficulty:
    | 'Débutant'
    | 'Intermédiaire'
    | 'Avancé'
    | 'Expert'
    | 'Adaptatif';
  preferredDuration: 'Court' | 'Moyen' | 'Long' | 'Flexible';
  preferredFormat: string[];
  notificationsEnabled: boolean;
  reminderFrequency: 'Quotidien' | 'Hebdomadaire' | 'Mensuel' | 'Jamais';
  adaptiveLearning: boolean;
  immediateResults: boolean;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  category:
    | 'hard_skills'
    | 'soft_skills'
    | 'language_skills'
    | 'personality_development';
  targetDate: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number; // 0-100
  milestones: Milestone[];
  relatedTests: string[];
  status: 'active' | 'completed' | 'paused' | 'cancelled';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  completedAt?: Date;
  requirements: string[];
  reward?: string;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  category:
    | 'performance'
    | 'consistency'
    | 'improvement'
    | 'milestone'
    | 'certification';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  unlockedAt: Date;
  icon: string;
  points: number;
  requirements: string[];
}

export interface TestCertification {
  id: string;
  name: string;
  category:
    | 'hard_skills'
    | 'soft_skills'
    | 'language_skills'
    | 'personality_assessment';
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId: string;
  credentialUrl?: string;
  score: number;
  level: string;
  skills: string[];
  isVerified: boolean;
}

export interface ProgressTracking {
  totalTestsCompleted: number;
  totalTimeSpent: number; // in minutes
  averageScore: number;
  improvementRate: number; // percentage
  currentStreak: number; // days
  longestStreak: number; // days
  lastTestDate: Date;
  weeklyGoal: number; // tests per week
  monthlyGoal: number; // tests per month
  consistencyScore: number; // 0-100
}
