export interface Template {
  id: string;
  name: string;
  category: 'Modern' | 'Classic' | 'Creative';
  description: string;
  rating: number;
  downloads: number;
  preview: string;
}

export interface Style {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  mood: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
  summary: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  grade?: string;
  description?: string;
}

export interface TechnicalSkill {
  name: string;
  level: number;
}

export interface Skills {
  technical: TechnicalSkill[];
  soft: string[];
}

export interface Language {
  language: string;
  level: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface UserProfile {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  languages: Language[];
  certifications: Certification[];
  projects?: any[];
  awards?: any[];
}

export interface CustomizationOptions {
  sections: {
    id: string;
    name: string;
    enabled: boolean;
  }[];
  layout: string;
  spacing: number;
  photo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Stats {
  atsScore: number;
  readability: string;
  length: string;
  keywords: string;
}

export const resumeConfectionData = {
  templates: [
    {
      id: 'modern-1',
      name: 'Executive Pro',
      category: 'Modern' as const,
      description:
        'Template moderne et épuré, parfait pour les postes de direction',
      rating: 5,
      downloads: 45,
      preview: '/templates/modern-1.jpg',
    },
    {
      id: 'modern-2',
      name: 'Tech Innovator',
      category: 'Modern' as const,
      description:
        'Design contemporain idéal pour les profils tech et innovation',
      rating: 5,
      downloads: 38,
      preview: '/templates/modern-2.jpg',
    },
    {
      id: 'classic-1',
      name: 'Professional Classic',
      category: 'Classic' as const,
      description: 'Template classique et intemporel pour tous secteurs',
      rating: 4,
      downloads: 52,
      preview: '/templates/classic-1.jpg',
    },
    {
      id: 'classic-2',
      name: 'Corporate Elite',
      category: 'Classic' as const,
      description: 'Style corporate traditionnel pour les grandes entreprises',
      rating: 4,
      downloads: 41,
      preview: '/templates/classic-2.jpg',
    },
    {
      id: 'creative-1',
      name: 'Creative Spark',
      category: 'Creative' as const,
      description: 'Template créatif pour les métiers artistiques et marketing',
      rating: 5,
      downloads: 29,
      preview: '/templates/creative-1.jpg',
    },
    {
      id: 'creative-2',
      name: 'Design Master',
      category: 'Creative' as const,
      description: 'Design audacieux pour les profils créatifs et designers',
      rating: 4,
      downloads: 33,
      preview: '/templates/creative-2.jpg',
    },
  ],

  styles: [
    {
      id: 'professional-blue',
      name: 'Bleu Professionnel',
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#3b82f6',
      mood: 'Confiance et professionnalisme',
    },
    {
      id: 'elegant-purple',
      name: 'Violet Élégant',
      primaryColor: '#7c3aed',
      secondaryColor: '#6d28d9',
      accentColor: '#8b5cf6',
      mood: 'Créativité et innovation',
    },
    {
      id: 'modern-teal',
      name: 'Turquoise Moderne',
      primaryColor: '#0d9488',
      secondaryColor: '#0f766e',
      accentColor: '#14b8a6',
      mood: 'Modernité et fraîcheur',
    },
    {
      id: 'warm-orange',
      name: 'Orange Chaleureux',
      primaryColor: '#ea580c',
      secondaryColor: '#dc2626',
      accentColor: '#f97316',
      mood: 'Énergie et dynamisme',
    },
    {
      id: 'sophisticated-gray',
      name: 'Gris Sophistiqué',
      primaryColor: '#374151',
      secondaryColor: '#1f2937',
      accentColor: '#6b7280',
      mood: 'Élégance et sobriété',
    },
    {
      id: 'nature-green',
      name: 'Vert Nature',
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      mood: 'Équilibre et croissance',
    },
  ],

  userProfile: {
    personalInfo: {
      fullName: 'Jean René Roustand',
      title: 'Directeur de Projet IT Senior',
      email: 'jean.rene@example.com',
      phone: '+33 7 81 65 59 92',
      location: 'Villejuif, France',
      linkedin: 'linkedin.com/in/jeanrene',
      website: 'jeanrene-portfolio.com',
      summary:
        "Directeur de projet IT expérimenté avec plus de 15 ans d'expertise dans la transformation digitale et la gestion d'équipes multiculturelles. Spécialisé dans l'implémentation de solutions technologiques innovantes et la conduite du changement organisationnel.",
    },
    experience: [
      {
        position: 'Directeur de Projet IT Senior',
        company: 'TechCorp Solutions',
        period: '2020 - Présent',
        location: 'Paris, France',
        description:
          "Direction de projets de transformation digitale d'envergure avec des budgets de 2-5M€. Management d'équipes de 15-25 personnes.",
        achievements: [
          "Réduction des coûts opérationnels de 30% via l'automatisation",
          'Livraison de 12 projets majeurs dans les délais et budgets',
          "Mise en place d'une méthodologie Agile à l'échelle",
        ],
      },
      {
        position: 'Chef de Projet IT',
        company: 'Digital Innovations',
        period: '2017 - 2020',
        location: 'Lyon, France',
        description:
          "Gestion de projets de développement logiciel et d'intégration système pour des clients grands comptes.",
        achievements: [
          'Augmentation de la satisfaction client de 25%',
          "Certification ISO 27001 de l'équipe projet",
          'Formation de 50+ collaborateurs aux méthodologies Agile',
        ],
      },
      {
        position: 'Consultant IT Senior',
        company: 'Accenture',
        period: '2014 - 2017',
        location: 'Paris, France',
        description:
          'Conseil en stratégie IT et accompagnement de la transformation digitale pour des entreprises du CAC 40.',
        achievements: [
          'Conduite de 8 missions de conseil stratégique',
          "Développement d'un framework de gouvernance IT",
          'Encadrement de consultants junior',
        ],
      },
    ],
    education: [
      {
        degree: "Master en Management des Systèmes d'Information",
        school: 'École Centrale Paris',
        year: '2014',
        grade: 'Mention Très Bien',
        description:
          "Spécialisation en architecture des systèmes d'information et gouvernance IT",
      },
      {
        degree: 'Ingénieur en Informatique',
        school: 'INSA Lyon',
        year: '2012',
        grade: 'Mention Bien',
        description:
          'Formation généraliste en informatique avec spécialisation en génie logiciel',
      },
    ],
    skills: {
      technical: [
        { name: 'Gestion de Projet', level: 95 },
        { name: 'Méthodologies Agile/Scrum', level: 90 },
        { name: 'Architecture IT', level: 85 },
        { name: 'Cloud Computing (AWS/Azure)', level: 80 },
        { name: 'DevOps/CI-CD', level: 75 },
        { name: 'Data Analytics', level: 70 },
        { name: 'Cybersécurité', level: 75 },
        { name: 'Intelligence Artificielle', level: 65 },
      ],
      soft: [
        'Leadership',
        'Communication',
        'Négociation',
        'Résolution de problèmes',
        'Pensée stratégique',
        'Gestion du changement',
        'Travail en équipe',
        'Adaptabilité',
      ],
    },
    languages: [
      { language: 'Français', level: 'Natif' },
      { language: 'Anglais', level: 'Courant (C1)' },
      { language: 'Espagnol', level: 'Intermédiaire (B2)' },
      { language: 'Allemand', level: 'Débutant (A2)' },
    ],
    certifications: [
      {
        name: 'Project Management Professional (PMP)',
        issuer: 'PMI',
        year: '2019',
        credentialId: 'PMP-2019-JR-001',
      },
      {
        name: 'Certified ScrumMaster (CSM)',
        issuer: 'Scrum Alliance',
        year: '2018',
        credentialId: 'CSM-2018-JR-002',
      },
      {
        name: 'ITIL Foundation v4',
        issuer: 'AXELOS',
        year: '2020',
        credentialId: 'ITIL-2020-JR-003',
      },
      {
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        year: '2021',
        credentialId: 'AWS-2021-JR-004',
      },
      {
        name: 'Certified Information Security Manager (CISM)',
        issuer: 'ISACA',
        year: '2022',
        credentialId: 'CISM-2022-JR-005',
      },
    ],
  },

  customizationOptions: {
    sections: [
      { id: 'personal', name: 'Informations personnelles', enabled: true },
      { id: 'summary', name: 'Résumé professionnel', enabled: true },
      { id: 'experience', name: 'Expérience professionnelle', enabled: true },
      { id: 'education', name: 'Formation', enabled: true },
      { id: 'skills', name: 'Compétences', enabled: true },
      { id: 'certifications', name: 'Certifications', enabled: true },
      { id: 'languages', name: 'Langues', enabled: true },
      { id: 'projects', name: 'Projets', enabled: false },
      { id: 'awards', name: 'Récompenses', enabled: false },
      { id: 'publications', name: 'Publications', enabled: false },
      { id: 'volunteer', name: 'Bénévolat', enabled: false },
      { id: 'interests', name: "Centres d'intérêt", enabled: false },
    ],
    layout: 'two-column',
    spacing: 12,
    photo: 'circle',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
    },
  },

  stats: {
    atsScore: 92,
    readability: 'Excellente',
    length: 'Optimale (2 pages)',
    keywords: '28 identifiés',
  },

  aiSuggestions: [
    "Ajoutez des métriques quantifiées à vos réalisations pour plus d'impact",
    'Considérez l\'ajout d\'une section "Projets" pour valoriser vos réalisations',
    'Votre profil LinkedIn pourrait être optimisé avec les mêmes mots-clés',
    'Pensez à mentionner vos compétences en IA émergente pour vous démarquer',
    'Une certification en cybersécurité renforcerait votre profil actuel',
  ],

  generationProgress: {
    steps: [
      { name: 'Analyse du profil', status: 'completed', duration: '2s' },
      { name: 'Sélection du template', status: 'completed', duration: '1s' },
      { name: 'Application du style', status: 'completed', duration: '1s' },
      { name: 'Optimisation ATS', status: 'in-progress', duration: '3s' },
      { name: 'Génération PDF', status: 'pending', duration: '2s' },
      { name: 'Finalisation', status: 'pending', duration: '1s' },
    ],
  },

  exportOptions: {
    formats: ['PDF', 'DOCX', 'HTML', 'PNG'],
    qualities: ['Standard', 'Haute qualité', 'Print-ready'],
    sizes: ['A4', 'Letter', 'Legal'],
    languages: ['Français', 'Anglais', 'Espagnol', 'Allemand'],
  },
};
