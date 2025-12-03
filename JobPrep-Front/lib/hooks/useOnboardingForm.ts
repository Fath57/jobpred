'use client';

import { useState, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';
import type { OnboardingFormData } from '@/components/onboarding/types';
import { api, API_ENDPOINTS } from '@/lib/api';
import { useAuthStore } from '@/lib/stores/authStore';

const INITIAL_FORM_DATA: OnboardingFormData = {
  // Étape 1 - Informations personnelles
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  location: '',
  password: '',
  
  // Étape 2 - We know you
  aiProfileDescription: '',
  customizedProfileDescription: '',
  
  // Étape 3 - Informations professionnelles
  experience: 'JUNIOR',
  workMode: 'HYBRID',
  desiredPosition: '',
  
  // Étape 4 - CV
  cvFile: null,
  
  // Étape 5 - Description du poste
  jobDescription: '',
  formalityLevel: 'PROFESSIONAL',
};

export function useOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM_DATA);
  const { errorState, handleError, clearError, clearFieldError, setFieldError } = useErrorHandler();

  // Fonction générique pour mettre à jour l'onboarding
  const updateOnboarding = async (data: Partial<OnboardingFormData>, step: number) => {
    setIsLoading(true);
    try {
      const response = await api.put(API_ENDPOINTS.ONBOARDING.UPDATE, {
        ...data,
        currentStep: step
      });
      setFormData(prev => ({ ...prev, ...data }));
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Soumettre l'étape 1 - Informations personnelles
  const submitStep1 = async (data: any) => {
    return updateOnboarding({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
      location: data.location,
    }, 1);
  };

  // Soumettre l'étape 2 - Informations professionnelles
  const submitStep2 = async (data: any) => {
    return updateOnboarding({
      desiredPosition: data.desiredPosition,
      experience: data.experience,
      workMode: data.workMode,
    }, 2);
  };

  // Soumettre l'étape 3 - Upload CV
  const uploadAndSubmitStep3 = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('currentStep', '3');
      
      // Upload du CV
      const uploadResponse = await api.upload(API_ENDPOINTS.ONBOARDING.UPLOAD_CV, formData);
      
      // Mise à jour du state local
      setFormData(prev => ({ ...prev, cvFile: file }));
      
      // Récupérer la progression mise à jour
      const progressResponse = await api.get(API_ENDPOINTS.ONBOARDING.PROGRESS);
      setCurrentStep(progressResponse.data.currentStep);
      
      return uploadResponse.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Soumettre l'étape 4 - Description du poste
  const submitStep4 = async (data: any) => {
    return updateOnboarding({
      jobDescription: data.jobDescription,
    }, 3);
  };

  // Compléter l'onboarding
  const completeOnboarding = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.ONBOARDING.PROGRESS);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // État
    currentStep,
    isLoading,
    errorState,
    formData,
    
    // Actions
    setStep: setCurrentStep,
    setFormData,
    clearError,
    clearFieldError,
    setFieldError,
    handleError,
    
    // Soumissions d'étapes
    submitStep1,
    submitStep2,
    uploadAndSubmitStep3,
    submitStep4,
    completeOnboarding,
  };
}