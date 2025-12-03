// =============================================
// FILE: components/onboarding/JobDescriptionStep.tsx
// =============================================
'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import type { OnboardingFormData } from './types';

interface JobDescriptionStepProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
}

export default function JobDescriptionStep({
  formData,
  setFormData,
}: JobDescriptionStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="text-amber-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Description du poste
        </h2>
        <p className="text-gray-600">
          Collez la description du poste pour adapter le kit de candidature
        </p>
      </div>

      <div>
        <Label htmlFor="jobDescription">
          Description ou lien du poste
        </Label>
        <Textarea
          id="jobDescription"
          value={formData.jobDescription}
          onChange={e =>
            setFormData(s => ({ ...s, jobDescription: e.target.value }))
          }
          placeholder="Collez ici la description du poste ou le lien de l'offre d'emploi pour lequel vous souhaitez postuler."
          className="mt-2 min-h-[120px]"
        />
      </div>
    </div>
  );
}
