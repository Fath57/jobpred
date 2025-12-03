'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApplications } from '@/lib/hooks/useApplications';
import type {
  ExperienceLevel,
  WorkMode,
  FormalityLevel,
} from '@/lib/api/types';

interface NewApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'JUNIOR', label: 'Junior (0-2 ans)' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire (2-5 ans)' },
  { value: 'SENIOR', label: 'Senior (5-10 ans)' },
  { value: 'EXPERT', label: 'Expert (10+ ans)' },
];

const WORK_MODES: { value: WorkMode; label: string; description: string }[] = [
  { value: 'REMOTE', label: 'Télétravail', description: '100% à distance' },
  { value: 'HYBRID', label: 'Hybride', description: 'Bureau + télétravail' },
  { value: 'IN_PERSON', label: 'Sur site', description: '100% au bureau' },
];

const FORMALITY_LEVELS: { value: FormalityLevel; label: string }[] = [
  { value: 'DECONTRACTE', label: 'Décontracté' },
  { value: 'PROFESSIONAL', label: 'Professionnel' },
  { value: 'FORMEL', label: 'Formel' },
];

export function NewApplicationModal({
  open,
  onOpenChange,
  onSuccess,
}: NewApplicationModalProps) {
  const { createCompleteApplication, isLoading } = useApplications();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  // Form data
  const [desiredPosition, setDesiredPosition] = useState('');
  const [experience, setExperience] = useState<ExperienceLevel>('INTERMEDIATE');
  const [workMode, setWorkMode] = useState<WorkMode>('HYBRID');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [formalityLevel, setFormalityLevel] = useState<FormalityLevel>('PROFESSIONAL');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation du fichier
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!allowedTypes.includes(file.type)) {
        setError('Format de fichier non valide. Utilisez PDF, DOC ou DOCX.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Le fichier est trop volumineux. Maximum 5 MB.');
        return;
      }

      setCvFile(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    setError('');

    // Validation
    if (!desiredPosition.trim()) {
      setError('Le poste souhaité est requis');
      return;
    }

    if (!cvFile) {
      setError('Le CV est requis');
      return;
    }

    try {
      await createCompleteApplication({
        professionalInfo: {
          desiredPosition: desiredPosition.trim(),
          experience,
          workMode,
        },
        cvFile,
        jobDescription: jobDescription.trim()
          ? {
              jobDescription: jobDescription.trim(),
              formalityLevel,
            }
          : undefined,
      });

      setSuccess(true);

      // Réinitialiser et fermer après un délai
      setTimeout(() => {
        handleClose();
        onSuccess?.();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setCurrentStep(1);
      setDesiredPosition('');
      setExperience('INTERMEDIATE');
      setWorkMode('HYBRID');
      setCvFile(null);
      setJobDescription('');
      setFormalityLevel('PROFESSIONAL');
      setError('');
      setSuccess(false);
      onOpenChange(false);
    }
  };

  const canProceedToStep2 = desiredPosition.trim() !== '';
  const canProceedToStep3 = cvFile !== null;
  const canSubmit = desiredPosition.trim() !== '' && cvFile !== null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouvelle candidature</DialogTitle>
          <DialogDescription>
            Créez une nouvelle candidature pour un poste différent
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-medium text-center">
              Candidature créée avec succès !
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Indicateur d'étapes */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Étape 1: Informations professionnelles */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="desiredPosition">
                    Poste souhaité <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="desiredPosition"
                    value={desiredPosition}
                    onChange={(e) => setDesiredPosition(e.target.value)}
                    placeholder="Ex: Développeur Full Stack"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Niveau d'expérience</Label>
                  <Select
                    value={experience}
                    onValueChange={(value) => setExperience(value as ExperienceLevel)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Mode de travail</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {WORK_MODES.map((mode) => (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() => setWorkMode(mode.value)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          workMode === mode.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{mode.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {mode.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedToStep2}
                  className="w-full"
                >
                  Suivant
                </Button>
              </div>
            )}

            {/* Étape 2: Upload CV */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cv">
                    CV <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <label
                      htmlFor="cv"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        {cvFile ? cvFile.name : 'Cliquez pour télécharger un CV'}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, DOCX (max 5 MB)
                      </span>
                    </label>
                    <input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedToStep3}
                    className="flex-1"
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            )}

            {/* Étape 3: Description du poste (optionnelle) */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="jobDescription">
                    Description du poste (optionnel)
                  </Label>
                  <Textarea
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Collez la description du poste ici..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="formalityLevel">Niveau de formalité</Label>
                  <Select
                    value={formalityLevel}
                    onValueChange={(value) =>
                      setFormalityLevel(value as FormalityLevel)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FORMALITY_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Création...
                      </>
                    ) : (
                      'Créer la candidature'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
