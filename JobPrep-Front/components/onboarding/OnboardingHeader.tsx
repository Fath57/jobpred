// =============================================
// FILE: components/onboarding/OnboardingHeader.tsx
// =============================================
'use client';

import React from 'react';

export default function OnboardingHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">JP</span>
        </div>
        <span className="font-bold text-3xl text-gray-900">JobPrep</span>
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
        Personnalisez votre kit de candidature
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Ajustez les détails pour le rôle sélectionné ou votre description de
        poste personnalisée.
      </p>
    </div>
  );
}
