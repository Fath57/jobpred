'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { mockJobPositions } from '@/lib/mockData';
import { useOnboardingForm } from '@/lib/hooks/useOnboardingForm';
import { ErrorDisplay, NetworkError, ServerError, FormValidationError } from '@/components/ui/error-display';
import { useAuthStore } from '@/lib/stores/authStore';
import { api, API_ENDPOINTS } from '@/lib/api';
import OnboardingHeader from './OnboardingHeader';
import OnboardingStepper from './OnboardingStepper';
import StepNavigation from './StepNavigation';
import PersonalInfoStep from './PersonalInfoStep';
import ProfessionalInfoStep from './ProfessionalInfoStep';
import CvUploadStep from './CvUploadStep';
import JobDescriptionStep from './JobDescriptionStep';
import { TOTAL_STEPS, type OnboardingFormData, parseFullName } from './types';

export default function OnboardingWizard() {
  const router = useRouter();
  const { register, fetchProfile } = useAuthStore();
  const { user, isAuthenticated } = useAuthStore();
  const {
    currentStep,
    isLoading,
    errorState,
    formData,
    setStep,
    clearError,
    clearFieldError,
    submitStep1,
    submitStep2,
    uploadAndSubmitStep3,
    submitStep4,
  } = useOnboardingForm();

  // État local pour les données du formulaire en cours d'édition
  const [localFormData, setLocalFormData] = useState<OnboardingFormData>(formData);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Effet pour vérifier l'authentification et rediriger si nécessaire
  useEffect(() => {
    let isMounted = true;

    const checkAuthentication = async () => {
      try {
        // Attendre un court instant pour laisser le temps à Zustand de réhydrater l'état
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (!isMounted) return;

        // Vérifier d'abord si nous avons déjà un token dans le localStorage
        const localToken = localStorage.getItem('auth_token');
        
        if (!localToken) {
          router.replace('/login');
          return;
        }

        // Si nous avons un token, essayer de récupérer le profil
        await fetchProfile();
      } catch (error) {
        if (!isMounted) return;
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        router.replace('/login');
      }
    };

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, [router, fetchProfile]);

  // Effet pour récupérer et mettre à jour les données utilisateur
  useEffect(() => {
    const initializeForm = async () => {
      if (isAuthenticated && !hasInitialized) {
        try {
          await fetchProfile();
          setHasInitialized(true);
        } catch (error) {
          console.error('Erreur lors de la récupération du profil:', error);
        }
      }
    };

    initializeForm();
  }, [isAuthenticated, fetchProfile, hasInitialized]);

  // Effet pour mettre à jour le formulaire quand l'utilisateur change
  useEffect(() => {
    if (user) {
      setLocalFormData(prev => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || '',
        linkedin: user.linkedin || '',
        location: user.location || '',
      }));

      // Si l'utilisateur est sur l'étape 1, passer automatiquement à l'étape 2
      setStep(user.onboardingStep == 4 ? 1 :user.onboardingStep + 1);
      
    }
  }, [user,  setStep]);

  const nextStep = () => setStep(Math.min(TOTAL_STEPS, currentStep + 1));
  const prevStep = () => setStep(Math.max(1, currentStep - 1));

  const handleStepSubmit = async () => {
    try {
      switch (currentStep) {
        case 1:
          await submitStep1({
            fullName: localFormData.fullName,
            email: localFormData.email,
            phone: localFormData.phone,
            linkedin: localFormData.linkedin,
            location: localFormData.location,
          });
          break;
        case 2:
          await submitStep2({
            desiredPosition: localFormData.desiredPosition,
            experience: localFormData.experience,
            workMode: localFormData.workMode,
          });
          break;
        case 4:
          await submitStep4({
            jobDescription: localFormData.jobDescription,
          });
          break;
      }
      
      nextStep();
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'étape:', error);
      // L'erreur est déjà gérée par le hook
    }
  };

  const handleFinalComplete = async () => {
    try {
      // D'abord soumettre les données du dernier step
      await submitStep4({
        jobDescription: localFormData.jobDescription,
      });
      
      router.push('/dashboard');

    } catch (error) {
      console.error('Erreur lors de la finalisation:', error);
    }
  };

  const isLast = currentStep === TOTAL_STEPS;

  // Afficher un état de chargement pendant la vérification de l'authentification
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 flex items-center justify-center">
        <Card className="shadow-xl border-0 w-96">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <OnboardingHeader />
        <OnboardingStepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {/* Affichage des erreurs globales */}
            {errorState.error && (
              <div className="mb-6">
                {errorState.isNetworkError && (
                  <NetworkError onRetry={() => handleStepSubmit()} />
                )}
                {errorState.isServerError && (
                  <ServerError onRetry={() => handleStepSubmit()} />
                )}
                {!errorState.isNetworkError && !errorState.isServerError && (
                  <ErrorDisplay
                    error={errorState.error}
                    onRetry={handleStepSubmit}
                    onDismiss={clearError}
                  />
                )}
              </div>
            )}

            {/* Affichage des erreurs de validation */}
            {errorState.isValidationError && Object.keys(errorState.fieldErrors).length > 0 && (
              <div className="mb-6">
                <FormValidationError errors={errorState.fieldErrors} />
              </div>
            )}

            {/* Affichage du loading */}
            {isLoading && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700">Chargement en cours...</p>
              </div>
            )}

            {currentStep === 1 && (
              <PersonalInfoStep 
                formData={localFormData} 
                setFormData={setLocalFormData}
                fieldErrors={errorState.fieldErrors}
                onFieldChange={clearFieldError}
                isAuthenticated={isAuthenticated}
                user={user}
              />
            )}
          
            {currentStep === 2 && (
              <ProfessionalInfoStep
                formData={localFormData}
                setFormData={setLocalFormData}
                positions={mockJobPositions}
              />
            )}
            {currentStep === 3 && (
              <CvUploadStep 
                formData={localFormData} 
                setFormData={setLocalFormData}
                onUploadAndSubmit={uploadAndSubmitStep3}
                onSuccess={() => {
                  // Le nextStep est géré automatiquement via la mise à jour de currentStep dans uploadAndSubmitStep4
                }}
              />
            )}
            {currentStep === 4 && (
              <JobDescriptionStep
                formData={localFormData}
                setFormData={setLocalFormData}
              />
            )}

            <StepNavigation
              canGoPrev={currentStep > 2} // Toujours commencer à l'étape 2 pour les utilisateurs connectés
              isLastStep={isLast}
              isLoading={isLoading}
              onPrev={prevStep}
              onNext={isLast ? handleFinalComplete : handleStepSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}