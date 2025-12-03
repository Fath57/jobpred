export interface InterviewType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  questionsCount: number;
  focusAreas: string[];
  commonQuestions: string[];
  tips: string[];
}

export interface Question {
  id: string;
  question: string;
  type:
    | 'behavioral'
    | 'situational'
    | 'technical'
    | 'motivation'
    | 'company_culture';
  category: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  context?: string;
  followUpQuestions?: string[];
  evaluationCriteria: string[];
  sampleAnswerStructure: {
    framework: string;
    steps: string[];
    example?: string;
  };
  commonMistakes: string[];
  timeLimit?: number;
  weight: number;
}

export interface InterviewSession {
  id: string;
  interviewTypeId: string;
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  rating: number;
  completions: number;
  skillsEvaluated: string[];
  questions: Question[];
  preparationMaterials: {
    title: string;
    type: string;
    duration: string;
    description: string;
  }[];
  isAdaptive: boolean;
  includesVideoAnalysis: boolean;
  providesRealTimeFeedback: boolean;
}

export interface InterviewResult {
  id: string;
  sessionId: string;
  overallScore: number;
  confidence: number;
  clarity: number;
  relevance: number;
  structure: number;
  summary: string;
  categoryScores: {
    category: string;
    score: number;
    feedback: string;
    level: string;
  }[];
  questionResults: {
    questionId: string;
    question: string;
    userAnswer: string;
    score: number;
    feedback: string;
    improvements: string[];
    strengths: string[];
  }[];
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  recommendedPractice: {
    area: string;
    exercises: string[];
    estimatedTime: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  industryComparison: {
    percentile: number;
    averageScore: number;
    topPerformers: number;
  };
  completedAt: string;
  duration: string;
  videoAnalysis?: {
    eyeContact: number;
    bodyLanguage: number;
    speechPace: number;
    confidence: number;
    engagement: number;
  };
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  culture: string[];
  values: string[];
  interviewStyle: string;
  commonQuestions: string[];
  preparationTips: string[];
  logo?: string;
}

export interface UserProgress {
  completedSessions: number;
  averageScore: number;
  currentLevel: string;
  totalTimeSpent: string;
  strongestAreas: string[];
  improvementAreas: string[];
  nextRecommendedSession: string;
  progressHistory: {
    date: string;
    sessionId: string;
    score: number;
    improvement: number;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    unlockedAt: string;
    icon: string;
  }[];
}

export const hrInterviewPrepData = {
  interviewTypes: [
    {
      id: 'behavioral',
      name: 'Entretien Comportemental',
      description:
        'Questions sur vos expériences passées et votre comportement en situation professionnelle',
      icon: 'Users',
      color: 'bg-blue-500',
      duration: '45-60 minutes',
      difficulty: 'Intermédiaire' as const,
      questionsCount: 15,
      focusAreas: [
        'Expériences passées',
        'Soft skills',
        'Résolution de problèmes',
        'Travail en équipe',
      ],
      commonQuestions: [
        "Parlez-moi d'une situation où vous avez dû gérer un conflit",
        'Décrivez un moment où vous avez échoué et ce que vous en avez appris',
        'Comment gérez-vous le stress et la pression ?',
      ],
      tips: [
        'Utilisez la méthode STAR (Situation, Tâche, Action, Résultat)',
        'Préparez des exemples concrets et récents',
        "Montrez votre capacité d'apprentissage et d'adaptation",
      ],
    },
    {
      id: 'situational',
      name: 'Entretien Situationnel',
      description:
        'Mise en situation hypothétique pour évaluer votre réaction et votre prise de décision',
      icon: 'Target',
      color: 'bg-emerald-500',
      duration: '30-45 minutes',
      difficulty: 'Avancé' as const,
      questionsCount: 12,
      focusAreas: [
        'Prise de décision',
        'Résolution de problèmes',
        'Leadership',
        'Éthique professionnelle',
      ],
      commonQuestions: [
        'Que feriez-vous si vous découvriez une erreur majeure dans un projet livré ?',
        'Comment réagiriez-vous face à un client mécontent ?',
        'Que feriez-vous si un collègue ne respectait pas les délais ?',
      ],
      tips: [
        'Réfléchissez à voix haute pour montrer votre processus de réflexion',
        'Considérez plusieurs options avant de choisir',
        'Montrez votre capacité à prendre des décisions éthiques',
      ],
    },
    {
      id: 'motivation',
      name: 'Entretien de Motivation',
      description:
        "Questions sur vos motivations, objectifs de carrière et adéquation avec l'entreprise",
      icon: 'Heart',
      color: 'bg-pink-500',
      duration: '30-40 minutes',
      difficulty: 'Débutant' as const,
      questionsCount: 10,
      focusAreas: [
        'Motivations',
        'Objectifs de carrière',
        "Connaissance de l'entreprise",
        'Valeurs',
      ],
      commonQuestions: [
        'Pourquoi voulez-vous travailler chez nous ?',
        'Où vous voyez-vous dans 5 ans ?',
        "Qu'est-ce qui vous motive au travail ?",
      ],
      tips: [
        "Recherchez l'entreprise en profondeur",
        "Alignez vos objectifs avec ceux de l'entreprise",
        'Soyez authentique dans vos réponses',
      ],
    },
    {
      id: 'technical_hr',
      name: 'Entretien Technique RH',
      description:
        "Questions techniques liées au poste avec focus sur l'approche et la méthodologie",
      icon: 'Brain',
      color: 'bg-purple-500',
      duration: '60-90 minutes',
      difficulty: 'Expert' as const,
      questionsCount: 20,
      focusAreas: [
        'Compétences techniques',
        'Méthodologie',
        'Résolution de problèmes',
        'Innovation',
      ],
      commonQuestions: [
        'Comment aborderiez-vous ce défi technique ?',
        'Expliquez votre méthodologie de travail',
        'Comment restez-vous à jour techniquement ?',
      ],
      tips: [
        'Expliquez votre raisonnement étape par étape',
        "Montrez votre capacité d'apprentissage",
        'Discutez des trade-offs et alternatives',
      ],
    },
    {
      id: 'panel',
      name: 'Entretien Panel',
      description:
        'Entretien avec plusieurs interviewers simultanément, test de gestion de pression',
      icon: 'Users2',
      color: 'bg-indigo-500',
      duration: '45-75 minutes',
      difficulty: 'Expert' as const,
      questionsCount: 18,
      focusAreas: [
        'Gestion de pression',
        'Communication',
        'Adaptabilité',
        'Présence',
      ],
      commonQuestions: [
        'Présentez-vous en 2 minutes',
        'Comment gérez-vous les opinions divergentes ?',
        'Quelle est votre plus grande réalisation ?',
      ],
      tips: [
        'Maintenez le contact visuel avec tous les participants',
        'Restez calme et organisé dans vos réponses',
        'Adaptez votre communication à chaque interlocuteur',
      ],
    },
    {
      id: 'cultural_fit',
      name: "Entretien Culture d'Entreprise",
      description:
        "Évaluation de votre adéquation avec les valeurs et la culture de l'organisation",
      icon: 'Building',
      color: 'bg-amber-500',
      duration: '30-45 minutes',
      difficulty: 'Intermédiaire' as const,
      questionsCount: 14,
      focusAreas: [
        'Valeurs',
        "Culture d'entreprise",
        'Collaboration',
        'Adaptabilité culturelle',
      ],
      commonQuestions: [
        'Décrivez votre environnement de travail idéal',
        'Comment définissez-vous le succès ?',
        'Que recherchez-vous dans une équipe ?',
      ],
      tips: [
        "Montrez l'alignement avec les valeurs de l'entreprise",
        'Donnez des exemples de collaboration réussie',
        'Démontrez votre adaptabilité culturelle',
      ],
    },
  ],

  interviewSessions: [
    {
      id: 'behavioral-standard',
      interviewTypeId: 'behavioral',
      title: 'Entretien Comportemental Standard',
      description:
        "Session complète d'entretien comportemental avec questions STAR et analyse vidéo",
      duration: '45 minutes',
      questionsCount: 15,
      difficulty: 'Intermédiaire' as const,
      rating: 5,
      completions: 1247,
      skillsEvaluated: [
        'Leadership',
        "Gestion d'équipe",
        'Résolution de problèmes',
        'Communication',
        'Adaptabilité',
      ],
      questions: [
        {
          id: 'beh-q1',
          question:
            "Parlez-moi d'une situation où vous avez dû convaincre une équipe de suivre votre vision.",
          type: 'behavioral' as const,
          category: 'Leadership',
          difficulty: 'Avancé' as const,
          context:
            "Cette question évalue votre capacité de leadership et d'influence.",
          followUpQuestions: [
            'Quels obstacles avez-vous rencontrés ?',
            'Comment avez-vous mesuré le succès ?',
            "Que feriez-vous différemment aujourd'hui ?",
          ],
          evaluationCriteria: [
            'Clarté de la situation décrite',
            "Stratégie d'influence utilisée",
            'Résultats obtenus',
            'Apprentissages tirés',
          ],
          sampleAnswerStructure: {
            framework: 'STAR (Situation, Tâche, Action, Résultat)',
            steps: [
              'Situation: Contexte et enjeux',
              'Tâche: Votre rôle et objectifs',
              'Action: Stratégies et actions concrètes',
              'Résultat: Outcomes et apprentissages',
            ],
            example:
              "Lors d'un projet de transformation digitale, j'ai dû convaincre une équipe réticente au changement...",
          },
          commonMistakes: [
            'Réponse trop vague ou générale',
            'Ne pas quantifier les résultats',
            'Oublier de mentionner les apprentissages',
            "Se concentrer sur l'équipe plutôt que sur ses actions",
          ],
          timeLimit: 180,
          weight: 0.8,
        },
        {
          id: 'beh-q2',
          question:
            'Décrivez une situation où vous avez échoué dans un projet important.',
          type: 'behavioral' as const,
          category: "Gestion d'échec",
          difficulty: 'Avancé' as const,
          context:
            "Cette question teste votre capacité d'introspection et d'apprentissage.",
          followUpQuestions: [
            "Qu'avez-vous appris de cette expérience ?",
            'Comment avez-vous géré les conséquences ?',
            "Comment prévenez-vous ce type d'échec maintenant ?",
          ],
          evaluationCriteria: [
            'Honnêteté et transparence',
            "Analyse des causes d'échec",
            "Capacité d'apprentissage",
            'Mesures préventives mises en place',
          ],
          sampleAnswerStructure: {
            framework: 'STAR + Apprentissage',
            steps: [
              'Situation: Contexte du projet',
              'Tâche: Responsabilités et objectifs',
              'Action: Ce qui a été fait et pourquoi ça a échoué',
              'Résultat: Conséquences et apprentissages',
              'Application: Comment vous appliquez ces apprentissages',
            ],
          },
          commonMistakes: [
            'Blâmer les autres ou les circonstances',
            "Minimiser l'échec ou ses conséquences",
            "Ne pas montrer d'apprentissage concret",
            'Choisir un échec trop mineur',
          ],
          timeLimit: 200,
          weight: 0.9,
        },
        {
          id: 'beh-q3',
          question:
            'Comment gérez-vous les situations de stress et de pression intense ?',
          type: 'behavioral' as const,
          category: 'Gestion du stress',
          difficulty: 'Intermédiaire' as const,
          context:
            'Évaluation de votre résilience et de vos stratégies de gestion du stress.',
          followUpQuestions: [
            'Pouvez-vous donner un exemple concret ?',
            'Quelles techniques utilisez-vous pour rester calme ?',
            'Comment maintenez-vous la qualité sous pression ?',
          ],
          evaluationCriteria: [
            'Stratégies de gestion du stress',
            'Maintien de la performance',
            'Exemples concrets',
            'Techniques de récupération',
          ],
          sampleAnswerStructure: {
            framework: 'Stratégie + Exemple',
            steps: [
              'Stratégies générales de gestion du stress',
              "Exemple concret d'une situation stressante",
              'Actions spécifiques prises',
              'Résultats et efficacité des stratégies',
            ],
          },
          commonMistakes: [
            "Dire qu'on ne ressent jamais de stress",
            'Donner des réponses trop théoriques',
            "Ne pas fournir d'exemple concret",
            'Montrer des stratégies inadaptées au milieu professionnel',
          ],
          timeLimit: 150,
          weight: 0.7,
        },
      ],
      preparationMaterials: [
        {
          title: 'Guide de la méthode STAR',
          type: 'PDF',
          duration: '15 minutes',
          description:
            'Maîtrisez la structure STAR pour répondre aux questions comportementales',
        },
        {
          title: "Banque d'exemples personnels",
          type: 'Exercice',
          duration: '30 minutes',
          description:
            'Préparez vos exemples personnels pour différentes catégories de questions',
        },
        {
          title: 'Simulation vidéo',
          type: 'Vidéo interactive',
          duration: '20 minutes',
          description:
            'Entraînez-vous avec des questions courantes et recevez des feedbacks',
        },
      ],
      isAdaptive: true,
      includesVideoAnalysis: true,
      providesRealTimeFeedback: true,
    },
    {
      id: 'situational-advanced',
      interviewTypeId: 'situational',
      title: 'Entretien Situationnel Avancé',
      description:
        'Scénarios complexes de prise de décision et résolution de problèmes',
      duration: '40 minutes',
      questionsCount: 12,
      difficulty: 'Avancé' as const,
      rating: 5,
      completions: 892,
      skillsEvaluated: [
        'Prise de décision',
        'Résolution de problèmes',
        'Gestion de crise',
        'Analyse critique',
      ],
      questions: [
        {
          id: 'sit-q1',
          question:
            'Votre équipe doit livrer un projet critique dans 48h, mais vous découvrez un bug majeur qui nécessite 3 jours de correction. Que faites-vous ?',
          type: 'situational' as const,
          category: 'Gestion de crise',
          difficulty: 'Expert' as const,
          context:
            'Test de prise de décision sous pression avec contraintes multiples.',
          followUpQuestions: [
            'Comment communiquez-vous avec le client ?',
            'Quelles alternatives envisagez-vous ?',
            "Comment prévenez-vous ce type de situation à l'avenir ?",
          ],
          evaluationCriteria: [
            'Analyse rapide de la situation',
            'Identification des options',
            'Prise de décision justifiée',
            'Plan de communication',
            'Mesures préventives',
          ],
          sampleAnswerStructure: {
            framework: 'Analyse-Options-Décision-Communication',
            steps: [
              "Analyse: Évaluer l'impact du bug vs délai",
              'Options: Lister les alternatives possibles',
              'Décision: Choisir la meilleure option avec justification',
              'Communication: Plan de communication avec les parties prenantes',
              'Prévention: Mesures pour éviter la récurrence',
            ],
          },
          commonMistakes: [
            'Paniquer ou montrer du stress excessif',
            'Ne pas considérer toutes les options',
            'Oublier la communication avec les parties prenantes',
            'Ne pas penser aux mesures préventives',
          ],
          timeLimit: 300,
          weight: 1.0,
        },
      ],
      preparationMaterials: [
        {
          title: 'Framework de prise de décision',
          type: 'Guide',
          duration: '20 minutes',
          description:
            'Apprenez une méthode structurée pour analyser les situations complexes',
        },
        {
          title: "Cas d'étude sectoriels",
          type: 'Études de cas',
          duration: '45 minutes',
          description:
            "Analysez des situations réelles de votre secteur d'activité",
        },
      ],
      isAdaptive: true,
      includesVideoAnalysis: false,
      providesRealTimeFeedback: true,
    },
    {
      id: 'motivation-startup',
      interviewTypeId: 'motivation',
      title: 'Entretien Motivation Startup',
      description:
        'Questions spécifiques aux environnements startup et scale-up',
      duration: '30 minutes',
      questionsCount: 10,
      difficulty: 'Intermédiaire' as const,
      rating: 4,
      completions: 634,
      skillsEvaluated: [
        'Motivation',
        'Adaptabilité',
        'Esprit entrepreneurial',
        "Gestion de l'incertitude",
      ],
      questions: [],
      preparationMaterials: [
        {
          title: 'Culture startup vs corporate',
          type: 'Comparatif',
          duration: '15 minutes',
          description:
            'Comprenez les différences culturelles et adaptez votre discours',
        },
      ],
      isAdaptive: false,
      includesVideoAnalysis: true,
      providesRealTimeFeedback: false,
    },
    {
      id: 'technical-hr-basic',
      interviewTypeId: 'technical_hr',
      title: 'Entretien Technique RH Fondamental',
      description:
        "Questions techniques de base avec focus sur la méthodologie et l'approche",
      duration: '60 minutes',
      questionsCount: 20,
      difficulty: 'Intermédiaire' as const,
      rating: 4,
      completions: 456,
      skillsEvaluated: [
        'Compétences techniques',
        'Méthodologie',
        'Résolution de problèmes',
        'Communication technique',
      ],
      questions: [],
      preparationMaterials: [
        {
          title: 'Méthodologies de travail',
          type: 'Guide',
          duration: '25 minutes',
          description:
            'Apprenez à expliquer votre approche technique de manière claire',
        },
      ],
      isAdaptive: true,
      includesVideoAnalysis: false,
      providesRealTimeFeedback: true,
    },
    {
      id: 'panel-simulation',
      interviewTypeId: 'panel',
      title: 'Simulation Entretien Panel',
      description:
        'Entraînement à la gestion de multiples interlocuteurs simultanément',
      duration: '50 minutes',
      questionsCount: 18,
      difficulty: 'Expert' as const,
      rating: 5,
      completions: 289,
      skillsEvaluated: [
        'Gestion de pression',
        'Communication multi-cibles',
        'Présence',
        'Adaptabilité',
      ],
      questions: [],
      preparationMaterials: [
        {
          title: 'Techniques de communication panel',
          type: 'Vidéo',
          duration: '30 minutes',
          description: 'Apprenez à gérer plusieurs interlocuteurs efficacement',
        },
      ],
      isAdaptive: false,
      includesVideoAnalysis: true,
      providesRealTimeFeedback: true,
    },
    {
      id: 'cultural-fit-basic',
      interviewTypeId: 'cultural_fit',
      title: "Évaluation Culture d'Entreprise",
      description:
        "Test d'adéquation avec les valeurs et la culture organisationnelle",
      duration: '35 minutes',
      questionsCount: 14,
      difficulty: 'Débutant' as const,
      rating: 4,
      completions: 723,
      skillsEvaluated: [
        'Alignement culturel',
        'Valeurs',
        'Collaboration',
        'Adaptabilité culturelle',
      ],
      questions: [],
      preparationMaterials: [
        {
          title: "Analyse de culture d'entreprise",
          type: 'Checklist',
          duration: '20 minutes',
          description:
            "Apprenez à identifier et vous aligner avec la culture d'une entreprise",
        },
      ],
      isAdaptive: false,
      includesVideoAnalysis: false,
      providesRealTimeFeedback: false,
    },
  ],

  companies: [
    {
      id: 'google',
      name: 'Google',
      industry: 'Tech',
      size: 'Grande entreprise (100k+ employés)',
      culture: ['Innovation', 'Collaboration', 'Impact global', 'Diversité'],
      values: [
        'Focus utilisateur',
        'Excellence technique',
        'Audace',
        'Faire le bien',
      ],
      interviewStyle: 'Structuré avec focus technique et comportemental',
      commonQuestions: [
        'Pourquoi Google ?',
        'Décrivez un projet dont vous êtes fier',
        'Comment restez-vous à jour techniquement ?',
        'Situation où vous avez innové',
      ],
      preparationTips: [
        "Préparez des exemples d'impact à grande échelle",
        'Montrez votre passion pour la technologie',
        "Démontrez votre capacité d'apprentissage",
        'Alignez-vous avec la mission de Google',
      ],
    },
    {
      id: 'startup-fintech',
      name: 'Startup FinTech',
      industry: 'FinTech',
      size: 'Startup (50-200 employés)',
      culture: ['Agilité', 'Innovation', 'Croissance rapide', 'Autonomie'],
      values: ['Disruption', 'Excellence client', 'Transparence', 'Résultats'],
      interviewStyle: "Informel mais intense, focus sur l'adaptabilité",
      commonQuestions: [
        'Pourquoi quitter la stabilité pour une startup ?',
        "Comment gérez-vous l'incertitude ?",
        "Exemple d'initiative personnelle",
        'Vision du secteur FinTech',
      ],
      preparationTips: [
        'Montrez votre appétit pour le risque',
        "Démontrez votre capacité d'adaptation",
        'Préparez-vous sur les enjeux FinTech',
        'Montrez votre autonomie et votre initiative',
      ],
    },
    {
      id: 'consulting-firm',
      name: 'Cabinet de Conseil',
      industry: 'Conseil',
      size: 'Grande entreprise (10k+ employés)',
      culture: ['Excellence', 'Rigueur', 'Client-centrisme', 'Développement'],
      values: ['Qualité', 'Intégrité', 'Respect', 'Excellence'],
      interviewStyle: 'Très structuré avec cas pratiques',
      commonQuestions: [
        'Pourquoi le conseil ?',
        'Cas pratique de résolution de problème',
        'Situation de leadership',
        'Gestion de client difficile',
      ],
      preparationTips: [
        'Maîtrisez les frameworks de résolution de problèmes',
        'Préparez des exemples de leadership',
        "Montrez votre capacité d'analyse",
        'Démontrez votre orientation client',
      ],
    },
  ],

  interviewResults: [
    {
      id: 'result-001',
      sessionId: 'behavioral-standard',
      overallScore: 82,
      confidence: 85,
      clarity: 88,
      relevance: 79,
      structure: 84,
      summary:
        "Excellente performance globale avec des réponses bien structurées et des exemples concrets. Quelques améliorations possibles sur la concision et l'impact des résultats.",
      categoryScores: [
        {
          category: 'Leadership',
          score: 87,
          feedback: 'Excellents exemples de leadership avec impact mesurable',
          level: 'Avancé',
        },
        {
          category: "Gestion d'échec",
          score: 78,
          feedback:
            'Bonne introspection mais pourrait être plus spécifique sur les apprentissages',
          level: 'Intermédiaire',
        },
        {
          category: 'Gestion du stress',
          score: 81,
          feedback: 'Stratégies solides avec exemples concrets',
          level: 'Avancé',
        },
      ],
      questionResults: [
        {
          questionId: 'beh-q1',
          question:
            "Parlez-moi d'une situation où vous avez dû convaincre une équipe de suivre votre vision.",
          userAnswer:
            "Lors d'un projet de transformation digitale, j'ai dû convaincre une équipe de 15 personnes réticente au changement...",
          score: 87,
          feedback:
            'Excellente utilisation de la méthode STAR avec des résultats quantifiés',
          improvements: [
            'Pourrait détailler davantage les obstacles rencontrés',
            "Ajouter plus de détails sur les stratégies d'influence utilisées",
          ],
          strengths: [
            'Structure claire et logique',
            "Résultats quantifiés (30% d'amélioration)",
            'Apprentissages concrets mentionnés',
          ],
        },
        {
          questionId: 'beh-q2',
          question:
            'Décrivez une situation où vous avez échoué dans un projet important.',
          userAnswer:
            "Il y a deux ans, j'ai dirigé un projet de migration système qui a pris 3 mois de retard...",
          score: 78,
          feedback:
            'Bonne honnêteté et introspection, mais pourrait être plus spécifique sur les apprentissages',
          improvements: [
            'Détailler davantage les mesures préventives mises en place',
            'Expliquer comment ces apprentissages ont été appliqués depuis',
          ],
          strengths: [
            'Transparence et honnêteté',
            'Prise de responsabilité claire',
            "Analyse des causes d'échec",
          ],
        },
      ],
      strengths: [
        'Excellente structure des réponses avec méthode STAR',
        'Exemples concrets et récents',
        'Capacité à quantifier les résultats',
        'Bonne gestion du temps de parole',
        'Authenticité et transparence',
      ],
      improvements: [
        'Être plus concis dans certaines réponses',
        'Détailler davantage les apprentissages tirés',
        'Améliorer la transition entre les différentes parties de la réponse',
        "Préparer plus d'exemples variés",
      ],
      nextSteps: [
        'Pratiquer la concision avec un timer',
        "Préparer une banque d'exemples plus large",
        'Travailler sur les transitions narratives',
        "S'entraîner sur les questions de motivation",
      ],
      recommendedPractice: [
        {
          area: 'Concision',
          exercises: [
            'Résumer ses réponses en 90 secondes',
            "Pratiquer l'elevator pitch",
            'Enregistrer ses réponses et les analyser',
          ],
          estimatedTime: '2 heures',
          priority: 'high' as const,
        },
        {
          area: "Banque d'exemples",
          exercises: [
            'Préparer 10 exemples STAR différents',
            'Couvrir toutes les catégories de soft skills',
            'Varier les contextes et les rôles',
          ],
          estimatedTime: '3 heures',
          priority: 'medium' as const,
        },
      ],
      industryComparison: {
        percentile: 78,
        averageScore: 71,
        topPerformers: 89,
      },
      completedAt: '2024-01-15T16:45:00Z',
      duration: '42 minutes',
      videoAnalysis: {
        eyeContact: 82,
        bodyLanguage: 79,
        speechPace: 85,
        confidence: 88,
        engagement: 81,
      },
    },
  ],

  userProgress: {
    completedSessions: 8,
    averageScore: 79,
    currentLevel: 'Avancé',
    totalTimeSpent: '5h 23min',
    strongestAreas: ['Leadership', 'Communication', 'Résolution de problèmes'],
    improvementAreas: [
      "Gestion d'échec",
      'Questions techniques',
      'Négociation',
    ],
    nextRecommendedSession: 'situational-advanced',
    progressHistory: [
      {
        date: '2024-01-15',
        sessionId: 'behavioral-standard',
        score: 82,
        improvement: 5,
      },
      {
        date: '2024-01-10',
        sessionId: 'motivation-startup',
        score: 77,
        improvement: 8,
      },
      {
        date: '2024-01-05',
        sessionId: 'cultural-fit-basic',
        score: 74,
        improvement: 3,
      },
    ],
    achievements: [
      {
        id: 'first_interview',
        title: 'Premier Entretien',
        description: 'Complété votre premier entretien de préparation',
        unlockedAt: '2024-01-05T10:30:00Z',
        icon: 'Trophy',
      },
      {
        id: 'behavioral_master',
        title: 'Maître du Comportemental',
        description: 'Score de 80+ sur un entretien comportemental',
        unlockedAt: '2024-01-15T16:45:00Z',
        icon: 'Star',
      },
      {
        id: 'consistent_performer',
        title: 'Performance Constante',
        description: '5 entretiens consécutifs avec score > 75',
        unlockedAt: '2024-01-12T14:20:00Z',
        icon: 'Target',
      },
    ],
  },

  statistics: {
    totalSessions: 45,
    totalQuestions: 1250,
    activeUsers: 12450,
    averagePlatformScore: 74,
    successRate: 87,
    mostPopularType: 'Entretien Comportemental',
    averageSessionDuration: '38 minutes',
    improvementRate: '+12% par session',
  },

  aiTips: [
    'Préparez des exemples STAR pour chaque catégorie de soft skills',
    'Entraînez-vous à répondre en 2-3 minutes maximum par question',
    "Recherchez l'entreprise et adaptez vos réponses à sa culture",
    'Pratiquez devant un miroir pour améliorer votre langage corporel',
    "Préparez des questions pertinentes à poser à la fin de l'entretien",
    'Utilisez la règle des 3 : 3 points clés maximum par réponse',
    'Quantifiez vos résultats avec des chiffres concrets',
  ],

  preparationFrameworks: [
    {
      name: 'STAR',
      description: 'Situation, Tâche, Action, Résultat',
      usage: 'Questions comportementales',
      example:
        'Situation: Contexte du projet, Tâche: Votre rôle, Action: Ce que vous avez fait, Résultat: Outcomes obtenus',
    },
    {
      name: 'CAR',
      description: 'Challenge, Action, Résultat',
      usage: 'Questions de résolution de problèmes',
      example:
        'Challenge: Problème rencontré, Action: Solutions mises en œuvre, Résultat: Impact et apprentissages',
    },
    {
      name: 'SOAR',
      description: 'Situation, Obstacle, Action, Résultat',
      usage: 'Questions sur les difficultés surmontées',
      example:
        "Situation: Contexte, Obstacle: Difficulté rencontrée, Action: Comment vous l'avez surmontée, Résultat: Outcome",
    },
  ],

  industrySpecificTips: {
    Tech: [
      "Montrez votre passion pour la technologie et l'innovation",
      'Préparez-vous sur les dernières tendances tech',
      "Démontrez votre capacité d'apprentissage rapide",
      'Parlez de projets personnels ou contributions open source',
    ],
    Finance: [
      "Mettez l'accent sur la rigueur et l'attention aux détails",
      'Préparez des exemples de gestion de risques',
      'Montrez votre compréhension des enjeux financiers',
      'Démontrez votre capacité à travailler sous pression',
    ],
    Conseil: [
      'Préparez-vous aux études de cas',
      "Montrez votre capacité d'analyse et de synthèse",
      'Démontrez votre orientation client',
      'Préparez des exemples de résolution de problèmes complexes',
    ],
    Startup: [
      'Montrez votre adaptabilité et votre agilité',
      'Démontrez votre capacité à porter plusieurs casquettes',
      "Parlez de votre appétit pour le risque et l'innovation",
      'Montrez votre capacité à travailler en autonomie',
    ],
  },

  commonMistakes: [
    {
      mistake: 'Réponses trop longues et détaillées',
      impact: "Perte d'attention de l'intervieweur",
      solution: 'Utiliser un timer et pratiquer la concision',
    },
    {
      mistake: 'Exemples trop anciens ou non pertinents',
      impact: 'Manque de crédibilité et de pertinence',
      solution: 'Préparer des exemples récents et variés',
    },
    {
      mistake: 'Ne pas poser de questions à la fin',
      impact: "Manque d'intérêt perçu pour le poste",
      solution:
        "Préparer 3-5 questions pertinentes sur l'entreprise et le poste",
    },
    {
      mistake: 'Critiquer son employeur actuel',
      impact: 'Image négative et manque de professionnalisme',
      solution: 'Rester positif et se concentrer sur ses motivations futures',
    },
    {
      mistake: "Manque de préparation sur l'entreprise",
      impact: "Manque d'intérêt perçu et questions inadaptées",
      solution:
        "Rechercher l'entreprise, ses valeurs, ses défis et son actualité",
    },
  ],

  videoAnalysisMetrics: {
    eyeContact: {
      excellent: '80-100%',
      good: '60-79%',
      needsImprovement: '<60%',
      tips: [
        "Regardez la caméra, pas l'écran",
        'Maintenez le contact visuel 70% du temps',
        'Évitez de regarder vos notes constamment',
      ],
    },
    bodyLanguage: {
      excellent: '85-100%',
      good: '70-84%',
      needsImprovement: '<70%',
      tips: [
        'Gardez une posture droite et ouverte',
        'Utilisez des gestes naturels pour appuyer vos propos',
        'Évitez les gestes répétitifs ou nerveux',
      ],
    },
    speechPace: {
      excellent: '150-180 mots/minute',
      good: '120-149 ou 181-200 mots/minute',
      needsImprovement: '<120 ou >200 mots/minute',
      tips: [
        'Parlez à un rythme naturel et posé',
        'Faites des pauses pour respirer',
        'Articulez clairement chaque mot',
      ],
    },
  },
};
