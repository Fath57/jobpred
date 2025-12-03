export interface SpeechTestPerformance {
  testId: string;
  testName: string;
  category: string;
  completedAt: string;
  score: number;
  level: string;
  timeSpent: string;
  strengths: string[];
  improvements: string[];
  certificateEarned: boolean;
}

export interface SpeechCategoryInsight {
  category: string;
  icon: string;
  color: string;
  averageScore: number;
  testsCompleted: number;
  totalTests: number;
  level: string;
  trend: 'up' | 'down' | 'stable';
  topStrengths: string[];
  keyImprovements: string[];
  nextRecommendedTest: string;
}

export interface VoiceSkillGap {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  estimatedTimeToImprove: string;
  recommendedActions: string[];
  relatedTests: string[];
}

export interface VoiceCareerReadiness {
  overallScore: number;
  confidenceLevel: string;
  readinessPercentage: number;
  interviewSuccessRate: number;
  strengths: string[];
  criticalGaps: string[];
  timeToReadiness: string;
  priorityActions: string[];
}

export interface RecommendedVoiceTest {
  testId: string;
  testName: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedDuration: string;
  expectedImpact: string;
  reason: string;
  skillsTargeted: string[];
  difficulty: string;
  completionBonus: number;
}

export interface VoicePersonalizedInsight {
  id: string;
  type: 'strength' | 'improvement' | 'opportunity' | 'warning';
  title: string;
  description: string;
  actionable: boolean;
  impact: 'high' | 'medium' | 'low';
  timeframe: 'immediate' | 'short-term' | 'long-term';
  relatedTests?: string[];
  resources?: string[];
}

export interface VoiceProgressEvolution {
  date: string;
  overallScore: number;
  categoryScores: Record<string, number>;
  testsCompleted: number;
  certificatesEarned: number;
  milestone?: string;
}

export interface VoiceBenchmarkComparison {
  metric: string;
  yourScore: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
  interpretation: string;
}

export interface VoiceAnalysisSummary {
  assertiveness: {
    score: number;
    level: string;
    trend: 'up' | 'down' | 'stable';
    strengths: string[];
    improvements: string[];
  };
  tone: {
    score: number;
    dominantTone: string;
    variability: number;
    strengths: string[];
    improvements: string[];
  };
  emotionalExpression: {
    score: number;
    stability: number;
    authenticity: number;
    strengths: string[];
    improvements: string[];
  };
  speechPatterns: {
    pace: {
      score: number;
      wordsPerMinute: number;
      optimal: boolean;
      trend: 'up' | 'down' | 'stable';
    };
    clarity: {
      score: number;
      articulation: number;
      trend: 'up' | 'down' | 'stable';
    };
    fluency: {
      score: number;
      hesitations: number;
      fillerWords: number;
      trend: 'up' | 'down' | 'stable';
    };
  };
}

export interface SpeechTestFeedbackData {
  candidateProfile: {
    name: string;
    targetPosition: string;
    experience: string;
    industry: string;
    assessmentStartDate: string;
    lastActivity: string;
  };
  overallPerformance: {
    totalTestsCompleted: number;
    totalTimeSpent: string;
    averageScore: number;
    certificatesEarned: number;
    currentLevel: string;
    improvementRate: number;
    consistencyScore: number;
  };
  voiceAnalysisSummary: VoiceAnalysisSummary;
  testPerformances: SpeechTestPerformance[];
  categoryInsights: SpeechCategoryInsight[];
  voiceSkillGaps: VoiceSkillGap[];
  voiceCareerReadiness: VoiceCareerReadiness;
  recommendedVoiceTests: RecommendedVoiceTest[];
  voicePersonalizedInsights: VoicePersonalizedInsight[];
  voiceProgressEvolution: VoiceProgressEvolution[];
  voiceBenchmarkComparison: VoiceBenchmarkComparison[];
  actionPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  nextMilestones: {
    title: string;
    description: string;
    targetDate: string;
    requirements: string[];
    reward: string;
  }[];
}

export const speechTestFeedbackData: SpeechTestFeedbackData = {
  candidateProfile: {
    name: 'Jean René Roustand',
    targetPosition: 'Directeur de Projet IT Senior',
    experience: '15+ ans',
    industry: 'Technologie',
    assessmentStartDate: '2024-01-05',
    lastActivity: '2024-01-15',
  },

  overallPerformance: {
    totalTestsCompleted: 18,
    totalTimeSpent: '9h 30min',
    averageScore: 79,
    certificatesEarned: 12,
    currentLevel: 'Avancé',
    improvementRate: 14,
    consistencyScore: 85,
  },

  voiceAnalysisSummary: {
    assertiveness: {
      score: 82,
      level: 'Avancé',
      trend: 'up',
      strengths: [
        'Expression claire des opinions',
        'Défense efficace des positions',
        "Ton d'autorité naturel",
      ],
      improvements: [
        'Équilibrer fermeté et diplomatie',
        "Adapter l'assertivité selon l'interlocuteur",
        "Intégrer plus d'écoute active",
      ],
    },
    tone: {
      score: 78,
      dominantTone: 'Professionnel et confiant',
      variability: 72,
      strengths: [
        'Ton professionnel bien maîtrisé',
        'Adaptation au contexte formel',
        'Crédibilité vocale',
      ],
      improvements: [
        'Développer plus de variations tonales',
        'Intégrer plus de chaleur dans certains contextes',
        'Travailler les nuances émotionnelles',
      ],
    },
    emotionalExpression: {
      score: 75,
      stability: 88,
      authenticity: 82,
      strengths: [
        'Excellente stabilité émotionnelle',
        "Authenticité dans l'expression",
        'Contrôle émotionnel approprié',
      ],
      improvements: [
        "Élargir la gamme d'émotions exprimées",
        "Intégrer plus d'enthousiasme quand approprié",
        "Développer l'expression de l'empathie vocale",
      ],
    },
    speechPatterns: {
      pace: {
        score: 85,
        wordsPerMinute: 148,
        optimal: true,
        trend: 'stable',
      },
      clarity: {
        score: 90,
        articulation: 92,
        trend: 'up',
      },
      fluency: {
        score: 76,
        hesitations: 9,
        fillerWords: 14,
        trend: 'up',
      },
    },
  },

  testPerformances: [
    {
      testId: 'soft-comm-001',
      testName: 'Communication Interpersonnelle Avancée',
      category: 'Soft Skills',
      completedAt: '2024-01-15T14:30:00Z',
      score: 84,
      level: 'Avancé',
      timeSpent: '32 minutes',
      strengths: [
        "Clarté d'expression exceptionnelle",
        'Structure logique du discours',
        'Adaptation au contexte professionnel',
      ],
      improvements: [
        "Intégrer plus d'écoute active",
        "Développer l'expression empathique",
        'Réduire les mots de remplissage',
      ],
      certificateEarned: true,
    },
    {
      testId: 'tech-backend-001',
      testName: 'Communication Technique Backend',
      category: 'Hard Skills',
      completedAt: '2024-01-13T10:45:00Z',
      score: 78,
      level: 'Senior',
      timeSpent: '47 minutes',
      strengths: [
        'Explication claire des concepts techniques',
        "Utilisation efficace d'analogies",
        'Structure logique des explications',
      ],
      improvements: [
        'Poser plus de questions clarifiantes',
        "Adapter le niveau technique à l'audience",
        'Structurer davantage les réponses longues',
      ],
      certificateEarned: true,
    },
    {
      testId: 'lang-business-001',
      testName: 'Business English Communication',
      category: 'Language Skills',
      completedAt: '2024-01-11T11:30:00Z',
      score: 82,
      level: 'B2',
      timeSpent: '42 minutes',
      strengths: [
        'Vocabulaire business riche',
        'Fluidité dans les discussions professionnelles',
        'Bonne compréhension des questions complexes',
      ],
      improvements: [
        'Perfectionner la prononciation de certains sons',
        'Réduire les hésitations sur sujets techniques',
        'Élargir le vocabulaire idiomatique',
      ],
      certificateEarned: true,
    },
    {
      testId: 'pers-big5-001',
      testName: 'Big Five Professionnel Vocal',
      category: 'Personality Skills',
      completedAt: '2024-01-09T13:45:00Z',
      score: 'N/A',
      level: 'Innovateur Analytique',
      timeSpent: '48 minutes',
      strengths: [
        'Communication analytique structurée',
        'Expression claire des valeurs',
        'Style cognitif équilibré',
      ],
      improvements: [
        "Développer l'expression émotionnelle",
        'Intégrer plus de chaleur relationnelle',
        'Varier les styles de communication',
      ],
      certificateEarned: true,
    },
    {
      testId: 'hr-behavioral-001',
      testName: 'Entretien Comportemental Standard',
      category: 'HR Interview Prep',
      completedAt: '2024-01-07T15:15:00Z',
      score: 80,
      level: 'Avancé',
      timeSpent: '38 minutes',
      strengths: [
        'Structure STAR bien maîtrisée',
        'Exemples concrets et pertinents',
        'Ton professionnel et confiant',
      ],
      improvements: [
        'Développer plus de concision',
        "Intégrer plus d'impact émotionnel",
        'Améliorer les transitions entre idées',
      ],
      certificateEarned: true,
    },
  ],

  categoryInsights: [
    {
      category: 'Soft Skills',
      icon: 'Users',
      color: 'bg-blue-500',
      averageScore: 83,
      testsCompleted: 6,
      totalTests: 10,
      level: 'Avancé',
      trend: 'up',
      topStrengths: [
        "Clarté d'expression",
        'Structure du discours',
        'Ton professionnel',
        'Gestion du stress vocal',
      ],
      keyImprovements: [
        'Expression empathique',
        'Écoute active vocale',
        'Variation tonale',
        'Réduction des hésitations',
      ],
      nextRecommendedTest: 'Leadership Vocal Situationnel',
    },
    {
      category: 'Hard Skills',
      icon: 'Code',
      color: 'bg-purple-500',
      averageScore: 78,
      testsCompleted: 4,
      totalTests: 8,
      level: 'Senior',
      trend: 'up',
      topStrengths: [
        'Explication de concepts techniques',
        "Utilisation d'analogies",
        'Clarté technique',
        'Structure logique',
      ],
      keyImprovements: [
        'Questions clarifiantes',
        'Adaptation au niveau technique',
        'Exemples concrets',
        'Vérification de compréhension',
      ],
      nextRecommendedTest: 'Communication Architecture Système',
    },
    {
      category: 'Language Skills',
      icon: 'Globe',
      color: 'bg-emerald-500',
      averageScore: 80,
      testsCompleted: 3,
      totalTests: 6,
      level: 'B2',
      trend: 'up',
      topStrengths: [
        'Vocabulaire professionnel',
        'Fluidité contextuelle',
        'Compréhension',
        "Clarté d'expression",
      ],
      keyImprovements: [
        'Prononciation avancée',
        'Expressions idiomatiques',
        'Réduction des hésitations',
        'Nuances culturelles',
      ],
      nextRecommendedTest: 'English Presentation Skills C1',
    },
    {
      category: 'Personality Skills',
      icon: 'Brain',
      color: 'bg-amber-500',
      averageScore: 'N/A',
      testsCompleted: 2,
      totalTests: 5,
      level: 'Profil Défini',
      trend: 'stable',
      topStrengths: [
        'Communication analytique',
        'Expression des valeurs',
        'Style cognitif',
        'Cohérence vocale',
      ],
      keyImprovements: [
        'Expression émotionnelle',
        'Chaleur relationnelle',
        'Adaptabilité de style',
        'Gamme expressive',
      ],
      nextRecommendedTest: 'DISC Communication Style',
    },
    {
      category: 'HR Interview Prep',
      icon: 'MessageSquare',
      color: 'bg-indigo-500',
      averageScore: 78,
      testsCompleted: 3,
      totalTests: 6,
      level: 'Avancé',
      trend: 'up',
      topStrengths: [
        'Structure des réponses',
        'Ton professionnel',
        'Exemples pertinents',
        'Gestion du stress',
      ],
      keyImprovements: [
        'Concision',
        'Impact émotionnel',
        'Storytelling',
        'Questions de conclusion',
      ],
      nextRecommendedTest: 'Entretien Panel Exécutif',
    },
  ],

  voiceSkillGaps: [
    {
      skill: 'Expression Empathique Vocale',
      currentLevel: 'Intermédiaire',
      targetLevel: 'Avancé',
      importance: 'high',
      estimatedTimeToImprove: '2-3 mois',
      recommendedActions: [
        'Formation en communication empathique',
        'Exercices de variation tonale émotionnelle',
        "Pratique de l'écoute active vocale",
        'Feedback régulier sur la chaleur vocale',
      ],
      relatedTests: [
        'Empathic Leadership Voice',
        'Emotional Intelligence Communication',
      ],
    },
    {
      skill: 'Storytelling Vocal',
      currentLevel: 'Intermédiaire',
      targetLevel: 'Expert',
      importance: 'high',
      estimatedTimeToImprove: '3-4 mois',
      recommendedActions: [
        'Cours de narration professionnelle',
        'Pratique de la structure narrative',
        "Exercices de modulation vocale pour l'engagement",
        'Enregistrement et analyse de récits',
      ],
      relatedTests: ['Executive Storytelling', 'Narrative Leadership'],
    },
    {
      skill: 'Adaptabilité Vocale Contextuelle',
      currentLevel: 'Avancé',
      targetLevel: 'Expert',
      importance: 'medium',
      estimatedTimeToImprove: '2-3 mois',
      recommendedActions: [
        'Pratique de différents registres vocaux',
        "Exercices d'adaptation à différentes audiences",
        'Simulation de contextes variés',
        'Feedback sur la flexibilité vocale',
      ],
      relatedTests: ['Contextual Communication', 'Adaptive Leadership Voice'],
    },
    {
      skill: 'Gestion des Silences Stratégiques',
      currentLevel: 'Intermédiaire',
      targetLevel: 'Avancé',
      importance: 'medium',
      estimatedTimeToImprove: '1-2 mois',
      recommendedActions: [
        'Exercices de pauses stratégiques',
        'Pratique du silence confortable',
        "Techniques d'impact par le silence",
        "Analyse de l'effet des pauses",
      ],
      relatedTests: ['Executive Presence', 'Strategic Communication'],
    },
  ],

  voiceCareerReadiness: {
    overallScore: 82,
    confidenceLevel: 'Élevé',
    readinessPercentage: 85,
    interviewSuccessRate: 88,
    strengths: [
      'Communication professionnelle claire et structurée',
      "Ton d'autorité naturel et crédible",
      'Excellente articulation et diction',
      'Capacité à expliquer des concepts complexes',
      'Gestion efficace du stress vocal',
    ],
    criticalGaps: [
      'Expression empathique à développer pour le leadership',
      "Storytelling vocal à renforcer pour l'impact",
      'Adaptabilité vocale à perfectionner pour différents contextes',
    ],
    timeToReadiness: '2-3 mois',
    priorityActions: [
      "Développer l'expression empathique vocale",
      'Maîtriser les techniques de storytelling professionnel',
      "Pratiquer l'adaptabilité vocale contextuelle",
      'Perfectionner la gestion des silences stratégiques',
    ],
  },

  recommendedVoiceTests: [
    {
      testId: 'empathic-leadership-voice',
      testName: 'Leadership Empathique Vocal',
      category: 'Soft Skills',
      priority: 'high',
      estimatedDuration: '40 minutes',
      expectedImpact: '+12 points en expression empathique',
      reason: 'Combler votre principale lacune identifiée',
      skillsTargeted: [
        'Expression empathique',
        'Écoute active vocale',
        'Communication émotionnelle',
      ],
      difficulty: 'Avancé',
      completionBonus: 15,
    },
    {
      testId: 'executive-storytelling',
      testName: 'Storytelling Exécutif',
      category: 'Soft Skills',
      priority: 'high',
      estimatedDuration: '45 minutes',
      expectedImpact: '+15 points en impact narratif',
      reason: 'Essentiel pour votre niveau de leadership',
      skillsTargeted: [
        'Narration structurée',
        'Engagement vocal',
        'Impact émotionnel',
      ],
      difficulty: 'Expert',
      completionBonus: 18,
    },
    {
      testId: 'system-architecture-communication',
      testName: 'Communication Architecture Système',
      category: 'Hard Skills',
      priority: 'medium',
      estimatedDuration: '50 minutes',
      expectedImpact: '+10 points en communication technique',
      reason: 'Aligné avec votre profil technique senior',
      skillsTargeted: [
        'Explication de concepts complexes',
        'Vulgarisation technique',
        'Analogies efficaces',
      ],
      difficulty: 'Expert',
      completionBonus: 12,
    },
    {
      testId: 'english-c1-presentation',
      testName: 'English Presentation Skills C1',
      category: 'Language Skills',
      priority: 'medium',
      estimatedDuration: '45 minutes',
      expectedImpact: '+8 points en anglais professionnel',
      reason: 'Progression naturelle vers le niveau C1',
      skillsTargeted: [
        'Présentation formelle',
        'Vocabulaire avancé',
        'Fluidité professionnelle',
      ],
      difficulty: 'Avancé',
      completionBonus: 10,
    },
    {
      testId: 'executive-panel-interview',
      testName: 'Entretien Panel Exécutif',
      category: 'HR Interview Prep',
      priority: 'medium',
      estimatedDuration: '60 minutes',
      expectedImpact: '+12 points en préparation entretien',
      reason: 'Simulation réaliste pour poste de direction',
      skillsTargeted: [
        'Gestion multi-interlocuteurs',
        'Cohérence des réponses',
        'Présence exécutive',
      ],
      difficulty: 'Expert',
      completionBonus: 15,
    },
  ],

  voicePersonalizedInsights: [
    {
      id: 'voice-insight-001',
      type: 'strength',
      title: "Clarté d'Expression Exceptionnelle",
      description:
        'Votre articulation et votre structure vocale sont dans le top 5% des candidats. Cette force majeure est immédiatement perceptible et renforce considérablement votre crédibilité professionnelle.',
      actionable: false,
      impact: 'high',
      timeframe: 'immediate',
    },
    {
      id: 'voice-insight-002',
      type: 'improvement',
      title: 'Expression Empathique à Développer',
      description:
        'Votre ton professionnel est excellent mais manque parfois de chaleur et de nuances émotionnelles, ce qui peut créer une distance dans certains contextes de leadership.',
      actionable: true,
      impact: 'high',
      timeframe: 'short-term',
      relatedTests: [
        'Empathic Leadership Voice',
        'Emotional Intelligence Communication',
      ],
      resources: [
        'Formation Communication Empathique',
        'Exercices de Variation Tonale',
      ],
    },
    {
      id: 'voice-insight-003',
      type: 'opportunity',
      title: 'Potentiel en Storytelling Exécutif',
      description:
        "Avec votre clarté d'expression et votre structure logique, vous avez une base solide pour développer un storytelling exécutif puissant qui transformerait votre impact en présentation et leadership.",
      actionable: true,
      impact: 'high',
      timeframe: 'medium-term',
      relatedTests: ['Executive Storytelling', 'Narrative Leadership'],
      resources: [
        'Masterclass Storytelling Professionnel',
        'Techniques Narratives pour Leaders',
      ],
    },
    {
      id: 'voice-insight-004',
      type: 'warning',
      title: 'Risque de Perception de Distance',
      description:
        "Votre style vocal analytique et direct, bien qu'efficace pour la communication technique, peut être perçu comme distant ou froid dans des contextes nécessitant plus de connexion émotionnelle.",
      actionable: true,
      impact: 'medium',
      timeframe: 'immediate',
      relatedTests: ['Emotional Connection', 'Leadership Presence'],
      resources: [
        'Techniques de Connexion Vocale',
        'Exercices de Chaleur Relationnelle',
      ],
    },
    {
      id: 'voice-insight-005',
      type: 'strength',
      title: 'Gestion du Stress Vocale Remarquable',
      description:
        'Votre capacité à maintenir un ton stable, un débit contrôlé et une articulation claire sous pression est exceptionnelle et constitue un atout majeur pour les situations de haute importance.',
      actionable: false,
      impact: 'high',
      timeframe: 'immediate',
    },
  ],

  voiceProgressEvolution: [
    {
      date: '2024-01-05',
      overallScore: 68,
      categoryScores: {
        'Soft Skills': 65,
        'Hard Skills': 70,
        'Language Skills': 72,
        'Personality Skills': 'N/A',
        'HR Interview Prep': 64,
      },
      testsCompleted: 4,
      certificatesEarned: 2,
    },
    {
      date: '2024-01-08',
      overallScore: 72,
      categoryScores: {
        'Soft Skills': 70,
        'Hard Skills': 74,
        'Language Skills': 75,
        'Personality Skills': 'N/A',
        'HR Interview Prep': 68,
      },
      testsCompleted: 8,
      certificatesEarned: 5,
      milestone: 'Premier certificat vocal obtenu',
    },
    {
      date: '2024-01-12',
      overallScore: 76,
      categoryScores: {
        'Soft Skills': 78,
        'Hard Skills': 76,
        'Language Skills': 78,
        'Personality Skills': 'N/A',
        'HR Interview Prep': 72,
      },
      testsCompleted: 14,
      certificatesEarned: 9,
      milestone: 'Niveau Intermédiaire+ atteint',
    },
    {
      date: '2024-01-15',
      overallScore: 79,
      categoryScores: {
        'Soft Skills': 83,
        'Hard Skills': 78,
        'Language Skills': 80,
        'Personality Skills': 'N/A',
        'HR Interview Prep': 78,
      },
      testsCompleted: 18,
      certificatesEarned: 12,
      milestone: 'Niveau Avancé atteint',
    },
  ],

  voiceBenchmarkComparison: [
    {
      metric: "Clarté d'Expression",
      yourScore: 90,
      industryAverage: 72,
      topPerformers: 94,
      percentile: 92,
      interpretation: 'Excellente clarté, dans le top 8% des professionnels',
    },
    {
      metric: 'Ton Professionnel',
      yourScore: 85,
      industryAverage: 70,
      topPerformers: 90,
      percentile: 88,
      interpretation:
        'Ton très professionnel, supérieur à la plupart des candidats',
    },
    {
      metric: 'Expression Empathique',
      yourScore: 72,
      industryAverage: 68,
      topPerformers: 88,
      percentile: 65,
      interpretation: 'Légèrement au-dessus de la moyenne, à développer',
    },
    {
      metric: 'Storytelling Vocal',
      yourScore: 74,
      industryAverage: 65,
      topPerformers: 92,
      percentile: 70,
      interpretation:
        'Bon niveau mais écart significatif avec les top performers',
    },
    {
      metric: 'Adaptabilité Contextuelle',
      yourScore: 78,
      industryAverage: 67,
      topPerformers: 90,
      percentile: 75,
      interpretation: 'Bonne adaptabilité, dans le quartile supérieur',
    },
  ],

  actionPlan: {
    immediate: [
      "Commencer les exercices d'expression empathique vocale (15 min/jour)",
      'Enregistrer et analyser vos explications techniques pour identifier les opportunités de storytelling',
      'Pratiquer la variation tonale dans différents contextes professionnels',
      'Intégrer des pauses stratégiques dans vos communications',
    ],
    shortTerm: [
      'Suivre la formation en Communication Empathique (2-3 semaines)',
      'Compléter le test de Leadership Empathique Vocal',
      'Pratiquer le storytelling avec des exemples professionnels concrets',
      'Développer un répertoire de tons adaptés à différents contextes',
      "Travailler avec un coach vocal sur l'expression émotionnelle",
    ],
    longTerm: [
      "Maîtriser l'art du storytelling exécutif",
      'Développer une signature vocale distinctive et authentique',
      "Atteindre l'excellence en adaptabilité contextuelle vocale",
      "Intégrer naturellement l'empathie dans votre style de leadership",
      'Obtenir la certification en Communication Exécutive Avancée',
    ],
  },

  nextMilestones: [
    {
      title: "Maître de l'Empathie Vocale",
      description:
        'Développer une expression vocale empathique tout en maintenant votre autorité naturelle',
      targetDate: '2024-03-15',
      requirements: [
        'Score ≥ 85% au test Leadership Empathique Vocal',
        'Compléter la formation en Communication Empathique',
        'Feedback positif sur la chaleur vocale',
      ],
      reward: 'Badge Empathie Exécutive + Boost de 10% sur le score global',
    },
    {
      title: 'Narrateur Stratégique',
      description:
        "Maîtriser l'art du storytelling professionnel pour un impact maximal",
      targetDate: '2024-04-30',
      requirements: [
        'Score ≥ 90% au test Storytelling Exécutif',
        'Développer 5 récits professionnels impactants',
        "Démontrer l'efficacité narrative en situation réelle",
      ],
      reward: 'Certificat Storytelling Exécutif + Session coaching premium',
    },
    {
      title: 'Communicateur Exécutif Complet',
      description:
        "Atteindre l'excellence dans tous les aspects de la communication vocale professionnelle",
      targetDate: '2024-06-30',
      requirements: [
        'Score global ≥ 90%',
        'Toutes les compétences vocales critiques au niveau Expert',
        '20 certificats vocaux obtenus',
        'Profil vocal complet avec signature distinctive',
      ],
      reward: 'Certification Communication Exécutive + Mentorat personnalisé',
    },
  ],
};
