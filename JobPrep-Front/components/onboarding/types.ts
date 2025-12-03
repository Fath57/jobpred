'use client';

// Enums alignés avec le backend
export enum ExperienceLevel {
  JUNIOR = 'JUNIOR',
  INTERMEDIATE = 'INTERMEDIATE', 
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT'
}

export enum WorkMode {
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
  IN_PERSON = 'IN_PERSON'
}

export enum FormalityLevel {
  DECONTRACTE = 'DECONTRACTE',
  PROFESSIONAL = 'PROFESSIONAL', 
  FORMEL = 'FORMEL'
}

// Types pour l'affichage frontend
export interface ExperienceLevelOption {
  value: ExperienceLevel;
  label: string;
  description: string;
}

export interface WorkModeOption {
  value: WorkMode;
  label: string;
  description: string;
}

export interface FormalityLevelOption {
  value: FormalityLevel;
  label: string;
  description: string;
}

export interface OnboardingFormData {
  // Étape 1 — Infos perso
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  password: string; // Ajouté pour l'inscription
  // Étape 3 — Infos pro (alignés avec backend)
  experience: ExperienceLevel;
  workMode: WorkMode;
  desiredPosition: string;
  // Étape 4 — CV
  cvFile: File | null;
  // Étape 5 — Description de poste
  jobDescription: string;
  // Niveau de formalité (aligné avec backend)
  formalityLevel: FormalityLevel;
}

export const initialFormData: OnboardingFormData = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  location: '',
  password: '', // Ajouté
  experience: ExperienceLevel.JUNIOR,
  workMode: WorkMode.HYBRID,
  desiredPosition: '',
  cvFile: null,
  jobDescription: '',
  formalityLevel: FormalityLevel.PROFESSIONAL,
};

export const TOTAL_STEPS = 4 as const;

// Options pour les sélecteurs
export const EXPERIENCE_LEVEL_OPTIONS: ExperienceLevelOption[] = [
  {
    value: ExperienceLevel.JUNIOR,
    label: 'Junior',
    description: '0-2 ans d\'expérience'
  },
  {
    value: ExperienceLevel.INTERMEDIATE,
    label: 'Intermédiaire', 
    description: '2-5 ans d\'expérience'
  },
  {
    value: ExperienceLevel.SENIOR,
    label: 'Senior',
    description: '5-10 ans d\'expérience'
  },
  {
    value: ExperienceLevel.EXPERT,
    label: 'Expert',
    description: '10+ ans d\'expérience'
  }
];

export const WORK_MODE_OPTIONS: WorkModeOption[] = [
  {
    value: WorkMode.REMOTE,
    label: 'À distance',
    description: 'Télétravail complet'
  },
  {
    value: WorkMode.HYBRID,
    label: 'Hybride',
    description: 'Mix présentiel/télétravail'
  },
  {
    value: WorkMode.IN_PERSON,
    label: 'Présentiel',
    description: 'Travail sur site'
  }
];

export const FORMALITY_LEVEL_OPTIONS: FormalityLevelOption[] = [
  {
    value: FormalityLevel.DECONTRACTE,
    label: 'Décontracté',
    description: 'Ton informel et amical'
  },
  {
    value: FormalityLevel.PROFESSIONAL,
    label: 'Professionnel',
    description: 'Ton équilibré et professionnel'
  },
  {
    value: FormalityLevel.FORMEL,
    label: 'Formel',
    description: 'Ton formel et structuré'
  }
];

// Fonctions de mapping pour gérer fullName ↔ firstName + lastName
export const parseFullName = (fullName: string): { firstName: string; lastName: string } => {
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  return { firstName, lastName };
};

export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

// Fonction pour mapper les données frontend vers le format backend
export const mapToBackendFormat = (formData: OnboardingFormData) => {
  const { firstName, lastName } = parseFullName(formData.fullName);
  
  return {
    // Pour l'étape 1 (Personal Info)
    step1: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      linkedin: formData.linkedin,
      location: formData.location,
    },
    // Pour l'étape 3 (Professional Info) 
    step3: {
      desiredPosition: formData.desiredPosition,
      experience: formData.experience,
      workMode: formData.workMode,
    },
    // Pour l'étape 5 (Job Description)
    step5: {
      jobDescription: formData.jobDescription,
      formalityLevel: formData.formalityLevel,
    },
    // Données pour l'authentification
    auth: {
      firstName,
      lastName,
      email: formData.email,
      password: formData.password, // Ajouté
    }
  };
};