import { create } from 'zustand';
import { api, API_ENDPOINTS } from '../api';
import type {
  User,
  MotivationLetter,
  FollowUpLetter,
  Resume,
  ResumeAnalysis,
  Test,
  SpeechSession,
  PaginationParams,
  PaginatedResponse,
  ApiError,
} from '../api';

interface UserState {
  // Données utilisateur
  profile: User | null;
  isLoading: boolean;
  error: string | null;

  // Lettres de motivation
  motivationLetters: MotivationLetter[];
  motivationLettersLoading: boolean;
  motivationLettersError: string | null;

  // Lettres de relance
  followUpLetters: FollowUpLetter[];
  followUpLettersLoading: boolean;
  followUpLettersError: string | null;

  // CV
  resumes: Resume[];
  resumesLoading: boolean;
  resumesError: string | null;

  // Tests
  tests: Test[];
  testsLoading: boolean;
  testsError: string | null;

  // Sessions vocales
  speechSessions: SpeechSession[];
  speechSessionsLoading: boolean;
  speechSessionsError: string | null;

  // Actions pour le profil
  fetchProfile: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;

  // Actions pour les lettres de motivation
  fetchMotivationLetters: (params?: PaginationParams) => Promise<void>;
  createMotivationLetter: (
    letterData: Partial<MotivationLetter>
  ) => Promise<void>;
  updateMotivationLetter: (
    id: string,
    letterData: Partial<MotivationLetter>
  ) => Promise<void>;
  deleteMotivationLetter: (id: string) => Promise<void>;

  // Actions pour les lettres de relance
  fetchFollowUpLetters: (params?: PaginationParams) => Promise<void>;
  createFollowUpLetter: (letterData: Partial<FollowUpLetter>) => Promise<void>;
  updateFollowUpLetter: (
    id: string,
    letterData: Partial<FollowUpLetter>
  ) => Promise<void>;
  deleteFollowUpLetter: (id: string) => Promise<void>;

  // Actions pour les CV
  fetchResumes: (params?: PaginationParams) => Promise<void>;
  createResume: (resumeData: Partial<Resume>) => Promise<void>;
  updateResume: (id: string, resumeData: Partial<Resume>) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  analyzeResume: (id: string) => Promise<void>;

  // Actions pour les tests
  fetchTests: (params?: PaginationParams) => Promise<void>;
  createTest: (testData: Partial<Test>) => Promise<void>;
  updateTest: (id: string, testData: Partial<Test>) => Promise<void>;
  deleteTest: (id: string) => Promise<void>;
  submitTest: (id: string, answers: any) => Promise<void>;

  // Actions pour les sessions vocales
  fetchSpeechSessions: (params?: PaginationParams) => Promise<void>;
  createSpeechSession: (sessionData: Partial<SpeechSession>) => Promise<void>;
  updateSpeechSession: (
    id: string,
    sessionData: Partial<SpeechSession>
  ) => Promise<void>;
  deleteSpeechSession: (id: string) => Promise<void>;

  // Actions utilitaires
  clearErrors: () => void;
  clearData: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  // État initial
  profile: null,
  isLoading: false,
  error: null,

  motivationLetters: [],
  motivationLettersLoading: false,
  motivationLettersError: null,

  followUpLetters: [],
  followUpLettersLoading: false,
  followUpLettersError: null,

  resumes: [],
  resumesLoading: false,
  resumesError: null,

  tests: [],
  testsLoading: false,
  testsError: null,

  speechSessions: [],
  speechSessionsLoading: false,
  speechSessionsError: null,

  // Fetch profile
  fetchProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get<User>(API_ENDPOINTS.AUTH.PROFILE);
      set({
        profile: (response.data as any)?.data ?? response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        isLoading: false,
        error: apiError.message,
      });
      throw error;
    }
  },

  // Update profile
  updateProfile: async (userData: Partial<User>) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.put<User>(
        API_ENDPOINTS.AUTH.PROFILE,
        userData
      );
      set({
        profile: response.data.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        isLoading: false,
        error: apiError.message,
      });
      throw error;
    }
  },

  // Motivation Letters
  fetchMotivationLetters: async (params?: PaginationParams) => {
    set({ motivationLettersLoading: true, motivationLettersError: null });

    try {
      const response = await api.get<PaginatedResponse<MotivationLetter>>(
        API_ENDPOINTS.MOTIVATION_LETTERS.LIST,
        { params }
      );
      set({
        motivationLetters: response.data.data.data,
        motivationLettersLoading: false,
        motivationLettersError: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        motivationLettersLoading: false,
        motivationLettersError: apiError.message,
      });
      throw error;
    }
  },

  createMotivationLetter: async (letterData: Partial<MotivationLetter>) => {
    try {
      const response = await api.post<MotivationLetter>(
        API_ENDPOINTS.MOTIVATION_LETTERS.CREATE,
        letterData
      );

      set(state => ({
        motivationLetters: [response.data.data, ...state.motivationLetters],
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ motivationLettersError: apiError.message });
      throw error;
    }
  },

  updateMotivationLetter: async (
    id: string,
    letterData: Partial<MotivationLetter>
  ) => {
    try {
      const response = await api.put<MotivationLetter>(
        API_ENDPOINTS.MOTIVATION_LETTERS.UPDATE(id),
        letterData
      );

      set(state => ({
        motivationLetters: state.motivationLetters.map(letter =>
          letter.id === id ? response.data.data : letter
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ motivationLettersError: apiError.message });
      throw error;
    }
  },

  deleteMotivationLetter: async (id: string) => {
    try {
      await api.delete(API_ENDPOINTS.MOTIVATION_LETTERS.DELETE(id));

      set(state => ({
        motivationLetters: state.motivationLetters.filter(
          letter => letter.id !== id
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ motivationLettersError: apiError.message });
      throw error;
    }
  },

  // Follow Up Letters (structure similaire)
  fetchFollowUpLetters: async (params?: PaginationParams) => {
    set({ followUpLettersLoading: true, followUpLettersError: null });

    try {
      const response = await api.get<PaginatedResponse<FollowUpLetter>>(
        API_ENDPOINTS.FOLLOW_UP_LETTERS.LIST,
        { params }
      );
      set({
        followUpLetters: response.data.data.data,
        followUpLettersLoading: false,
        followUpLettersError: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        followUpLettersLoading: false,
        followUpLettersError: apiError.message,
      });
      throw error;
    }
  },

  createFollowUpLetter: async (letterData: Partial<FollowUpLetter>) => {
    try {
      const response = await api.post<FollowUpLetter>(
        API_ENDPOINTS.FOLLOW_UP_LETTERS.CREATE,
        letterData
      );

      set(state => ({
        followUpLetters: [response.data.data, ...state.followUpLetters],
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ followUpLettersError: apiError.message });
      throw error;
    }
  },

  updateFollowUpLetter: async (
    id: string,
    letterData: Partial<FollowUpLetter>
  ) => {
    try {
      const response = await api.put<FollowUpLetter>(
        API_ENDPOINTS.FOLLOW_UP_LETTERS.UPDATE(id),
        letterData
      );

      set(state => ({
        followUpLetters: state.followUpLetters.map(letter =>
          letter.id === id ? response.data.data : letter
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ followUpLettersError: apiError.message });
      throw error;
    }
  },

  deleteFollowUpLetter: async (id: string) => {
    try {
      await api.delete(API_ENDPOINTS.FOLLOW_UP_LETTERS.DELETE(id));

      set(state => ({
        followUpLetters: state.followUpLetters.filter(
          letter => letter.id !== id
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ followUpLettersError: apiError.message });
      throw error;
    }
  },

  // Resumes (structure similaire)
  fetchResumes: async (params?: PaginationParams) => {
    set({ resumesLoading: true, resumesError: null });

    try {
      const response = await api.get<PaginatedResponse<Resume>>(
        API_ENDPOINTS.RESUMES.LIST,
        { params }
      );
      set({
        resumes: response.data.data.data,
        resumesLoading: false,
        resumesError: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        resumesLoading: false,
        resumesError: apiError.message,
      });
      throw error;
    }
  },

  createResume: async (resumeData: Partial<Resume>) => {
    try {
      const response = await api.post<Resume>(
        API_ENDPOINTS.RESUMES.CREATE,
        resumeData
      );

      set(state => ({
        resumes: [response.data.data, ...state.resumes],
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ resumesError: apiError.message });
      throw error;
    }
  },

  updateResume: async (id: string, resumeData: Partial<Resume>) => {
    try {
      const response = await api.put<Resume>(
        API_ENDPOINTS.RESUMES.UPDATE(id),
        resumeData
      );

      set(state => ({
        resumes: state.resumes.map(resume =>
          resume.id === id ? response.data.data : resume
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ resumesError: apiError.message });
      throw error;
    }
  },

  deleteResume: async (id: string) => {
    try {
      await api.delete(API_ENDPOINTS.RESUMES.DELETE(id));

      set(state => ({
        resumes: state.resumes.filter(resume => resume.id !== id),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ resumesError: apiError.message });
      throw error;
    }
  },

  analyzeResume: async (id: string) => {
    try {
      const response = await api.post<ResumeAnalysis>(
        API_ENDPOINTS.RESUMES.ANALYZE(id)
      );

      // Mettre à jour le CV avec l'analyse
      set(state => ({
        resumes: state.resumes.map(resume =>
          resume.id === id
            ? { ...resume, analysis: response.data.data }
            : resume
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ resumesError: apiError.message });
      throw error;
    }
  },

  // Tests, Speech Sessions (structures similaires - abrégées pour la lisibilité)
  fetchTests: async (params?: PaginationParams) => {
    set({ testsLoading: true, testsError: null });

    try {
      const response = await api.get<PaginatedResponse<Test>>(
        API_ENDPOINTS.TESTS.LIST,
        { params }
      );
      set({
        tests: response.data.data.data,
        testsLoading: false,
        testsError: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        testsLoading: false,
        testsError: apiError.message,
      });
      throw error;
    }
  },

  createTest: async (testData: Partial<Test>) => {
    try {
      const response = await api.post<Test>(
        API_ENDPOINTS.TESTS.CREATE,
        testData
      );

      set(state => ({
        tests: [response.data.data, ...state.tests],
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ testsError: apiError.message });
      throw error;
    }
  },

  updateTest: async (id: string, testData: Partial<Test>) => {
    try {
      const response = await api.put<Test>(
        API_ENDPOINTS.TESTS.UPDATE(id),
        testData
      );

      set(state => ({
        tests: state.tests.map(test =>
          test.id === id ? response.data.data : test
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ testsError: apiError.message });
      throw error;
    }
  },

  deleteTest: async (id: string) => {
    try {
      await api.delete(API_ENDPOINTS.TESTS.DELETE(id));

      set(state => ({
        tests: state.tests.filter(test => test.id !== id),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ testsError: apiError.message });
      throw error;
    }
  },

  submitTest: async (id: string, answers: any) => {
    try {
      const response = await api.post<Test>(API_ENDPOINTS.TESTS.SUBMIT(id), {
        answers,
      });

      set(state => ({
        tests: state.tests.map(test =>
          test.id === id ? response.data.data : test
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ testsError: apiError.message });
      throw error;
    }
  },

  // Speech Sessions (structure similaire)
  fetchSpeechSessions: async (params?: PaginationParams) => {
    set({ speechSessionsLoading: true, speechSessionsError: null });

    try {
      const response = await api.get<PaginatedResponse<SpeechSession>>(
        API_ENDPOINTS.SPEECH_SESSIONS.LIST,
        { params }
      );
      set({
        speechSessions: response.data.data.data,
        speechSessionsLoading: false,
        speechSessionsError: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        speechSessionsLoading: false,
        speechSessionsError: apiError.message,
      });
      throw error;
    }
  },

  createSpeechSession: async (sessionData: Partial<SpeechSession>) => {
    try {
      const response = await api.post<SpeechSession>(
        API_ENDPOINTS.SPEECH_SESSIONS.CREATE,
        sessionData
      );

      set(state => ({
        speechSessions: [response.data.data, ...state.speechSessions],
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ speechSessionsError: apiError.message });
      throw error;
    }
  },

  updateSpeechSession: async (
    id: string,
    sessionData: Partial<SpeechSession>
  ) => {
    try {
      const response = await api.put<SpeechSession>(
        API_ENDPOINTS.SPEECH_SESSIONS.UPDATE(id),
        sessionData
      );

      set(state => ({
        speechSessions: state.speechSessions.map(session =>
          session.id === id ? response.data.data : session
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ speechSessionsError: apiError.message });
      throw error;
    }
  },

  deleteSpeechSession: async (id: string) => {
    try {
      await api.delete(API_ENDPOINTS.SPEECH_SESSIONS.DELETE(id));

      set(state => ({
        speechSessions: state.speechSessions.filter(
          session => session.id !== id
        ),
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({ speechSessionsError: apiError.message });
      throw error;
    }
  },

  // Clear errors
  clearErrors: () => {
    set({
      error: null,
      motivationLettersError: null,
      followUpLettersError: null,
      resumesError: null,
      testsError: null,
      speechSessionsError: null,
    });
  },

  // Clear data
  clearData: () => {
    set({
      profile: null,
      motivationLetters: [],
      followUpLetters: [],
      resumes: [],
      tests: [],
      speechSessions: [],
    });
  },
}));

// Sélecteurs utiles
export const useUserProfile = () => {
  const store = useUserStore();
  return {
    profile: store.profile,
    isLoading: store.isLoading,
    error: store.error,
    fetchProfile: store.fetchProfile,
    updateProfile: store.updateProfile,
  };
};

export const useMotivationLetters = () => {
  const store = useUserStore();
  return {
    letters: store.motivationLetters,
    isLoading: store.motivationLettersLoading,
    error: store.motivationLettersError,
    fetchLetters: store.fetchMotivationLetters,
    createLetter: store.createMotivationLetter,
    updateLetter: store.updateMotivationLetter,
    deleteLetter: store.deleteMotivationLetter,
  };
};

export const useFollowUpLetters = () => {
  const store = useUserStore();
  return {
    letters: store.followUpLetters,
    isLoading: store.followUpLettersLoading,
    error: store.followUpLettersError,
    fetchLetters: store.fetchFollowUpLetters,
    createLetter: store.createFollowUpLetter,
    updateLetter: store.updateFollowUpLetter,
    deleteLetter: store.deleteFollowUpLetter,
  };
};

export const useResumes = () => {
  const store = useUserStore();
  return {
    resumes: store.resumes,
    isLoading: store.resumesLoading,
    error: store.resumesError,
    fetchResumes: store.fetchResumes,
    createResume: store.createResume,
    updateResume: store.updateResume,
    deleteResume: store.deleteResume,
    analyzeResume: store.analyzeResume,
  };
};

export const useTests = () => {
  const store = useUserStore();
  return {
    tests: store.tests,
    isLoading: store.testsLoading,
    error: store.testsError,
    fetchTests: store.fetchTests,
    createTest: store.createTest,
    updateTest: store.updateTest,
    deleteTest: store.deleteTest,
    submitTest: store.submitTest,
  };
};

export const useSpeechSessions = () => {
  const store = useUserStore();
  return {
    sessions: store.speechSessions,
    isLoading: store.speechSessionsLoading,
    error: store.speechSessionsError,
    fetchSessions: store.fetchSpeechSessions,
    createSession: store.createSpeechSession,
    updateSession: store.updateSpeechSession,
    deleteSession: store.deleteSpeechSession,
  };
};
