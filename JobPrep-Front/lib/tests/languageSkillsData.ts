export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  difficulty: 'Facile' | 'Modérée' | 'Difficile';
  testsAvailable: number;
  nativeSpeakers: string;
  regions: string[];
  businessImportance: number;
  learningResources: number;
}

export interface SkillType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  averageDuration: string;
  minLevel: string;
  format: string;
  subSkills: string[];
}

export interface Question {
  id: string;
  question: string;
  type:
    | 'multiple_choice'
    | 'speaking'
    | 'writing'
    | 'listening'
    | 'reading_comprehension';
  context?: string;
  audioUrl?: string;
  readingText?: string;
  minWords?: number;
  maxWords?: number;
  options?: {
    text: string;
    value: string | number;
    explanation?: string;
  }[];
  correctAnswer?: string | number;
  skillWeight: Record<string, number>;
  timeLimit?: number;
  cecrLevel: string;
}

export interface Test {
  id: string;
  languageId: string;
  skillType: string;
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  targetLevel: string;
  rating: number;
  reviews: number;
  skillsEvaluated: string[];
  format: string[];
  preview?: string;
  questions: Question[];
  passingScore: number;
  certificateAvailable: boolean;
  isAdaptive: boolean;
  recognizedBy: string[];
}

export interface TestResult {
  id: string;
  testId: string;
  overallScore: number;
  cecrLevel: string;
  summary: string;
  accuracy: number;
  timeSpent: string;
  skillScores: {
    skill: string;
    score: number;
    cecrLevel: string;
    description: string;
  }[];
  strengths: string[];
  improvements: string[];
  learningPath: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedTime: string;
    type: string;
    targetLevel: string;
  }[];
  completedAt: string;
  certificateEarned: boolean;
  industryComparison: {
    percentile: number;
    averageScore: number;
    topPerformers: number;
  };
}

export interface UserProgress {
  completedTests: number;
  averageLevel: string;
  languagesStudied: number;
  totalTimeSpent: string;
  certificatesEarned: number;
  strongestLanguages: string[];
  improvementAreas: string[];
  nextRecommendedTest: string;
  skillsEvolution: {
    language: string;
    skill: string;
    previousLevel: string;
    currentLevel: string;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export const languageSkillsData = {
  languages: [
    {
      id: 'english',
      name: 'Anglais',
      nativeName: 'English',
      flag: '🇬🇧',
      difficulty: 'Modérée' as const,
      testsAvailable: 24,
      nativeSpeakers: '1.5 milliard',
      regions: [
        'États-Unis',
        'Royaume-Uni',
        'Canada',
        'Australie',
        'Nouvelle-Zélande',
        'Irlande',
      ],
      businessImportance: 95,
      learningResources: 1250,
    },
    {
      id: 'spanish',
      name: 'Espagnol',
      nativeName: 'Español',
      flag: '🇪🇸',
      difficulty: 'Facile' as const,
      testsAvailable: 18,
      nativeSpeakers: '500 millions',
      regions: [
        'Espagne',
        'Mexique',
        'Argentine',
        'Colombie',
        'Pérou',
        'Venezuela',
      ],
      businessImportance: 78,
      learningResources: 890,
    },
    {
      id: 'german',
      name: 'Allemand',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      difficulty: 'Difficile' as const,
      testsAvailable: 16,
      nativeSpeakers: '100 millions',
      regions: [
        'Allemagne',
        'Autriche',
        'Suisse',
        'Luxembourg',
        'Liechtenstein',
      ],
      businessImportance: 82,
      learningResources: 670,
    },
    {
      id: 'italian',
      name: 'Italien',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      difficulty: 'Modérée' as const,
      testsAvailable: 14,
      nativeSpeakers: '65 millions',
      regions: ['Italie', 'Suisse', 'Saint-Marin', 'Vatican'],
      businessImportance: 65,
      learningResources: 520,
    },
    {
      id: 'portuguese',
      name: 'Portugais',
      nativeName: 'Português',
      flag: '🇵🇹',
      difficulty: 'Modérée' as const,
      testsAvailable: 12,
      nativeSpeakers: '260 millions',
      regions: ['Portugal', 'Brésil', 'Angola', 'Mozambique', 'Cap-Vert'],
      businessImportance: 71,
      learningResources: 450,
    },
    {
      id: 'chinese',
      name: 'Chinois Mandarin',
      nativeName: '中文',
      flag: '🇨🇳',
      difficulty: 'Difficile' as const,
      testsAvailable: 20,
      nativeSpeakers: '918 millions',
      regions: ['Chine', 'Taïwan', 'Singapour', 'Malaisie'],
      businessImportance: 88,
      learningResources: 780,
    },
    {
      id: 'japanese',
      name: 'Japonais',
      nativeName: '日本語',
      flag: '🇯🇵',
      difficulty: 'Difficile' as const,
      testsAvailable: 15,
      nativeSpeakers: '125 millions',
      regions: ['Japon'],
      businessImportance: 75,
      learningResources: 620,
    },
    {
      id: 'arabic',
      name: 'Arabe',
      nativeName: 'العربية',
      flag: '🇸🇦',
      difficulty: 'Difficile' as const,
      testsAvailable: 13,
      nativeSpeakers: '422 millions',
      regions: [
        'Arabie Saoudite',
        'Égypte',
        'Maroc',
        'Algérie',
        'Tunisie',
        'Émirats',
      ],
      businessImportance: 69,
      learningResources: 380,
    },
    {
      id: 'russian',
      name: 'Russe',
      nativeName: 'Русский',
      flag: '🇷🇺',
      difficulty: 'Difficile' as const,
      testsAvailable: 11,
      nativeSpeakers: '258 millions',
      regions: ['Russie', 'Kazakhstan', 'Biélorussie', 'Kirghizistan'],
      businessImportance: 63,
      learningResources: 340,
    },
  ],

  skillTypes: [
    {
      id: 'listening',
      name: 'Compréhension Orale',
      description:
        'Évaluez votre capacité à comprendre la langue parlée dans différents contextes',
      icon: 'Ear',
      color: 'bg-blue-500',
      averageDuration: '30 minutes',
      minLevel: 'A1',
      format: 'Audio + QCM',
      subSkills: [
        'Compréhension globale',
        'Détails spécifiques',
        'Inférences',
        'Accents variés',
        'Registres de langue',
      ],
    },
    {
      id: 'speaking',
      name: 'Expression Orale',
      description:
        'Testez votre capacité à vous exprimer oralement avec fluidité et précision',
      icon: 'Mic',
      color: 'bg-red-500',
      averageDuration: '25 minutes',
      minLevel: 'A2',
      format: 'Enregistrement vocal',
      subSkills: [
        'Prononciation',
        'Fluidité',
        'Vocabulaire',
        'Grammaire',
        'Interaction',
        'Cohérence',
      ],
    },
    {
      id: 'reading',
      name: 'Compréhension Écrite',
      description:
        'Évaluez votre compréhension de textes écrits de complexité variable',
      icon: 'FileText',
      color: 'bg-emerald-500',
      averageDuration: '35 minutes',
      minLevel: 'A1',
      format: 'Textes + Questions',
      subSkills: [
        'Lecture rapide',
        'Compréhension détaillée',
        'Inférences',
        'Vocabulaire',
        'Structure textuelle',
      ],
    },
    {
      id: 'writing',
      name: 'Expression Écrite',
      description:
        'Testez votre capacité à rédiger des textes clairs et structurés',
      icon: 'Pen',
      color: 'bg-purple-500',
      averageDuration: '40 minutes',
      minLevel: 'A2',
      format: 'Rédaction libre',
      subSkills: [
        'Grammaire',
        'Vocabulaire',
        'Structure',
        'Cohérence',
        'Registre',
        'Créativité',
      ],
    },
    {
      id: 'integrated',
      name: 'Compétences Intégrées',
      description:
        'Évaluation globale combinant toutes les compétences linguistiques',
      icon: 'MessageSquare',
      color: 'bg-indigo-500',
      averageDuration: '60 minutes',
      minLevel: 'B1',
      format: 'Mixte (Audio, Écrit, Oral)',
      subSkills: [
        'Communication globale',
        'Interaction',
        'Médiation',
        'Adaptation contextuelle',
        'Stratégies communicatives',
      ],
    },
  ],

  tests: [
    {
      id: 'eng-listening-001',
      languageId: 'english',
      skillType: 'listening',
      title: 'Anglais Compréhension Orale B2',
      description:
        'Test de compréhension orale niveau intermédiaire avancé avec accents variés et contextes professionnels',
      duration: '30 minutes',
      questionsCount: 25,
      targetLevel: 'B2',
      rating: 5,
      reviews: 1847,
      skillsEvaluated: [
        'Compréhension globale',
        'Détails spécifiques',
        'Inférences',
        'Accents britannique/américain',
      ],
      format: ['Audio', 'QCM', 'Vrai/Faux'],
      preview:
        'Listen to a business meeting discussion and answer questions about the main decisions made.',
      questions: [
        {
          id: 'eng-l-q1',
          question: 'What is the main topic of the conversation?',
          type: 'multiple_choice' as const,
          context:
            'You will hear a conversation between two colleagues discussing a project deadline.',
          audioUrl: '/audio/eng-conversation-1.mp3',
          options: [
            { text: 'Planning a team meeting', value: 'meeting' },
            { text: 'Discussing project timeline', value: 'timeline' },
            { text: 'Reviewing budget constraints', value: 'budget' },
            { text: 'Organizing a company event', value: 'event' },
          ],
          correctAnswer: 'timeline',
          skillWeight: {
            'Compréhension globale': 0.7,
            'Contexte professionnel': 0.3,
          },
          timeLimit: 90,
          cecrLevel: 'B2',
        },
      ],
      passingScore: 70,
      certificateAvailable: true,
      isAdaptive: true,
      recognizedBy: ['Cambridge', 'TOEFL', 'IELTS', 'ETS'],
    },
    {
      id: 'eng-speaking-001',
      languageId: 'english',
      skillType: 'speaking',
      title: 'Anglais Expression Orale C1',
      description:
        "Évaluation avancée de l'expression orale avec IA de reconnaissance vocale et analyse de fluidité",
      duration: '25 minutes',
      questionsCount: 8,
      targetLevel: 'C1',
      rating: 5,
      reviews: 1203,
      skillsEvaluated: [
        'Prononciation',
        'Fluidité',
        'Vocabulaire avancé',
        'Argumentation',
        'Interaction',
      ],
      format: ['Speaking', 'Enregistrement', 'IA Analysis'],
      preview:
        'Describe your opinion on remote work and provide arguments to support your viewpoint.',
      questions: [
        {
          id: 'eng-s-q1',
          question:
            'Describe a challenging situation you faced at work and how you resolved it. You have 2 minutes to prepare and 3 minutes to speak.',
          type: 'speaking' as const,
          context:
            'This question evaluates your ability to narrate past experiences and explain problem-solving processes.',
          skillWeight: {
            Narration: 0.3,
            'Vocabulaire professionnel': 0.3,
            Fluidité: 0.2,
            Prononciation: 0.2,
          },
          timeLimit: 300,
          cecrLevel: 'C1',
        },
      ],
      passingScore: 75,
      certificateAvailable: true,
      isAdaptive: true,
      recognizedBy: [
        'Cambridge',
        'IELTS',
        'TOEFL',
        'Business English Certificate',
      ],
    },
    {
      id: 'eng-reading-001',
      languageId: 'english',
      skillType: 'reading',
      title: 'Anglais Compréhension Écrite B2-C1',
      description:
        'Test adaptatif de compréhension écrite avec textes académiques et professionnels',
      duration: '35 minutes',
      questionsCount: 30,
      targetLevel: 'B2',
      rating: 5,
      reviews: 2156,
      skillsEvaluated: [
        'Lecture analytique',
        'Vocabulaire spécialisé',
        'Inférences complexes',
        'Structure argumentative',
      ],
      format: ['Reading', 'QCM', 'Matching'],
      preview:
        'Read an article about sustainable business practices and answer comprehension questions.',
      questions: [
        {
          id: 'eng-r-q1',
          question:
            'According to the passage, what is the main challenge facing sustainable businesses?',
          type: 'reading_comprehension' as const,
          context:
            'Read the following passage about sustainable business practices.',
          readingText:
            "Sustainable business practices have become increasingly important in today's corporate landscape. Companies are facing mounting pressure from consumers, investors, and regulatory bodies to adopt environmentally responsible strategies. However, the transition to sustainable practices often requires significant upfront investments and may impact short-term profitability. Many organizations struggle to balance immediate financial pressures with long-term environmental goals. The most successful companies are those that view sustainability not as a cost center, but as an opportunity for innovation and competitive advantage. They invest in research and development to create eco-friendly products and processes that can reduce costs over time while meeting consumer demand for responsible business practices.",
          options: [
            {
              text: 'Lack of consumer interest in sustainable products',
              value: 'consumer_interest',
            },
            {
              text: 'Balancing short-term costs with long-term benefits',
              value: 'cost_balance',
            },
            {
              text: 'Insufficient government regulations',
              value: 'regulations',
            },
            {
              text: 'Limited availability of sustainable technologies',
              value: 'technology',
            },
          ],
          correctAnswer: 'cost_balance',
          skillWeight: {
            'Compréhension analytique': 0.5,
            Inférences: 0.3,
            'Vocabulaire business': 0.2,
          },
          timeLimit: 180,
          cecrLevel: 'B2',
        },
      ],
      passingScore: 70,
      certificateAvailable: true,
      isAdaptive: true,
      recognizedBy: ['Cambridge', 'TOEFL', 'IELTS'],
    },
    {
      id: 'eng-writing-001',
      languageId: 'english',
      skillType: 'writing',
      title: 'Anglais Expression Écrite B2',
      description:
        "Évaluation de l'expression écrite avec correction automatique IA et feedback détaillé",
      duration: '40 minutes',
      questionsCount: 3,
      targetLevel: 'B2',
      rating: 4,
      reviews: 1678,
      skillsEvaluated: [
        'Structure argumentative',
        'Grammaire avancée',
        'Vocabulaire précis',
        'Cohérence textuelle',
      ],
      format: ['Writing', 'Essay', 'IA Correction'],
      preview:
        "Write a formal email to propose a new initiative to your company's management team.",
      questions: [
        {
          id: 'eng-w-q1',
          question:
            'Write a formal business proposal (250-300 words) suggesting the implementation of a flexible working policy in your company. Include benefits, potential challenges, and proposed solutions.',
          type: 'writing' as const,
          context:
            'You are writing to the HR director of your company. Use formal business language and structure your proposal clearly.',
          minWords: 250,
          maxWords: 300,
          skillWeight: {
            'Structure formelle': 0.3,
            Argumentation: 0.3,
            Grammaire: 0.2,
            'Vocabulaire professionnel': 0.2,
          },
          timeLimit: 1200,
          cecrLevel: 'B2',
        },
      ],
      passingScore: 70,
      certificateAvailable: true,
      isAdaptive: false,
      recognizedBy: ['Cambridge', 'IELTS', 'Business English Certificate'],
    },
    {
      id: 'spa-listening-001',
      languageId: 'spanish',
      skillType: 'listening',
      title: 'Español Comprensión Auditiva B1',
      description:
        'Test de comprensión auditiva con acentos de España y América Latina',
      duration: '28 minutes',
      questionsCount: 22,
      targetLevel: 'B1',
      rating: 4,
      reviews: 934,
      skillsEvaluated: [
        'Comprensión global',
        'Detalles específicos',
        'Acentos variados',
        'Contexto cultural',
      ],
      format: ['Audio', 'Opción múltiple', 'Completar'],
      preview:
        'Escucha una conversación sobre planes de vacaciones y responde las preguntas.',
      questions: [],
      passingScore: 65,
      certificateAvailable: true,
      isAdaptive: true,
      recognizedBy: ['DELE', 'SIELE', 'Instituto Cervantes'],
    },
    {
      id: 'ger-speaking-001',
      languageId: 'german',
      skillType: 'speaking',
      title: 'Deutsch Sprechen A2-B1',
      description:
        "Évaluation de l'expression orale allemande avec reconnaissance vocale avancée",
      duration: '22 minutes',
      questionsCount: 6,
      targetLevel: 'A2',
      rating: 4,
      reviews: 567,
      skillsEvaluated: ['Aussprache', 'Wortschatz', 'Grammatik', 'Flüssigkeit'],
      format: ['Sprechen', 'Aufnahme', 'KI-Analyse'],
      preview: 'Beschreiben Sie Ihren typischen Arbeitstag und Ihre Hobbys.',
      questions: [],
      passingScore: 60,
      certificateAvailable: true,
      isAdaptive: true,
      recognizedBy: ['Goethe Institut', 'TestDaF', 'telc'],
    },
    {
      id: 'chi-integrated-001',
      languageId: 'chinese',
      skillType: 'integrated',
      title: '中文综合能力测试 HSK 4',
      description:
        'Test intégré de chinois mandarin niveau HSK 4 avec toutes les compétences',
      duration: '60 minutes',
      questionsCount: 40,
      targetLevel: 'B2',
      rating: 5,
      reviews: 1234,
      skillsEvaluated: ['听力', '阅读', '写作', '口语', '汉字识别'],
      format: ['综合', '听说读写', '汉字'],
      preview: '听一段关于中国文化的对话，然后回答问题。',
      questions: [],
      passingScore: 75,
      certificateAvailable: true,
      isAdaptive: true,
      recognizedBy: ['HSK', 'Confucius Institute', 'TOCFL'],
    },
  ],

  testResults: [
    {
      id: 'result-001',
      testId: 'eng-listening-001',
      overallScore: 84,
      cecrLevel: 'B2',
      summary:
        'Excellente compréhension orale avec une très bonne maîtrise des accents britannique et américain. Capacité à saisir les nuances et les sous-entendus dans les conversations professionnelles.',
      accuracy: 88,
      timeSpent: '27 minutes',
      skillScores: [
        {
          skill: 'Compréhension globale',
          score: 92,
          cecrLevel: 'C1',
          description:
            'Excellente capacité à comprendre le sens général des conversations',
        },
        {
          skill: 'Détails spécifiques',
          score: 85,
          cecrLevel: 'B2',
          description:
            'Bonne identification des informations précises et des données factuelles',
        },
        {
          skill: 'Inférences',
          score: 78,
          cecrLevel: 'B2',
          description:
            'Capacité correcte à déduire des informations implicites',
        },
        {
          skill: 'Accents variés',
          score: 81,
          cecrLevel: 'B2',
          description: 'Bonne adaptation aux différents accents anglophones',
        },
      ],
      strengths: [
        'Excellente compréhension du vocabulaire professionnel',
        'Très bonne adaptation aux accents britannique et américain',
        'Capacité à suivre des conversations rapides et naturelles',
        'Bonne compréhension des expressions idiomatiques courantes',
      ],
      improvements: [
        'Améliorer la compréhension des accents australien et sud-africain',
        "Développer la capacité à saisir l'ironie et l'humour subtil",
        "Renforcer la compréhension de l'argot et du langage familier",
        'Travailler sur la compréhension dans des environnements bruyants',
      ],
      learningPath: [
        {
          title: 'Podcasts Business Anglais',
          description:
            'Écoute quotidienne de podcasts professionnels pour améliorer la compréhension contextuelle',
          priority: 'high' as const,
          estimatedTime: '30 min/jour',
          type: 'Audio immersion',
          targetLevel: 'C1',
        },
        {
          title: 'Films et Séries V.O.',
          description:
            "Visionnage régulier de contenus audiovisuels pour s'habituer aux accents variés",
          priority: 'medium' as const,
          estimatedTime: '1h/jour',
          type: 'Divertissement éducatif',
          targetLevel: 'B2-C1',
        },
        {
          title: 'Conversations avec Natifs',
          description:
            'Sessions de conversation avec des locuteurs natifs de différentes régions',
          priority: 'high' as const,
          estimatedTime: '2h/semaine',
          type: 'Pratique orale',
          targetLevel: 'C1',
        },
        {
          title: 'Test IELTS Listening',
          description: 'Préparation spécifique au test IELTS section écoute',
          priority: 'low' as const,
          estimatedTime: '4 semaines',
          type: 'Préparation test',
          targetLevel: 'C1',
        },
      ],
      completedAt: '2024-01-15T16:45:00Z',
      certificateEarned: true,
      industryComparison: {
        percentile: 82,
        averageScore: 71,
        topPerformers: 89,
      },
    },
  ],

  userProgress: {
    completedTests: 15,
    averageLevel: 'B2',
    languagesStudied: 4,
    totalTimeSpent: '12h 45min',
    certificatesEarned: 9,
    strongestLanguages: ['Anglais', 'Espagnol', 'Italien'],
    improvementAreas: ['Allemand oral', 'Chinois écriture', 'Russe grammaire'],
    nextRecommendedTest: 'Anglais Expression Orale C1',
    skillsEvolution: [
      {
        language: 'Anglais',
        skill: 'Compréhension orale',
        previousLevel: 'B1',
        currentLevel: 'B2',
        trend: 'up' as const,
      },
      {
        language: 'Espagnol',
        skill: 'Expression écrite',
        previousLevel: 'A2',
        currentLevel: 'B1',
        trend: 'up' as const,
      },
      {
        language: 'Allemand',
        skill: 'Expression orale',
        previousLevel: 'A2',
        currentLevel: 'A2',
        trend: 'stable' as const,
      },
      {
        language: 'Italien',
        skill: 'Compréhension écrite',
        previousLevel: 'B1',
        currentLevel: 'B2',
        trend: 'up' as const,
      },
    ],
  },

  statistics: {
    totalLanguages: 25,
    totalTests: 156,
    activeUsers: 45670,
    certificatesIssued: 23450,
    averageCompletionTime: '32 minutes',
    successRate: 78,
    mostPopularLanguage: 'Anglais',
    mostPopularSkill: 'Compréhension orale',
    averageImprovement: '+1.2 niveaux CECRL/an',
  },

  aiTips: [
    "Pratiquez l'écoute active avec des contenus authentiques (podcasts, films, actualités)",
    'Enregistrez-vous régulièrement pour améliorer votre prononciation et fluidité',
    'Utilisez la technique de shadowing : répétez simultanément ce que vous entendez',
    'Créez un journal de vocabulaire avec des phrases contextuelles',
    'Fixez-vous des objectifs SMART pour chaque compétence linguistique',
    'Immergez-vous dans la culture de la langue pour mieux comprendre les nuances',
    'Pratiquez la médiation linguistique : expliquez des concepts dans la langue cible',
  ],

  certifications: [
    {
      id: 'cert-eng-001',
      name: 'Certificat Anglais Professionnel B2',
      description: 'Certifie un niveau B2 en anglais selon le CECRL',
      requirements: 'Score ≥ 70% dans toutes les compétences',
      validityPeriod: '2 ans',
      recognizedBy: ['Cambridge', 'TOEFL', 'IELTS', 'ETS'],
      industryValue: 'Très élevée',
      salaryImpact: '+15-25%',
    },
    {
      id: 'cert-spa-001',
      name: 'Certificat Espagnol DELE B1',
      description: 'Certification officielle DELE niveau B1',
      requirements: 'Score ≥ 65% au test intégré',
      validityPeriod: 'Vie entière',
      recognizedBy: ['Instituto Cervantes', 'DELE', 'SIELE'],
      industryValue: 'Élevée',
      salaryImpact: '+10-18%',
    },
    {
      id: 'cert-ger-001',
      name: 'Certificat Allemand Goethe A2',
      description: 'Certification Goethe Institut niveau A2',
      requirements: 'Score ≥ 60% dans toutes les compétences',
      validityPeriod: 'Vie entière',
      recognizedBy: ['Goethe Institut', 'TestDaF', 'telc'],
      industryValue: 'Élevée',
      salaryImpact: '+8-15%',
    },
    {
      id: 'cert-chi-001',
      name: 'Certificat Chinois HSK 4',
      description: 'Certification HSK niveau 4 (équivalent B2)',
      requirements: 'Score ≥ 75% au test HSK 4',
      validityPeriod: '2 ans',
      recognizedBy: ['HSK', 'Confucius Institute', 'Hanban'],
      industryValue: 'Exceptionnelle',
      salaryImpact: '+20-35%',
    },
  ],

  learningResources: [
    {
      id: 'resource-001',
      title: 'Guide Prononciation Anglaise',
      type: 'Audio interactif',
      duration: '2 heures',
      difficulty: 'Intermédiaire',
      description: 'Exercices de prononciation avec reconnaissance vocale IA',
      languages: ['Anglais'],
      rating: 5,
    },
    {
      id: 'resource-002',
      title: 'Grammaire Espagnole Avancée',
      type: 'Cours en ligne',
      duration: '6 heures',
      difficulty: 'Avancé',
      description: 'Maîtrise des temps complexes et du subjonctif',
      languages: ['Espagnol'],
      rating: 5,
    },
    {
      id: 'resource-003',
      title: 'Conversation Allemande Business',
      type: 'Simulation',
      duration: '4 heures',
      difficulty: 'Intermédiaire',
      description: 'Situations professionnelles en allemand',
      languages: ['Allemand'],
      rating: 4,
    },
    {
      id: 'resource-004',
      title: 'Caractères Chinois HSK 1-4',
      type: 'Application mobile',
      duration: '50 heures',
      difficulty: 'Débutant à Intermédiaire',
      description: 'Apprentissage progressif des caractères chinois',
      languages: ['Chinois'],
      rating: 5,
    },
  ],

  industryBenchmarks: {
    salaryImpact: {
      'Anglais C1': '+25-40%',
      'Anglais B2': '+15-25%',
      'Espagnol B2': '+12-20%',
      'Allemand B2': '+15-25%',
      'Chinois HSK 4': '+20-35%',
      'Japonais N2': '+18-30%',
      'Arabe B1': '+15-25%',
    },
    demandByIndustry: {
      'IT/Tech': ['Anglais', 'Chinois', 'Japonais'],
      Finance: ['Anglais', 'Allemand', 'Chinois'],
      Tourisme: ['Anglais', 'Espagnol', 'Italien'],
      'Commerce International': ['Anglais', 'Chinois', 'Arabe'],
      Diplomatie: ['Anglais', 'Français', 'Espagnol', 'Arabe'],
    },
    certificationValue: {
      'Cambridge C1': 'Référence mondiale',
      'TOEFL 100+': 'Standard universitaire',
      'IELTS 7+': 'Immigration/Études',
      'DELE B2+': 'Reconnaissance officielle',
      'HSK 5+': 'Emploi en Chine',
      'JLPT N2+': 'Travail au Japon',
    },
  },

  adaptiveTesting: {
    algorithm: 'Item Response Theory (IRT)',
    features: [
      'Ajustement automatique de la difficulté',
      'Réduction du temps de test de 40%',
      'Précision accrue de ±0.3 niveau CECRL',
      'Feedback immédiat sur les erreurs',
      'Parcours personnalisé selon les lacunes',
    ],
    accuracy: '94% de corrélation avec tests traditionnels',
    timeReduction: '40% plus rapide que les tests fixes',
  },

  voiceRecognition: {
    technology: 'Deep Learning Neural Networks',
    features: [
      'Reconnaissance multi-accents',
      'Analyse de la fluidité en temps réel',
      'Détection des erreurs de prononciation',
      "Évaluation de l'intonation",
      'Feedback correctif instantané',
    ],
    accuracy: '96% de précision phonétique',
    supportedAccents: ['US', 'UK', 'AU', 'CA', 'IN', 'ZA'],
    languages: 15,
  },
};
