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
  Languages,
  Mic,
  Headphones,
  FileText,
  MessageSquare,
  Video,
  Award,
  Clock,
  TrendingUp,
  Users,
  Target,
  Zap,
  Star,
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
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  Share,
  Calendar,
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
  Flag,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  Trophy,
  Brain,
  Ear,
  Pen,
  Phone,
} from 'lucide-react';
import { languageSkillsData } from '@/lib/languageSkillsData';

export default function LanguageSkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageSkillsData.languages[0]
  );
  const [selectedSkill, setSelectedSkill] = useState(
    languageSkillsData.skillTypes[0]
  );
  const [selectedTest, setSelectedTest] = useState(languageSkillsData.tests[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [testResults, setTestResults] = useState(
    languageSkillsData.testResults[0]
  );
  const [audioLevel, setAudioLevel] = useState(0);

  const handleStartTest = () => {
    setIsTestActive(true);
    setCurrentStep(4);
  };

  const handleAnswerSelect = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTestCompleted(true);
      setIsTestActive(false);
      setCurrentStep(5);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

  const steps = [
    { id: 1, title: 'Langue', icon: Globe },
    { id: 2, title: 'Compétence', icon: Target },
    { id: 3, title: 'Test', icon: FileText },
    { id: 4, title: 'Évaluation', icon: Mic },
    { id: 5, title: 'Résultats', icon: Award },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-red-50';
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

  const getProficiencyLabel = (level: string) => {
    const labels = {
      A1: 'Débutant',
      A2: 'Élémentaire',
      B1: 'Intermédiaire',
      B2: 'Intermédiaire Avancé',
      C1: 'Avancé',
      C2: 'Maîtrise',
    };
    return labels[level as keyof typeof labels] || level;
  };

  const currentQuestionData = selectedTest.questions[currentQuestion];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate audio level changes during recording
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setAudioLevel(0);
      }, 3000);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
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
                <BreadcrumbLink href="/dashboard/tests">Tests</BreadcrumbLink>
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
                <Languages className="text-blue-600" size={32} />
                Évaluation Linguistique IA
              </h1>
              <p className="text-gray-600">
                Évaluez et certifiez vos compétences linguistiques avec notre IA
                avancée de reconnaissance vocale
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen size={16} />
                Guide CECRL
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Certificat
              </Button>
              {!isTestActive && (
                <Button
                  onClick={handleStartTest}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center gap-2"
                >
                  <Play size={16} />
                  Commencer Test
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
                        disabled={isTestActive}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          status === 'current'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        } ${isTestActive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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

          {/* Test Timer */}
          {isTestActive && (
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
                        {selectedTest.questions.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="text-purple-600" size={20} />
                      <span className="font-medium text-purple-900">
                        {selectedLanguage.name} - {selectedSkill.name}
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
                    (currentQuestion / selectedTest.questions.length) * 100
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
                {/* Step 1: Language Selection */}
                <TabsContent value="step-1" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="text-blue-600" size={20} />
                        Choisir une Langue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {languageSkillsData.languages.map(language => (
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
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                                {language.flag}
                              </div>
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
                                  Tests disponibles
                                </span>
                                <span className="font-medium">
                                  {language.testsAvailable}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Locuteurs natifs
                                </span>
                                <span className="font-medium">
                                  {language.nativeSpeakers}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Difficulté
                                </span>
                                <Badge
                                  variant="outline"
                                  className={
                                    language.difficulty === 'Facile'
                                      ? 'border-green-200 text-green-700 bg-green-50'
                                      : language.difficulty === 'Modérée'
                                        ? 'border-amber-200 text-amber-700 bg-amber-50'
                                        : 'border-red-200 text-red-700 bg-red-50'
                                  }
                                >
                                  {language.difficulty}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 text-sm">
                                Régions principales
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {language.regions
                                  .slice(0, 3)
                                  .map((region, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-gray-50"
                                    >
                                      {region}
                                    </Badge>
                                  ))}
                                {language.regions.length > 3 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-gray-50"
                                  >
                                    +{language.regions.length - 3}
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
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                          <Lightbulb size={16} />
                          Recommandation IA
                        </h4>
                        <p className="text-sm text-blue-800">
                          Basé sur votre profil professionnel et vos objectifs
                          de carrière, nous recommandons de commencer par
                          <strong> {selectedLanguage.name}</strong> qui est très
                          demandé dans votre secteur d'activité.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 2: Skill Type Selection */}
                <TabsContent value="step-2" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="text-purple-600" size={20} />
                        Compétence à Évaluer - {selectedLanguage.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {languageSkillsData.skillTypes.map(skill => {
                          const Icon =
                            skill.icon === 'Ear'
                              ? Ear
                              : skill.icon === 'Mic'
                                ? Mic
                                : skill.icon === 'FileText'
                                  ? FileText
                                  : skill.icon === 'Pen'
                                    ? Pen
                                    : MessageSquare;

                          return (
                            <div
                              key={skill.id}
                              onClick={() => setSelectedSkill(skill)}
                              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                selectedSkill.id === skill.id
                                  ? 'border-purple-300 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div
                                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${skill.color}`}
                                >
                                  <Icon className="text-white" size={24} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {skill.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {skill.description}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    Durée moyenne
                                  </span>
                                  <span className="font-medium">
                                    {skill.averageDuration}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    Niveau requis
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getLevelColor(skill.minLevel)}
                                  >
                                    {skill.minLevel}
                                  </Badge>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Format</span>
                                  <span className="font-medium">
                                    {skill.format}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  Compétences évaluées
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {skill.subSkills
                                    .slice(0, 3)
                                    .map((subSkill, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs bg-gray-50"
                                      >
                                        {subSkill}
                                      </Badge>
                                    ))}
                                  {skill.subSkills.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-gray-50"
                                    >
                                      +{skill.subSkills.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {selectedSkill.id === skill.id && (
                                <div className="absolute top-2 right-2">
                                  <CheckCircle
                                    className="text-purple-600 bg-white rounded-full"
                                    size={24}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                          <Info size={16} />À propos de {selectedSkill.name}
                        </h4>
                        <div className="space-y-2 text-sm text-purple-800">
                          <p>
                            • <strong>Durée:</strong>{' '}
                            {selectedSkill.averageDuration} en moyenne
                          </p>
                          <p>
                            • <strong>Format:</strong> {selectedSkill.format}
                          </p>
                          <p>
                            • <strong>Certification:</strong> Reconnue selon le
                            Cadre Européen (CECRL)
                          </p>
                          <p>
                            • <strong>Validité:</strong> 2 ans pour les
                            certifications officielles
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 3: Test Selection */}
                <TabsContent value="step-3" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="text-emerald-600" size={20} />
                        Sélectionner un Test - {selectedLanguage.name}{' '}
                        {selectedSkill.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {languageSkillsData.tests
                          .filter(
                            test =>
                              test.languageId === selectedLanguage.id &&
                              test.skillType === selectedSkill.id
                          )
                          .map(test => (
                            <div
                              key={test.id}
                              onClick={() => setSelectedTest(test)}
                              className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                selectedTest.id === test.id
                                  ? 'border-emerald-300 bg-emerald-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 mb-2">
                                    {test.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-3">
                                    {test.description}
                                  </p>

                                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                      <Clock
                                        size={14}
                                        className="text-gray-500"
                                      />
                                      <span className="text-sm text-gray-700">
                                        {test.duration}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <FileText
                                        size={14}
                                        className="text-gray-500"
                                      />
                                      <span className="text-sm text-gray-700">
                                        {test.questionsCount} questions
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Gauge
                                        size={14}
                                        className="text-gray-500"
                                      />
                                      <Badge
                                        variant="outline"
                                        className={getLevelColor(
                                          test.targetLevel
                                        )}
                                      >
                                        {test.targetLevel}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Star
                                        size={14}
                                        className="text-amber-500"
                                      />
                                      <span className="text-sm text-gray-700">
                                        {test.rating}/5
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {selectedTest.id === test.id && (
                                  <CheckCircle
                                    className="text-emerald-600 flex-shrink-0"
                                    size={24}
                                  />
                                )}
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    Compétences évaluées
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {test.skillsEvaluated.map(
                                      (skill, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs bg-blue-50 text-blue-700"
                                        >
                                          {skill}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    Format du test
                                  </h4>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    {test.format.includes('Audio') && (
                                      <div className="flex items-center gap-1">
                                        <Headphones size={14} />
                                        <span>Compréhension audio</span>
                                      </div>
                                    )}
                                    {test.format.includes('Speaking') && (
                                      <div className="flex items-center gap-1">
                                        <Mic size={14} />
                                        <span>Expression orale</span>
                                      </div>
                                    )}
                                    {test.format.includes('Reading') && (
                                      <div className="flex items-center gap-1">
                                        <FileText size={14} />
                                        <span>Compréhension écrite</span>
                                      </div>
                                    )}
                                    {test.format.includes('Writing') && (
                                      <div className="flex items-center gap-1">
                                        <Pen size={14} />
                                        <span>Expression écrite</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {test.preview && (
                                  <div className="p-3 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-1">
                                      Exemple de question
                                    </h4>
                                    <p className="text-sm text-gray-700 italic">
                                      "{test.preview}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                        <h4 className="font-medium text-emerald-900 mb-2 flex items-center gap-2">
                          <Info size={16} />
                          Informations sur le test sélectionné
                        </h4>
                        <div className="space-y-2 text-sm text-emerald-800">
                          <p>
                            • <strong>Durée:</strong> {selectedTest.duration}{' '}
                            (temps adaptatif selon vos réponses)
                          </p>
                          <p>
                            • <strong>Questions:</strong>{' '}
                            {selectedTest.questionsCount} questions variées
                          </p>
                          <p>
                            • <strong>Scoring:</strong> Évaluation selon le
                            Cadre Européen (CECRL)
                          </p>
                          <p>
                            • <strong>Certificat:</strong> Disponible pour les
                            scores ≥ {selectedTest.passingScore}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 4: Test Evaluation */}
                <TabsContent value="step-4" className="space-y-6">
                  {isTestActive ? (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mic className="text-blue-600" size={20} />
                          {selectedTest.title} - Question {currentQuestion + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Question */}
                          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                {currentQuestion + 1}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                  {currentQuestionData.question}
                                </h3>
                                {currentQuestionData.context && (
                                  <div className="p-3 bg-white rounded-lg mb-4">
                                    <p className="text-sm text-gray-700 italic">
                                      {currentQuestionData.context}
                                    </p>
                                  </div>
                                )}
                                {currentQuestionData.audioUrl && (
                                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg mb-4">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={togglePlayback}
                                      className="flex items-center gap-2"
                                    >
                                      {isPlaying ? (
                                        <Pause size={16} />
                                      ) : (
                                        <Play size={16} />
                                      )}
                                      {isPlaying ? 'Pause' : 'Écouter'}
                                    </Button>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full bg-blue-500 transition-all duration-300 ${
                                          isPlaying ? 'w-full' : 'w-0'
                                        }`}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      0:30
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Answers */}
                          <div className="space-y-3">
                            {currentQuestionData.type === 'multiple_choice' && (
                              <div className="space-y-3">
                                {currentQuestionData.options?.map(
                                  (option, index) => (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        handleAnswerSelect(
                                          currentQuestionData.id,
                                          option.value
                                        )
                                      }
                                      className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:shadow-md ${
                                        answers[currentQuestionData.id] ===
                                        option.value
                                          ? 'border-blue-300 bg-blue-50'
                                          : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`w-4 h-4 rounded-full border-2 ${
                                            answers[currentQuestionData.id] ===
                                            option.value
                                              ? 'border-blue-500 bg-blue-500'
                                              : 'border-gray-300'
                                          }`}
                                        >
                                          {answers[currentQuestionData.id] ===
                                            option.value && (
                                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                          )}
                                        </div>
                                        <span className="font-medium text-gray-900">
                                          {option.text}
                                        </span>
                                      </div>
                                    </button>
                                  )
                                )}
                              </div>
                            )}

                            {currentQuestionData.type === 'speaking' && (
                              <div className="space-y-4">
                                <div className="text-center">
                                  <Label className="text-lg font-medium">
                                    Enregistrez votre réponse (maximum 2
                                    minutes)
                                  </Label>
                                </div>
                                <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
                                  <Button
                                    onClick={toggleRecording}
                                    className={`w-20 h-20 rounded-full flex items-center justify-center ${
                                      isRecording
                                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                  >
                                    {isRecording ? (
                                      <VolumeX size={32} />
                                    ) : (
                                      <Mic size={32} />
                                    )}
                                  </Button>
                                  <span className="text-sm text-gray-600">
                                    {isRecording
                                      ? 'Enregistrement en cours...'
                                      : 'Cliquez pour commencer'}
                                  </span>
                                  {isRecording && (
                                    <div className="w-full max-w-xs">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Volume2
                                          size={16}
                                          className="text-gray-500"
                                        />
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-green-500 transition-all duration-100"
                                            style={{ width: `${audioLevel}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div className="text-center text-xs text-gray-500">
                                        Niveau audio: {Math.round(audioLevel)}%
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {currentQuestionData.type === 'writing' && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="writing-response">
                                    Votre réponse écrite
                                  </Label>
                                  <Textarea
                                    id="writing-response"
                                    value={
                                      answers[currentQuestionData.id] || ''
                                    }
                                    onChange={e =>
                                      handleAnswerSelect(
                                        currentQuestionData.id,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Rédigez votre réponse ici..."
                                    className="mt-2 min-h-[120px]"
                                  />
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>
                                      Minimum: {currentQuestionData.minWords}{' '}
                                      mots
                                    </span>
                                    <span>
                                      Mots:{' '}
                                      {
                                        (answers[currentQuestionData.id] || '')
                                          .split(' ')
                                          .filter(w => w.length > 0).length
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentQuestionData.type ===
                              'reading_comprehension' && (
                              <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto">
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    Texte à lire
                                  </h4>
                                  <div className="text-sm text-gray-700 leading-relaxed">
                                    {currentQuestionData.readingText}
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  {currentQuestionData.options?.map(
                                    (option, index) => (
                                      <button
                                        key={index}
                                        onClick={() =>
                                          handleAnswerSelect(
                                            currentQuestionData.id,
                                            option.value
                                          )
                                        }
                                        className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:shadow-md ${
                                          answers[currentQuestionData.id] ===
                                          option.value
                                            ? 'border-emerald-300 bg-emerald-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                      >
                                        <div className="flex items-start gap-3">
                                          <div
                                            className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                                              answers[
                                                currentQuestionData.id
                                              ] === option.value
                                                ? 'border-emerald-500 bg-emerald-500'
                                                : 'border-gray-300'
                                            }`}
                                          >
                                            {answers[currentQuestionData.id] ===
                                              option.value && (
                                              <CheckCircle
                                                className="text-white"
                                                size={14}
                                              />
                                            )}
                                          </div>
                                          <span className="font-medium text-gray-900">
                                            {option.text}
                                          </span>
                                        </div>
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Navigation */}
                          <div className="flex justify-between pt-6 border-t">
                            <Button
                              variant="outline"
                              onClick={handlePreviousQuestion}
                              disabled={currentQuestion === 0}
                            >
                              <ArrowLeft size={16} className="mr-2" />
                              Précédent
                            </Button>

                            <div className="flex gap-3">
                              <Button variant="outline">
                                <Bookmark size={16} className="mr-2" />
                                Marquer
                              </Button>
                              <Button
                                onClick={handleNextQuestion}
                                disabled={!answers[currentQuestionData.id]}
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                {currentQuestion ===
                                selectedTest.questions.length - 1
                                  ? 'Terminer'
                                  : 'Suivant'}
                                <ArrowRight size={16} className="ml-2" />
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
                          <Play className="text-blue-600" size={20} />
                          Prêt à commencer le test
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Languages className="text-blue-600" size={32} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {selectedTest.title}
                          </h3>
                          <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Vous êtes sur le point de commencer le test.
                            Assurez-vous d'avoir un microphone fonctionnel et un
                            environnement calme.
                          </p>
                          <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
                            <div className="text-center">
                              <Clock
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedTest.duration}
                              </p>
                              <p className="text-xs text-gray-600">Durée</p>
                            </div>
                            <div className="text-center">
                              <FileText
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedTest.questionsCount}
                              </p>
                              <p className="text-xs text-gray-600">Questions</p>
                            </div>
                            <div className="text-center">
                              <Mic
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                IA Vocale
                              </p>
                              <p className="text-xs text-gray-600">
                                Reconnaissance
                              </p>
                            </div>
                            <div className="text-center">
                              <Award
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                Certificat
                              </p>
                              <p className="text-xs text-gray-600">CECRL</p>
                            </div>
                          </div>
                          <Button
                            onClick={handleStartTest}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                          >
                            <Play size={16} className="mr-2" />
                            Commencer le test
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Step 5: Results */}
                <TabsContent value="step-5" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="text-gold-600" size={20} />
                        Résultats du Test - {selectedTest.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overall Score */}
                        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="text-4xl">
                              {selectedLanguage.flag}
                            </div>
                            <div>
                              <div
                                className={`text-6xl font-bold ${getScoreColor(testResults.overallScore)} mb-2`}
                              >
                                {testResults.cecrLevel}
                              </div>
                              <div className="text-xl font-semibold text-gray-900">
                                {getProficiencyLabel(testResults.cecrLevel)}
                              </div>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Score: {testResults.overallScore}%
                          </h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            {testResults.summary}
                          </p>

                          {testResults.overallScore >=
                            selectedTest.passingScore && (
                            <div className="mt-4">
                              <Badge className="bg-blue-500 text-white px-4 py-2">
                                <Award size={16} className="mr-2" />
                                Certificat CECRL obtenu !
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Detailed Scores */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Scores par compétence
                          </h4>
                          <div className="space-y-4">
                            {testResults.skillScores.map((skill, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">
                                    {skill.skill}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {skill.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="outline"
                                    className={getLevelColor(skill.cecrLevel)}
                                  >
                                    {skill.cecrLevel}
                                  </Badge>
                                  <Progress
                                    value={skill.score}
                                    className="w-24 h-2"
                                  />
                                  <span
                                    className={`font-bold ${getScoreColor(skill.score)}`}
                                  >
                                    {skill.score}%
                                  </span>
                                </div>
                              </div>
                            ))}
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
                              {testResults.strengths.map((strength, index) => (
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
                              ))}
                            </ul>
                          </Card>

                          <Card className="p-4 border border-amber-200 bg-amber-50">
                            <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
                              <Target size={16} />
                              Axes d'amélioration
                            </h4>
                            <ul className="space-y-2">
                              {testResults.improvements.map(
                                (improvement, index) => (
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

                        {/* Learning Path */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="text-blue-600" size={20} />
                            Plan d'apprentissage personnalisé
                          </h4>
                          <div className="space-y-4">
                            {testResults.learningPath.map((item, index) => (
                              <div
                                key={index}
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium text-gray-900">
                                    {item.title}
                                  </h5>
                                  <Badge
                                    variant="outline"
                                    className={
                                      item.priority === 'high'
                                        ? 'border-red-200 text-red-700 bg-red-50'
                                        : item.priority === 'medium'
                                          ? 'border-amber-200 text-amber-700 bg-amber-50'
                                          : 'border-blue-200 text-blue-700 bg-blue-50'
                                    }
                                  >
                                    {item.priority === 'high'
                                      ? 'Priorité haute'
                                      : item.priority === 'medium'
                                        ? 'Priorité moyenne'
                                        : 'Priorité faible'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  {item.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>⏱️ {item.estimatedTime}</span>
                                  <span>📚 {item.type}</span>
                                  <span>🎯 {item.targetLevel}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-6 border-t">
                          <Button className="bg-blue-500 hover:bg-blue-600">
                            <Download size={16} className="mr-2" />
                            Télécharger le certificat
                          </Button>
                          <Button variant="outline">
                            <Share size={16} className="mr-2" />
                            Partager sur LinkedIn
                          </Button>
                          <Button variant="outline">
                            <RotateCcw size={16} className="mr-2" />
                            Refaire le test
                          </Button>
                          <Button variant="outline">
                            <BookOpen size={16} className="mr-2" />
                            Plan d'apprentissage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation Buttons */}
              {!isTestActive && (
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
                    Progression
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tests complétés</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {languageSkillsData.userProgress.completedTests}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Niveau moyen</span>
                    <Badge
                      variant="outline"
                      className={getLevelColor(
                        languageSkillsData.userProgress.averageLevel
                      )}
                    >
                      {languageSkillsData.userProgress.averageLevel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Langues étudiées</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700"
                    >
                      {languageSkillsData.userProgress.languagesStudied}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps total</span>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      {languageSkillsData.userProgress.totalTimeSpent}
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
                    <span className="text-gray-600">Langues disponibles</span>
                    <span className="font-medium">
                      {languageSkillsData.statistics.totalLanguages}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tests disponibles</span>
                    <span className="font-medium">
                      {languageSkillsData.statistics.totalTests}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Utilisateurs actifs</span>
                    <span className="font-medium">
                      {languageSkillsData.statistics.activeUsers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Certificats délivrés</span>
                    <span className="font-medium">
                      {languageSkillsData.statistics.certificatesIssued}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-yellow-600" size={20} />
                    Conseils IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {languageSkillsData.aiTips.map((tip, index) => (
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
        </main>
      </div>

      <ChatWidget />
    </div>
  );
}
