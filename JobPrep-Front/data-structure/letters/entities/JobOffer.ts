export interface JobOffer {
  id: string;
  title: string;
  company: string;
  companyId?: string;
  location: string;
  type: 'CDI' | 'CDD' | 'Freelance' | 'Stage' | 'Alternance';
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: 'Junior' | 'Intermédiaire' | 'Senior' | 'Expert';
  industry: string;
  companySize: string;
  workMode: 'À distance' | 'Hybride' | 'Présentiel';
  postedDate: Date;
  expiryDate?: Date;
  isActive: boolean;
  sourceUrl?: string;
  internalJobId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  description?: string;
  culture: string[];
  values: string[];
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}
