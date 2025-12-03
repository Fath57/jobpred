// =============================================
// FILE: components/onboarding/DesiredPositionSelect.tsx
// =============================================
'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DesiredPositionSelectProps {
  positions: string[];
  value: string;
  onChange: (v: string) => void;
}

export default function DesiredPositionSelect({
  positions,
  value,
  onChange,
}: DesiredPositionSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="mt-2">
        <SelectValue placeholder="Sélectionnez un poste" />
      </SelectTrigger>
      <SelectContent>
        {positions.map(position => (
          <SelectItem key={position} value={position}>
            {position}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
