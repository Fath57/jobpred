export const mockUser = {
  id: '1',
  name: 'Jean René Roustand',
  email: 'jean.rene@example.com',
  avatar:
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  phone: '+33 7 81 65 59 92',
  linkedin: 'https://www.linkedin.com/in/jeanrene',
  location: 'Villejuif',
  experience: 'Senior',
  workMode: 'Hybride',
  isOnboarded: false,
  hasUploadedCV: false,
  hasJobDescription: false,
};

export const mockJobPositions = [
  'Directeur de Projet IT',
  'Manager de Programme IT',
  'Consultant en Transformation Digitale',
  "Responsable de l'Innovation Technologique",
  'Chef de Projet Télécoms',
];

export const sidebarSections = [
  {
    id: 'resume',
    title: 'Resume Analysis',
    icon: 'FileText',
    items: [
      {
        id: 'resume-analysis',
        title: 'Resume Analysis',
        path: '/dashboard/resume/analysis',
      },
      {
        id: 'resume-confection',
        title: 'Resume Confection',
        path: '/dashboard/resume/confection',
      },
    ],
  },
  {
    id: 'letters',
    title: 'Letter',
    icon: 'Mail',
    items: [
      {
        id: 'motivation-letter',
        title: 'Motivation Letter',
        path: '/dashboard/letters/motivation',
      },
      {
        id: 'follow-up-letter',
        title: 'Follow up letter',
        path: '/dashboard/letters/followup',
      },
    ],
  },
  {
    id: 'skills-tests',
    title: 'Skills Tests',
    icon: 'Brain',
    items: [
      {
        id: 'soft-skills-test',
        title: 'Soft Skills',
        path: '/dashboard/tests/soft-skills',
      },
      {
        id: 'hard-skills-test',
        title: 'Hard Skills',
        path: '/dashboard/tests/hard-skills',
      },
      {
        id: 'language-skills-test',
        title: 'Language Skills',
        path: '/dashboard/tests/language',
      },
      {
        id: 'personality-skills-test',
        title: 'Personality Skills',
        path: '/dashboard/tests/personality',
      },
      {
        id: 'hr-interview-prep',
        title: 'HR Interview prep',
        path: '/dashboard/tests/hr-prep',
      },
      {
        id: 'test-feedback',
        title: 'Test feedback',
        path: '/dashboard/tests/feedback',
      },
    ],
  },
  {
    id: 'speech-skills',
    title: 'Speech to Speech Skills',
    icon: 'Mic',
    items: [
      {
        id: 'speech-soft-skills',
        title: 'Soft skills',
        path: '/dashboard/speech/soft-skills',
      },
      {
        id: 'speech-hard-skills',
        title: 'Hard skills',
        path: '/dashboard/speech/hard-skills',
      },
      {
        id: 'speech-language-skills',
        title: 'Language skills',
        path: '/dashboard/speech/language',
      },
      {
        id: 'speech-personality-skills',
        title: 'Personality skills',
        path: '/dashboard/speech/personality',
      },
      {
        id: 'speech-hr-prep',
        title: 'HR Interview Prep',
        path: '/dashboard/speech/hr-prep',
      },
      {
        id: 'speech-feedback',
        title: 'Test feedback',
        path: '/dashboard/speech/feedback',
      },
    ],
  },
  {
    id: 'communication-bundle',
    title: 'Communication Bundle',
    icon: 'MessageSquare',
    items: [
      {
        id: 'suggested-subjects',
        title: 'Suggested subjects',
        path: '/dashboard/communication/subjects',
      },
      {
        id: 'communication-planning',
        title: 'Communication planning',
        path: '/dashboard/communication/planning',
      },
      {
        id: 'linkedin-connection',
        title: 'LinkedIn connection for improvement suggestions',
        path: '/dashboard/communication/linkedin',
      },
    ],
  },
  {
    id: 'communication-production',
    title: 'Communication Production Bundle',
    icon: 'Megaphone',
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `comm-${i + 1}`,
      title: `Comm ${i + 1}`,
      path: `/dashboard/production/comm-${i + 1}`
    }))
  },
   {
    id: 'user-managment',
    title: 'Privilèges',
    icon: 'Megaphone',
       items: [
           { id: 'permission-manage', title: 'Gestion de rôles', path: '/roles' },
           { id: 'user-view', title: 'Gestion des utilisateurs', path: '/users' },

       ]
  },

];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah K.',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    rating: 5,
    text: "J'avais postulé pendant des mois sans recevoir une seule réponse—mon CV semblait invisible. Mais dès que j'ai commencé à utiliser JobPrep, tout a changé. Soudainement, je recevais des réponses pour presque tous les emplois auxquels je postulais ! Ça a complètement transformé ma recherche d'emploi.",
    role: 'Marketing Manager',
  },
  {
    id: 2,
    name: 'Marc D.',
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    rating: 5,
    text: "Les outils d'IA de JobPrep m'ont aidé à décrocher 3 entretiens en une semaine. La personnalisation automatique des lettres de motivation fait toute la différence !",
    role: 'Développeur Full Stack',
  },
  {
    id: 3,
    name: 'Emma L.',
    avatar:
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    rating: 5,
    text: "Grâce à JobPrep, j'ai amélioré mes compétences d'entretien et décroché le poste de mes rêves. L'entraînement Speech-to-Speech est révolutionnaire !",
    role: 'Chef de Projet',
  },
];

export const stats = [
  { label: 'Candidats accompagnés', value: '10,000+', icon: 'Users' },
  { label: 'Taux de réussite', value: '94%', icon: 'TrendingUp' },
  { label: 'Entretiens décrochés', value: '25,000+', icon: 'Calendar' },
  { label: 'Entreprises partenaires', value: '500+', icon: 'Building' },
];

export const features = [
  {
    icon: 'FileText',
    title: 'Analyse CV IA',
    description:
      'Optimisation automatique de votre CV avec suggestions personnalisées',
  },
  {
    icon: 'Mail',
    title: 'Lettres Personnalisées',
    description: 'Génération de lettres de motivation adaptées à chaque offre',
  },
  {
    icon: 'Brain',
    title: 'Tests de Compétences',
    description: 'Évaluation complète de vos soft et hard skills',
  },
  {
    icon: 'Mic',
    title: 'Entraînement Vocal',
    description: "Simulation d'entretiens avec feedback IA en temps réel",
  },
  {
    icon: 'MessageSquare',
    title: 'Stratégie Communication',
    description: 'Plan de communication LinkedIn et networking',
  },
  {
    icon: 'Target',
    title: 'Ciblage Précis',
    description: 'Matching intelligent avec les opportunités',
  },
];
