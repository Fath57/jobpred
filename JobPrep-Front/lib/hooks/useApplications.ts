'use client';

import { useState, useCallback, useEffect } from 'react';
import { api, API_ENDPOINTS } from '@/lib/api';
import { useErrorHandler } from './useErrorHandler';
import type {
  CandidateJobPreference,
  CreateApplicationDto,
  CreateApplicationResponse,
  ListApplicationsResponse,
  UploadCvForApplicationResponse,
  UpdateApplicationJobDescriptionDto,
  UpdateApplicationJobDescriptionResponse,
  ActivateApplicationResponse,
} from '@/lib/api/types';

export function useApplications() {
  const [applications, setApplications] = useState<CandidateJobPreference[]>([]);
  const [activeApplication, setActiveApplication] = useState<CandidateJobPreference | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { errorState, handleError, clearError } = useErrorHandler();

  /**
   * Charger toutes les candidatures de l'utilisateur
   */
  const loadApplications = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await api.get<ListApplicationsResponse>(
        API_ENDPOINTS.ONBOARDING.APPLICATIONS.LIST
      );

      setApplications(response.data.applications);
      setActiveApplication(response.data.activeApplication || null);

      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  }, [handleError]);

  /**
   * Créer une nouvelle candidature
   */
  const createApplication = useCallback(async (data: CreateApplicationDto) => {
    setIsLoading(true);
    clearError();
    try {
      const response = await api.post<CreateApplicationResponse>(
        API_ENDPOINTS.ONBOARDING.APPLICATIONS.CREATE,
        data
      );

      // Recharger la liste
      await loadApplications();

      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError, loadApplications]);

  /**
   * Upload un CV pour une candidature spécifique
   */
  const uploadCvForApplication = useCallback(async (
    jobPreferenceId: string,
    file: File
  ) => {
    setIsLoading(true);
    clearError();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.upload<UploadCvForApplicationResponse>(
        API_ENDPOINTS.ONBOARDING.APPLICATIONS.UPLOAD_CV(jobPreferenceId),
        formData
      );

      // Recharger la liste
      await loadApplications();

      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError, loadApplications]);

  /**
   * Mettre à jour la description du poste pour une candidature
   */
  const updateJobDescription = useCallback(async (
    jobPreferenceId: string,
    data: UpdateApplicationJobDescriptionDto
  ) => {
    setIsLoading(true);
    clearError();
    try {
      const response = await api.put<UpdateApplicationJobDescriptionResponse>(
        API_ENDPOINTS.ONBOARDING.APPLICATIONS.UPDATE_JOB_DESCRIPTION(jobPreferenceId),
        data
      );

      // Recharger la liste
      await loadApplications();

      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError, loadApplications]);

  /**
   * Activer une candidature (switcher)
   */
  const activateApplication = useCallback(async (jobPreferenceId: string) => {
    setIsLoading(true);
    clearError();
    try {
      const response = await api.put<ActivateApplicationResponse>(
        API_ENDPOINTS.ONBOARDING.APPLICATIONS.ACTIVATE(jobPreferenceId),
        {}
      );

      // Mettre à jour localement
      setApplications(prev => prev.map(app => ({
        ...app,
        isActive: app.id === jobPreferenceId
      })));

      const newActive = applications.find(app => app.id === jobPreferenceId);
      if (newActive) {
        setActiveApplication({ ...newActive, isActive: true });
      }

      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError, applications]);

  /**
   * Récupérer les détails d'une candidature spécifique
   */
  const getApplicationDetails = useCallback(async (jobPreferenceId: string) => {
    setIsLoading(true);
    clearError();
    try {
      const response = await api.get<CandidateJobPreference>(
        API_ENDPOINTS.ONBOARDING.APPLICATIONS.GET(jobPreferenceId)
      );

      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError]);

  /**
   * Créer une candidature complète (infos pro + CV + description)
   */
  const createCompleteApplication = useCallback(async (data: {
    professionalInfo: CreateApplicationDto;
    cvFile: File;
    jobDescription?: UpdateApplicationJobDescriptionDto;
  }) => {
    setIsLoading(true);
    clearError();
    try {
      // 1. Créer la candidature
      const createResponse = await createApplication(data.professionalInfo);
      const jobPreferenceId = createResponse.jobPreference.id;

      // 2. Upload le CV
      await uploadCvForApplication(jobPreferenceId, data.cvFile);

      // 3. Optionnel: Ajouter la description
      if (data.jobDescription) {
        await updateJobDescription(jobPreferenceId, data.jobDescription);
      }

      return createResponse;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [createApplication, uploadCvForApplication, updateJobDescription, handleError, clearError]);

  // Charger automatiquement les applications au montage
  useEffect(() => {
    loadApplications().catch(console.error);
  }, [loadApplications]);

  return {
    // État
    applications,
    activeApplication,
    isLoading,
    isRefreshing,
    errorState,

    // Actions
    loadApplications,
    createApplication,
    uploadCvForApplication,
    updateJobDescription,
    activateApplication,
    getApplicationDetails,
    createCompleteApplication,
    clearError,
  };
}
