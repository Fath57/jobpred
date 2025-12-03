// =============================================
// FILE: components/onboarding/OnboardingStepper.tsx
// =============================================
'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';

export default function OnboardingStepper({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          Étape {currentStep} sur {totalSteps}
        </span>
        <span>{Math.round(progress)}% complété</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
