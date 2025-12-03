export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  testsCount: number;
  averageLevel: string;
  averageDuration: string;
  skills: string[];
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'scale' | 'scenario' | 'open_ended';
  context?: string;
  scenario?: string;
  options?: {
    text: string;
    value: string | number;
    explanation?: string;
  }[];
  correctAnswer?: string | number;
  skillWeight: Record<string, number>;
}

export interface Test {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  rating: number;
  skillsEvaluated: string[];
  format: string[];
  preview?: string;
  questions: Question[];
  passingScore: number;
  certificateAvailable: boolean;
}

export interface TestResult {
  id: string;
  testId: string;
  overallScore: number;
  level: string;
  summary: string;
  skillScores: {
    skill: string;
    score: number;
    description: string;
    level: string;
  }[];
  strengths: string[];
  improvements: string[];
  recommendations: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  completedAt: string;
  timeSpent: string;
  certificateEarned: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  difficulty: string;
  skillsFocused: string[];
  estimatedTime: string;
}

export interface UserProgress {
  completedTests: number;
  averageScore: number;
  currentLevel: string;
  totalTimeSpent: string;
  certificatesEarned: number;
  strongestSkills: string[];
  improvementAreas: string[];
  nextRecommendedTest: string;
}

export const softSkillsData = {
  categories: [
    {
      id: 'communication',
      name: 'Communication',
      description:
        'Évaluez vos compétences en communication verbale et non-verbale, écoute active et expression claire',
      icon: 'MessageSquare',
      color: 'bg-blue-500',
      testsCount: 8,
      averageLevel: 'Intermédiaire',
      averageDuration: '25 min',
      skills: [
        'Écoute active',
        'Expression orale',
        'Communication écrite',
        'Présentation',
        'Feedback',
        'Négociation',
      ],
    },
    {
      id: 'leadership',
      name: 'Leadership',
      description:
        "Mesurez votre capacité à diriger, motiver et inspirer les équipes vers l'atteinte d'objectifs communs",
      icon: 'Users',
      color: 'bg-purple-500',
      testsCount: 6,
      averageLevel: 'Avancé',
      averageDuration: '30 min',
      skills: [
        'Vision stratégique',
        "Motivation d'équipe",
        'Prise de décision',
        'Délégation',
        'Coaching',
        'Influence',
      ],
    },
    {
      id: 'emotional_intelligence',
      name: 'Intelligence Émotionnelle',
      description:
        'Analysez votre capacité à comprendre et gérer vos émotions et celles des autres',
      icon: 'Heart',
      color: 'bg-pink-500',
      testsCount: 5,
      averageLevel: 'Intermédiaire',
      averageDuration: '20 min',
      skills: [
        'Conscience de soi',
        'Autorégulation',
        'Empathie',
        'Compétences sociales',
        'Motivation intrinsèque',
      ],
    },
    {
      id: 'problem_solving',
      name: 'Résolution de Problèmes',
      description:
        'Testez votre approche analytique et créative pour identifier et résoudre des défis complexes',
      icon: 'Target',
      color: 'bg-emerald-500',
      testsCount: 7,
      averageLevel: 'Avancé',
      averageDuration: '35 min',
      skills: [
        'Analyse critique',
        'Pensée créative',
        'Prise de décision',
        'Innovation',
        'Logique',
        'Synthèse',
      ],
    },
    {
      id: 'adaptability',
      name: 'Adaptabilité',
      description:
        'Évaluez votre flexibilité et capacité à vous adapter aux changements et nouvelles situations',
      icon: 'Brain',
      color: 'bg-indigo-500',
      testsCount: 4,
      averageLevel: 'Intermédiaire',
      averageDuration: '18 min',
      skills: [
        'Flexibilité',
        'Résilience',
        'Apprentissage continu',
        'Gestion du changement',
        "Ouverture d'esprit",
      ],
    },
  ],

  tests: [
    {
      id: 'comm-001',
      categoryId: 'communication',
      title: 'Communication Interpersonnelle Avancée',
      description:
        'Évaluation complète de vos compétences en communication dans diverses situations professionnelles',
      duration: '25 minutes',
      questionsCount: 30,
      difficulty: 'Avancé' as const,
      rating: 5,
      skillsEvaluated: [
        'Écoute active',
        'Expression claire',
        'Communication non-verbale',
        'Gestion des conflits',
      ],
      format: ['QCM', 'Scenario', 'Scale'],
      preview:
        "Lors d'une réunion, un collègue interrompt constamment vos présentations. Comment réagissez-vous ?",
      questions: [
        {
          id: 'q1',
          question:
            "Lors d'une réunion d'équipe, vous remarquez qu'un collègue semble désengagé et ne participe pas. Quelle est votre première action ?",
          type: 'multiple_choice' as const,
          context:
            'Vous dirigez une réunion hebdomadaire avec votre équipe de 8 personnes.',
          options: [
            {
              text: "Je l'interpelle directement devant tout le monde pour l'impliquer",
              value: 'direct_call',
              explanation: "Peut créer de l'embarras et de la résistance",
            },
            {
              text: 'Je lui parle en privé après la réunion pour comprendre la situation',
              value: 'private_talk',
              explanation: 'Approche respectueuse qui préserve la dignité',
            },
            {
              text: "J'ignore la situation et continue la réunion normalement",
              value: 'ignore',
              explanation: "Manque d'attention aux signaux de l'équipe",
            },
            {
              text: 'Je pose une question ouverte au groupe pour encourager la participation',
              value: 'open_question',
              explanation:
                'Technique inclusive qui peut réengager naturellement',
            },
          ],
          correctAnswer: 'private_talk',
          skillWeight: {
            'Écoute active': 0.4,
            Empathie: 0.3,
            "Gestion d'équipe": 0.3,
          },
        },
        {
          id: 'q2',
          question:
            'Évaluez votre niveau de confort pour donner un feedback constructif à un supérieur hiérarchique',
          type: 'scale' as const,
          context:
            'Votre manager a pris une décision qui impacte négativement votre équipe.',
          skillWeight: {
            Assertivité: 0.5,
            'Communication ascendante': 0.3,
            'Courage professionnel': 0.2,
          },
        },
        {
          id: 'q3',
          question: 'Comment gérez-vous cette situation de conflit ?',
          type: 'scenario' as const,
          scenario:
            "Deux membres de votre équipe sont en désaccord sur l'approche à adopter pour un projet important. Le conflit commence à affecter l'ambiance de travail et la productivité. Les deux personnes viennent vous voir séparément pour se plaindre l'une de l'autre.",
          options: [
            {
              text: "J'organise immédiatement une réunion à trois pour résoudre le conflit",
              value: 'immediate_meeting',
              explanation: 'Approche directe mais peut intensifier le conflit',
            },
            {
              text: "J'écoute chaque partie séparément puis propose une solution",
              value: 'separate_listen',
              explanation: 'Permet de comprendre tous les points de vue',
            },
            {
              text: 'Je demande à chacun de proposer une solution de compromis',
              value: 'compromise_request',
              explanation: 'Responsabilise les parties dans la résolution',
            },
            {
              text: 'Je prends la décision moi-même pour trancher le débat',
              value: 'manager_decision',
              explanation:
                'Résout rapidement mais peut créer de la frustration',
            },
          ],
          skillWeight: {
            'Gestion des conflits': 0.4,
            Médiation: 0.3,
            Leadership: 0.3,
          },
        },
      ],
      passingScore: 70,
      certificateAvailable: true,
    },
    {
      id: 'comm-002',
      categoryId: 'communication',
      title: 'Présentation et Prise de Parole',
      description:
        'Testez vos compétences en présentation orale et votre aisance face à un public',
      duration: '20 minutes',
      questionsCount: 25,
      difficulty: 'Intermédiaire' as const,
      rating: 4,
      skillsEvaluated: [
        'Présentation orale',
        'Gestion du stress',
        'Structuration du discours',
        "Interaction avec l'audience",
      ],
      format: ['QCM', 'Scale'],
      preview:
        'Vous devez présenter un projet devant le comité de direction. Comment préparez-vous votre intervention ?',
      questions: [],
      passingScore: 65,
      certificateAvailable: true,
    },
    {
      id: 'lead-001',
      categoryId: 'leadership',
      title: 'Leadership Situationnel',
      description:
        'Évaluez votre capacité à adapter votre style de leadership selon les situations et les personnes',
      duration: '30 minutes',
      questionsCount: 35,
      difficulty: 'Expert' as const,
      rating: 5,
      skillsEvaluated: [
        'Adaptabilité du leadership',
        "Motivation d'équipe",
        'Prise de décision',
        'Vision stratégique',
      ],
      format: ['Scenario', 'QCM'],
      preview:
        'Votre équipe traverse une période de changement majeur. Comment adaptez-vous votre style de management ?',
      questions: [],
      passingScore: 75,
      certificateAvailable: true,
    },
    {
      id: 'ei-001',
      categoryId: 'emotional_intelligence',
      title: 'Intelligence Émotionnelle Professionnelle',
      description:
        'Mesurez votre capacité à reconnaître, comprendre et gérer les émotions en contexte professionnel',
      duration: '22 minutes',
      questionsCount: 28,
      difficulty: 'Intermédiaire' as const,
      rating: 5,
      skillsEvaluated: [
        'Conscience émotionnelle',
        'Autorégulation',
        'Empathie',
        'Compétences relationnelles',
      ],
      format: ['Scale', 'Scenario'],
      preview:
        'Un collègue semble frustré après une réunion difficile. Comment abordez-vous la situation ?',
      questions: [],
      passingScore: 70,
      certificateAvailable: true,
    },
    {
      id: 'ps-001',
      categoryId: 'problem_solving',
      title: 'Résolution de Problèmes Complexes',
      description:
        'Testez votre approche méthodique pour analyser et résoudre des problèmes multi-facettes',
      duration: '35 minutes',
      questionsCount: 40,
      difficulty: 'Avancé' as const,
      rating: 4,
      skillsEvaluated: [
        'Analyse systémique',
        'Pensée critique',
        'Créativité',
        'Prise de décision sous pression',
      ],
      format: ['Scenario', 'QCM'],
      preview:
        "Votre principal client menace d'annuler son contrat à cause de retards répétés. Quelle est votre approche ?",
      questions: [],
      passingScore: 72,
      certificateAvailable: true,
    },
    {
      id: 'adapt-001',
      categoryId: 'adaptability',
      title: 'Flexibilité et Résilience',
      description:
        'Évaluez votre capacité à vous adapter aux changements et à rebondir face aux difficultés',
      duration: '18 minutes',
      questionsCount: 22,
      difficulty: 'Intermédiaire' as const,
      rating: 4,
      skillsEvaluated: [
        'Flexibilité cognitive',
        'Résilience',
        'Apprentissage agile',
        'Gestion du stress',
      ],
      format: ['Scale', 'QCM'],
      preview:
        'Votre entreprise annonce une réorganisation majeure qui affecte votre poste. Comment réagissez-vous ?',
      questions: [],
      passingScore: 68,
      certificateAvailable: true,
    },
  ],

  scenarios: [
    {
      id: 'scenario-001',
      title: "Gestion de Crise d'Équipe",
      description:
        'Votre équipe fait face à une deadline serrée et plusieurs membres montrent des signes de stress',
      context:
        "Projet critique avec deadline dans 48h, 2 membres malades, tensions dans l'équipe",
      difficulty: 'Avancé',
      skillsFocused: [
        'Leadership de crise',
        'Gestion du stress',
        'Priorisation',
        'Communication',
      ],
      estimatedTime: '15 minutes',
    },
    {
      id: 'scenario-002',
      title: 'Négociation Client Difficile',
      description:
        'Un client important conteste les termes du contrat et menace de partir',
      context:
        'Client représentant 30% du CA, demandes déraisonnables, pression de la direction',
      difficulty: 'Expert',
      skillsFocused: [
        'Négociation',
        'Gestion de conflit',
        'Communication persuasive',
        'Gestion de pression',
      ],
      estimatedTime: '20 minutes',
    },
    {
      id: 'scenario-003',
      title: 'Intégration Nouvelle Recrue',
      description:
        "Vous devez intégrer un nouveau collaborateur senior qui résiste aux méthodes de l'équipe",
      context:
        'Profil expérimenté, habitudes différentes, équipe soudée avec ses méthodes',
      difficulty: 'Intermédiaire',
      skillsFocused: [
        'Onboarding',
        'Gestion du changement',
        'Diplomatie',
        'Leadership inclusif',
      ],
      estimatedTime: '12 minutes',
    },
  ],

  testResults: [
    {
      id: 'result-001',
      testId: 'comm-001',
      overallScore: 84,
      level: 'Avancé',
      summary:
        "Excellentes compétences en communication avec une forte capacité d'écoute et d'adaptation. Quelques axes d'amélioration en communication de crise.",
      skillScores: [
        {
          skill: 'Écoute active',
          score: 92,
          description:
            'Capacité exceptionnelle à écouter et comprendre les besoins des autres',
          level: 'Expert',
        },
        {
          skill: 'Expression claire',
          score: 88,
          description:
            'Communication claire et structurée, facilement compréhensible',
          level: 'Avancé',
        },
        {
          skill: 'Communication non-verbale',
          score: 76,
          description:
            'Bonne maîtrise du langage corporel et des signaux non-verbaux',
          level: 'Avancé',
        },
        {
          skill: 'Gestion des conflits',
          score: 72,
          description:
            'Approche constructive des conflits avec marge de progression',
          level: 'Intermédiaire',
        },
      ],
      strengths: [
        "Excellente capacité d'écoute et d'empathie",
        'Communication claire et structurée',
        "Adaptation du message selon l'audience",
        'Gestion efficace des émotions en communication',
      ],
      improvements: [
        'Développer les techniques de médiation avancées',
        'Améliorer la communication en situation de crise',
        "Renforcer l'assertivité dans les situations difficiles",
        'Perfectionner la communication non-verbale',
      ],
      recommendations: [
        {
          title: 'Formation en médiation',
          description:
            'Suivre une formation spécialisée en techniques de médiation et résolution de conflits pour renforcer cette compétence clé.',
          priority: 'high' as const,
        },
        {
          title: 'Pratique de la communication de crise',
          description:
            'Participer à des simulations de gestion de crise pour développer vos réflexes en situation tendue.',
          priority: 'medium' as const,
        },
        {
          title: 'Coaching en assertivité',
          description:
            'Travailler avec un coach pour développer votre assertivité tout en maintenant vos excellentes qualités relationnelles.',
          priority: 'medium' as const,
        },
      ],
      completedAt: '2024-01-15T14:30:00Z',
      timeSpent: '23 minutes',
      certificateEarned: true,
    },
  ],

  userProgress: {
    completedTests: 12,
    averageScore: 78,
    currentLevel: 'Avancé',
    totalTimeSpent: '4h 32min',
    certificatesEarned: 8,
    strongestSkills: ['Écoute active', 'Empathie', 'Communication écrite'],
    improvementAreas: [
      'Gestion des conflits',
      'Présentation publique',
      'Négociation',
    ],
    nextRecommendedTest: 'Leadership Situationnel',
  },

  statistics: {
    totalTests: 30,
    activeUsers: 15420,
    averagePlatformScore: 72,
    successRate: 84,
    mostPopularCategory: 'Communication',
    averageCompletionTime: '24 minutes',
    certificatesIssued: 8934,
  },

  aiTips: [
    "Pratiquez l'écoute active en reformulant ce que dit votre interlocuteur",
    'Adaptez votre style de communication selon votre audience',
    'Utilisez des exemples concrets pour illustrer vos points',
    "Développez votre intelligence émotionnelle par l'auto-observation",
    'Demandez régulièrement du feedback sur vos compétences relationnelles',
  ],

  learningResources: [
    {
      id: 'resource-001',
      title: "Guide de l'Écoute Active",
      type: 'PDF',
      duration: '15 min',
      difficulty: 'Débutant',
      description:
        'Techniques fondamentales pour développer une écoute efficace',
    },
    {
      id: 'resource-002',
      title: 'Masterclass Leadership Émotionnel',
      type: 'Vidéo',
      duration: '45 min',
      difficulty: 'Avancé',
      description: "Comment utiliser l'intelligence émotionnelle en leadership",
    },
    {
      id: 'resource-003',
      title: 'Exercices de Communication Non-Verbale',
      type: 'Interactif',
      duration: '30 min',
      difficulty: 'Intermédiaire',
      description: 'Pratiques pour améliorer votre langage corporel',
    },
  ],

  benchmarks: {
    industryAverages: {
      'IT/Tech': {
        communication: 74,
        leadership: 68,
        emotional_intelligence: 71,
      },
      Finance: {
        communication: 78,
        leadership: 72,
        emotional_intelligence: 69,
      },
      Marketing: {
        communication: 82,
        leadership: 75,
        emotional_intelligence: 79,
      },
      Conseil: {
        communication: 85,
        leadership: 81,
        emotional_intelligence: 77,
      },
      RH: { communication: 88, leadership: 79, emotional_intelligence: 84 },
    },
    levelDistribution: {
      Débutant: 15,
      Intermédiaire: 45,
      Avancé: 32,
      Expert: 8,
    },
    topPerformers: {
      communication: 94,
      leadership: 91,
      emotional_intelligence: 89,
      problem_solving: 87,
      adaptability: 85,
    },
  },

  certifications: [
    {
      id: 'cert-001',
      name: 'Certificat Communication Professionnelle',
      description: 'Valide vos compétences en communication interpersonnelle',
      requirements:
        'Score ≥ 70% au test Communication Interpersonnelle Avancée',
      validityPeriod: '2 ans',
      recognizedBy: ['PMI', 'SHRM', 'ICF'],
    },
    {
      id: 'cert-002',
      name: 'Certificat Leadership Agile',
      description: 'Atteste de vos compétences en leadership adaptatif',
      requirements: 'Score ≥ 75% au test Leadership Situationnel',
      validityPeriod: '2 ans',
      recognizedBy: ['Scrum Alliance', 'PMI', 'ICAgile'],
    },
    {
      id: 'cert-003',
      name: 'Certificat Intelligence Émotionnelle',
      description: "Certifie votre maîtrise de l'intelligence émotionnelle",
      requirements:
        'Score ≥ 70% au test Intelligence Émotionnelle Professionnelle',
      validityPeriod: '3 ans',
      recognizedBy: ['EQ-i 2.0', 'ICF', 'CIPD'],
    },
  ],
};
