'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Mail,
  Wand2,
  FileText,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Zap,
  Star,
  Clock,
  TrendingUp,
  Users,
  Building,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Lightbulb,
  MessageSquare,
  BarChart3,
  Settings,
  Copy,
  Edit,
  Save,
  Send,
  Globe,
  Palette,
  Type,
  AlignLeft,
  Hash,
} from 'lucide-react';
import ProgressSteps from '@/components/dashboard/ProgressSteps';
import PageHeader from '@/components/dashboard/PageHeader';

interface MotivationLetterFormProps {
  motivationLetterData: typeof import('@/lib/letters/motivationLetterData').motivationLetterData;
}

const MotivationLetterForm: React.FC<MotivationLetterFormProps> = ({
  motivationLetterData,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    motivationLetterData.templates[0]
  );
  const [selectedTone, setSelectedTone] = useState(
    motivationLetterData.tones[0]
  );
  const [selectedJob, setSelectedJob] = useState(
    motivationLetterData.jobOffers[0]
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedLetter, setGeneratedLetter] = useState(
    motivationLetterData.generatedLetters[0]
  );
  const [formData, setFormData] = useState(motivationLetterData.userProfile);
  const [customizations, setCustomizations] = useState(
    motivationLetterData.customizationOptions
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(4); // Go to preview step
    }, 4000);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const getToneColor = (toneId: string) => {
    const colors = {
      professional: 'border-blue-200 text-blue-700 bg-blue-50',
      enthusiastic: 'border-orange-200 text-orange-700 bg-orange-50',
      confident: 'border-purple-200 text-purple-700 bg-purple-50',
      creative: 'border-pink-200 text-pink-700 bg-pink-50',
      formal: 'border-gray-200 text-gray-700 bg-gray-50',
      friendly: 'border-green-200 text-green-700 bg-green-50',
    };
    return (
      colors[toneId as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const steps = [
    { id: 1, title: 'Poste', icon: Briefcase },
    { id: 2, title: 'Template', icon: FileText },
    { id: 3, title: 'Personnalisation', icon: Settings },
    { id: 4, title: 'Génération', icon: Wand2 },
    { id: 5, title: 'Aperçu', icon: Eye },
  ];

  return (
    <>
      <PageHeader
        title="Lettre de Motivation IA"
        description="Créez des lettres de motivation personnalisées et percutantes avec notre IA avancée"
        icon={Mail}
        iconColor="text-emerald-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/letters', label: 'Letters' },
          { label: 'Motivation Letter', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Aperçu', icon: Eye, variant: 'outline' },
          { label: 'Télécharger', icon: Download, variant: 'outline' },
        ]}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        generateButtonText="Générer Lettre"
        generateLoadingText="Génération..."
        generateButtonGradient="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
      />

      {/* Progress Steps */}
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        activeColor="bg-emerald-100 text-emerald-700 border border-emerald-200"
        completedColor="bg-blue-100 text-blue-700 border border-blue-200"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2">
          <Tabs value={`step-${currentStep}`} className="space-y-6">
            {/* Step 1: Job Selection */}
            <TabsContent value="step-1" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={20} />
                    Sélectionner le Poste
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label>Offres d'emploi récentes</Label>
                      <div className="grid gap-4 mt-3">
                        {motivationLetterData.jobOffers.map((job: any) => (
                          <div
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                              selectedJob.id === job.id
                                ? 'border-emerald-300 bg-emerald-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {job.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Building size={14} />
                                    {job.company}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {job.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {job.postedDate}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700"
                                  >
                                    {job.type}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700"
                                  >
                                    {job.salary}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={
                                      job.matchScore >= 90
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : job.matchScore >= 75
                                          ? 'bg-amber-50 text-amber-700'
                                          : 'bg-red-50 text-red-700'
                                    }
                                  >
                                    {job.matchScore}% match
                                  </Badge>
                                </div>
                              </div>
                              {selectedJob.id === job.id && (
                                <CheckCircle
                                  className="text-emerald-600 flex-shrink-0"
                                  size={24}
                                />
                              )}
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {job.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {job.requiredSkills
                                .slice(0, 4)
                                .map((skill: string, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs bg-gray-50"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {job.requiredSkills.length > 4 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-gray-50"
                                >
                                  +{job.requiredSkills.length - 4} autres
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <Label htmlFor="customJob">
                        Ou saisissez une description personnalisée
                      </Label>
                      <Textarea
                        id="customJob"
                        placeholder="Collez ici la description du poste pour lequel vous souhaitez postuler..."
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Template Selection */}
            <TabsContent value="step-2" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-purple-600" size={20} />
                    Choisir un Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {motivationLetterData.templates.map((template: any) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                          selectedTemplate.id === template.id
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">
                            {template.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={
                              template.category === 'Professional'
                                ? 'border-blue-200 text-blue-700 bg-blue-50'
                                : template.category === 'Creative'
                                  ? 'border-pink-200 text-pink-700 bg-pink-50'
                                  : template.category === 'Modern'
                                    ? 'border-purple-200 text-purple-700 bg-purple-50'
                                    : 'border-green-200 text-green-700 bg-green-50'
                            }
                          >
                            {template.category}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          {template.description}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Structure</span>
                            <span className="font-medium">
                              {template.structure}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Longueur</span>
                            <span className="font-medium">
                              {template.length}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Secteur</span>
                            <span className="font-medium">
                              {template.bestFor}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`${i < template.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                size={14}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({template.usage}k utilisations)
                          </span>
                        </div>

                        {selectedTemplate.id === template.id && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle
                              className="text-purple-600 bg-white rounded-full"
                              size={24}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Lightbulb size={16} />
                      Recommandation IA
                    </h4>
                    <p className="text-sm text-blue-800">
                      Basé sur votre profil et le poste sélectionné, nous
                      recommandons le template
                      <strong> "{selectedTemplate.name}"</strong> pour maximiser
                      vos chances de succès.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 3: Customization */}
            <TabsContent value="step-3" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="text-indigo-600" size={20} />
                    Personnalisation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Ton de la lettre</Label>
                    <div className="grid md:grid-cols-3 gap-3 mt-3">
                      {motivationLetterData.tones.map((tone: any) => (
                        <div
                          key={tone.id}
                          onClick={() => setSelectedTone(tone)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedTone.id === tone.id
                              ? 'border-indigo-300 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h4 className="font-medium text-gray-900 mb-1">
                            {tone.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {tone.description}
                          </p>
                          <Badge
                            variant="outline"
                            className={getToneColor(tone.id)}
                          >
                            {tone.intensity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Niveau de formalité</Label>
                    <div className="mt-4 space-y-4">
                      <Slider
                        value={[customizations.formalityLevel]}
                        onValueChange={value =>
                          setCustomizations({
                            ...customizations,
                            formalityLevel: value[0],
                          })
                        }
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Décontracté</span>
                        <span>Neutre</span>
                        <span>Très formel</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Longueur souhaitée</Label>
                    <Select
                      value={customizations.length}
                      onValueChange={value =>
                        setCustomizations({ ...customizations, length: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">
                          Courte (200-300 mots)
                        </SelectItem>
                        <SelectItem value="medium">
                          Moyenne (300-450 mots)
                        </SelectItem>
                        <SelectItem value="long">
                          Longue (450-600 mots)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Points clés à mettre en avant</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      {customizations.keyPoints.map((point: any) => (
                        <div
                          key={point.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={point.id}
                            checked={point.selected}
                            onChange={e => {
                              const updatedPoints =
                                customizations.keyPoints.map((p: any) =>
                                  p.id === point.id
                                    ? { ...p, selected: e.target.checked }
                                    : p
                                );
                              setCustomizations({
                                ...customizations,
                                keyPoints: updatedPoints,
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={point.id} className="text-sm">
                            {point.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">
                      Informations supplémentaires
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      value={customizations.additionalInfo}
                      onChange={e =>
                        setCustomizations({
                          ...customizations,
                          additionalInfo: e.target.value,
                        })
                      }
                      placeholder="Ajoutez des informations spécifiques que vous souhaitez inclure dans votre lettre..."
                      className="mt-2 min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 4: Generation */}
            <TabsContent value="step-4" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="text-emerald-600" size={20} />
                    Génération IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <RefreshCw
                            className="text-emerald-600 animate-spin"
                            size={32}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Génération en cours...
                        </h3>
                        <p className="text-gray-600">
                          Notre IA analyse votre profil et crée une lettre
                          personnalisée
                        </p>
                      </div>

                      <div className="space-y-4">
                        {motivationLetterData.generationSteps.map(
                          (step: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-4"
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  step.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : step.status === 'in-progress'
                                      ? 'bg-blue-100 text-blue-600'
                                      : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {step.status === 'completed' ? (
                                  <CheckCircle size={16} />
                                ) : step.status === 'in-progress' ? (
                                  <RefreshCw
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Clock size={16} />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {step.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {step.description}
                                </p>
                              </div>
                              <span className="text-sm text-gray-500">
                                {step.duration}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="text-emerald-600" size={32} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Prêt à générer votre lettre
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Cliquez sur le bouton pour lancer la génération de votre
                        lettre de motivation personnalisée
                      </p>
                      <Button
                        onClick={handleGenerate}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                      >
                        <Wand2 size={16} className="mr-2" />
                        Générer ma lettre
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 5: Preview */}
            <TabsContent value="step-5" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="text-green-600" size={20} />
                    Aperçu et Édition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          Score: {generatedLetter.score}%
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          {generatedLetter.wordCount} mots
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700"
                        >
                          {generatedLetter.readingTime} min de lecture
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit size={16} className="mr-2" />
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy size={16} className="mr-2" />
                          Copier
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                      <div className="prose max-w-none">
                        <div className="mb-8">
                          <div className="text-right text-sm text-gray-600 mb-4">
                            {formData.personalInfo.location}, le{' '}
                            {new Date().toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-sm text-gray-700 mb-6">
                            <p>{selectedJob.company}</p>
                            <p>Service Ressources Humaines</p>
                            <p>{selectedJob.location}</p>
                          </div>
                          <div className="text-sm text-gray-700 mb-6">
                            <p>
                              <strong>Objet :</strong> Candidature pour le poste
                              de {selectedJob.title}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4 text-gray-800 leading-relaxed">
                          {generatedLetter.content
                            .split('\n\n')
                            .map((paragraph: string, index: number) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-8 text-sm text-gray-700">
                          <p>Cordialement,</p>
                          <p className="mt-4 font-medium">
                            {formData.personalInfo.fullName}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-4 border border-emerald-200 bg-emerald-50">
                        <h4 className="font-medium text-emerald-900 mb-2 flex items-center gap-2">
                          <CheckCircle size={16} />
                          Points forts détectés
                        </h4>
                        <ul className="text-sm text-emerald-800 space-y-1">
                          {generatedLetter.strengths.map(
                            (strength: string, index: number) => (
                              <li key={index}>• {strength}</li>
                            )
                          )}
                        </ul>
                      </Card>

                      <Card className="p-4 border border-amber-200 bg-amber-50">
                        <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
                          <Lightbulb size={16} />
                          Suggestions d'amélioration
                        </h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                          {generatedLetter.suggestions.map(
                            (suggestion: string, index: number) => (
                              <li key={index}>• {suggestion}</li>
                            )
                          )}
                        </ul>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => handleStepChange(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={16} className="mr-2" />
              Précédent
            </Button>
            <Button
              onClick={() => handleStepChange(Math.min(5, currentStep + 1))}
              disabled={currentStep === 5}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Suivant
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-6 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Compatibilité poste</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={selectedJob.matchScore}
                    className="w-16 h-2"
                  />
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {selectedJob.matchScore}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Score template</span>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  {selectedTemplate.rating}/5
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ton sélectionné</span>
                <Badge
                  variant="outline"
                  className={getToneColor(selectedTone.id)}
                >
                  {selectedTone.name}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Formalité</span>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 text-indigo-700"
                >
                  {customizations.formalityLevel}/5
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-orange-600" size={20} />
                Conseils IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {motivationLetterData.aiTips.map((tip: string, index: number) => (
                <Alert key={index} className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-800 text-sm">
                    {tip}
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MotivationLetterForm;
