'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  MessageSquare,
  Users,
  Target,
  Brain,
  Building,
  Heart,
  Star,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download,
  Share,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Activity,
  Award,
  Zap,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import ProgressSteps from '@/components/dashboard/ProgressSteps';
import PageHeader from '@/components/dashboard/PageHeader';

interface HrInterviewPrepProps {
  speechHrInterviewPrepData: typeof import('@/lib/speech/speechHrInterviewPrepData').speechHrInterviewPrepData;
}

const HrInterviewPrep: React.FC<HrInterviewPrepProps> = ({
  speechHrInterviewPrepData,
}) => {
  const [selectedInterviewType, setSelectedInterviewType] = useState(
    speechHrInterviewPrepData.interviewTypes[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(
    speechHrInterviewPrepData.availableSlots[0]
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionResults, setSessionResults] = useState(
    speechHrInterviewPrepData.sessionReports[0]
  );

  const handleStartInterview = () => {
    setIsInterviewActive(true);
    setCurrentStep(3);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50';
    if (score >= 70) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Débutant: 'border-green-200 text-green-700 bg-green-50',
      Intermédiaire: 'border-blue-200 text-blue-700 bg-blue-50',
      Avancé: 'border-purple-200 text-purple-700 bg-purple-50',
      Expert: 'border-red-200 text-red-700 bg-red-50',
    };
    return (
      colors[difficulty as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const getInterviewIcon = (type: string) => {
    switch (type) {
      case 'behavioral-interview':
        return <Users size={24} />;
      case 'motivational-interview':
        return <Heart size={24} />;
      case 'situational-interview':
        return <Target size={24} />;
      case 'technical-hr-interview':
        return <Brain size={24} />;
      case 'panel-interview':
        return <Users size={24} />;
      case 'cultural-fit-interview':
        return <Building size={24} />;
      default:
        return <MessageSquare size={24} />;
    }
  };

  const steps = [
    { id: 1, title: 'Type', icon: MessageSquare },
    { id: 2, title: 'Planification', icon: Calendar },
    { id: 3, title: 'Entretien', icon: Mic },
    { id: 4, title: 'Résultats', icon: Award },
  ];

  return (
    <>
      <PageHeader
        title="Préparation Entretien RH IA"
        description="Entraînez-vous aux entretiens RH avec nos IA spécialisées et recevez un feedback vocal détaillé"
        icon={MessageSquare}
        iconColor="text-blue-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/tests', label: 'Tests' },
          { label: 'HR Interview Prep', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Guide', icon: BookOpen, variant: 'outline' },
          { label: 'Rapport', icon: Download, variant: 'outline' },
        ]}
        onGenerate={!isInterviewActive ? handleStartInterview : undefined}
        generateButtonText="Commencer Entretien"
        generateButtonGradient="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
      />

      {/* Progress Steps */}
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        isDisabled={isInterviewActive}
        activeColor="bg-blue-100 text-blue-700 border border-blue-200"
        completedColor="bg-emerald-100 text-emerald-700 border border-emerald-200"
      />

      {/* Interview Timer */}
      {isInterviewActive && (
        <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Timer className="text-blue-600" size={20} />
                  <span className="font-medium text-blue-900">
                    Temps restant: {formatTime(timeRemaining)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="text-indigo-600" size={20} />
                  <span className="font-medium text-indigo-900">
                    Question {currentQuestion + 1} sur{' '}
                    {selectedInterviewType.questionsCount}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pause size={16} className="mr-2" />
                  Pause
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw size={16} className="mr-2" />
                  Recommencer
                </Button>
              </div>
            </div>
            <Progress
              value={
                (currentQuestion / selectedInterviewType.questionsCount) * 100
              }
              className="mt-3"
            />
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={`step-${currentStep}`} className="space-y-6">
            {/* Step 1: Interview Type Selection */}
            <TabsContent value="step-1" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="text-blue-600" size={20} />
                    Choisir le Type d'Entretien
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {speechHrInterviewPrepData.interviewTypes.map(
                      (type: any) => (
                        <div
                          key={type.id}
                          onClick={() => setSelectedInterviewType(type)}
                          className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                            selectedInterviewType.id === type.id
                              ? 'border-blue-300 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                              {getInterviewIcon(type.id)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {type.name}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={getDifficultyColor(
                                    type.difficulty
                                  )}
                                >
                                  {type.difficulty}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-purple-50 text-purple-700"
                                >
                                  {type.duration}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-4">
                            {type.description}
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Questions</span>
                              <span className="font-medium">
                                {type.questionsCount}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">
                                Valeur business
                              </span>
                              <span className="font-medium">
                                {type.businessValue}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              Focus areas
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {type.focusAreas
                                .slice(0, 3)
                                .map((area: string, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs bg-gray-50"
                                  >
                                    {area}
                                  </Badge>
                                ))}
                              {type.focusAreas.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-gray-50"
                                >
                                  +{type.focusAreas.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {selectedInterviewType.id === type.id && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle
                                className="text-blue-600 bg-white rounded-full"
                                size={24}
                              />
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Lightbulb size={16} />
                      Recommandation IA
                    </h4>
                    <p className="text-sm text-blue-800">
                      Basé sur votre profil et votre poste cible, nous
                      recommandons de commencer par
                      <strong> "{selectedInterviewType.name}"</strong> pour
                      maximiser vos chances de réussite.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Slot Selection */}
            <TabsContent value="step-2" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="text-indigo-600" size={20} />
                    Planifier votre Entretien - {selectedInterviewType.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {speechHrInterviewPrepData.availableSlots
                      .filter((slot: any) => slot.available)
                      .map((slot: any) => (
                        <div
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedSlot.id === slot.id
                              ? 'border-indigo-300 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">
                                  {slot.date.split('-')[2]}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {new Date(slot.date).toLocaleDateString(
                                    'fr-FR',
                                    { month: 'short' }
                                  )}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="font-medium text-gray-900">
                                    {slot.time}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700"
                                  >
                                    {slot.duration}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={getDifficultyColor(
                                      slot.difficulty
                                    )}
                                  >
                                    {slot.difficulty}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">
                                    {slot.aiInterviewer}
                                  </span>{' '}
                                  - {slot.interviewType}
                                </div>
                              </div>
                            </div>

                            {selectedSlot.id === slot.id && (
                              <CheckCircle
                                className="text-indigo-600"
                                size={24}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2 flex items-center gap-2">
                      <Info size={16} />
                      Détails de la session sélectionnée
                    </h4>
                    <div className="space-y-2 text-sm text-indigo-800">
                      <p>
                        • <strong>Interviewer IA:</strong>{' '}
                        {selectedSlot.aiInterviewer}
                      </p>
                      <p>
                        • <strong>Type:</strong> {selectedSlot.interviewType}
                      </p>
                      <p>
                        • <strong>Durée:</strong> {selectedSlot.duration}
                      </p>
                      <p>
                        • <strong>Niveau:</strong> {selectedSlot.difficulty}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 3: Interview Session */}
            <TabsContent value="step-3" className="space-y-6">
              {isInterviewActive ? (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="text-emerald-600" size={20} />
                      Entretien en cours - Question {currentQuestion + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* AI Interviewer */}
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <img
                          src={
                            selectedSlot.aiInterviewer === 'Claire RH'
                              ? 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
                              : 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
                          }
                          alt={selectedSlot.aiInterviewer}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {selectedSlot.aiInterviewer}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Interviewer IA - {selectedInterviewType.name}
                          </p>
                        </div>
                      </div>

                      {/* Question */}
                      <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Parlez-moi d'une situation où vous avez dû gérer un
                          conflit au sein de votre équipe.
                        </h3>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-sm text-gray-700 italic">
                            Cette question évalue votre capacité de gestion des
                            conflits et de leadership d'équipe. Utilisez la
                            méthode STAR pour structurer votre réponse.
                          </p>
                        </div>
                      </div>

                      {/* Recording Interface */}
                      <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mic className="text-red-600" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Enregistrement en cours
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Répondez naturellement à la question posée
                        </p>
                        <div className="flex justify-center gap-3">
                          <Button variant="outline">
                            <Pause size={16} className="mr-2" />
                            Pause
                          </Button>
                          <Button className="bg-emerald-500 hover:bg-emerald-600">
                            <ArrowRight size={16} className="mr-2" />
                            Question suivante
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="text-emerald-600" size={20} />
                      Prêt à commencer l'entretien
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="text-emerald-600" size={32} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {selectedInterviewType.name}
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Vous allez passer un entretien avec{' '}
                        {selectedSlot.aiInterviewer}. Assurez-vous d'être dans
                        un environnement calme.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
                        <div className="text-center">
                          <Clock
                            className="text-gray-400 mx-auto mb-2"
                            size={24}
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {selectedInterviewType.duration}
                          </p>
                          <p className="text-xs text-gray-600">Durée</p>
                        </div>
                        <div className="text-center">
                          <MessageSquare
                            className="text-gray-400 mx-auto mb-2"
                            size={24}
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {selectedInterviewType.questionsCount}
                          </p>
                          <p className="text-xs text-gray-600">Questions</p>
                        </div>
                        <div className="text-center">
                          <Award
                            className="text-gray-400 mx-auto mb-2"
                            size={24}
                          />
                          <p className="text-sm font-medium text-gray-900">
                            Feedback
                          </p>
                          <p className="text-xs text-gray-600">Détaillé</p>
                        </div>
                      </div>
                      <Button
                        onClick={handleStartInterview}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                      >
                        <Play size={16} className="mr-2" />
                        Commencer l'entretien
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Step 4: Results */}
            <TabsContent value="step-4" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-gold-600" size={20} />
                    Résultats de l'Entretien - {selectedInterviewType.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="text-center p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                      <div
                        className={`text-6xl font-bold ${getScoreColor(sessionResults.overallScore)} mb-2`}
                      >
                        {sessionResults.overallScore}%
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {sessionResults.interviewReadiness}
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Entretien complété en {sessionResults.duration} avec{' '}
                        {sessionResults.questionsAnswered} questions
                      </p>
                    </div>

                    {/* Voice Analysis Summary */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Analyse vocale
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Clarté communication
                            </span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={
                                  sessionResults.voiceAnalysis
                                    .communicationClarity.score
                                }
                                className="w-20 h-2"
                              />
                              <span
                                className={`font-medium ${getScoreColor(sessionResults.voiceAnalysis.communicationClarity.score)}`}
                              >
                                {
                                  sessionResults.voiceAnalysis
                                    .communicationClarity.score
                                }
                                %
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Confiance
                            </span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={
                                  sessionResults.voiceAnalysis.confidence.score
                                }
                                className="w-20 h-2"
                              />
                              <span
                                className={`font-medium ${getScoreColor(sessionResults.voiceAnalysis.confidence.score)}`}
                              >
                                {sessionResults.voiceAnalysis.confidence.score}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Présence professionnelle
                            </span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={
                                  sessionResults.voiceAnalysis
                                    .professionalPresence.score
                                }
                                className="w-20 h-2"
                              />
                              <span
                                className={`font-medium ${getScoreColor(sessionResults.voiceAnalysis.professionalPresence.score)}`}
                              >
                                {
                                  sessionResults.voiceAnalysis
                                    .professionalPresence.score
                                }
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Comparaison industrie
                        </h4>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-purple-700">
                                {sessionResults.comparisonData.percentile}%
                              </div>
                              <p className="text-xs text-purple-800">
                                Percentile
                              </p>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-purple-700">
                                {sessionResults.comparisonData.averageScore}%
                              </div>
                              <p className="text-xs text-purple-800">Moyenne</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Strengths and Improvements */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-4 border border-emerald-200 bg-emerald-50">
                        <h4 className="font-medium text-emerald-900 mb-3 flex items-center gap-2">
                          <ThumbsUp size={16} />
                          Points forts
                        </h4>
                        <ul className="space-y-2">
                          {sessionResults.strengths.map(
                            (strength: string, index: number) => (
                              <li
                                key={index}
                                className="text-sm text-emerald-800 flex items-start gap-2"
                              >
                                <CheckCircle
                                  size={14}
                                  className="mt-0.5 flex-shrink-0"
                                />
                                {strength}
                              </li>
                            )
                          )}
                        </ul>
                      </Card>

                      <Card className="p-4 border border-amber-200 bg-amber-50">
                        <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
                          <Target size={16} />
                          Axes d'amélioration
                        </h4>
                        <ul className="space-y-2">
                          {sessionResults.improvements.map(
                            (improvement: string, index: number) => (
                              <li
                                key={index}
                                className="text-sm text-amber-800 flex items-start gap-2"
                              >
                                <ArrowRight
                                  size={14}
                                  className="mt-0.5 flex-shrink-0"
                                />
                                {improvement}
                              </li>
                            )
                          )}
                        </ul>
                      </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t">
                      <Button className="bg-emerald-500 hover:bg-emerald-600">
                        <Download size={16} className="mr-2" />
                        Télécharger le rapport
                      </Button>
                      <Button variant="outline">
                        <Share size={16} className="mr-2" />
                        Partager les résultats
                      </Button>
                      <Button variant="outline">
                        <RotateCcw size={16} className="mr-2" />
                        Nouvel entretien
                      </Button>
                      <Button variant="outline">
                        <BookOpen size={16} className="mr-2" />
                        Plan de développement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          {!isInterviewActive && (
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
                onClick={() => handleStepChange(Math.min(4, currentStep + 1))}
                disabled={currentStep === 4}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Suivant
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-6 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} />
                Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sessions complétées</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {speechHrInterviewPrepData.userProgress.totalSessions}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Score moyen</span>
                <Badge
                  variant="outline"
                  className={getScoreBg(
                    speechHrInterviewPrepData.userProgress.averageScore
                  )}
                >
                  {speechHrInterviewPrepData.userProgress.averageScore}%
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Niveau actuel</span>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  {speechHrInterviewPrepData.userProgress.currentLevel}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Temps total</span>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 text-indigo-700"
                >
                  {speechHrInterviewPrepData.userProgress.totalTimeSpent}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-orange-600" size={20} />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sessions totales</span>
                <span className="font-medium">
                  {speechHrInterviewPrepData.statistics.totalSessions}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Score moyen plateforme</span>
                <span className="font-medium">
                  {speechHrInterviewPrepData.statistics.averageScore}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taux de réussite</span>
                <span className="font-medium">
                  {speechHrInterviewPrepData.statistics.successRate}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Satisfaction utilisateur</span>
                <span className="font-medium">
                  {speechHrInterviewPrepData.statistics.userSatisfaction}/5
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-yellow-600" size={20} />
                Conseils IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {speechHrInterviewPrepData.tips.map(
                (tip: string, index: number) => (
                  <Alert key={index} className="border-blue-200 bg-blue-50">
                    <AlertDescription className="text-blue-800 text-sm">
                      {tip}
                    </AlertDescription>
                  </Alert>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// Add missing components
const Calendar: React.FC<{ className?: string; size?: number }> = ({
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Mic: React.FC<{ className?: string; size?: number }> = ({
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
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const Timer: React.FC<{ className?: string; size?: number }> = ({
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
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const BookOpen: React.FC<{ className?: string; size?: number }> = ({
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
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const Lightbulb: React.FC<{ size?: number }> = ({ size }) => (
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
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
  </svg>
);

const Info: React.FC<{ size?: number }> = ({ size }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
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

export default HrInterviewPrep;
