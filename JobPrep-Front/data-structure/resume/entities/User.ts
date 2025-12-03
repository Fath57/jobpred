export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  portfolioUrl?: string;
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
  personalInfo: PersonalInfo;
  professionalSummary?: string;
  experiences: Experience[];
  education: Education[];
  skills: Skills;
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  awards: Award[];
  publications: Publication[];
  volunteerWork: VolunteerWork[];
  interests: string[];
  references: Reference[];
  customSections: CustomSection[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  portfolioUrl?: string;
  profilePhoto?: string;
  dateOfBirth?: Date;
  nationality?: string;
  drivingLicense?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  employmentType:
    | 'CDI'
    | 'CDD'
    | 'Freelance'
    | 'Stage'
    | 'Alternance'
    | 'Bénévolat';
  description: string;
  achievements: string[];
  technologies: string[];
  skills: string[];
  teamSize?: number;
  budget?: string;
  industry?: string;
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  grade?: string;
  gpa?: number;
  description?: string;
  relevantCoursework: string[];
  honors: string[];
  activities: string[];
  order: number;
}

export interface Skills {
  technical: TechnicalSkill[];
  soft: SoftSkill[];
  tools: Tool[];
  frameworks: Framework[];
  languages: ProgrammingLanguage[];
}

export interface TechnicalSkill {
  name: string;
  level: number; // 1-100
  category: string;
  yearsOfExperience?: number;
  lastUsed?: Date;
  certifications: string[];
}

export interface SoftSkill {
  name: string;
  level: number; // 1-100
  examples: string[];
  endorsements: number;
}

export interface Tool {
  name: string;
  level: number; // 1-100
  category: string;
  version?: string;
}

export interface Framework {
  name: string;
  level: number; // 1-100
  category: string;
  projects: string[];
}

export interface ProgrammingLanguage {
  name: string;
  level: number; // 1-100
  yearsOfExperience: number;
  projects: string[];
}

export interface Language {
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Natif';
  certifications: string[];
  spokenLevel?: string;
  writtenLevel?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  skills: string[];
  order: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  url?: string;
  repositoryUrl?: string;
  technologies: string[];
  achievements: string[];
  teamSize?: number;
  budget?: string;
  client?: string;
  industry?: string;
  order: number;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: Date;
  description?: string;
  url?: string;
  order: number;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  publishDate: Date;
  url?: string;
  description?: string;
  coAuthors: string[];
  order: number;
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  order: number;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
  yearsKnown: number;
  order: number;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list' | 'table';
  order: number;
}
