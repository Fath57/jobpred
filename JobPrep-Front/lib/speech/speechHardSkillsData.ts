export interface TechnicalCallSession {
  id: string;
  type: 'web_call' | 'phone_call';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledAt: string;
  duration?: string;
  completedAt?: string;
  technicalDomain: string;
  difficulty: 'Junior' | 'Intermédiaire' | 'Senior' | 'Expert' | 'Architect';
  aiInterviewer: {
    name: string;
    personality: string;
    avatar: string;
    specialization: string[];
    experience: string;
  };
  programmingLanguages?: string[];
  frameworks?: string[];
  architectureLevel?: string;
}

export interface TechnicalVoiceAnalysis {
  technicalCommunication: {
    score: number;
    level: string;
    description: string;
    examples: string[];
    improvements: string[];
    conceptExplanation: number;
    technicalVocabulary: number;
    problemSolving: number;
  };
  confidence: {
    score: number;
    technicalAssurance: number;
    uncertaintyHandling: number;
    admissionOfLimits: number;
    description: string;
    confidenceJourney: {
      timestamp: string;
      topic: string;
      confidence: number;
      reasoning: string;
    }[];
  };
  clarity: {
    score: number;
    conceptExplanation: number;
    codeExplanation: number;
    architectureDescription: number;
    analogyUsage: number;
    description: string;
    examples: string[];
  };
  problemSolvingApproach: {
    score: number;
    structuredThinking: number;
    questionAsking: number;
    assumptionMaking: number;
    solutionBuilding: number;
    description: string;
    methodology: string[];
    strengths: string[];
    improvements: string[];
  };
  technicalDepth: {
    score: number;
    fundamentalKnowledge: number;
    practicalExperience: number;
    bestPractices: number;
    industryAwareness: number;
    description: string;
    strongAreas: string[];
    weakAreas: string[];
  };
}

export interface TechnicalQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  domain: string;
  expectedDuration: string;
  evaluationCriteria: string[];
  followUpQuestions: string[];
  tips: string[];
  codeRequired: boolean;
  architectureRequired: boolean;
}

export interface TechnicalSessionReport {
  id: string;
  sessionId: string;
  overallScore: number;
  technicalLevel: string;
  duration: string;
  questionsAnswered: number;
  codeProblemsAttempted: number;
  voiceAnalysis: TechnicalVoiceAnalysis;
  technicalStrengths: string[];
  technicalWeaknesses: string[];
  communicationStrengths: string[];
  communicationImprovements: string[];
  detailedFeedback: {
    category: string;
    score: number;
    feedback: string;
    technicalAccuracy: number;
    communicationClarity: number;
    specificExamples: string[];
    recommendations: string[];
  }[];
  skillGaps: {
    skill: string;
    currentLevel: string;
    targetLevel: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    learningPath: string[];
  }[];
  nextSteps: string[];
  recommendedStudy: {
    area: string;
    resources: string[];
    estimatedTime: string;
    priority: 'high' | 'medium' | 'low';
    practicalExercises: string[];
  }[];
  industryComparison: {
    yourScore: number;
    averageScore: number;
    topPerformers: number;
    percentile: number;
    salaryImpact: string;
  };
  careerGuidance: {
    readinessLevel: string;
    recommendedRoles: string[];
    skillsToImprove: string[];
    timeToReadiness: string;
  };
}

export interface TechnicalDomain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  difficulty: string;
  duration: string;
  questionsCount: number;
  codeProblems: number;
  focusAreas: string[];
  prerequisites: string[];
  careerPaths: string[];
  averageSalary: string;
  demandLevel: 'Low' | 'Medium' | 'High' | 'Very High';
}

export interface UserTechnicalProgress {
  totalSessions: number;
  averageScore: number;
  currentLevel: string;
  totalTimeSpent: string;
  improvementRate: number;
  strongestDomains: string[];
  improvementAreas: string[];
  nextRecommendedSession: string;
  technicalEvolution: {
    date: string;
    score: number;
    domain: string;
    improvement: number;
    newSkills: string[];
  }[];
  certificationProgress: {
    certification: string;
    progress: number;
    estimatedCompletion: string;
  }[];
}

export const speechHardSkillsData = {
  technicalDomains: [
    {
      id: 'frontend-dev',
      name: 'Développement Frontend',
      description:
        "Évaluation des compétences en développement d'interfaces utilisateur modernes",
      icon: 'Monitor',
      color: 'bg-blue-500',
      difficulty: 'Intermédiaire',
      duration: '45 minutes',
      questionsCount: 12,
      codeProblems: 3,
      focusAreas: [
        'React/Vue/Angular',
        'JavaScript ES6+',
        'CSS/SASS',
        'Performance',
        'Accessibilité',
      ],
      prerequisites: ['HTML/CSS de base', 'JavaScript fondamental'],
      careerPaths: [
        'Frontend Developer',
        'Full Stack Developer',
        'UI Engineer',
      ],
      averageSalary: '45-65k€',
      demandLevel: 'Very High' as const,
    },
    {
      id: 'backend-dev',
      name: 'Développement Backend',
      description:
        'Test des compétences en développement côté serveur et architecture',
      icon: 'Server',
      color: 'bg-emerald-500',
      difficulty: 'Avancé',
      duration: '50 minutes',
      questionsCount: 15,
      codeProblems: 4,
      focusAreas: [
        'APIs REST/GraphQL',
        'Bases de données',
        'Sécurité',
        'Performance',
        'Microservices',
      ],
      prerequisites: ['Programmation orientée objet', 'Bases de données'],
      careerPaths: [
        'Backend Developer',
        'Full Stack Developer',
        'Software Architect',
      ],
      averageSalary: '50-75k€',
      demandLevel: 'Very High' as const,
    },
    {
      id: 'devops-cloud',
      name: 'DevOps & Cloud',
      description:
        'Évaluation des compétences en infrastructure et déploiement cloud',
      icon: 'Cloud',
      color: 'bg-purple-500',
      difficulty: 'Expert',
      duration: '60 minutes',
      questionsCount: 18,
      codeProblems: 2,
      focusAreas: [
        'AWS/Azure/GCP',
        'Docker/Kubernetes',
        'CI/CD',
        'Infrastructure as Code',
        'Monitoring',
      ],
      prerequisites: ['Linux/Unix', 'Réseaux', 'Scripting'],
      careerPaths: [
        'DevOps Engineer',
        'Cloud Architect',
        'Site Reliability Engineer',
      ],
      averageSalary: '60-90k€',
      demandLevel: 'Very High' as const,
    },
    {
      id: 'data-science',
      name: 'Data Science & IA',
      description:
        'Test des compétences en science des données et intelligence artificielle',
      icon: 'BarChart3',
      color: 'bg-amber-500',
      difficulty: 'Expert',
      duration: '55 minutes',
      questionsCount: 14,
      codeProblems: 3,
      focusAreas: [
        'Python/R',
        'Machine Learning',
        'Deep Learning',
        'Data Visualization',
        'Big Data',
      ],
      prerequisites: ['Statistiques', 'Programmation Python', 'Mathématiques'],
      careerPaths: ['Data Scientist', 'ML Engineer', 'AI Researcher'],
      averageSalary: '55-85k€',
      demandLevel: 'Very High' as const,
    },
    {
      id: 'mobile-dev',
      name: 'Développement Mobile',
      description:
        "Évaluation des compétences en développement d'applications mobiles",
      icon: 'Smartphone',
      color: 'bg-pink-500',
      difficulty: 'Intermédiaire',
      duration: '40 minutes',
      questionsCount: 10,
      codeProblems: 3,
      focusAreas: [
        'React Native/Flutter',
        'iOS/Android natif',
        'Performance mobile',
        'UX mobile',
      ],
      prerequisites: ['Programmation orientée objet', 'UI/UX de base'],
      careerPaths: [
        'Mobile Developer',
        'Cross-platform Developer',
        'Mobile Architect',
      ],
      averageSalary: '45-70k€',
      demandLevel: 'High' as const,
    },
    {
      id: 'cybersecurity',
      name: 'Cybersécurité',
      description:
        'Test des compétences en sécurité informatique et protection des données',
      icon: 'Shield',
      color: 'bg-red-500',
      difficulty: 'Expert',
      duration: '50 minutes',
      questionsCount: 16,
      codeProblems: 2,
      focusAreas: [
        'Sécurité réseau',
        'Cryptographie',
        'Pentesting',
        'Compliance',
        'Incident Response',
      ],
      prerequisites: ['Réseaux', 'Systèmes', 'Programmation'],
      careerPaths: ['Security Engineer', 'Penetration Tester', 'CISO'],
      averageSalary: '55-95k€',
      demandLevel: 'Very High' as const,
    },
    {
      id: 'system-architecture',
      name: 'Architecture Système',
      description:
        "Évaluation des compétences en conception d'architectures complexes",
      icon: 'Cpu',
      color: 'bg-indigo-500',
      difficulty: 'Architect',
      duration: '65 minutes',
      questionsCount: 20,
      codeProblems: 1,
      focusAreas: [
        'Design Patterns',
        'Scalabilité',
        'Microservices',
        'Event Sourcing',
        'CQRS',
      ],
      prerequisites: [
        'Expérience développement',
        'Bases de données',
        'Réseaux',
      ],
      careerPaths: ['Software Architect', 'Technical Lead', 'CTO'],
      averageSalary: '70-120k€',
      demandLevel: 'High' as const,
    },
    {
      id: 'blockchain',
      name: 'Blockchain & Web3',
      description:
        'Test des compétences en technologies blockchain et développement décentralisé',
      icon: 'Link',
      color: 'bg-teal-500',
      difficulty: 'Expert',
      duration: '45 minutes',
      questionsCount: 12,
      codeProblems: 3,
      focusAreas: [
        'Smart Contracts',
        'Solidity',
        'DeFi',
        'NFTs',
        'Consensus Mechanisms',
      ],
      prerequisites: ['Programmation', 'Cryptographie de base'],
      careerPaths: [
        'Blockchain Developer',
        'Smart Contract Developer',
        'Web3 Engineer',
      ],
      averageSalary: '60-100k€',
      demandLevel: 'Medium' as const,
    },
  ],

  aiInterviewers: [
    {
      id: 'alex-tech',
      name: 'Alex Tech',
      personality: 'Analytique et précis',
      avatar:
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: [
        'Architecture logicielle',
        'Design patterns',
        'Performance',
      ],
      experience: '15+ ans en développement',
      description:
        'Expert en architecture et bonnes pratiques de développement',
      rating: 4.9,
      languages: ['Français', 'Anglais'],
      style: 'Méthodique et approfondi',
      domains: ['Backend', 'Architecture', 'DevOps'],
    },
    {
      id: 'sarah-frontend',
      name: 'Sarah Frontend',
      personality: 'Créative et détaillée',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['React/Vue', 'UX/UI', 'Performance frontend'],
      experience: '10+ ans en frontend',
      description: 'Spécialiste des technologies frontend modernes et UX',
      rating: 4.8,
      languages: ['Français', 'Anglais'],
      style: 'Pratique et orienté utilisateur',
      domains: ['Frontend', 'Mobile', 'UX'],
    },
    {
      id: 'marcus-cloud',
      name: 'Marcus Cloud',
      personality: 'Pragmatique et expérimenté',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['AWS/Azure', 'Kubernetes', 'Infrastructure'],
      experience: '12+ ans en DevOps',
      description: 'Expert en infrastructure cloud et pratiques DevOps',
      rating: 4.9,
      languages: ['Français', 'Anglais', 'Allemand'],
      style: 'Orienté solutions et scalabilité',
      domains: ['DevOps', 'Cloud', 'Architecture'],
    },
    {
      id: 'emma-data',
      name: 'Emma Data',
      personality: 'Curieuse et rigoureuse',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['Machine Learning', 'Python', 'Data Engineering'],
      experience: '8+ ans en Data Science',
      description:
        'Experte en science des données et intelligence artificielle',
      rating: 4.8,
      languages: ['Français', 'Anglais'],
      style: 'Scientifique et méthodique',
      domains: ['Data Science', 'IA', 'Analytics'],
    },
    {
      id: 'david-security',
      name: 'David Security',
      personality: 'Vigilant et méticuleux',
      avatar:
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      specialization: ['Pentesting', 'Cryptographie', 'Compliance'],
      experience: '12+ ans en cybersécurité',
      description: 'Expert en sécurité informatique et gestion des risques',
      rating: 4.9,
      languages: ['Français', 'Anglais'],
      style: 'Rigoureux et orienté sécurité',
      domains: ['Cybersecurity', 'Compliance', 'Risk Management'],
    },
  ],

  availableSlots: [
    {
      id: 'tech-slot-001',
      date: '2024-01-16',
      time: '09:00',
      duration: '45 minutes',
      aiInterviewer: 'Alex Tech',
      difficulty: 'Senior',
      domain: 'Backend Development',
      available: true,
      price: 65,
    },
    {
      id: 'tech-slot-002',
      date: '2024-01-16',
      time: '11:00',
      duration: '40 minutes',
      aiInterviewer: 'Sarah Frontend',
      difficulty: 'Intermédiaire',
      domain: 'Frontend Development',
      available: true,
      price: 55,
    },
    {
      id: 'tech-slot-003',
      date: '2024-01-16',
      time: '14:30',
      duration: '60 minutes',
      aiInterviewer: 'Marcus Cloud',
      difficulty: 'Expert',
      domain: 'DevOps & Cloud',
      available: true,
      price: 85,
    },
    {
      id: 'tech-slot-004',
      date: '2024-01-17',
      time: '10:00',
      duration: '55 minutes',
      aiInterviewer: 'Emma Data',
      difficulty: 'Expert',
      domain: 'Data Science & IA',
      available: true,
      price: 80,
    },
    {
      id: 'tech-slot-005',
      date: '2024-01-17',
      time: '15:00',
      duration: '50 minutes',
      aiInterviewer: 'David Security',
      difficulty: 'Expert',
      domain: 'Cybersécurité',
      available: false,
      price: 75,
    },
    {
      id: 'tech-slot-006',
      date: '2024-01-18',
      time: '09:30',
      duration: '65 minutes',
      aiInterviewer: 'Alex Tech',
      difficulty: 'Architect',
      domain: 'Architecture Système',
      available: true,
      price: 95,
    },
  ],

  callSessions: [
    {
      id: 'tech-session-001',
      type: 'web_call' as const,
      status: 'completed' as const,
      scheduledAt: '2024-01-15T10:00:00Z',
      duration: '47 minutes',
      completedAt: '2024-01-15T10:47:00Z',
      technicalDomain: 'Backend Development',
      difficulty: 'Senior' as const,
      aiInterviewer: {
        name: 'Alex Tech',
        personality: 'Analytique et précis',
        avatar:
          'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['Node.js', 'Microservices', 'Database Design'],
        experience: '15+ ans en développement',
      },
      programmingLanguages: ['JavaScript', 'Python', 'SQL'],
      frameworks: ['Node.js', 'Express', 'PostgreSQL'],
      architectureLevel: 'Microservices',
    },
    {
      id: 'tech-session-002',
      type: 'phone_call' as const,
      status: 'scheduled' as const,
      scheduledAt: '2024-01-17T14:00:00Z',
      technicalDomain: 'DevOps & Cloud',
      difficulty: 'Expert' as const,
      aiInterviewer: {
        name: 'Marcus Cloud',
        personality: 'Pragmatique et expérimenté',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: ['AWS', 'Kubernetes', 'Terraform'],
        experience: '12+ ans en DevOps',
      },
    },
  ],

  sessionReports: [
    {
      id: 'tech-report-001',
      sessionId: 'tech-session-001',
      overallScore: 78,
      technicalLevel: 'Senior',
      duration: '47 minutes',
      questionsAnswered: 15,
      codeProblemsAttempted: 4,
      voiceAnalysis: {
        technicalCommunication: {
          score: 82,
          level: 'Excellent',
          description:
            'Excellente capacité à expliquer des concepts techniques complexes de manière claire et structurée. Votre approche pédagogique facilite la compréhension.',
          examples: [
            "Explication claire de l'architecture microservices (min 15:30)",
            'Démonstration méthodique du design pattern Observer (min 28:45)',
            'Analogie efficace pour expliquer les transactions ACID (min 35:20)',
          ],
          improvements: [
            "Utiliser plus d'exemples concrets lors des explications abstraites",
            'Structurer davantage les réponses longues avec des points clés',
            "Vérifier la compréhension de l'interlocuteur plus fréquemment",
          ],
          conceptExplanation: 85,
          technicalVocabulary: 88,
          problemSolving: 75,
        },
        confidence: {
          score: 76,
          technicalAssurance: 82,
          uncertaintyHandling: 70,
          admissionOfLimits: 78,
          description:
            "Bonne confiance technique générale avec une honnêteté appropriée sur les limites de connaissances. Gestion correcte de l'incertitude.",
          confidenceJourney: [
            {
              timestamp: '00:05:00',
              topic: 'Node.js fundamentals',
              confidence: 90,
              reasoning: 'Domaine de forte expertise',
            },
            {
              timestamp: '00:12:00',
              topic: 'Database optimization',
              confidence: 85,
              reasoning: 'Expérience pratique solide',
            },
            {
              timestamp: '00:22:00',
              topic: 'Kubernetes advanced',
              confidence: 65,
              reasoning: 'Connaissance théorique mais moins de pratique',
            },
            {
              timestamp: '00:35:00',
              topic: 'Security best practices',
              confidence: 75,
              reasoning: "Bonnes bases avec volonté d'approfondir",
            },
            {
              timestamp: '00:42:00',
              topic: 'Performance monitoring',
              confidence: 80,
              reasoning: 'Expérience récente positive',
            },
          ],
        },
        clarity: {
          score: 84,
          conceptExplanation: 88,
          codeExplanation: 82,
          architectureDescription: 86,
          analogyUsage: 78,
          description:
            "Excellente clarté dans l'explication des concepts. Bon usage d'analogies pour simplifier les concepts complexes.",
          examples: [
            'Analogie de la "cuisine de restaurant" pour expliquer les microservices',
            'Métaphore du "système postal" pour les queues de messages',
            'Comparaison avec "l\'organisation d\'une bibliothèque" pour les index de base de données',
          ],
        },
        problemSolvingApproach: {
          score: 75,
          structuredThinking: 80,
          questionAsking: 72,
          assumptionMaking: 78,
          solutionBuilding: 73,
          description:
            'Approche méthodique du problem-solving avec une bonne structure de pensée. Pourrait poser plus de questions clarifiantes.',
          methodology: [
            'Analyse du problème en sous-parties',
            'Identification des contraintes techniques',
            'Proposition de solutions alternatives',
            'Évaluation des trade-offs',
          ],
          strengths: [
            'Décomposition logique des problèmes complexes',
            'Prise en compte des contraintes business',
            'Évaluation réaliste des solutions proposées',
          ],
          improvements: [
            'Poser plus de questions avant de proposer des solutions',
            'Explorer davantage les edge cases',
            "Considérer plus d'alternatives avant de choisir",
          ],
        },
        technicalDepth: {
          score: 79,
          fundamentalKnowledge: 85,
          practicalExperience: 82,
          bestPractices: 76,
          industryAwareness: 74,
          description:
            'Solides fondamentaux techniques avec une bonne expérience pratique. Connaissance des best practices à renforcer.',
          strongAreas: [
            'Architecture backend et APIs',
            'Bases de données relationnelles',
            'Patterns de conception',
            'Performance optimization',
          ],
          weakAreas: [
            'Sécurité avancée',
            'Monitoring et observabilité',
            'Tendances émergentes',
            'Compliance et réglementation',
          ],
        },
      },
      technicalStrengths: [
        "Excellente maîtrise de Node.js et de l'écosystème JavaScript",
        'Solide compréhension des architectures microservices',
        'Bonne connaissance des bases de données et optimisation',
        'Capacité à expliquer des concepts complexes simplement',
        'Approche pragmatique du développement',
        'Conscience des trade-offs techniques',
      ],
      technicalWeaknesses: [
        'Connaissances limitées en Kubernetes avancé',
        'Sécurité applicative à approfondir',
        'Monitoring et observabilité à développer',
        'Pratiques DevOps à renforcer',
        'Tests automatisés avancés à maîtriser',
      ],
      communicationStrengths: [
        "Excellente clarté d'expression technique",
        "Bon usage d'analogies pour simplifier",
        'Structure logique des explications',
        'Ton professionnel et engageant',
        "Capacité d'adaptation au niveau de l'interlocuteur",
      ],
      communicationImprovements: [
        'Poser plus de questions clarifiantes',
        'Vérifier la compréhension plus fréquemment',
        'Structurer davantage les réponses longues',
        "Utiliser plus d'exemples concrets",
        'Améliorer la gestion des silences techniques',
      ],
      detailedFeedback: [
        {
          category: 'Architecture & Design',
          score: 82,
          feedback:
            "Excellente compréhension des principes d'architecture. Votre explication des microservices était particulièrement claire et bien structurée.",
          technicalAccuracy: 85,
          communicationClarity: 88,
          specificExamples: [
            "Conception d'une API RESTful bien structurée",
            'Explication claire des patterns CQRS et Event Sourcing',
            'Bonne compréhension des trade-offs entre monolithe et microservices',
          ],
          recommendations: [
            'Approfondir les patterns de résilience (Circuit Breaker, Bulkhead)',
            'Étudier les architectures event-driven plus en détail',
            'Pratiquer la conception de systèmes distribués à grande échelle',
          ],
        },
        {
          category: 'Développement Backend',
          score: 85,
          feedback:
            'Très forte expertise en développement backend avec Node.js. Votre approche du code est propre et bien organisée.',
          technicalAccuracy: 88,
          communicationClarity: 82,
          specificExamples: [
            "Implémentation efficace d'un middleware d'authentification",
            'Optimisation de requêtes SQL complexes',
            'Gestion appropriée des erreurs et logging',
          ],
          recommendations: [
            'Explorer TypeScript pour améliorer la robustesse du code',
            'Approfondir les techniques de testing avancées',
            'Étudier les patterns de cache distribué',
          ],
        },
        {
          category: 'Bases de Données',
          score: 78,
          feedback:
            "Bonne maîtrise des bases de données relationnelles et des principes d'optimisation. Quelques lacunes sur les bases NoSQL.",
          technicalAccuracy: 80,
          communicationClarity: 85,
          specificExamples: [
            'Conception de schéma normalisé efficace',
            'Optimisation de requêtes avec index appropriés',
            'Compréhension des transactions et isolation',
          ],
          recommendations: [
            'Approfondir MongoDB et les bases NoSQL',
            'Étudier les techniques de sharding et partitioning',
            "Pratiquer l'optimisation de performances à grande échelle",
          ],
        },
        {
          category: 'DevOps & Déploiement',
          score: 68,
          feedback:
            "Connaissances de base solides mais à approfondir pour un niveau senior. Focus nécessaire sur l'automatisation.",
          technicalAccuracy: 65,
          communicationClarity: 75,
          specificExamples: [
            'Compréhension basique de Docker et containerisation',
            'Notions de CI/CD avec GitHub Actions',
            'Déploiement manuel sur cloud providers',
          ],
          recommendations: [
            "Maîtriser Kubernetes pour l'orchestration",
            'Approfondir Infrastructure as Code (Terraform)',
            'Étudier les pratiques de monitoring et alerting',
          ],
        },
      ],
      skillGaps: [
        {
          skill: 'Kubernetes & Orchestration',
          currentLevel: 'Débutant',
          targetLevel: 'Intermédiaire',
          priority: 'high',
          learningPath: [
            'Formation Kubernetes fundamentals',
            'Pratique avec minikube en local',
            "Déploiement d'applications sur cluster",
            'Étude des patterns de déploiement',
          ],
        },
        {
          skill: 'Sécurité Applicative',
          currentLevel: 'Intermédiaire',
          targetLevel: 'Avancé',
          priority: 'high',
          learningPath: [
            'Étude OWASP Top 10',
            'Implémentation de JWT sécurisé',
            'Pratique du penetration testing',
            'Certification en cybersécurité',
          ],
        },
        {
          skill: 'Monitoring & Observabilité',
          currentLevel: 'Débutant',
          targetLevel: 'Intermédiaire',
          priority: 'medium',
          learningPath: [
            'Formation sur Prometheus et Grafana',
            'Implémentation de logging structuré',
            'Pratique du distributed tracing',
            "Mise en place d'alerting intelligent",
          ],
        },
        {
          skill: 'Tests Automatisés Avancés',
          currentLevel: 'Intermédiaire',
          targetLevel: 'Avancé',
          priority: 'medium',
          learningPath: [
            "Maîtrise des tests d'intégration",
            'Pratique du TDD/BDD',
            'Tests de performance automatisés',
            'Tests de contrat avec Pact',
          ],
        },
      ],
      nextSteps: [
        'Suivre une formation Kubernetes dans les 30 jours',
        'Implémenter un projet avec monitoring complet',
        'Étudier les patterns de sécurité OWASP',
        'Pratiquer les entretiens système design',
        'Planifier un entretien DevOps de niveau expert',
      ],
      recommendedStudy: [
        {
          area: 'Kubernetes & Container Orchestration',
          resources: [
            'Kubernetes in Action (livre)',
            'Formation officielle Kubernetes',
            'Hands-on labs avec minikube',
            'Certification CKA preparation',
          ],
          estimatedTime: '6-8 semaines',
          priority: 'high',
          practicalExercises: [
            'Déployer une application multi-tier sur K8s',
            'Configurer auto-scaling et load balancing',
            'Implémenter rolling updates et rollbacks',
            'Mettre en place monitoring avec Prometheus',
          ],
        },
        {
          area: 'Application Security',
          resources: [
            'OWASP Web Security Testing Guide',
            'Secure Coding Practices',
            'JWT Security Best Practices',
            'Penetration Testing courses',
          ],
          estimatedTime: '4-6 semaines',
          priority: 'high',
          practicalExercises: [
            "Audit de sécurité d'une API existante",
            "Implémentation d'authentification robuste",
            'Tests de vulnérabilités automatisés',
            'Configuration de WAF et rate limiting',
          ],
        },
        {
          area: 'System Design & Architecture',
          resources: [
            'Designing Data-Intensive Applications',
            'System Design Interview courses',
            'Microservices Patterns',
            'Cloud Architecture certifications',
          ],
          estimatedTime: '8-10 semaines',
          priority: 'medium',
          practicalExercises: [
            'Concevoir un système de chat en temps réel',
            'Architecturer un système de recommandation',
            'Optimiser pour 1M+ utilisateurs concurrent',
            'Implémenter event sourcing pattern',
          ],
        },
      ],
      industryComparison: {
        yourScore: 78,
        averageScore: 71,
        topPerformers: 87,
        percentile: 73,
        salaryImpact: '+12-18% par rapport à la moyenne du marché',
      },
      careerGuidance: {
        readinessLevel: 'Prêt pour postes Senior avec spécialisation',
        recommendedRoles: [
          'Senior Backend Developer',
          'Technical Lead Backend',
          'Full Stack Developer (focus backend)',
          'API Architect',
        ],
        skillsToImprove: [
          'Kubernetes et orchestration',
          'Sécurité applicative avancée',
          'Monitoring et observabilité',
          'System design à grande échelle',
        ],
        timeToReadiness: '3-4 mois pour niveau expert avec formation ciblée',
      },
    },
  ],

  userProgress: {
    totalSessions: 8,
    averageScore: 76,
    currentLevel: 'Senior',
    totalTimeSpent: '6h 15min',
    improvementRate: 18,
    strongestDomains: [
      'Backend Development',
      'Database Design',
      'API Architecture',
    ],
    improvementAreas: ['DevOps', 'Security', 'System Design'],
    nextRecommendedSession: 'DevOps & Cloud Expert',
    technicalEvolution: [
      {
        date: '2024-01-15',
        score: 78,
        domain: 'Backend Development',
        improvement: 12,
        newSkills: ['Microservices patterns', 'Database optimization'],
      },
      {
        date: '2024-01-10',
        score: 72,
        domain: 'Frontend Development',
        improvement: 15,
        newSkills: ['React hooks', 'State management'],
      },
      {
        date: '2024-01-05',
        score: 65,
        domain: 'Mobile Development',
        improvement: 8,
        newSkills: ['React Native', 'Mobile performance'],
      },
    ],
    certificationProgress: [
      {
        certification: 'AWS Solutions Architect',
        progress: 65,
        estimatedCompletion: '2024-03-15',
      },
      {
        certification: 'Kubernetes CKA',
        progress: 30,
        estimatedCompletion: '2024-04-30',
      },
      {
        certification: 'CISSP Security',
        progress: 15,
        estimatedCompletion: '2024-06-30',
      },
    ],
  },

  statistics: {
    totalSessions: 8420,
    averageScore: 72,
    averageImprovement: 14,
    mostPopularDomain: 'Backend Development',
    averageDuration: '48 minutes',
    successRate: 84,
    userSatisfaction: 4.7,
    averageSalaryIncrease: '+15%',
  },

  technicalTips: [
    'Expliquez votre raisonnement étape par étape, même pour les concepts simples',
    'Utilisez des analogies du monde réel pour clarifier les concepts abstraits',
    "N'hésitez pas à dessiner des diagrammes même lors d'un appel audio",
    'Posez des questions clarifiantes avant de proposer une solution',
    'Admettez vos limites et expliquez comment vous apprendriez',
    'Discutez des trade-offs de chaque solution technique proposée',
    'Mentionnez les considérations de performance et de scalabilité',
  ],

  technicalRequirements: {
    webCall: {
      browser: ['Chrome 90+', 'Firefox 88+', 'Safari 14+', 'Edge 90+'],
      bandwidth: "Minimum 2 Mbps upload/download pour partage d'écran",
      microphone: 'Microphone de qualité professionnelle recommandé',
      environment: 'Environnement calme avec possibilité de coder',
      tools: 'IDE ou éditeur de code accessible',
      whiteboard: 'Outil de dessin/diagramme disponible',
    },
    phoneCall: {
      quality: 'Ligne fixe ou mobile avec excellente réception',
      environment: 'Bureau silencieux avec ordinateur accessible',
      backup: 'Numéro de secours et connexion internet stable',
      duration: 'Forfait illimité recommandé',
      preparation: 'Documents techniques et notes à portée de main',
    },
  },

  pricing: {
    webCall: {
      junior: {
        price: 45,
        duration: '40 min',
        features: ['Rapport technique', 'IA spécialisée', 'Code review'],
      },
      senior: {
        price: 65,
        duration: '50 min',
        features: ['Rapport détaillé', 'IA experte', 'Architecture review'],
      },
      expert: {
        price: 85,
        duration: '60 min',
        features: ['Rapport complet', 'IA architect', 'Career guidance'],
      },
      architect: {
        price: 120,
        duration: '75 min',
        features: ['Rapport expert', 'IA senior', 'System design', 'Mentoring'],
      },
    },
    phoneCall: {
      junior: {
        price: 40,
        duration: '40 min',
        features: ['Rapport technique', 'IA spécialisée'],
      },
      senior: {
        price: 60,
        duration: '50 min',
        features: ['Rapport détaillé', 'IA experte'],
      },
      expert: {
        price: 80,
        duration: '60 min',
        features: ['Rapport complet', 'IA architect'],
      },
      architect: {
        price: 115,
        duration: '75 min',
        features: ['Rapport expert', 'IA senior', 'Mentoring'],
      },
    },
  },

  codeExamples: {
    backend: [
      "Implémenter un middleware d'authentification JWT",
      'Optimiser une requête SQL complexe',
      'Concevoir une API RESTful pour un e-commerce',
      'Implémenter un pattern Repository avec TypeScript',
    ],
    frontend: [
      "Créer un hook React personnalisé pour la gestion d'état",
      "Optimiser les performances d'une liste virtualisée",
      'Implémenter un système de cache côté client',
      'Concevoir un composant accessible avec ARIA',
    ],
    devops: [
      'Écrire un Dockerfile multi-stage optimisé',
      'Configurer un pipeline CI/CD avec GitHub Actions',
      'Créer un chart Helm pour déploiement Kubernetes',
      'Implémenter Infrastructure as Code avec Terraform',
    ],
    data: [
      'Implémenter un algorithme de machine learning',
      'Optimiser un pipeline de traitement de données',
      'Créer un modèle de prédiction avec Python',
      'Concevoir un système de recommandation',
    ],
  },
};
