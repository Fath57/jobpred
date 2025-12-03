export interface HrCallSession {
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

export interface HrVoiceAnalysis {
  communicationClarity: {
    score: number;
    level: string;
    description: string;
    examples: string[];
    improvements: string[];
  };
  confidence: {
    score: number;
    vocalConfidence: number;
    responseAssurance: number;
    stressManagement: number;
    description: string;
    confidenceJourney: {
      timestamp: string;
      question: string;
      confidence: number;
      reasoning: string;
    }[];
  };
  persuasiveness: {
    score: number;
    argumentStructure: number;
    conviction: number;
    influence: number;
    description: string;
    examples: string[];
  };
  professionalPresence: {
    score: number;
    authority: number;
    credibility: number;
    engagement: number;
    description: string;
    strengths: string[];
    improvements: string[];
  };
  adaptability: {
    score: number;
    questionAdaptation: number;
    styleFlexibility: number;
    recoveryAbility: number;
    description: string;
    examples: string[];
  };
}

export interface HrInterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  expectedDuration: string;
  evaluationCriteria: string[];
  tips: string[];
  followUpQuestions: string[];
}

export interface HrSessionReport {
  id: string;
  sessionId: string;
  overallScore: number;
  interviewReadiness: string;
  duration: string;
  questionsAnswered: number;
  voiceAnalysis: HrVoiceAnalysis;
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

export interface HrInterviewType {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  questionsCount: number;
  focusAreas: string[];
  scenarios: string[];
  businessValue: number;
}

export interface HrAvailableSlot {
  id: string;
  date: string;
  time: string;
  duration: string;
  aiInterviewer: string;
  interviewType: string;
  difficulty: string;
  available: boolean;
}

export interface HrUserProgress {
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

export const speechHrInterviewPrepData = {
  availableSlots: [
    {
      id: 'hr-slot-001',
      date: '2024-01-16',
      time: '09:00',
      duration: '45 minutes',
      aiInterviewer: 'Claire RH',
      interviewType: 'Entretien Comportemental',
      difficulty: 'Intermédiaire',
      available: true,
    },
    {
      id: 'hr-slot-002',
      date: '2024-01-16',
      time: '11:00',
      duration: '60 minutes',
      aiInterviewer: 'Marc Manager',
      interviewType: 'Entretien de Motivation',
      difficulty: 'Avancé',
      available: true,
    },
    {
      id: 'hr-slot-003',
      date: '2024-01-16',
      time: '14:30',
      duration: '50 minutes',
      aiInterviewer: 'Sophie Senior',
      interviewType: 'Entretien Situationnel',
      difficulty: 'Expert',
      available: true,
    },
    {
      id: 'hr-slot-004',
      date: '2024-01-17',
      time: '10:00',
      duration: '40 minutes',
      aiInterviewer: 'Thomas Tech',
      interviewType: 'Entretien Technique RH',
      difficulty: 'Avancé',
      available: true,
    },
    {
      id: 'hr-slot-005',
      date: '2024-01-17',
      time: '15:00',
      duration: '55 minutes',
      aiInterviewer: 'Isabelle International',
      interviewType: 'Entretien Panel',
      difficulty: 'Expert',
      available: false,
    },
    {
      id: 'hr-slot-006',
      date: '2024-01-18',
      time: '09:30',
      duration: '35 minutes',
      aiInterviewer: 'Claire RH',
      interviewType: "Culture d'Entreprise",
      difficulty: 'Intermédiaire',
      available: true,
    },
  ],

  aiInterviewers: [
    {
      id: 'claire-rh',
      name: 'Claire RH',
      personality: 'Bienveillante et structurée',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Entretiens comportementaux',
        'Évaluation soft skills',
        "Culture d'entreprise",
      ],
      description:
        "Spécialisée dans l'évaluation des compétences interpersonnelles et l'adéquation culturelle",
      experience: '8+ ans en RH',
      rating: 4.9,
      languages: ['Français', 'Anglais'],
      style: 'Empathique et méthodique',
    },
    {
      id: 'marc-manager',
      name: 'Marc Manager',
      personality: 'Directif et orienté résultats',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Leadership',
        'Management',
        'Motivation',
        'Objectifs de carrière',
      ],
      description:
        'Expert en évaluation du potentiel de leadership et des motivations professionnelles',
      experience: '12+ ans en management',
      rating: 4.8,
      languages: ['Français', 'Anglais', 'Allemand'],
      style: 'Challengeant et inspirant',
    },
    {
      id: 'sophie-senior',
      name: 'Sophie Senior',
      personality: 'Expérimentée et perspicace',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Entretiens situationnels',
        'Résolution de problèmes',
        'Prise de décision',
      ],
      description:
        "Spécialiste des mises en situation et de l'évaluation de la prise de décision",
      experience: '15+ ans en recrutement senior',
      rating: 4.9,
      languages: ['Français', 'Anglais'],
      style: 'Analytique et approfondi',
    },
    {
      id: 'thomas-tech',
      name: 'Thomas Tech',
      personality: 'Technique et pédagogue',
      avatar:
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Entretiens techniques',
        'Communication technique',
        'Innovation',
      ],
      description:
        'Expert en évaluation des compétences techniques et de leur communication',
      experience: '10+ ans en tech et RH',
      rating: 4.7,
      languages: ['Français', 'Anglais'],
      style: 'Technique et bienveillant',
    },
    {
      id: 'isabelle-international',
      name: 'Isabelle International',
      personality: 'Multiculturelle et adaptable',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Entretiens panel',
        'Environnements internationaux',
        'Diversité culturelle',
      ],
      description:
        'Spécialisée dans les entretiens complexes et les environnements multiculturels',
      experience: '14+ ans en RH international',
      rating: 4.8,
      languages: ['Français', 'Anglais', 'Espagnol', 'Italien'],
      style: 'Inclusif et exigeant',
    },
  ],

  interviewTypes: [
    {
      id: 'behavioral-interview',
      name: 'Entretien Comportemental',
      description:
        'Évaluation des compétences interpersonnelles et du comportement professionnel',
      duration: '45 minutes',
      difficulty: 'Intermédiaire',
      questionsCount: 12,
      focusAreas: [
        'Expériences passées',
        'Soft skills',
        'Résolution de problèmes',
        'Travail en équipe',
      ],
      scenarios: [
        'Gestion de conflit',
        "Leadership d'équipe",
        'Gestion du stress',
        'Adaptation au changement',
      ],
      businessValue: 90,
    },
    {
      id: 'motivational-interview',
      name: 'Entretien de Motivation',
      description:
        "Évaluation des motivations, objectifs de carrière et adéquation avec l'entreprise",
      duration: '40 minutes',
      difficulty: 'Débutant',
      questionsCount: 10,
      focusAreas: [
        'Motivations',
        'Objectifs carrière',
        'Connaissance entreprise',
        'Valeurs',
      ],
      scenarios: [
        'Pourquoi cette entreprise',
        'Objectifs 5 ans',
        'Motivations profondes',
        'Valeurs alignment',
      ],
      businessValue: 85,
    },
    {
      id: 'situational-interview',
      name: 'Entretien Situationnel',
      description:
        'Mise en situation hypothétique pour évaluer la prise de décision',
      duration: '50 minutes',
      difficulty: 'Avancé',
      questionsCount: 8,
      focusAreas: [
        'Prise de décision',
        'Résolution de problèmes',
        'Leadership',
        'Éthique',
      ],
      scenarios: [
        'Crise client',
        'Conflit équipe',
        'Décision difficile',
        'Dilemme éthique',
      ],
      businessValue: 88,
    },
    {
      id: 'technical-hr-interview',
      name: 'Entretien Technique RH',
      description:
        "Questions techniques avec focus sur l'approche et la communication",
      duration: '60 minutes',
      difficulty: 'Avancé',
      questionsCount: 15,
      focusAreas: [
        'Communication technique',
        'Méthodologie',
        'Innovation',
        'Veille technologique',
      ],
      scenarios: [
        'Explication concept technique',
        'Choix technologique',
        'Architecture solution',
        'Innovation process',
      ],
      businessValue: 92,
    },
    {
      id: 'panel-interview',
      name: 'Entretien Panel',
      description:
        'Entretien avec plusieurs interviewers pour tester la gestion de pression',
      duration: '55 minutes',
      difficulty: 'Expert',
      questionsCount: 14,
      focusAreas: [
        'Gestion pression',
        'Communication multi-cibles',
        'Présence',
        'Adaptabilité',
      ],
      scenarios: [
        'Questions croisées',
        'Opinions divergentes',
        'Présentation',
        'Négociation',
      ],
      businessValue: 95,
    },
    {
      id: 'cultural-fit-interview',
      name: "Entretien Culture d'Entreprise",
      description:
        "Évaluation de l'adéquation avec les valeurs et la culture organisationnelle",
      duration: '35 minutes',
      difficulty: 'Intermédiaire',
      questionsCount: 10,
      focusAreas: [
        'Valeurs',
        'Culture',
        'Collaboration',
        'Adaptabilité culturelle',
      ],
      scenarios: [
        'Environnement idéal',
        'Définition succès',
        'Travail équipe',
        'Adaptation culture',
      ],
      businessValue: 80,
    },
  ],

  callSessions: [
    {
      id: 'hr-session-001',
      type: 'web_call' as const,
      status: 'completed' as const,
      scheduledAt: '2024-01-15T14:00:00Z',
      duration: '42 minutes',
      completedAt: '2024-01-15T14:42:00Z',
      interviewType: 'Entretien Comportemental',
      difficulty: 'Intermédiaire' as const,
      aiInterviewer: {
        name: 'Claire RH',
        personality: 'Bienveillante et structurée',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: [
          'Entretiens comportementaux',
          'Soft skills',
          "Culture d'entreprise",
        ],
      },
    },
    {
      id: 'hr-session-002',
      type: 'phone_call' as const,
      status: 'scheduled' as const,
      scheduledAt: '2024-01-17T11:00:00Z',
      interviewType: 'Entretien de Motivation',
      difficulty: 'Avancé' as const,
      aiInterviewer: {
        name: 'Marc Manager',
        personality: 'Directif et orienté résultats',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['Leadership', 'Management', 'Motivation'],
      },
    },
  ],

  sessionReports: [
    {
      id: 'hr-report-001',
      sessionId: 'hr-session-001',
      overallScore: 84,
      interviewReadiness: 'Très bon niveau',
      duration: '42 minutes',
      questionsAnswered: 12,
      voiceAnalysis: {
        communicationClarity: {
          score: 88,
          level: 'Excellent',
          description:
            'Communication très claire avec une excellente structure des réponses. Capacité remarquable à expliquer des situations complexes de manière compréhensible.',
          examples: [
            "Explication structurée du conflit d'équipe (min 12:30)",
            "Narration claire de l'expérience de leadership (min 18:45)",
            'Description précise des résultats obtenus (min 25:10)',
          ],
          improvements: [
            "Pourrait raccourcir certaines réponses pour plus d'impact",
            'Ajouter plus de transitions entre les idées',
            "Utiliser plus d'exemples quantifiés",
          ],
        },
        confidence: {
          score: 82,
          vocalConfidence: 85,
          responseAssurance: 80,
          stressManagement: 81,
          description:
            "Bonne confiance générale avec quelques moments d'hésitation sur les questions difficiles. Excellente récupération après les moments de stress.",
          confidenceJourney: [
            {
              timestamp: '00:02:00',
              question: 'Présentation personnelle',
              confidence: 90,
              reasoning: 'Sujet maîtrisé et préparé',
            },
            {
              timestamp: '00:08:00',
              question: 'Gestion de conflit',
              confidence: 75,
              reasoning: 'Sujet plus délicat nécessitant réflexion',
            },
            {
              timestamp: '00:15:00',
              question: 'Échec professionnel',
              confidence: 70,
              reasoning: 'Question personnelle et sensible',
            },
            {
              timestamp: '00:22:00',
              question: "Leadership d'équipe",
              confidence: 88,
              reasoning: 'Expérience solide et exemples concrets',
            },
            {
              timestamp: '00:30:00',
              question: 'Objectifs de carrière',
              confidence: 85,
              reasoning: 'Vision claire et bien articulée',
            },
            {
              timestamp: '00:38:00',
              question: 'Questions à poser',
              confidence: 82,
              reasoning: 'Préparation visible et pertinence',
            },
          ],
        },
        persuasiveness: {
          score: 79,
          argumentStructure: 82,
          conviction: 78,
          influence: 77,
          description:
            "Bonne capacité de persuasion avec une structure argumentaire solide. Pourrait renforcer la conviction et l'impact émotionnel.",
          examples: [
            'Argumentation convaincante pour le changement de poste',
            'Justification claire des choix de carrière',
            "Démonstration de la valeur ajoutée pour l'entreprise",
          ],
        },
        professionalPresence: {
          score: 86,
          authority: 84,
          credibility: 90,
          engagement: 84,
          description:
            "Excellente présence professionnelle avec une crédibilité forte. Ton d'autorité naturel et engagement authentique.",
          strengths: [
            "Crédibilité immédiate par l'expertise démontrée",
            'Ton professionnel et respectueux',
            'Engagement authentique dans les réponses',
            'Autorité naturelle sans arrogance',
          ],
          improvements: [
            'Pourrait varier davantage le ton pour plus de dynamisme',
            "Intégrer plus d'enthousiasme dans certaines réponses",
            "Développer l'aspect inspirant du leadership",
          ],
        },
        adaptability: {
          score: 81,
          questionAdaptation: 83,
          styleFlexibility: 79,
          recoveryAbility: 82,
          description:
            "Bonne capacité d'adaptation aux différents types de questions. Récupération efficace après les moments difficiles.",
          examples: [
            'Adaptation rapide aux questions inattendues',
            'Changement de registre selon le type de question',
            'Récupération après une question piège',
          ],
        },
      },
      strengths: [
        'Excellente clarté de communication et structure des réponses',
        'Forte crédibilité professionnelle et expertise démontrée',
        'Bonne gestion du stress et récupération rapide',
        'Capacité à donner des exemples concrets et pertinents',
        'Ton professionnel et respectueux maintenu tout au long',
        'Bonne préparation visible sur les questions classiques',
      ],
      improvements: [
        "Raccourcir certaines réponses pour plus d'impact",
        "Renforcer la conviction et l'enthousiasme dans les réponses",
        "Développer l'aspect émotionnel et inspirant",
        'Améliorer les transitions entre les idées',
        'Pratiquer les questions pièges et inattendues',
      ],
      detailedFeedback: [
        {
          category: 'Communication Professionnelle',
          score: 88,
          feedback:
            'Excellente maîtrise de la communication professionnelle avec une structure claire et une expression fluide.',
          specificExamples: [
            'Utilisation efficace de la méthode STAR',
            'Vocabulaire professionnel approprié',
            'Gestion du temps de parole équilibrée',
          ],
          recommendations: [
            'Continuer à utiliser cette force comme base',
            'Ajouter plus de variété dans les structures de réponse',
            "Intégrer plus d'éléments de storytelling",
          ],
        },
        {
          category: 'Gestion du Stress',
          score: 81,
          feedback:
            "Bonne capacité à gérer le stress de l'entretien avec des moments de récupération efficaces.",
          specificExamples: [
            'Respiration contrôlée lors des questions difficiles',
            'Récupération rapide après hésitation',
            'Maintien du professionnalisme sous pression',
          ],
          recommendations: [
            'Pratiquer des techniques de respiration préventives',
            'Développer des phrases de transition pour gagner du temps',
            "S'entraîner sur des questions plus stressantes",
          ],
        },
        {
          category: 'Leadership et Influence',
          score: 83,
          feedback:
            "Démonstration claire du potentiel de leadership avec des exemples concrets d'influence positive.",
          specificExamples: [
            "Exemple de transformation d'équipe convaincant",
            "Démonstration de prise d'initiative",
            'Capacité à motiver et fédérer',
          ],
          recommendations: [
            "Développer plus d'exemples de leadership transformationnel",
            "Renforcer l'aspect inspirant et visionnaire",
            'Pratiquer la communication de vision',
          ],
        },
      ],
      nextSteps: [
        'Pratiquer la concision avec des réponses de 2 minutes maximum',
        "Développer un répertoire d'histoires inspirantes",
        "Travailler sur l'expression de l'enthousiasme authentique",
        'Préparer des réponses aux questions pièges courantes',
      ],
      recommendedPractice: [
        {
          area: 'Concision et Impact',
          exercises: [
            'Entraînement avec timer sur les réponses STAR',
            "Pratique de l'elevator pitch en 60 secondes",
            "Exercices de synthèse d'expériences complexes",
          ],
          estimatedTime: '2 heures par semaine pendant 3 semaines',
          priority: 'high' as const,
        },
        {
          area: 'Storytelling Inspirant',
          exercises: [
            'Développement de 5 histoires de leadership transformationnel',
            'Pratique de la narration avec émotion',
            'Entraînement aux transitions narratives',
          ],
          estimatedTime: '1 heure par semaine pendant 4 semaines',
          priority: 'medium' as const,
        },
        {
          area: 'Gestion des Questions Difficiles',
          exercises: [
            'Simulation de questions pièges',
            'Pratique de la reformulation positive',
            'Entraînement à la gestion des silences',
          ],
          estimatedTime: '30 minutes par semaine pendant 6 semaines',
          priority: 'medium' as const,
        },
      ],
      comparisonData: {
        yourScore: 84,
        averageScore: 72,
        topPerformers: 91,
        percentile: 82,
      },
      improvementPlan: {
        immediate: [
          'Pratiquer la concision avec un timer de 2 minutes par réponse',
          'Préparer 3 histoires inspirantes de leadership',
          "Enregistrer ses réponses pour analyser le ton et l'enthousiasme",
        ],
        shortTerm: [
          'Suivre un atelier de storytelling professionnel',
          'Pratiquer avec un coach en communication',
          'Simuler des entretiens avec questions pièges',
          "Développer son répertoire d'exemples quantifiés",
        ],
        longTerm: [
          "Maîtriser l'art de l'influence et de la persuasion",
          'Développer un style de communication inspirant',
          'Devenir expert en gestion des situations difficiles',
          'Obtenir une certification en communication professionnelle',
        ],
      },
    },
  ],

  userProgress: {
    totalSessions: 6,
    averageScore: 81,
    currentLevel: 'Avancé',
    totalTimeSpent: '4h 15min',
    improvementRate: 13,
    strongestAreas: [
      'Communication professionnelle',
      'Crédibilité',
      'Structure des réponses',
    ],
    improvementAreas: ['Concision', 'Enthousiasme', 'Questions pièges'],
    nextRecommendedSession: 'Entretien Situationnel Avancé',
    sessionsHistory: [
      {
        date: '2024-01-15',
        score: 84,
        improvement: 7,
        focus: 'Entretien Comportemental',
      },
      {
        date: '2024-01-10',
        score: 78,
        improvement: 9,
        focus: 'Entretien de Motivation',
      },
      {
        date: '2024-01-05',
        score: 71,
        improvement: 5,
        focus: "Culture d'Entreprise",
      },
    ],
  },

  statistics: {
    totalSessions: 12840,
    averageScore: 76,
    averageImprovement: 11,
    mostPopularType: 'Entretien Comportemental',
    averageDuration: '43 minutes',
    successRate: 87,
    userSatisfaction: 4.8,
  },

  tips: [
    'Utilisez la méthode STAR pour structurer vos réponses comportementales',
    'Préparez des exemples concrets et récents de vos expériences',
    'Entraînez-vous à répondre en 2-3 minutes maximum par question',
    "Montrez votre capacité d'apprentissage et d'adaptation",
    'Préparez des questions pertinentes à poser à la fin',
    'Restez authentique tout en mettant en valeur vos forces',
    'Pratiquez la gestion du stress avec des techniques de respiration',
  ],

  technicalRequirements: {
    webCall: {
      browser: ['Chrome 90+', 'Firefox 88+', 'Safari 14+', 'Edge 90+'],
      bandwidth: 'Minimum 1 Mbps upload/download',
      microphone: 'Microphone de qualité recommandé',
      environment: 'Environnement calme et professionnel',
      preparation: "CV et exemples d'expériences à portée de main",
    },
    phoneCall: {
      quality: 'Ligne fixe ou mobile avec bonne réception',
      environment: 'Bureau silencieux',
      backup: 'Numéro de secours recommandé',
      duration: 'Forfait illimité conseillé',
      preparation: 'Notes et CV accessibles',
    },
  },

  pricing: {
    webCall: {
      basic: {
        price: 35,
        duration: '30 min',
        features: ['Rapport RH', 'IA spécialisée', 'Feedback détaillé'],
      },
      premium: {
        price: 55,
        duration: '45 min',
        features: ['Rapport complet', 'IA experte', "Plan d'amélioration"],
      },
      expert: {
        price: 75,
        duration: '60 min',
        features: ['Rapport expert', 'IA senior', 'Coaching personnalisé'],
      },
    },
    phoneCall: {
      basic: {
        price: 30,
        duration: '30 min',
        features: ['Rapport RH', 'IA spécialisée'],
      },
      premium: {
        price: 50,
        duration: '45 min',
        features: ['Rapport complet', 'IA experte'],
      },
      expert: {
        price: 70,
        duration: '60 min',
        features: ['Rapport expert', 'IA senior'],
      },
    },
  },
};
