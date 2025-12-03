export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  testsCount: number;
  totalQuestions: number;
  averageLevel: string;
  averageDuration: string;
  successRate: number;
  technologies: string[];
  rating: number;
  completions: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'code' | 'practical' | 'architecture';
  difficulty: 'Junior' | 'Intermédiaire' | 'Senior' | 'Expert' | 'Architect';
  points: number;
  context?: string;
  scenario?: string;
  architecturePrompt?: string;
  language?: string;
  codeTemplate?: string;
  testCases?: {
    input: string;
    output: string;
  }[];
  technologies?: string[];
  options?: {
    text: string;
    value: string | number;
    explanation?: string;
    isCorrect?: boolean;
  }[];
  correctAnswer?: string | number;
  skillWeight: Record<string, number>;
  timeLimit?: number;
}

export interface Test {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  difficulty: 'Junior' | 'Intermédiaire' | 'Senior' | 'Expert' | 'Architect';
  rating: number;
  reviews: number;
  technologies: string[];
  format: string[];
  prerequisites?: string[];
  preview?: string;
  questions: Question[];
  passingScore: number;
  isCertified: boolean;
  isNew?: boolean;
  estimatedSalaryImpact?: string;
  industryDemand?: 'Low' | 'Medium' | 'High' | 'Very High';
}

export interface TestResult {
  id: string;
  testId: string;
  overallScore: number;
  level: string;
  summary: string;
  accuracy: number;
  timeSpent: string;
  technicalScores: {
    technology: string;
    score: number;
    level: string;
    description: string;
    questionsCorrect: number;
    totalQuestions: number;
  }[];
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  learningPath: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedTime: string;
    difficulty: string;
    type: string;
  }[];
  completedAt: string;
  certificateEarned: boolean;
  industryComparison: {
    percentile: number;
    averageScore: number;
    topPerformers: number;
  };
}

export interface UserProgress {
  completedTests: number;
  averageScore: number;
  currentLevel: string;
  totalTimeSpent: string;
  certificatesEarned: number;
  strongestTechnologies: string[];
  improvementAreas: string[];
  nextRecommendedTest: string;
  skillsEvolution: {
    technology: string;
    previousScore: number;
    currentScore: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export const hardSkillsData = {
  categories: [
    {
      id: 'programming',
      name: 'Programmation & Développement',
      description:
        'Évaluez vos compétences en langages de programmation, algorithmes et structures de données',
      icon: 'Code',
      color: 'bg-blue-500',
      testsCount: 15,
      totalQuestions: 450,
      averageLevel: 'Intermédiaire',
      averageDuration: '45 min',
      successRate: 68,
      technologies: [
        'JavaScript',
        'Python',
        'Java',
        'C#',
        'TypeScript',
        'Go',
        'Rust',
        'PHP',
      ],
      rating: 5,
      completions: 89,
    },
    {
      id: 'database',
      name: 'Bases de Données',
      description:
        'Testez vos connaissances en SQL, NoSQL, conception de bases de données et optimisation',
      icon: 'Database',
      color: 'bg-emerald-500',
      testsCount: 8,
      totalQuestions: 240,
      averageLevel: 'Senior',
      averageDuration: '35 min',
      successRate: 72,
      technologies: [
        'SQL',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Elasticsearch',
        'Oracle',
        'MySQL',
      ],
      rating: 5,
      completions: 67,
    },
    {
      id: 'cloud',
      name: 'Cloud & DevOps',
      description:
        'Évaluez vos compétences en cloud computing, conteneurisation et pratiques DevOps',
      icon: 'Cloud',
      color: 'bg-purple-500',
      testsCount: 12,
      totalQuestions: 360,
      averageLevel: 'Senior',
      averageDuration: '50 min',
      successRate: 65,
      technologies: [
        'AWS',
        'Azure',
        'GCP',
        'Docker',
        'Kubernetes',
        'Terraform',
        'Jenkins',
        'GitLab CI',
      ],
      rating: 5,
      completions: 54,
    },
    {
      id: 'security',
      name: 'Cybersécurité',
      description:
        'Testez vos connaissances en sécurité informatique, cryptographie et protection des données',
      icon: 'Shield',
      color: 'bg-red-500',
      testsCount: 6,
      totalQuestions: 180,
      averageLevel: 'Expert',
      averageDuration: '40 min',
      successRate: 58,
      technologies: [
        'OWASP',
        'Cryptographie',
        'Pentesting',
        'SIEM',
        'IAM',
        'Zero Trust',
      ],
      rating: 4,
      completions: 32,
    },
    {
      id: 'architecture',
      name: 'Architecture Système',
      description:
        "Évaluez vos compétences en conception d'architectures scalables et microservices",
      icon: 'Cpu',
      color: 'bg-indigo-500',
      testsCount: 7,
      totalQuestions: 210,
      averageLevel: 'Architect',
      averageDuration: '60 min',
      successRate: 52,
      technologies: [
        'Microservices',
        'Event Sourcing',
        'CQRS',
        'API Design',
        'Load Balancing',
      ],
      rating: 5,
      completions: 28,
    },
    {
      id: 'mobile',
      name: 'Développement Mobile',
      description:
        "Testez vos compétences en développement d'applications mobiles natives et cross-platform",
      icon: 'Smartphone',
      color: 'bg-pink-500',
      testsCount: 9,
      totalQuestions: 270,
      averageLevel: 'Intermédiaire',
      averageDuration: '40 min',
      successRate: 71,
      technologies: [
        'React Native',
        'Flutter',
        'Swift',
        'Kotlin',
        'Xamarin',
        'Ionic',
      ],
      rating: 4,
      completions: 43,
    },
    {
      id: 'web',
      name: 'Développement Web',
      description:
        'Évaluez vos compétences en développement frontend, backend et frameworks modernes',
      icon: 'Globe',
      color: 'bg-teal-500',
      testsCount: 13,
      totalQuestions: 390,
      averageLevel: 'Intermédiaire',
      averageDuration: '42 min',
      successRate: 74,
      technologies: [
        'React',
        'Vue.js',
        'Angular',
        'Node.js',
        'Express',
        'Next.js',
        'Svelte',
      ],
      rating: 5,
      completions: 76,
    },
    {
      id: 'data',
      name: 'Data Science & IA',
      description:
        'Testez vos connaissances en science des données, machine learning et intelligence artificielle',
      icon: 'BarChart3',
      color: 'bg-amber-500',
      testsCount: 10,
      totalQuestions: 300,
      averageLevel: 'Senior',
      averageDuration: '55 min',
      successRate: 61,
      technologies: [
        'Python',
        'R',
        'TensorFlow',
        'PyTorch',
        'Pandas',
        'Scikit-learn',
        'Spark',
      ],
      rating: 5,
      completions: 39,
    },
  ],

  tests: [
    {
      id: 'prog-js-001',
      categoryId: 'programming',
      title: 'JavaScript Avancé & ES6+',
      description:
        'Évaluation complète des concepts avancés de JavaScript incluant ES6+, async/await, closures et prototypes',
      duration: '45 minutes',
      questionsCount: 35,
      difficulty: 'Senior' as const,
      rating: 5,
      reviews: 1247,
      technologies: ['JavaScript', 'ES6+', 'Node.js', 'TypeScript'],
      format: ['QCM', 'Code', 'Practical'],
      prerequisites: ['JavaScript fondamental', 'Programmation orientée objet'],
      preview:
        'Implémentez une fonction de debounce avec gestion des paramètres et du contexte',
      questions: [
        {
          id: 'js-q1',
          question:
            'Quelle est la différence principale entre `let`, `const` et `var` en JavaScript ?',
          type: 'multiple_choice' as const,
          difficulty: 'Intermédiaire' as const,
          points: 10,
          context:
            'Compréhension des portées et du hoisting en JavaScript ES6+',
          technologies: ['JavaScript', 'ES6'],
          options: [
            {
              text: '`let` et `const` ont une portée de bloc, `var` a une portée de fonction',
              value: 'block_scope',
              explanation:
                'Correct ! `let` et `const` sont block-scoped tandis que `var` est function-scoped',
              isCorrect: true,
            },
            {
              text: '`const` ne peut jamais être modifié, `let` et `var` sont identiques',
              value: 'const_immutable',
              explanation:
                'Incorrect. `const` empêche la réassignation mais pas la mutation des objets',
            },
            {
              text: 'Aucune différence, ce sont des alias',
              value: 'no_difference',
              explanation:
                'Incorrect. Il y a des différences importantes de portée et de hoisting',
            },
            {
              text: "`let` et `var` sont hoisted, `const` ne l'est pas",
              value: 'hoisting_diff',
              explanation:
                'Incorrect. Tous sont hoisted mais `let` et `const` ont une temporal dead zone',
            },
          ],
          correctAnswer: 'block_scope',
          skillWeight: {
            'JavaScript ES6+': 0.6,
            'Portée et hoisting': 0.4,
          },
          timeLimit: 120,
        },
        {
          id: 'js-q2',
          question:
            "Implémentez une fonction `debounce` qui retarde l'exécution d'une fonction",
          type: 'code' as const,
          difficulty: 'Senior' as const,
          points: 25,
          context:
            'Optimisation des performances et gestion des événements fréquents',
          language: 'javascript',
          codeTemplate: `function debounce(func, delay) {
  // Votre implémentation ici
  
}

// Test
const debouncedLog = debounce(console.log, 300);
debouncedLog('Hello'); // Ne s'exécute qu'après 300ms sans nouvel appel`,
          testCases: [
            {
              input: 'debounce(fn, 100) appelé 3 fois rapidement',
              output: 'fn exécutée 1 seule fois après 100ms',
            },
            {
              input: 'debounce(fn, 200) avec paramètres',
              output: 'fn exécutée avec les derniers paramètres',
            },
          ],
          technologies: ['JavaScript', 'Closures', 'Timers'],
          skillWeight: {
            'JavaScript Avancé': 0.5,
            Closures: 0.3,
            Optimisation: 0.2,
          },
          timeLimit: 600,
        },
        {
          id: 'js-q3',
          question: "Comment gérer cette situation d'asynchronisme ?",
          type: 'practical' as const,
          difficulty: 'Senior' as const,
          points: 20,
          scenario:
            "Vous devez récupérer des données depuis 3 APIs différentes. La première API retourne une liste d'IDs, les deux autres APIs utilisent ces IDs pour récupérer des détails. Vous devez optimiser les appels pour minimiser le temps de réponse total.",
          technologies: ['JavaScript', 'Async/Await', 'Promises'],
          options: [
            {
              text: 'Utiliser Promise.all() après avoir récupéré les IDs pour paralléliser les appels aux APIs 2 et 3',
              value: 'promise_all',
              explanation:
                'Excellente approche ! Minimise le temps total en parallélisant les appels indépendants',
            },
            {
              text: 'Faire les appels séquentiellement avec await pour chaque API',
              value: 'sequential',
              explanation:
                'Fonctionnel mais non optimal. Temps total = somme de tous les temps de réponse',
            },
            {
              text: 'Utiliser Promise.race() pour prendre la première réponse',
              value: 'promise_race',
              explanation:
                'Incorrect. Promise.race() ne convient pas ici car on a besoin de toutes les données',
            },
            {
              text: 'Utiliser des callbacks pour éviter les promises',
              value: 'callbacks',
              explanation:
                'Déconseillé. Les callbacks créent du callback hell et sont moins lisibles',
            },
          ],
          skillWeight: {
            'Programmation asynchrone': 0.6,
            Optimisation: 0.4,
          },
          timeLimit: 300,
        },
      ],
      passingScore: 75,
      isCertified: true,
      isNew: false,
      estimatedSalaryImpact: '+8-15%',
      industryDemand: 'Very High' as const,
    },
    {
      id: 'prog-python-001',
      categoryId: 'programming',
      title: 'Python pour Data Science',
      description:
        'Évaluation des compétences Python orientées data science avec pandas, numpy et visualisation',
      duration: '50 minutes',
      questionsCount: 40,
      difficulty: 'Intermédiaire' as const,
      rating: 5,
      reviews: 892,
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
      format: ['QCM', 'Code', 'Practical'],
      prerequisites: ['Python fondamental', 'Statistiques de base'],
      preview:
        'Analysez un dataset de ventes et créez des visualisations avec pandas et matplotlib',
      questions: [],
      passingScore: 70,
      isCertified: true,
      isNew: true,
      estimatedSalaryImpact: '+12-20%',
      industryDemand: 'Very High' as const,
    },
    {
      id: 'db-sql-001',
      categoryId: 'database',
      title: 'SQL Avancé & Optimisation',
      description:
        'Maîtrise des requêtes SQL complexes, optimisation des performances et conception de schémas',
      duration: '40 minutes',
      questionsCount: 30,
      difficulty: 'Senior' as const,
      rating: 5,
      reviews: 1156,
      technologies: ['SQL', 'PostgreSQL', 'Indexation', 'Optimisation'],
      format: ['QCM', 'Code', 'Architecture'],
      prerequisites: ['SQL de base', 'Conception de bases de données'],
      preview:
        'Optimisez une requête complexe avec jointures multiples et sous-requêtes',
      questions: [],
      passingScore: 75,
      isCertified: true,
      isNew: false,
      estimatedSalaryImpact: '+10-18%',
      industryDemand: 'High' as const,
    },
    {
      id: 'cloud-aws-001',
      categoryId: 'cloud',
      title: 'AWS Solutions Architect',
      description:
        "Conception d'architectures cloud scalables et sécurisées sur Amazon Web Services",
      duration: '60 minutes',
      questionsCount: 45,
      difficulty: 'Expert' as const,
      rating: 5,
      reviews: 743,
      technologies: ['AWS', 'EC2', 'S3', 'Lambda', 'VPC', 'CloudFormation'],
      format: ['QCM', 'Architecture', 'Practical'],
      prerequisites: ['Concepts cloud', 'Réseaux', 'Sécurité'],
      preview:
        'Concevez une architecture multi-région pour une application e-commerce haute disponibilité',
      questions: [],
      passingScore: 80,
      isCertified: true,
      isNew: false,
      estimatedSalaryImpact: '+15-25%',
      industryDemand: 'Very High' as const,
    },
    {
      id: 'sec-owasp-001',
      categoryId: 'security',
      title: 'Sécurité Web & OWASP Top 10',
      description:
        'Identification et mitigation des vulnérabilités web selon le référentiel OWASP',
      duration: '45 minutes',
      questionsCount: 35,
      difficulty: 'Expert' as const,
      rating: 4,
      reviews: 567,
      technologies: ['OWASP', 'Sécurité Web', 'Pentesting', 'Cryptographie'],
      format: ['QCM', 'Practical'],
      prerequisites: ['Développement web', 'Réseaux', 'Cryptographie de base'],
      preview:
        'Identifiez les vulnérabilités dans ce code et proposez des corrections',
      questions: [],
      passingScore: 85,
      isCertified: true,
      isNew: false,
      estimatedSalaryImpact: '+20-30%',
      industryDemand: 'Very High' as const,
    },
    {
      id: 'arch-micro-001',
      categoryId: 'architecture',
      title: 'Architecture Microservices',
      description:
        "Conception et implémentation d'architectures microservices scalables et résilientes",
      duration: '65 minutes',
      questionsCount: 40,
      difficulty: 'Architect' as const,
      rating: 5,
      reviews: 423,
      technologies: [
        'Microservices',
        'API Gateway',
        'Service Mesh',
        'Event Sourcing',
        'CQRS',
      ],
      format: ['Architecture', 'Practical', 'QCM'],
      prerequisites: [
        'Architecture distribuée',
        'APIs REST',
        'Patterns de conception',
      ],
      preview:
        'Concevez une architecture microservices pour un système de e-commerce avec gestion des commandes',
      questions: [],
      passingScore: 80,
      isCertified: true,
      isNew: true,
      estimatedSalaryImpact: '+25-40%',
      industryDemand: 'Very High' as const,
    },
    {
      id: 'mobile-rn-001',
      categoryId: 'mobile',
      title: 'React Native Avancé',
      description:
        "Développement d'applications mobiles performantes avec React Native et intégrations natives",
      duration: '45 minutes',
      questionsCount: 35,
      difficulty: 'Senior' as const,
      rating: 4,
      reviews: 634,
      technologies: ['React Native', 'Redux', 'Native Modules', 'Performance'],
      format: ['QCM', 'Code', 'Practical'],
      prerequisites: ['React', 'JavaScript ES6+', 'Développement mobile'],
      preview:
        "Optimisez les performances d'une liste avec des milliers d'éléments",
      questions: [],
      passingScore: 75,
      isCertified: true,
      isNew: false,
      estimatedSalaryImpact: '+12-22%',
      industryDemand: 'High' as const,
    },
    {
      id: 'web-react-001',
      categoryId: 'web',
      title: 'React & Écosystème Moderne',
      description:
        "Maîtrise de React, hooks, state management et outils de l'écosystème moderne",
      duration: '50 minutes',
      questionsCount: 40,
      difficulty: 'Senior' as const,
      rating: 5,
      reviews: 1089,
      technologies: [
        'React',
        'Hooks',
        'Redux Toolkit',
        'Next.js',
        'TypeScript',
      ],
      format: ['QCM', 'Code', 'Practical'],
      prerequisites: ['JavaScript ES6+', 'HTML/CSS', 'Concepts React de base'],
      preview:
        'Implémentez un hook personnalisé pour la gestion du cache avec invalidation automatique',
      questions: [],
      passingScore: 75,
      isCertified: true,
      isNew: false,
      estimatedSalaryImpact: '+10-18%',
      industryDemand: 'Very High' as const,
    },
    {
      id: 'data-ml-001',
      categoryId: 'data',
      title: 'Machine Learning avec Python',
      description:
        "Implémentation d'algorithmes de ML, preprocessing des données et évaluation de modèles",
      duration: '60 minutes',
      questionsCount: 45,
      difficulty: 'Expert' as const,
      rating: 5,
      reviews: 756,
      technologies: [
        'Python',
        'Scikit-learn',
        'TensorFlow',
        'Pandas',
        'Feature Engineering',
      ],
      format: ['QCM', 'Code', 'Practical'],
      prerequisites: ['Python', 'Statistiques', 'Algèbre linéaire', 'Pandas'],
      preview:
        'Construisez un pipeline ML complet pour la prédiction de prix immobiliers',
      questions: [],
      passingScore: 80,
      isCertified: true,
      isNew: true,
      estimatedSalaryImpact: '+20-35%',
      industryDemand: 'Very High' as const,
    },
  ],

  testResults: [
    {
      id: 'result-001',
      testId: 'prog-js-001',
      overallScore: 87,
      level: 'Senior',
      summary:
        "Excellente maîtrise de JavaScript avec une compréhension approfondie des concepts avancés. Quelques axes d'amélioration en optimisation des performances.",
      accuracy: 91,
      timeSpent: '38 minutes',
      technicalScores: [
        {
          technology: 'JavaScript ES6+',
          score: 92,
          level: 'Expert',
          description:
            'Maîtrise exceptionnelle des fonctionnalités modernes de JavaScript',
          questionsCorrect: 11,
          totalQuestions: 12,
        },
        {
          technology: 'Programmation Asynchrone',
          score: 88,
          level: 'Senior',
          description:
            "Très bonne compréhension des Promises, async/await et gestion d'erreurs",
          questionsCorrect: 7,
          totalQuestions: 8,
        },
        {
          technology: 'Closures & Prototypes',
          score: 85,
          level: 'Senior',
          description:
            'Solide compréhension des concepts avancés de JavaScript',
          questionsCorrect: 6,
          totalQuestions: 7,
        },
        {
          technology: 'Optimisation Performance',
          score: 78,
          level: 'Intermédiaire',
          description:
            'Bonnes bases avec marge de progression en optimisation avancée',
          questionsCorrect: 5,
          totalQuestions: 8,
        },
      ],
      strengths: [
        'Excellente maîtrise des fonctionnalités ES6+ (destructuring, spread, modules)',
        'Compréhension approfondie des closures et du scope',
        'Bonne gestion de la programmation asynchrone avec async/await',
        'Code propre et bien structuré dans les exercices pratiques',
      ],
      improvements: [
        "Approfondir les techniques d'optimisation des performances",
        'Améliorer la connaissance des Web APIs modernes',
        'Renforcer les compétences en debugging avancé',
        'Étudier les patterns de conception JavaScript',
      ],
      nextSteps: [
        "Suivre une formation sur l'optimisation des performances JavaScript",
        'Pratiquer avec des projets utilisant des Web Workers',
        'Étudier les patterns de conception avancés',
        'Passer le test TypeScript Avancé',
      ],
      learningPath: [
        {
          title: 'Formation Performance JavaScript',
          description:
            "Techniques avancées d'optimisation : lazy loading, memoization, virtual DOM",
          priority: 'high' as const,
          estimatedTime: '8 heures',
          difficulty: 'Avancé',
          type: 'Cours en ligne',
        },
        {
          title: 'Projet Web Workers',
          description:
            "Implémentation d'un projet utilisant Web Workers pour le calcul intensif",
          priority: 'medium' as const,
          estimatedTime: '12 heures',
          difficulty: 'Intermédiaire',
          type: 'Projet pratique',
        },
        {
          title: 'Patterns de Conception JS',
          description:
            'Étude des patterns Observer, Factory, Singleton en JavaScript moderne',
          priority: 'medium' as const,
          estimatedTime: '6 heures',
          difficulty: 'Avancé',
          type: 'Documentation',
        },
        {
          title: 'Certification TypeScript',
          description:
            'Préparation et passage de la certification TypeScript avancé',
          priority: 'low' as const,
          estimatedTime: '20 heures',
          difficulty: 'Expert',
          type: 'Certification',
        },
      ],
      completedAt: '2024-01-15T16:45:00Z',
      certificateEarned: true,
      industryComparison: {
        percentile: 85,
        averageScore: 72,
        topPerformers: 90,
      },
    },
  ],

  userProgress: {
    completedTests: 18,
    averageScore: 82,
    currentLevel: 'Senior',
    totalTimeSpent: '14h 23min',
    certificatesEarned: 12,
    strongestTechnologies: ['JavaScript', 'React', 'Node.js', 'SQL', 'AWS'],
    improvementAreas: [
      'Machine Learning',
      'Cybersécurité',
      'Architecture Microservices',
    ],
    nextRecommendedTest: 'TypeScript Avancé',
    skillsEvolution: [
      {
        technology: 'JavaScript',
        previousScore: 78,
        currentScore: 87,
        trend: 'up' as const,
      },
      {
        technology: 'React',
        previousScore: 85,
        currentScore: 89,
        trend: 'up' as const,
      },
      {
        technology: 'SQL',
        previousScore: 82,
        currentScore: 81,
        trend: 'stable' as const,
      },
      {
        technology: 'Python',
        previousScore: 75,
        currentScore: 79,
        trend: 'up' as const,
      },
    ],
  },

  statistics: {
    totalTests: 79,
    activeDevelopers: 23450,
    averagePlatformScore: 74,
    certificatesIssued: 15678,
    successRate: 71,
    mostPopularCategory: 'Programmation & Développement',
    averageCompletionTime: '47 minutes',
    topPerformingTest: 'JavaScript Avancé & ES6+',
    industryGrowth: '+23% cette année',
  },

  aiTips: [
    'Pratiquez le code régulièrement sur des plateformes comme LeetCode ou HackerRank',
    'Restez à jour avec les dernières versions des technologies que vous utilisez',
    'Contribuez à des projets open source pour améliorer vos compétences',
    'Lisez la documentation officielle plutôt que de vous fier uniquement aux tutoriels',
    'Implémentez des projets personnels pour appliquer vos connaissances théoriques',
    'Participez à des code reviews pour apprendre des autres développeurs',
    'Suivez les bonnes pratiques de sécurité dès le début de vos projets',
  ],

  certifications: [
    {
      id: 'cert-js-001',
      name: 'Certificat JavaScript Avancé',
      description:
        'Valide la maîtrise des concepts avancés de JavaScript et ES6+',
      requirements: 'Score ≥ 75% au test JavaScript Avancé & ES6+',
      validityPeriod: '3 ans',
      recognizedBy: ['Mozilla', 'Google', 'Microsoft', 'Meta'],
      industryValue: 'Très élevée',
      salaryImpact: '+8-15%',
    },
    {
      id: 'cert-aws-001',
      name: 'Certificat AWS Solutions Architect',
      description:
        "Certifie les compétences en conception d'architectures cloud AWS",
      requirements: 'Score ≥ 80% au test AWS Solutions Architect',
      validityPeriod: '3 ans',
      recognizedBy: ['Amazon', 'AWS Partners', 'Fortune 500'],
      industryValue: 'Exceptionnelle',
      salaryImpact: '+15-25%',
    },
    {
      id: 'cert-sec-001',
      name: 'Certificat Cybersécurité OWASP',
      description:
        "Atteste de l'expertise en sécurité web et mitigation des vulnérabilités",
      requirements: 'Score ≥ 85% au test Sécurité Web & OWASP Top 10',
      validityPeriod: '2 ans',
      recognizedBy: ['OWASP', 'SANS', 'ISC2', 'CompTIA'],
      industryValue: 'Très élevée',
      salaryImpact: '+20-30%',
    },
    {
      id: 'cert-ml-001',
      name: 'Certificat Machine Learning',
      description:
        'Valide les compétences en ML, preprocessing et évaluation de modèles',
      requirements: 'Score ≥ 80% au test Machine Learning avec Python',
      validityPeriod: '3 ans',
      recognizedBy: ['Google', 'Microsoft', 'IBM', 'Coursera'],
      industryValue: 'Exceptionnelle',
      salaryImpact: '+20-35%',
    },
  ],

  learningResources: [
    {
      id: 'resource-001',
      title: 'Guide Complet JavaScript ES6+',
      type: 'Documentation',
      duration: '4 heures',
      difficulty: 'Intermédiaire',
      description:
        'Documentation complète des fonctionnalités modernes de JavaScript',
      technologies: ['JavaScript', 'ES6+'],
      rating: 5,
    },
    {
      id: 'resource-002',
      title: 'Masterclass Architecture Cloud AWS',
      type: 'Vidéo',
      duration: '8 heures',
      difficulty: 'Avancé',
      description:
        "Formation complète sur la conception d'architectures cloud scalables",
      technologies: ['AWS', 'Cloud Architecture'],
      rating: 5,
    },
    {
      id: 'resource-003',
      title: 'Laboratoire Cybersécurité Pratique',
      type: 'Hands-on',
      duration: '12 heures',
      difficulty: 'Expert',
      description:
        "Exercices pratiques de pentesting et sécurisation d'applications",
      technologies: ['Cybersécurité', 'OWASP', 'Pentesting'],
      rating: 4,
    },
    {
      id: 'resource-004',
      title: 'Projet ML End-to-End',
      type: 'Projet',
      duration: '20 heures',
      difficulty: 'Expert',
      description:
        "Projet complet de ML depuis la collecte de données jusqu'au déploiement",
      technologies: ['Python', 'Machine Learning', 'MLOps'],
      rating: 5,
    },
  ],

  industryBenchmarks: {
    salaryRanges: {
      Junior: '35-50k€',
      Intermédiaire: '50-70k€',
      Senior: '70-95k€',
      Expert: '95-130k€',
      Architect: '130k€+',
    },
    demandByTechnology: {
      JavaScript: 95,
      Python: 92,
      AWS: 89,
      React: 87,
      Docker: 84,
      Kubernetes: 82,
      'Machine Learning': 88,
      Cybersécurité: 91,
    },
    growthProjections: {
      'Cloud Computing': '+28%',
      'IA/Machine Learning': '+35%',
      Cybersécurité: '+31%',
      DevOps: '+25%',
      'Mobile Development': '+18%',
    },
  },

  competitorAnalysis: {
    platforms: [
      {
        name: 'HackerRank',
        strengths: ['Large community', 'Coding challenges'],
        weaknesses: ['Limited AI feedback', 'Basic analytics'],
      },
      {
        name: 'Codility',
        strengths: ['Enterprise focus', 'Detailed reports'],
        weaknesses: ['Expensive', 'Limited technologies'],
      },
      {
        name: 'LeetCode',
        strengths: ['Algorithm focus', 'Interview prep'],
        weaknesses: ['Narrow scope', 'No certifications'],
      },
    ],
    ourAdvantages: [
      'IA avancée pour feedback personnalisé',
      "Certifications reconnues par l'industrie",
      'Évaluation holistique (technique + soft skills)',
      "Plans d'apprentissage adaptatifs",
      'Intégration avec profils professionnels',
    ],
  },
};
