import { create } from 'zustand';
import { api, API_ENDPOINTS } from '../api';
import type { ApiError,
    // Onboarding types importés depuis ../api (barrel)
  StartOnboardingDto,
  StartOnboardingResponse,
  Step1PersonalInfoDto,
  Step1PersonalInfoRequestDto,
  GenerateWeKnowYouDto,
  DeepResearchResponseDto,
  Step2WeKnowYouDto,
  Step3ProfessionalInfoDto,
  Step4CvUploadDto,
  OnboardingStepDto,
  Step5JobDescriptionDto,
  Step5JobDescriptionRequestDto,
  OnboardingProgress,
  OnboardingSession,
 } from '../api';


type Json = Record<string, any>;

// Helper pour supporter {data:{...}} ET {data:{data:{...}}}
const unwrap = <T = any>(res: any): T => (res?.data?.data ?? res?.data ?? res);

/** ===== Zustand store ===== */

interface OnboardingState {
  // état global
  currentStep: number;
  isLoading: boolean;
  error: string | null;

  // gestion des sessions
  userId: string | null;
  sessionId: string | null;
  session: OnboardingSession | null;

  // cache des données par étape
  step1?: Step1PersonalInfoRequestDto | null;
  step2Generated?: DeepResearchResponseDto | null;
  step2?: Step2WeKnowYouDto | null;
  step3?: Step3ProfessionalInfoDto | null;
  step4Upload?: Step4CvUploadDto | null;
  step4?: OnboardingStepDto | null;
  step5?: Step5JobDescriptionDto | null;

  // infos serveur
  progress: OnboardingProgress | null;
  content: Json | null;
  testOk?: boolean;

  // actions
  startOnboarding: (payload: StartOnboardingDto) => Promise<StartOnboardingResponse>;
  submitStep1: (payload: Step1PersonalInfoDto) => Promise<void>;
  generateStep2: (payload: GenerateWeKnowYouDto) => Promise<DeepResearchResponseDto>;
  submitStep2: (payload: Step2WeKnowYouDto) => Promise<void>;
  submitStep3: (payload: Step3ProfessionalInfoDto) => Promise<void>;
  uploadStep4: (file: File, extra?: Record<string, any>) => Promise<Step4CvUploadDto>;
  submitStep4: (payload: OnboardingStepDto) => Promise<void>;
  uploadAndSubmitStep4: (file: File) => Promise<Step4CvUploadDto>;
  submitStep5: (payload: Step5JobDescriptionRequestDto) => Promise<void>;
  completeOnboarding: (payload?: Record<string, any>) => Promise<void>;

  fetchProgress: (userId: string) => Promise<OnboardingProgress | undefined>;
  fetchContent: () => Promise<Json | undefined>;
  testEndpoint: () => Promise<boolean>;

  // gestion des sessions
  setSession: (userId: string, sessionId: string) => void;
  clearSession: () => void;
  resumeOnboarding: (userId: string) => Promise<void>;

  // utils
  setStep: (n: number) => void;
  clearError: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: 0,
  isLoading: false,
  error: null,

  // gestion des sessions
  userId: null,
  sessionId: null,
  session: null,

  progress: null,
  content: null,

  setStep: (n) => set({ currentStep: n }),
  clearError: () => set({ error: null }),
  reset: () =>
    set({
      currentStep: 0,
      isLoading: false,
      error: null,
      userId: null,
      sessionId: null,
      session: null,
      step1: null,
      step2Generated: null,
      step2: null,
      step3: null,
      step4Upload: null,
      step4: null,
      step5: null,
      progress: null,
      content: null,
      testOk: undefined,
    }),

  // POST /onboarding/start
  startOnboarding: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<StartOnboardingResponse>(API_ENDPOINTS.ONBOARDING.START, payload);
      const data = unwrap<StartOnboardingResponse>(response);
      
      set({ 
        userId: data.userId,
        sessionId: data.sessionId,
        currentStep: 1, 
        isLoading: false 
      });
      
      return data;
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/step/1
  submitStep1: async (payload) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    
    set({ isLoading: true, error: null });
    try {
      const requestPayload = { ...payload, userId };
      await api.post(API_ENDPOINTS.ONBOARDING.STEP1, requestPayload);
      set({ step1: requestPayload, currentStep: 2, isLoading: false });
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/step/2/generate
  generateStep2: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post<DeepResearchResponseDto>(
        API_ENDPOINTS.ONBOARDING.STEP2_GENERATE,
        payload
      );
      const data = unwrap<DeepResearchResponseDto>(res);
      set({ step2Generated: data, isLoading: false });
      return data;
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/step/2
  submitStep2: async (payload) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    
    set({ isLoading: true, error: null });
    try {
      const requestPayload = { ...payload, userId };
      await api.post(API_ENDPOINTS.ONBOARDING.STEP2, requestPayload);
      set({ step2: requestPayload, currentStep: 3, isLoading: false });
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/step/3
  submitStep3: async (payload) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    
    set({ isLoading: true, error: null });
    try {
      const requestPayload = { ...payload, userId };
      await api.post(API_ENDPOINTS.ONBOARDING.STEP3, requestPayload);
      set({ step3: requestPayload, currentStep: 4, isLoading: false });
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/step/4/upload (multipart)
  uploadStep4: async (file, extra) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    
    console.log('🔄 Starting CV upload for user:', userId);
    console.log('📁 File details:', { name: file.name, size: file.size, type: file.type });
    
    set({ isLoading: true, error: null });
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('userId', userId);
      if (extra) {
        Object.entries(extra).forEach(([k, v]) => {
          fd.append(k, typeof v === 'string' ? v : JSON.stringify(v));
        });
      }
      
      console.log('📤 Sending upload request to:', API_ENDPOINTS.ONBOARDING.STEP4_UPLOAD);
      const res = await api.post<Step4CvUploadDto>(API_ENDPOINTS.ONBOARDING.STEP4_UPLOAD, fd, {
        headers: {
          // ne pas fixer 'Content-Type' : axios ajoute le boundary pour FormData
        },
      });
      
      const data = unwrap<Step4CvUploadDto>(res);
      console.log('✅ Upload successful, received data:', data);
      
      set({ step4Upload: data, isLoading: false });
      return data;
    } catch (error) {
      console.error('❌ Upload failed:', error);
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/step/4
  submitStep4: async (payload) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    
    console.log('🔄 submitStep4 called with payload:', payload);
    set({ isLoading: true, error: null });
    try {
      const requestPayload = { ...payload, userId };
      console.log('📤 Sending step 4 to backend:', requestPayload);
      await api.post(API_ENDPOINTS.ONBOARDING.STEP4, requestPayload);
      console.log('✅ Step 4 submitted successfully to backend');
      set({ step4: requestPayload, currentStep: 5, isLoading: false });
    } catch (error) {
      console.error('❌ Error in submitStep4:', error);
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // Méthode combinée pour l'étape 4 : upload + soumission en une fois
  uploadAndSubmitStep4: async (file) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    
    console.log('🔄 Starting combined CV upload and submit for user:', userId);
    set({ isLoading: true, error: null });
    
    try {
      // 1. Upload du fichier
      const uploadData = await get().uploadStep4(file);
      
      // 2. Soumission de l'étape avec les données d'upload
      const payload = {
        step: 4,
        data: {
          cvFilePath: uploadData.cvFilePath,
          cvFileName: uploadData.cvFileName,
          cvFileSize: uploadData.cvFileSize || 0,
        },
        userId
      };
      
      console.log('📤 Submitting step 4 with payload:', payload);
      await api.post(API_ENDPOINTS.ONBOARDING.STEP4, payload);
      console.log('✅ Step 4 completed successfully');
      
      set({ step4: payload, currentStep: 5, isLoading: false });
      return uploadData;
    } catch (error) {
      console.error('❌ Error in uploadAndSubmitStep4:', error);
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/step/5/{userId}
  submitStep5: async (payload) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    
    set({ isLoading: true, error: null });
    try {
      const body: Step5JobDescriptionDto = { userId, ...payload };
      await api.post(API_ENDPOINTS.ONBOARDING.STEP5(userId), body);
      set({ step5: body, isLoading: false });
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // POST /onboarding/complete/{userId}
  completeOnboarding: async (payload) => {
    const { userId } = get();
    if (!userId) throw new Error('No active session');
    console.log('📤 Completing onboarding for user:', userId);
    console.log('📤 Payload received (will be ignored by backend):', payload);
    set({ isLoading: true, error: null });
    try {
      // L'endpoint backend ne prend pas de payload, seulement le userId dans l'URL
      await api.post(API_ENDPOINTS.ONBOARDING.COMPLETE(userId));
      console.log('✅ Onboarding completed successfully');
      set({
        currentStep: 6,
        progress: { userId, currentStep: 6, completed: true },
        isLoading: false,
      });
    } catch (error) {
      console.error('❌ Error completing onboarding:', error);
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },

  // GET /onboarding/progress/{userId}
  fetchProgress: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get(API_ENDPOINTS.ONBOARDING.PROGRESS(userId));
      const p = unwrap<OnboardingProgress>(res);
      set({
        progress: p,
        currentStep: p?.currentStep ?? get().currentStep,
        isLoading: false,
      });
      return p;
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      return undefined;
    }
  },

  // GET /onboarding/content - Pas trop important
  fetchContent: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get(API_ENDPOINTS.ONBOARDING.CONTENT);
      const c = unwrap<Json>(res);
      set({ content: c, isLoading: false });
      return c;
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      return undefined;
    }
  },

  // GET /onboarding/test - Pas trop important
  testEndpoint: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.get(API_ENDPOINTS.ONBOARDING.TEST);
      set({ testOk: true, isLoading: false });
      return true;
    } catch (error) {
      const e = error as ApiError;
      set({ testOk: false, isLoading: false, error: e.message });
      return false;
    }
  },

  // === GESTION DES SESSIONS ===
  
  // Définir une session active
  setSession: (userId, sessionId) => {
    set({ userId, sessionId });
  },

  // Nettoyer la session
  clearSession: () => {
    set({ userId: null, sessionId: null, session: null });
  },

  // Reprendre un onboarding existant
  resumeOnboarding: async (userId) => {
    const currentState = get();
    
    // Éviter les appels répétés si déjà en cours ou si l'utilisateur est déjà défini
    if (currentState.isLoading || currentState.userId === userId) {
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      const progress = await get().fetchProgress(userId);
      if (progress) {
        set({ 
          userId, 
          currentStep: progress.currentStep || 1,
          progress,
          isLoading: false 
        });
      } else {
        throw new Error('No onboarding session found');
      }
    } catch (error) {
      const e = error as ApiError;
      set({ isLoading: false, error: e.message });
      throw error;
    }
  },
}));

/** Sélecteurs (même style que les autres stores) */
export const useOnboarding = () => {
  const s = useOnboardingStore();
  return {
    currentStep: s.currentStep,
    isLoading: s.isLoading,
    error: s.error,
    progress: s.progress,
    content: s.content,
    testOk: s.testOk,

    // gestion des sessions
    userId: s.userId,
    sessionId: s.sessionId,
    session: s.session,

    step1: s.step1,
    step2Generated: s.step2Generated,
    step2: s.step2,
    step3: s.step3,
    step4Upload: s.step4Upload,
    step4: s.step4,
    step5: s.step5,
  };
};

export const useOnboardingActions = () => {
  const s = useOnboardingStore();
  return {
    startOnboarding: s.startOnboarding,
    submitStep1: s.submitStep1,
    generateStep2: s.generateStep2,
    submitStep2: s.submitStep2,
    submitStep3: s.submitStep3,
    uploadStep4: s.uploadStep4,
    submitStep4: s.submitStep4,
    uploadAndSubmitStep4: s.uploadAndSubmitStep4,
    submitStep5: s.submitStep5,
    completeOnboarding: s.completeOnboarding,
    fetchProgress: s.fetchProgress,
    fetchContent: s.fetchContent,
    testEndpoint: s.testEndpoint,
    
    // gestion des sessions
    setSession: s.setSession,
    clearSession: s.clearSession,
    resumeOnboarding: s.resumeOnboarding,
    
    setStep: s.setStep,
    clearError: s.clearError,
    reset: s.reset,
  };
};
