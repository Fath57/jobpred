'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Brain,
  Users,
  MessageSquare,
  Heart,
  Target,
  Zap,
  Star,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download,
  Bookmark,
  Share,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Activity,
} from 'lucide-react';
import ProgressSteps from '@/components/dashboard/ProgressSteps';
import PageHeader from '@/components/dashboard/PageHeader';

interface SoftSkillsTestProps {
  softSkillsData: typeof import('@/lib/tests/softSkillsData').softSkillsData;
}

const SoftSkillsTest: React.FC<SoftSkillsTestProps> = ({ softSkillsData }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    softSkillsData.categories[0]
  );
  const [selectedTest, setSelectedTest] = useState(softSkillsData.tests[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState(
    softSkillsData.scenarios[0]
  );
  const [testResults, setTestResults] = useState(softSkillsData.testResults[0]);

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
      Débutant: 'border-red-200 text-red-700 bg-red-50',
      Intermédiaire: 'border-amber-200 text-amber-700 bg-amber-50',
      Avancé: 'border-emerald-200 text-emerald-700 bg-emerald-50',
      Expert: 'border-purple-200 text-purple-700 bg-purple-50',
    };
    return (
      colors[level as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const currentQuestionData = selectedTest.questions[currentQuestion];

  const steps = [
    { id: 1, title: 'Catégorie', icon: Brain },
    { id: 2, title: 'Test', icon: Target },
    { id: 3, title: 'Questions', icon: MessageSquare },
    { id: 4, title: 'Résultats', icon: Award },
  ];

  return (
    <>
      <PageHeader
        title="Évaluation Soft Skills IA"
        description="Évaluez et développez vos compétences interpersonnelles avec notre IA avancée"
        icon={Brain}
        iconColor="text-purple-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/tests', label: 'Tests' },
          { label: 'Soft Skills', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Guide', icon: BookOpen, variant: 'outline' },
          { label: 'Rapport', icon: Download, variant: 'outline' },
        ]}
        onGenerate={!isTestActive ? handleStartTest : undefined}
        generateButtonText="Commencer Test"
        generateButtonGradient="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
      />

      {/* Progress Steps */}
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        isDisabled={isTestActive}
        activeColor="bg-purple-100 text-purple-700 border border-purple-200"
        completedColor="bg-emerald-100 text-emerald-700 border border-emerald-200"
      />

      {/* Test Timer */}
      {isTestActive && (
        <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Timer className="text-purple-600" size={20} />
                  <span className="font-medium text-purple-900">
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
              value={(currentQuestion / selectedTest.questions.length) * 100}
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
                    <Brain className="text-purple-600" size={20} />
                    Choisir une Catégorie de Compétences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {softSkillsData.categories.map((category: any) => {
                      const Icon =
                        category.icon === 'Users'
                          ? Users
                          : category.icon === 'MessageSquare'
                            ? MessageSquare
                            : category.icon === 'Heart'
                              ? Heart
                              : category.icon === 'Target'
                                ? Target
                                : Brain;

                      return (
                        <div
                          key={category.id}
                          onClick={() => setSelectedCategory(category)}
                          className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                            selectedCategory.id === category.id
                              ? 'border-purple-300 bg-purple-50'
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
                                {category.testsCount} tests disponibles
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-4">
                            {category.description}
                          </p>

                          <div className="space-y-2">
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
                          </div>

                          <div className="flex flex-wrap gap-1 mt-4">
                            {category.skills
                              .slice(0, 3)
                              .map((skill: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-gray-50"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            {category.skills.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-gray-50"
                              >
                                +{category.skills.length - 3}
                              </Badge>
                            )}
                          </div>

                          {selectedCategory.id === category.id && (
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

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Lightbulb size={16} />
                      Recommandation IA
                    </h4>
                    <p className="text-sm text-blue-800">
                      Basé sur votre profil professionnel, nous recommandons de
                      commencer par
                      <strong> "{selectedCategory.name}"</strong> pour maximiser
                      votre impact en entretien.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Test Selection */}
            <TabsContent value="step-2" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-indigo-600" size={20} />
                    Sélectionner un Test - {selectedCategory.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {softSkillsData.tests
                      .filter(
                        (test: any) => test.categoryId === selectedCategory.id
                      )
                      .map((test: any) => (
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
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {test.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3">
                                {test.description}
                              </p>

                              <div className="grid md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-gray-500" />
                                  <span className="text-sm text-gray-700">
                                    {test.duration}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MessageSquare
                                    size={14}
                                    className="text-gray-500"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {test.questionsCount} questions
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Gauge size={14} className="text-gray-500" />
                                  <Badge
                                    variant="outline"
                                    className={getLevelColor(test.difficulty)}
                                  >
                                    {test.difficulty}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star size={14} className="text-amber-500" />
                                  <span className="text-sm text-gray-700">
                                    {test.rating}/5
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
                                Compétences évaluées
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {test.skillsEvaluated.map(
                                  (skill: string, index: number) => (
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
                                {test.format.includes('QCM') && (
                                  <div className="flex items-center gap-1">
                                    <CheckCircle size={14} />
                                    <span>Questions à choix multiples</span>
                                  </div>
                                )}
                                {test.format.includes('Scenario') && (
                                  <div className="flex items-center gap-1">
                                    <Video size={14} />
                                    <span>Mise en situation</span>
                                  </div>
                                )}
                                {test.format.includes('Scale') && (
                                  <div className="flex items-center gap-1">
                                    <BarChart3 size={14} />
                                    <span>Échelle d'évaluation</span>
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

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                      <Info size={16} />
                      Informations sur le test sélectionné
                    </h4>
                    <div className="space-y-2 text-sm text-purple-800">
                      <p>
                        • <strong>Durée:</strong> {selectedTest.duration} (temps
                        recommandé)
                      </p>
                      <p>
                        • <strong>Questions:</strong>{' '}
                        {selectedTest.questionsCount} questions variées
                      </p>
                      <p>
                        • <strong>Scoring:</strong> Analyse IA avec
                        recommandations personnalisées
                      </p>
                      <p>
                        • <strong>Certificat:</strong> Disponible à la fin du
                        test (score ≥ 70%)
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
                      <MessageSquare className="text-emerald-600" size={20} />
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
                        {currentQuestionData.type === 'multiple_choice' && (
                          <div className="space-y-3">
                            {currentQuestionData.options?.map(
                              (option: any, index: number) => (
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
                                </button>
                              )
                            )}
                          </div>
                        )}

                        {currentQuestionData.type === 'scale' && (
                          <div className="space-y-4">
                            <div className="text-center">
                              <Label className="text-lg font-medium">
                                Évaluez votre niveau (1 = Jamais, 5 = Toujours)
                              </Label>
                            </div>
                            <div className="px-4">
                              <Slider
                                value={[answers[currentQuestionData.id] || 3]}
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
                                <span>Jamais</span>
                                <span>Rarement</span>
                                <span>Parfois</span>
                                <span>Souvent</span>
                                <span>Toujours</span>
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

                        {currentQuestionData.type === 'scenario' && (
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-blue-900 mb-2">
                                Situation
                              </h4>
                              <p className="text-sm text-blue-800">
                                {currentQuestionData.scenario}
                              </p>
                            </div>
                            <div className="space-y-3">
                              {currentQuestionData.options?.map(
                                (option: any, index: number) => (
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
                                          answers[currentQuestionData.id] ===
                                          option.value
                                            ? 'border-blue-500 bg-blue-500'
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
                            <BookmarkIcon size={16} className="mr-2" />
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
                        Assurez-vous d'être dans un environnement calme.
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
                          <MessageSquare
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
                            Certificat
                          </p>
                          <p className="text-xs text-gray-600">
                            Si score ≥ 70%
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
                    Résultats du Test - {selectedTest.title}
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
                      <p className="text-gray-600 max-w-md mx-auto">
                        {testResults.summary}
                      </p>

                      {testResults.overallScore >= 70 && (
                        <div className="mt-4">
                          <Badge className="bg-emerald-500 text-white px-4 py-2">
                            <Award size={16} className="mr-2" />
                            Certificat obtenu !
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
                        {testResults.skillScores.map(
                          (skill: any, index: number) => (
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
                          )
                        )}
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
                          {testResults.strengths.map(
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
                          {testResults.improvements.map(
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

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Lightbulb className="text-blue-600" size={20} />
                        Recommandations personnalisées
                      </h4>
                      <div className="space-y-4">
                        {testResults.recommendations.map(
                          (rec: any, index: number) => (
                            <Alert
                              key={index}
                              className="border-blue-200 bg-blue-50"
                            >
                              <AlertDescription className="text-blue-800">
                                <strong>{rec.title}:</strong> {rec.description}
                              </AlertDescription>
                            </Alert>
                          )
                        )}
                      </div>
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
                        Refaire le test
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
          {!isTestActive && (
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
                className="bg-purple-500 hover:bg-purple-600"
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
                <BarChart3 className="text-purple-600" size={20} />
                Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tests complétés</span>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  {softSkillsData.userProgress.completedTests}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Score moyen</span>
                <Badge
                  variant="outline"
                  className={getScoreBg(
                    softSkillsData.userProgress.averageScore
                  )}
                >
                  {softSkillsData.userProgress.averageScore}%
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Niveau global</span>
                <Badge
                  variant="outline"
                  className={getLevelColor(
                    softSkillsData.userProgress.currentLevel
                  )}
                >
                  {softSkillsData.userProgress.currentLevel}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Temps total</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {softSkillsData.userProgress.totalTimeSpent}
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
                <span className="text-gray-600">Tests disponibles</span>
                <span className="font-medium">
                  {softSkillsData.statistics.totalTests}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Utilisateurs actifs</span>
                <span className="font-medium">
                  {softSkillsData.statistics.activeUsers}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Score moyen plateforme</span>
                <span className="font-medium">
                  {softSkillsData.statistics.averagePlatformScore}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taux de réussite</span>
                <span className="font-medium">
                  {softSkillsData.statistics.successRate}%
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
              {softSkillsData.aiTips.map((tip: string, index: number) => (
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
const Award: React.FC<{ className?: string; size?: number }> = ({
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
    <circle cx="12" cy="8" r="6"></circle>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
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

const BarChart3: React.FC<{ size?: number }> = ({ size }) => (
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
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

const Gauge: React.FC<{ size?: number; className?: string }> = ({
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
    <path d="m12 14 4-4"></path>
    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
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

const BookmarkIcon: React.FC<{ size?: number; className?: string }> = ({
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
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
  </svg>
);

export default SoftSkillsTest;
