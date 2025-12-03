// Configuration des endpoints API
export const API_ENDPOINTS = {
  // Authentification
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Utilisateurs
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    ANALYTICS: '/users/analytics',
  },

  // Lettres de motivation
  MOTIVATION_LETTERS: {
    LIST: '/motivation-letters',
    CREATE: '/motivation-letters',
    GET: (id: string) => `/motivation-letters/${id}`,
    UPDATE: (id: string) => `/motivation-letters/${id}`,
    DELETE: (id: string) => `/motivation-letters/${id}`,
    GENERATE: '/motivation-letters/generate',
    ANALYTICS: '/motivation-letters/analytics',
  },

  // Lettres de relance
  FOLLOW_UP_LETTERS: {
    LIST: '/follow-up-letters',
    CREATE: '/follow-up-letters',
    GET: (id: string) => `/follow-up-letters/${id}`,
    UPDATE: (id: string) => `/follow-up-letters/${id}`,
    DELETE: (id: string) => `/follow-up-letters/${id}`,
    GENERATE: '/follow-up-letters/generate',
    ANALYTICS: '/follow-up-letters/analytics',
  },

  // CV
  RESUMES: {
    LIST: '/resumes',
    CREATE: '/resumes',
    GET: (id: string) => `/resumes/${id}`,
    UPDATE: (id: string) => `/resumes/${id}`,
    DELETE: (id: string) => `/resumes/${id}`,
    UPLOAD: '/resumes/upload',
    ANALYZE: (id: string) => `/resumes/${id}/analyze`,
    GENERATE: '/resumes/generate',
  },

  // Analyses de CV
  RESUME_ANALYSES: {
    LIST: '/resume-analyses',
    GET: (id: string) => `/resume-analyses/${id}`,
    UPDATE: (id: string) => `/resume-analyses/${id}`,
    DELETE: (id: string) => `/resume-analyses/${id}`,
  },

  // Tests
  TESTS: {
    LIST: '/tests',
    CREATE: '/tests',
    GET: (id: string) => `/tests/${id}`,
    UPDATE: (id: string) => `/tests/${id}`,
    DELETE: (id: string) => `/tests/${id}`,
    START: (type: string) => `/tests/start/${type}`,
    SUBMIT: (id: string) => `/tests/${id}/submit`,
    RESULTS: (id: string) => `/tests/${id}/results`,
    ANALYTICS: '/tests/analytics',
  },

  // Sessions vocales
  SPEECH_SESSIONS: {
    LIST: '/speech-sessions',
    CREATE: '/speech-sessions',
    GET: (id: string) => `/speech-sessions/${id}`,
    UPDATE: (id: string) => `/speech-sessions/${id}`,
    DELETE: (id: string) => `/speech-sessions/${id}`,
    START: (type: string) => `/speech-sessions/start/${type}`,
    UPLOAD_AUDIO: (id: string) => `/speech-sessions/${id}/upload-audio`,
    GET_FEEDBACK: (id: string) => `/speech-sessions/${id}/feedback`,
    ANALYTICS: '/speech-sessions/analytics',
  },

  // Onboarding
  ONBOARDING: {
    UPDATE: '/onboarding/update',
    UPLOAD_CV: '/onboarding/upload-cv',
    GENERATE_PROFILE: '/onboarding/generate-profile',
    PROGRESS: '/onboarding/progress',
    CONTENT: '/onboarding/content',
    // Routes spécifiques par étape
    STEP_1_PERSONAL_INFO: '/onboarding/step/1/personal-info',
    STEP_2_PROFESSIONAL_INFO: '/onboarding/step/2/professional-info',
    STEP_4_JOB_DESCRIPTION: '/onboarding/step/4/job-description',
    // Gestion des applications multiples
    APPLICATIONS: {
      LIST: '/onboarding/applications',
      CREATE: '/onboarding/applications/new',
      GET: (id: string) => `/onboarding/applications/${id}`,
      ACTIVATE: (id: string) => `/onboarding/applications/${id}/activate`,
      UPLOAD_CV: (id: string) => `/onboarding/applications/${id}/upload-cv`,
      UPDATE_JOB_DESCRIPTION: (id: string) => `/onboarding/applications/${id}/job-description`,
    },
  },

  // Analytics et rapports
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    USER_PROGRESS: '/analytics/user-progress',
    PERFORMANCE: '/analytics/performance',
    EXPORT: '/analytics/export',
  },

  // Pricing
  PRICING: {
    // Options
    OPTIONS: {
      LIST: '/pricing/options',
      CREATE: '/pricing/options',
      GET: (id: string) => `/pricing/options/${id}`,
      UPDATE: (id: string) => `/pricing/options/${id}`,
      DELETE: (id: string) => `/pricing/options/${id}`,
    },
    // Packs
    PACKS: {
      LIST: '/pricing/packs',
      CREATE: '/pricing/packs',
      GET: (id: string) => `/pricing/packs/${id}`,
      UPDATE: (id: string) => `/pricing/packs/${id}`,
      DELETE: (id: string) => `/pricing/packs/${id}`,
      // Gestion des options dans les packs
      GET_OPTIONS: (id: string) => `/pricing/packs/${id}/options`,
      ADD_OPTION: (packId: string, optionId: string) => `/pricing/packs/${packId}/options/${optionId}`,
      REMOVE_OPTION: (packId: string, optionId: string) => `/pricing/packs/${packId}/options/${optionId}`,
    },
  },

  // Administration
  ADMIN: {
    USERS: '/admin/users',
    ANALYTICS: '/admin/analytics',
    BLOG: '/admin/blog',
    PRICING: '/admin/pricing',
    SETTINGS: '/admin/settings',
  },
} as const;

// Types pour les paramètres de requête
export type EndpointParams = {
  [K in keyof typeof API_ENDPOINTS]: {
    [P in keyof (typeof API_ENDPOINTS)[K]]: (typeof API_ENDPOINTS)[K][P] extends (
      param: any
    ) => string
      ? Parameters<(typeof API_ENDPOINTS)[K][P]>[0]
      : never;
  };
};
