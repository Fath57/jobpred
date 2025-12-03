export interface CallSession {
  id: string;
  type: 'web_call' | 'phone_call';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledAt: string;
  duration?: string;
  completedAt?: string;
  interviewType: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  aiInterviewer: {
    name: string;
    personality: string;
    avatar: string;
    specialization: string[];
  };
}

export interface VoiceAnalysis {
  assertiveness: {
    score: number;
    level: string;
    description: string;
    examples: string[];
    improvements: string[];
  };
  tone: {
    score: number;
    dominantTone: string;
    toneVariation: number;
    appropriateness: number;
    description: string;
    timeline: {
      timestamp: string;
      tone: string;
      confidence: number;
    }[];
  };
  emotion: {
    score: number;
    emotionalStability: number;
    confidence: number;
    stress: number;
    enthusiasm: number;
    description: string;
    emotionalJourney: {
      timestamp: string;
      emotion: string;
      intensity: number;
    }[];
  };
  speechPattern: {
    pace: {
      score: number;
      wordsPerMinute: number;
      optimal: boolean;
      description: string;
    };
    clarity: {
      score: number;
      articulation: number;
      pronunciation: number;
      description: string;
    };
    fluency: {
      score: number;
      hesitations: number;
      fillerWords: number;
      description: string;
    };
  };
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  expectedDuration: string;
  evaluationCriteria: string[];
  tips: string[];
}

export interface SessionReport {
  id: string;
  sessionId: string;
  overallScore: number;
  duration: string;
  questionsAnswered: number;
  voiceAnalysis: VoiceAnalysis;
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
  comparisonData: {
    yourScore: number;
    averageScore: number;
    topPerformers: number;
    percentile: number;
  };
  improvementPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export interface AvailableSlot {
  id: string;
  date: string;
  time: string;
  duration: string;
  aiInterviewer: string;
  difficulty: string;
  available: boolean;
}

export interface UserProgress {
  totalSessions: number;
  averageScore: number;
  currentLevel: string;
  totalTimeSpent: string;
  improvementRate: number;
  strongestAreas: string[];
  improvementAreas: string[];
  nextRecommendedSession: string;
  sessionsHistory: {
    date: string;
    score: number;
    improvement: number;
    focus: string;
  }[];
}

export const speechSoftSkillsData = {
  availableSlots: [
    {
      id: 'slot-001',
      date: '2024-01-16',
      time: '09:00',
      duration: '30 minutes',
      aiInterviewer: 'Sarah AI',
      difficulty: 'Intermédiaire',
      available: true,
    },
    {
      id: 'slot-002',
      date: '2024-01-16',
      time: '10:30',
      duration: '45 minutes',
      aiInterviewer: 'Marcus AI',
      difficulty: 'Avancé',
      available: true,
    },
    {
      id: 'slot-003',
      date: '2024-01-16',
      time: '14:00',
      duration: '30 minutes',
      aiInterviewer: 'Emma AI',
      difficulty: 'Débutant',
      available: true,
    },
    {
      id: 'slot-004',
      date: '2024-01-17',
      time: '09:30',
      duration: '60 minutes',
      aiInterviewer: 'David AI',
      difficulty: 'Expert',
      available: true,
    },
    {
      id: 'slot-005',
      date: '2024-01-17',
      time: '11:00',
      duration: '30 minutes',
      aiInterviewer: 'Sarah AI',
      difficulty: 'Intermédiaire',
      available: false,
    },
    {
      id: 'slot-006',
      date: '2024-01-17',
      time: '15:30',
      duration: '45 minutes',
      aiInterviewer: 'Lisa AI',
      difficulty: 'Avancé',
      available: true,
    },
  ],

  aiInterviewers: [
    {
      id: 'deborah-ai',
      name: 'Déborah AI',
      personality: 'Empathique et encourageante',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Communication interpersonnelle',
        "Gestion d'équipe",
        'Résolution de conflits',
      ],
      description:
        "Spécialisée dans l'évaluation des compétences relationnelles et de communication",
      experience: '5000+ entretiens',
      rating: 4.9,
      languages: ['Français', 'Anglais'],
      style: 'Bienveillant et constructif',
    },
    {
      id: 'isaac-ai',
      name: 'Isaac AI',
      personality: 'Direct et analytique',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['Leadership', 'Prise de décision', 'Gestion de crise'],
      description:
        'Expert en évaluation du leadership et des compétences managériales',
      experience: '4500+ entretiens',
      rating: 4.8,
      languages: ['Français', 'Anglais', 'Allemand'],
      style: 'Challengeant et précis',
    },
    {
      id: 'maeva-ai',
      name: 'Maeva AI',
      personality: 'Patiente et pédagogue',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Développement personnel',
        'Confiance en soi',
        'Présentation',
      ],
      description:
        'Idéale pour les débutants, focus sur le développement de la confiance',
      experience: '3200+ entretiens',
      rating: 4.9,
      languages: ['Français', 'Anglais'],
      style: 'Encourageant et progressif',
    },
    {
      id: 'david-ai',
      name: 'David AI',
      personality: 'Exigeant et expert',
      avatar:
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Négociation avancée',
        'Stratégie',
        'Leadership exécutif',
      ],
      description: "Pour les profils expérimentés cherchant l'excellence",
      experience: '6000+ entretiens',
      rating: 4.7,
      languages: ['Français', 'Anglais', 'Espagnol'],
      style: 'Rigoureux et perfectionniste',
    },
    {
      id: 'lisa-ai',
      name: 'Lisa AI',
      personality: 'Créative et inspirante',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['Innovation', 'Créativité', 'Pensée design'],
      description:
        "Spécialisée dans l'évaluation de la créativité et de l'innovation",
      experience: '3800+ entretiens',
      rating: 4.8,
      languages: ['Français', 'Anglais', 'Italien'],
      style: 'Inspirant et créatif',
    },
  ],

  interviewTypes: [
    {
      id: 'communication-basic',
      name: 'Communication Interpersonnelle',
      description: 'Évaluation des compétences de base en communication',
      duration: '30 minutes',
      difficulty: 'Débutant',
      questionsCount: 8,
      focusAreas: ['Écoute active', 'Expression claire', 'Empathie'],
      recommendedFor: [
        'Premiers entretiens',
        'Développement personnel',
        'Confiance en soi',
      ],
    },
    {
      id: 'leadership-advanced',
      name: 'Leadership et Management',
      description: 'Test approfondi des compétences de leadership',
      duration: '45 minutes',
      difficulty: 'Avancé',
      questionsCount: 12,
      focusAreas: [
        'Vision stratégique',
        "Motivation d'équipe",
        'Prise de décision',
      ],
      recommendedFor: [
        'Postes de management',
        "Direction d'équipe",
        'Transformation',
      ],
    },
    {
      id: 'conflict-resolution',
      name: 'Gestion des Conflits',
      description:
        'Évaluation de la capacité à gérer les situations difficiles',
      duration: '35 minutes',
      difficulty: 'Intermédiaire',
      questionsCount: 10,
      focusAreas: ['Médiation', 'Négociation', 'Diplomatie'],
      recommendedFor: ['RH', 'Management', 'Service client'],
    },
    {
      id: 'presentation-skills',
      name: 'Compétences de Présentation',
      description:
        "Test de l'aisance à l'oral et de la capacité de présentation",
      duration: '40 minutes',
      difficulty: 'Intermédiaire',
      questionsCount: 6,
      focusAreas: [
        'Prise de parole',
        'Structure du discours',
        'Gestion du stress',
      ],
      recommendedFor: ['Commercial', 'Consultant', 'Formation'],
    },
    {
      id: 'executive-presence',
      name: 'Présence Exécutive',
      description: "Évaluation de la présence et de l'autorité naturelle",
      duration: '60 minutes',
      difficulty: 'Expert',
      questionsCount: 15,
      focusAreas: ['Charisme', 'Influence', 'Vision stratégique'],
      recommendedFor: ['Direction générale', 'C-level', 'Board'],
    },
  ],

  callSessions: [
    {
      id: 'session-001',
      type: 'web_call' as const,
      status: 'completed' as const,
      scheduledAt: '2024-01-15T14:00:00Z',
      duration: '32 minutes',
      completedAt: '2024-01-15T14:32:00Z',
      interviewType: 'Communication Interpersonnelle',
      difficulty: 'Intermédiaire' as const,
      aiInterviewer: {
        name: 'Sarah AI',
        personality: 'Empathique et encourageante',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['Communication', 'Empathie', 'Écoute active'],
      },
    },
    {
      id: 'session-002',
      type: 'phone_call' as const,
      status: 'scheduled' as const,
      scheduledAt: '2024-01-17T10:00:00Z',
      interviewType: 'Leadership et Management',
      difficulty: 'Avancé' as const,
      aiInterviewer: {
        name: 'Marcus AI',
        personality: 'Direct et analytique',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['Leadership', 'Management', 'Stratégie'],
      },
    },
  ],

  sessionReports: [
    {
      id: 'report-001',
      sessionId: 'session-001',
      overallScore: 82,
      duration: '32 minutes',
      questionsAnswered: 8,
      voiceAnalysis: {
        assertiveness: {
          score: 78,
          level: 'Bon',
          description:
            "Vous montrez une assertivité appropriée avec quelques moments d'hésitation. Votre capacité à exprimer vos opinions est solide.",
          examples: [
            "Excellente affirmation de votre position sur la gestion d'équipe (min 12:30)",
            'Bonne défense de votre point de vue lors du conflit simulé (min 18:45)',
            'Hésitation notable lors de la question sur le feedback difficile (min 25:10)',
          ],
          improvements: [
            'Réduire les hésitations avant de prendre position',
            'Utiliser un ton plus ferme lors des désaccords',
            'Éviter les formulations interrogatives quand vous affirmez',
          ],
        },
        tone: {
          score: 85,
          dominantTone: 'Professionnel et bienveillant',
          toneVariation: 72,
          appropriateness: 88,
          description:
            'Votre ton est généralement approprié et professionnel. Bonne adaptation selon les situations avec une tendance naturellement bienveillante.',
          timeline: [
            { timestamp: '00:02:30', tone: 'Confiant', confidence: 85 },
            { timestamp: '00:08:15', tone: 'Empathique', confidence: 92 },
            { timestamp: '00:15:20', tone: 'Hésitant', confidence: 65 },
            { timestamp: '00:22:10', tone: 'Assertif', confidence: 88 },
            { timestamp: '00:28:45', tone: 'Enthousiaste', confidence: 90 },
          ],
        },
        emotion: {
          score: 80,
          emotionalStability: 85,
          confidence: 78,
          stress: 25,
          enthusiasm: 82,
          description:
            'Bonne gestion émotionnelle globale avec des pics de stress gérés efficacement. Votre enthousiasme naturel est un atout.',
          emotionalJourney: [
            {
              timestamp: '00:01:00',
              emotion: 'Nervosité légère',
              intensity: 30,
            },
            {
              timestamp: '00:05:00',
              emotion: 'Confiance croissante',
              intensity: 75,
            },
            { timestamp: '00:12:00', emotion: 'Engagement', intensity: 85 },
            {
              timestamp: '00:18:00',
              emotion: 'Stress ponctuel',
              intensity: 45,
            },
            { timestamp: '00:25:00', emotion: 'Détermination', intensity: 88 },
            { timestamp: '00:30:00', emotion: 'Satisfaction', intensity: 90 },
          ],
        },
        speechPattern: {
          pace: {
            score: 88,
            wordsPerMinute: 145,
            optimal: true,
            description:
              'Rythme de parole excellent, ni trop rapide ni trop lent. Parfaitement adapté à un contexte professionnel.',
          },
          clarity: {
            score: 92,
            articulation: 94,
            pronunciation: 90,
            description:
              "Excellente clarté d'expression. Articulation précise et prononciation claire facilitent la compréhension.",
          },
          fluency: {
            score: 75,
            hesitations: 8,
            fillerWords: 12,
            description:
              "Bonne fluidité générale avec quelques hésitations et mots de remplissage à réduire pour plus d'impact.",
          },
        },
      },
      strengths: [
        "Excellente clarté d'expression et articulation",
        'Ton professionnel et adapté au contexte',
        'Bonne gestion du stress et récupération rapide',
        'Empathie naturelle qui transparaît dans la voix',
        'Rythme de parole optimal pour la compréhension',
        'Enthousiasme communicatif et engagement authentique',
      ],
      improvements: [
        'Réduire les hésitations avant de prendre position',
        'Diminuer l\'usage de mots de remplissage ("euh", "donc")',
        "Renforcer l'assertivité dans les situations de désaccord",
        'Améliorer la variation tonale pour plus de dynamisme',
        'Travailler la confiance lors des questions difficiles',
      ],
      detailedFeedback: [
        {
          category: 'Communication Interpersonnelle',
          score: 84,
          feedback:
            "Excellente capacité à établir le contact et à maintenir l'engagement. Votre empathie naturelle facilite la communication.",
          specificExamples: [
            'Reformulation efficace des questions complexes',
            'Écoute active démontrée par vos relances pertinentes',
            "Adaptation du registre selon l'interlocuteur",
          ],
          recommendations: [
            'Continuer à développer cette force naturelle',
            "Pratiquer l'écoute active en situation de stress",
            'Travailler les techniques de questionnement ouvert',
          ],
        },
        {
          category: 'Gestion du Stress',
          score: 78,
          feedback:
            'Bonne capacité de récupération après les moments de tension. Votre respiration reste contrôlée même sous pression.',
          specificExamples: [
            'Récupération rapide après la question piège (min 15)',
            'Maintien du calme lors du conflit simulé',
            "Gestion efficace de l'interruption inattendue",
          ],
          recommendations: [
            'Pratiquer des techniques de respiration préventives',
            'Développer des phrases de transition pour gagner du temps',
            "S'entraîner sur des scénarios de haute pression",
          ],
        },
        {
          category: 'Leadership Vocal',
          score: 80,
          feedback:
            "Votre voix porte naturellement l'autorité. Bon équilibre entre fermeté et bienveillance.",
          specificExamples: [
            'Prise de leadership naturelle lors de la discussion de groupe',
            'Ton directif approprié pour donner des instructions',
            'Capacité à rassurer et motiver par la voix',
          ],
          recommendations: [
            'Travailler la projection vocale pour les grands groupes',
            'Développer différents registres selon les situations',
            "Pratiquer l'art de la pause stratégique",
          ],
        },
      ],
      nextSteps: [
        "Pratiquer l'assertivité avec des exercices de jeu de rôle",
        'Enregistrer des présentations pour analyser les mots de remplissage',
        'Suivre un coaching vocal pour optimiser la variation tonale',
        'Planifier un entretien de niveau supérieur dans 2 semaines',
      ],
      recommendedPractice: [
        {
          area: 'Assertivité Vocale',
          exercises: [
            "Enregistrer 5 minutes de défense d'opinion par jour",
            'Pratiquer le "non" ferme mais respectueux',
            'Simuler des négociations avec différents profils',
          ],
          estimatedTime: '15 min/jour pendant 2 semaines',
          priority: 'high' as const,
        },
        {
          area: "Fluidité d'Expression",
          exercises: [
            'Lecture à voix haute avec métronome',
            'Exercices de respiration avant prise de parole',
            'Entraînement aux transitions fluides entre idées',
          ],
          estimatedTime: '10 min/jour pendant 3 semaines',
          priority: 'medium' as const,
        },
        {
          area: 'Variation Tonale',
          exercises: [
            'Lecture expressive de différents textes',
            'Imitation de styles de communication variés',
            'Enregistrement de présentations avec analyse',
          ],
          estimatedTime: '20 min/semaine pendant 1 mois',
          priority: 'medium' as const,
        },
      ],
      comparisonData: {
        yourScore: 82,
        averageScore: 74,
        topPerformers: 89,
        percentile: 78,
      },
      improvementPlan: {
        immediate: [
          "Pratiquer 5 minutes d'assertivité vocale quotidiennement",
          'Enregistrer ses réponses aux questions difficiles',
          'Identifier et noter ses mots de remplissage favoris',
        ],
        shortTerm: [
          'Suivre un atelier de prise de parole en public',
          'Pratiquer avec un coach vocal professionnel',
          'Participer à des débats ou discussions structurées',
          'Planifier un entretien de niveau avancé',
        ],
        longTerm: [
          'Développer une signature vocale distinctive',
          "Maîtriser l'art de la persuasion vocale",
          "Devenir mentor pour d'autres candidats",
          'Obtenir une certification en communication professionnelle',
        ],
      },
    },
  ],

  userProgress: {
    totalSessions: 5,
    averageScore: 79,
    currentLevel: 'Intermédiaire+',
    totalTimeSpent: '2h 45min',
    improvementRate: 15,
    strongestAreas: [
      "Clarté d'expression",
      'Empathie vocale',
      'Gestion du stress',
    ],
    improvementAreas: ['Assertivité', 'Variation tonale', 'Fluidité'],
    nextRecommendedSession: 'Leadership et Management',
    sessionsHistory: [
      {
        date: '2024-01-15',
        score: 82,
        improvement: 8,
        focus: 'Communication Interpersonnelle',
      },
      {
        date: '2024-01-10',
        score: 76,
        improvement: 12,
        focus: 'Présentation de base',
      },
      {
        date: '2024-01-05',
        score: 68,
        improvement: 5,
        focus: 'Confiance en soi',
      },
    ],
  },

  statistics: {
    totalSessions: 15420,
    averageScore: 74,
    averageImprovement: 12,
    mostPopularType: 'Communication Interpersonnelle',
    averageDuration: '35 minutes',
    successRate: 89,
    userSatisfaction: 4.8,
  },

  tips: [
    'Respirez profondément avant de commencer pour calmer votre voix',
    'Parlez comme si vous vous adressiez à un ami proche mais professionnel',
    'Utilisez des pauses stratégiques pour marquer vos points importants',
    "Variez votre intonation pour maintenir l'engagement de l'auditeur",
    'Enregistrez-vous régulièrement pour identifier vos tics de langage',
    "Pratiquez l'écoute active en reformulant ce que vous entendez",
    "Adaptez votre débit selon l'importance du message à transmettre",
  ],

  technicalRequirements: {
    webCall: {
      browser: ['Chrome 90+', 'Firefox 88+', 'Safari 14+', 'Edge 90+'],
      bandwidth: 'Minimum 1 Mbps upload/download',
      microphone: 'Microphone de qualité recommandé',
      environment: 'Environnement calme sans écho',
    },
    phoneCall: {
      quality: 'Ligne fixe ou mobile avec bonne réception',
      environment: 'Environnement silencieux',
      backup: 'Numéro de secours recommandé',
      duration: 'Forfait illimité conseillé',
    },
  },

  pricing: {
    webCall: {
      basic: {
        price: 29,
        duration: '30 min',
        features: ['Rapport basique', 'IA standard'],
      },
      premium: {
        price: 49,
        duration: '45 min',
        features: ['Rapport détaillé', 'IA experte', 'Coaching'],
      },
      expert: {
        price: 79,
        duration: '60 min',
        features: ['Rapport complet', 'IA spécialisée', 'Plan personnalisé'],
      },
    },
    phoneCall: {
      basic: {
        price: 25,
        duration: '30 min',
        features: ['Rapport basique', 'IA standard'],
      },
      premium: {
        price: 45,
        duration: '45 min',
        features: ['Rapport détaillé', 'IA experte', 'Coaching'],
      },
      expert: {
        price: 75,
        duration: '60 min',
        features: ['Rapport complet', 'IA spécialisée', 'Plan personnalisé'],
      },
    },
  },
};
