// =============================================
// FILE: components/ui/error-display.tsx
// =============================================
'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'default' | 'destructive' | 'warning';
  showRetry?: boolean;
  showDismiss?: boolean;
  className?: string;
}

export function ErrorDisplay({
  error,
  onRetry,
  onDismiss,
  variant = 'destructive',
  showRetry = true,
  showDismiss = true,
  className = '',
}: ErrorDisplayProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'destructive':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <Alert className={`${getVariantStyles()} ${className}`}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span className="flex-1">{error}</span>
        <div className="flex gap-2 ml-4">
          {showRetry && onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="text-xs h-7 px-2"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Réessayer
            </Button>
          )}
          {showDismiss && onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-xs h-7 px-2 hover:bg-transparent"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

// Composant pour les erreurs de validation
export function ValidationError({ 
  message, 
  field 
}: { 
  message: string; 
  field?: string; 
}) {
  return (
    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      {message}
    </p>
  );
}

// Composant pour les erreurs de réseau
export function NetworkError({ 
  onRetry 
}: { 
  onRetry?: () => void; 
}) {
  return (
    <ErrorDisplay
      error="Problème de connexion. Vérifiez votre connexion internet et réessayez."
      onRetry={onRetry}
      variant="destructive"
      showDismiss={false}
    />
  );
}

// Composant pour les erreurs de serveur
export function ServerError({ 
  onRetry 
}: { 
  onRetry?: () => void; 
}) {
  return (
    <ErrorDisplay
      error="Erreur du serveur. Notre équipe a été notifiée. Veuillez réessayer dans quelques minutes."
      onRetry={onRetry}
      variant="destructive"
    />
  );
}

// Composant pour les erreurs de validation de formulaire
export function FormValidationError({ 
  errors 
}: { 
  errors: Record<string, string>; 
}) {
  return (
    <div className="space-y-2">
      {Object.entries(errors).map(([field, message]) => (
        <ValidationError key={field} message={message} field={field} />
      ))}
    </div>
  );
}
