export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  currentPosition?: string;
  experienceLevel: 'Junior' | 'Intermédiaire' | 'Senior' | 'Expert';
  industry?: string;
  targetPosition?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  profileCompleteness: number; // 0-100
}

export interface UserProfile {
  userId: string;
  summary?: string;
  skills: string[];
  languages: UserLanguage[];
  certifications: UserCertification[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLanguage {
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Natif';
}

export interface UserCertification {
  name: string;
  issuer: string;
  year: number;
  credentialId?: string;
}

export interface UserPreferences {
  workMode: 'À distance' | 'Hybride' | 'Présentiel';
  formalityLevel: number; // 1-5
  preferredLanguage: string;
  notificationsEnabled: boolean;
}
