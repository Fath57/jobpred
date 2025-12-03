export interface Framework {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  testsCount: number;
  accuracy: number;
  averageDuration: string;
  scientificValidity: number;
  dimensions: string[];
  developedBy: string;
  yearDeveloped: number;
  applications: string[];
}

export interface Question {
  id: string;
  question: string;
  type:
    | 'likert_scale'
    | 'multiple_choice'
    | 'scenario_choice'
    | 'ranking'
    | 'forced_choice';
  context?: string;
  scenario?: string;
  options?: {
    text: string;
    value: string | number;
    explanation?: string;
  }[];
  dimensionWeights: Record<string, number>;
  reversedScoring?: boolean;
}

export interface Test {
  id: string;
  frameworkId: string;
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  complexity: 'Simple' | 'Modéré' | 'Avancé' | 'Expert';
  rating: number;
  reviews: number;
  dimensionsEvaluated: string[];
  format: string[];
  preview?: string;
  questions: Question[];
  certificateAvailable: boolean;
  isAdaptive: boolean;
  completions: number;
  validityStudies: number;
}

export interface PersonalityType {
  code: string;
  name: string;
  description: string;
  frequency: number;
  strengths: string[];
  challenges: string[];
  idealCareers: string[];
  workStyle: string;
  communicationStyle: string;
  leadershipStyle?: string;
}

export interface TestResult {
  id: string;
  testId: string;
  personalityType: string;
  typeLabel: string;
  summary: string;
  reliability: number;
  rarity: number;
  dimensionScores: {
    dimension: string;
    score: number;
    description: string;
    interpretation: string;
  }[];
  strengths: string[];
  developmentAreas: string[];
  careerRecommendations: {
    idealRoles: string[];
    workEnvironments: string[];
    leadershipPotential: string;
    teamContribution: string;
  };
  teamDynamics: {
    collaborationStyle: string;
    communicationStyle: string;
    preferredRole: string;
    stressManagement: string;
    conflictResolution: string;
  };
  developmentPlan: {
    shortTerm: string[];
    longTerm: string[];
    skillsToImprove: string[];
    recommendedTraining: string[];
    learningPath: {
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
      estimatedTime: string;
      difficulty: string;
      type: string;
    }[];
  };
  compatibilityMatrix: {
    type: string;
    compatibility: number;
    workingRelationship: string;
  }[];
  completedAt: string;
  validUntil: string;
}

export interface UserProgress {
  completedTests: number;
  profilesDiscovered: number;
  frameworksExplored: number;
  totalTimeSpent: string;
  dominantTraits: string[];
  personalityEvolution: {
    framework: string;
    previousType: string;
    currentType: string;
    changeDate: string;
    stability: number;
  }[];
  nextRecommendedTest: string;
}

export const personalitySkillsData = {
  frameworks: [
    {
      id: 'big-five',
      name: 'Big Five (OCEAN)',
      description:
        'Le modèle scientifique de référence évaluant 5 dimensions fondamentales de la personnalité',
      icon: 'Brain',
      color: 'bg-blue-500',
      testsCount: 8,
      accuracy: 94,
      averageDuration: '25 minutes',
      scientificValidity: 5,
      dimensions: [
        'Ouverture',
        'Conscienciosité',
        'Extraversion',
        'Agréabilité',
        'Neuroticisme',
      ],
      developedBy: 'Costa & McCrae',
      yearDeveloped: 1985,
      applications: [
        'Recrutement',
        'Développement personnel',
        'Recherche académique',
        'Coaching',
      ],
    },
    {
      id: 'mbti',
      name: 'Myers-Briggs (MBTI)',
      description:
        'Classification en 16 types de personnalité basée sur les préférences cognitives',
      icon: 'Users',
      color: 'bg-purple-500',
      testsCount: 6,
      accuracy: 87,
      averageDuration: '35 minutes',
      scientificValidity: 4,
      dimensions: [
        'Extraversion/Introversion',
        'Sensation/Intuition',
        'Pensée/Sentiment',
        'Jugement/Perception',
      ],
      developedBy: 'Myers & Briggs',
      yearDeveloped: 1962,
      applications: [
        'Team building',
        'Communication',
        'Leadership',
        'Orientation carrière',
      ],
    },
    {
      id: 'disc',
      name: 'DISC',
      description:
        "Modèle comportemental focalisé sur les styles de communication et d'interaction",
      icon: 'Target',
      color: 'bg-emerald-500',
      testsCount: 5,
      accuracy: 89,
      averageDuration: '20 minutes',
      scientificValidity: 4,
      dimensions: ['Dominance', 'Influence', 'Stabilité', 'Conformité'],
      developedBy: 'William Marston',
      yearDeveloped: 1928,
      applications: ['Vente', 'Management', 'Service client', 'Négociation'],
    },
    {
      id: 'enneagram',
      name: 'Ennéagramme',
      description:
        'Système de 9 types de personnalité explorant les motivations profondes',
      icon: 'Heart',
      color: 'bg-amber-500',
      testsCount: 4,
      accuracy: 85,
      averageDuration: '30 minutes',
      scientificValidity: 3,
      dimensions: [
        'Type 1-9',
        'Centre instinctif',
        'Centre émotionnel',
        'Centre mental',
      ],
      developedBy: 'George Gurdjieff',
      yearDeveloped: 1915,
      applications: [
        'Développement spirituel',
        'Thérapie',
        'Coaching de vie',
        'Relations interpersonnelles',
      ],
    },
    {
      id: 'strengths',
      name: 'CliftonStrengths',
      description:
        'Identification des 34 talents naturels pour optimiser les performances',
      icon: 'Zap',
      color: 'bg-pink-500',
      testsCount: 3,
      accuracy: 91,
      averageDuration: '45 minutes',
      scientificValidity: 5,
      dimensions: [
        'Exécution',
        'Influence',
        'Relations',
        'Réflexion stratégique',
      ],
      developedBy: 'Donald Clifton',
      yearDeveloped: 1998,
      applications: [
        'Performance',
        'Engagement',
        'Management',
        'Développement des talents',
      ],
    },
    {
      id: 'values',
      name: 'Valeurs Professionnelles',
      description:
        'Évaluation des valeurs et motivations qui guident les choix de carrière',
      icon: 'Compass',
      color: 'bg-indigo-500',
      testsCount: 4,
      accuracy: 88,
      averageDuration: '18 minutes',
      scientificValidity: 4,
      dimensions: [
        'Autonomie',
        'Sécurité',
        'Reconnaissance',
        'Altruisme',
        'Innovation',
        'Équilibre',
      ],
      developedBy: 'Super & Rokeach',
      yearDeveloped: 1973,
      applications: [
        'Orientation carrière',
        'Satisfaction au travail',
        'Rétention',
        "Culture d'entreprise",
      ],
    },
  ],

  tests: [
    {
      id: 'big5-comprehensive',
      frameworkId: 'big-five',
      title: 'Big Five Professionnel Complet',
      description:
        "Évaluation approfondie des 5 dimensions de personnalité avec focus sur l'environnement professionnel",
      duration: '25 minutes',
      questionsCount: 120,
      complexity: 'Avancé' as const,
      rating: 5,
      reviews: 15420,
      dimensionsEvaluated: [
        "Ouverture à l'expérience",
        'Conscienciosité',
        'Extraversion',
        'Agréabilité',
        'Stabilité émotionnelle',
      ],
      format: ['Questionnaire', 'Échelle de Likert', 'Adaptatif'],
      preview:
        "Je suis quelqu'un qui aime essayer de nouvelles approches pour résoudre les problèmes au travail.",
      questions: [
        {
          id: 'big5-q1',
          question:
            "Je suis quelqu'un qui aime essayer de nouvelles approches pour résoudre les problèmes au travail.",
          type: 'likert_scale' as const,
          context:
            "Cette question évalue votre ouverture à l'innovation et au changement dans un contexte professionnel.",
          dimensionWeights: {
            Ouverture: 0.8,
            Conscienciosité: 0.2,
          },
          reversedScoring: false,
        },
        {
          id: 'big5-q2',
          question: "Dans les réunions d'équipe, je préfère généralement...",
          type: 'multiple_choice' as const,
          context:
            'Cette question explore votre style de participation et de communication en groupe.',
          options: [
            {
              text: 'Prendre la parole et diriger les discussions',
              value: 'lead',
              explanation:
                "Indique un niveau élevé d'extraversion et de dominance",
            },
            {
              text: 'Participer activement aux échanges',
              value: 'participate',
              explanation: 'Montre un équilibre entre extraversion et écoute',
            },
            {
              text: 'Écouter attentivement et intervenir quand nécessaire',
              value: 'listen',
              explanation: 'Suggère une approche plus introvertie mais engagée',
            },
            {
              text: 'Observer et réfléchir avant de contribuer',
              value: 'observe',
              explanation:
                "Indique une préférence pour l'introspection et l'analyse",
            },
          ],
          dimensionWeights: {
            Extraversion: 0.7,
            Agréabilité: 0.3,
          },
        },
        {
          id: 'big5-q3',
          question:
            'Votre manager vous confie un projet avec une deadline serrée et des instructions peu claires. Votre première réaction est de...',
          type: 'scenario_choice' as const,
          scenario:
            'Vous venez de recevoir un projet important avec une échéance dans 3 jours. Les instructions sont vagues et votre manager est en déplacement.',
          options: [
            {
              text: 'Commencer immédiatement avec les informations disponibles',
              value: 'start_immediately',
              explanation:
                "Montre une forte conscienciosité et tolérance à l'ambiguïté",
            },
            {
              text: "Chercher des clarifications auprès d'autres collègues",
              value: 'seek_clarification',
              explanation: 'Indique une approche collaborative et méthodique',
            },
            {
              text: 'Attendre le retour du manager pour avoir plus de détails',
              value: 'wait_manager',
              explanation:
                'Suggère une préférence pour la structure et la sécurité',
            },
            {
              text: 'Créer un plan avec plusieurs scénarios possibles',
              value: 'multiple_scenarios',
              explanation:
                'Révèle une approche stratégique et une ouverture aux possibilités',
            },
          ],
          dimensionWeights: {
            Conscienciosité: 0.5,
            Ouverture: 0.3,
            'Stabilité émotionnelle': 0.2,
          },
        },
      ],
      certificateAvailable: true,
      isAdaptive: true,
      completions: 89,
      validityStudies: 247,
    },
    {
      id: 'mbti-professional',
      frameworkId: 'mbti',
      title: 'MBTI Professionnel Avancé',
      description:
        'Identification précise de votre type MBTI avec applications spécifiques au monde du travail',
      duration: '35 minutes',
      questionsCount: 93,
      complexity: 'Expert' as const,
      rating: 5,
      reviews: 12890,
      dimensionsEvaluated: [
        'Extraversion/Introversion',
        'Sensation/Intuition',
        'Pensée/Sentiment',
        'Jugement/Perception',
      ],
      format: ['Questionnaire', 'Choix forcé', 'Scenarios professionnels'],
      preview:
        "Lors d'une prise de décision importante, vous vous fiez davantage à votre logique ou à vos valeurs personnelles ?",
      questions: [
        {
          id: 'mbti-q1',
          question:
            "Lors d'une prise de décision importante au travail, vous vous fiez davantage à...",
          type: 'multiple_choice' as const,
          context:
            'Cette question explore votre préférence entre la logique objective et les considérations personnelles/humaines.',
          options: [
            {
              text: 'Une analyse logique et objective des faits',
              value: 'thinking',
              explanation: 'Préférence pour la fonction Pensée (T)',
            },
            {
              text: "Vos valeurs personnelles et l'impact sur les personnes",
              value: 'feeling',
              explanation: 'Préférence pour la fonction Sentiment (F)',
            },
            {
              text: 'Un équilibre entre logique et considérations humaines',
              value: 'balanced',
              explanation: 'Peut indiquer une préférence moins marquée',
            },
            {
              text: 'Cela dépend entièrement du contexte',
              value: 'contextual',
              explanation: 'Suggère une flexibilité cognitive',
            },
          ],
          dimensionWeights: {
            'Pensée/Sentiment': 1.0,
          },
        },
      ],
      certificateAvailable: true,
      isAdaptive: false,
      completions: 67,
      validityStudies: 156,
    },
    {
      id: 'disc-workplace',
      frameworkId: 'disc',
      title: 'DISC Comportement Professionnel',
      description:
        'Analyse de votre style comportemental et communicationnel en environnement professionnel',
      duration: '20 minutes',
      questionsCount: 80,
      complexity: 'Modéré' as const,
      rating: 4,
      reviews: 8934,
      dimensionsEvaluated: [
        'Dominance',
        'Influence',
        'Stabilité',
        'Conformité',
      ],
      format: ['Questionnaire', 'Choix forcé', 'Situations professionnelles'],
      preview:
        'Face à un conflit dans votre équipe, vous préférez une approche directe ou diplomatique ?',
      questions: [],
      certificateAvailable: true,
      isAdaptive: false,
      completions: 54,
      validityStudies: 89,
    },
    {
      id: 'enneagram-motivations',
      frameworkId: 'enneagram',
      title: 'Ennéagramme Motivations Profondes',
      description:
        'Découverte de votre type ennéagramme et de vos motivations inconscientes au travail',
      duration: '30 minutes',
      questionsCount: 108,
      complexity: 'Expert' as const,
      rating: 5,
      reviews: 6745,
      dimensionsEvaluated: [
        'Type de base',
        'Aile',
        'Instinct dominant',
        'Niveau de santé',
      ],
      format: ['Questionnaire', 'Scenarios', 'Auto-observation'],
      preview:
        "Qu'est-ce qui vous motive le plus profondément dans votre travail ?",
      questions: [],
      certificateAvailable: true,
      isAdaptive: true,
      completions: 34,
      validityStudies: 67,
    },
    {
      id: 'strengths-top5',
      frameworkId: 'strengths',
      title: 'CliftonStrengths Top 5',
      description:
        'Identification de vos 5 talents dominants parmi les 34 thèmes de talents',
      duration: '45 minutes',
      questionsCount: 177,
      complexity: 'Expert' as const,
      rating: 5,
      reviews: 23456,
      dimensionsEvaluated: [
        "Talents d'exécution",
        "Talents d'influence",
        'Talents relationnels',
        'Talents de réflexion',
      ],
      format: ['Choix forcé', 'Temps limité', 'Réponse instinctive'],
      preview:
        'Vous excellez naturellement à transformer les idées en actions concrètes.',
      questions: [],
      certificateAvailable: true,
      isAdaptive: false,
      completions: 78,
      validityStudies: 189,
    },
    {
      id: 'values-career',
      frameworkId: 'values',
      title: 'Valeurs et Motivations Carrière',
      description:
        'Évaluation de vos valeurs professionnelles pour optimiser votre satisfaction au travail',
      duration: '18 minutes',
      questionsCount: 60,
      complexity: 'Simple' as const,
      rating: 4,
      reviews: 5678,
      dimensionsEvaluated: [
        'Autonomie',
        'Sécurité',
        'Reconnaissance',
        'Altruisme',
        'Innovation',
        'Équilibre vie-travail',
      ],
      format: ['Classement', 'Choix de valeurs', 'Scenarios'],
      preview:
        "Classez ces éléments par ordre d'importance pour votre épanouissement professionnel.",
      questions: [],
      certificateAvailable: false,
      isAdaptive: false,
      completions: 43,
      validityStudies: 45,
    },
  ],

  personalityTypes: {
    mbti: [
      {
        code: 'ENTJ',
        name: 'Le Commandant',
        description:
          'Leader naturel, visionnaire et déterminé. Excellent pour diriger des équipes vers des objectifs ambitieux.',
        frequency: 2,
        strengths: [
          'Leadership naturel',
          'Vision stratégique',
          'Prise de décision rapide',
          'Orientation résultats',
        ],
        challenges: [
          'Impatience',
          'Perfectionnisme',
          'Difficulté à déléguer',
          'Peut paraître intimidant',
        ],
        idealCareers: [
          'CEO',
          'Directeur général',
          'Consultant senior',
          'Entrepreneur',
        ],
        workStyle: 'Directif et orienté objectifs',
        communicationStyle: 'Direct et assertif',
        leadershipStyle: 'Transformationnel et visionnaire',
      },
      {
        code: 'ENFJ',
        name: 'Le Protagoniste',
        description:
          'Inspirant et charismatique, capable de motiver les autres vers un idéal commun.',
        frequency: 3,
        strengths: [
          'Empathie',
          'Communication inspirante',
          'Développement des autres',
          'Vision humaniste',
        ],
        challenges: [
          'Tendance au surengagement',
          'Difficulté à dire non',
          'Peut négliger ses propres besoins',
        ],
        idealCareers: ['Coach', 'Formateur', 'RH', 'Responsable développement'],
        workStyle: 'Collaboratif et inspirant',
        communicationStyle: 'Empathique et motivant',
      },
      {
        code: 'INFJ',
        name: "L'Avocat",
        description:
          "Idéaliste et déterminé, avec une vision claire de ce qui peut améliorer l'humanité.",
        frequency: 1,
        strengths: [
          'Vision à long terme',
          'Intuition développée',
          'Créativité',
          'Détermination',
        ],
        challenges: [
          'Perfectionnisme',
          'Sensibilité au stress',
          "Tendance à l'isolement",
        ],
        idealCareers: ['Consultant', 'Écrivain', 'Psychologue', 'Architecte'],
        workStyle: 'Réfléchi et méthodique',
        communicationStyle: 'Profond et authentique',
      },
      {
        code: 'INTJ',
        name: "L'Architecte",
        description:
          'Stratège imaginatif et déterminé, avec un plan pour tout.',
        frequency: 2,
        strengths: [
          'Pensée stratégique',
          'Indépendance',
          'Innovation',
          'Efficacité',
        ],
        challenges: [
          "Impatience avec l'inefficacité",
          'Peut paraître arrogant',
          'Difficulté avec les émotions',
        ],
        idealCareers: [
          'Architecte système',
          'Stratège',
          'Chercheur',
          'Analyste',
        ],
        workStyle: 'Autonome et systématique',
        communicationStyle: 'Précis et conceptuel',
      },
    ],
  },

  testResults: [
    {
      id: 'result-001',
      testId: 'big5-comprehensive',
      personalityType: 'ENTJ',
      typeLabel: 'Le Commandant - Leader Visionnaire',
      summary:
        "Vous êtes un leader naturel avec une forte orientation vers les résultats. Votre combinaison d'extraversion élevée, de conscienciosité et d'ouverture fait de vous un excellent dirigeant capable d'inspirer et de guider les équipes vers des objectifs ambitieux. Vous excellez dans les environnements dynamiques et challengeants.",
      reliability: 94,
      rarity: 2,
      dimensionScores: [
        {
          dimension: "Ouverture à l'expérience",
          score: 87,
          description: 'Très ouvert aux nouvelles idées et expériences',
          interpretation:
            "Vous aimez l'innovation, la créativité et les défis intellectuels. Vous êtes curieux et adaptable.",
        },
        {
          dimension: 'Conscienciosité',
          score: 92,
          description: 'Extrêmement organisé et orienté objectifs',
          interpretation:
            'Vous êtes discipliné, fiable et persévérant. Vous planifiez soigneusement et respectez vos engagements.',
        },
        {
          dimension: 'Extraversion',
          score: 89,
          description: 'Très sociable et énergique',
          interpretation:
            "Vous tirez votre énergie des interactions sociales et aimez être au centre de l'action.",
        },
        {
          dimension: 'Agréabilité',
          score: 65,
          description: 'Modérément coopératif',
          interpretation:
            "Vous équilibrez la coopération avec l'assertivité, privilégiant l'efficacité sur l'harmonie.",
        },
        {
          dimension: 'Stabilité émotionnelle',
          score: 78,
          description: 'Généralement calme sous pression',
          interpretation:
            'Vous gérez bien le stress et restez composé dans les situations difficiles.',
        },
      ],
      strengths: [
        'Leadership naturel et capacité à inspirer les équipes',
        'Vision stratégique à long terme et pensée systémique',
        'Excellente capacité de prise de décision sous pression',
        "Orientation forte vers les résultats et l'efficacité",
        'Adaptabilité et ouverture au changement',
        'Communication claire et assertive',
      ],
      developmentAreas: [
        "Développer davantage d'empathie dans les relations interpersonnelles",
        'Apprendre à déléguer plus efficacement',
        'Améliorer la patience avec les processus plus lents',
        "Équilibrer l'assertivité avec la diplomatie",
        "Prendre plus de temps pour l'écoute active",
        "Gérer le perfectionnisme et l'impatience",
      ],
      careerRecommendations: {
        idealRoles: [
          'CEO/Directeur Général',
          'Directeur de Projet',
          'Consultant Senior',
          'Entrepreneur',
          'Directeur Commercial',
        ],
        workEnvironments: [
          'Startup dynamique',
          'Grande entreprise',
          'Conseil stratégique',
          'Environnement international',
        ],
        leadershipPotential: 'Très élevé - Leader transformationnel naturel',
        teamContribution: 'Moteur de performance et catalyseur de changement',
      },
      teamDynamics: {
        collaborationStyle:
          'Directif et orienté résultats, aime prendre les initiatives',
        communicationStyle: 'Direct, clair et assertif, va droit au but',
        preferredRole: "Leader d'équipe ou coordinateur de projet",
        stressManagement:
          'Gère bien la pression, peut devenir impatient si les choses traînent',
        conflictResolution:
          'Approche directe, cherche des solutions pragmatiques rapidement',
      },
      developmentPlan: {
        shortTerm: [
          "Pratiquer l'écoute active dans les réunions",
          'Déléguer une tâche importante par semaine',
          'Demander du feedback sur son style de communication',
        ],
        longTerm: [
          "Développer ses compétences en coaching d'équipe",
          'Suivre une formation en intelligence émotionnelle',
          'Mentorer des collaborateurs juniors',
        ],
        skillsToImprove: [
          'Empathie',
          'Patience',
          'Délégation',
          'Écoute active',
        ],
        recommendedTraining: [
          'Leadership émotionnel',
          "Coaching d'équipe",
          'Communication non-violente',
          'Gestion du changement',
        ],
        learningPath: [
          {
            title: 'Formation Leadership Émotionnel',
            description:
              "Développer l'intelligence émotionnelle pour un leadership plus efficace",
            priority: 'high' as const,
            estimatedTime: '8 heures',
            difficulty: 'Avancé',
            type: 'Formation',
          },
          {
            title: "Coaching d'Équipe",
            description:
              'Apprendre les techniques de coaching pour développer son équipe',
            priority: 'medium' as const,
            estimatedTime: '12 heures',
            difficulty: 'Intermédiaire',
            type: 'Formation pratique',
          },
          {
            title: 'Communication Non-Violente',
            description:
              'Maîtriser les techniques de communication bienveillante',
            priority: 'medium' as const,
            estimatedTime: '6 heures',
            difficulty: 'Intermédiaire',
            type: 'Atelier',
          },
          {
            title: 'Gestion du Changement',
            description:
              'Approfondir les méthodes de conduite du changement organisationnel',
            priority: 'low' as const,
            estimatedTime: '20 heures',
            difficulty: 'Expert',
            type: 'Certification',
          },
        ],
      },
      compatibilityMatrix: [
        {
          type: 'ENFJ',
          compatibility: 95,
          workingRelationship:
            'Excellent - Complémentarité parfaite vision/exécution',
        },
        {
          type: 'INTJ',
          compatibility: 88,
          workingRelationship: 'Très bon - Partage de la vision stratégique',
        },
        {
          type: 'ESTP',
          compatibility: 72,
          workingRelationship: 'Bon - Complémentarité action/réflexion',
        },
        {
          type: 'ISFP',
          compatibility: 45,
          workingRelationship: 'Difficile - Styles très différents',
        },
      ],
      completedAt: '2024-01-15T16:45:00Z',
      validUntil: '2026-01-15T16:45:00Z',
    },
  ],

  userProgress: {
    completedTests: 8,
    profilesDiscovered: 3,
    frameworksExplored: 4,
    totalTimeSpent: '3h 45min',
    dominantTraits: [
      'Leadership',
      'Vision stratégique',
      'Orientation résultats',
      'Innovation',
    ],
    personalityEvolution: [
      {
        framework: 'MBTI',
        previousType: 'ENFJ',
        currentType: 'ENTJ',
        changeDate: '2024-01-15',
        stability: 87,
      },
      {
        framework: 'Big Five',
        previousType: 'Extraverti-Consciencieux',
        currentType: 'Leader-Innovateur',
        changeDate: '2024-01-10',
        stability: 92,
      },
    ],
    nextRecommendedTest: 'CliftonStrengths Top 5',
  },

  statistics: {
    totalTests: 30,
    totalFrameworks: 6,
    activeUsers: 34560,
    profilesGenerated: 156780,
    averageAccuracy: 91,
    mostPopularFramework: 'Big Five',
    averageCompletionTime: '28 minutes',
    retestConsistency: 89,
  },

  aiTips: [
    'Répondez spontanément et honnêtement pour obtenir un profil authentique',
    'Il n\'y a pas de "bonnes" ou "mauvaises" réponses, chaque type a ses forces',
    'Pensez à votre comportement naturel, pas à ce que vous pensez être attendu',
    'Utilisez votre profil pour mieux comprendre vos motivations et préférences',
    'Partagez vos résultats avec votre équipe pour améliorer la collaboration',
    'Refaites le test tous les 2-3 ans car la personnalité peut évoluer',
    'Combinez plusieurs frameworks pour une vision complète de votre personnalité',
  ],

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

  industryApplications: {
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

  culturalConsiderations: {
    frameworks: [
      {
        name: 'Big Five',
        culturalBias: 'Faible',
        globalApplicability: 95,
        adaptations: [
          'Version asiatique',
          'Version africaine',
          'Version latino-américaine',
        ],
      },
      {
        name: 'MBTI',
        culturalBias: 'Modéré',
        globalApplicability: 78,
        adaptations: ['Version collectiviste', 'Version high-context cultures'],
      },
    ],
    recommendations: [
      "Considérer le contexte culturel lors de l'interprétation",
      'Utiliser des normes locales quand disponibles',
      'Être conscient des biais culturels potentiels',
      'Adapter la communication des résultats au contexte',
    ],
  },

  ethicalGuidelines: {
    principles: [
      'Consentement éclairé obligatoire',
      'Confidentialité absolue des données',
      'Utilisation éthique des résultats',
      'Pas de discrimination basée sur la personnalité',
      "Droit à l'explication des résultats",
      'Possibilité de contester les résultats',
    ],
    limitations: [
      'Les tests ne prédisent pas la performance avec certitude',
      'La personnalité peut évoluer dans le temps',
      'Les résultats doivent être interprétés par des professionnels',
      'Ne pas utiliser comme seul critère de décision',
    ],
  },

  futureEnhancements: {
    aiIntegration: [
      "Analyse prédictive de l'évolution de la personnalité",
      'Recommandations personnalisées de développement',
      'Matching automatique équipe-projet',
      'Détection de patterns comportementaux',
    ],
    newFrameworks: [
      'Dark Triad professionnel',
      'Intelligence émotionnelle intégrée',
      'Résilience et adaptabilité',
      'Créativité et innovation',
    ],
    technology: [
      'Tests adaptatifs avancés',
      'Réalité virtuelle pour les scenarios',
      'Biométrie pour validation',
      'Blockchain pour certification',
    ],
  },
};
