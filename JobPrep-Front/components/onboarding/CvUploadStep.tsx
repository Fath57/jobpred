// =============================================
// FILE: components/onboarding/CvUploadStep.tsx
// =============================================
'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import CvDropzone from './CvDropzone';
import type { OnboardingFormData } from './types';

interface CvUploadStepProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  onUploadAndSubmit?: (file: File) => Promise<any>;
  onSuccess?: () => void;
}

export default function CvUploadStep({
  formData,
  setFormData,
  onUploadAndSubmit,
  onSuccess,
}: CvUploadStepProps) {
  console.log('🔍 CvUploadStep rendered with onUploadAndSubmit:', !!onUploadAndSubmit);
  
  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, cvFile: file }));
  };

  const handleUploadAndSubmit = async (file: File) => {
    if (onUploadAndSubmit) {
      console.log('🔄 CvUploadStep: Starting upload and submit...');
      const result = await onUploadAndSubmit(file);
      console.log('✅ CvUploadStep: Upload and submit completed, result:', result);
      return result;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="text-purple-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre CV</h2>
        <p className="text-gray-600">
          Téléchargez votre CV pour une analyse personnalisée
        </p>
      </div>

      <CvDropzone
        file={formData.cvFile}
        onFileChange={handleFileChange}
        onUploadAndSubmit={handleUploadAndSubmit}
        onSuccess={onSuccess}
      />
    </div>
  );
}