export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status:
    | 'sent'
    | 'interview_scheduled'
    | 'no_response'
    | 'rejected'
    | 'in_progress';
  followUpUrgency: 'low' | 'medium' | 'high' | 'critical';
  matchScore: number;
  lastInteraction: {
    type: string;
    date: string;
    details?: string;
  };
  aiRecommendation: string;
  tags: string[];
  interviewDetails?: {
    type: string;
    date: string;
    interviewer: string;
    platform?: string;
  };
  recruiterInfo?: {
    name: string;
    role: string;
    linkedinProfile?: string;
  };
}

export interface TimingOption {
  id: string;
  name: string;
  description: string;
  recommendedDelay: string;
  effectiveness: 'low' | 'medium' | 'high';
  responseRate: number;
  bestFor: string[];
}

export interface Template {
  id: string;
  name: string;
  type: 'polite' | 'assertive' | 'value-add' | 'creative';
  description: string;
  tone: string;
  length: string;
  effectiveness: number;
  rating: number;
  usage: number;
  bestFor: string[];
  structure: string[];
}

export interface CustomizationOptions {
  objective: string;
  insistenceLevel: number;
  includeElements: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  newInformation: string;
  preferredChannel: string;
  scheduleSuggestion: boolean;
  includePortfolio: boolean;
  mentionReferral: boolean;
}

export interface GeneratedLetter {
  id: string;
  applicationId: string;
  templateId: string;
  subject: string;
  content: string;
  score: number;
  wordCount: number;
  readingTime: number;
  expectedResponseRate: number;
  strengths: string[];
  suggestions: string[];
  nextSteps: string[];
  createdAt: string;
  sentAt?: string;
  responseReceived?: boolean;
}

export interface GenerationStep {
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  duration: string;
}

export const followUpLetterData = {
  applications: [
    {
      id: 'app-1',
      jobTitle: 'Directeur de Projet IT Senior',
      company: 'TechCorp Solutions',
      location: 'Paris, France',
      appliedDate: '2024-01-10T09:00:00Z',
      status: 'no_response' as const,
      followUpUrgency: 'high' as const,
      matchScore: 94,
      lastInteraction: {
        type: 'Candidature envoyée',
        date: '10 janvier 2024',
        details:
          'CV et lettre de motivation envoyés via leur portail carrières',
      },
      aiRecommendation:
        'Relance recommandée - Poste très aligné avec votre profil. Mentionnez votre expertise en transformation digitale.',
      tags: [
        'Transformation digitale',
        'Leadership',
        'Budget 5M€',
        'Équipe 25 personnes',
        'Agile/Scrum',
      ],
      recruiterInfo: {
        name: 'Marie Dubois',
        role: 'Senior Talent Acquisition Manager',
        linkedinProfile: 'linkedin.com/in/marie-dubois-tech',
      },
    },
    {
      id: 'app-2',
      jobTitle: 'Consultant en Transformation Digitale',
      company: 'Digital Innovations Consulting',
      location: 'Lyon, France',
      appliedDate: '2024-01-08T14:30:00Z',
      status: 'interview_scheduled' as const,
      followUpUrgency: 'medium' as const,
      matchScore: 87,
      lastInteraction: {
        type: 'Entretien RH programmé',
        date: '12 janvier 2024',
        details: 'Entretien téléphonique de 30 minutes avec Sarah Martin',
      },
      aiRecommendation:
        'Préparez des questions sur leurs méthodologies de conseil et leurs clients types.',
      tags: [
        'Conseil',
        'Change management',
        'Process optimization',
        'Client relationship',
      ],
      interviewDetails: {
        type: 'Entretien téléphonique RH',
        date: '18 janvier 2024 à 14h00',
        interviewer: 'Sarah Martin - RH Manager',
        platform: 'Teams',
      },
      recruiterInfo: {
        name: 'Sarah Martin',
        role: 'HR Manager',
        linkedinProfile: 'linkedin.com/in/sarah-martin-hr',
      },
    },
    {
      id: 'app-3',
      jobTitle: 'Manager de Programme IT',
      company: 'Global Tech Corp',
      location: 'Villejuif, France',
      appliedDate: '2024-01-12T11:15:00Z',
      status: 'sent' as const,
      followUpUrgency: 'low' as const,
      matchScore: 91,
      lastInteraction: {
        type: 'Candidature envoyée',
        date: '12 janvier 2024',
        details:
          "Application soumise via LinkedIn. Profil consulté par 3 personnes de l'entreprise",
      },
      aiRecommendation:
        'Candidature récente. Attendez 5-7 jours avant de relancer. Surveillez les consultations de profil.',
      tags: [
        'Programme management',
        'Portfolio',
        'Governance',
        'Strategic planning',
        'International',
      ],
      recruiterInfo: {
        name: 'Thomas Chen',
        role: 'Technical Recruiter',
        linkedinProfile: 'linkedin.com/in/thomas-chen-tech',
      },
    },
    {
      id: 'app-4',
      jobTitle: 'Chef de Projet Télécoms',
      company: 'Telecom Solutions France',
      location: 'Paris, France',
      appliedDate: '2024-01-05T16:45:00Z',
      status: 'no_response' as const,
      followUpUrgency: 'critical' as const,
      matchScore: 82,
      lastInteraction: {
        type: 'Candidature envoyée',
        date: '5 janvier 2024',
        details:
          "Email direct au responsable technique mentionné dans l'annonce",
      },
      aiRecommendation:
        'Relance urgente nécessaire. Plus de 10 jours sans réponse. Proposez un appel téléphonique.',
      tags: [
        'Télécommunications',
        'Infrastructure réseau',
        'Technical expertise',
        'Vendor coordination',
      ],
      recruiterInfo: {
        name: 'Pierre Moreau',
        role: 'Responsable Technique',
        linkedinProfile: 'linkedin.com/in/pierre-moreau-telecom',
      },
    },
    {
      id: 'app-5',
      jobTitle: 'Directeur Innovation IT',
      company: 'Innovation Labs',
      location: 'Bordeaux, France',
      appliedDate: '2024-01-14T10:20:00Z',
      status: 'in_progress' as const,
      followUpUrgency: 'low' as const,
      matchScore: 89,
      lastInteraction: {
        type: 'Accusé de réception automatique',
        date: '14 janvier 2024',
        details:
          'Email automatique confirmant la réception. Processus de sélection en cours.',
      },
      aiRecommendation:
        "Processus en cours. Patience recommandée. Préparez des exemples d'innovation concrète.",
      tags: [
        'Innovation',
        'R&D',
        'Emerging technologies',
        'Digital strategy',
        'Startup mindset',
      ],
    },
  ],

  timingOptions: [
    {
      id: 'timing-1',
      name: 'Relance Standard (7-10 jours)',
      description:
        'Délai classique respectueux qui montre votre intérêt sans paraître insistant',
      recommendedDelay: '7-10 jours après candidature',
      effectiveness: 'high' as const,
      responseRate: 34,
      bestFor: ['Première relance', 'Postes corporate', 'Grandes entreprises'],
    },
    {
      id: 'timing-2',
      name: 'Relance Rapide (3-5 jours)',
      description:
        'Pour les postes urgents ou les startups où la réactivité est valorisée',
      recommendedDelay: '3-5 jours après candidature',
      effectiveness: 'medium' as const,
      responseRate: 28,
      bestFor: ['Startups', 'Postes urgents', 'Tech', 'Missions courtes'],
    },
    {
      id: 'timing-3',
      name: 'Relance Tardive (14+ jours)',
      description:
        'Quand vous avez attendu longtemps, approche plus directe nécessaire',
      recommendedDelay: '14+ jours après candidature',
      effectiveness: 'medium' as const,
      responseRate: 22,
      bestFor: [
        'Relance de relance',
        'Postes très spécialisés',
        'Secteur public',
      ],
    },
    {
      id: 'timing-4',
      name: 'Relance Post-Entretien (2-3 jours)',
      description: "Remerciement et réaffirmation d'intérêt après un entretien",
      recommendedDelay: '2-3 jours après entretien',
      effectiveness: 'high' as const,
      responseRate: 45,
      bestFor: ['Post-entretien', 'Remerciements', 'Clarifications'],
    },
    {
      id: 'timing-5',
      name: 'Relance Stratégique (Événement)',
      description: "Basée sur un événement de l'entreprise ou du secteur",
      recommendedDelay: "Selon l'actualité",
      effectiveness: 'high' as const,
      responseRate: 38,
      bestFor: [
        'Actualité entreprise',
        'Événements secteur',
        'Nouvelles compétences',
      ],
    },
  ],

  templates: [
    {
      id: 'template-1',
      name: 'Relance Polie Standard',
      type: 'polite' as const,
      description:
        'Approche respectueuse et professionnelle pour une première relance',
      tone: 'Poli et respectueux',
      length: '150-200 mots',
      effectiveness: 85,
      rating: 5,
      usage: 156,
      bestFor: ['Première relance', 'Corporate', 'Postes senior'],
      structure: [
        'Rappel candidature',
        'Réaffirmation intérêt',
        'Demande statut',
        'Disponibilité',
      ],
    },
    {
      id: 'template-2',
      name: 'Relance Assertive',
      type: 'assertive' as const,
      description:
        'Ton plus direct pour montrer votre détermination et votre valeur',
      tone: 'Confiant et direct',
      length: '180-250 mots',
      effectiveness: 78,
      rating: 4,
      usage: 89,
      bestFor: ['Deuxième relance', 'Postes compétitifs', 'Leadership'],
      structure: [
        'Rappel expertise',
        'Valeur ajoutée',
        'Demande claire',
        'Prochaines étapes',
      ],
    },
    {
      id: 'template-3',
      name: 'Relance Valeur Ajoutée',
      type: 'value-add' as const,
      description:
        "Apporte de nouvelles informations ou insights pour l'entreprise",
      tone: 'Informatif et expert',
      length: '200-300 mots',
      effectiveness: 92,
      rating: 5,
      usage: 134,
      bestFor: ['Conseil', 'Expertise technique', 'Innovation'],
      structure: [
        'Nouvelle information',
        'Insight secteur',
        'Proposition valeur',
        'Collaboration',
      ],
    },
    {
      id: 'template-4',
      name: 'Relance Post-Entretien',
      type: 'polite' as const,
      description:
        "Remerciement et suivi après un entretien pour maintenir l'engagement",
      tone: 'Reconnaissant et professionnel',
      length: '120-180 mots',
      effectiveness: 88,
      rating: 5,
      usage: 203,
      bestFor: ['Post-entretien', 'Remerciements', 'Clarifications'],
      structure: [
        'Remerciements',
        'Points clés entretien',
        'Informations complémentaires',
        'Prochaines étapes',
      ],
    },
    {
      id: 'template-5',
      name: 'Relance Créative',
      type: 'creative' as const,
      description:
        'Approche originale pour sortir du lot dans des secteurs créatifs',
      tone: 'Original et engageant',
      length: '160-220 mots',
      effectiveness: 73,
      rating: 4,
      usage: 67,
      bestFor: ['Marketing', 'Design', 'Startups', 'Innovation'],
      structure: [
        'Accroche créative',
        'Storytelling',
        'Différenciation',
        'Call-to-action',
      ],
    },
    {
      id: 'template-6',
      name: 'Relance Urgente',
      type: 'assertive' as const,
      description: 'Pour les situations où une réponse rapide est nécessaire',
      tone: 'Urgent mais respectueux',
      length: '100-150 mots',
      effectiveness: 69,
      rating: 3,
      usage: 45,
      bestFor: ['Délais courts', 'Opportunités limitées', 'Dernière chance'],
      structure: [
        'Urgence contexte',
        'Rappel bref',
        'Demande directe',
        'Délai réponse',
      ],
    },
  ],

  customizationOptions: {
    objective: 'status_update',
    insistenceLevel: 3,
    includeElements: [
      {
        id: 'portfolio',
        label: 'Lien vers portfolio/projets récents',
        selected: false,
      },
      { id: 'references', label: 'Proposer des références', selected: false },
      { id: 'availability', label: 'Mentionner disponibilité', selected: true },
      {
        id: 'salary',
        label: 'Aborder les attentes salariales',
        selected: false,
      },
      {
        id: 'meeting',
        label: 'Proposer un entretien informel',
        selected: true,
      },
      {
        id: 'timeline',
        label: 'Demander le timeline de recrutement',
        selected: true,
      },
      {
        id: 'company_news',
        label: "Référencer actualité de l'entreprise",
        selected: false,
      },
      {
        id: 'mutual_connections',
        label: 'Mentionner connexions communes',
        selected: false,
      },
      {
        id: 'additional_skills',
        label: 'Nouvelles compétences acquises',
        selected: false,
      },
      {
        id: 'industry_insight',
        label: 'Partager insight sectoriel',
        selected: false,
      },
    ],
    newInformation: '',
    preferredChannel: 'email',
    scheduleSuggestion: true,
    includePortfolio: false,
    mentionReferral: false,
  },

  generatedLetters: [
    {
      id: 'letter-1',
      applicationId: 'app-1',
      templateId: 'template-3',
      subject:
        'Suivi candidature - Directeur de Projet IT Senior + Insight Transformation Digitale',
      content: `Bonjour Marie,

J'espère que vous allez bien. Je me permets de revenir vers vous concernant ma candidature pour le poste de Directeur de Projet IT Senior chez TechCorp Solutions, envoyée le 10 janvier dernier.

Depuis ma candidature, j'ai eu l'opportunité de lire votre récente annonce sur l'expansion de vos activités dans le cloud computing. Cette orientation stratégique résonne parfaitement avec mon expérience récente où j'ai dirigé une migration cloud qui a permis de réduire les coûts d'infrastructure de 40% tout en améliorant la scalabilité de 300%.

Mon expertise en transformation digitale, particulièrement dans la gestion de budgets de 2-5M€ et le leadership d'équipes multiculturelles de 25+ personnes, pourrait apporter une valeur immédiate à vos projets d'envergure. J'ai notamment développé une méthodologie de gouvernance IT qui est aujourd'hui utilisée comme référence dans mon organisation actuelle.

Je serais ravi d'échanger avec vous sur la manière dont mon expérience pourrait contribuer aux objectifs ambitieux de TechCorp Solutions. Seriez-vous disponible pour un entretien téléphonique de 20 minutes dans les prochains jours ?

Je reste à votre disposition et vous remercie pour votre temps.`,
      score: 91,
      wordCount: 198,
      readingTime: 1,
      expectedResponseRate: 42,
      strengths: [
        "Référence à l'actualité de l'entreprise (expansion cloud)",
        'Quantification précise des résultats (40% réduction coûts)',
        "Mention d'expertise budgétaire significative (2-5M€)",
        "Proposition concrète d'entretien avec durée spécifique",
      ],
      suggestions: [
        'Ajouter une question sur leurs défis actuels en transformation',
        'Mentionner une certification cloud récente si applicable',
        "Proposer un créneau spécifique pour l'entretien",
      ],
      nextSteps: [
        'Envoyer la relance dans les 24h (timing optimal)',
        'Préparer 3 questions sur leurs projets cloud',
        'Suivre sur LinkedIn si pas de réponse sous 5 jours',
      ],
      createdAt: '2024-01-15T14:30:00Z',
    },
  ],

  generationSteps: [
    {
      name: 'Analyse du contexte candidature',
      description: 'Évaluation du timing et de la situation actuelle',
      status: 'completed' as const,
      duration: '1s',
    },
    {
      name: "Recherche d'actualités entreprise",
      description: "Identification d'éléments de contexte pertinents",
      status: 'completed' as const,
      duration: '2s',
    },
    {
      name: 'Adaptation du template',
      description: "Personnalisation selon le profil et l'objectif",
      status: 'in-progress' as const,
      duration: '3s',
    },
    {
      name: 'Optimisation du ton',
      description: "Ajustement selon le niveau d'insistance choisi",
      status: 'pending' as const,
      duration: '2s',
    },
    {
      name: "Calcul du score d'efficacité",
      description: 'Évaluation de la probabilité de réponse',
      status: 'pending' as const,
      duration: '1s',
    },
  ],

  statistics: {
    totalFollowUps: 47,
    averageResponseRate: 31,
    interviewsScheduled: 12,
    averageResponseTime: '3.2 jours',
    bestPerformingTemplate: 'Relance Valeur Ajoutée',
    optimalTiming: '7-10 jours',
    successRate: 68,
  },

  aiTips: [
    "Personnalisez chaque relance avec des éléments spécifiques à l'entreprise",
    'Attendez au moins 7 jours avant la première relance pour paraître respectueux',
    'Apportez toujours une nouvelle information ou valeur dans vos relances',
    "Limitez-vous à 2-3 relances maximum pour éviter d'être perçu comme insistant",
    'Utilisez différents canaux (email, LinkedIn) pour vos relances successives',
  ],

  industryBenchmarks: {
    averageResponseRates: {
      'IT/Tech': 28,
      Conseil: 24,
      Finance: 19,
      Marketing: 32,
      Startup: 35,
    },
    bestTimingByIndustry: {
      'IT/Tech': '5-7 jours',
      Conseil: '7-10 jours',
      Finance: '10-14 jours',
      Marketing: '3-5 jours',
      Startup: '3-5 jours',
    },
    mostEffectiveTemplates: {
      'IT/Tech': 'Relance Valeur Ajoutée',
      Conseil: 'Relance Assertive',
      Finance: 'Relance Polie Standard',
      Marketing: 'Relance Créative',
      Startup: 'Relance Rapide',
    },
  },

  recentFollowUps: [
    {
      id: 'recent-1',
      jobTitle: 'Directeur de Projet IT Senior',
      company: 'TechCorp Solutions',
      sentDate: '2024-01-15T14:30:00Z',
      status: 'sent',
      responseReceived: false,
      expectedResponse: '2024-01-18T14:30:00Z',
    },
    {
      id: 'recent-2',
      jobTitle: 'Manager de Programme IT',
      company: 'Global Tech Corp',
      sentDate: '2024-01-14T10:15:00Z',
      status: 'responded',
      responseReceived: true,
      responseType: 'Interview scheduled',
    },
    {
      id: 'recent-3',
      jobTitle: 'Chef de Projet Télécoms',
      company: 'Telecom Solutions France',
      sentDate: '2024-01-13T16:45:00Z',
      status: 'sent',
      responseReceived: false,
      expectedResponse: '2024-01-16T16:45:00Z',
    },
  ],

  exportOptions: {
    formats: ['Email', 'LinkedIn Message', 'PDF', 'TXT'],
    languages: ['Français', 'Anglais', 'Espagnol', 'Allemand'],
    scheduling: ['Immédiat', 'Programmé', 'Optimal IA'],
  },
};
