export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  description: string;
  requiredSkills: string[];
  matchScore: number;
  benefits: string[];
  companySize: string;
  industry: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'Professional' | 'Creative' | 'Modern' | 'Academic';
  description: string;
  structure: string;
  length: string;
  bestFor: string;
  rating: number;
  usage: number;
  preview: string;
}

export interface Tone {
  id: string;
  name: string;
  description: string;
  intensity: string;
  bestFor: string[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  currentPosition: string;
  experience: string;
}

export interface CustomizationOptions {
  formalityLevel: number;
  length: string;
  keyPoints: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  additionalInfo: string;
  language: string;
  includePortfolio: boolean;
  includeSalaryExpectations: boolean;
}

export interface GeneratedLetter {
  id: string;
  jobId: string;
  templateId: string;
  toneId: string;
  content: string;
  score: number;
  wordCount: number;
  readingTime: number;
  strengths: string[];
  suggestions: string[];
  createdAt: string;
  version: number;
}

export interface GenerationStep {
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  duration: string;
}

export const motivationLetterData = {
  jobOffers: [
    {
      id: 'job-1',
      title: 'Directeur de Projet IT Senior',
      company: 'TechCorp Solutions',
      location: 'Paris, France',
      type: 'CDI',
      salary: '70-85k€',
      postedDate: 'Il y a 2 jours',
      description:
        'Nous recherchons un Directeur de Projet IT expérimenté pour piloter nos initiatives de transformation digitale. Vous dirigerez des équipes multidisciplinaires et gérerez des budgets importants tout en assurant la livraison de projets stratégiques.',
      requiredSkills: [
        'Gestion de projet',
        'Leadership',
        'Agile/Scrum',
        'Transformation digitale',
        'Budget management',
        'Stakeholder management',
        'Risk management',
        'Team building',
      ],
      matchScore: 94,
      benefits: [
        'Télétravail partiel',
        'Formation continue',
        'Bonus performance',
        'Mutuelle premium',
      ],
      companySize: '500-1000 employés',
      industry: 'Technologie',
    },
    {
      id: 'job-2',
      title: 'Consultant en Transformation Digitale',
      company: 'Digital Innovations Consulting',
      location: 'Lyon, France',
      type: 'CDI',
      salary: '55-70k€',
      postedDate: 'Il y a 1 semaine',
      description:
        "Rejoignez notre équipe de consultants pour accompagner nos clients dans leur transformation digitale. Vous interviendrez sur des missions variées allant de l'audit IT à l'implémentation de solutions innovantes.",
      requiredSkills: [
        'Conseil',
        'Analyse business',
        'Change management',
        'Digital strategy',
        'Process optimization',
        'Client relationship',
        'Presentation skills',
      ],
      matchScore: 87,
      benefits: [
        'Voiture de fonction',
        'Frais de mission',
        'Formation certifiante',
        'Évolution rapide',
      ],
      companySize: '100-500 employés',
      industry: 'Conseil',
    },
    {
      id: 'job-3',
      title: 'Manager de Programme IT',
      company: 'Global Tech Corp',
      location: 'Villejuif, France',
      type: 'CDI',
      salary: '75-90k€',
      postedDate: 'Il y a 3 jours',
      description:
        "Poste de Manager de Programme IT pour superviser un portefeuille de projets stratégiques. Vous serez responsable de la coordination entre les différentes équipes et de l'alignement avec les objectifs business.",
      requiredSkills: [
        'Programme management',
        'Portfolio management',
        'Governance',
        'Strategic planning',
        'Cross-functional leadership',
        'Vendor management',
        'Quality assurance',
      ],
      matchScore: 91,
      benefits: [
        'Stock options',
        'Congés illimités',
        'Budget formation 5k€',
        'Environnement international',
      ],
      companySize: '1000+ employés',
      industry: 'Technologie',
    },
    {
      id: 'job-4',
      title: 'Chef de Projet Télécoms',
      company: 'Telecom Solutions France',
      location: 'Paris, France',
      type: 'CDI',
      salary: '60-75k€',
      postedDate: 'Il y a 5 jours',
      description:
        'Nous cherchons un Chef de Projet spécialisé dans les télécommunications pour gérer le déploiement de nos infrastructures réseau. Une expertise technique et une capacité à gérer des projets complexes sont requises.',
      requiredSkills: [
        'Télécommunications',
        'Infrastructure réseau',
        'Project management',
        'Technical expertise',
        'Vendor coordination',
        'Deployment planning',
        'Quality control',
      ],
      matchScore: 82,
      benefits: [
        'Prime de résultats',
        'Télétravail 3j/semaine',
        'CE avantageux',
        'Plan épargne entreprise',
      ],
      companySize: '200-500 employés',
      industry: 'Télécommunications',
    },
  ],

  templates: [
    {
      id: 'template-1',
      name: 'Executive Professional',
      category: 'Professional' as const,
      description:
        'Template classique et élégant, parfait pour les postes de direction et les environnements corporate',
      structure: '4 paragraphes + introduction',
      length: '400-500 mots',
      bestFor: 'Postes de direction, Corporate',
      rating: 5,
      usage: 45,
      preview: '/templates/executive-pro.jpg',
    },
    {
      id: 'template-2',
      name: 'Modern Impact',
      category: 'Modern' as const,
      description:
        "Approche moderne et dynamique qui met l'accent sur les réalisations et l'impact business",
      structure: '3 paragraphes + bullet points',
      length: '350-450 mots',
      bestFor: 'Tech, Startups, Innovation',
      rating: 5,
      usage: 38,
      preview: '/templates/modern-impact.jpg',
    },
    {
      id: 'template-3',
      name: 'Creative Storyteller',
      category: 'Creative' as const,
      description:
        'Template narratif qui raconte votre parcours de manière engageante et mémorable',
      structure: 'Storytelling + 3 actes',
      length: '450-550 mots',
      bestFor: 'Marketing, Communication, Design',
      rating: 4,
      usage: 29,
      preview: '/templates/creative-story.jpg',
    },
    {
      id: 'template-4',
      name: 'Consultant Expert',
      category: 'Professional' as const,
      description:
        "Spécialement conçu pour les consultants, met l'accent sur l'expertise et les résultats clients",
      structure: 'Expertise + Cas clients + Vision',
      length: '400-500 mots',
      bestFor: 'Conseil, Expertise, B2B',
      rating: 5,
      usage: 33,
      preview: '/templates/consultant-expert.jpg',
    },
    {
      id: 'template-5',
      name: 'Academic Research',
      category: 'Academic' as const,
      description:
        "Format académique rigoureux pour les postes de recherche et d'enseignement supérieur",
      structure: 'Recherche + Publications + Enseignement',
      length: '500-600 mots',
      bestFor: 'Recherche, Université, R&D',
      rating: 4,
      usage: 18,
      preview: '/templates/academic-research.jpg',
    },
    {
      id: 'template-6',
      name: 'Startup Disruptor',
      category: 'Modern' as const,
      description:
        "Template audacieux pour les environnements startup et les postes d'innovation",
      structure: 'Vision + Disruption + Scaling',
      length: '300-400 mots',
      bestFor: 'Startups, Scale-ups, Innovation',
      rating: 4,
      usage: 25,
      preview: '/templates/startup-disruptor.jpg',
    },
  ],

  tones: [
    {
      id: 'professional',
      name: 'Professionnel',
      description:
        'Ton équilibré et respectueux, idéal pour la plupart des secteurs',
      intensity: 'Modéré',
      bestFor: ['Corporate', 'Finance', 'Conseil', 'Direction'],
    },
    {
      id: 'enthusiastic',
      name: 'Enthousiaste',
      description: 'Ton dynamique qui montre votre motivation et votre énergie',
      intensity: 'Élevé',
      bestFor: ['Startups', 'Vente', 'Marketing', 'Innovation'],
    },
    {
      id: 'confident',
      name: 'Confiant',
      description:
        'Ton assuré qui met en avant votre expertise et vos réalisations',
      intensity: 'Élevé',
      bestFor: ['Leadership', 'Expertise', 'Senior', 'Direction'],
    },
    {
      id: 'creative',
      name: 'Créatif',
      description: 'Ton original et personnalisé pour sortir du lot',
      intensity: 'Variable',
      bestFor: ['Design', 'Communication', 'Artistique', 'Innovation'],
    },
    {
      id: 'formal',
      name: 'Formel',
      description:
        'Ton très respectueux et traditionnel pour les secteurs conservateurs',
      intensity: 'Faible',
      bestFor: ['Banque', 'Juridique', 'Administration', 'Académique'],
    },
    {
      id: 'friendly',
      name: 'Amical',
      description:
        'Ton chaleureux et accessible qui crée une connexion humaine',
      intensity: 'Modéré',
      bestFor: ['PME', 'Associatif', 'Service client', 'RH'],
    },
  ],

  userProfile: {
    personalInfo: {
      fullName: 'Jean René Roustand',
      email: 'jean.rene@example.com',
      phone: '+33 7 81 65 59 92',
      location: 'Villejuif, France',
      linkedin: 'linkedin.com/in/jeanrene',
      currentPosition: 'Directeur de Projet IT Senior',
      experience: '15+ ans',
    },
  },

  customizationOptions: {
    formalityLevel: 3,
    length: 'medium',
    keyPoints: [
      { id: 'leadership', label: 'Compétences de leadership', selected: true },
      { id: 'technical', label: 'Expertise technique', selected: true },
      { id: 'results', label: 'Résultats quantifiés', selected: true },
      { id: 'innovation', label: 'Innovation et créativité', selected: false },
      {
        id: 'international',
        label: 'Expérience internationale',
        selected: true,
      },
      { id: 'team', label: "Management d'équipe", selected: true },
      { id: 'budget', label: 'Gestion budgétaire', selected: false },
      {
        id: 'transformation',
        label: 'Transformation digitale',
        selected: true,
      },
      { id: 'agile', label: 'Méthodologies Agile', selected: true },
      {
        id: 'stakeholder',
        label: 'Gestion des parties prenantes',
        selected: false,
      },
    ],
    additionalInfo: '',
    language: 'fr',
    includePortfolio: false,
    includeSalaryExpectations: false,
  },

  generatedLetters: [
    {
      id: 'letter-1',
      jobId: 'job-1',
      templateId: 'template-1',
      toneId: 'professional',
      content: `Madame, Monsieur,

Votre annonce pour le poste de Directeur de Projet IT Senior chez TechCorp Solutions a immédiatement retenu mon attention. Avec plus de 15 années d'expérience dans la direction de projets IT stratégiques et la transformation digitale, je suis convaincu que mon profil correspond parfaitement aux exigences de ce poste.

Au cours de ma carrière, j'ai eu l'opportunité de piloter des projets de transformation digitale d'envergure avec des budgets allant jusqu'à 5 millions d'euros. Chez Digital Innovations, j'ai notamment dirigé une équipe de 25 personnes pour la mise en œuvre d'une solution ERP qui a permis de réduire les coûts opérationnels de 30% et d'améliorer la satisfaction client de 25%. Cette expérience m'a permis de développer une expertise approfondie en méthodologies Agile et en gestion des parties prenantes multiculturelles.

Ma capacité à allier vision stratégique et excellence opérationnelle s'est traduite par la livraison de 12 projets majeurs dans les délais et budgets impartis. J'ai également mis en place une méthodologie de gouvernance IT qui est aujourd'hui utilisée comme référence dans l'organisation. Mon approche collaborative et ma passion pour l'innovation technologique me permettent de fédérer les équipes autour d'objectifs ambitieux tout en maintenant un haut niveau de qualité.

Je serais ravi de pouvoir échanger avec vous sur la manière dont mon expérience et ma vision pourraient contribuer au succès de vos initiatives de transformation digitale. Je reste à votre disposition pour un entretien à votre convenance.`,
      score: 92,
      wordCount: 287,
      readingTime: 2,
      strengths: [
        'Quantification précise des résultats (30% de réduction des coûts)',
        "Mention d'expérience budgétaire significative (5M€)",
        'Démonstration de leadership avec équipe de 25 personnes',
        'Alignement parfait avec les compétences requises',
      ],
      suggestions: [
        'Ajouter une référence à une certification PMP ou équivalente',
        'Mentionner une réalisation spécifique en transformation digitale',
        "Inclure une phrase sur la culture d'entreprise de TechCorp",
      ],
      createdAt: '2024-01-15T10:30:00Z',
      version: 1,
    },
  ],

  generationSteps: [
    {
      name: 'Analyse du profil candidat',
      description: 'Extraction des compétences et expériences clés',
      status: 'completed' as const,
      duration: '2s',
    },
    {
      name: "Analyse de l'offre d'emploi",
      description: 'Identification des mots-clés et exigences',
      status: 'completed' as const,
      duration: '3s',
    },
    {
      name: 'Matching et personnalisation',
      description: "Adaptation du contenu au poste et à l'entreprise",
      status: 'in-progress' as const,
      duration: '4s',
    },
    {
      name: 'Génération du contenu',
      description: 'Rédaction de la lettre avec le ton sélectionné',
      status: 'pending' as const,
      duration: '5s',
    },
    {
      name: 'Optimisation et révision',
      description: "Vérification de la cohérence et de l'impact",
      status: 'pending' as const,
      duration: '3s',
    },
    {
      name: 'Finalisation',
      description: 'Mise en forme et calcul du score',
      status: 'pending' as const,
      duration: '2s',
    },
  ],

  aiTips: [
    'Personnalisez toujours votre lettre pour chaque entreprise et poste',
    'Quantifiez vos réalisations avec des chiffres concrets',
    "Montrez votre connaissance de l'entreprise et de ses enjeux",
    "Utilisez des mots-clés de l'offre d'emploi dans votre lettre",
    'Gardez un équilibre entre confiance et humilité',
  ],

  statistics: {
    averageScore: 87,
    averageWordCount: 342,
    averageReadingTime: 2.3,
    successRate: 94,
    mostUsedTemplate: 'Executive Professional',
    mostUsedTone: 'Professionnel',
    averageCustomizationTime: '8 minutes',
  },

  exportOptions: {
    formats: ['PDF', 'DOCX', 'TXT', 'HTML'],
    languages: ['Français', 'Anglais', 'Espagnol', 'Allemand'],
    styles: ['Standard', 'Moderne', 'Classique', 'Minimaliste'],
  },

  recentLetters: [
    {
      id: 'recent-1',
      jobTitle: 'Directeur de Projet IT Senior',
      company: 'TechCorp Solutions',
      score: 92,
      createdAt: '2024-01-15T10:30:00Z',
      status: 'sent',
    },
    {
      id: 'recent-2',
      jobTitle: 'Consultant en Transformation Digitale',
      company: 'Digital Innovations',
      score: 87,
      createdAt: '2024-01-14T14:20:00Z',
      status: 'draft',
    },
    {
      id: 'recent-3',
      jobTitle: 'Manager de Programme IT',
      company: 'Global Tech Corp',
      score: 91,
      createdAt: '2024-01-13T09:15:00Z',
      status: 'sent',
    },
  ],

  industryInsights: {
    averageResponseRate: {
      'IT/Tech': 23,
      Conseil: 18,
      Finance: 15,
      Marketing: 21,
      RH: 19,
    },
    bestPerformingTones: {
      'IT/Tech': 'Professionnel',
      Conseil: 'Confiant',
      Finance: 'Formel',
      Marketing: 'Enthousiaste',
      Startups: 'Créatif',
    },
    optimalLength: {
      Junior: '250-350 mots',
      Intermédiaire: '300-450 mots',
      Senior: '400-550 mots',
      Direction: '450-600 mots',
    },
  },
};
