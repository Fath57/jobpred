// =============================================
// FILE: components/onboarding/FormalityLevelSlider.tsx
// =============================================
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FormalityLevel } from './types';
import { FORMALITY_LEVEL_OPTIONS } from './types';

interface FormalityLevelSelectorProps {
  value: FormalityLevel;
  onChange: (v: FormalityLevel) => void;
}

export default function FormalityLevelSlider({
  value,
  onChange,
}: FormalityLevelSelectorProps) {
  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FORMALITY_LEVEL_OPTIONS.map(option => (
          <Button
            key={option.value}
            variant={value === option.value ? 'default' : 'outline'}
            onClick={() => onChange(option.value)}
            className={
              value === option.value ? 'bg-emerald-500 hover:bg-emerald-600' : ''
            }
            type="button"
          >
            <div className="text-center">
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-gray-500">{option.description}</div>
            </div>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200"
        >
          Niveau sélectionné : {FORMALITY_LEVEL_OPTIONS.find(opt => opt.value === value)?.label}
        </Badge>
      </div>
    </div>
  );
}
