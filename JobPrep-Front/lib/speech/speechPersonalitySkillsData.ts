export interface PersonalityCallSession {
  id: string;
  type: 'web_call' | 'phone_call';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledAt: string;
  duration?: string;
  completedAt?: string;
  framework: string;
  assessmentType: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  aiInterviewer: {
    name: string;
    personality: string;
    avatar: string;
    specialization: string[];
    experience: string;
  };
}

export interface PersonalityVoiceAnalysis {
  communicationStyle: {
    score: number;
    dominantStyle: string;
    secondaryStyle: string;
    description: string;
    strengths: string[];
    challenges: string[];
    adaptability: number;
  };
  emotionalExpression: {
    score: number;
    emotionalRange: number;
    emotionalClarity: number;
    emotionalAuthenticity: number;
    description: string;
    strengths: string[];
    challenges: string[];
    emotionalJourney: {
      timestamp: string;
      emotion: string;
      intensity: number;
      context: string;
    }[];
  };
  personalityTraits: {
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    neuroticism: number;
    openness: number;
    description: string;
    dominantTraits: string[];
    balancedTraits: string[];
    developmentAreas: string[];
  };
  interpersonalDynamics: {
    score: number;
    empathy: number;
    assertiveness: number;
    collaboration: number;
    leadership: number;
    description: string;
    strengths: string[];
    challenges: string[];
  };
  cognitiveStyle: {
    score: number;
    analyticalThinking: number;
    creativeThinking: number;
    practicalThinking: number;
    abstractThinking: number;
    description: string;
    dominantStyles: string[];
    developmentAreas: string[];
  };
  valueExpression: {
    score: number;
    clarity: number;
    consistency: number;
    authenticity: number;
    description: string;
    coreValues: string[];
    potentialConflicts: string[];
  };
}

export interface PersonalitySessionReport {
  id: string;
  sessionId: string;
  overallProfile: {
    personalityType: string;
    typeDescription: string;
    dominantTraits: string[];
    uniqueStrengths: string[];
    potentialChallenges: string[];
    reliability: number;
    stability: number;
  };
  voiceAnalysis: PersonalityVoiceAnalysis;
  careerInsights: {
    idealRoles: string[];
    workEnvironments: string[];
    leadershipStyle: string;
    teamContribution: string;
    communicationPreferences: string;
    motivationalDrivers: string[];
    stressResponses: string[];
    decisionMakingStyle: string;
  };
  relationshipDynamics: {
    collaborationStyle: string;
    conflictResolution: string;
    teamRole: string;
    communicationNeeds: string;
    feedbackStyle: string;
    trustBuilding: string;
    compatibilities: {
      highCompatibility: string[];
      moderateCompatibility: string[];
      potentialChallenges: string[];
    };
  };
  developmentPlan: {
    selfAwarenessInsights: string[];
    shortTermActions: string[];
    longTermDevelopment: string[];
    recommendedResources: {
      books: string[];
      courses: string[];
      exercises: string[];
      practices: string[];
    };
    potentialPitfalls: string[];
    growthMindsetStrategies: string[];
  };
  professionalApplication: {
    interviewStrategies: string[];
    resumeHighlights: string[];
    personalBranding: string[];
    networkingApproach: string[];
    careerAdvancement: string[];
  };
}

export interface PersonalityFramework {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  scientificValidity: number;
  businessRelevance: number;
  assessmentDuration: string;
  dimensions: string[];
  typesCount: number;
  developedBy: string;
  yearDeveloped: number;
  popularityScore: number;
}

export interface AssessmentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: string;
  focusAreas: string[];
  businessApplications: string[];
  format: string[];
}

export interface PersonalityInterviewer {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  specialization: string[];
  experience: string;
  frameworks: string[];
  approach: string;
  rating: number;
  style: string;
  description: string;
}

export interface PersonalitySlot {
  id: string;
  date: string;
  time: string;
  duration: string;
  aiInterviewer: string;
  framework: string;
  assessmentType: string;
  difficulty: string;
  available: boolean;
  price: number;
}

export interface UserPersonalityProgress {
  totalSessions: number;
  discoveredTypes: number;
  frameworksExplored: number;
  totalTimeSpent: string;
  dominantTraits: string[];
  developmentAreas: string[];
  nextRecommendedSession: string;
  personalityEvolution: {
    date: string;
    framework: string;
    type: string;
    stability: number;
    insights: string[];
  }[];
  careerMatches: {
    role: string;
    compatibility: number;
    strengths: string[];
    challenges: string[];
  }[];
}

export const speechPersonalitySkillsData = {
  personalityFrameworks: [
    {
      id: 'big-five',
      name: 'Big Five (OCEAN)',
      description:
        'Modèle scientifique de référence évaluant 5 dimensions fondamentales de la personnalité',
      icon: 'Brain',
      color: 'bg-blue-500',
      scientificValidity: 95,
      businessRelevance: 90,
      assessmentDuration: '30-45 minutes',
      dimensions: [
        'Ouverture',
        'Conscienciosité',
        'Extraversion',
        'Agréabilité',
        'Stabilité émotionnelle',
      ],
      typesCount: 0,
      developedBy: 'Costa & McCrae',
      yearDeveloped: 1985,
      popularityScore: 95,
    },
    {
      id: 'mbti',
      name: 'Myers-Briggs (MBTI)',
      description:
        'Classification en 16 types de personnalité basée sur les préférences cognitives',
      icon: 'Users',
      color: 'bg-purple-500',
      scientificValidity: 75,
      businessRelevance: 85,
      assessmentDuration: '35-50 minutes',
      dimensions: [
        'Extraversion/Introversion',
        'Sensation/Intuition',
        'Pensée/Sentiment',
        'Jugement/Perception',
      ],
      typesCount: 16,
      developedBy: 'Myers & Briggs',
      yearDeveloped: 1962,
      popularityScore: 98,
    },
    {
      id: 'disc',
      name: 'DISC',
      description:
        "Modèle comportemental focalisé sur les styles de communication et d'interaction",
      icon: 'Target',
      color: 'bg-emerald-500',
      scientificValidity: 80,
      businessRelevance: 92,
      assessmentDuration: '25-35 minutes',
      dimensions: ['Dominance', 'Influence', 'Stabilité', 'Conformité'],
      typesCount: 4,
      developedBy: 'William Marston',
      yearDeveloped: 1928,
      popularityScore: 90,
    },
    {
      id: 'enneagram',
      name: 'Ennéagramme',
      description:
        'Système de 9 types de personnalité explorant les motivations profondes',
      icon: 'Heart',
      color: 'bg-amber-500',
      scientificValidity: 70,
      businessRelevance: 80,
      assessmentDuration: '40-55 minutes',
      dimensions: [
        'Type 1-9',
        'Ailes',
        'Centres (Instinctif, Émotionnel, Mental)',
        'Niveaux de développement',
      ],
      typesCount: 9,
      developedBy: 'Georges Gurdjieff / Oscar Ichazo',
      yearDeveloped: 1915,
      popularityScore: 85,
    },
    {
      id: 'strengths',
      name: 'CliftonStrengths',
      description:
        'Identification des talents naturels pour optimiser les performances professionnelles',
      icon: 'Zap',
      color: 'bg-pink-500',
      scientificValidity: 85,
      businessRelevance: 95,
      assessmentDuration: '45-60 minutes',
      dimensions: [
        'Exécution',
        'Influence',
        'Relations',
        'Réflexion stratégique',
      ],
      typesCount: 34,
      developedBy: 'Donald Clifton',
      yearDeveloped: 1998,
      popularityScore: 88,
    },
  ],

  assessmentTypes: [
    {
      id: 'career-fit',
      name: 'Adéquation Carrière',
      description:
        'Évaluation de la compatibilité entre votre personnalité et différentes carrières',
      icon: 'Briefcase',
      color: 'bg-blue-500',
      duration: '40-50 minutes',
      difficulty: 'Intermédiaire',
      focusAreas: [
        'Compatibilité métier',
        'Environnement de travail idéal',
        'Styles de management',
      ],
      businessApplications: [
        'Orientation professionnelle',
        'Recrutement',
        'Reconversion',
      ],
      format: [
        'Entretien structuré',
        'Mises en situation',
        'Questions ouvertes',
      ],
    },
    {
      id: 'leadership-style',
      name: 'Style de Leadership',
      description:
        'Analyse approfondie de votre approche naturelle du leadership',
      icon: 'Crown',
      color: 'bg-purple-500',
      duration: '45-60 minutes',
      difficulty: 'Avancé',
      focusAreas: [
        'Style de direction',
        "Motivation d'équipe",
        'Prise de décision',
        'Vision',
      ],
      businessApplications: [
        'Développement leadership',
        'Coaching exécutif',
        'Team building',
      ],
      format: [
        'Scénarios de leadership',
        'Questions situationnelles',
        'Réflexion stratégique',
      ],
    },
    {
      id: 'team-dynamics',
      name: "Dynamiques d'Équipe",
      description:
        'Évaluation de votre rôle naturel et contribution dans une équipe',
      icon: 'Users',
      color: 'bg-emerald-500',
      duration: '35-45 minutes',
      difficulty: 'Intermédiaire',
      focusAreas: [
        'Rôle en équipe',
        'Communication',
        'Gestion de conflit',
        'Collaboration',
      ],
      businessApplications: [
        "Composition d'équipe",
        'Résolution de conflits',
        'Amélioration collaboration',
      ],
      format: [
        "Simulations d'équipe",
        'Jeux de rôle',
        'Réflexion collaborative',
      ],
    },
    {
      id: 'stress-resilience',
      name: 'Résilience au Stress',
      description:
        "Analyse de vos réactions sous pression et capacités d'adaptation",
      icon: 'Activity',
      color: 'bg-red-500',
      duration: '30-40 minutes',
      difficulty: 'Avancé',
      focusAreas: [
        'Gestion du stress',
        'Adaptation',
        'Récupération',
        'Équilibre',
      ],
      businessApplications: [
        'Prévention burnout',
        'Performance sous pression',
        'Bien-être au travail',
      ],
      format: [
        'Situations de stress simulées',
        'Questions réflexives',
        'Analyse de réactions',
      ],
    },
    {
      id: 'communication-style',
      name: 'Style de Communication',
      description: 'Évaluation de votre approche naturelle de la communication',
      icon: 'MessageSquare',
      color: 'bg-amber-500',
      duration: '30-45 minutes',
      difficulty: 'Débutant',
      focusAreas: ['Style verbal', 'Écoute', 'Persuasion', 'Adaptation'],
      businessApplications: [
        'Amélioration communication',
        'Vente',
        'Négociation',
        'Management',
      ],
      format: ['Dialogues', 'Jeux de rôle', 'Feedback en temps réel'],
    },
  ],

  aiInterviewers: [
    {
      id: 'sophia-personality',
      name: 'Sophia Insight',
      personality: 'Analytique et perspicace',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['Big Five', 'MBTI', 'Analyse comportementale'],
      experience: '10+ ans en psychologie organisationnelle',
      frameworks: ['Big Five', 'MBTI', 'DISC'],
      approach: 'Scientifique et nuancée',
      rating: 4.9,
      style: 'Structuré et approfondi',
      description:
        'Experte en évaluation de personnalité avec approche scientifique',
    },
    {
      id: 'marcus-leadership',
      name: 'Marcus Leader',
      personality: 'Charismatique et direct',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Leadership',
        "Dynamiques d'équipe",
        'Styles de management',
      ],
      experience: '15+ ans en coaching exécutif',
      frameworks: ['DISC', 'Strengths', 'Leadership Situationnel'],
      approach: 'Pragmatique et orienté résultats',
      rating: 4.8,
      style: 'Challengeant et inspirant',
      description:
        'Coach exécutif spécialisé dans le développement du leadership',
    },
    {
      id: 'elena-depth',
      name: 'Elena Depth',
      personality: 'Intuitive et empathique',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Ennéagramme',
        'Motivations profondes',
        'Développement personnel',
      ],
      experience: '12+ ans en psychologie de la personnalité',
      frameworks: ['Ennéagramme', 'Jungian', 'Valeurs'],
      approach: 'Profonde et transformationnelle',
      rating: 4.9,
      style: 'Exploratoire et réflexif',
      description:
        'Spécialiste des motivations profondes et du développement personnel',
    },
    {
      id: 'david-strengths',
      name: 'David Potential',
      personality: 'Enthousiaste et constructif',
      avatar:
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'CliftonStrengths',
        'Développement des talents',
        'Performance',
      ],
      experience: '8+ ans en développement des talents',
      frameworks: ['Strengths', 'DISC', 'Valeurs'],
      approach: 'Positive et orientée forces',
      rating: 4.7,
      style: 'Énergisant et optimiste',
      description:
        'Expert en identification et développement des talents naturels',
    },
    {
      id: 'olivia-teams',
      name: 'Olivia Teams',
      personality: 'Collaborative et structurée',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        "Dynamiques d'équipe",
        'Rôles en équipe',
        'Résolution de conflits',
      ],
      experience: "11+ ans en développement d'équipe",
      frameworks: ['Belbin', 'DISC', 'Big Five'],
      approach: 'Systémique et inclusive',
      rating: 4.8,
      style: 'Facilitatrice et intégrative',
      description: "Spécialiste des dynamiques d'équipe et de la collaboration",
    },
  ],

  availableSlots: [
    {
      id: 'pers-slot-001',
      date: '2024-01-16',
      time: '09:00',
      duration: '45 minutes',
      aiInterviewer: 'Sophia Insight',
      framework: 'Big Five',
      assessmentType: 'Career Fit',
      difficulty: 'Intermédiaire',
      available: true,
      price: 65,
    },
    {
      id: 'pers-slot-002',
      date: '2024-01-16',
      time: '11:30',
      duration: '60 minutes',
      aiInterviewer: 'Marcus Leader',
      framework: 'DISC',
      assessmentType: 'Leadership Style',
      difficulty: 'Avancé',
      available: true,
      price: 85,
    },
    {
      id: 'pers-slot-003',
      date: '2024-01-16',
      time: '14:00',
      duration: '50 minutes',
      aiInterviewer: 'Elena Depth',
      framework: 'Enneagram',
      assessmentType: 'Stress Resilience',
      difficulty: 'Avancé',
      available: true,
      price: 75,
    },
    {
      id: 'pers-slot-004',
      date: '2024-01-17',
      time: '10:00',
      duration: '55 minutes',
      aiInterviewer: 'David Potential',
      framework: 'CliftonStrengths',
      assessmentType: 'Career Fit',
      difficulty: 'Intermédiaire',
      available: true,
      price: 80,
    },
    {
      id: 'pers-slot-005',
      date: '2024-01-17',
      time: '13:30',
      duration: '40 minutes',
      aiInterviewer: 'Olivia Teams',
      framework: 'DISC',
      assessmentType: 'Team Dynamics',
      difficulty: 'Débutant',
      available: false,
      price: 60,
    },
    {
      id: 'pers-slot-006',
      date: '2024-01-18',
      time: '09:30',
      duration: '60 minutes',
      aiInterviewer: 'Sophia Insight',
      framework: 'MBTI',
      assessmentType: 'Communication Style',
      difficulty: 'Intermédiaire',
      available: true,
      price: 70,
    },
  ],

  callSessions: [
    {
      id: 'pers-session-001',
      type: 'web_call',
      status: 'completed',
      scheduledAt: '2024-01-15T13:00:00Z',
      duration: '48 minutes',
      completedAt: '2024-01-15T13:48:00Z',
      framework: 'Big Five',
      assessmentType: 'Career Fit',
      difficulty: 'Intermédiaire',
      aiInterviewer: {
        name: 'Sophia Insight',
        personality: 'Analytique et perspicace',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: [
          'Big Five',
          'Analyse comportementale',
          'Orientation carrière',
        ],
        experience: '10+ ans en psychologie organisationnelle',
      },
    },
    {
      id: 'pers-session-002',
      type: 'phone_call',
      status: 'scheduled',
      scheduledAt: '2024-01-17T15:30:00Z',
      framework: 'DISC',
      assessmentType: 'Leadership Style',
      difficulty: 'Avancé',
      aiInterviewer: {
        name: 'Marcus Leader',
        personality: 'Charismatique et direct',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['Leadership', 'Styles de management', 'Performance'],
        experience: '15+ ans en coaching exécutif',
      },
    },
  ],

  sessionReports: [
    {
      id: 'pers-report-001',
      sessionId: 'pers-session-001',
      overallProfile: {
        personalityType: 'Innovateur Analytique',
        typeDescription:
          "Profil caractérisé par une forte ouverture à l'expérience combinée à une conscienciosité élevée. Vous êtes naturellement porté vers l'innovation structurée et l'amélioration des systèmes.",
        dominantTraits: [
          "Ouverture à l'expérience",
          'Conscienciosité',
          'Stabilité émotionnelle',
        ],
        uniqueStrengths: [
          'Capacité à innover tout en maintenant la rigueur',
          'Pensée analytique et créative combinée',
          'Résilience face aux défis complexes',
          'Autonomie et autodiscipline',
          'Vision stratégique à long terme',
        ],
        potentialChallenges: [
          'Peut paraître distant dans les relations interpersonnelles',
          'Tendance au perfectionnisme',
          "Impatience face à l'inefficacité",
          'Difficulté à déléguer',
          'Peut négliger les aspects émotionnels',
        ],
        reliability: 92,
        stability: 88,
      },
      voiceAnalysis: {
        communicationStyle: {
          score: 85,
          dominantStyle: 'Analytique',
          secondaryStyle: 'Directif',
          description:
            'Votre communication est principalement analytique, caractérisée par une approche logique, factuelle et structurée. Vous intégrez également des éléments directifs qui renforcent votre impact et votre leadership.',
          strengths: [
            "Clarté et précision dans l'expression",
            'Structure logique du discours',
            'Capacité à simplifier des concepts complexes',
            "Ton d'autorité naturel sur les sujets maîtrisés",
          ],
          challenges: [
            'Peut manquer de chaleur émotionnelle',
            "Tendance à surcharger d'informations",
            "Impatience occasionnelle dans l'explication",
            "Pourrait renforcer l'aspect relationnel",
          ],
          adaptability: 78,
        },
        emotionalExpression: {
          score: 72,
          emotionalRange: 68,
          emotionalClarity: 82,
          emotionalAuthenticity: 85,
          description:
            'Votre expression émotionnelle est modérée et contrôlée. Vous communiquez vos émotions avec clarté quand vous choisissez de les exprimer, mais vous maintenez généralement une certaine réserve émotionnelle.',
          strengths: [
            'Authenticité émotionnelle quand vous vous exprimez',
            'Capacité à rester calme sous pression',
            'Expression émotionnelle appropriée au contexte',
            'Bonne gestion des émotions négatives',
          ],
          challenges: [
            'Gamme émotionnelle exprimée relativement restreinte',
            'Pourrait paraître distant dans certains contextes',
            'Difficulté à exprimer la vulnérabilité',
            'Tendance à intellectualiser les émotions',
          ],
          emotionalJourney: [
            {
              timestamp: '00:05:00',
              emotion: 'Intérêt intellectuel',
              intensity: 75,
              context: 'Discussion sur les objectifs de carrière',
            },
            {
              timestamp: '00:12:00',
              emotion: 'Enthousiasme',
              intensity: 65,
              context: 'Évocation de projets innovants',
            },
            {
              timestamp: '00:18:00',
              emotion: 'Frustration légère',
              intensity: 55,
              context: "Mention d'obstacles organisationnels",
            },
            {
              timestamp: '00:25:00',
              emotion: 'Détermination',
              intensity: 80,
              context: 'Stratégies de résolution de problèmes',
            },
            {
              timestamp: '00:35:00',
              emotion: 'Satisfaction',
              intensity: 70,
              context: 'Réflexion sur accomplissements',
            },
            {
              timestamp: '00:42:00',
              emotion: 'Curiosité',
              intensity: 85,
              context: 'Exploration de nouvelles possibilités',
            },
          ],
        },
        personalityTraits: {
          extraversion: 65,
          agreeableness: 70,
          conscientiousness: 92,
          neuroticism: 25,
          openness: 88,
          description:
            'Votre profil Big Five révèle une personne hautement consciencieuse et ouverte aux expériences, avec une stabilité émotionnelle élevée. Votre extraversion et agréabilité sont modérées, ce qui vous donne un équilibre entre sociabilité et indépendance.',
          dominantTraits: [
            'Conscienciosité (organisation, fiabilité, autodiscipline)',
            'Ouverture (créativité, curiosité intellectuelle, innovation)',
            'Stabilité émotionnelle (calme sous pression, résilience)',
          ],
          balancedTraits: [
            'Extraversion (sociabilité équilibrée avec besoin de réflexion)',
            "Agréabilité (coopération avec capacité d'affirmation)",
          ],
          developmentAreas: [
            "Renforcer l'intelligence émotionnelle",
            'Développer plus de flexibilité face aux imprévus',
            "Cultiver davantage l'empathie dans la communication",
          ],
        },
        interpersonalDynamics: {
          score: 76,
          empathy: 72,
          assertiveness: 85,
          collaboration: 78,
          leadership: 88,
          description:
            'Votre style interpersonnel combine un leadership fort et une assertivité élevée avec une collaboration fonctionnelle. Votre empathie est présente mais pourrait être développée davantage pour renforcer vos relations.',
          strengths: [
            'Leadership naturel et capacité à diriger',
            'Communication claire des attentes',
            'Capacité à prendre des décisions difficiles',
            'Collaboration efficace sur des objectifs communs',
          ],
          challenges: [
            'Pourrait approfondir la compréhension des besoins émotionnels',
            'Tendance à prioriser la tâche sur la relation',
            'Impatience potentielle avec les personnes moins directes',
            'Peut intimider sans le vouloir',
          ],
        },
        cognitiveStyle: {
          score: 90,
          analyticalThinking: 95,
          creativeThinking: 85,
          practicalThinking: 88,
          abstractThinking: 92,
          description:
            "Votre style cognitif est remarquablement équilibré entre analytique et créatif, avec une forte capacité d'abstraction. Vous excellez dans l'analyse systématique tout en maintenant une ouverture aux idées innovantes.",
          dominantStyles: [
            'Pensée analytique (décomposition des problèmes complexes)',
            'Pensée abstraite (conceptualisation et vision systémique)',
            'Pensée créative (génération de solutions innovantes)',
          ],
          developmentAreas: [
            "Intégrer davantage les facteurs émotionnels dans l'analyse",
            "Renforcer l'application pratique immédiate des idées",
            'Simplifier la communication des concepts complexes',
          ],
        },
        valueExpression: {
          score: 82,
          clarity: 85,
          consistency: 88,
          authenticity: 84,
          description:
            'Vos valeurs sont exprimées avec clarté et cohérence. Vous démontrez un fort alignement entre vos principes déclarés et votre comportement observable.',
          coreValues: [
            'Excellence et qualité',
            'Innovation et progrès',
            'Intégrité et honnêteté',
            'Autonomie et indépendance',
            'Impact et contribution',
          ],
          potentialConflicts: [
            'Tension entre perfectionnisme et pragmatisme',
            'Équilibre entre autonomie et collaboration',
            'Conciliation entre efficacité et relations humaines',
          ],
        },
      },
      careerInsights: {
        idealRoles: [
          "Directeur de l'Innovation",
          'Architecte de Solutions',
          'Consultant en Stratégie',
          'Chef de Projet Transformation',
          'Responsable R&D',
        ],
        workEnvironments: [
          "Environnements innovants valorisant l'autonomie",
          'Cultures méritocratiques basées sur les résultats',
          'Organisations structurées mais flexibles',
          'Équipes multidisciplinaires orientées solutions',
          'Contextes internationaux et dynamiques',
        ],
        leadershipStyle:
          "Leadership transformationnel avec focus sur la vision et l'innovation. Vous inspirez par l'exemple et les idées plutôt que par le charisme émotionnel.",
        teamContribution:
          "Apporteur de vision stratégique et de rigueur analytique. Catalyseur d'amélioration et d'innovation dans les processus et systèmes.",
        communicationPreferences:
          'Communication directe, factuelle et orientée solutions. Préférence pour les échanges structurés avec un objectif clair.',
        motivationalDrivers: [
          'Résolution de problèmes complexes',
          'Innovation et amélioration continue',
          "Reconnaissance de l'expertise",
          'Autonomie dans la prise de décision',
          'Impact mesurable et significatif',
        ],
        stressResponses: [
          "Tendance à l'hyperanalyse sous pression",
          "Repli sur soi pour traiter l'information",
          "Possible irritabilité face à l'inefficacité",
          'Augmentation du besoin de contrôle',
          'Focalisation accrue sur les détails',
        ],
        decisionMakingStyle:
          'Approche analytique et systématique, intégrant données et vision long terme. Tendance à considérer multiples options avant de décider.',
      },
      relationshipDynamics: {
        collaborationStyle:
          "Collaboration orientée objectifs avec préférence pour les rôles et responsabilités clairement définis. Vous valorisez l'expertise et l'autonomie dans le travail d'équipe.",
        conflictResolution:
          'Approche analytique des conflits, cherchant à comprendre les causes profondes et à trouver des solutions rationnelles. Peut manquer de sensibilité aux aspects émotionnels.',
        teamRole:
          "Naturellement porté vers les rôles de stratège, d'expert ou d'innovateur. Peut assumer le leadership quand nécessaire, particulièrement sur des projets complexes.",
        communicationNeeds:
          'Besoin de clarté, de précision et de pertinence dans la communication. Préférence pour les informations complètes et les discussions basées sur des faits.',
        feedbackStyle:
          'Donne un feedback direct, factuel et orienté amélioration. Préfère recevoir des feedbacks spécifiques, constructifs et non-émotionnels.',
        trustBuilding:
          "Construit la confiance par la compétence démontrée, la cohérence et le respect des engagements. Valorise l'intégrité intellectuelle et la fiabilité.",
        compatibilities: {
          highCompatibility: [
            'Types orientés résultats et innovation',
            'Communicateurs directs et factuels',
            'Personnalités autonomes et organisées',
            'Profils analytiques et stratégiques',
          ],
          moderateCompatibility: [
            'Personnalités très relationnelles avec focus sur la tâche',
            'Innovateurs avec structure',
            'Médiateurs pragmatiques',
          ],
          potentialChallenges: [
            'Personnalités très émotionnelles ou impulsives',
            'Communicateurs indirects ou ambigus',
            'Profils résistants au changement ou très conservateurs',
            'Styles très désorganisés ou chaotiques',
          ],
        },
      },
      developmentPlan: {
        selfAwarenessInsights: [
          'Votre tendance au perfectionnisme peut parfois limiter votre efficacité',
          'Votre style direct peut être perçu comme abrupt par certains profils',
          "Vous pouvez sous-estimer l'importance des facteurs émotionnels",
          "Votre besoin d'autonomie peut parfois créer une distance",
          "Votre focus sur l'innovation peut négliger la stabilité nécessaire",
        ],
        shortTermActions: [
          "Pratiquer l'écoute active avec focus sur les aspects émotionnels",
          'Intégrer un temps de réflexion sur les dynamiques relationnelles',
          'Solliciter activement le feedback sur votre style de communication',
          'Expérimenter avec la délégation plus fréquente',
          "Pratiquer la reconnaissance explicite des contributions d'autrui",
        ],
        longTermDevelopment: [
          "Développer l'intelligence émotionnelle par coaching ou formation",
          'Cultiver la flexibilité dans les approches de résolution de problèmes',
          "Renforcer les compétences en développement d'équipe",
          'Explorer des techniques de communication adaptative',
          "Équilibrer focus sur résultats et bien-être de l'équipe",
        ],
        recommendedResources: {
          books: [
            'Emotional Intelligence 2.0 par Travis Bradberry',
            'Quiet Leadership par David Rock',
            'Mindset: The New Psychology of Success par Carol Dweck',
            'The Five Dysfunctions of a Team par Patrick Lencioni',
          ],
          courses: [
            'Leadership émotionnel',
            'Communication adaptative',
            "Coaching d'équipe",
            "Développement de l'empathie en contexte professionnel",
          ],
          exercises: [
            'Journal de réflexion sur les interactions quotidiennes',
            'Pratique de la pleine conscience 10 minutes par jour',
            'Exercices de reformulation empathique',
            'Analyse des déclencheurs émotionnels',
          ],
          practices: [
            'Feedback 360° trimestriel',
            'Mentorat croisé avec profil complémentaire',
            'Techniques de respiration pour la régulation émotionnelle',
            'Pratique régulière de la délégation consciente',
          ],
        },
        potentialPitfalls: [
          "Surinvestissement dans la perfection au détriment de l'avancement",
          "Négligence des besoins émotionnels de l'équipe",
          'Impatience face aux processus nécessaires',
          'Isolement dans la prise de décision',
          'Résistance au feedback perçu comme non-rationnel',
        ],
        growthMindsetStrategies: [
          "Reframing des erreurs comme opportunités d'apprentissage",
          'Valorisation du processus autant que du résultat',
          'Curiosité active face aux perspectives divergentes',
          'Expérimentation régulière hors de la zone de confort',
          'Célébration des progrès incrémentaux',
        ],
      },
      professionalApplication: {
        interviewStrategies: [
          "Mettre en avant votre capacité d'innovation structurée",
          'Illustrer votre leadership par des exemples concrets de transformation',
          'Démontrer votre approche analytique de résolution de problèmes',
          'Adresser proactivement votre conscience des aspects relationnels',
          "Présenter votre vision stratégique et capacité d'exécution",
        ],
        resumeHighlights: [
          "Projets d'innovation et transformation",
          "Leadership d'équipes techniques ou multidisciplinaires",
          'Résolution de problèmes complexes',
          'Optimisation de processus et systèmes',
          'Initiatives stratégiques à impact mesurable',
        ],
        personalBranding: [
          'Expert innovant avec rigueur analytique',
          'Leader transformationnel orienté résultats',
          "Stratège visionnaire avec capacité d'exécution",
          'Solutionneur de problèmes complexes',
          "Catalyseur d'amélioration continue",
        ],
        networkingApproach: [
          'Networking ciblé basé sur intérêts professionnels communs',
          "Participation à des communautés d'innovation et de leadership",
          "Partage de connaissances et d'expertise comme point d'entrée",
          'Approche qualitative plutôt que quantitative',
          'Suivi structuré et régulier des contacts clés',
        ],
        careerAdvancement: [
          'Progression vers des rôles de direction stratégique',
          'Spécialisation en transformation et innovation',
          "Développement d'expertise en management du changement",
          "Renforcement des compétences en leadership d'équipe",
          'Exploration de rôles de conseil stratégique',
        ],
      },
    },
  ],

  userProgress: {
    totalSessions: 4,
    discoveredTypes: 3,
    frameworksExplored: 2,
    totalTimeSpent: '3h 15min',
    dominantTraits: [
      'Analytique',
      'Innovateur',
      'Consciencieux',
      'Autonome',
      'Résilient',
    ],
    developmentAreas: [
      'Intelligence émotionnelle',
      'Communication adaptative',
      'Délégation',
      'Empathie',
    ],
    nextRecommendedSession: 'DISC Leadership Style',
    personalityEvolution: [
      {
        date: '2024-01-15',
        framework: 'Big Five',
        type: 'Innovateur Analytique',
        stability: 92,
        insights: [
          "Haute ouverture à l'expérience",
          'Conscienciosité élevée',
          'Extraversion modérée',
        ],
      },
      {
        date: '2024-01-10',
        framework: 'MBTI',
        type: 'INTJ',
        stability: 85,
        insights: [
          "Préférence pour l'introversion",
          'Forte intuition',
          'Pensée analytique',
          'Structure',
        ],
      },
      {
        date: '2024-01-05',
        framework: 'Enneagram',
        type: 'Type 5 (aile 6)',
        stability: 78,
        insights: [
          'Observateur',
          'Analytique',
          "Besoin d'autonomie",
          'Recherche de connaissance',
        ],
      },
    ],
    careerMatches: [
      {
        role: "Directeur de l'Innovation",
        compatibility: 92,
        strengths: [
          'Vision stratégique',
          'Pensée analytique',
          'Orientation résultats',
        ],
        challenges: [
          "Management d'équipes créatives",
          'Communication inspirante',
        ],
      },
      {
        role: 'Architecte de Solutions',
        compatibility: 90,
        strengths: ['Pensée systémique', 'Résolution de problèmes', 'Rigueur'],
        challenges: [
          'Collaboration avec non-techniciens',
          'Simplification pour utilisateurs',
        ],
      },
      {
        role: 'Consultant en Stratégie',
        compatibility: 88,
        strengths: ['Analyse', 'Vision stratégique', 'Structuration'],
        challenges: [
          'Développement relation client',
          "Adaptation aux cultures d'entreprise",
        ],
      },
      {
        role: 'Responsable Transformation',
        compatibility: 85,
        strengths: ['Gestion du changement', 'Vision systémique', 'Leadership'],
        challenges: ['Gestion de la résistance', 'Communication empathique'],
      },
    ],
  },

  statistics: {
    totalSessions: 5840,
    averageScore: 'N/A',
    averageInsightValue: 4.7,
    mostPopularFramework: 'MBTI',
    mostPopularAssessment: 'Career Fit',
    averageDuration: '45 minutes',
    successRate: 96,
    userSatisfaction: 4.8,
    careerImpactReported: '+22% satisfaction professionnelle',
  },

  personalityTips: [
    'Il n\'y a pas de "bonne" ou "mauvaise" personnalité - chaque profil a ses forces uniques',
    "Votre personnalité n'est pas figée - elle peut évoluer avec le temps et les expériences",
    'Répondez aux questions de manière authentique plutôt que ce que vous pensez être "idéal"',
    'Utilisez les insights de personnalité comme outils de développement, pas comme limitations',
    'Combinez plusieurs frameworks pour une vision plus complète de votre personnalité',
    'Considérez comment votre style peut être perçu différemment selon les cultures',
    'Développez la flexibilité pour adapter votre style naturel selon les contextes',
  ],

  technicalRequirements: {
    webCall: {
      browser: ['Chrome 90+', 'Firefox 88+', 'Safari 14+', 'Edge 90+'],
      bandwidth: 'Minimum 1 Mbps upload/download',
      microphone: 'Microphone de qualité recommandé',
      environment: 'Environnement calme et privé',
      preparation: 'Auto-réflexion préalable recommandée',
    },
    phoneCall: {
      quality: 'Ligne fixe ou mobile avec excellente réception',
      environment: 'Espace privé et silencieux',
      backup: 'Numéro de secours recommandé',
      duration: 'Forfait illimité conseillé',
      preparation: 'Questionnaire préliminaire à compléter',
    },
  },

  pricing: {
    webCall: {
      standard: {
        price: 65,
        duration: '45 min',
        features: [
          'Rapport de personnalité',
          'IA spécialisée',
          'Insights carrière',
        ],
      },
      premium: {
        price: 85,
        duration: '60 min',
        features: ['Rapport détaillé', 'IA experte', 'Plan de développement'],
      },
      executive: {
        price: 120,
        duration: '75 min',
        features: [
          'Rapport complet',
          'IA senior',
          'Coaching personnalisé',
          'Suivi 30 jours',
        ],
      },
    },
    phoneCall: {
      standard: {
        price: 60,
        duration: '45 min',
        features: [
          'Rapport de personnalité',
          'IA spécialisée',
          'Insights carrière',
        ],
      },
      premium: {
        price: 80,
        duration: '60 min',
        features: ['Rapport détaillé', 'IA experte', 'Plan de développement'],
      },
      executive: {
        price: 115,
        duration: '75 min',
        features: [
          'Rapport complet',
          'IA senior',
          'Coaching personnalisé',
          'Suivi 30 jours',
        ],
      },
    },
  },

  personalityTypes: {
    mbti: [
      {
        code: 'INTJ',
        name: 'Architecte',
        description:
          'Stratège innovant et indépendant avec une vision à long terme',
        frequency: '2.1%',
        strengths: [
          'Vision stratégique',
          'Indépendance',
          'Détermination',
          'Rationalité',
        ],
        challenges: ['Peut paraître distant', 'Perfectionnisme', 'Impatience'],
        careerFit: [
          'Stratégie',
          'Architecture',
          'Sciences',
          'Ingénierie',
          'Recherche',
        ],
      },
      {
        code: 'ENTJ',
        name: 'Commandant',
        description: 'Leader charismatique et efficace avec une vision claire',
        frequency: '1.8%',
        strengths: ['Leadership', 'Détermination', 'Stratégie', 'Efficacité'],
        challenges: ['Dominance', 'Impatience', 'Tolérance émotionnelle'],
        careerFit: [
          'Direction',
          'Entrepreneuriat',
          'Consulting',
          'Politique',
          'Droit',
        ],
      },
      {
        code: 'INFJ',
        name: 'Avocat',
        description:
          'Idéaliste visionnaire avec une profonde compréhension humaine',
        frequency: '1.5%',
        strengths: ['Intuition', 'Empathie', 'Créativité', 'Détermination'],
        challenges: ['Perfectionnisme', 'Burnout', 'Critique excessive'],
        careerFit: ['Conseil', 'Psychologie', 'RH', 'Enseignement', 'Arts'],
      },
    ],
    disc: [
      {
        code: 'D',
        name: 'Dominance',
        description: 'Direct, décisif et orienté résultats',
        frequency: '10-15%',
        strengths: [
          'Prise de décision',
          'Initiative',
          'Résolution de problèmes',
        ],
        challenges: ['Impatience', 'Écoute', 'Sensibilité aux autres'],
        careerFit: ['Direction', 'Entrepreneuriat', 'Vente', 'Management'],
      },
      {
        code: 'I',
        name: 'Influence',
        description: 'Enthousiaste, expressif et orienté relations',
        frequency: '25-30%',
        strengths: ['Communication', 'Persuasion', 'Optimisme', 'Réseautage'],
        challenges: ['Organisation', 'Détails', 'Suivi', 'Objectivité'],
        careerFit: ['Vente', 'Marketing', 'Relations publiques', 'Formation'],
      },
      {
        code: 'S',
        name: 'Stabilité',
        description: 'Calme, fiable et orienté coopération',
        frequency: '30-35%',
        strengths: ['Fiabilité', 'Écoute', "Travail d'équipe", 'Patience'],
        challenges: [
          'Résistance au changement',
          'Assertivité',
          'Décision rapide',
        ],
        careerFit: ['RH', 'Support', 'Administration', 'Enseignement'],
      },
      {
        code: 'C',
        name: 'Conformité',
        description: 'Précis, analytique et orienté qualité',
        frequency: '20-25%',
        strengths: ['Analyse', 'Précision', 'Organisation', 'Qualité'],
        challenges: ['Perfectionnisme', 'Prise de risque', 'Spontanéité'],
        careerFit: ['Finance', 'IT', 'Qualité', 'Recherche', 'Ingénierie'],
      },
    ],
    enneagram: [
      {
        code: 'Type 1',
        name: 'Le Perfectionniste',
        description:
          "Rationnel, ordonné et principled, cherchant l'amélioration",
        frequency: '9-12%',
        strengths: ['Intégrité', 'Fiabilité', 'Amélioration', 'Éthique'],
        challenges: ['Critique', 'Rigidité', 'Impatience', 'Auto-exigence'],
        careerFit: ['Qualité', 'Éthique', 'Réforme', 'Enseignement', 'Droit'],
      },
      {
        code: 'Type 5',
        name: "L'Investigateur",
        description: 'Perspicace, innovant et isolé, cherchant la connaissance',
        frequency: '10%',
        strengths: ['Analyse', 'Innovation', 'Expertise', 'Indépendance'],
        challenges: [
          'Détachement',
          'Isolement',
          'Partage limité',
          'Énergie sociale',
        ],
        careerFit: [
          'Recherche',
          'Analyse',
          'Technologie',
          'Stratégie',
          'Sciences',
        ],
      },
      {
        code: 'Type 8',
        name: 'Le Challenger',
        description: 'Puissant, dominant et protecteur, cherchant le contrôle',
        frequency: '8-9%',
        strengths: ['Leadership', 'Protection', 'Décision', 'Courage'],
        challenges: ['Contrôle', 'Confrontation', 'Vulnérabilité', 'Nuance'],
        careerFit: [
          'Direction',
          'Entrepreneuriat',
          'Droit',
          'Politique',
          'Sécurité',
        ],
      },
    ],
  },

  scientificValidation: {
    bigFive: {
      reliability: 0.92,
      testRetestReliability: 0.89,
      crossCulturalValidity: 0.87,
      predictiveValidity: 0.84,
      studies: 15000,
    },
    mbti: {
      reliability: 0.83,
      testRetestReliability: 0.75,
      crossCulturalValidity: 0.71,
      predictiveValidity: 0.68,
      studies: 8500,
    },
    disc: {
      reliability: 0.87,
      testRetestReliability: 0.82,
      crossCulturalValidity: 0.79,
      predictiveValidity: 0.76,
      studies: 6200,
    },
  },

  businessApplications: {
    recruitment: {
      usage: 78,
      effectiveness: 84,
      topFrameworks: ['Big Five', 'DISC', 'CliftonStrengths'],
    },
    teamDevelopment: {
      usage: 89,
      effectiveness: 91,
      topFrameworks: ['MBTI', 'DISC', 'Big Five'],
    },
    leadership: {
      usage: 67,
      effectiveness: 87,
      topFrameworks: ['Big Five', 'CliftonStrengths', 'Enneagram'],
    },
    coaching: {
      usage: 94,
      effectiveness: 93,
      topFrameworks: ['Enneagram', 'Big Five', 'Values'],
    },
  },
};
