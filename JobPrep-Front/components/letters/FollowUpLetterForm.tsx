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
  Clock,
  Send,
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
  TrendingUp,
  Users,
  Building,
  MapPin,
  Calendar,
  Briefcase,
  MessageSquare,
  Copy,
  Edit,
  AlertTriangle,
  Lightbulb,
  Phone,
  Info,
} from 'lucide-react';
import ProgressSteps from '@/components/dashboard/ProgressSteps';
import PageHeader from '@/components/dashboard/PageHeader';

interface FollowUpLetterFormProps {
  followUpLetterData: typeof import('@/lib/letters/followUpLetterData').followUpLetterData;
}

const FollowUpLetterForm: React.FC<FollowUpLetterFormProps> = ({
  followUpLetterData,
}) => {
  const [selectedApplication, setSelectedApplication] = useState(
    followUpLetterData.applications[0]
  );
  const [selectedTemplate, setSelectedTemplate] = useState(
    followUpLetterData.templates[0]
  );
  const [selectedTiming, setSelectedTiming] = useState(
    followUpLetterData.timingOptions[0]
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedLetter, setGeneratedLetter] = useState(
    followUpLetterData.generatedLetters[0]
  );
  const [customizations, setCustomizations] = useState(
    followUpLetterData.customizationOptions
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(5); // Go to preview step
    }, 3500);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      sent: 'border-blue-200 text-blue-700 bg-blue-50',
      interview_scheduled: 'border-green-200 text-green-700 bg-green-50',
      no_response: 'border-amber-200 text-amber-700 bg-amber-50',
      rejected: 'border-red-200 text-red-700 bg-red-50',
      in_progress: 'border-purple-200 text-purple-700 bg-purple-50',
    };
    return (
      colors[status as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      sent: 'Envoyée',
      interview_scheduled: 'Entretien planifié',
      no_response: 'Pas de réponse',
      rejected: 'Refusée',
      in_progress: 'En cours',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: 'border-green-200 text-green-700 bg-green-50',
      medium: 'border-amber-200 text-amber-700 bg-amber-50',
      high: 'border-red-200 text-red-700 bg-red-50',
      critical: 'border-purple-200 text-purple-700 bg-purple-50',
    };
    return (
      colors[urgency as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const steps = [
    { id: 1, title: 'Candidature', icon: Briefcase },
    { id: 2, title: 'Timing', icon: Clock },
    { id: 3, title: 'Template', icon: FileText },
    { id: 4, title: 'Personnalisation', icon: Settings },
    { id: 5, title: 'Aperçu', icon: Eye },
  ];

  return (
    <>
      <PageHeader
        title="Lettre de Relance IA"
        description="Relancez intelligemment vos candidatures avec des lettres personnalisées et stratégiques"
        icon={MessageSquare}
        iconColor="text-blue-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/letters', label: 'Letters' },
          { label: 'Follow up Letter', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Aperçu', icon: Eye, variant: 'outline' },
          { label: 'Télécharger', icon: Download, variant: 'outline' },
        ]}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        generateButtonText="Générer Relance"
        generateLoadingText="Génération..."
        generateButtonGradient="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
      />

      {/* Progress Steps */}
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        activeColor="bg-blue-100 text-blue-700 border border-blue-200"
        completedColor="bg-emerald-100 text-emerald-700 border border-emerald-200"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2">
          <Tabs value={`step-${currentStep}`} className="space-y-6">
            {/* Step 1: Application Selection */}
            <TabsContent value="step-1" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={20} />
                    Sélectionner la Candidature à Relancer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {followUpLetterData.applications.map((application: any) => {
                      const daysAgo = getDaysAgo(application.appliedDate);

                      return (
                        <div
                          key={application.id}
                          onClick={() => setSelectedApplication(application)}
                          className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedApplication.id === application.id
                              ? 'border-blue-300 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {application.jobTitle}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Building size={14} />
                                  {application.company}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {application.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  Candidature il y a {daysAgo} jour
                                  {daysAgo > 1 ? 's' : ''}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 mb-3">
                                <Badge
                                  variant="outline"
                                  className={getStatusColor(application.status)}
                                >
                                  {getStatusLabel(application.status)}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={getUrgencyColor(
                                    application.followUpUrgency
                                  )}
                                >
                                  {application.followUpUrgency === 'low'
                                    ? 'Faible urgence'
                                    : application.followUpUrgency === 'medium'
                                      ? 'Urgence modérée'
                                      : application.followUpUrgency === 'high'
                                        ? 'Urgence élevée'
                                        : 'Critique'}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-purple-50 text-purple-700"
                                >
                                  Score: {application.matchScore}%
                                </Badge>
                              </div>
                            </div>

                            {selectedApplication.id === application.id && (
                              <CheckCircle
                                className="text-blue-600 flex-shrink-0"
                                size={24}
                              />
                            )}
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Dernière interaction
                              </h4>
                              <p className="text-sm text-gray-600">
                                {application.lastInteraction.type}
                              </p>
                              <p className="text-xs text-gray-500">
                                {application.lastInteraction.date}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Recommandation IA
                              </h4>
                              <p className="text-sm text-gray-700">
                                {application.aiRecommendation}
                              </p>
                            </div>
                          </div>

                          {application.interviewDetails && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <h4 className="font-medium text-green-900 mb-1 flex items-center gap-2">
                                <Video size={14} />
                                Entretien programmé
                              </h4>
                              <p className="text-sm text-green-800">
                                {application.interviewDetails.type} -{' '}
                                {application.interviewDetails.date}
                              </p>
                              <p className="text-xs text-green-700">
                                {application.interviewDetails.interviewer}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 mt-4">
                            {application.tags.map(
                              (tag: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-gray-50"
                                >
                                  {tag}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Timing Selection */}
            <TabsContent value="step-2" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="text-amber-600" size={20} />
                    Stratégie de Timing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label>Moment optimal pour la relance</Label>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        {followUpLetterData.timingOptions.map((timing: any) => (
                          <div
                            key={timing.id}
                            onClick={() => setSelectedTiming(timing)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedTiming.id === timing.id
                                ? 'border-amber-300 bg-amber-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">
                                {timing.name}
                              </h4>
                              <Badge
                                variant="outline"
                                className={
                                  timing.effectiveness === 'high'
                                    ? 'bg-green-50 text-green-700'
                                    : timing.effectiveness === 'medium'
                                      ? 'bg-amber-50 text-amber-700'
                                      : 'bg-red-50 text-red-700'
                                }
                              >
                                {timing.effectiveness === 'high'
                                  ? 'Très efficace'
                                  : timing.effectiveness === 'medium'
                                    ? 'Efficace'
                                    : 'Peu efficace'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {timing.description}
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">
                                  Délai recommandé
                                </span>
                                <span className="font-medium">
                                  {timing.recommendedDelay}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">
                                  Taux de réponse
                                </span>
                                <span className="font-medium">
                                  {timing.responseRate}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                        <Lightbulb size={16} />
                        Analyse de votre candidature
                      </h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p>
                          • Candidature envoyée il y a{' '}
                          {getDaysAgo(selectedApplication.appliedDate)} jours
                        </p>
                        <p>
                          • Statut actuel:{' '}
                          {getStatusLabel(selectedApplication.status)}
                        </p>
                        <p>
                          • Urgence:{' '}
                          {selectedApplication.followUpUrgency === 'high'
                            ? 'Élevée - Relance recommandée'
                            : 'Modérée'}
                        </p>
                        <p>• Meilleur moment: {selectedTiming.name}</p>
                      </div>
                    </div>

                    <div>
                      <Label>Personnaliser le délai</Label>
                      <div className="mt-3 space-y-4">
                        <Select defaultValue="auto">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">
                              Automatique (recommandé)
                            </SelectItem>
                            <SelectItem value="immediate">Immédiat</SelectItem>
                            <SelectItem value="1day">Dans 1 jour</SelectItem>
                            <SelectItem value="3days">Dans 3 jours</SelectItem>
                            <SelectItem value="1week">
                              Dans 1 semaine
                            </SelectItem>
                            <SelectItem value="custom">Personnalisé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 3: Template Selection */}
            <TabsContent value="step-3" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-purple-600" size={20} />
                    Type de Relance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {followUpLetterData.templates.map((template: any) => (
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
                              template.type === 'polite'
                                ? 'border-green-200 text-green-700 bg-green-50'
                                : template.type === 'assertive'
                                  ? 'border-orange-200 text-orange-700 bg-orange-50'
                                  : template.type === 'value-add'
                                    ? 'border-blue-200 text-blue-700 bg-blue-50'
                                    : 'border-purple-200 text-purple-700 bg-purple-50'
                            }
                          >
                            {template.type === 'polite'
                              ? 'Poli'
                              : template.type === 'assertive'
                                ? 'Assertif'
                                : template.type === 'value-add'
                                  ? 'Valeur ajoutée'
                                  : 'Créatif'}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          {template.description}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Ton</span>
                            <span className="font-medium">{template.tone}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Longueur</span>
                            <span className="font-medium">
                              {template.length}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Efficacité</span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={template.effectiveness}
                                className="w-16 h-2"
                              />
                              <span className="text-xs">
                                {template.effectiveness}%
                              </span>
                            </div>
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

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                      <Target size={16} />
                      Recommandation basée sur votre situation
                    </h4>
                    <p className="text-sm text-purple-800">
                      Pour une candidature de{' '}
                      {getDaysAgo(selectedApplication.appliedDate)} jours avec
                      le statut "{getStatusLabel(selectedApplication.status)}",
                      nous recommandons le template
                      <strong> "{selectedTemplate.name}"</strong> pour optimiser
                      vos chances de réponse.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 4: Customization */}
            <TabsContent value="step-4" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="text-indigo-600" size={20} />
                    Personnalisation de la Relance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Objectif de la relance</Label>
                    <Select
                      value={customizations.objective}
                      onValueChange={value =>
                        setCustomizations({
                          ...customizations,
                          objective: value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="status_update">
                          Demander un statut
                        </SelectItem>
                        <SelectItem value="express_interest">
                          Réaffirmer l'intérêt
                        </SelectItem>
                        <SelectItem value="add_value">
                          Apporter de la valeur
                        </SelectItem>
                        <SelectItem value="schedule_meeting">
                          Proposer un entretien
                        </SelectItem>
                        <SelectItem value="provide_references">
                          Fournir des références
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Niveau d'insistance</Label>
                    <div className="mt-4 space-y-4">
                      <Slider
                        value={[customizations.insistenceLevel]}
                        onValueChange={value =>
                          setCustomizations({
                            ...customizations,
                            insistenceLevel: value[0],
                          })
                        }
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Très poli</span>
                        <span>Équilibré</span>
                        <span>Assertif</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Éléments à inclure</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      {customizations.includeElements.map(element => (
                        <div
                          key={element.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={element.id}
                            checked={element.selected}
                            onChange={e => {
                              const updatedElements =
                                customizations.includeElements.map(el =>
                                  el.id === element.id
                                    ? { ...el, selected: e.target.checked }
                                    : el
                                );
                              setCustomizations({
                                ...customizations,
                                includeElements: updatedElements,
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={element.id} className="text-sm">
                            {element.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newInformation">
                      Nouvelles informations à partager
                    </Label>
                    <Textarea
                      id="newInformation"
                      value={customizations.newInformation}
                      onChange={e =>
                        setCustomizations({
                          ...customizations,
                          newInformation: e.target.value,
                        })
                      }
                      placeholder="Certifications récentes, projets réalisés, articles publiés..."
                      className="mt-2 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label>Canal de communication préféré</Label>
                    <div className="flex gap-3 mt-3">
                      {['email', 'linkedin', 'phone'].map(channel => (
                        <Button
                          key={channel}
                          variant={
                            customizations.preferredChannel === channel
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() =>
                            setCustomizations({
                              ...customizations,
                              preferredChannel: channel,
                            })
                          }
                          className={`flex items-center gap-2 ${
                            customizations.preferredChannel === channel
                              ? 'bg-indigo-500 hover:bg-indigo-600'
                              : ''
                          }`}
                        >
                          {channel === 'email' && <Mail size={16} />}
                          {channel === 'linkedin' && <Users size={16} />}
                          {channel === 'phone' && <Phone size={16} />}
                          {channel === 'email'
                            ? 'Email'
                            : channel === 'linkedin'
                              ? 'LinkedIn'
                              : 'Téléphone'}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 5: Preview */}
            <TabsContent value="step-5" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="text-green-600" size={20} />
                    Aperçu de la Relance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <RefreshCw
                            className="text-blue-600 animate-spin"
                            size={32}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Génération de votre relance...
                        </h3>
                        <p className="text-gray-600">
                          Notre IA analyse le contexte et crée une relance
                          stratégique
                        </p>
                      </div>

                      <div className="space-y-4">
                        {followUpLetterData.generationSteps.map(
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
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                            Score: {generatedLetter.score}%
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            {generatedLetter.wordCount} mots
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-700"
                          >
                            {generatedLetter.readingTime} min de lecture
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700"
                          >
                            Taux de réponse:{' '}
                            {generatedLetter.expectedResponseRate}%
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
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            <Send size={16} className="mr-2" />
                            Envoyer
                          </Button>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                        <div className="prose max-w-none">
                          <div className="mb-6">
                            <div className="text-sm text-gray-600 mb-4">
                              <p>
                                <strong>Objet :</strong>{' '}
                                {generatedLetter.subject}
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
                              Jean René Roustand
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <Card className="p-4 border border-green-200 bg-green-50">
                          <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                            <ThumbsUp size={16} />
                            Points forts
                          </h4>
                          <ul className="text-sm text-green-800 space-y-1">
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
                            Suggestions
                          </h4>
                          <ul className="text-sm text-amber-800 space-y-1">
                            {generatedLetter.suggestions.map(
                              (suggestion: string, index: number) => (
                                <li key={index}>• {suggestion}</li>
                              )
                            )}
                          </ul>
                        </Card>

                        <Card className="p-4 border border-blue-200 bg-blue-50">
                          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                            <Activity size={16} />
                            Prochaines étapes
                          </h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            {generatedLetter.nextSteps.map(
                              (step: string, index: number) => (
                                <li key={index}>• {step}</li>
                              )
                            )}
                          </ul>
                        </Card>
                      </div>
                    </div>
                  )}
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
              className="bg-blue-500 hover:bg-blue-600"
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
                Analyse de Candidature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Jours depuis candidature</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  {getDaysAgo(selectedApplication.appliedDate)} jours
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Urgence relance</span>
                <Badge
                  variant="outline"
                  className={getUrgencyColor(
                    selectedApplication.followUpUrgency
                  )}
                >
                  {selectedApplication.followUpUrgency === 'high'
                    ? 'Élevée'
                    : 'Modérée'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Template sélectionné</span>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  {selectedTemplate.effectiveness}% efficace
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Timing optimal</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {selectedTiming.responseRate}% réponse
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-orange-600" size={20} />
                Statistiques Globales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Relances envoyées</span>
                <span className="font-medium">
                  {followUpLetterData.statistics.totalFollowUps}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taux de réponse moyen</span>
                <span className="font-medium">
                  {followUpLetterData.statistics.averageResponseRate}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Entretiens obtenus</span>
                <span className="font-medium">
                  {followUpLetterData.statistics.interviewsScheduled}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Délai moyen de réponse</span>
                <span className="font-medium">
                  {followUpLetterData.statistics.averageResponseTime}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="text-green-600" size={20} />
                Conseils IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {followUpLetterData.aiTips.map((tip: string, index: number) => (
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

// Add missing components
const FileText: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

const Settings: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Video: React.FC<{ size?: number }> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 8.5V15.5C22 17.5 21 18.5 19 18.5H5C3 18.5 2 17.5 2 15.5V8.5C2 6.5 3 5.5 5 5.5H19C21 5.5 22 6.5 22 8.5Z"></path>
    <path d="M9.5 14.5V9.5L15.5 12L9.5 14.5Z"></path>
  </svg>
);

const Activity: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const Gauge: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 14 4-4"></path>
    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
  </svg>
);

const ThumbsUp: React.FC<{ size?: number }> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 10v12"></path>
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
  </svg>
);

const BarChart3: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

export default FollowUpLetterForm;
