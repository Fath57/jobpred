'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Code,
  Server,
  Cloud,
  BarChart3,
  Smartphone,
  Shield,
  Cpu,
  Link,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  Zap,
  TrendingUp,
} from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';
import ProgressSteps from '@/components/dashboard/ProgressSteps';

interface HardSkillsTestProps {
  hardSkillsData: typeof import('@/lib/tests/hardSkillsData').hardSkillsData;
}

const HardSkillsTest: React.FC<HardSkillsTestProps> = ({ hardSkillsData }) => {
  const [selectedDomain, setSelectedDomain] = useState(
    hardSkillsData.technicalDomains[0]
  );
  const [selectedTest, setSelectedTest] = useState(hardSkillsData.tests[0]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [testResults, setTestResults] = useState(hardSkillsData.testResults[0]);

  const handleStartTest = () => {
    setIsTestActive(true);
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

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'frontend-dev':
        return <Monitor size={24} />;
      case 'backend-dev':
        return <Server size={24} />;
      case 'devops-cloud':
        return <Cloud size={24} />;
      case 'data-science':
        return <BarChart3 size={24} />;
      case 'mobile-dev':
        return <Smartphone size={24} />;
      case 'cybersecurity':
        return <Shield size={24} />;
      case 'system-architecture':
        return <Cpu size={24} />;
      case 'blockchain':
        return <Link size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  const steps = [
    { id: 1, title: 'Domaine', icon: Code },
    { id: 2, title: 'Test', icon: Target },
    { id: 3, title: 'Questions', icon: MessageSquare },
    { id: 4, title: 'Résultats', icon: Award },
  ];

  return (
    <>
      <PageHeader
        title="Évaluation Hard Skills IA"
        description="Testez et validez vos compétences techniques avec notre IA spécialisée"
        icon={Code}
        iconColor="text-blue-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/tests', label: 'Tests' },
          { label: 'Hard Skills', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Documentation', icon: BookOpen, variant: 'outline' },
          { label: 'Télécharger', icon: Download, variant: 'outline' },
        ]}
        onGenerate={!isTestActive ? handleStartTest : undefined}
        generateButtonText="Commencer Test"
        generateButtonGradient="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
      />

      {/* Progress Steps */}
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        isDisabled={isTestActive}
        activeColor="bg-blue-100 text-blue-700 border border-blue-200"
        completedColor="bg-emerald-100 text-emerald-700 border border-emerald-200"
      />

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
                    {selectedTest.questionsCount}
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
              value={(currentQuestion / selectedTest.questionsCount) * 100}
              className="mt-3"
            />
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={`step-${currentStep}`} className="space-y-6">
            {/* Step 1: Domain Selection */}
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
                    {hardSkillsData.technicalDomains.map((domain: any) => (
                      <div
                        key={domain.id}
                        onClick={() => setSelectedDomain(domain)}
                        className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                          selectedDomain.id === domain.id
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${domain.color}`}
                          >
                            {getDomainIcon(domain.id)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {domain.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  domain.demandLevel === 'Very High'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : domain.demandLevel === 'High'
                                      ? 'bg-blue-50 text-blue-700'
                                      : 'bg-amber-50 text-amber-700'
                                }
                              >
                                {domain.demandLevel === 'Very High'
                                  ? 'Très forte demande'
                                  : domain.demandLevel === 'High'
                                    ? 'Forte demande'
                                    : 'Demande modérée'}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-purple-50 text-purple-700"
                              >
                                {domain.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-4">
                          {domain.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Durée moyenne</span>
                            <span className="font-medium">
                              {domain.duration}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Questions</span>
                            <span className="font-medium">
                              {domain.questionsCount} questions
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Salaire moyen</span>
                            <span className="font-medium">
                              {domain.averageSalary}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {domain.focusAreas
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
                          {domain.focusAreas.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-gray-50"
                            >
                              +{domain.focusAreas.length - 3}
                            </Badge>
                          )}
                        </div>

                        {selectedDomain.id === domain.id && (
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
                      Basé sur votre profil et vos compétences actuelles, nous
                      recommandons de vous concentrer sur
                      <strong> "{selectedDomain.name}"</strong> pour maximiser
                      votre valeur sur le marché du travail.
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
                    Sélectionner un Test - {selectedDomain.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hardSkillsData.tests
                      .filter(
                        (test: any) => test.categoryId === selectedDomain.id
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
                                    className={
                                      test.difficulty === 'Junior'
                                        ? 'bg-green-50 text-green-700'
                                        : test.difficulty === 'Intermédiaire'
                                          ? 'bg-blue-50 text-blue-700'
                                          : test.difficulty === 'Senior'
                                            ? 'bg-purple-50 text-purple-700'
                                            : test.difficulty === 'Expert'
                                              ? 'bg-amber-50 text-amber-700'
                                              : 'bg-red-50 text-red-700'
                                    }
                                  >
                                    {test.difficulty}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star size={14} className="text-amber-500" />
                                  <span className="text-sm text-gray-700">
                                    {test.rating}/5 ({test.reviews})
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
                                {test.technologies.map(
                                  (tech: string, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-blue-50 text-blue-700"
                                    >
                                      {tech}
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
                                {test.format.map(
                                  (format: string, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-1"
                                    >
                                      {format === 'QCM' && (
                                        <CheckSquare size={14} />
                                      )}
                                      {format === 'Code' && <Code size={14} />}
                                      {format === 'Practical' && (
                                        <Terminal size={14} />
                                      )}
                                      {format === 'Architecture' && (
                                        <Cpu size={14} />
                                      )}
                                      <span>{format}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {test.isNew && (
                              <Badge className="bg-green-500 text-white">
                                Nouveau
                              </Badge>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              <Badge
                                variant="outline"
                                className="bg-indigo-50 text-indigo-700"
                              >
                                Impact salarial: {test.estimatedSalaryImpact}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  test.industryDemand === 'Very High'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : test.industryDemand === 'High'
                                      ? 'bg-blue-50 text-blue-700'
                                      : 'bg-amber-50 text-amber-700'
                                }
                              >
                                Demande: {test.industryDemand}
                              </Badge>
                            </div>
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
                        • <strong>Durée:</strong> {selectedTest.duration} (temps
                        recommandé)
                      </p>
                      <p>
                        • <strong>Questions:</strong>{' '}
                        {selectedTest.questionsCount} questions variées
                      </p>
                      <p>
                        • <strong>Score de passage:</strong>{' '}
                        {selectedTest.passingScore}%
                      </p>
                      <p>
                        • <strong>Certification:</strong>{' '}
                        {selectedTest.isCertified
                          ? 'Disponible'
                          : 'Non disponible'}
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
                      <Code className="text-blue-600" size={20} />
                      {selectedTest.title} - Question {currentQuestion + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Placeholder for question content */}
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                            {currentQuestion + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-3">
                              Implémentez une fonction `debounce` qui retarde
                              l'exécution d'une fonction
                            </h3>
                            <div className="p-3 bg-white rounded-lg mb-4">
                              <p className="text-sm text-gray-700 italic">
                                Optimisation des performances et gestion des
                                événements fréquents
                              </p>
                            </div>
                            <div className="bg-gray-800 text-gray-200 p-4 rounded-lg font-mono text-sm">
                              <pre>{`function debounce(func, delay) {
  // Votre implémentation ici
  
}

// Test
const debouncedLog = debounce(console.log, 300);
debouncedLog('Hello'); // Ne s'exécute qu'après 300ms sans nouvel appel`}</pre>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Code Editor Placeholder */}
                      <div className="border border-gray-300 rounded-lg p-4 min-h-[200px] bg-gray-50">
                        <p className="text-gray-500 text-center">
                          Éditeur de code ici
                        </p>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between pt-6 border-t">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentQuestion(Math.max(0, currentQuestion - 1))
                          }
                          disabled={currentQuestion === 0}
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Précédent
                        </Button>

                        <div className="flex gap-3">
                          <Button variant="outline">
                            <Terminal size={16} className="mr-2" />
                            Exécuter
                          </Button>
                          <Button
                            onClick={() =>
                              setCurrentQuestion(
                                Math.min(
                                  selectedTest.questionsCount - 1,
                                  currentQuestion + 1
                                )
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            {currentQuestion === selectedTest.questionsCount - 1
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
                        <Code className="text-blue-600" size={32} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {selectedTest.title}
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Vous êtes sur le point de commencer le test.
                        Assurez-vous d'être dans un environnement calme et
                        d'avoir les outils nécessaires.
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
                            Score ≥ {selectedTest.passingScore}%
                          </p>
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
                    <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <div
                        className={`text-6xl font-bold ${getScoreColor(testResults.overallScore)} mb-2`}
                      >
                        {testResults.overallScore}%
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {testResults.technicalLevel}
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {testResults.summary}
                      </p>

                      {testResults.certificateEarned && (
                        <div className="mt-4">
                          <Badge className="bg-blue-500 text-white px-4 py-2">
                            <Award size={16} className="mr-2" />
                            Certificat obtenu !
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Technical Scores */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Scores techniques
                      </h4>
                      <div className="space-y-4">
                        {testResults.technicalScores.map(
                          (tech: any, index: number) => (
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
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="font-medium text-gray-900">
                                    {tech.questionsCorrect}/
                                    {tech.totalQuestions}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    questions
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
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

                    {/* Learning Path */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <GraduationCap className="text-blue-600" size={20} />
                        Parcours d'apprentissage recommandé
                      </h4>
                      <div className="space-y-4">
                        {testResults.learningPath.map(
                          (path: any, index: number) => (
                            <Card
                              key={index}
                              className="p-4 border border-blue-200"
                            >
                              <div className="flex items-start gap-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    path.priority === 'high'
                                      ? 'bg-red-50 text-red-700'
                                      : path.priority === 'medium'
                                        ? 'bg-amber-50 text-amber-700'
                                        : 'bg-blue-50 text-blue-700'
                                  }
                                >
                                  {path.priority === 'high'
                                    ? 'Priorité haute'
                                    : path.priority === 'medium'
                                      ? 'Priorité moyenne'
                                      : 'Priorité basse'}
                                </Badge>
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 mb-1">
                                    {path.title}
                                  </h5>
                                  <p className="text-sm text-gray-700 mb-2">
                                    {path.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-gray-600">
                                    <span>Durée: {path.estimatedTime}</span>
                                    <span>Difficulté: {path.difficulty}</span>
                                    <span>Type: {path.type}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          )
                        )}
                      </div>
                    </div>

                    {/* Industry Comparison */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                        <BarChart3 size={16} />
                        Comparaison avec l'industrie
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-700 mb-1">
                            {testResults.industryComparison.percentile}%
                          </div>
                          <p className="text-sm text-purple-800">Percentile</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-700 mb-1">
                            {testResults.industryComparison.averageScore}%
                          </div>
                          <p className="text-sm text-purple-800">Score moyen</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-700 mb-1">
                            {testResults.industryComparison.topPerformers}%
                          </div>
                          <p className="text-sm text-purple-800">
                            Top performers
                          </p>
                        </div>
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
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {hardSkillsData.userProgress.totalSessions}
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
                <span className="text-gray-600">Niveau actuel</span>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  {hardSkillsData.userProgress.currentLevel}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Temps total</span>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 text-indigo-700"
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
                Statistiques
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
                <span className="text-gray-600">Score moyen plateforme</span>
                <span className="font-medium">
                  {hardSkillsData.statistics.averagePlatformScore}%
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
              {hardSkillsData.aiTips.map((tip: string, index: number) => (
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

const Monitor = ({ size }: { size: number }) => (
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
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const Target = ({ size }: { size: number }) => (
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
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const MessageSquare = ({ size }: { size: number }) => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const Award = ({ size }: { size: number }) => (
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
    <circle cx="12" cy="8" r="6"></circle>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
  </svg>
);

const Timer = ({ className, size }: { className?: string; size: number }) => (
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

const Activity = ({
  className,
  size,
}: {
  className?: string;
  size: number;
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

const Pause = ({ size }: { size: number }) => (
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
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const RotateCcw = ({ size }: { size: number }) => (
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
    <path d="M3 2v6h6"></path>
    <path d="M3 8a9 9 0 1 0 2.83-6.36L3 8"></path>
  </svg>
);

const Play = ({ size }: { size: number }) => (
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
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const CheckSquare = ({ size }: { size: number }) => (
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
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

const Terminal = ({ size }: { size: number }) => (
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
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const Gauge = ({ size }: { size: number }) => (
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
    <path d="m12 14 4-4"></path>
    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
  </svg>
);

const GraduationCap = ({ size }: { size: number }) => (
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
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
  </svg>
);

const Share = ({ size }: { size: number }) => (
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
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
);

const BookOpen = ({ size }: { size: number }) => (
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
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const Lightbulb = ({ size }: { size: number }) => (
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

const Info = ({ size }: { size: number }) => (
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

const ThumbsUp = ({ size }: { size: number }) => (
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

export default HardSkillsTest;
