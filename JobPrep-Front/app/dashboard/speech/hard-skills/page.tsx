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
  Phone,
  Video,
  Calendar,
  Clock,
  User,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  PhoneCall,
  Monitor,
  Mic,
  MicOff,
  VideoOff,
  Volume2,
  Settings,
  Download,
  Share,
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Zap,
  Brain,
  Code,
  Server,
  Cloud,
  Smartphone,
  Shield,
  Cpu,
  Link,
  Database,
  Activity,
  Gauge,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Users,
  Globe,
  Headphones,
  Timer,
  Sparkles,
  RefreshCw,
  Eye,
  Info,
  ChevronRight,
  ChevronDown,
  MapPin,
  Languages,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { speechHardSkillsData } from '@/lib/speechHardSkillsData';

export default function SpeechHardSkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState(
    speechHardSkillsData.technicalDomains[0]
  );
  const [selectedInterviewer, setSelectedInterviewer] = useState(
    speechHardSkillsData.aiInterviewers[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(
    speechHardSkillsData.availableSlots[0]
  );
  const [callType, setCallType] = useState<'web_call' | 'phone_call'>(
    'web_call'
  );
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState(
    speechHardSkillsData.sessionReports[0]
  );

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
    { id: 2, title: 'Intervieweur', icon: User },
    { id: 3, title: 'Planification', icon: Calendar },
    { id: 4, title: 'Entretien', icon: Video },
    { id: 5, title: 'Rapport', icon: BarChart3 },
  ];

  const handleStartCall = () => {
    setIsCallActive(true);
    setCurrentStep(4);
    // Simulate call duration
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Auto end call after demo
    setTimeout(() => {
      clearInterval(interval);
      setIsCallActive(false);
      setShowReport(true);
      setCurrentStep(5);
    }, 10000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setShowReport(true);
    setCurrentStep(5);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDomainIcon = (domainId: string) => {
    const icons = {
      'frontend-dev': Monitor,
      'backend-dev': Server,
      'devops-cloud': Cloud,
      'data-science': BarChart3,
      'mobile-dev': Smartphone,
      cybersecurity: Shield,
      'system-architecture': Cpu,
      blockchain: Link,
    };
    return icons[domainId as keyof typeof icons] || Code;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Junior: 'border-green-200 text-green-700 bg-green-50',
      Intermédiaire: 'border-blue-200 text-blue-700 bg-blue-50',
      Senior: 'border-purple-200 text-purple-700 bg-purple-50',
      Expert: 'border-orange-200 text-orange-700 bg-orange-50',
      Architect: 'border-red-200 text-red-700 bg-red-50',
    };
    return (
      colors[difficulty as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
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
                <BreadcrumbPage>Hard Skills</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Code className="text-indigo-600" size={32} />
                Entretien Technique Vocal IA
              </h1>
              <p className="text-gray-600">
                Évaluez vos compétences techniques à travers un entretien vocal
                avec analyse de communication
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen size={16} />
                Guide Technique
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Rapport
              </Button>
              {!isCallActive && (
                <Button
                  onClick={handleStartCall}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 flex items-center gap-2"
                >
                  <Play size={16} />
                  Démarrer Entretien
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
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
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
            <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-indigo-900">
                        Entretien en cours
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="text-purple-600" size={20} />
                      <span className="font-medium text-purple-900">
                        Durée: {formatTime(callDuration)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="text-indigo-600" size={20} />
                      <span className="font-medium text-indigo-900">
                        {selectedInterviewer.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                    </Button>
                    {callType === 'web_call' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsVideoOff(!isVideoOff)}
                      >
                        {isVideoOff ? (
                          <VideoOff size={16} />
                        ) : (
                          <Video size={16} />
                        )}
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleEndCall}
                    >
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
                {/* Step 1: Domain Selection */}
                <TabsContent value="step-1" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="text-indigo-600" size={20} />
                        Choisir un Domaine Technique
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {speechHardSkillsData.technicalDomains.map(domain => {
                          const Icon = getDomainIcon(domain.id);

                          return (
                            <div
                              key={domain.id}
                              onClick={() => setSelectedDomain(domain)}
                              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                selectedDomain.id === domain.id
                                  ? 'border-indigo-300 bg-indigo-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div
                                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                    domain.color
                                  }`}
                                >
                                  <Icon className="text-white" size={24} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {domain.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge
                                      variant="outline"
                                      className={getDifficultyColor(
                                        domain.difficulty
                                      )}
                                    >
                                      {domain.difficulty}
                                    </Badge>
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
                                        ? 'Très demandé'
                                        : domain.demandLevel === 'High'
                                          ? 'Demandé'
                                          : 'Modéré'}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm text-gray-700 mb-4">
                                {domain.description}
                              </p>

                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">Durée</span>
                                  <span className="font-medium">
                                    {domain.duration}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Questions
                                  </span>
                                  <span className="font-medium">
                                    {domain.questionsCount}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Problèmes de code
                                  </span>
                                  <span className="font-medium">
                                    {domain.codeProblems}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">
                                    Salaire moyen
                                  </span>
                                  <span className="font-medium">
                                    {domain.averageSalary}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  Compétences évaluées
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {domain.focusAreas
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
                                  {domain.focusAreas.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-gray-50"
                                    >
                                      +{domain.focusAreas.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {selectedDomain.id === domain.id && (
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
                          <Lightbulb size={16} />
                          Recommandation IA
                        </h4>
                        <p className="text-sm text-blue-800">
                          Basé sur votre profil technique, nous recommandons de
                          commencer par
                          <strong> "{selectedDomain.name}"</strong> pour évaluer
                          vos compétences dans ce domaine en forte demande.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Step 2: Interviewer Selection */}
                <TabsContent value="step-2" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="text-purple-600" size={20} />
                        Sélectionner votre Intervieweur IA
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {speechHardSkillsData.aiInterviewers.map(
                          interviewer => (
                            <div
                              key={interviewer.id}
                              onClick={() =>
                                setSelectedInterviewer(interviewer)
                              }
                              className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                selectedInterviewer.id === interviewer.id
                                  ? 'border-purple-300 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <img
                                  src={interviewer.avatar}
                                  alt={interviewer.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900">
                                      {interviewer.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`${i < interviewer.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                            size={14}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-gray-600">
                                        {interviewer.rating}
                                      </span>
                                    </div>
                                  </div>

                                  <p className="text-sm text-gray-600 mb-3">
                                    {interviewer.description}
                                  </p>

                                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                                        Spécialisations
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {interviewer.specialization.map(
                                          (spec, index) => (
                                            <Badge
                                              key={index}
                                              variant="outline"
                                              className="text-xs bg-blue-50 text-blue-700"
                                            >
                                              {spec}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                                        Langues
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {interviewer.languages.map(
                                          (lang, index) => (
                                            <Badge
                                              key={index}
                                              variant="outline"
                                              className="text-xs bg-green-50 text-green-700"
                                            >
                                              {lang}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-4">
                                      <span className="text-gray-600">
                                        <strong>Expérience:</strong>{' '}
                                        {interviewer.experience}
                                      </span>
                                      <span className="text-gray-600">
                                        <strong>Style:</strong>{' '}
                                        {interviewer.style}
                                      </span>
                                    </div>
                                    {selectedInterviewer.id ===
                                      interviewer.id && (
                                      <CheckCircle
                                        className="text-purple-600"
                                        size={20}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                          <Info size={16} />À propos de{' '}
                          {selectedInterviewer.name}
                        </h4>
                        <div className="space-y-2 text-sm text-purple-800">
                          <p>
                            • <strong>Personnalité:</strong>{' '}
                            {selectedInterviewer.personality}
                          </p>
                          <p>
                            • <strong>Expérience:</strong>{' '}
                            {selectedInterviewer.experience}
                          </p>
                          <p>
                            • <strong>Style d'entretien:</strong>{' '}
                            {selectedInterviewer.style}
                          </p>
                          <p>
                            • <strong>Note moyenne:</strong>{' '}
                            {selectedInterviewer.rating}/5 étoiles
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
                        <Calendar className="text-emerald-600" size={20} />
                        Planifier votre Entretien Technique
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Call Type Selection */}
                        <div>
                          <Label className="text-base font-medium mb-4 block">
                            Type d'appel
                          </Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div
                              onClick={() => setCallType('web_call')}
                              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                                callType === 'web_call'
                                  ? 'border-emerald-300 bg-emerald-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <Video className="text-emerald-600" size={24} />
                                <h3 className="font-semibold text-gray-900">
                                  Appel Vidéo Web
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Entretien avec partage d'écran pour le code et
                                les diagrammes
                              </p>
                              <div className="space-y-1 text-xs text-gray-600">
                                <p>✓ Partage d'écran pour coder en direct</p>
                                <p>✓ Analyse vidéo du langage corporel</p>
                                <p>✓ Whiteboard virtuel pour les diagrammes</p>
                                <p>✓ Enregistrement de session</p>
                              </div>
                            </div>

                            <div
                              onClick={() => setCallType('phone_call')}
                              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                                callType === 'phone_call'
                                  ? 'border-emerald-300 bg-emerald-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <Phone className="text-emerald-600" size={24} />
                                <h3 className="font-semibold text-gray-900">
                                  Appel Téléphonique
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Focus 100% sur la communication technique vocale
                              </p>
                              <div className="space-y-1 text-xs text-gray-600">
                                <p>✓ Analyse vocale approfondie</p>
                                <p>✓ Évaluation de la clarté technique</p>
                                <p>✓ Test de communication sous pression</p>
                                <p>✓ Qualité audio optimale</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Available Slots */}
                        <div>
                          <Label className="text-base font-medium mb-4 block">
                            Créneaux disponibles
                          </Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            {speechHardSkillsData.availableSlots
                              .filter(slot => slot.available)
                              .map(slot => (
                                <div
                                  key={slot.id}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    selectedSlot.id === slot.id
                                      ? 'border-emerald-300 bg-emerald-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Calendar
                                        size={16}
                                        className="text-gray-500"
                                      />
                                      <span className="font-medium text-gray-900">
                                        {new Date(slot.date).toLocaleDateString(
                                          'fr-FR',
                                          {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                          }
                                        )}
                                      </span>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="bg-emerald-50 text-emerald-700"
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
                                      <User size={14} />
                                      <span>{slot.aiInterviewer}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Target size={14} />
                                      <Badge
                                        variant="outline"
                                        className={getDifficultyColor(
                                          slot.difficulty
                                        )}
                                      >
                                        {slot.difficulty}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Technical Requirements */}
                        <div className="p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
                            <Settings size={16} />
                            Prérequis Techniques
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-800">
                            {callType === 'web_call' ? (
                              <>
                                <div>
                                  <p className="font-medium mb-1">Navigateur</p>
                                  <p>Chrome 90+, Firefox 88+, Safari 14+</p>
                                </div>
                                <div>
                                  <p className="font-medium mb-1">Connexion</p>
                                  <p>Min 2 Mbps pour partage d'écran</p>
                                </div>
                                <div>
                                  <p className="font-medium mb-1">Équipement</p>
                                  <p>Microphone + webcam de qualité</p>
                                </div>
                                <div>
                                  <p className="font-medium mb-1">
                                    Environnement
                                  </p>
                                  <p>Bureau calme avec IDE accessible</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <p className="font-medium mb-1">Téléphone</p>
                                  <p>
                                    Ligne fixe ou mobile excellente réception
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium mb-1">
                                    Environnement
                                  </p>
                                  <p>Bureau silencieux avec ordinateur</p>
                                </div>
                                <div>
                                  <p className="font-medium mb-1">
                                    Préparation
                                  </p>
                                  <p>Documents techniques à portée</p>
                                </div>
                                <div>
                                  <p className="font-medium mb-1">Backup</p>
                                  <p>Numéro de secours recommandé</p>
                                </div>
                              </>
                            )}
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
                          <Video className="text-emerald-600" size={20} />
                          Entretien Technique en Cours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Video/Audio Interface */}
                          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative">
                            {callType === 'web_call' ? (
                              <div className="text-center text-white">
                                <Video
                                  size={64}
                                  className="mx-auto mb-4 opacity-50"
                                />
                                <p className="text-lg font-medium">
                                  Entretien Vidéo Actif
                                </p>
                                <p className="text-sm opacity-75">
                                  Partage d'écran disponible
                                </p>
                              </div>
                            ) : (
                              <div className="text-center text-white">
                                <Phone
                                  size={64}
                                  className="mx-auto mb-4 opacity-50"
                                />
                                <p className="text-lg font-medium">
                                  Appel Téléphonique Actif
                                </p>
                                <p className="text-sm opacity-75">
                                  Analyse vocale en cours
                                </p>
                              </div>
                            )}

                            {/* Call Controls */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                              <Button
                                variant={isMuted ? 'destructive' : 'secondary'}
                                size="sm"
                                onClick={() => setIsMuted(!isMuted)}
                              >
                                {isMuted ? (
                                  <MicOff size={16} />
                                ) : (
                                  <Mic size={16} />
                                )}
                              </Button>
                              {callType === 'web_call' && (
                                <Button
                                  variant={
                                    isVideoOff ? 'destructive' : 'secondary'
                                  }
                                  size="sm"
                                  onClick={() => setIsVideoOff(!isVideoOff)}
                                >
                                  {isVideoOff ? (
                                    <VideoOff size={16} />
                                  ) : (
                                    <Video size={16} />
                                  )}
                                </Button>
                              )}
                              <Button variant="secondary" size="sm">
                                <Volume2 size={16} />
                              </Button>
                            </div>
                          </div>

                          {/* Real-time Feedback */}
                          <div className="grid md:grid-cols-3 gap-4">
                            <Card className="p-4 bg-blue-50 border-blue-200">
                              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                                <Activity size={16} />
                                Clarté Vocale
                              </h4>
                              <div className="flex items-center gap-2">
                                <Progress value={85} className="flex-1" />
                                <span className="text-sm font-medium text-blue-700">
                                  85%
                                </span>
                              </div>
                            </Card>

                            <Card className="p-4 bg-emerald-50 border-emerald-200">
                              <h4 className="font-medium text-emerald-900 mb-2 flex items-center gap-2">
                                <Gauge size={16} />
                                Confiance
                              </h4>
                              <div className="flex items-center gap-2">
                                <Progress value={78} className="flex-1" />
                                <span className="text-sm font-medium text-emerald-700">
                                  78%
                                </span>
                              </div>
                            </Card>

                            <Card className="p-4 bg-purple-50 border-purple-200">
                              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                                <Timer size={16} />
                                Rythme
                              </h4>
                              <div className="flex items-center gap-2">
                                <Progress value={92} className="flex-1" />
                                <span className="text-sm font-medium text-purple-700">
                                  92%
                                </span>
                              </div>
                            </Card>
                          </div>

                          {/* Current Question */}
                          <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <h4 className="font-medium text-indigo-900 mb-3 flex items-center gap-2">
                              <Brain size={16} />
                              Question Actuelle
                            </h4>
                            <p className="text-indigo-800 mb-4">
                              "Expliquez-moi comment vous concevriez une API
                              RESTful pour un système de e-commerce. Quels
                              seraient les endpoints principaux et comment
                              géreriez-vous l'authentification ?"
                            </p>
                            <div className="flex items-center gap-4 text-sm text-indigo-700">
                              <span>• Temps recommandé: 5-7 minutes</span>
                              <span>• Catégorie: Architecture Backend</span>
                              <span>• Difficulté: Senior</span>
                            </div>
                          </Card>

                          {/* Tips */}
                          <Alert className="border-amber-200 bg-amber-50">
                            <Lightbulb className="text-amber-600" size={16} />
                            <AlertDescription className="text-amber-800">
                              <strong>Conseil IA:</strong> Structurez votre
                              réponse en expliquant d'abord l'architecture
                              générale, puis détaillez les endpoints
                              spécifiques. N'hésitez pas à mentionner les bonnes
                              pratiques de sécurité.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Play className="text-emerald-600" size={20} />
                          Prêt pour l'Entretien Technique
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Code className="text-indigo-600" size={32} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Entretien {selectedDomain.name}
                          </h3>
                          <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Vous êtes sur le point de commencer votre entretien
                            technique avec {selectedInterviewer.name}.
                            Assurez-vous d'être dans un environnement calme.
                          </p>

                          <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
                            <div className="text-center">
                              <Clock
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedDomain.duration}
                              </p>
                              <p className="text-xs text-gray-600">Durée</p>
                            </div>
                            <div className="text-center">
                              <Brain
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedDomain.questionsCount}
                              </p>
                              <p className="text-xs text-gray-600">Questions</p>
                            </div>
                            <div className="text-center">
                              <Code
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {selectedDomain.codeProblems}
                              </p>
                              <p className="text-xs text-gray-600">
                                Problèmes code
                              </p>
                            </div>
                            <div className="text-center">
                              <Award
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                Rapport
                              </p>
                              <p className="text-xs text-gray-600">Détaillé</p>
                            </div>
                          </div>

                          <Button
                            onClick={handleStartCall}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
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
                        <BarChart3 className="text-emerald-600" size={20} />
                        Rapport d'Entretien Technique
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overall Score */}
                        <div className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                          <div
                            className={`text-6xl font-bold ${getScoreColor(selectedReport.overallScore)} mb-2`}
                          >
                            {selectedReport.overallScore}%
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Niveau {selectedReport.technicalLevel}
                          </h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            Excellente performance technique avec une
                            communication claire et structurée
                          </p>

                          <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-indigo-600">
                                {selectedReport.questionsAnswered}
                              </p>
                              <p className="text-sm text-gray-600">
                                Questions répondues
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-purple-600">
                                {selectedReport.codeProblemsAttempted}
                              </p>
                              <p className="text-sm text-gray-600">
                                Problèmes de code
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-emerald-600">
                                {selectedReport.duration}
                              </p>
                              <p className="text-sm text-gray-600">
                                Durée totale
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Voice Analysis */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Analyse de Communication Technique
                          </h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-4 border border-blue-200 bg-blue-50">
                              <h5 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                                <Brain size={16} />
                                Communication Technique
                              </h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Explication concepts</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis
                                        .technicalCommunication
                                        .conceptExplanation
                                    }
                                    %
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Vocabulaire technique</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis
                                        .technicalCommunication
                                        .technicalVocabulary
                                    }
                                    %
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Résolution problèmes</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis
                                        .technicalCommunication.problemSolving
                                    }
                                    %
                                  </span>
                                </div>
                              </div>
                            </Card>

                            <Card className="p-4 border border-emerald-200 bg-emerald-50">
                              <h5 className="font-medium text-emerald-900 mb-3 flex items-center gap-2">
                                <Target size={16} />
                                Confiance Technique
                              </h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Assurance technique</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis.confidence
                                        .technicalAssurance
                                    }
                                    %
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Gestion incertitude</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis.confidence
                                        .uncertaintyHandling
                                    }
                                    %
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Admission limites</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis.confidence
                                        .admissionOfLimits
                                    }
                                    %
                                  </span>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </div>

                        {/* Technical Strengths & Weaknesses */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="p-4 border border-emerald-200 bg-emerald-50">
                            <h4 className="font-medium text-emerald-900 mb-3 flex items-center gap-2">
                              <ThumbsUp size={16} />
                              Forces Techniques
                            </h4>
                            <ul className="space-y-2">
                              {selectedReport.technicalStrengths.map(
                                (strength, index) => (
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
                              Axes d'Amélioration
                            </h4>
                            <ul className="space-y-2">
                              {selectedReport.technicalWeaknesses.map(
                                (weakness, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-amber-800 flex items-start gap-2"
                                  >
                                    <ArrowRight
                                      size={14}
                                      className="mt-0.5 flex-shrink-0"
                                    />
                                    {weakness}
                                  </li>
                                )
                              )}
                            </ul>
                          </Card>
                        </div>

                        {/* Skill Gaps */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Lacunes de Compétences Identifiées
                          </h4>
                          <div className="space-y-4">
                            {selectedReport.skillGaps.map((gap, index) => (
                              <Card
                                key={index}
                                className="p-4 border border-gray-200"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium text-gray-900">
                                    {gap.skill}
                                  </h5>
                                  <Badge
                                    variant="outline"
                                    className={
                                      gap.priority === 'critical'
                                        ? 'border-red-200 text-red-700 bg-red-50'
                                        : gap.priority === 'high'
                                          ? 'border-orange-200 text-orange-700 bg-orange-50'
                                          : gap.priority === 'medium'
                                            ? 'border-amber-200 text-amber-700 bg-amber-50'
                                            : 'border-blue-200 text-blue-700 bg-blue-50'
                                    }
                                  >
                                    {gap.priority === 'critical'
                                      ? 'Critique'
                                      : gap.priority === 'high'
                                        ? 'Élevée'
                                        : gap.priority === 'medium'
                                          ? 'Modérée'
                                          : 'Faible'}
                                  </Badge>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-3">
                                  <div>
                                    <span className="text-sm text-gray-600">
                                      Niveau actuel:{' '}
                                    </span>
                                    <span className="font-medium">
                                      {gap.currentLevel}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-600">
                                      Niveau cible:{' '}
                                    </span>
                                    <span className="font-medium">
                                      {gap.targetLevel}
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-900 mb-2">
                                    Plan d'apprentissage:
                                  </p>
                                  <ul className="space-y-1">
                                    {gap.learningPath.map((step, stepIndex) => (
                                      <li
                                        key={stepIndex}
                                        className="text-sm text-gray-700 flex items-start gap-2"
                                      >
                                        <ChevronRight
                                          size={14}
                                          className="mt-0.5 text-gray-400 flex-shrink-0"
                                        />
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* Career Guidance */}
                        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                          <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                            <Briefcase size={20} />
                            Guidance Carrière
                          </h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-medium text-blue-900 mb-2">
                                Niveau de Préparation
                              </h5>
                              <p className="text-blue-800 mb-4">
                                {selectedReport.careerGuidance.readinessLevel}
                              </p>

                              <h5 className="font-medium text-blue-900 mb-2">
                                Rôles Recommandés
                              </h5>
                              <ul className="space-y-1">
                                {selectedReport.careerGuidance.recommendedRoles.map(
                                  (role, index) => (
                                    <li
                                      key={index}
                                      className="text-sm text-blue-800 flex items-center gap-2"
                                    >
                                      <CheckCircle size={14} />
                                      {role}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-medium text-blue-900 mb-2">
                                Temps pour Expertise
                              </h5>
                              <p className="text-blue-800 mb-4">
                                {selectedReport.careerGuidance.timeToReadiness}
                              </p>

                              <h5 className="font-medium text-blue-900 mb-2">
                                Compétences Prioritaires
                              </h5>
                              <ul className="space-y-1">
                                {selectedReport.careerGuidance.skillsToImprove.map(
                                  (skill, index) => (
                                    <li
                                      key={index}
                                      className="text-sm text-blue-800 flex items-center gap-2"
                                    >
                                      <Target size={14} />
                                      {skill}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-6 border-t">
                          <Button className="bg-indigo-500 hover:bg-indigo-600">
                            <Download size={16} className="mr-2" />
                            Télécharger le rapport
                          </Button>
                          <Button variant="outline">
                            <Share size={16} className="mr-2" />
                            Partager les résultats
                          </Button>
                          <Button variant="outline">
                            <RefreshCw size={16} className="mr-2" />
                            Nouvel entretien
                          </Button>
                          <Button variant="outline">
                            <BookOpen size={16} className="mr-2" />
                            Plan d'étude
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation Buttons */}
              {!isCallActive && !showReport && (
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
                    Progression Technique
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sessions complétées</span>
                    <Badge
                      variant="outline"
                      className="bg-indigo-50 text-indigo-700"
                    >
                      {speechHardSkillsData.userProgress.totalSessions}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Score moyen</span>
                    <Badge
                      variant="outline"
                      className={getScoreBg(
                        speechHardSkillsData.userProgress.averageScore
                      )}
                    >
                      {speechHardSkillsData.userProgress.averageScore}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Niveau actuel</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700"
                    >
                      {speechHardSkillsData.userProgress.currentLevel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps total</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {speechHardSkillsData.userProgress.totalTimeSpent}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amélioration</span>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      +{speechHardSkillsData.userProgress.improvementRate}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-orange-600" size={20} />
                    Domaines Forts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {speechHardSkillsData.userProgress.strongestDomains.map(
                    (domain, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span className="text-sm text-gray-700">{domain}</span>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-amber-600" size={20} />À Améliorer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {speechHardSkillsData.userProgress.improvementAreas.map(
                    (area, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <ArrowRight size={14} className="text-amber-500" />
                        <span className="text-sm text-gray-700">{area}</span>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-yellow-600" size={20} />
                    Conseils Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {speechHardSkillsData.technicalTips
                    .slice(0, 3)
                    .map((tip, index) => (
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
