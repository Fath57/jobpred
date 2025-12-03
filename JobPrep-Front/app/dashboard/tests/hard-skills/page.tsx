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
  Code,
  Database,
  Cloud,
  Shield,
  Cpu,
  Smartphone,
  Globe,
  BarChart3,
  Target,
  Zap,
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
  Settings,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Info,
  BookOpen,
  Terminal,
  FileCode,
  Layers,
  Server,
  Monitor,
  ChevronRight,
  ChevronDown,
  Filter,
  Search,
  Share,
  Bookmark,
  Timer,
  Activity,
  Gauge,
  Brain,
  Wrench,
  GitBranch,
  Package,
  Workflow,
  TestTube,
  Lock,
  Wifi,
  HardDrive,
} from 'lucide-react';
import { hardSkillsData } from '@/lib/tests/hardSkillsData';

export default function HardSkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    hardSkillsData.categories[0]
  );
  const [selectedTest, setSelectedTest] = useState(hardSkillsData.tests[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes
  const [currentStep, setCurrentStep] = useState(1);
  const [testResults, setTestResults] = useState(hardSkillsData.testResults[0]);
  const [codeAnswer, setCodeAnswer] = useState('');

  const handleStartTest = () => {
    setIsTestActive(true);
    setCurrentStep(3);
  };

  const handleAnswerSelect = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleCodeSubmit = (questionId: string, code: string) => {
    setAnswers({ ...answers, [questionId]: code });
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
    { id: 1, title: 'Domaine', icon: Code },
    { id: 2, title: 'Test', icon: Target },
    { id: 3, title: 'Évaluation', icon: Terminal },
    { id: 4, title: 'Résultats', icon: Award },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50';
    if (score >= 70) return 'bg-blue-50';
    if (score >= 55) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      Junior: 'border-blue-200 text-blue-700 bg-blue-50',
      Intermédiaire: 'border-amber-200 text-amber-700 bg-amber-50',
      Senior: 'border-emerald-200 text-emerald-700 bg-emerald-50',
      Expert: 'border-purple-200 text-purple-700 bg-purple-50',
      Architect: 'border-indigo-200 text-indigo-700 bg-indigo-50',
    };
    return (
      colors[level as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Junior: 'border-green-200 text-green-700 bg-green-50',
      Intermédiaire: 'border-blue-200 text-blue-700 bg-blue-50',
      Senior: 'border-amber-200 text-amber-700 bg-amber-50',
      Expert: 'border-red-200 text-red-700 bg-red-50',
      Architect: 'border-purple-200 text-purple-700 bg-purple-50',
    };
    return (
      colors[difficulty as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const currentQuestionData = selectedTest.questions[currentQuestion];

  const filteredTests =
    selectedDifficulty === 'all'
      ? hardSkillsData.tests.filter(
          test => test.categoryId === selectedCategory.id
        )
      : hardSkillsData.tests.filter(
          test =>
            test.categoryId === selectedCategory.id &&
            test.difficulty === selectedDifficulty
        );

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
                <BreadcrumbPage>Hard Skills</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Code className="text-blue-600" size={32} />
                Évaluation Hard Skills IA
              </h1>
              <p className="text-gray-600">
                Testez et certifiez vos compétences techniques avec notre
                plateforme d'évaluation avancée
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen size={16} />
                Documentation
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Certificats
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
                      <Gauge className="text-purple-600" size={20} />
                      <span className="font-medium text-purple-900">
                        Difficulté: {selectedTest.difficulty}
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
                {/* Step 1: Category Selection */}
                <TabsContent value="step-1" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="text-blue-600" size={20} />
                        Choisir un Domaine Technique
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {hardSkillsData.categories.map(category => {
                          const iconComponents = {
                            Code: Code,
                            Database: Database,
                            Cloud: Cloud,
                            Shield: Shield,
                            Cpu: Cpu,
                            Smartphone: Smartphone,
                            Globe: Globe,
                            BarChart3: BarChart3,
                          };
                          const Icon =
                            iconComponents[
                              category.icon as keyof typeof iconComponents
                            ] || Code;

                          return (
                            <div
                              key={category.id}
                              onClick={() => setSelectedCategory(category)}
                              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                selectedCategory.id === category.id
                                  ? 'border-blue-300 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div
                                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                    category.color
                                  }`}
                                >
                                  <Icon className="text-white" size={24} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {category.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {category.testsCount} tests •{' '}
                                    {category.totalQuestions} questions
                                  </p>
                                </div>
                              </div>

                              <p className="text-sm text-gray-700 mb-4">
                                {category.description}
                              </p>

                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Niveau moyen
                                  </span>
                                  <span className="font-medium">
                                    {category.averageLevel}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Durée moyenne
                                  </span>
                                  <span className="font-medium">
                                    {category.averageDuration}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Taux de réussite
                                  </span>
                                  <span className="font-medium">
                                    {category.successRate}%
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-4">
                                {category.technologies
                                  .slice(0, 4)
                                  .map((tech, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-gray-50"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                {category.technologies.length > 4 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-gray-50"
                                  >
                                    +{category.technologies.length - 4}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`${i < category.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                      size={14}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  ({category.completions}k complétions)
                                </span>
                              </div>

                              {selectedCategory.id === category.id && (
                                <div className="absolute top-2 right-2">
                                  <CheckCircle
                                    className="text-blue-600 bg-white rounded-full"
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
                          <Lightbulb size={16} />
                          Recommandation IA basée sur votre profil
                        </h4>
                        <p className="text-sm text-blue-800">
                          Selon votre expérience en tant que{' '}
                          <strong>Directeur de Projet IT</strong>, nous
                          recommandons de commencer par{' '}
                          <strong>"{selectedCategory.name}"</strong> pour
                          valider vos compétences techniques et identifier les
                          domaines d'amélioration prioritaires.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 2: Test Selection */}
                <TabsContent value="step-2" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Target className="text-indigo-600" size={20} />
                          Tests Disponibles - {selectedCategory.name}
                        </CardTitle>
                        <div className="flex items-center gap-3">
                          <Label
                            htmlFor="difficulty-filter"
                            className="text-sm font-medium"
                          >
                            Niveau:
                          </Label>
                          <Select
                            value={selectedDifficulty}
                            onValueChange={setSelectedDifficulty}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous niveaux</SelectItem>
                              <SelectItem value="Junior">Junior</SelectItem>
                              <SelectItem value="Intermédiaire">
                                Intermédiaire
                              </SelectItem>
                              <SelectItem value="Senior">Senior</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                              <SelectItem value="Architect">
                                Architect
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredTests.map(test => (
                          <div
                            key={test.id}
                            onClick={() => setSelectedTest(test)}
                            className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                              selectedTest.id === test.id
                                ? 'border-indigo-300 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-gray-900">
                                    {test.title}
                                  </h3>
                                  <Badge
                                    variant="outline"
                                    className={getDifficultyColor(
                                      test.difficulty
                                    )}
                                  >
                                    {test.difficulty}
                                  </Badge>
                                  {test.isNew && (
                                    <Badge className="bg-emerald-500 text-white">
                                      Nouveau
                                    </Badge>
                                  )}
                                  {test.isCertified && (
                                    <Badge
                                      variant="outline"
                                      className="bg-purple-50 text-purple-700 border-purple-200"
                                    >
                                      <Award size={12} className="mr-1" />
                                      Certifiant
                                    </Badge>
                                  )}
                                </div>
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
                                    <Terminal
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
                                    <span className="text-sm text-gray-700">
                                      Score min: {test.passingScore}%
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Star
                                      size={14}
                                      className="text-amber-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                      {test.rating}/5 ({test.reviews} avis)
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {selectedTest.id === test.id && (
                                <CheckCircle
                                  className="text-indigo-600 flex-shrink-0"
                                  size={24}
                                />
                              )}
                            </div>

                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Technologies évaluées
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {test.technologies.map((tech, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-blue-50 text-blue-700"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Format d'évaluation
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  {test.format.includes('QCM') && (
                                    <div className="flex items-center gap-1">
                                      <CheckCircle size={14} />
                                      <span>Questions théoriques</span>
                                    </div>
                                  )}
                                  {test.format.includes('Code') && (
                                    <div className="flex items-center gap-1">
                                      <FileCode size={14} />
                                      <span>Exercices de code</span>
                                    </div>
                                  )}
                                  {test.format.includes('Practical') && (
                                    <div className="flex items-center gap-1">
                                      <Wrench size={14} />
                                      <span>Cas pratiques</span>
                                    </div>
                                  )}
                                  {test.format.includes('Architecture') && (
                                    <div className="flex items-center gap-1">
                                      <Layers size={14} />
                                      <span>Architecture système</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {test.prerequisites &&
                                test.prerequisites.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Prérequis recommandés
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {test.prerequisites.map(
                                        (prereq, index) => (
                                          <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs bg-amber-50 text-amber-700"
                                          >
                                            {prereq}
                                          </Badge>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

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

                      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-indigo-900 mb-2 flex items-center gap-2">
                          <Info size={16} />
                          Informations sur le test sélectionné
                        </h4>
                        <div className="space-y-2 text-sm text-indigo-800">
                          <p>
                            • <strong>Durée:</strong> {selectedTest.duration}{' '}
                            (temps adaptatif selon vos réponses)
                          </p>
                          <p>
                            • <strong>Questions:</strong>{' '}
                            {selectedTest.questionsCount} questions de
                            difficulté progressive
                          </p>
                          <p>
                            • <strong>Évaluation:</strong> Scoring IA avec
                            analyse détaillée des compétences
                          </p>
                          <p>
                            • <strong>Certification:</strong>{' '}
                            {selectedTest.isCertified
                              ? 'Certificat professionnel délivré (score ≥ ' +
                                selectedTest.passingScore +
                                '%)'
                              : 'Rapport détaillé fourni'}
                          </p>
                          <p>
                            • <strong>Validité:</strong>{' '}
                            {selectedTest.isCertified
                              ? '3 ans avec possibilité de renouvellement'
                              : 'Résultats permanents'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 3: Test Questions */}
                <TabsContent value="step-3" className="space-y-6">
                  {isTestActive ? (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Terminal className="text-emerald-600" size={20} />
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
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="font-semibold text-gray-900">
                                    {currentQuestionData.question}
                                  </h3>
                                  <Badge
                                    variant="outline"
                                    className={getDifficultyColor(
                                      currentQuestionData.difficulty
                                    )}
                                  >
                                    {currentQuestionData.difficulty}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700"
                                  >
                                    {currentQuestionData.points} points
                                  </Badge>
                                </div>
                                {currentQuestionData.context && (
                                  <div className="p-3 bg-white rounded-lg mb-4">
                                    <p className="text-sm text-gray-700">
                                      {currentQuestionData.context}
                                    </p>
                                  </div>
                                )}
                                {currentQuestionData.technologies && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {currentQuestionData.technologies.map(
                                      (tech, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {tech}
                                        </Badge>
                                      )
                                    )}
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
                                          ? 'border-emerald-300 bg-emerald-50'
                                          : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`w-4 h-4 rounded-full border-2 ${
                                            answers[currentQuestionData.id] ===
                                            option.value
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
                                      {option.explanation &&
                                        answers[currentQuestionData.id] ===
                                          option.value && (
                                          <div className="mt-2 ml-7 text-sm text-gray-600 italic">
                                            {option.explanation}
                                          </div>
                                        )}
                                    </button>
                                  )
                                )}
                              </div>
                            )}

                            {currentQuestionData.type === 'code' && (
                              <div className="space-y-4">
                                <div className="p-4 bg-gray-900 rounded-lg">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Terminal
                                      className="text-green-400"
                                      size={16}
                                    />
                                    <span className="text-green-400 text-sm font-mono">
                                      Code Editor
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="bg-gray-800 text-gray-300 border-gray-600"
                                    >
                                      {currentQuestionData.language}
                                    </Badge>
                                  </div>
                                  <Textarea
                                    value={codeAnswer}
                                    onChange={e =>
                                      setCodeAnswer(e.target.value)
                                    }
                                    placeholder={
                                      currentQuestionData.codeTemplate ||
                                      `// Écrivez votre code ${currentQuestionData.language} ici\n\n`
                                    }
                                    className="min-h-[200px] bg-gray-800 text-green-400 font-mono text-sm border-gray-600 focus:border-green-400"
                                  />
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-gray-800 border-gray-600 text-gray-300"
                                      >
                                        <Play size={14} className="mr-1" />
                                        Tester
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-gray-800 border-gray-600 text-gray-300"
                                      >
                                        <RefreshCw size={14} className="mr-1" />
                                        Reset
                                      </Button>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleCodeSubmit(
                                          currentQuestionData.id,
                                          codeAnswer
                                        )
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle size={14} className="mr-1" />
                                      Soumettre
                                    </Button>
                                  </div>
                                </div>

                                {currentQuestionData.testCases && (
                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">
                                      Cas de test
                                    </h4>
                                    <div className="space-y-2">
                                      {currentQuestionData.testCases.map(
                                        (testCase, index) => (
                                          <div key={index} className="text-sm">
                                            <span className="font-mono bg-white px-2 py-1 rounded">
                                              Input: {testCase.input} → Output:{' '}
                                              {testCase.output}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {currentQuestionData.type === 'practical' && (
                              <div className="space-y-4">
                                <div className="p-4 bg-amber-50 rounded-lg">
                                  <h4 className="font-medium text-amber-900 mb-2">
                                    Cas pratique
                                  </h4>
                                  <p className="text-sm text-amber-800">
                                    {currentQuestionData.scenario}
                                  </p>
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
                                            ? 'border-amber-300 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                      >
                                        <div className="flex items-start gap-3">
                                          <div
                                            className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                                              answers[
                                                currentQuestionData.id
                                              ] === option.value
                                                ? 'border-amber-500 bg-amber-500'
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

                            {currentQuestionData.type === 'architecture' && (
                              <div className="space-y-4">
                                <div className="p-4 bg-purple-50 rounded-lg">
                                  <h4 className="font-medium text-purple-900 mb-2">
                                    Conception d'architecture
                                  </h4>
                                  <p className="text-sm text-purple-800">
                                    {currentQuestionData.architecturePrompt}
                                  </p>
                                </div>
                                <Textarea
                                  value={answers[currentQuestionData.id] || ''}
                                  onChange={e =>
                                    handleAnswerSelect(
                                      currentQuestionData.id,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Décrivez votre approche architecturale, les composants choisis, les patterns utilisés..."
                                  className="min-h-[150px]"
                                />
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Info size={14} />
                                  <span>
                                    Incluez les diagrammes, technologies et
                                    justifications de vos choix
                                  </span>
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
                              <Button variant="outline">
                                <Info size={16} className="mr-2" />
                                Aide
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
                          Prêt à commencer l'évaluation
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
                            Vous êtes sur le point de commencer l'évaluation
                            technique. Assurez-vous d'avoir un environnement
                            calme et une connexion stable.
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
                              <Terminal
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedTest.questionsCount}
                              </p>
                              <p className="text-xs text-gray-600">Questions</p>
                            </div>
                            <div className="text-center">
                              <Gauge
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedTest.passingScore}%
                              </p>
                              <p className="text-xs text-gray-600">
                                Score minimum
                              </p>
                            </div>
                            <div className="text-center">
                              <Award
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedTest.isCertified
                                  ? 'Certificat'
                                  : 'Rapport'}
                              </p>
                              <p className="text-xs text-gray-600">Résultat</p>
                            </div>
                          </div>
                          <Button
                            onClick={handleStartTest}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                          >
                            <Play size={16} className="mr-2" />
                            Commencer l'évaluation
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
                        Résultats de l'Évaluation - {selectedTest.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overall Score */}
                        <div className="text-center p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                          <div
                            className={`text-6xl font-bold ${getScoreColor(testResults.overallScore)} mb-2`}
                          >
                            {testResults.overallScore}%
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {testResults.level}
                          </h3>
                          <p className="text-gray-600 max-w-md mx-auto mb-4">
                            {testResults.summary}
                          </p>

                          <div className="flex items-center justify-center gap-4 mb-4">
                            <Badge className="bg-emerald-500 text-white px-4 py-2">
                              <Clock size={16} className="mr-2" />
                              Temps: {testResults.timeSpent}
                            </Badge>
                            <Badge className="bg-blue-500 text-white px-4 py-2">
                              <Target size={16} className="mr-2" />
                              Précision: {testResults.accuracy}%
                            </Badge>
                          </div>

                          {testResults.certificateEarned && (
                            <div className="mt-4">
                              <Badge className="bg-purple-500 text-white px-4 py-2">
                                <Award size={16} className="mr-2" />
                                Certificat professionnel obtenu !
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Detailed Scores */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Scores par domaine technique
                          </h4>
                          <div className="space-y-4">
                            {testResults.technicalScores.map((tech, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">
                                    {tech.technology}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {tech.description}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge
                                      variant="outline"
                                      className={getLevelColor(tech.level)}
                                    >
                                      {tech.level}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      {tech.questionsCorrect}/
                                      {tech.totalQuestions} questions correctes
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Progress
                                    value={tech.score}
                                    className="w-24 h-2"
                                  />
                                  <span
                                    className={`font-bold ${getScoreColor(tech.score)}`}
                                  >
                                    {tech.score}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Performance Analysis */}
                        <div className="grid md:grid-cols-3 gap-6">
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

                          <Card className="p-4 border border-blue-200 bg-blue-50">
                            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                              <Lightbulb size={16} />
                              Recommandations
                            </h4>
                            <ul className="space-y-2">
                              {testResults.nextSteps.map((step, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-blue-800 flex items-start gap-2"
                                >
                                  <Star
                                    size={14}
                                    className="mt-0.5 flex-shrink-0"
                                  />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </Card>
                        </div>

                        {/* Detailed Recommendations */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Brain className="text-purple-600" size={20} />
                            Plan de développement personnalisé
                          </h4>
                          <div className="space-y-4">
                            {testResults.learningPath.map((item, index) => (
                              <div
                                key={index}
                                className="p-4 border border-gray-200 rounded-lg"
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
                                  <span>
                                    Durée estimée: {item.estimatedTime}
                                  </span>
                                  <span>Difficulté: {item.difficulty}</span>
                                  <span>Type: {item.type}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-6 border-t">
                          <Button className="bg-emerald-500 hover:bg-emerald-600">
                            <Download size={16} className="mr-2" />
                            Télécharger le certificat
                          </Button>
                          <Button variant="outline">
                            <Share size={16} className="mr-2" />
                            Partager sur LinkedIn
                          </Button>
                          <Button variant="outline">
                            <RotateCcw size={16} className="mr-2" />
                            Repasser le test
                          </Button>
                          <Button variant="outline">
                            <BookOpen size={16} className="mr-2" />
                            Plan d'apprentissage
                          </Button>
                          <Button variant="outline">
                            <Target size={16} className="mr-2" />
                            Test suivant recommandé
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
                    Progression Technique
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tests complétés</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {hardSkillsData.userProgress.completedTests}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Score moyen</span>
                    <Badge
                      variant="outline"
                      className={getScoreBg(
                        hardSkillsData.userProgress.averageScore
                      )}
                    >
                      {hardSkillsData.userProgress.averageScore}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Niveau technique</span>
                    <Badge
                      variant="outline"
                      className={getLevelColor(
                        hardSkillsData.userProgress.currentLevel
                      )}
                    >
                      {hardSkillsData.userProgress.currentLevel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificats obtenus</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700"
                    >
                      {hardSkillsData.userProgress.certificatesEarned}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps total</span>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      {hardSkillsData.userProgress.totalTimeSpent}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-orange-600" size={20} />
                    Statistiques Plateforme
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tests disponibles</span>
                    <span className="font-medium">
                      {hardSkillsData.statistics.totalTests}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Développeurs actifs</span>
                    <span className="font-medium">
                      {hardSkillsData.statistics.activeDevelopers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Score moyen plateforme
                    </span>
                    <span className="font-medium">
                      {hardSkillsData.statistics.averagePlatformScore}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Certificats délivrés</span>
                    <span className="font-medium">
                      {hardSkillsData.statistics.certificatesIssued}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taux de réussite</span>
                    <span className="font-medium">
                      {hardSkillsData.statistics.successRate}%
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
                  {hardSkillsData.aiTips.map((tip, index) => (
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
