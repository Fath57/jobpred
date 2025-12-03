export interface TestPerformance {
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

export interface CategoryInsight {
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

export interface SkillGap {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  estimatedTimeToImprove: string;
  recommendedActions: string[];
  relatedTests: string[];
}

export interface CareerReadiness {
  overallScore: number;
  confidenceLevel: string;
  readinessPercentage: number;
  jobMatchProbability: number;
  interviewSuccessRate: number;
  strengths: string[];
  criticalGaps: string[];
  timeToReadiness: string;
  priorityActions: string[];
}

export interface RecommendedTest {
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

export interface PersonalizedInsight {
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

export interface ProgressEvolution {
  date: string;
  overallScore: number;
  categoryScores: Record<string, number>;
  testsCompleted: number;
  certificatesEarned: number;
  milestone?: string;
}

export interface BenchmarkComparison {
  metric: string;
  yourScore: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
  interpretation: string;
}

export interface TestFeedbackData {
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
  testPerformances: TestPerformance[];
  categoryInsights: CategoryInsight[];
  skillGaps: SkillGap[];
  careerReadiness: CareerReadiness;
  recommendedTests: RecommendedTest[];
  personalizedInsights: PersonalizedInsight[];
  progressEvolution: ProgressEvolution[];
  benchmarkComparison: BenchmarkComparison[];
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

export const testFeedbackData: TestFeedbackData = {
  candidateProfile: {
    name: 'Jean René Roustand',
    targetPosition: 'Directeur de Projet IT Senior',
    experience: '15+ ans',
    industry: 'Technologie',
    assessmentStartDate: '2024-01-05',
    lastActivity: '2024-01-15',
  },

  overallPerformance: {
    totalTestsCompleted: 23,
    totalTimeSpent: '12h 45min',
    averageScore: 82,
    certificatesEarned: 15,
    currentLevel: 'Avancé',
    improvementRate: 12,
    consistencyScore: 89,
  },

  testPerformances: [
    {
      testId: 'big5-comprehensive',
      testName: 'Big Five Professionnel Complet',
      category: 'Personality Skills',
      completedAt: '2024-01-15T16:45:00Z',
      score: 87,
      level: 'Expert',
      timeSpent: '25 minutes',
      strengths: [
        'Leadership naturel',
        'Vision stratégique',
        'Prise de décision',
      ],
      improvements: ['Empathie', 'Patience', 'Délégation'],
      certificateEarned: true,
    },
    {
      testId: 'eng-listening-001',
      testName: 'Anglais Compréhension Orale B2',
      category: 'Language Skills',
      completedAt: '2024-01-15T14:30:00Z',
      score: 84,
      level: 'B2',
      timeSpent: '27 minutes',
      strengths: [
        'Compréhension globale',
        'Vocabulaire professionnel',
        'Accents variés',
      ],
      improvements: [
        'Accents non-natifs',
        'Argot technique',
        "Vitesse d'élocution rapide",
      ],
      certificateEarned: true,
    },
    {
      testId: 'comm-001',
      testName: 'Communication Interpersonnelle Avancée',
      category: 'Soft Skills',
      completedAt: '2024-01-14T11:20:00Z',
      score: 84,
      level: 'Avancé',
      timeSpent: '23 minutes',
      strengths: ['Écoute active', 'Communication écrite', 'Empathie'],
      improvements: [
        'Gestion des conflits',
        'Présentation publique',
        'Assertivité',
      ],
      certificateEarned: true,
    },
    {
      testId: 'prog-js-001',
      testName: 'JavaScript Avancé & ES6+',
      category: 'Hard Skills',
      completedAt: '2024-01-13T09:15:00Z',
      score: 87,
      level: 'Senior',
      timeSpent: '38 minutes',
      strengths: ['ES6+ features', 'Async programming', 'Code quality'],
      improvements: ['Performance optimization', 'Testing', 'Security'],
      certificateEarned: true,
    },
    {
      testId: 'behavioral-standard',
      testName: 'Entretien Comportemental Standard',
      category: 'HR Interview Prep',
      completedAt: '2024-01-12T15:30:00Z',
      score: 82,
      level: 'Avancé',
      timeSpent: '42 minutes',
      strengths: ['Structure STAR', 'Exemples concrets', 'Authenticité'],
      improvements: ['Concision', 'Gestion du stress', 'Questions techniques'],
      certificateEarned: true,
    },
  ],

  categoryInsights: [
    {
      category: 'Soft Skills',
      icon: 'Users',
      color: 'bg-blue-500',
      averageScore: 81,
      testsCompleted: 8,
      totalTests: 12,
      level: 'Avancé',
      trend: 'up',
      topStrengths: [
        'Communication',
        'Écoute active',
        'Empathie',
        'Leadership',
      ],
      keyImprovements: [
        'Gestion des conflits',
        'Négociation',
        'Présentation publique',
      ],
      nextRecommendedTest: 'Leadership Situationnel',
    },
    {
      category: 'Hard Skills',
      icon: 'Code',
      color: 'bg-purple-500',
      averageScore: 85,
      testsCompleted: 6,
      totalTests: 15,
      level: 'Expert',
      trend: 'up',
      topStrengths: [
        'JavaScript',
        'Architecture',
        'Problem Solving',
        'Code Quality',
      ],
      keyImprovements: ['Cloud Computing', 'DevOps', 'Security', 'AI/ML'],
      nextRecommendedTest: 'AWS Solutions Architect',
    },
    {
      category: 'Language Skills',
      icon: 'Globe',
      color: 'bg-emerald-500',
      averageScore: 78,
      testsCompleted: 4,
      totalTests: 8,
      level: 'Intermédiaire',
      trend: 'stable',
      topStrengths: ['Anglais écrit', 'Compréhension', 'Vocabulaire technique'],
      keyImprovements: ['Expression orale', 'Accents variés', 'Fluidité'],
      nextRecommendedTest: 'Anglais Expression Orale C1',
    },
    {
      category: 'Personality Skills',
      icon: 'Brain',
      color: 'bg-amber-500',
      averageScore: 83,
      testsCompleted: 3,
      totalTests: 6,
      level: 'Avancé',
      trend: 'up',
      topStrengths: ['Leadership', 'Vision stratégique', 'Adaptabilité'],
      keyImprovements: ['Intelligence émotionnelle', 'Gestion du stress'],
      nextRecommendedTest: 'CliftonStrengths Top 5',
    },
    {
      category: 'HR Interview Prep',
      icon: 'MessageSquare',
      color: 'bg-indigo-500',
      averageScore: 79,
      testsCompleted: 2,
      totalTests: 6,
      level: 'Avancé',
      trend: 'up',
      topStrengths: [
        'Structure des réponses',
        'Exemples concrets',
        'Authenticité',
      ],
      keyImprovements: [
        'Gestion du stress',
        'Questions techniques',
        'Négociation salariale',
      ],
      nextRecommendedTest: 'Entretien Technique RH',
    },
  ],

  skillGaps: [
    {
      skill: 'Cloud Computing (AWS/Azure)',
      currentLevel: 'Intermédiaire',
      targetLevel: 'Expert',
      importance: 'critical',
      estimatedTimeToImprove: '3-4 mois',
      recommendedActions: [
        'Passer la certification AWS Solutions Architect',
        'Réaliser des projets pratiques sur AWS',
        'Suivre une formation Azure fundamentals',
      ],
      relatedTests: [
        'AWS Solutions Architect',
        'Azure Fundamentals',
        'Cloud Architecture',
      ],
    },
    {
      skill: 'Intelligence Artificielle / Machine Learning',
      currentLevel: 'Débutant',
      targetLevel: 'Intermédiaire',
      importance: 'high',
      estimatedTimeToImprove: '4-6 mois',
      recommendedActions: [
        'Suivre un cours Python pour Data Science',
        'Apprendre les bases du Machine Learning',
        'Réaliser un projet IA concret',
      ],
      relatedTests: [
        'Python Data Science',
        'Machine Learning Basics',
        'AI Project Management',
      ],
    },
    {
      skill: 'Cybersécurité',
      currentLevel: 'Intermédiaire',
      targetLevel: 'Avancé',
      importance: 'high',
      estimatedTimeToImprove: '2-3 mois',
      recommendedActions: [
        'Obtenir une certification CISSP ou CISM',
        'Étudier les frameworks de sécurité',
        'Pratiquer les audits de sécurité',
      ],
      relatedTests: [
        'Cybersecurity Fundamentals',
        'Security Risk Management',
        'OWASP Top 10',
      ],
    },
    {
      skill: 'Gestion des Conflits',
      currentLevel: 'Intermédiaire',
      targetLevel: 'Avancé',
      importance: 'medium',
      estimatedTimeToImprove: '1-2 mois',
      recommendedActions: [
        'Formation en médiation professionnelle',
        'Pratique de la communication non-violente',
        'Coaching en leadership émotionnel',
      ],
      relatedTests: [
        'Conflict Resolution',
        'Emotional Intelligence',
        'Negotiation Skills',
      ],
    },
  ],

  careerReadiness: {
    overallScore: 84,
    confidenceLevel: 'Élevé',
    readinessPercentage: 87,
    jobMatchProbability: 92,
    interviewSuccessRate: 89,
    strengths: [
      'Solide expérience en gestion de projet IT',
      'Excellentes compétences techniques et leadership',
      "Capacité d'adaptation et d'apprentissage",
      'Communication efficace et empathie',
      'Vision stratégique développée',
    ],
    criticalGaps: [
      'Expertise Cloud Computing à approfondir',
      'Connaissances en IA/ML à développer',
      'Compétences en cybersécurité à renforcer',
    ],
    timeToReadiness: '2-3 mois',
    priorityActions: [
      'Obtenir une certification AWS dans les 60 jours',
      'Compléter la formation en gestion des conflits',
      'Pratiquer les entretiens techniques',
      'Développer un portfolio de projets Cloud',
    ],
  },

  recommendedTests: [
    {
      testId: 'aws-solutions-architect',
      testName: 'AWS Solutions Architect',
      category: 'Hard Skills',
      priority: 'critical',
      estimatedDuration: '60 minutes',
      expectedImpact: '+15 points sur le score global',
      reason: 'Compétence critique pour votre poste cible',
      skillsTargeted: [
        'Cloud Architecture',
        'AWS Services',
        'Scalability',
        'Security',
      ],
      difficulty: 'Expert',
      completionBonus: 25,
    },
    {
      testId: 'leadership-situational',
      testName: 'Leadership Situationnel',
      category: 'Soft Skills',
      priority: 'high',
      estimatedDuration: '30 minutes',
      expectedImpact: '+8 points en leadership',
      reason: "Renforcer vos compétences de direction d'équipe",
      skillsTargeted: [
        'Adaptabilité leadership',
        'Motivation équipe',
        'Prise de décision',
      ],
      difficulty: 'Avancé',
      completionBonus: 15,
    },
    {
      testId: 'conflict-resolution',
      testName: 'Résolution de Conflits Avancée',
      category: 'Soft Skills',
      priority: 'high',
      estimatedDuration: '25 minutes',
      expectedImpact: '+10 points en communication',
      reason: 'Combler votre principale lacune identifiée',
      skillsTargeted: [
        'Médiation',
        'Communication non-violente',
        'Négociation',
      ],
      difficulty: 'Avancé',
      completionBonus: 12,
    },
    {
      testId: 'ai-project-management',
      testName: 'Gestion de Projets IA',
      category: 'Hard Skills',
      priority: 'medium',
      estimatedDuration: '45 minutes',
      expectedImpact: '+12 points en innovation',
      reason: 'Compétence émergente très valorisée',
      skillsTargeted: [
        'AI/ML basics',
        'Data Strategy',
        'Innovation Management',
      ],
      difficulty: 'Intermédiaire',
      completionBonus: 18,
    },
    {
      testId: 'technical-interview-prep',
      testName: 'Entretien Technique Avancé',
      category: 'HR Interview Prep',
      priority: 'medium',
      estimatedDuration: '40 minutes',
      expectedImpact: '+7 points en préparation entretien',
      reason: 'Optimiser vos chances en entretien technique',
      skillsTargeted: [
        'Technical Communication',
        'Problem Solving',
        'Architecture Design',
      ],
      difficulty: 'Avancé',
      completionBonus: 10,
    },
  ],

  personalizedInsights: [
    {
      id: 'insight-001',
      type: 'strength',
      title: 'Leadership Naturel Exceptionnel',
      description:
        'Vos scores en leadership (87%) vous placent dans le top 5% des candidats. Cette force majeure est un atout considérable pour votre poste cible.',
      actionable: true,
      impact: 'high',
      timeframe: 'immediate',
      relatedTests: ['Leadership Situationnel', 'Team Management'],
      resources: [
        'Guide du Leadership Transformationnel',
        "Masterclass Management d'Équipe",
      ],
    },
    {
      id: 'insight-002',
      type: 'opportunity',
      title: 'Potentiel Cloud Computing Inexploité',
      description:
        "Le marché recherche activement des profils avec expertise Cloud. Votre base technique solide vous permettrait d'exceller rapidement dans ce domaine.",
      actionable: true,
      impact: 'high',
      timeframe: 'short-term',
      relatedTests: ['AWS Solutions Architect', 'Azure Fundamentals'],
      resources: ['Formation AWS Certified', 'Projets Cloud Hands-on'],
    },
    {
      id: 'insight-003',
      type: 'improvement',
      title: 'Gestion des Conflits à Développer',
      description:
        "Votre score de 72% en gestion des conflits est en dessous de votre niveau général. C'est votre principal axe d'amélioration pour un poste de direction.",
      actionable: true,
      impact: 'medium',
      timeframe: 'short-term',
      relatedTests: ['Conflict Resolution', 'Negotiation Skills'],
      resources: ['Formation Médiation', 'Communication Non-Violente'],
    },
    {
      id: 'insight-004',
      type: 'warning',
      title: 'Lacune Critique en IA/ML',
      description:
        "L'intelligence artificielle devient incontournable en IT. Votre absence de compétences dans ce domaine pourrait limiter vos opportunités futures.",
      actionable: true,
      impact: 'high',
      timeframe: 'long-term',
      relatedTests: ['AI Fundamentals', 'Machine Learning Basics'],
      resources: ['Cours Python Data Science', 'Projets IA Pratiques'],
    },
    {
      id: 'insight-005',
      type: 'strength',
      title: 'Communication Exceptionnelle',
      description:
        "Votre capacité d'écoute active (92%) et votre empathie sont remarquables. Ces soft skills vous distinguent nettement de la concurrence.",
      actionable: false,
      impact: 'high',
      timeframe: 'immediate',
    },
  ],

  progressEvolution: [
    {
      date: '2024-01-05',
      overallScore: 68,
      categoryScores: {
        'Soft Skills': 65,
        'Hard Skills': 72,
        'Language Skills': 70,
        'Personality Skills': 75,
        'HR Interview Prep': 60,
      },
      testsCompleted: 5,
      certificatesEarned: 2,
    },
    {
      date: '2024-01-08',
      overallScore: 74,
      categoryScores: {
        'Soft Skills': 72,
        'Hard Skills': 78,
        'Language Skills': 72,
        'Personality Skills': 78,
        'HR Interview Prep': 70,
      },
      testsCompleted: 12,
      certificatesEarned: 7,
      milestone: 'Premier certificat obtenu',
    },
    {
      date: '2024-01-12',
      overallScore: 79,
      categoryScores: {
        'Soft Skills': 78,
        'Hard Skills': 82,
        'Language Skills': 75,
        'Personality Skills': 81,
        'HR Interview Prep': 76,
      },
      testsCompleted: 18,
      certificatesEarned: 12,
      milestone: '10 certificats obtenus',
    },
    {
      date: '2024-01-15',
      overallScore: 82,
      categoryScores: {
        'Soft Skills': 81,
        'Hard Skills': 85,
        'Language Skills': 78,
        'Personality Skills': 83,
        'HR Interview Prep': 79,
      },
      testsCompleted: 23,
      certificatesEarned: 15,
      milestone: 'Niveau Avancé atteint',
    },
  ],

  benchmarkComparison: [
    {
      metric: 'Score Global',
      yourScore: 82,
      industryAverage: 71,
      topPerformers: 89,
      percentile: 78,
      interpretation: 'Vous surpassez 78% des candidats de votre secteur',
    },
    {
      metric: 'Leadership',
      yourScore: 87,
      industryAverage: 68,
      topPerformers: 92,
      percentile: 85,
      interpretation: 'Compétence exceptionnelle, top 15% du marché',
    },
    {
      metric: 'Compétences Techniques',
      yourScore: 85,
      industryAverage: 74,
      topPerformers: 91,
      percentile: 82,
      interpretation:
        'Très bon niveau technique, légèrement au-dessus de la moyenne',
    },
    {
      metric: 'Communication',
      yourScore: 84,
      industryAverage: 69,
      topPerformers: 88,
      percentile: 79,
      interpretation: 'Excellentes compétences relationnelles',
    },
    {
      metric: 'Adaptabilité',
      yourScore: 78,
      industryAverage: 72,
      topPerformers: 86,
      percentile: 71,
      interpretation: "Bonne capacité d'adaptation, peut être renforcée",
    },
  ],

  actionPlan: {
    immediate: [
      'Commencer la préparation AWS Solutions Architect (priorité critique)',
      'Pratiquer la gestion des conflits avec des cas concrets',
      "Réviser les questions d'entretien technique courantes",
      'Mettre à jour votre CV avec vos nouvelles certifications',
    ],
    shortTerm: [
      'Obtenir la certification AWS dans les 60 jours',
      'Compléter le test de Leadership Situationnel',
      'Suivre une formation en résolution de conflits',
      'Développer un projet Cloud pour votre portfolio',
      'Améliorer votre expression orale en anglais',
    ],
    longTerm: [
      'Acquérir des compétences en IA/Machine Learning',
      'Obtenir une certification en cybersécurité',
      'Développer votre réseau professionnel dans le Cloud',
      'Mentorer des équipes pour renforcer votre leadership',
      'Créer du contenu technique (blog, conférences)',
    ],
  },

  nextMilestones: [
    {
      title: 'Expert Cloud Computing',
      description:
        'Atteindre le niveau expert en technologies Cloud avec certification AWS',
      targetDate: '2024-03-15',
      requirements: [
        'Certification AWS Solutions Architect',
        'Score ≥ 85% au test Cloud Architecture',
        'Projet Cloud documenté dans le portfolio',
      ],
      reward: 'Badge Expert Cloud + Boost de 15% sur le score global',
    },
    {
      title: 'Leader Accompli',
      description: 'Maîtriser toutes les facettes du leadership moderne',
      targetDate: '2024-02-28',
      requirements: [
        'Score ≥ 90% en Leadership Situationnel',
        'Certification en gestion des conflits',
        'Score ≥ 85% en intelligence émotionnelle',
      ],
      reward: 'Certificat Leadership Excellence + Accès coaching premium',
    },
    {
      title: 'Candidat Idéal',
      description: 'Atteindre le profil parfait pour votre poste cible',
      targetDate: '2024-04-30',
      requirements: [
        'Score global ≥ 90%',
        'Toutes les compétences critiques au niveau expert',
        '25 certificats obtenus',
        'Portfolio complet avec 5 projets',
      ],
      reward: 'Statut VIP + Garantie entretien + Coaching personnalisé',
    },
  ],
};
