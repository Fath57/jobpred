// =============================================
// FILE: components/onboarding/JobExampleBadges.tsx
// =============================================
'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

interface JobExampleBadgesProps {
  positions: string[];
  onPick: (desc: string) => void;
}

export default function JobExampleBadges({
  positions,
  onPick,
}: JobExampleBadgesProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <p className="text-sm text-gray-600 mb-4">
        Ou cliquez simplement sur l&apos;un des exemples d&apos;emplois ci-dessous pour
        voir votre premier Kit de Candidature.
      </p>
      <div className="flex flex-wrap gap-2">
        {positions.map(position => (
          <Badge
            key={position}
            variant="outline"
            className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300"
            onClick={() =>
              onPick(`Poste: ${position}\n\nDescription détaillée du poste...`)
            }
          >
            {position}
          </Badge>
        ))}
      </div>
    </div>
  );
}
