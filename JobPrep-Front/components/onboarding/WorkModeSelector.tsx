// =============================================
// FILE: components/onboarding/WorkModeSelector.tsx
// =============================================
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import type { WorkMode } from './types';
import { WORK_MODE_OPTIONS } from './types';

export default function WorkModeSelector({
  value,
  onChange,
}: {
  value: WorkMode;
  onChange: (v: WorkMode) => void;
}) {
  return (
    <div className="flex gap-3 mt-2">
      {WORK_MODE_OPTIONS.map(option => (
        <Button
          key={option.value}
          variant={value === option.value ? 'default' : 'outline'}
          onClick={() => onChange(option.value)}
          className={
            value === option.value ? 'bg-emerald-500 hover:bg-emerald-600' : ''
          }
          type="button"
          title={option.description}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
