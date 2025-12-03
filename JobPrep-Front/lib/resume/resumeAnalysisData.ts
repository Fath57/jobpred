export interface CVAnalysis {
  id: string;
  fileName: string;
  position: string;
  lastAnalyzed: string;
  overallScore: number;
  trend: 'up' | 'down' | 'stable';
  keywordsFound: number;
  missingSections: number;
  optimalLength: boolean;
  categoryScores: {
    category: string;
    score: number;
  }[];
  recommendations: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    impact?: string;
  }[];
  keywordAnalysis: {
    present: string[];
    missing: string[];
    suggestions: string[];
  };
  structureAnalysis: {
    section: string;
    status: 'present' | 'missing' | 'needs_improvement';
    feedback: string;
  }[];
  industryComparison: {
    metric: string;
    yourScore: number;
    industryAverage: number;
  }[];
}

export const resumeAnalysisData = {
  cvAnalyses: [
    {
      id: '1',
      fileName: 'CV_Jean_Rene_2024.pdf',
      position: 'Directeur de Projet IT',
      lastAnalyzed: 'Il y a 2 heures',
      overallScore: 85,
      trend: 'up' as const,
      keywordsFound: 24,
      missingSections: 1,
      optimalLength: true,
      categoryScores: [
        { category: 'Contenu', score: 88 },
        { category: 'Structure', score: 82 },
        { category: 'Mots-clés', score: 90 },
        { category: 'Format', score: 85 },
        { category: 'Lisibilité', score: 78 },
      ],
      recommendations: [
        {
          title: 'Ajouter une section Certifications',
          description:
            'Les certifications IT sont très valorisées dans votre secteur. Ajoutez vos certifications PMP, ITIL ou autres pour renforcer votre profil.',
          priority: 'high' as const,
          impact: 'Augmentation potentielle du score de 8-12 points',
        },
        {
          title: 'Quantifier davantage vos réalisations',
          description:
            "Ajoutez plus de métriques et de chiffres concrets pour démontrer l'impact de vos projets (budgets gérés, équipes dirigées, délais respectés).",
          priority: 'medium' as const,
          impact: "Amélioration de la crédibilité et de l'impact",
        },
        {
          title: 'Optimiser la section Compétences techniques',
          description:
            'Réorganisez vos compétences par catégories (Gestion de projet, Technologies, Méthodologies) pour une meilleure lisibilité.',
          priority: 'low' as const,
        },
      ],
      keywordAnalysis: {
        present: [
          'Gestion de projet',
          'Agile',
          'Scrum',
          'Leadership',
          'Transformation digitale',
          'Budget',
          'Équipe',
          'Stakeholders',
          'Planification',
          'Risques',
        ],
        missing: [
          'DevOps',
          'Cloud',
          'Data Analytics',
          'Intelligence Artificielle',
          'Cybersécurité',
        ],
        suggestions: [
          'Digital Transformation',
          'Change Management',
          'Lean Management',
          'KPI',
          'ROI',
          'Innovation',
          'Stratégie IT',
        ],
      },
      structureAnalysis: [
        {
          section: 'En-tête et Contact',
          status: 'present' as const,
          feedback: 'Informations complètes et professionnelles',
        },
        {
          section: 'Résumé Professionnel',
          status: 'present' as const,
          feedback: 'Résumé percutant et bien ciblé',
        },
        {
          section: 'Expérience Professionnelle',
          status: 'present' as const,
          feedback: 'Expériences détaillées avec des réalisations concrètes',
        },
        {
          section: 'Formation',
          status: 'present' as const,
          feedback: 'Formation pertinente et bien présentée',
        },
        {
          section: 'Compétences',
          status: 'needs_improvement' as const,
          feedback: 'Pourrait être mieux organisée par catégories',
        },
        {
          section: 'Certifications',
          status: 'missing' as const,
          feedback: 'Section manquante - très importante pour votre secteur',
        },
        {
          section: 'Langues',
          status: 'present' as const,
          feedback: 'Niveaux clairement indiqués',
        },
      ],
      industryComparison: [
        {
          metric: 'Longueur optimale',
          yourScore: 85,
          industryAverage: 78,
        },
        {
          metric: 'Densité mots-clés',
          yourScore: 90,
          industryAverage: 72,
        },
        {
          metric: 'Quantification résultats',
          yourScore: 75,
          industryAverage: 68,
        },
        {
          metric: 'Compétences techniques',
          yourScore: 70,
          industryAverage: 82,
        },
        {
          metric: 'Structure professionnelle',
          yourScore: 88,
          industryAverage: 75,
        },
      ],
    },
    {
      id: '2',
      fileName: 'CV_Jean_Rene_Consultant.pdf',
      position: 'Consultant en Transformation Digitale',
      lastAnalyzed: 'Il y a 1 jour',
      overallScore: 78,
      trend: 'stable' as const,
      keywordsFound: 19,
      missingSections: 2,
      optimalLength: false,
      categoryScores: [
        { category: 'Contenu', score: 80 },
        { category: 'Structure', score: 75 },
        { category: 'Mots-clés', score: 82 },
        { category: 'Format', score: 78 },
        { category: 'Lisibilité', score: 74 },
      ],
      recommendations: [
        {
          title: 'Réduire la longueur du CV',
          description:
            "Votre CV fait 3 pages, ce qui est trop long. Condensez l'information pour tenir sur 2 pages maximum.",
          priority: 'high' as const,
          impact: 'Amélioration significative de la lisibilité',
        },
        {
          title: 'Ajouter des projets de transformation',
          description:
            'Détaillez davantage vos projets de transformation digitale avec des exemples concrets et des résultats mesurables.',
          priority: 'medium' as const,
        },
      ],
      keywordAnalysis: {
        present: [
          'Transformation digitale',
          'Conseil',
          'Stratégie',
          'Innovation',
          'Change Management',
        ],
        missing: ['Agile', 'Digital', 'Analytics', 'Cloud Computing', 'API'],
        suggestions: [
          'Digitalisation',
          'Processus',
          'Optimisation',
          'ROI',
          'Gouvernance',
        ],
      },
      structureAnalysis: [
        {
          section: 'En-tête et Contact',
          status: 'present' as const,
          feedback: 'Informations complètes',
        },
        {
          section: 'Résumé Professionnel',
          status: 'needs_improvement' as const,
          feedback: 'Trop générique, manque de spécificité',
        },
        {
          section: 'Expérience Professionnelle',
          status: 'present' as const,
          feedback: 'Bien détaillée mais trop longue',
        },
        {
          section: 'Formation',
          status: 'present' as const,
          feedback: 'Appropriée pour le poste',
        },
        {
          section: 'Compétences',
          status: 'present' as const,
          feedback: 'Liste complète mais désorganisée',
        },
        {
          section: 'Projets',
          status: 'missing' as const,
          feedback:
            'Section projets manquante - essentielle pour un consultant',
        },
        {
          section: 'Certifications',
          status: 'missing' as const,
          feedback: 'Aucune certification mentionnée',
        },
      ],
      industryComparison: [
        {
          metric: 'Longueur optimale',
          yourScore: 60,
          industryAverage: 78,
        },
        {
          metric: 'Densité mots-clés',
          yourScore: 82,
          industryAverage: 75,
        },
        {
          metric: 'Quantification résultats',
          yourScore: 65,
          industryAverage: 70,
        },
        {
          metric: 'Compétences techniques',
          yourScore: 75,
          industryAverage: 80,
        },
        {
          metric: 'Structure professionnelle',
          yourScore: 78,
          industryAverage: 75,
        },
      ],
    },
    {
      id: '3',
      fileName: 'CV_Jean_Rene_Manager.pdf',
      position: 'Manager de Programme IT',
      lastAnalyzed: 'Il y a 3 jours',
      overallScore: 92,
      trend: 'up' as const,
      keywordsFound: 31,
      missingSections: 0,
      optimalLength: true,
      categoryScores: [
        { category: 'Contenu', score: 95 },
        { category: 'Structure', score: 90 },
        { category: 'Mots-clés', score: 94 },
        { category: 'Format', score: 88 },
        { category: 'Lisibilité', score: 92 },
      ],
      recommendations: [
        {
          title: 'Parfait ! Quelques ajustements mineurs',
          description:
            'Votre CV est excellent. Vous pourriez ajouter quelques mots-clés émergents comme "IA" et "Machine Learning" pour rester à la pointe.',
          priority: 'low' as const,
          impact: 'Optimisation marginale mais utile',
        },
      ],
      keywordAnalysis: {
        present: [
          'Programme Management',
          'Portfolio',
          'Governance',
          'Stakeholder Management',
          'Risk Management',
          'Budget Management',
          'Team Leadership',
          'Agile',
          'Scrum',
          'Waterfall',
          'PRINCE2',
          'PMO',
          'KPI',
          'ROI',
          'Change Management',
        ],
        missing: ['Intelligence Artificielle', 'Machine Learning'],
        suggestions: [
          'Digital Innovation',
          'Automation',
          'Process Optimization',
        ],
      },
      structureAnalysis: [
        {
          section: 'En-tête et Contact',
          status: 'present' as const,
          feedback: 'Parfaitement structuré et professionnel',
        },
        {
          section: 'Résumé Professionnel',
          status: 'present' as const,
          feedback: 'Excellent résumé, très impactant',
        },
        {
          section: 'Expérience Professionnelle',
          status: 'present' as const,
          feedback: 'Expériences parfaitement détaillées avec métriques',
        },
        {
          section: 'Formation',
          status: 'present' as const,
          feedback: 'Formation de haut niveau bien mise en valeur',
        },
        {
          section: 'Compétences',
          status: 'present' as const,
          feedback: 'Excellente organisation par catégories',
        },
        {
          section: 'Certifications',
          status: 'present' as const,
          feedback: 'Certifications prestigieuses bien mises en avant',
        },
        {
          section: 'Réalisations',
          status: 'present' as const,
          feedback: 'Section réalisations très convaincante',
        },
      ],
      industryComparison: [
        {
          metric: 'Longueur optimale',
          yourScore: 92,
          industryAverage: 78,
        },
        {
          metric: 'Densité mots-clés',
          yourScore: 94,
          industryAverage: 72,
        },
        {
          metric: 'Quantification résultats',
          yourScore: 96,
          industryAverage: 68,
        },
        {
          metric: 'Compétences techniques',
          yourScore: 88,
          industryAverage: 82,
        },
        {
          metric: 'Structure professionnelle',
          yourScore: 95,
          industryAverage: 75,
        },
      ],
    },
  ],
};
