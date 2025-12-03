// =============================================
// FILE: components/onboarding/WeKnowYouStep.tsx
// =============================================
'use client';

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Sparkles, 
  Edit3, 
  CheckCircle, 
  Loader2,
  RefreshCw,
  User
} from 'lucide-react';
import type { OnboardingFormData } from './types';

interface WeKnowYouStepProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  onGenerate?: (formData: OnboardingFormData) => Promise<any>;
}

export default function WeKnowYouStep({
  formData,
  setFormData,
  onGenerate,
}: WeKnowYouStepProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Vérifier si on a déjà un profil généré
  useEffect(() => {
    if (formData.aiProfileDescription) {
      setHasGenerated(true);
    }
  }, [formData.aiProfileDescription]);

  const handleGenerateProfile = async () => {
    setIsGenerating(true);
    try {
      if (onGenerate) {
        const response = await onGenerate(formData);
        console.log('Réponse de génération:', response);
        
        // Mettre à jour les données du formulaire avec la réponse
        setFormData(prev => ({
          ...prev,
          aiProfileDescription: response.aiProfileDescription || response.message || '',
          customizedProfileDescription: response.aiProfileDescription || response.message || ''
        }));
      } else {
        // Fallback pour la simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockProfile = `Basé sur votre profil LinkedIn et vos informations, vous êtes un professionnel passionné par l'innovation et la collaboration. Votre expérience dans le domaine technologique et votre approche méthodique font de vous un candidat idéal pour des postes de leadership. Votre capacité à travailler en équipe et votre vision stratégique sont des atouts majeurs.`;
        
        setFormData(prev => ({
          ...prev,
          aiProfileDescription: mockProfile,
          customizedProfileDescription: mockProfile
        }));
      }
      
      setHasGenerated(true);
    } catch (error) {
      console.error('Erreur lors de la génération du profil:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomizeProfile = () => {
    setIsEditing(true);
  };

  const handleSaveCustomization = () => {
    setIsEditing(false);
  };

  const handleProfileChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      customizedProfileDescription: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="text-purple-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Nous vous connaissons
        </h2>
        <p className="text-gray-600">
          Notre IA a analysé votre profil pour créer une description personnalisée
        </p>
      </div>

      {!hasGenerated ? (
        <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-purple-600" size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Génération de votre profil IA
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Notre intelligence artificielle va analyser vos informations pour créer 
              un profil personnalisé qui vous représente parfaitement.
            </p>
            <Button
              onClick={handleGenerateProfile}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer mon profil IA
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Profil généré
              </Badge>
              <span className="text-sm text-gray-500">
                Généré par notre IA
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateProfile}
                disabled={isGenerating}
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Régénérer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCustomizeProfile}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Personnaliser
              </Button>
            </div>
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Votre profil personnalisé
                  </h4>
                  <p className="text-sm text-gray-600">
                    Description générée par notre IA basée sur vos informations
                  </p>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customizedProfile">
                      Personnalisez votre profil
                    </Label>
                    <Textarea
                      id="customizedProfile"
                      value={formData.customizedProfileDescription}
                      onChange={(e) => handleProfileChange(e.target.value)}
                      placeholder="Modifiez le texte généré par l'IA selon vos préférences..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveCustomization}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Sauvegarder
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <p className="text-gray-700 leading-relaxed">
                    {formData.customizedProfileDescription || formData.aiProfileDescription}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Brain className="text-blue-600" size={14} />
              </div>
              <div>
                <h5 className="font-medium text-blue-900 mb-1">
                  Comment ça fonctionne ?
                </h5>
                <p className="text-sm text-blue-700">
                  Notre IA analyse vos informations personnelles et professionnelles 
                  pour créer un profil qui vous représente fidèlement. Vous pouvez ensuite 
                  le personnaliser selon vos préférences.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
