// =============================================
// FILE: lib/hooks/useErrorHandler.ts
// =============================================
'use client';

import { useState, useCallback } from 'react';
import type { ApiError } from '../api/types';

export interface ErrorState {
  error: string | null;
  fieldErrors: Record<string, string>;
  isNetworkError: boolean;
  isServerError: boolean;
  isValidationError: boolean;
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    fieldErrors: {},
    isNetworkError: false,
    isServerError: false,
    isValidationError: false,
  });

  const handleError = useCallback((error: any) => {
    console.error('Error caught:', error);

    // Réinitialiser l'état d'erreur
    setErrorState({
      error: null,
      fieldErrors: {},
      isNetworkError: false,
      isServerError: false,
      isValidationError: false,
    });

    // Gestion des erreurs API
    if (error?.status || error?.code) {
      const apiError = error as ApiError;
      
      // Erreurs de validation (400)
      if (apiError.status === 400) {
        setErrorState({
          error: 'Veuillez vérifier les informations saisies',
          fieldErrors: apiError.details || {},
          isNetworkError: false,
          isServerError: false,
          isValidationError: true,
        });
        return;
      }

      // Erreurs d'authentification (401)
      if (apiError.status === 401) {
        setErrorState({
          error: 'Session expirée. Veuillez vous reconnecter.',
          fieldErrors: {},
          isNetworkError: false,
          isServerError: false,
          isValidationError: false,
        });
        return;
      }

      // Erreurs d'autorisation (403)
      if (apiError.status === 403) {
        setErrorState({
          error: 'Vous n\'avez pas les permissions nécessaires.',
          fieldErrors: {},
          isNetworkError: false,
          isServerError: false,
          isValidationError: false,
        });
        return;
      }

      // Erreurs de ressource non trouvée (404)
      if (apiError.status === 404) {
        setErrorState({
          error: 'Ressource non trouvée.',
          fieldErrors: {},
          isNetworkError: false,
          isServerError: false,
          isValidationError: false,
        });
        return;
      }

      // Erreurs de serveur (500+)
      if (apiError.status >= 500) {
        setErrorState({
          error: 'Erreur du serveur. Veuillez réessayer plus tard.',
          fieldErrors: {},
          isNetworkError: false,
          isServerError: true,
          isValidationError: false,
        });
        return;
      }

      // Autres erreurs API
      setErrorState({
        error: apiError.message || 'Une erreur est survenue',
        fieldErrors: {},
        isNetworkError: false,
        isServerError: false,
        isValidationError: false,
      });
      return;
    }

    // Gestion des erreurs de réseau
    if (error?.message?.includes('Network Error') || 
        error?.message?.includes('fetch') ||
        error?.code === 'NETWORK_ERROR') {
      setErrorState({
        error: 'Problème de connexion. Vérifiez votre connexion internet.',
        fieldErrors: {},
        isNetworkError: true,
        isServerError: false,
        isValidationError: false,
      });
      return;
    }

    // Gestion des erreurs de timeout
    if (error?.message?.includes('timeout') || 
        error?.code === 'TIMEOUT') {
      setErrorState({
        error: 'La requête a pris trop de temps. Veuillez réessayer.',
        fieldErrors: {},
        isNetworkError: true,
        isServerError: false,
        isValidationError: false,
      });
      return;
    }

    // Erreur générique
    setErrorState({
      error: error?.message || 'Une erreur inattendue est survenue',
      fieldErrors: {},
      isNetworkError: false,
      isServerError: false,
      isValidationError: false,
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      fieldErrors: {},
      isNetworkError: false,
      isServerError: false,
      isValidationError: false,
    });
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrorState(prev => ({
      ...prev,
      fieldErrors: {
        ...prev.fieldErrors,
        [field]: undefined,
      },
    }));
  }, []);

  const setFieldError = useCallback((field: string, message: string) => {
    setErrorState(prev => ({
      ...prev,
      fieldErrors: {
        ...prev.fieldErrors,
        [field]: message,
      },
    }));
  }, []);

  return {
    errorState,
    handleError,
    clearError,
    clearFieldError,
    setFieldError,
  };
}
