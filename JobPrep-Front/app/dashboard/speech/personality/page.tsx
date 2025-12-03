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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ChatWidget from '@/components/chat/ChatWidget';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Brain,
  Users,
  Target,
  Heart,
  Zap,
  Compass,
  Calendar,
  Clock,
  Phone,
  Video,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  RefreshCw,
  Briefcase,
  Crown,
  Activity,
  BarChart3,
  Settings,
  Eye,
  FileText,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Info,
  AlertTriangle,
  Star,
  Award,
  TrendingUp,
  Sparkles,
  Gauge,
  Share,
  Copy,
  Printer,
  Mail,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Bookmark,
  Play,
  Pause,
  Mic,
  Headphones,
} from 'lucide-react';
import { speechPersonalitySkillsData } from '@/lib/speechPersonalitySkillsData';

export default function SpeechPersonalityPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(
    speechPersonalitySkillsData.personalityFrameworks[0]
  );
  const [selectedAssessment, setSelectedAssessment] = useState(
    speechPersonalitySkillsData.assessmentTypes[0]
  );
  const [selectedInterviewer, setSelectedInterviewer] = useState(
    speechPersonalitySkillsData.aiInterviewers[0]
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [callType, setCallType] = useState('web_call');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallCompleted, setIsCallCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleFrameworkSelect = framework => {
    setSelectedFramework(framework);
  };

  const handleAssessmentSelect = assessment => {
    setSelectedAssessment(assessment);
  };

  const handleInterviewerSelect = interviewer => {
    setSelectedInterviewer(interviewer);
  };

  const handleSlotSelect = slot => {
    setSelectedSlot(slot);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startCall = () => {
    setIsCallActive(true);
    // Simulate a call duration
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Simulate call completion after 10 seconds (in real app this would be much longer)
    setTimeout(() => {
      clearInterval(timer);
      setIsCallActive(false);
      setIsCallCompleted(true);
      setShowResults(true);
    }, 10000);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getIconComponent = iconName => {
    const icons = {
      Brain,
      Users,
      Target,
      Heart,
      Zap,
      Compass,
      Briefcase,
      Crown,
      Activity,
      MessageSquare,
    };
    return icons[iconName] || Brain;
  };

  const report = speechPersonalitySkillsData.sessionReports[0];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/speech">Speech</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Personality</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Brain className="text-indigo-600" size={32} />
                Évaluation de Personnalité IA
              </h1>
              <p className="text-gray-600">
                Découvrez vos traits de personnalité et leur impact sur votre
                carrière grâce à notre IA conversationnelle
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              {showResults ? (
                <>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={16} />
                    Télécharger PDF
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share size={16} />
                    Partager
                  </Button>
                  <Button className="bg-indigo-500 hover:bg-indigo-600 flex items-center gap-2">
                    <Calendar size={16} />
                    Nouvel Entretien
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Info size={16} />
                    Guide
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Mes Entretiens
                  </Button>
                  {currentStep === 4 && !isCallActive && !isCallCompleted && (
                    <Button
                      onClick={startCall}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 flex items-center gap-2"
                    >
                      <Video size={16} />
                      Démarrer l'Entretien
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {showResults ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content - Results */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="text-indigo-600" size={20} />
                        Rapport de Personnalité
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Printer size={14} />
                          Imprimer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Copy size={14} />
                          Copier
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Tabs
                      defaultValue="overview"
                      className="space-y-4"
                      onValueChange={setActiveTab}
                    >
                      <TabsList className="grid grid-cols-5 w-full">
                        <TabsTrigger value="overview">
                          Vue d'ensemble
                        </TabsTrigger>
                        <TabsTrigger value="traits">Traits</TabsTrigger>
                        <TabsTrigger value="career">Carrière</TabsTrigger>
                        <TabsTrigger value="relationships">
                          Relations
                        </TabsTrigger>
                        <TabsTrigger value="development">
                          Développement
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl text-center">
                          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Brain className="text-indigo-600" size={36} />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {report.overallProfile.personalityType}
                          </h2>
                          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
                            {report.overallProfile.typeDescription}
                          </p>
                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {report.overallProfile.dominantTraits.map(
                              (trait, index) => (
                                <Badge
                                  key={index}
                                  className="bg-indigo-100 text-indigo-700 border-indigo-200 px-3 py-1"
                                >
                                  {trait}
                                </Badge>
                              )
                            )}
                          </div>
                          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Gauge size={14} />
                              <span>
                                Fiabilité: {report.overallProfile.reliability}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity size={14} />
                              <span>
                                Stabilité: {report.overallProfile.stability}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border border-emerald-200 bg-emerald-50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center gap-2 text-emerald-800">
                                <ThumbsUp
                                  size={18}
                                  className="text-emerald-600"
                                />
                                Forces Uniques
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <ul className="space-y-2">
                                {report.overallProfile.uniqueStrengths.map(
                                  (strength, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-emerald-800"
                                    >
                                      <CheckCircle
                                        size={16}
                                        className="mt-1 flex-shrink-0 text-emerald-600"
                                      />
                                      <span>{strength}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="border border-amber-200 bg-amber-50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
                                <AlertTriangle
                                  size={18}
                                  className="text-amber-600"
                                />
                                Défis Potentiels
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <ul className="space-y-2">
                                {report.overallProfile.potentialChallenges.map(
                                  (challenge, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-amber-800"
                                    >
                                      <ChevronRight
                                        size={16}
                                        className="mt-1 flex-shrink-0 text-amber-600"
                                      />
                                      <span>{challenge}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Gauge className="text-indigo-600" size={20} />
                            Analyse Vocale de Personnalité
                          </h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Style de Communication
                                </span>
                                <span className="font-medium">
                                  {
                                    report.voiceAnalysis.communicationStyle
                                      .score
                                  }
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  report.voiceAnalysis.communicationStyle.score
                                }
                                className="h-2"
                              />
                              <p className="text-xs text-gray-500">
                                {
                                  report.voiceAnalysis.communicationStyle
                                    .dominantStyle
                                }
                              </p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Expression Émotionnelle
                                </span>
                                <span className="font-medium">
                                  {
                                    report.voiceAnalysis.emotionalExpression
                                      .score
                                  }
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  report.voiceAnalysis.emotionalExpression.score
                                }
                                className="h-2"
                              />
                              <p className="text-xs text-gray-500">
                                Contrôlée et authentique
                              </p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Dynamique Interpersonnelle
                                </span>
                                <span className="font-medium">
                                  {
                                    report.voiceAnalysis.interpersonalDynamics
                                      .score
                                  }
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  report.voiceAnalysis.interpersonalDynamics
                                    .score
                                }
                                className="h-2"
                              />
                              <p className="text-xs text-gray-500">
                                Leadership et assertivité
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="text-indigo-600" size={20} />
                            Compatibilité Professionnelle
                          </h3>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {report.careerInsights.idealRoles
                              .slice(0, 4)
                              .map((role, index) => (
                                <Card
                                  key={index}
                                  className="border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-medium text-gray-900">
                                        {role}
                                      </h4>
                                      <Badge className="bg-indigo-100 text-indigo-700">
                                        {90 - index * 2}%
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                      <ThumbsUp
                                        size={12}
                                        className="text-emerald-500"
                                      />
                                      <span>
                                        {
                                          report.careerInsights
                                            .motivationalDrivers[
                                            index %
                                              report.careerInsights
                                                .motivationalDrivers.length
                                          ]
                                        }
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="traits" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center gap-2">
                                <Brain className="text-indigo-600" size={20} />
                                Traits de Personnalité Big Five
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2 space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">
                                    Ouverture à l'expérience
                                  </span>
                                  <span className="font-medium">
                                    {
                                      report.voiceAnalysis.personalityTraits
                                        .openness
                                    }
                                    %
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    report.voiceAnalysis.personalityTraits
                                      .openness
                                  }
                                  className="h-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Innovation, créativité, curiosité
                                  intellectuelle
                                </p>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">
                                    Conscienciosité
                                  </span>
                                  <span className="font-medium">
                                    {
                                      report.voiceAnalysis.personalityTraits
                                        .conscientiousness
                                    }
                                    %
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    report.voiceAnalysis.personalityTraits
                                      .conscientiousness
                                  }
                                  className="h-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Organisation, fiabilité, autodiscipline
                                </p>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">
                                    Extraversion
                                  </span>
                                  <span className="font-medium">
                                    {
                                      report.voiceAnalysis.personalityTraits
                                        .extraversion
                                    }
                                    %
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    report.voiceAnalysis.personalityTraits
                                      .extraversion
                                  }
                                  className="h-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Sociabilité, énergie, assertivité
                                </p>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">
                                    Agréabilité
                                  </span>
                                  <span className="font-medium">
                                    {
                                      report.voiceAnalysis.personalityTraits
                                        .agreeableness
                                    }
                                    %
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    report.voiceAnalysis.personalityTraits
                                      .agreeableness
                                  }
                                  className="h-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Coopération, empathie, altruisme
                                </p>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">
                                    Stabilité émotionnelle
                                  </span>
                                  <span className="font-medium">
                                    {100 -
                                      report.voiceAnalysis.personalityTraits
                                        .neuroticism}
                                    %
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    100 -
                                    report.voiceAnalysis.personalityTraits
                                      .neuroticism
                                  }
                                  className="h-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Calme, résilience, gestion du stress
                                </p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center gap-2">
                                <MessageSquare
                                  className="text-indigo-600"
                                  size={20}
                                />
                                Style de Communication
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <div className="p-4 bg-indigo-50 rounded-lg mb-4">
                                <h4 className="font-medium text-indigo-900 mb-2">
                                  Style dominant:{' '}
                                  {
                                    report.voiceAnalysis.communicationStyle
                                      .dominantStyle
                                  }
                                </h4>
                                <p className="text-sm text-indigo-800">
                                  {
                                    report.voiceAnalysis.communicationStyle
                                      .description
                                  }
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <ThumbsUp
                                      size={14}
                                      className="text-emerald-500"
                                    />
                                    Forces
                                  </h4>
                                  <ul className="space-y-1">
                                    {report.voiceAnalysis.communicationStyle.strengths.map(
                                      (strength, index) => (
                                        <li
                                          key={index}
                                          className="text-sm text-gray-700"
                                        >
                                          • {strength}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Target
                                      size={14}
                                      className="text-amber-500"
                                    />
                                    Défis
                                  </h4>
                                  <ul className="space-y-1">
                                    {report.voiceAnalysis.communicationStyle.challenges.map(
                                      (challenge, index) => (
                                        <li
                                          key={index}
                                          className="text-sm text-gray-700"
                                        >
                                          • {challenge}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <Activity className="text-indigo-600" size={20} />
                              Expression Émotionnelle
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="mb-4">
                              <p className="text-gray-700 mb-4">
                                {
                                  report.voiceAnalysis.emotionalExpression
                                    .description
                                }
                              </p>

                              <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                      Gamme émotionnelle
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis.emotionalExpression
                                          .emotionalRange
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.emotionalExpression
                                        .emotionalRange
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                      Clarté émotionnelle
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis.emotionalExpression
                                          .emotionalClarity
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.emotionalExpression
                                        .emotionalClarity
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                      Authenticité
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis.emotionalExpression
                                          .emotionalAuthenticity
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.emotionalExpression
                                        .emotionalAuthenticity
                                    }
                                    className="h-2"
                                  />
                                </div>
                              </div>
                            </div>

                            <h4 className="font-medium text-gray-900 mb-3">
                              Parcours émotionnel durant l'entretien
                            </h4>
                            <div className="space-y-3">
                              {report.voiceAnalysis.emotionalExpression.emotionalJourney.map(
                                (point, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3"
                                  >
                                    <div className="text-xs text-gray-500 w-16">
                                      {point.timestamp}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">
                                          {point.emotion}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          Intensité: {point.intensity}%
                                        </span>
                                      </div>
                                      <Progress
                                        value={point.intensity}
                                        className="h-1.5"
                                      />
                                    </div>
                                    <div className="text-xs text-gray-500 max-w-[150px] truncate">
                                      {point.context}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <Gauge className="text-indigo-600" size={20} />
                              Style Cognitif
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <p className="text-gray-700 mb-4">
                              {report.voiceAnalysis.cognitiveStyle.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Pensée analytique
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis.cognitiveStyle
                                          .analyticalThinking
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.cognitiveStyle
                                        .analyticalThinking
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Pensée créative
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis.cognitiveStyle
                                          .creativeThinking
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.cognitiveStyle
                                        .creativeThinking
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Pensée pratique
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis.cognitiveStyle
                                          .practicalThinking
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.cognitiveStyle
                                        .practicalThinking
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Pensée abstraite
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis.cognitiveStyle
                                          .abstractThinking
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.cognitiveStyle
                                        .abstractThinking
                                    }
                                    className="h-2"
                                  />
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Styles dominants
                                </h4>
                                <div className="space-y-2">
                                  {report.voiceAnalysis.cognitiveStyle.dominantStyles.map(
                                    (style, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <CheckCircle
                                          size={16}
                                          className="text-emerald-500 mt-0.5 flex-shrink-0"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {style}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>

                                <h4 className="font-medium text-gray-900 mt-4 mb-3">
                                  Axes de développement
                                </h4>
                                <div className="space-y-2">
                                  {report.voiceAnalysis.cognitiveStyle.developmentAreas.map(
                                    (area, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <Target
                                          size={16}
                                          className="text-amber-500 mt-0.5 flex-shrink-0"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {area}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="career" className="space-y-6">
                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <Briefcase
                                className="text-indigo-600"
                                size={20}
                              />
                              Compatibilité Professionnelle
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Rôles idéaux
                                </h4>
                                <div className="space-y-3">
                                  {report.careerInsights.idealRoles.map(
                                    (role, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                      >
                                        <span className="font-medium text-gray-800">
                                          {role}
                                        </span>
                                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                          {95 - index * 3}% match
                                        </Badge>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Environnements de travail
                                </h4>
                                <div className="space-y-2">
                                  {report.careerInsights.workEnvironments.map(
                                    (env, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <CheckCircle
                                          size={16}
                                          className="text-emerald-500 mt-0.5 flex-shrink-0"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {env}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Style de leadership
                                </h4>
                                <p className="text-gray-700 text-sm p-3 bg-indigo-50 rounded-lg">
                                  {report.careerInsights.leadershipStyle}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Contribution en équipe
                                </h4>
                                <p className="text-gray-700 text-sm p-3 bg-indigo-50 rounded-lg">
                                  {report.careerInsights.teamContribution}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium text-gray-900 mb-3">
                                Facteurs de motivation
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {report.careerInsights.motivationalDrivers.map(
                                  (driver, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                                    >
                                      <Zap
                                        size={16}
                                        className="text-amber-500"
                                      />
                                      <span className="text-sm text-gray-700">
                                        {driver}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium text-gray-900 mb-3">
                                Style de prise de décision
                              </h4>
                              <p className="text-gray-700 text-sm p-3 bg-gray-50 rounded-lg">
                                {report.careerInsights.decisionMakingStyle}
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <TrendingUp
                                className="text-indigo-600"
                                size={20}
                              />
                              Application Professionnelle
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Stratégies d'entretien
                                </h4>
                                <div className="space-y-2">
                                  {report.professionalApplication.interviewStrategies.map(
                                    (strategy, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <ChevronRight
                                          size={16}
                                          className="text-indigo-500 mt-0.5 flex-shrink-0"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {strategy}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Points forts pour CV
                                </h4>
                                <div className="space-y-2">
                                  {report.professionalApplication.resumeHighlights.map(
                                    (highlight, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <Star
                                          size={16}
                                          className="text-amber-500 mt-0.5 flex-shrink-0"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {highlight}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium text-gray-900 mb-3">
                                Personal Branding
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {report.professionalApplication.personalBranding.map(
                                  (brand, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1"
                                    >
                                      {brand}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium text-gray-900 mb-3">
                                Évolution de carrière
                              </h4>
                              <div className="space-y-2">
                                {report.professionalApplication.careerAdvancement.map(
                                  (advancement, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <TrendingUp
                                        size={16}
                                        className="text-blue-500 mt-0.5 flex-shrink-0"
                                      />
                                      <p className="text-sm text-gray-700">
                                        {advancement}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="relationships" className="space-y-6">
                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <Users className="text-indigo-600" size={20} />
                              Dynamiques Relationnelles
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Style de collaboration
                                </h4>
                                <p className="text-gray-700 text-sm p-3 bg-indigo-50 rounded-lg">
                                  {
                                    report.relationshipDynamics
                                      .collaborationStyle
                                  }
                                </p>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Résolution de conflits
                                </h4>
                                <p className="text-gray-700 text-sm p-3 bg-indigo-50 rounded-lg">
                                  {
                                    report.relationshipDynamics
                                      .conflictResolution
                                  }
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Rôle en équipe
                                </h4>
                                <p className="text-gray-700 text-sm p-3 bg-indigo-50 rounded-lg">
                                  {report.relationshipDynamics.teamRole}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Style de feedback
                                </h4>
                                <p className="text-gray-700 text-sm p-3 bg-indigo-50 rounded-lg">
                                  {report.relationshipDynamics.feedbackStyle}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium text-gray-900 mb-3">
                                Compatibilités
                              </h4>
                              <div className="grid md:grid-cols-3 gap-4">
                                <Card className="border border-emerald-200 bg-emerald-50 p-4">
                                  <h5 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
                                    <ThumbsUp size={14} />
                                    Haute compatibilité
                                  </h5>
                                  <ul className="space-y-1 text-sm text-emerald-700">
                                    {report.relationshipDynamics.compatibilities.highCompatibility.map(
                                      (item, index) => (
                                        <li key={index}>• {item}</li>
                                      )
                                    )}
                                  </ul>
                                </Card>

                                <Card className="border border-blue-200 bg-blue-50 p-4">
                                  <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                                    <Handshake size={14} />
                                    Compatibilité modérée
                                  </h5>
                                  <ul className="space-y-1 text-sm text-blue-700">
                                    {report.relationshipDynamics.compatibilities.moderateCompatibility.map(
                                      (item, index) => (
                                        <li key={index}>• {item}</li>
                                      )
                                    )}
                                  </ul>
                                </Card>

                                <Card className="border border-amber-200 bg-amber-50 p-4">
                                  <h5 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                                    <AlertTriangle size={14} />
                                    Défis potentiels
                                  </h5>
                                  <ul className="space-y-1 text-sm text-amber-700">
                                    {report.relationshipDynamics.compatibilities.potentialChallenges.map(
                                      (item, index) => (
                                        <li key={index}>• {item}</li>
                                      )
                                    )}
                                  </ul>
                                </Card>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <Heart className="text-indigo-600" size={20} />
                              Dynamiques Interpersonnelles
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Empathie
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis
                                          .interpersonalDynamics.empathy
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.interpersonalDynamics
                                        .empathy
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Assertivité
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis
                                          .interpersonalDynamics.assertiveness
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.interpersonalDynamics
                                        .assertiveness
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Collaboration
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis
                                          .interpersonalDynamics.collaboration
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.interpersonalDynamics
                                        .collaboration
                                    }
                                    className="h-2"
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      Leadership
                                    </span>
                                    <span className="font-medium">
                                      {
                                        report.voiceAnalysis
                                          .interpersonalDynamics.leadership
                                      }
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      report.voiceAnalysis.interpersonalDynamics
                                        .leadership
                                    }
                                    className="h-2"
                                  />
                                </div>
                              </div>

                              <div>
                                <p className="text-gray-700 mb-4">
                                  {
                                    report.voiceAnalysis.interpersonalDynamics
                                      .description
                                  }
                                </p>

                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                      <ThumbsUp
                                        size={14}
                                        className="text-emerald-500"
                                      />
                                      Forces
                                    </h4>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                      {report.voiceAnalysis.interpersonalDynamics.strengths.map(
                                        (strength, index) => (
                                          <li key={index}>• {strength}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                      <Target
                                        size={14}
                                        className="text-amber-500"
                                      />
                                      Défis
                                    </h4>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                      {report.voiceAnalysis.interpersonalDynamics.challenges.map(
                                        (challenge, index) => (
                                          <li key={index}>• {challenge}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="development" className="space-y-6">
                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <Lightbulb
                                className="text-indigo-600"
                                size={20}
                              />
                              Insights d'Auto-Conscience
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="space-y-3">
                              {report.developmentPlan.selfAwarenessInsights.map(
                                (insight, index) => (
                                  <Alert
                                    key={index}
                                    className="border-indigo-200 bg-indigo-50"
                                  >
                                    <AlertDescription className="text-indigo-800 flex items-start gap-2">
                                      <Lightbulb
                                        size={16}
                                        className="mt-0.5 flex-shrink-0 text-indigo-600"
                                      />
                                      <span>{insight}</span>
                                    </AlertDescription>
                                  </Alert>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center gap-2">
                                <Target className="text-indigo-600" size={20} />
                                Actions Court Terme
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <div className="space-y-3">
                                {report.developmentPlan.shortTermActions.map(
                                  (action, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                                    >
                                      <CheckCircle
                                        size={16}
                                        className="mt-0.5 flex-shrink-0 text-emerald-500"
                                      />
                                      <p className="text-sm text-gray-700">
                                        {action}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="flex items-center gap-2">
                                <TrendingUp
                                  className="text-indigo-600"
                                  size={20}
                                />
                                Développement Long Terme
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <div className="space-y-3">
                                {report.developmentPlan.longTermDevelopment.map(
                                  (development, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                                    >
                                      <Target
                                        size={16}
                                        className="mt-0.5 flex-shrink-0 text-blue-500"
                                      />
                                      <p className="text-sm text-gray-700">
                                        {development}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="text-indigo-600" size={20} />
                              Ressources Recommandées
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Livres
                                </h4>
                                <div className="space-y-2">
                                  {report.developmentPlan.recommendedResources.books.map(
                                    (book, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <BookOpen
                                          size={16}
                                          className="mt-0.5 flex-shrink-0 text-indigo-500"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {book}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Formations
                                </h4>
                                <div className="space-y-2">
                                  {report.developmentPlan.recommendedResources.courses.map(
                                    (course, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <GraduationCap
                                          size={16}
                                          className="mt-0.5 flex-shrink-0 text-purple-500"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {course}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Exercices
                                </h4>
                                <div className="space-y-2">
                                  {report.developmentPlan.recommendedResources.exercises.map(
                                    (exercise, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <Activity
                                          size={16}
                                          className="mt-0.5 flex-shrink-0 text-emerald-500"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {exercise}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Pratiques
                                </h4>
                                <div className="space-y-2">
                                  {report.developmentPlan.recommendedResources.practices.map(
                                    (practice, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <Repeat
                                          size={16}
                                          className="mt-0.5 flex-shrink-0 text-blue-500"
                                        />
                                        <p className="text-sm text-gray-700">
                                          {practice}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="text-indigo-600" size={20} />
                      Informations Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Framework</span>
                      <Badge className="bg-indigo-50 text-indigo-700">
                        Big Five (OCEAN)
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Type d'évaluation</span>
                      <Badge className="bg-blue-50 text-blue-700">
                        Adéquation Carrière
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Interviewer IA</span>
                      <Badge className="bg-purple-50 text-purple-700">
                        Sophia Insight
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Durée</span>
                      <Badge variant="outline">48 minutes</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="text-sm font-medium">15 Jan 2024</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Fiabilité</span>
                      <div className="flex items-center gap-1">
                        <Progress
                          value={report.overallProfile.reliability}
                          className="w-16 h-2"
                        />
                        <span className="text-xs font-medium">
                          {report.overallProfile.reliability}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share className="text-indigo-600" size={20} />
                      Partager Résultats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="email-share">Email</Label>
                      <div className="flex gap-2">
                        <Input
                          id="email-share"
                          placeholder="email@example.com"
                        />
                        <Button
                          size="sm"
                          className="bg-indigo-500 hover:bg-indigo-600"
                        >
                          <Mail size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Copy size={16} />
                        <span>Copier lien</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Download size={16} />
                        <span>PDF</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="text-indigo-600" size={20} />
                      Prochaines Étapes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
                      <Calendar size={16} className="mr-2" />
                      Planifier un suivi
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Users size={16} className="mr-2" />
                      Test de compatibilité d'équipe
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Briefcase size={16} className="mr-2" />
                      Coaching carrière
                    </Button>

                    <div className="pt-2">
                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertDescription className="text-amber-800 text-sm flex items-start gap-2">
                          <Lightbulb
                            size={16}
                            className="mt-0.5 flex-shrink-0 text-amber-600"
                          />
                          <span>
                            Complétez le test DISC pour une vision
                            complémentaire de votre style de communication.
                          </span>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : isCallActive ? (
            // Active Call Interface
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <img
                        src={selectedInterviewer.avatar}
                        alt={selectedInterviewer.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedInterviewer.name}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {selectedInterviewer.personality}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatTime(callDuration)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mic size={14} />
                        Audio actif
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare size={18} className="text-indigo-600" />
                      Conversation en cours
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
                          <Users size={16} className="text-indigo-600" />
                        </div>
                        <div className="flex-1 p-3 bg-indigo-50 rounded-lg rounded-tl-none">
                          <p className="text-gray-800">
                            Bonjour Jean, je suis Sophia. Nous allons explorer
                            ensemble votre personnalité à travers une
                            conversation naturelle. Pouvez-vous me parler d'un
                            projet récent dont vous êtes particulièrement fier?
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="flex-1 p-3 bg-gray-100 rounded-lg rounded-tr-none max-w-[80%]">
                          <p className="text-gray-800">
                            Bonjour Sophia. Récemment, j'ai dirigé un projet de
                            transformation digitale qui a permis d'optimiser les
                            processus internes de l'entreprise...
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
                          <Users size={16} className="text-indigo-600" />
                        </div>
                        <div className="flex-1 p-3 bg-indigo-50 rounded-lg rounded-tl-none">
                          <p className="text-gray-800">
                            Intéressant. Comment avez-vous géré les résistances
                            au changement dans ce projet? Quelle approche
                            avez-vous privilégiée?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
                    >
                      <Mic size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
                    >
                      <Pause size={20} />
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
                    >
                      <PhoneOff size={20} />
                    </Button>
                  </div>

                  <div className="mt-8">
                    <Alert className="border-indigo-200 bg-indigo-50">
                      <AlertDescription className="text-indigo-800 text-sm flex items-start gap-2">
                        <Info
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-indigo-600"
                        />
                        <span>
                          Parlez naturellement et soyez authentique. L'IA
                          analyse votre style de communication et vos traits de
                          personnalité à travers votre voix et vos réponses.
                        </span>
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content - Setup */}
              <div className="lg:col-span-2">
                <Tabs value={`step-${currentStep}`} className="space-y-6">
                  {/* Step 1: Framework Selection */}
                  <TabsContent value="step-1" className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="text-indigo-600" size={20} />
                          Choisir un Framework de Personnalité
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          {speechPersonalitySkillsData.personalityFrameworks.map(
                            framework => {
                              const Icon = getIconComponent(framework.icon);

                              return (
                                <div
                                  key={framework.id}
                                  onClick={() =>
                                    handleFrameworkSelect(framework)
                                  }
                                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                    selectedFramework.id === framework.id
                                      ? 'border-indigo-300 bg-indigo-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-4 mb-4">
                                    <div
                                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                        framework.color
                                      }`}
                                    >
                                      <Icon className="text-white" size={24} />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900">
                                        {framework.name}
                                      </h3>
                                      <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                          <Award size={12} />
                                          Validité:{' '}
                                          {framework.scientificValidity}%
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                          <Briefcase size={12} />
                                          Business:{' '}
                                          {framework.businessRelevance}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <p className="text-sm text-gray-700 mb-4">
                                    {framework.description}
                                  </p>

                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-600">
                                        Durée
                                      </span>
                                      <span className="font-medium">
                                        {framework.assessmentDuration}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-600">
                                        Développé par
                                      </span>
                                      <span className="font-medium">
                                        {framework.developedBy}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-1 mt-4">
                                    {framework.dimensions
                                      .slice(0, 3)
                                      .map((dimension, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs bg-gray-50"
                                        >
                                          {dimension}
                                        </Badge>
                                      ))}
                                    {framework.dimensions.length > 3 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-gray-50"
                                      >
                                        +{framework.dimensions.length - 3}
                                      </Badge>
                                    )}
                                  </div>

                                  {selectedFramework.id === framework.id && (
                                    <div className="absolute top-2 right-2">
                                      <CheckCircle
                                        className="text-indigo-600 bg-white rounded-full"
                                        size={24}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                            <Lightbulb size={16} />
                            Pourquoi choisir {selectedFramework.name}?
                          </h4>
                          <p className="text-sm text-blue-800">
                            Le framework {selectedFramework.name} est idéal pour
                            comprendre{' '}
                            {selectedFramework.id === 'big-five'
                              ? 'les dimensions fondamentales de votre personnalité avec une approche scientifique rigoureuse'
                              : selectedFramework.id === 'mbti'
                                ? "vos préférences cognitives et votre style de traitement de l'information"
                                : selectedFramework.id === 'disc'
                                  ? 'votre style comportemental et de communication en environnement professionnel'
                                  : selectedFramework.id === 'enneagram'
                                    ? 'vos motivations profondes et schémas comportementaux'
                                    : 'vos talents naturels et comment les optimiser pour exceller'}
                            .
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Step 2: Assessment Type Selection */}
                  <TabsContent value="step-2" className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="text-indigo-600" size={20} />
                          Choisir un Type d'Évaluation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          {speechPersonalitySkillsData.assessmentTypes.map(
                            assessment => {
                              const Icon = getIconComponent(assessment.icon);

                              return (
                                <div
                                  key={assessment.id}
                                  onClick={() =>
                                    handleAssessmentSelect(assessment)
                                  }
                                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                    selectedAssessment.id === assessment.id
                                      ? 'border-indigo-300 bg-indigo-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-4 mb-4">
                                    <div
                                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                        assessment.color
                                      }`}
                                    >
                                      <Icon className="text-white" size={24} />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900">
                                        {assessment.name}
                                      </h3>
                                      <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                          <Clock size={12} />
                                          {assessment.duration}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                          <Target size={12} />
                                          {assessment.difficulty}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <p className="text-sm text-gray-700 mb-4">
                                    {assessment.description}
                                  </p>

                                  <div className="space-y-3">
                                    <div>
                                      <h4 className="text-xs font-medium text-gray-700 mb-1">
                                        Focus principal
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {assessment.focusAreas
                                          .slice(0, 3)
                                          .map((area, index) => (
                                            <Badge
                                              key={index}
                                              variant="outline"
                                              className="text-xs bg-gray-50"
                                            >
                                              {area}
                                            </Badge>
                                          ))}
                                        {assessment.focusAreas.length > 3 && (
                                          <Badge
                                            variant="outline"
                                            className="text-xs bg-gray-50"
                                          >
                                            +{assessment.focusAreas.length - 3}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {selectedAssessment.id === assessment.id && (
                                    <div className="absolute top-2 right-2">
                                      <CheckCircle
                                        className="text-indigo-600 bg-white rounded-full"
                                        size={24}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>

                        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                          <h4 className="font-medium text-indigo-900 mb-2 flex items-center gap-2">
                            <Lightbulb size={16} />
                            Applications Business
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {selectedAssessment.businessApplications.map(
                              (application, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircle
                                    size={14}
                                    className="text-indigo-600"
                                  />
                                  <span className="text-sm text-indigo-800">
                                    {application}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Step 3: Interviewer Selection */}
                  <TabsContent value="step-3" className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="text-indigo-600" size={20} />
                          Choisir un Interviewer IA
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          {speechPersonalitySkillsData.aiInterviewers.map(
                            interviewer => (
                              <div
                                key={interviewer.id}
                                onClick={() =>
                                  handleInterviewerSelect(interviewer)
                                }
                                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                  selectedInterviewer.id === interviewer.id
                                    ? 'border-indigo-300 bg-indigo-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-4 mb-4">
                                  <img
                                    src={interviewer.avatar}
                                    alt={interviewer.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">
                                      {interviewer.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                      <span>{interviewer.personality}</span>
                                      <span>•</span>
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`${i < Math.floor(interviewer.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                            size={12}
                                          />
                                        ))}
                                        <span className="ml-1">
                                          {interviewer.rating}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-sm text-gray-700 mb-4">
                                  {interviewer.description}
                                </p>

                                <div className="space-y-3">
                                  <div>
                                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                                      Spécialisation
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                      {interviewer.specialization.map(
                                        (spec, index) => (
                                          <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs bg-gray-50"
                                          >
                                            {spec}
                                          </Badge>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <Clock size={12} />
                                      {interviewer.experience}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <MessageSquare size={12} />
                                      {interviewer.style}
                                    </span>
                                  </div>
                                </div>

                                {selectedInterviewer.id === interviewer.id && (
                                  <div className="absolute top-2 right-2">
                                    <CheckCircle
                                      className="text-indigo-600 bg-white rounded-full"
                                      size={24}
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Step 4: Schedule Call */}
                  <TabsContent value="step-4" className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="text-indigo-600" size={20} />
                          Planifier votre Entretien
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-4">
                              Type d'appel
                            </h3>
                            <div className="flex gap-4">
                              <div
                                onClick={() => setCallType('web_call')}
                                className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  callType === 'web_call'
                                    ? 'border-indigo-300 bg-indigo-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex flex-col items-center gap-2">
                                  <Video
                                    size={24}
                                    className={
                                      callType === 'web_call'
                                        ? 'text-indigo-600'
                                        : 'text-gray-400'
                                    }
                                  />
                                  <span className="font-medium text-gray-900">
                                    Appel Vidéo
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Recommandé
                                  </span>
                                </div>
                              </div>

                              <div
                                onClick={() => setCallType('phone_call')}
                                className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  callType === 'phone_call'
                                    ? 'border-indigo-300 bg-indigo-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex flex-col items-center gap-2">
                                  <Phone
                                    size={24}
                                    className={
                                      callType === 'phone_call'
                                        ? 'text-indigo-600'
                                        : 'text-gray-400'
                                    }
                                  />
                                  <span className="font-medium text-gray-900">
                                    Appel Téléphonique
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Alternative
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium text-gray-900 mb-4">
                              Informations
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                  <Clock
                                    size={16}
                                    className="text-indigo-600"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    Durée estimée
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {selectedAssessment.duration}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                  <Headphones
                                    size={16}
                                    className="text-indigo-600"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    Équipement nécessaire
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Microphone de qualité, environnement calme
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                  <Brain
                                    size={16}
                                    className="text-indigo-600"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    Préparation
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Aucune préparation requise, soyez simplement
                                    vous-même
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="font-medium text-gray-900 mb-4">
                            Créneaux disponibles
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-700">
                                16 Janvier 2024
                              </h4>
                              <Badge variant="outline">Aujourd'hui</Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {speechPersonalitySkillsData.availableSlots
                                .filter(
                                  slot =>
                                    slot.date === '2024-01-16' && slot.available
                                )
                                .map(slot => (
                                  <div
                                    key={slot.id}
                                    onClick={() => handleSlotSelect(slot)}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                      selectedSlot?.id === slot.id
                                        ? 'border-indigo-300 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">
                                        {slot.time}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {slot.duration}
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <Users size={12} />
                                      <span>{slot.aiInterviewer}</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-700">
                                17 Janvier 2024
                              </h4>
                              <Badge variant="outline">Demain</Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {speechPersonalitySkillsData.availableSlots
                                .filter(
                                  slot =>
                                    slot.date === '2024-01-17' && slot.available
                                )
                                .map(slot => (
                                  <div
                                    key={slot.id}
                                    onClick={() => handleSlotSelect(slot)}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                      selectedSlot?.id === slot.id
                                        ? 'border-indigo-300 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">
                                        {slot.time}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {slot.duration}
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <Users size={12} />
                                      <span>{slot.aiInterviewer}</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Alert className="border-amber-200 bg-amber-50">
                            <AlertDescription className="text-amber-800 text-sm flex items-start gap-2">
                              <Info
                                size={16}
                                className="mt-0.5 flex-shrink-0 text-amber-600"
                              />
                              <span>
                                Pour des résultats optimaux, choisissez un
                                moment où vous serez dans un environnement calme
                                et pourrez parler librement pendant toute la
                                durée de l'entretien.
                              </span>
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Précédent
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={currentStep === 4}
                    className="bg-indigo-500 hover:bg-indigo-600"
                  >
                    Suivant
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-sm sticky top-6 mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="text-indigo-600" size={20} />
                      Votre Profil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tests complétés</span>
                      <Badge
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700"
                      >
                        {speechPersonalitySkillsData.userProgress.totalSessions}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Types découverts</span>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700"
                      >
                        {
                          speechPersonalitySkillsData.userProgress
                            .discoveredTypes
                        }
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Frameworks explorés</span>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        {
                          speechPersonalitySkillsData.userProgress
                            .frameworksExplored
                        }
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Temps total</span>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700"
                      >
                        {
                          speechPersonalitySkillsData.userProgress
                            .totalTimeSpent
                        }
                      </Badge>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Traits dominants
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {speechPersonalitySkillsData.userProgress.dominantTraits.map(
                          (trait, index) => (
                            <Badge
                              key={index}
                              className="bg-indigo-50 text-indigo-700"
                            >
                              {trait}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Axes de développement
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {speechPersonalitySkillsData.userProgress.developmentAreas.map(
                          (area, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              {area}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="text-indigo-600" size={20} />
                      Évolution Personnalité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {speechPersonalitySkillsData.userProgress.personalityEvolution.map(
                        (evolution, index) => (
                          <div
                            key={index}
                            className="p-3 border border-gray-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <Badge className="bg-indigo-100 text-indigo-700">
                                {evolution.framework}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {evolution.date}
                              </span>
                            </div>
                            <p className="font-medium text-gray-900 mb-1">
                              {evolution.type}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">Stabilité</span>
                              <div className="flex items-center gap-1">
                                <Progress
                                  value={evolution.stability}
                                  className="w-16 h-1.5"
                                />
                                <span>{evolution.stability}%</span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="text-amber-500" size={20} />
                      Conseils
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {speechPersonalitySkillsData.personalityTips
                      .slice(0, 3)
                      .map((tip, index) => (
                        <Alert
                          key={index}
                          className="border-blue-200 bg-blue-50"
                        >
                          <AlertDescription className="text-blue-800 text-sm">
                            {tip}
                          </AlertDescription>
                        </Alert>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      <ChatWidget />
    </div>
  );
}

function Handshake(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
    </svg>
  );
}

function BookOpen(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}

function GraduationCap(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
    </svg>
  );
}

function Repeat(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4"></path>
      <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
      <path d="m7 22-4-4 4-4"></path>
      <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
    </svg>
  );
}

function PhoneOff(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
      <line x1="2" x2="22" y1="2" y2="22"></line>
    </svg>
  );
}

function User(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
