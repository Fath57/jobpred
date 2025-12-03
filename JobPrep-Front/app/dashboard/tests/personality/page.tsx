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
  Brain,
  Users,
  Target,
  Heart,
  Zap,
  Compass,
  Star,
  Clock,
  TrendingUp,
  Award,
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
  Headphones,
  Video,
  FileText,
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
  Share,
  Bookmark,
  Briefcase,
} from 'lucide-react';
import { personalitySkillsData } from '@/lib/personalitySkillsData';

export default function PersonalitySkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(
    personalitySkillsData.frameworks[0]
  );
  const [selectedTest, setSelectedTest] = useState(
    personalitySkillsData.tests[0]
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [currentStep, setCurrentStep] = useState(1);
  const [testResults, setTestResults] = useState(
    personalitySkillsData.testResults[0]
  );

  const handleStartTest = () => {
    setIsTestActive(true);
    setCurrentStep(3);
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
      setCurrentStep(4);
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
    { id: 1, title: 'Framework', icon: Brain },
    { id: 2, title: 'Test', icon: Target },
    { id: 3, title: 'Questions', icon: FileText },
    { id: 4, title: 'Résultats', icon: Award },
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

  const getFrameworkColor = (frameworkId: string) => {
    const colors = {
      'big-five': 'border-blue-200 text-blue-700 bg-blue-50',
      mbti: 'border-purple-200 text-purple-700 bg-purple-50',
      disc: 'border-emerald-200 text-emerald-700 bg-emerald-50',
      enneagram: 'border-amber-200 text-amber-700 bg-amber-50',
      strengths: 'border-pink-200 text-pink-700 bg-pink-50',
      values: 'border-indigo-200 text-indigo-700 bg-indigo-50',
    };
    return (
      colors[frameworkId as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const currentQuestionData = selectedTest.questions[currentQuestion];

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
                <BreadcrumbPage>Personality Skills</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Brain className="text-indigo-600" size={32} />
                Évaluation Personnalité IA
              </h1>
              <p className="text-gray-600">
                Découvrez votre profil de personnalité avec nos frameworks
                scientifiques avancés
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
              {!isTestActive && (
                <Button
                  onClick={handleStartTest}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 flex items-center gap-2"
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
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
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
            <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Timer className="text-indigo-600" size={20} />
                      <span className="font-medium text-indigo-900">
                        Temps restant: {formatTime(timeRemaining)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="text-purple-600" size={20} />
                      <span className="font-medium text-purple-900">
                        Question {currentQuestion + 1} sur{' '}
                        {selectedTest.questions.length}
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
                        {personalitySkillsData.frameworks.map(framework => {
                          const iconComponents = {
                            Brain,
                            Users,
                            Target,
                            Heart,
                            Zap,
                            Compass,
                          };
                          const Icon =
                            iconComponents[
                              framework.icon as keyof typeof iconComponents
                            ];

                          return (
                            <div
                              key={framework.id}
                              onClick={() => setSelectedFramework(framework)}
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
                                  <p className="text-sm text-gray-600">
                                    {framework.testsCount} tests disponibles
                                  </p>
                                </div>
                              </div>

                              <p className="text-sm text-gray-700 mb-4">
                                {framework.description}
                              </p>

                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Précision
                                  </span>
                                  <span className="font-medium">
                                    {framework.accuracy}%
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Durée moyenne
                                  </span>
                                  <span className="font-medium">
                                    {framework.averageDuration}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Validité scientifique
                                  </span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`${i < framework.scientificValidity ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                        size={12}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1">
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
                        })}
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                          <Lightbulb size={16} />À propos de{' '}
                          {selectedFramework.name}
                        </h4>
                        <div className="space-y-2 text-sm text-blue-800">
                          <p>
                            • <strong>Développé par:</strong>{' '}
                            {selectedFramework.developedBy} (
                            {selectedFramework.yearDeveloped})
                          </p>
                          <p>
                            • <strong>Applications:</strong>{' '}
                            {selectedFramework.applications.join(', ')}
                          </p>
                          <p>
                            • <strong>Dimensions évaluées:</strong>{' '}
                            {selectedFramework.dimensions.join(', ')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 2: Test Selection */}
                <TabsContent value="step-2" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="text-purple-600" size={20} />
                        Sélectionner un Test - {selectedFramework.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {personalitySkillsData.tests
                          .filter(
                            test => test.frameworkId === selectedFramework.id
                          )
                          .map(test => (
                            <div
                              key={test.id}
                              onClick={() => setSelectedTest(test)}
                              className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                selectedTest.id === test.id
                                  ? 'border-purple-300 bg-purple-50'
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
                                        className={getFrameworkColor(
                                          test.frameworkId
                                        )}
                                      >
                                        {test.complexity}
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
                                    className="text-purple-600 flex-shrink-0"
                                    size={24}
                                  />
                                )}
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    Dimensions évaluées
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {test.dimensionsEvaluated.map(
                                      (dimension, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs bg-blue-50 text-blue-700"
                                        >
                                          {dimension}
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
                                    {test.format.map((format, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-1"
                                      >
                                        <CheckCircle size={14} />
                                        <span>{format}</span>
                                      </div>
                                    ))}
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

                      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                          <Info size={16} />
                          Informations sur le test sélectionné
                        </h4>
                        <div className="space-y-2 text-sm text-purple-800">
                          <p>
                            • <strong>Durée:</strong> {selectedTest.duration}{' '}
                            (temps recommandé)
                          </p>
                          <p>
                            • <strong>Questions:</strong>{' '}
                            {selectedTest.questionsCount} questions variées
                          </p>
                          <p>
                            • <strong>Adaptatif:</strong>{' '}
                            {selectedTest.isAdaptive
                              ? 'Oui - Questions adaptées à vos réponses'
                              : 'Non - Questions fixes'}
                          </p>
                          <p>
                            • <strong>Certificat:</strong>{' '}
                            {selectedTest.certificateAvailable
                              ? 'Disponible à la fin du test'
                              : 'Non disponible'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 3: Test Questions */}
                <TabsContent value="step-3" className="space-y-6">
                  {isTestActive && currentQuestionData ? (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="text-emerald-600" size={20} />
                          {selectedTest.title} - Question {currentQuestion + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Question */}
                          <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
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
                              </div>
                            </div>
                          </div>

                          {/* Answers */}
                          <div className="space-y-3">
                            {currentQuestionData.type === 'multiple_choice' &&
                              currentQuestionData.options && (
                                <div className="space-y-3">
                                  {currentQuestionData.options.map(
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
                                        <div className="flex items-center gap-3">
                                          <div
                                            className={`w-4 h-4 rounded-full border-2 ${
                                              answers[
                                                currentQuestionData.id
                                              ] === option.value
                                                ? 'border-emerald-500 bg-emerald-500'
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

                            {currentQuestionData.type === 'likert_scale' && (
                              <div className="space-y-4">
                                <div className="text-center">
                                  <Label className="text-lg font-medium">
                                    Évaluez votre niveau d'accord (1 = Pas du
                                    tout d'accord, 5 = Tout à fait d'accord)
                                  </Label>
                                </div>
                                <div className="px-4">
                                  <Slider
                                    value={[
                                      answers[currentQuestionData.id] || 3,
                                    ]}
                                    onValueChange={value =>
                                      handleAnswerSelect(
                                        currentQuestionData.id,
                                        value[0]
                                      )
                                    }
                                    max={5}
                                    min={1}
                                    step={1}
                                    className="w-full"
                                  />
                                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>Pas du tout</span>
                                    <span>Peu</span>
                                    <span>Neutre</span>
                                    <span>Plutôt</span>
                                    <span>Tout à fait</span>
                                  </div>
                                  <div className="text-center mt-2">
                                    <Badge
                                      variant="outline"
                                      className="bg-emerald-50 text-emerald-700"
                                    >
                                      Valeur sélectionnée:{' '}
                                      {answers[currentQuestionData.id] || 3}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentQuestionData.type === 'scenario_choice' &&
                              currentQuestionData.options && (
                                <div className="space-y-4">
                                  {currentQuestionData.scenario && (
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                      <h4 className="font-medium text-blue-900 mb-2">
                                        Situation
                                      </h4>
                                      <p className="text-sm text-blue-800">
                                        {currentQuestionData.scenario}
                                      </p>
                                    </div>
                                  )}
                                  <div className="space-y-3">
                                    {currentQuestionData.options.map(
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
                                          <div className="flex items-start gap-3">
                                            <div
                                              className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                                                answers[
                                                  currentQuestionData.id
                                                ] === option.value
                                                  ? 'border-blue-500 bg-blue-500'
                                                  : 'border-gray-300'
                                              }`}
                                            >
                                              {answers[
                                                currentQuestionData.id
                                              ] === option.value && (
                                                <CheckCircle
                                                  className="text-white"
                                                  size={14}
                                                />
                                              )}
                                            </div>
                                            <div>
                                              <p className="font-medium text-gray-900 mb-1">
                                                {option.text}
                                              </p>
                                              {option.explanation && (
                                                <p className="text-sm text-gray-600">
                                                  {option.explanation}
                                                </p>
                                              )}
                                            </div>
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
                                className="bg-emerald-500 hover:bg-emerald-600"
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
                          <Play className="text-emerald-600" size={20} />
                          Prêt à commencer le test
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="text-emerald-600" size={32} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {selectedTest.title}
                          </h3>
                          <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Vous êtes sur le point de commencer le test.
                            Répondez spontanément et honnêtement.
                          </p>
                          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
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
                              <Award
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                Profil
                              </p>
                              <p className="text-xs text-gray-600">
                                Personnalisé
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={handleStartTest}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                          >
                            <Play size={16} className="mr-2" />
                            Commencer le test
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
                        Votre Profil de Personnalité - {testResults.typeLabel}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overall Profile */}
                        <div className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                          <div className="text-6xl font-bold text-indigo-600 mb-2">
                            {testResults.personalityType}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {testResults.typeLabel}
                          </h3>
                          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                            {testResults.summary}
                          </p>

                          <div className="flex justify-center gap-4 mt-4">
                            <Badge className="bg-indigo-500 text-white px-4 py-2">
                              Fiabilité: {testResults.reliability}%
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-purple-50 text-purple-700"
                            >
                              Rareté: {testResults.rarity}% de la population
                            </Badge>
                          </div>
                        </div>

                        {/* Dimension Scores */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Scores par dimension
                          </h4>
                          <div className="space-y-4">
                            {testResults.dimensionScores.map(
                              (dimension, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">
                                      {dimension.dimension}
                                    </h5>
                                    <p className="text-sm text-gray-600">
                                      {dimension.description}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {dimension.interpretation}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Progress
                                      value={dimension.score}
                                      className="w-24 h-2"
                                    />
                                    <span
                                      className={`font-bold ${getScoreColor(dimension.score)}`}
                                    >
                                      {dimension.score}%
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Strengths and Development Areas */}
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
                              Axes de développement
                            </h4>
                            <ul className="space-y-2">
                              {testResults.developmentAreas.map(
                                (area, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-amber-800 flex items-start gap-2"
                                  >
                                    <ArrowRight
                                      size={14}
                                      className="mt-0.5 flex-shrink-0"
                                    />
                                    {area}
                                  </li>
                                )
                              )}
                            </ul>
                          </Card>
                        </div>

                        {/* Career Recommendations */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="text-blue-600" size={20} />
                            Recommandations de carrière
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h5 className="font-medium text-blue-900 mb-2">
                                Rôles idéaux
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {testResults.careerRecommendations.idealRoles.map(
                                  (role, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="bg-blue-100 text-blue-800"
                                    >
                                      {role}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h5 className="font-medium text-green-900 mb-2">
                                Environnements de travail
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {testResults.careerRecommendations.workEnvironments.map(
                                  (env, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="bg-green-100 text-green-800"
                                    >
                                      {env}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <h6 className="font-medium text-purple-900 text-sm">
                                Potentiel de leadership
                              </h6>
                              <p className="text-sm text-purple-800">
                                {
                                  testResults.careerRecommendations
                                    .leadershipPotential
                                }
                              </p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-lg">
                              <h6 className="font-medium text-indigo-900 text-sm">
                                Contribution en équipe
                              </h6>
                              <p className="text-sm text-indigo-800">
                                {
                                  testResults.careerRecommendations
                                    .teamContribution
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Team Dynamics */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Users className="text-purple-600" size={20} />
                            Dynamiques d'équipe
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <h6 className="font-medium text-gray-900 text-sm">
                                  Style de collaboration
                                </h6>
                                <p className="text-sm text-gray-700">
                                  {testResults.teamDynamics.collaborationStyle}
                                </p>
                              </div>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <h6 className="font-medium text-gray-900 text-sm">
                                  Communication
                                </h6>
                                <p className="text-sm text-gray-700">
                                  {testResults.teamDynamics.communicationStyle}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <h6 className="font-medium text-gray-900 text-sm">
                                  Rôle préféré
                                </h6>
                                <p className="text-sm text-gray-700">
                                  {testResults.teamDynamics.preferredRole}
                                </p>
                              </div>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <h6 className="font-medium text-gray-900 text-sm">
                                  Gestion du stress
                                </h6>
                                <p className="text-sm text-gray-700">
                                  {testResults.teamDynamics.stressManagement}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Development Plan */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="text-amber-600" size={20} />
                            Plan de développement personnalisé
                          </h4>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 bg-emerald-50 rounded-lg">
                                <h5 className="font-medium text-emerald-900 mb-2">
                                  Actions court terme
                                </h5>
                                <ul className="space-y-1">
                                  {testResults.developmentPlan.shortTerm.map(
                                    (action, index) => (
                                      <li
                                        key={index}
                                        className="text-sm text-emerald-800"
                                      >
                                        • {action}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <h5 className="font-medium text-blue-900 mb-2">
                                  Objectifs long terme
                                </h5>
                                <ul className="space-y-1">
                                  {testResults.developmentPlan.longTerm.map(
                                    (goal, index) => (
                                      <li
                                        key={index}
                                        className="text-sm text-blue-800"
                                      >
                                        • {goal}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>

                            {testResults.developmentPlan.learningPath && (
                              <div>
                                <h5 className="font-medium text-gray-900 mb-3">
                                  Parcours d'apprentissage recommandé
                                </h5>
                                <div className="space-y-3">
                                  {testResults.developmentPlan.learningPath.map(
                                    (item, index) => (
                                      <div
                                        key={index}
                                        className="p-4 border border-gray-200 rounded-lg"
                                      >
                                        <div className="flex items-start justify-between mb-2">
                                          <h6 className="font-medium text-gray-900">
                                            {item.title}
                                          </h6>
                                          <Badge
                                            variant="outline"
                                            className={
                                              item.priority === 'high'
                                                ? 'border-red-200 text-red-700 bg-red-50'
                                                : item.priority === 'medium'
                                                  ? 'border-amber-200 text-amber-700 bg-amber-50'
                                                  : 'border-gray-200 text-gray-700 bg-gray-50'
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
                                        <div className="flex gap-4 text-xs text-gray-500">
                                          <span>⏱️ {item.estimatedTime}</span>
                                          <span>📊 {item.difficulty}</span>
                                          <span>📚 {item.type}</span>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Compatibility Matrix */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Heart className="text-pink-600" size={20} />
                            Compatibilité avec d'autres types
                          </h4>
                          <div className="space-y-3">
                            {testResults.compatibilityMatrix.map(
                              (compat, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <Badge
                                      variant="outline"
                                      className="font-mono"
                                    >
                                      {compat.type}
                                    </Badge>
                                    <span className="text-sm text-gray-700">
                                      {compat.workingRelationship}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={compat.compatibility}
                                      className="w-16 h-2"
                                    />
                                    <span className="text-sm font-medium">
                                      {compat.compatibility}%
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-6 border-t">
                          <Button className="bg-indigo-500 hover:bg-indigo-600">
                            <Download size={16} className="mr-2" />
                            Télécharger le rapport complet
                          </Button>
                          <Button variant="outline">
                            <Share size={16} className="mr-2" />
                            Partager le profil
                          </Button>
                          <Button variant="outline">
                            <RotateCcw size={16} className="mr-2" />
                            Refaire le test
                          </Button>
                          <Button variant="outline">
                            <BookOpen size={16} className="mr-2" />
                            Guide de développement
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
                      handleStepChange(Math.min(4, currentStep + 1))
                    }
                    disabled={currentStep === 4}
                    className="bg-indigo-500 hover:bg-indigo-600"
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
                    <BarChart3 className="text-indigo-600" size={20} />
                    Progression
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tests complétés</span>
                    <Badge
                      variant="outline"
                      className="bg-indigo-50 text-indigo-700"
                    >
                      {personalitySkillsData.userProgress.completedTests}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profils découverts</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700"
                    >
                      {personalitySkillsData.userProgress.profilesDiscovered}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Frameworks explorés</span>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      {personalitySkillsData.userProgress.frameworksExplored}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps total</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {personalitySkillsData.userProgress.totalTimeSpent}
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
                    <span className="text-gray-600">Tests disponibles</span>
                    <span className="font-medium">
                      {personalitySkillsData.statistics.totalTests}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Utilisateurs actifs</span>
                    <span className="font-medium">
                      {personalitySkillsData.statistics.activeUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Précision moyenne</span>
                    <span className="font-medium">
                      {personalitySkillsData.statistics.averageAccuracy}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Framework populaire</span>
                    <span className="font-medium">
                      {personalitySkillsData.statistics.mostPopularFramework}
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
                  {personalitySkillsData.aiTips.map((tip, index) => (
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
