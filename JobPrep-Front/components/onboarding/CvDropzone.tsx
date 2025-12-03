// =============================================
// FILE: components/onboarding/CvDropzone.tsx
// =============================================
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

interface CvDropzoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onUploadAndSubmit?: (file: File) => Promise<any>;
  onSuccess?: () => void;
}

export default function CvDropzone({ file, onFileChange, onUploadAndSubmit, onSuccess }: CvDropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    // Vérifier la taille du fichier (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return 'Le fichier est trop volumineux. Taille maximale : 5MB';
    }

    // Vérifier le type de fichier
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Type de fichier non supporté. Formats acceptés : PDF, DOC, DOCX';
    }

    return null;
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0] || null;
    
    if (newFile) {
      const validationError = validateFile(newFile);
      if (validationError) {
        setUploadError(validationError);
        return;
      }
      
      setUploadError(null);
      onFileChange(newFile);
    }
  };

  const handleUploadAndSubmit = async () => {
    if (!file || !onUploadAndSubmit) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      console.log('🔄 Starting CV upload and submit...');
      const result = await onUploadAndSubmit(file);
      console.log('✅ CV upload and submit successful, result:', result);
      
      // Appeler onSuccess pour passer à l'étape suivante
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'upload et soumission:', error);
      setUploadError('Erreur lors de l\'upload du fichier. Veuillez réessayer.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    setUploadError(null);
  };

  return (
    <div className="space-y-4">
      {/* Affichage des erreurs */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{uploadError}</p>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-emerald-400 transition-colors">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {isUploading ? (
            <Loader2 className="text-emerald-600 animate-spin" size={32} />
          ) : (
            <Upload className="text-emerald-600" size={32} />
          )}
        </div>

        {isUploading ? (
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Upload en cours...</p>
              <p className="text-gray-600">Veuillez patienter pendant l&apos;upload de votre CV</p>
          </div>
        ) : file ? (
          <div className="space-y-4">
            <CheckCircle className="text-emerald-500 mx-auto" size={24} />
            <p className="text-gray-900 font-medium">{file.name}</p>
            <p className="text-gray-600">CV sélectionné, prêt à être uploadé</p>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={handleUploadAndSubmit}
                disabled={isUploading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Upload en cours...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Uploader et continuer
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleRemoveFile}
                type="button"
              >
                Changer de fichier
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Glissez votre CV ici
            </h3>
            <p className="text-gray-600">
              ou cliquez pour parcourir vos fichiers
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelection}
              className="hidden"
              id="cv-upload"
              disabled={isUploading}
            />
            <Button 
              variant="outline" 
              className="cursor-pointer" 
              type="button"
              disabled={isUploading}
              onClick={() => document.getElementById('cv-upload')?.click()}
            >
              Sélectionner un fichier
            </Button>
            <p className="text-sm text-gray-500">PDF, DOC ou DOCX (max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}