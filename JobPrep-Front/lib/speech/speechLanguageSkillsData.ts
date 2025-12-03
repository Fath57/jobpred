export interface LanguageCallSession {
  id: string;
  type: 'web_call' | 'phone_call';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledAt: string;
  duration?: string;
  completedAt?: string;
  language: string;
  skillFocus: string;
  level: string;
  aiInterviewer: {
    name: string;
    personality: string;
    avatar: string;
    specialization: string[];
    nativeLanguage: string;
  };
}

export interface LanguageVoiceAnalysis {
  pronunciation: {
    score: number;
    level: string;
    description: string;
    strengths: string[];
    improvements: string[];
    phonemeAccuracy: number;
    stressPatterns: number;
    intonation: number;
  };
  fluency: {
    score: number;
    level: string;
    description: string;
    strengths: string[];
    improvements: string[];
    speechRate: number;
    hesitations: number;
    fillerWords: number;
    pauses: {
      appropriate: number;
      inappropriate: number;
    };
  };
  vocabulary: {
    score: number;
    level: string;
    description: string;
    strengths: string[];
    improvements: string[];
    range: number;
    appropriateness: number;
    idiomaticExpressions: number;
    specificTerminology: number;
  };
  grammar: {
    score: number;
    level: string;
    description: string;
    strengths: string[];
    improvements: string[];
    sentenceStructure: number;
    verbTenses: number;
    articles: number;
    prepositions: number;
    commonErrors: string[];
  };
  comprehension: {
    score: number;
    level: string;
    description: string;
    strengths: string[];
    improvements: string[];
    listeningAccuracy: number;
    responseRelevance: number;
    clarificationRequests: number;
    adaptability: number;
  };
  communicativeEffectiveness: {
    score: number;
    level: string;
    description: string;
    strengths: string[];
    improvements: string[];
    messageClarity: number;
    culturalAppropriateness: number;
    persuasiveness: number;
    engagement: number;
  };
}

export interface LanguageSessionReport {
  id: string;
  sessionId: string;
  overallScore: number;
  cefrLevel: string;
  estimatedLevel: string;
  duration: string;
  questionsAnswered: number;
  languagesUsed: string[];
  voiceAnalysis: LanguageVoiceAnalysis;
  strengths: string[];
  improvements: string[];
  detailedFeedback: {
    category: string;
    score: number;
    feedback: string;
    specificExamples: string[];
    recommendations: string[];
  }[];
  nextSteps: string[];
  recommendedPractice: {
    area: string;
    exercises: string[];
    estimatedTime: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  industryComparison: {
    yourScore: number;
    averageScore: number;
    topPerformers: number;
    percentile: number;
    businessImpact: string;
  };
  learningPath: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
    estimatedTimeToNextLevel: string;
  };
  certificateEarned: boolean;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  difficulty: string;
  businessImportance: number;
  globalSpeakers: string;
  regions: string[];
  industries: string[];
  careerImpact: string;
}

export interface SkillFocusArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: string;
  focusPoints: string[];
  scenarios: string[];
  businessValue: number;
}

export interface LanguageInterviewer {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  specialization: string[];
  nativeLanguage: string;
  accent: string;
  experience: string;
  rating: number;
  style: string;
  description: string;
}

export interface LanguageSlot {
  id: string;
  date: string;
  time: string;
  duration: string;
  aiInterviewer: string;
  language: string;
  focus: string;
  level: string;
  available: boolean;
  price: number;
}

export interface UserLanguageProgress {
  totalSessions: number;
  averageScore: number;
  currentLevel: string;
  totalTimeSpent: string;
  improvementRate: number;
  strongestLanguages: string[];
  strongestSkills: string[];
  improvementAreas: string[];
  nextRecommendedSession: string;
  languageEvolution: {
    language: string;
    date: string;
    score: number;
    level: string;
    improvement: number;
  }[];
  certificatesEarned: number;
}

export const speechLanguageSkillsData = {
  supportedLanguages: [
    {
      id: 'english',
      name: 'Anglais',
      nativeName: 'English',
      flag: '🇬🇧',
      difficulty: 'Modérée',
      businessImportance: 95,
      globalSpeakers: '1.5 milliard',
      regions: ['Amérique du Nord', 'Europe', 'Océanie', 'Asie du Sud'],
      industries: [
        'Tech',
        'Finance',
        'Consulting',
        'Sciences',
        'Commerce international',
      ],
      careerImpact: '+15-25% sur le salaire',
    },
    {
      id: 'spanish',
      name: 'Espagnol',
      nativeName: 'Español',
      flag: '🇪🇸',
      difficulty: 'Facile',
      businessImportance: 78,
      globalSpeakers: '550 millions',
      regions: ['Espagne', 'Amérique Latine', 'États-Unis'],
      industries: ['Tourisme', 'Commerce international', 'Éducation', 'Santé'],
      careerImpact: '+8-15% sur le salaire',
    },
    {
      id: 'german',
      name: 'Allemand',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      difficulty: 'Difficile',
      businessImportance: 82,
      globalSpeakers: '130 millions',
      regions: ['Allemagne', 'Autriche', 'Suisse', 'Europe centrale'],
      industries: ['Ingénierie', 'Automobile', 'Pharmaceutique', 'Finance'],
      careerImpact: '+10-20% sur le salaire',
    },
    {
      id: 'chinese',
      name: 'Chinois',
      nativeName: '中文',
      flag: '🇨🇳',
      difficulty: 'Très Difficile',
      businessImportance: 90,
      globalSpeakers: '1.3 milliard',
      regions: ['Chine', 'Taïwan', 'Singapour', 'Malaisie'],
      industries: [
        'Manufacturing',
        'Tech',
        'Commerce international',
        'Finance',
      ],
      careerImpact: '+15-30% sur le salaire',
    },
    {
      id: 'french',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
      difficulty: 'Modérée',
      businessImportance: 75,
      globalSpeakers: '280 millions',
      regions: ['France', 'Canada', 'Afrique', 'Belgique', 'Suisse'],
      industries: ['Luxe', 'Mode', 'Diplomatie', 'Aéronautique', 'Tourisme'],
      careerImpact: '+5-15% sur le salaire',
    },
    {
      id: 'japanese',
      name: 'Japonais',
      nativeName: '日本語',
      flag: '🇯🇵',
      difficulty: 'Très Difficile',
      businessImportance: 72,
      globalSpeakers: '125 millions',
      regions: ['Japon'],
      industries: ['Tech', 'Automobile', 'Électronique', 'Jeux vidéo'],
      careerImpact: '+10-25% sur le salaire',
    },
  ],

  skillFocusAreas: [
    {
      id: 'business-communication',
      name: 'Communication Professionnelle',
      description:
        'Maîtrisez le langage des affaires et les interactions professionnelles',
      icon: 'Briefcase',
      color: 'bg-blue-500',
      duration: '30-45 minutes',
      difficulty: 'Intermédiaire',
      focusPoints: [
        'Vocabulaire business',
        'Emails professionnels',
        "Appels d'affaires",
        'Négociation',
        'Présentations',
      ],
      scenarios: [
        "Réunion d'équipe",
        'Appel client',
        'Négociation commerciale',
        'Présentation projet',
      ],
      businessValue: 95,
    },
    {
      id: 'interview-preparation',
      name: 'Préparation Entretien',
      description:
        "Perfectionnez votre expression pour réussir vos entretiens d'embauche",
      icon: 'Users',
      color: 'bg-emerald-500',
      duration: '40-50 minutes',
      difficulty: 'Avancé',
      focusPoints: [
        'Présentation personnelle',
        'Expériences professionnelles',
        'Compétences techniques',
        'Questions/réponses',
      ],
      scenarios: [
        'Entretien RH',
        'Entretien technique',
        'Questions pièges',
        'Négociation salariale',
      ],
      businessValue: 90,
    },
    {
      id: 'presentation-skills',
      name: 'Compétences de Présentation',
      description:
        'Développez votre aisance pour les présentations et discours en public',
      icon: 'Presentation',
      color: 'bg-purple-500',
      duration: '35-45 minutes',
      difficulty: 'Avancé',
      focusPoints: [
        'Structure du discours',
        "Engagement de l'audience",
        'Gestion du temps',
        'Questions/réponses',
      ],
      scenarios: [
        'Présentation projet',
        'Pitch commercial',
        'Conférence',
        'Formation',
      ],
      businessValue: 85,
    },
    {
      id: 'everyday-conversation',
      name: 'Conversation Quotidienne',
      description:
        'Améliorez votre aisance dans les interactions sociales et informelles',
      icon: 'MessageCircle',
      color: 'bg-amber-500',
      duration: '25-35 minutes',
      difficulty: 'Débutant',
      focusPoints: [
        'Small talk',
        'Expressions idiomatiques',
        'Culture',
        'Situations sociales',
      ],
      scenarios: [
        'Rencontre sociale',
        "Déjeuner d'affaires",
        'Networking',
        "Voyage d'affaires",
      ],
      businessValue: 75,
    },
    {
      id: 'technical-communication',
      name: 'Communication Technique',
      description:
        'Perfectionnez votre capacité à expliquer des concepts techniques complexes',
      icon: 'Code',
      color: 'bg-red-500',
      duration: '40-55 minutes',
      difficulty: 'Expert',
      focusPoints: [
        'Vocabulaire technique',
        'Explication de concepts',
        'Documentation',
        'Vulgarisation',
      ],
      scenarios: [
        'Présentation technique',
        'Formation client',
        'Support technique',
        'Documentation',
      ],
      businessValue: 88,
    },
  ],

  aiInterviewers: [
    {
      id: 'emma-english',
      name: 'Emma Watson',
      personality: 'Professionnelle et encourageante',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Business English',
        'Interview Preparation',
        'Presentation Skills',
      ],
      nativeLanguage: 'English',
      accent: 'British (RP)',
      experience: "8+ ans d'enseignement",
      rating: 4.9,
      style: 'Structuré et méthodique',
      description:
        "Spécialiste de l'anglais des affaires avec accent britannique standard",
    },
    {
      id: 'michael-english',
      name: 'Michael Johnson',
      personality: 'Dynamique et direct',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['Technical English', 'Negotiation', 'Public Speaking'],
      nativeLanguage: 'English',
      accent: 'American (General)',
      experience: '10+ ans en formation corporate',
      rating: 4.8,
      style: 'Pragmatique et orienté résultats',
      description:
        'Expert en anglais technique et négociation avec accent américain',
    },
    {
      id: 'sofia-spanish',
      name: 'Sofía Rodríguez',
      personality: 'Chaleureuse et patiente',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Business Spanish',
        'Cultural Context',
        'Conversational Fluency',
      ],
      nativeLanguage: 'Español',
      accent: 'Spain (Madrid)',
      experience: "7+ ans d'enseignement",
      rating: 4.9,
      style: 'Immersif et contextuel',
      description: 'Experte en espagnol des affaires avec accent castillan',
    },
    {
      id: 'hans-german',
      name: 'Hans Mueller',
      personality: 'Méthodique et précis',
      avatar:
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Technical German',
        'Business Communication',
        'Industry Terminology',
      ],
      nativeLanguage: 'Deutsch',
      accent: 'Standard German',
      experience: '12+ ans en formation technique',
      rating: 4.7,
      style: 'Structuré et approfondi',
      description: "Spécialiste de l'allemand technique et industriel",
    },
    {
      id: 'liu-chinese',
      name: 'Liu Wei',
      personality: 'Patiente et méthodique',
      avatar:
        'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Business Mandarin',
        'Cultural Etiquette',
        'Negotiation',
      ],
      nativeLanguage: '中文',
      accent: 'Standard Mandarin',
      experience: "9+ ans d'enseignement",
      rating: 4.8,
      style: 'Progressif et culturel',
      description: 'Experte en mandarin des affaires et protocole culturel',
    },
    {
      id: 'pierre-french',
      name: 'Pierre Dubois',
      personality: 'Élégant et précis',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Business French',
        'Diplomatic Language',
        'Cultural Nuances',
      ],
      nativeLanguage: 'Français',
      accent: 'Standard French',
      experience: '15+ ans en formation diplomatique',
      rating: 4.9,
      style: 'Raffiné et nuancé',
      description:
        'Expert en français des affaires et communication diplomatique',
    },
  ],

  availableSlots: [
    {
      id: 'lang-slot-001',
      date: '2024-01-16',
      time: '09:00',
      duration: '45 minutes',
      aiInterviewer: 'Emma Watson',
      language: 'English',
      focus: 'Business Communication',
      level: 'B2',
      available: true,
      price: 55,
    },
    {
      id: 'lang-slot-002',
      date: '2024-01-16',
      time: '11:30',
      duration: '30 minutes',
      aiInterviewer: 'Michael Johnson',
      language: 'English',
      focus: 'Interview Preparation',
      level: 'C1',
      available: true,
      price: 45,
    },
    {
      id: 'lang-slot-003',
      date: '2024-01-16',
      time: '14:00',
      duration: '40 minutes',
      aiInterviewer: 'Sofía Rodríguez',
      language: 'Español',
      focus: 'Everyday Conversation',
      level: 'B1',
      available: true,
      price: 50,
    },
    {
      id: 'lang-slot-004',
      date: '2024-01-17',
      time: '10:00',
      duration: '50 minutes',
      aiInterviewer: 'Hans Mueller',
      language: 'Deutsch',
      focus: 'Technical Communication',
      level: 'B2',
      available: true,
      price: 60,
    },
    {
      id: 'lang-slot-005',
      date: '2024-01-17',
      time: '13:30',
      duration: '45 minutes',
      aiInterviewer: 'Liu Wei',
      language: '中文',
      focus: 'Business Communication',
      level: 'A2',
      available: false,
      price: 65,
    },
    {
      id: 'lang-slot-006',
      date: '2024-01-18',
      time: '09:30',
      duration: '40 minutes',
      aiInterviewer: 'Pierre Dubois',
      language: 'Français',
      focus: 'Presentation Skills',
      level: 'C1',
      available: true,
      price: 55,
    },
  ],

  callSessions: [
    {
      id: 'lang-session-001',
      type: 'web_call',
      status: 'completed',
      scheduledAt: '2024-01-15T11:00:00Z',
      duration: '42 minutes',
      completedAt: '2024-01-15T11:42:00Z',
      language: 'English',
      skillFocus: 'Business Communication',
      level: 'B2',
      aiInterviewer: {
        name: 'Emma Watson',
        personality: 'Professionnelle et encourageante',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['Business English', 'Interview Preparation'],
        nativeLanguage: 'English',
      },
    },
    {
      id: 'lang-session-002',
      type: 'phone_call',
      status: 'scheduled',
      scheduledAt: '2024-01-17T14:30:00Z',
      language: 'Español',
      skillFocus: 'Everyday Conversation',
      level: 'B1',
      aiInterviewer: {
        name: 'Sofía Rodríguez',
        personality: 'Chaleureuse et patiente',
        avatar:
          'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['Conversational Spanish', 'Cultural Context'],
        nativeLanguage: 'Español',
      },
    },
  ],

  sessionReports: [
    {
      id: 'lang-report-001',
      sessionId: 'lang-session-001',
      overallScore: 82,
      cefrLevel: 'B2',
      estimatedLevel: 'Upper Intermediate',
      duration: '42 minutes',
      questionsAnswered: 18,
      languagesUsed: ['English'],
      voiceAnalysis: {
        pronunciation: {
          score: 78,
          level: 'Good',
          description:
            "Bonne prononciation générale avec quelques difficultés sur certains sons spécifiques. Accent non-natif perceptible mais n'entravant pas la compréhension.",
          strengths: [
            'Excellente prononciation des voyelles courtes',
            'Bonne maîtrise des consonnes plosives (p, t, k)',
            'Intonation naturelle dans les questions',
            'Rythme généralement approprié',
          ],
          improvements: [
            'Travailler le son /θ/ (th) comme dans "think"',
            'Améliorer la distinction entre /i:/ et /ɪ/ (sheep vs ship)',
            'Renforcer la prononciation du son /r/ en position finale',
            'Travailler les liaisons entre les mots',
          ],
          phonemeAccuracy: 82,
          stressPatterns: 75,
          intonation: 79,
        },
        fluency: {
          score: 84,
          level: 'Very Good',
          description:
            "Très bonne fluidité avec un débit naturel et peu d'hésitations. Capacité à maintenir un discours continu même sur des sujets complexes.",
          strengths: [
            'Débit de parole naturel et régulier',
            "Peu d'hésitations sur les sujets familiers",
            'Bonnes transitions entre les idées',
            "Utilisation efficace des pauses pour l'effet",
          ],
          improvements: [
            'Réduire les hésitations sur les sujets techniques',
            'Diminuer l\'usage de mots de remplissage ("um", "like")',
            'Améliorer la fluidité lors des explications complexes',
            'Développer des stratégies pour gagner du temps',
          ],
          speechRate: 145,
          hesitations: 12,
          fillerWords: 15,
          pauses: {
            appropriate: 85,
            inappropriate: 15,
          },
        },
        vocabulary: {
          score: 86,
          level: 'Advanced',
          description:
            "Vocabulaire riche et varié, particulièrement dans le domaine professionnel. Bonne utilisation de collocations et d'expressions idiomatiques.",
          strengths: [
            'Excellent vocabulaire business',
            'Bonnes collocations professionnelles',
            'Usage approprié de phrasal verbs courants',
            'Capacité à paraphraser efficacement',
          ],
          improvements: [
            'Élargir le vocabulaire des nuances émotionnelles',
            "Développer plus d'expressions idiomatiques",
            'Renforcer le vocabulaire technique spécifique',
            'Varier davantage les adjectifs descriptifs',
          ],
          range: 85,
          appropriateness: 90,
          idiomaticExpressions: 78,
          specificTerminology: 92,
        },
        grammar: {
          score: 80,
          level: 'Good',
          description:
            "Bonne maîtrise grammaticale avec quelques erreurs occasionnelles qui n'entravent pas la communication. Structure de phrase généralement correcte.",
          strengths: [
            'Bonne maîtrise des temps du présent et du passé',
            'Utilisation correcte des modaux',
            'Structure des phrases affirmatives bien maîtrisée',
            'Bon usage des articles dans la plupart des cas',
          ],
          improvements: [
            "Renforcer l'usage du present perfect vs past simple",
            'Améliorer la concordance des temps dans le discours indirect',
            'Travailler les structures conditionnelles complexes',
            'Attention aux prépositions avec certains verbes',
          ],
          sentenceStructure: 85,
          verbTenses: 78,
          articles: 82,
          prepositions: 75,
          commonErrors: [
            'Confusion entre "since" et "for"',
            'Omission occasionnelle du -s à la 3e personne',
            'Erreurs sur les verbes irréguliers peu fréquents',
            "Confusion dans l'ordre des adjectifs",
          ],
        },
        comprehension: {
          score: 88,
          level: 'Very Good',
          description:
            'Excellente compréhension des questions et instructions. Capacité à suivre des conversations à vitesse normale avec peu de demandes de clarification.',
          strengths: [
            'Compréhension précise des questions complexes',
            'Bonne adaptation aux accents différents',
            'Excellente saisie des nuances et sous-entendus',
            'Réponses pertinentes montrant une bonne compréhension',
          ],
          improvements: [
            'Améliorer la compréhension du langage familier',
            'Renforcer la compréhension des accents régionaux',
            'Développer la compréhension du jargon spécialisé',
            "Pratiquer l'écoute à vitesse rapide",
          ],
          listeningAccuracy: 90,
          responseRelevance: 92,
          clarificationRequests: 4,
          adaptability: 85,
        },
        communicativeEffectiveness: {
          score: 85,
          level: 'Very Good',
          description:
            "Communication globalement efficace avec une bonne capacité à transmettre des idées complexes et à maintenir l'engagement de l'interlocuteur.",
          strengths: [
            'Messages clairs et bien structurés',
            'Bonne adaptation au contexte professionnel',
            "Capacité à reformuler en cas d'incompréhension",
            'Communication non-verbale cohérente (pour les appels vidéo)',
          ],
          improvements: [
            'Développer des techniques de persuasion plus sophistiquées',
            "Améliorer la précision dans les nuances d'opinion",
            "Renforcer l'impact des conclusions et appels à l'action",
            "Travailler sur l'engagement émotionnel de l'interlocuteur",
          ],
          messageClarity: 88,
          culturalAppropriateness: 85,
          persuasiveness: 80,
          engagement: 87,
        },
      },
      strengths: [
        'Excellente fluidité dans les discussions professionnelles',
        'Vocabulaire business riche et précis',
        'Très bonne compréhension des questions complexes',
        'Communication claire et structurée',
        'Bonne capacité à reformuler et clarifier',
        'Intonation naturelle et engageante',
      ],
      improvements: [
        'Perfectionner la prononciation de certains sons spécifiques',
        'Réduire les hésitations sur les sujets techniques',
        'Renforcer la maîtrise des structures grammaticales complexes',
        'Élargir le vocabulaire idiomatique et les expressions natives',
        'Améliorer la précision des prépositions',
      ],
      detailedFeedback: [
        {
          category: 'Business Communication',
          score: 87,
          feedback:
            'Excellente capacité à communiquer efficacement dans un contexte professionnel. Votre vocabulaire business est précis et votre structure argumentative est claire.',
          specificExamples: [
            'Présentation convaincante du projet marketing (min 12:30)',
            'Négociation efficace des conditions contractuelles (min 18:45)',
            'Explication claire des avantages concurrentiels (min 25:10)',
          ],
          recommendations: [
            'Pratiquer davantage les situations de négociation complexes',
            'Développer un vocabulaire plus nuancé pour les feedbacks délicats',
            'Renforcer les techniques de persuasion avancées',
          ],
        },
        {
          category: 'Technical Vocabulary',
          score: 82,
          feedback:
            'Bon niveau de vocabulaire technique avec quelques lacunes dans certains domaines spécialisés. Capacité à expliquer des concepts techniques de manière claire.',
          specificExamples: [
            "Explication précise du processus d'implémentation IT",
            'Bonne utilisation des termes financiers appropriés',
            'Quelques hésitations sur le vocabulaire marketing digital',
          ],
          recommendations: [
            'Élargir le vocabulaire technique dans le domaine du marketing digital',
            "Pratiquer l'explication de concepts techniques à différents niveaux",
            'Créer un glossaire personnel des termes spécialisés',
          ],
        },
        {
          category: 'Cultural Appropriateness',
          score: 79,
          feedback:
            'Bonne sensibilité culturelle générale avec quelques points à améliorer pour les contextes internationaux très formels.',
          specificExamples: [
            "Adaptation appropriée du niveau de formalité selon l'interlocuteur",
            'Utilisation correcte des formules de politesse',
            'Quelques expressions trop directes pour certains contextes culturels',
          ],
          recommendations: [
            'Étudier les nuances culturelles des pays anglophones',
            'Pratiquer les différents niveaux de formalité selon les cultures',
            "Développer un répertoire d'expressions diplomatiques",
          ],
        },
      ],
      nextSteps: [
        'Pratiquer régulièrement avec des podcasts business en anglais',
        'Suivre un cours ciblé sur la prononciation des sons difficiles',
        'Élargir le vocabulaire idiomatique avec des ressources authentiques',
        'Planifier un entretien de niveau C1 dans 2 mois',
        'Pratiquer les présentations formelles en anglais',
      ],
      recommendedPractice: [
        {
          area: 'Prononciation',
          exercises: [
            'Exercices ciblés sur les sons /θ/ et /ð/',
            'Enregistrement et analyse de votre prononciation',
            'Shadowing avec des locuteurs natifs',
            'Pratique des paires minimales (ship/sheep, etc.)',
          ],
          estimatedTime: '15 min/jour pendant 4 semaines',
          priority: 'high',
        },
        {
          area: 'Grammaire avancée',
          exercises: [
            'Exercices sur les conditionnels mixtes',
            'Pratique du discours indirect',
            'Révision des prépositions avec certains verbes',
            'Exercices sur les structures complexes',
          ],
          estimatedTime: '30 min/jour pendant 6 semaines',
          priority: 'medium',
        },
        {
          area: 'Vocabulaire idiomatique',
          exercises: [
            'Apprentissage de 5 expressions idiomatiques par semaine',
            'Visionnage de séries en VO avec focus sur les expressions',
            'Utilisation active des expressions dans la conversation',
            "Journal d'expressions nouvelles",
          ],
          estimatedTime: '20 min/jour pendant 8 semaines',
          priority: 'medium',
        },
      ],
      industryComparison: {
        yourScore: 82,
        averageScore: 74,
        topPerformers: 90,
        percentile: 78,
        businessImpact:
          'Niveau suffisant pour la plupart des postes internationaux',
      },
      learningPath: {
        shortTerm: [
          'Perfectionner la prononciation des sons spécifiques',
          'Réduire les hésitations et mots de remplissage',
          'Maîtriser les structures grammaticales complexes',
        ],
        mediumTerm: [
          'Développer un vocabulaire idiomatique riche',
          'Améliorer la fluidité dans les discussions techniques',
          'Perfectionner les techniques de persuasion',
        ],
        longTerm: [
          'Atteindre le niveau C1 complet',
          'Développer une aisance proche du locuteur natif',
          'Maîtriser les subtilités culturelles des différents pays anglophones',
        ],
        estimatedTimeToNextLevel: '6-8 mois pour C1 avec pratique régulière',
      },
      certificateEarned: true,
    },
  ],

  userProgress: {
    totalSessions: 7,
    averageScore: 79,
    currentLevel: 'B2',
    totalTimeSpent: '4h 15min',
    improvementRate: 14,
    strongestLanguages: ['Anglais', 'Espagnol'],
    strongestSkills: [
      'Compréhension orale',
      'Vocabulaire business',
      'Communication informelle',
    ],
    improvementAreas: [
      'Prononciation avancée',
      'Grammaire complexe',
      'Expressions idiomatiques',
    ],
    nextRecommendedSession: 'English Business Presentation',
    languageEvolution: [
      {
        language: 'English',
        date: '2024-01-15',
        score: 82,
        level: 'B2',
        improvement: 7,
      },
      {
        language: 'English',
        date: '2024-01-05',
        score: 75,
        level: 'B1+',
        improvement: 5,
      },
      {
        language: 'Español',
        date: '2024-01-10',
        score: 68,
        level: 'B1',
        improvement: 8,
      },
    ],
    certificatesEarned: 3,
  },

  statistics: {
    totalSessions: 12450,
    averageScore: 74,
    averageImprovement: 12,
    mostPopularLanguage: 'English',
    mostPopularFocus: 'Business Communication',
    averageDuration: '38 minutes',
    successRate: 92,
    userSatisfaction: 4.8,
    businessImpactReported: '+18% opportunités professionnelles',
  },

  languageTips: [
    'Écoutez régulièrement des podcasts ou regardez des séries dans la langue cible',
    'Pratiquez 15 minutes par jour plutôt que 2 heures une fois par semaine',
    'Enregistrez-vous pour identifier vos erreurs de prononciation récurrentes',
    'Utilisez des applications de flashcards pour mémoriser du vocabulaire',
    'Trouvez un partenaire linguistique pour des échanges réguliers',
    'Lisez à voix haute pour améliorer simultanément prononciation et compréhension',
    'Apprenez des phrases complètes plutôt que des mots isolés',
  ],

  cefrLevels: {
    A1: {
      description: 'Niveau débutant ou découverte',
      canDo: [
        'Comprendre des phrases simples',
        'Se présenter',
        'Poser des questions basiques',
      ],
      businessUse: 'Interactions très basiques, voyage occasionnel',
    },
    A2: {
      description: 'Niveau élémentaire ou de survie',
      canDo: [
        'Conversations simples',
        'Décrire son environnement',
        'Exprimer des besoins immédiats',
      ],
      businessUse: 'Échanges simples, emails basiques, accueil',
    },
    B1: {
      description: 'Niveau intermédiaire ou seuil',
      canDo: [
        'Comprendre les points essentiels',
        'Produire un discours simple',
        'Raconter expériences et événements',
      ],
      businessUse: 'Réunions simples, emails standards, appels structurés',
    },
    B2: {
      description: 'Niveau intermédiaire avancé ou indépendant',
      canDo: [
        'Comprendre le contenu complexe',
        'Communiquer avec spontanéité',
        'Exprimer un avis détaillé',
      ],
      businessUse: "Négociations, présentations, management d'équipe",
    },
    C1: {
      description: 'Niveau avancé ou autonome',
      canDo: [
        'Comprendre textes longs et exigeants',
        "S'exprimer spontanément",
        'Utiliser la langue de façon efficace et souple',
      ],
      businessUse:
        'Négociations complexes, présentations stratégiques, leadership',
    },
    C2: {
      description: 'Niveau maîtrise ou expert',
      canDo: [
        'Comprendre sans effort',
        "S'exprimer avec précision et nuance",
        'Reformuler avec aisance',
      ],
      businessUse: 'Tous contextes professionnels, niveau quasi-natif',
    },
  },

  businessImpact: {
    salaryIncrease: {
      B1: '+5-10%',
      B2: '+10-20%',
      C1: '+15-30%',
      C2: '+20-40%',
    },
    careerOpportunities: {
      B1: 'Postes avec interactions internationales occasionnelles',
      B2: 'Postes dans des équipes internationales, management intermédiaire',
      C1: 'Management senior, négociations internationales, expatriation',
      C2: "Direction internationale, représentation, diplomatie d'entreprise",
    },
    industryAdvantage: {
      Tech: ['English', 'Chinese', 'Japanese'],
      Finance: ['English', 'German', 'Chinese'],
      Luxury: ['French', 'Italian', 'Chinese'],
      Manufacturing: ['German', 'Chinese', 'Japanese'],
      Tourism: ['English', 'Spanish', 'French'],
    },
  },

  pricing: {
    webCall: {
      basic: {
        price: 45,
        duration: '30 min',
        features: [
          'Rapport linguistique',
          'IA native',
          'Analyse prononciation',
        ],
      },
      business: {
        price: 65,
        duration: '45 min',
        features: [
          'Rapport détaillé',
          'IA spécialisée business',
          "Plan d'amélioration",
        ],
      },
      premium: {
        price: 85,
        duration: '60 min',
        features: [
          'Rapport complet',
          'IA expert sectoriel',
          'Coaching personnalisé',
        ],
      },
    },
    phoneCall: {
      basic: {
        price: 40,
        duration: '30 min',
        features: ['Rapport linguistique', 'IA native', 'Focus audio'],
      },
      business: {
        price: 60,
        duration: '45 min',
        features: [
          'Rapport détaillé',
          'IA spécialisée business',
          "Plan d'amélioration",
        ],
      },
      premium: {
        price: 80,
        duration: '60 min',
        features: [
          'Rapport complet',
          'IA expert sectoriel',
          'Coaching personnalisé',
        ],
      },
    },
  },
};
