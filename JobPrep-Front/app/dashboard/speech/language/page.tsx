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
  Globe,
  Phone,
  Video,
  Calendar,
  Clock,
  Star,
  Award,
  TrendingUp,
  Users,
  MessageSquare,
  Mic,
  Volume2,
  BookOpen,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  BarChart3,
  Settings,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Info,
  Headphones,
  Languages,
  FileText,
  Timer,
  Activity,
  Gauge,
  Smile,
  Frown,
  Meh,
  ChevronRight,
  ChevronDown,
  Filter,
  Search,
  Share,
  Bookmark,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  Trophy,
  Flag,
  Cpu,
  Heart,
  Brain,
  Ear,
} from 'lucide-react';
import { speechLanguageSkillsData } from '@/lib/speechLanguageSkillsData';

export default function SpeechLanguageSkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    speechLanguageSkillsData.supportedLanguages[0]
  );
  const [selectedFocus, setSelectedFocus] = useState(
    speechLanguageSkillsData.skillFocusAreas[0]
  );
  const [selectedLevel, setSelectedLevel] = useState('B2');
  const [selectedInterviewer, setSelectedInterviewer] = useState(
    speechLanguageSkillsData.aiInterviewers[0]
  );
  const [callType, setCallType] = useState<'web_call' | 'phone_call'>(
    'web_call'
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(
    speechLanguageSkillsData.availableSlots[0]
  );
  const [showReport, setShowReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState(
    speechLanguageSkillsData.sessionReports[0]
  );

  const handleStartCall = () => {
    setIsCallActive(true);
    setCurrentStep(4);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setShowReport(true);
    setCurrentStep(5);
  };

  const handleStepChange = (step: number) => {
    if (!isCallActive) {
      setCurrentStep(step);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

  const steps = [
    { id: 1, title: 'Langue', icon: Globe },
    { id: 2, title: 'Compétence', icon: Target },
    { id: 3, title: 'Planification', icon: Calendar },
    { id: 4, title: 'Entretien', icon: Mic },
    { id: 5, title: 'Rapport', icon: FileText },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getLanguageFlag = (languageId: string) => {
    const language = speechLanguageSkillsData.supportedLanguages.find(
      l => l.id === languageId
    );
    return language?.flag || '🌐';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Facile: 'border-green-200 text-green-700 bg-green-50',
      Modérée: 'border-amber-200 text-amber-700 bg-amber-50',
      Difficile: 'border-orange-200 text-orange-700 bg-orange-50',
      'Très Difficile': 'border-red-200 text-red-700 bg-red-50',
    };
    return (
      colors[difficulty as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const getLevelColor = (level: string) => {
    const colors = {
      A1: 'border-red-200 text-red-700 bg-red-50',
      A2: 'border-orange-200 text-orange-700 bg-orange-50',
      B1: 'border-amber-200 text-amber-700 bg-amber-50',
      B2: 'border-blue-200 text-blue-700 bg-blue-50',
      C1: 'border-emerald-200 text-emerald-700 bg-emerald-50',
      C2: 'border-purple-200 text-purple-700 bg-purple-50',
    };
    return (
      colors[level as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50';
    if (score >= 70) return 'bg-blue-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-red-50';
  };

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
                <BreadcrumbLink href="/dashboard/speech">
                  Speech Tests
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Language Skills</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Globe className="text-blue-600" size={32} />
                Évaluation Linguistique Vocale IA
              </h1>
              <p className="text-gray-600">
                Perfectionnez vos compétences linguistiques avec des entretiens
                vocaux personnalisés et une analyse IA avancée
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen size={16} />
                Guide
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Rapport
              </Button>
              {!isCallActive && (
                <Button
                  onClick={handleStartCall}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center gap-2"
                >
                  <Play size={16} />
                  Commencer Entretien
                </Button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <Card className="mb-6 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const status = getStepStatus(step.id);

                  return (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => handleStepChange(step.id)}
                        disabled={isCallActive}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          status === 'current'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        } ${isCallActive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      >
                        {status === 'completed' ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Icon size={20} />
                        )}
                        <span className="font-medium">{step.title}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <ArrowRight className="mx-4 text-gray-400" size={20} />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Call Status */}
          {isCallActive && (
            <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-blue-900">
                        Entretien en cours
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="text-indigo-600" size={20} />
                      <span className="font-medium text-indigo-900">
                        Durée: {formatTime(callDuration)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="text-blue-600" size={20} />
                      <span className="font-medium text-blue-900">
                        {selectedLanguage.name} - {selectedFocus.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pause size={16} className="mr-2" />
                      Pause
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleEndCall}
                    >
                      <Phone size={16} className="mr-2" />
                      Terminer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={`step-${currentStep}`} className="space-y-6">
                {/* Step 1: Language Selection */}
                <TabsContent value="step-1" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="text-blue-600" size={20} />
                        Choisir la Langue Cible
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {speechLanguageSkillsData.supportedLanguages.map(
                          language => (
                            <div
                              key={language.id}
                              onClick={() => setSelectedLanguage(language)}
                              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                selectedLanguage.id === language.id
                                  ? 'border-blue-300 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl">{language.flag}</div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {language.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {language.nativeName}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    Difficulté
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getDifficultyColor(
                                      language.difficulty
                                    )}
                                  >
                                    {language.difficulty}
                                  </Badge>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    Importance Business
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={language.businessImportance}
                                      className="w-16 h-2"
                                    />
                                    <span className="text-xs">
                                      {language.businessImportance}%
                                    </span>
                                  </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    Locuteurs
                                  </span>
                                  <span className="font-medium">
                                    {language.globalSpeakers}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Secteurs clés
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {language.industries
                                    .slice(0, 3)
                                    .map((industry, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs bg-gray-50"
                                      >
                                        {industry}
                                      </Badge>
                                    ))}
                                  {language.industries.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-gray-50"
                                    >
                                      +{language.industries.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {selectedLanguage.id === language.id && (
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
                          Basé sur votre profil professionnel, nous recommandons
                          de commencer par
                          <strong> {selectedLanguage.name}</strong> pour
                          maximiser votre impact international.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 2: Skill Focus */}
                <TabsContent value="step-2" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="text-emerald-600" size={20} />
                        Compétence à Développer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {speechLanguageSkillsData.skillFocusAreas.map(focus => (
                          <div
                            key={focus.id}
                            onClick={() => setSelectedFocus(focus)}
                            className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                              selectedFocus.id === focus.id
                                ? 'border-emerald-300 bg-emerald-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">
                                  {focus.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                  {focus.description}
                                </p>

                                <div className="grid md:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center gap-2">
                                    <Clock
                                      size={14}
                                      className="text-gray-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                      {focus.duration}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Gauge
                                      size={14}
                                      className="text-gray-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                      {focus.difficulty}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Target
                                      size={14}
                                      className="text-gray-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                      {focus.focusPoints.length} points clés
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {selectedFocus.id === focus.id && (
                                <CheckCircle
                                  className="text-emerald-600 flex-shrink-0"
                                  size={24}
                                />
                              )}
                            </div>

                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Points d'évaluation
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {focus.focusPoints.map((point, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-blue-50 text-blue-700"
                                    >
                                      {point}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Scénarios types
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {focus.scenarios.map((scenario, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-emerald-50 text-emerald-700"
                                    >
                                      {scenario}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                        <h4 className="font-medium text-emerald-900 mb-2 flex items-center gap-2">
                          <Info size={16} />
                          Niveau recommandé
                        </h4>
                        <div className="space-y-2 text-sm text-emerald-800">
                          <p>
                            • <strong>Durée:</strong> {selectedFocus.duration}
                          </p>
                          <p>
                            • <strong>Niveau minimum:</strong>{' '}
                            {selectedFocus.difficulty}
                          </p>
                          <p>
                            • <strong>Focus:</strong>{' '}
                            {selectedFocus.focusPoints.join(', ')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 3: Scheduling */}
                <TabsContent value="step-3" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="text-purple-600" size={20} />
                        Planifier l'Entretien
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Call Type Selection */}
                        <div>
                          <Label className="text-base font-medium mb-4 block">
                            Type d'entretien
                          </Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div
                              onClick={() => setCallType('web_call')}
                              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                                callType === 'web_call'
                                  ? 'border-purple-300 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <Video className="text-purple-600" size={24} />
                                <h3 className="font-semibold text-gray-900">
                                  Appel Vidéo Web
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Entretien vidéo avec analyse complète du langage
                                corporel et de l'expression faciale
                              </p>
                              <div className="space-y-1 text-xs text-gray-500">
                                <p>✓ Analyse vidéo avancée</p>
                                <p>✓ Partage d'écran possible</p>
                                <p>✓ Enregistrement de session</p>
                                <p>✓ Feedback visuel en temps réel</p>
                              </div>
                            </div>

                            <div
                              onClick={() => setCallType('phone_call')}
                              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                                callType === 'phone_call'
                                  ? 'border-purple-300 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <Phone className="text-purple-600" size={24} />
                                <h3 className="font-semibold text-gray-900">
                                  Appel Téléphonique
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Focus 100% sur la communication vocale et
                                l'écoute active
                              </p>
                              <div className="space-y-1 text-xs text-gray-500">
                                <p>✓ Concentration maximale sur l'audio</p>
                                <p>✓ Simulation conditions réelles</p>
                                <p>✓ Analyse vocale approfondie</p>
                                <p>✓ Moins de distractions visuelles</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Level Selection */}
                        <div>
                          <Label className="text-base font-medium mb-4 block">
                            Niveau CECRL cible
                          </Label>
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                              <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`p-3 border-2 rounded-lg transition-all ${
                                  selectedLevel === level
                                    ? 'border-blue-300 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="font-bold text-lg">
                                    {level}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {level === 'A1'
                                      ? 'Débutant'
                                      : level === 'A2'
                                        ? 'Élémentaire'
                                        : level === 'B1'
                                          ? 'Intermédiaire'
                                          : level === 'B2'
                                            ? 'Intermédiaire+'
                                            : level === 'C1'
                                              ? 'Avancé'
                                              : 'Maîtrise'}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interviewer Selection */}
                        <div>
                          <Label className="text-base font-medium mb-4 block">
                            Choisir votre intervieweur IA
                          </Label>
                          <div className="space-y-4">
                            {speechLanguageSkillsData.aiInterviewers
                              .filter(
                                interviewer =>
                                  interviewer.nativeLanguage ===
                                  selectedLanguage.nativeName
                              )
                              .map(interviewer => (
                                <div
                                  key={interviewer.id}
                                  onClick={() =>
                                    setSelectedInterviewer(interviewer)
                                  }
                                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    selectedInterviewer.id === interviewer.id
                                      ? 'border-purple-300 bg-purple-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={interviewer.avatar}
                                      alt={interviewer.name}
                                      className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold text-gray-900">
                                          {interviewer.name}
                                        </h4>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {interviewer.accent}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                          <Star
                                            className="text-amber-400 fill-current"
                                            size={14}
                                          />
                                          <span className="text-sm">
                                            {interviewer.rating}
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-sm text-gray-600 mb-2">
                                        {interviewer.description}
                                      </p>
                                      <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span>{interviewer.experience}</span>
                                        <span>{interviewer.style}</span>
                                      </div>
                                    </div>
                                    {selectedInterviewer.id ===
                                      interviewer.id && (
                                      <CheckCircle
                                        className="text-purple-600"
                                        size={24}
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Available Slots */}
                        <div>
                          <Label className="text-base font-medium mb-4 block">
                            Créneaux disponibles
                          </Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            {speechLanguageSkillsData.availableSlots
                              .filter(
                                slot =>
                                  slot.available &&
                                  slot.language === selectedLanguage.nativeName
                              )
                              .map(slot => (
                                <div
                                  key={slot.id}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    selectedSlot.id === slot.id
                                      ? 'border-purple-300 bg-purple-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Calendar
                                        size={16}
                                        className="text-purple-600"
                                      />
                                      <span className="font-medium">
                                        {slot.date}
                                      </span>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {slot.price}€
                                    </Badge>
                                  </div>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                      <Clock size={14} />
                                      <span>
                                        {slot.time} ({slot.duration})
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Users size={14} />
                                      <span>{slot.aiInterviewer}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Target size={14} />
                                      <span>{slot.focus}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 4: Interview */}
                <TabsContent value="step-4" className="space-y-6">
                  {isCallActive ? (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mic className="text-emerald-600" size={20} />
                          Entretien en cours - {selectedLanguage.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Call Interface */}
                          <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                              <img
                                src={selectedInterviewer.avatar}
                                alt={selectedInterviewer.name}
                                className="w-20 h-20 rounded-full object-cover"
                              />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {selectedInterviewer.name}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {selectedInterviewer.accent}
                            </p>
                            <div className="flex items-center justify-center gap-4 mb-6">
                              <Badge className="bg-blue-100 text-blue-700">
                                {selectedLanguage.name}
                              </Badge>
                              <Badge className="bg-emerald-100 text-emerald-700">
                                {selectedFocus.name}
                              </Badge>
                              <Badge className="bg-purple-100 text-purple-700">
                                Niveau {selectedLevel}
                              </Badge>
                            </div>

                            <div className="text-2xl font-bold text-blue-600 mb-2">
                              {formatTime(callDuration)}
                            </div>
                            <p className="text-gray-500 mb-6">
                              Durée de l'entretien
                            </p>

                            <div className="flex justify-center gap-4">
                              <Button variant="outline" size="lg">
                                <Pause size={20} className="mr-2" />
                                Pause
                              </Button>
                              <Button
                                variant="destructive"
                                size="lg"
                                onClick={handleEndCall}
                              >
                                <Phone size={20} className="mr-2" />
                                Terminer l'entretien
                              </Button>
                            </div>
                          </div>

                          {/* Real-time Feedback */}
                          <div className="grid md:grid-cols-3 gap-4">
                            <Card className="p-4 bg-emerald-50 border-emerald-200">
                              <h4 className="font-medium text-emerald-900 mb-2 flex items-center gap-2">
                                <Volume2 size={16} />
                                Prononciation
                              </h4>
                              <div className="flex items-center gap-2">
                                <Progress value={85} className="flex-1" />
                                <span className="text-sm font-medium text-emerald-700">
                                  85%
                                </span>
                              </div>
                            </Card>

                            <Card className="p-4 bg-blue-50 border-blue-200">
                              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                                <Zap size={16} />
                                Fluidité
                              </h4>
                              <div className="flex items-center gap-2">
                                <Progress value={78} className="flex-1" />
                                <span className="text-sm font-medium text-blue-700">
                                  78%
                                </span>
                              </div>
                            </Card>

                            <Card className="p-4 bg-purple-50 border-purple-200">
                              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                                <Heart size={16} />
                                Confiance
                              </h4>
                              <div className="flex items-center gap-2">
                                <Progress value={82} className="flex-1" />
                                <span className="text-sm font-medium text-purple-700">
                                  82%
                                </span>
                              </div>
                            </Card>
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
                            <Globe className="text-emerald-600" size={32} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Entretien {selectedLanguage.name} -{' '}
                            {selectedFocus.name}
                          </h3>
                          <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Vous êtes sur le point de commencer votre entretien
                            linguistique. Assurez-vous d'être dans un
                            environnement calme.
                          </p>
                          <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
                            <div className="text-center">
                              <Globe
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedLanguage.name}
                              </p>
                              <p className="text-xs text-gray-600">Langue</p>
                            </div>
                            <div className="text-center">
                              <Target
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedFocus.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                Compétence
                              </p>
                            </div>
                            <div className="text-center">
                              <Award
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                Niveau {selectedLevel}
                              </p>
                              <p className="text-xs text-gray-600">Objectif</p>
                            </div>
                            <div className="text-center">
                              <Clock
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedFocus.duration}
                              </p>
                              <p className="text-xs text-gray-600">Durée</p>
                            </div>
                          </div>
                          <Button
                            onClick={handleStartCall}
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

                {/* Step 5: Report */}
                <TabsContent value="step-5" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="text-blue-600" size={20} />
                        Rapport d'Évaluation Linguistique
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overall Score */}
                        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                          <div
                            className={`text-6xl font-bold ${getScoreColor(selectedReport.overallScore)} mb-2`}
                          >
                            {selectedReport.overallScore}%
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Niveau {selectedReport.cefrLevel} -{' '}
                            {selectedReport.estimatedLevel}
                          </h3>
                          <p className="text-gray-600 max-w-md mx-auto mb-4">
                            Excellente performance avec des compétences solides
                            en communication professionnelle
                          </p>

                          <div className="flex items-center justify-center gap-4 mb-4">
                            <Badge className="bg-blue-100 text-blue-700">
                              {selectedReport.languagesUsed.join(', ')}
                            </Badge>
                            <Badge className="bg-emerald-100 text-emerald-700">
                              {selectedReport.duration}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700">
                              {selectedReport.questionsAnswered} questions
                            </Badge>
                          </div>

                          {selectedReport.certificateEarned && (
                            <div className="mt-4">
                              <Badge className="bg-amber-500 text-white px-4 py-2">
                                <Award size={16} className="mr-2" />
                                Certificat {selectedLanguage.name}{' '}
                                {selectedReport.cefrLevel} obtenu !
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Detailed Scores */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Analyse Détaillée par Compétence
                          </h4>
                          <div className="space-y-4">
                            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                  <Volume2
                                    className="text-blue-600"
                                    size={18}
                                  />
                                  Prononciation
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-lg font-bold ${getScoreColor(selectedReport.voiceAnalysis.pronunciation.score)}`}
                                  >
                                    {
                                      selectedReport.voiceAnalysis.pronunciation
                                        .score
                                    }
                                    %
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getScoreBg(
                                      selectedReport.voiceAnalysis.pronunciation
                                        .score
                                    )}
                                  >
                                    {
                                      selectedReport.voiceAnalysis.pronunciation
                                        .level
                                    }
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {
                                  selectedReport.voiceAnalysis.pronunciation
                                    .description
                                }
                              </p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                                    <ThumbsUp
                                      size={14}
                                      className="text-emerald-500"
                                    />
                                    Points forts
                                  </h5>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {selectedReport.voiceAnalysis.pronunciation.strengths.map(
                                      (strength, index) => (
                                        <li key={index}>• {strength}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                                    <Target
                                      size={14}
                                      className="text-amber-500"
                                    />
                                    À améliorer
                                  </h5>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {selectedReport.voiceAnalysis.pronunciation.improvements.map(
                                      (improvement, index) => (
                                        <li key={index}>• {improvement}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                  <Zap className="text-emerald-600" size={18} />
                                  Fluidité
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-lg font-bold ${getScoreColor(selectedReport.voiceAnalysis.fluency.score)}`}
                                  >
                                    {selectedReport.voiceAnalysis.fluency.score}
                                    %
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getScoreBg(
                                      selectedReport.voiceAnalysis.fluency.score
                                    )}
                                  >
                                    {selectedReport.voiceAnalysis.fluency.level}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {
                                  selectedReport.voiceAnalysis.fluency
                                    .description
                                }
                              </p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                                    <ThumbsUp
                                      size={14}
                                      className="text-emerald-500"
                                    />
                                    Points forts
                                  </h5>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {selectedReport.voiceAnalysis.fluency.strengths.map(
                                      (strength, index) => (
                                        <li key={index}>• {strength}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                                    <Target
                                      size={14}
                                      className="text-amber-500"
                                    />
                                    À améliorer
                                  </h5>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {selectedReport.voiceAnalysis.fluency.improvements.map(
                                      (improvement, index) => (
                                        <li key={index}>• {improvement}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                  <BookOpen
                                    className="text-purple-600"
                                    size={18}
                                  />
                                  Vocabulaire
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-lg font-bold ${getScoreColor(selectedReport.voiceAnalysis.vocabulary.score)}`}
                                  >
                                    {
                                      selectedReport.voiceAnalysis.vocabulary
                                        .score
                                    }
                                    %
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getScoreBg(
                                      selectedReport.voiceAnalysis.vocabulary
                                        .score
                                    )}
                                  >
                                    {
                                      selectedReport.voiceAnalysis.vocabulary
                                        .level
                                    }
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {
                                  selectedReport.voiceAnalysis.vocabulary
                                    .description
                                }
                              </p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                                    <ThumbsUp
                                      size={14}
                                      className="text-emerald-500"
                                    />
                                    Points forts
                                  </h5>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {selectedReport.voiceAnalysis.vocabulary.strengths.map(
                                      (strength, index) => (
                                        <li key={index}>• {strength}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                                    <Target
                                      size={14}
                                      className="text-amber-500"
                                    />
                                    À améliorer
                                  </h5>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {selectedReport.voiceAnalysis.vocabulary.improvements.map(
                                      (improvement, index) => (
                                        <li key={index}>• {improvement}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Feedback Categories */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Feedback par Contexte
                          </h4>
                          <div className="space-y-4">
                            {selectedReport.detailedFeedback.map(
                              (feedback, index) => (
                                <Card
                                  key={index}
                                  className="p-4 border border-gray-200"
                                >
                                  <h5 className="font-medium text-gray-900 mb-2">
                                    {feedback.category}
                                  </h5>
                                  <p className="text-sm text-gray-600 mb-3">
                                    {feedback.feedback}
                                  </p>
                                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                                    <div>
                                      <h6 className="font-medium text-gray-800 mb-1">
                                        Exemples spécifiques:
                                      </h6>
                                      <ul className="space-y-1 text-gray-600">
                                        {feedback.specificExamples.map(
                                          (example, i) => (
                                            <li key={i}>• {example}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                    <div>
                                      <h6 className="font-medium text-gray-800 mb-1">
                                        Recommandations:
                                      </h6>
                                      <ul className="space-y-1 text-gray-600">
                                        {feedback.recommendations.map(
                                          (rec, i) => (
                                            <li key={i}>• {rec}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </Card>
                              )
                            )}
                          </div>
                        </div>

                        {/* Learning Path */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="text-blue-600" size={20} />
                            Parcours d'Apprentissage
                          </h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <Card className="p-4 bg-blue-50 border-blue-200">
                              <h5 className="font-medium text-blue-900 mb-2">
                                Court terme (1-2 mois)
                              </h5>
                              <ul className="text-sm text-blue-800 space-y-1">
                                {selectedReport.learningPath.shortTerm.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <ChevronRight
                                        size={14}
                                        className="mt-1 flex-shrink-0"
                                      />
                                      <span>{item}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </Card>
                            <Card className="p-4 bg-purple-50 border-purple-200">
                              <h5 className="font-medium text-purple-900 mb-2">
                                Moyen terme (3-6 mois)
                              </h5>
                              <ul className="text-sm text-purple-800 space-y-1">
                                {selectedReport.learningPath.mediumTerm.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <ChevronRight
                                        size={14}
                                        className="mt-1 flex-shrink-0"
                                      />
                                      <span>{item}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </Card>
                            <Card className="p-4 bg-emerald-50 border-emerald-200">
                              <h5 className="font-medium text-emerald-900 mb-2">
                                Long terme (6-12 mois)
                              </h5>
                              <ul className="text-sm text-emerald-800 space-y-1">
                                {selectedReport.learningPath.longTerm.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <ChevronRight
                                        size={14}
                                        className="mt-1 flex-shrink-0"
                                      />
                                      <span>{item}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </Card>
                          </div>
                          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-sm text-amber-800 flex items-center gap-2">
                              <Clock size={16} />
                              <span>
                                <strong>
                                  Temps estimé pour atteindre le niveau
                                  supérieur:
                                </strong>{' '}
                                {
                                  selectedReport.learningPath
                                    .estimatedTimeToNextLevel
                                }
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-6 border-t">
                          <Button className="bg-blue-500 hover:bg-blue-600">
                            <Download size={16} className="mr-2" />
                            Télécharger le rapport
                          </Button>
                          <Button variant="outline">
                            <Share size={16} className="mr-2" />
                            Partager les résultats
                          </Button>
                          <Button variant="outline">
                            <Calendar size={16} className="mr-2" />
                            Planifier prochain entretien
                          </Button>
                          <Button variant="outline">
                            <BookOpen size={16} className="mr-2" />
                            Ressources d'apprentissage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation Buttons */}
              {!isCallActive && (
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleStepChange(Math.max(1, currentStep - 1))
                    }
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Précédent
                  </Button>
                  <Button
                    onClick={() =>
                      handleStepChange(Math.min(5, currentStep + 1))
                    }
                    disabled={currentStep === 5}
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
                    Progression Linguistique
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Niveau actuel</span>
                    <Badge
                      variant="outline"
                      className={getLevelColor(
                        speechLanguageSkillsData.userProgress.currentLevel
                      )}
                    >
                      {speechLanguageSkillsData.userProgress.currentLevel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Score moyen</span>
                    <Badge
                      variant="outline"
                      className={getScoreBg(
                        speechLanguageSkillsData.userProgress.averageScore
                      )}
                    >
                      {speechLanguageSkillsData.userProgress.averageScore}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Langues étudiées</span>
                    <div className="flex gap-1">
                      {speechLanguageSkillsData.userProgress.strongestLanguages.map(
                        (lang, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            {lang}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps total</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700"
                    >
                      {speechLanguageSkillsData.userProgress.totalTimeSpent}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificats obtenus</span>
                    <div className="flex items-center gap-2">
                      <Award className="text-amber-500" size={16} />
                      <span className="font-medium">
                        {
                          speechLanguageSkillsData.userProgress
                            .certificatesEarned
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-emerald-600" size={20} />
                    Évolution Linguistique
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {speechLanguageSkillsData.userProgress.languageEvolution.map(
                    (evolution, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">
                                {evolution.language}
                              </span>
                              <Badge
                                variant="outline"
                                className={getLevelColor(evolution.level)}
                              >
                                {evolution.level}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <ArrowRight
                                size={12}
                                className="text-emerald-500"
                              />
                              <span className="text-xs text-emerald-600">
                                +{evolution.improvement}%
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {evolution.date}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-amber-600" size={20} />
                    Conseils Linguistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {speechLanguageSkillsData.languageTips
                    .slice(0, 5)
                    .map((tip, index) => (
                      <Alert key={index} className="border-blue-200 bg-blue-50">
                        <AlertDescription className="text-blue-800 text-sm">
                          {tip}
                        </AlertDescription>
                      </Alert>
                    ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="text-indigo-600" size={20} />
                    Impact Professionnel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2 flex items-center gap-2">
                      <TrendingUp size={16} />
                      Impact Salarial Estimé
                    </h4>
                    <p className="text-sm text-indigo-800 font-bold">
                      {
                        speechLanguageSkillsData.businessImpact.salaryIncrease[
                          selectedLevel as keyof typeof speechLanguageSkillsData.businessImpact.salaryIncrease
                        ]
                      }
                    </p>
                    <p className="text-xs text-indigo-700 mt-1">
                      Pour le niveau {selectedLevel} en {selectedLanguage.name}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-medium text-emerald-900 mb-2 flex items-center gap-2">
                      <Briefcase size={16} />
                      Opportunités de Carrière
                    </h4>
                    <p className="text-sm text-emerald-800">
                      {
                        speechLanguageSkillsData.businessImpact
                          .careerOpportunities[
                          selectedLevel as keyof typeof speechLanguageSkillsData.businessImpact.careerOpportunities
                        ]
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <ChatWidget />
    </div>
  );
}
