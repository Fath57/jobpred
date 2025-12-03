// =============================================
// FILE: components/onboarding/ProfessionalInfoStep.tsx
// =============================================
'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Briefcase } from 'lucide-react';
import DesiredPositionSelect from './DesiredPositionSelect';
import WorkModeSelector from './WorkModeSelector';
import type { 
  OnboardingFormData, 
  ExperienceLevel, 
  WorkMode
} from './types';
import { EXPERIENCE_LEVEL_OPTIONS } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProfessionalInfoStepProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  positions: string[];
}

export default function ProfessionalInfoStep({
  formData,
  setFormData,
  positions,
}: ProfessionalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="text-blue-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informations professionnelles
        </h2>
        <p className="text-gray-600">
          Parlez-nous de votre expérience et de vos objectifs
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="desiredPosition">Poste souhaité *</Label>
          <DesiredPositionSelect
            positions={positions}
            value={formData.desiredPosition}
            onChange={value =>
              setFormData(s => ({ ...s, desiredPosition: value }))
            }
          />
        </div>

        <div>
          <Label htmlFor="experience">Niveau d&apos;expérience</Label>
          <Select
            value={formData.experience}
            onValueChange={value =>
              setFormData(s => ({ ...s, experience: value as ExperienceLevel }))
            }
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Sélectionnez votre niveau" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Mode de travail préféré</Label>
          <WorkModeSelector
            value={formData.workMode}
            onChange={mode => setFormData(s => ({ ...s, workMode: mode }))}
          />
        </div>
      </div>
    </div>
  );
}
