// =============================================
// FILE: components/onboarding/StepNavigation.tsx
// =============================================
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface StepNavigationProps {
  canGoPrev: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
}

export default function StepNavigation({
  canGoPrev,
  isLastStep,
  isLoading = false,
  onPrev,
  onNext,
  nextLabel,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={!canGoPrev || isLoading}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Précédent
      </Button>

      <Button
        onClick={onNext}
        disabled={isLoading}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Chargement...
          </>
        ) : (
          <>
            {isLastStep
              ? nextLabel || 'Finaliser l\'onboarding'
              : nextLabel || 'Suivant'}
            <ArrowRight size={16} />
          </>
        )}
      </Button>
    </div>
  );
}
