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
  Phone,
  Video,
  Calendar,
  Clock,
  Mic,
  Users,
  TrendingUp,
  Award,
  Target,
  Zap,
  Star,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Activity,
  Volume2,
  Heart,
  Brain,
  MessageSquare,
  Timer,
  PlayCircle,
  PauseCircle,
  Download,
  Share,
  Bookmark,
  Settings,
  Headphones,
  Smartphone,
  Globe,
  Shield,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Info,
  Sparkles,
  Gauge,
  Waves,
  Smile,
  Frown,
  Meh,
} from 'lucide-react';
import { speechSoftSkillsData } from '@/lib/speechSoftSkillsData';

export default function SpeechSoftSkillsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [selectedCallType, setSelectedCallType] = useState('web_call');
  const [selectedInterviewType, setSelectedInterviewType] = useState(
    speechSoftSkillsData.interviewTypes[0]
  );
  const [selectedAI, setSelectedAI] = useState(
    speechSoftSkillsData.aiInterviewers[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedReport, setSelectedReport] = useState(
    speechSoftSkillsData.sessionReports[0]
  );

  const formatDuration = (seconds: number) => {
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

  const getLevelColor = (level: string) => {
    const colors = {
      Débutant: 'border-blue-200 text-blue-700 bg-blue-50',
      Intermédiaire: 'border-amber-200 text-amber-700 bg-amber-50',
      Avancé: 'border-emerald-200 text-emerald-700 bg-emerald-50',
      Expert: 'border-purple-200 text-purple-700 bg-purple-50',
    };
    return (
      colors[level as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'confiance':
      case 'satisfaction':
      case 'enthousiasme':
        return <Smile className="text-emerald-500" size={16} />;
      case 'stress':
      case 'nervosité':
        return <Frown className="text-red-500" size={16} />;
      case 'engagement':
      case 'détermination':
        return <Target className="text-blue-500" size={16} />;
      default:
        return <Meh className="text-gray-500" size={16} />;
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
                <BreadcrumbLink href="/dashboard/speech">Speech</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Soft Skills</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Mic className="text-purple-600" size={32} />
                Entretien Vocal IA - Soft Skills
              </h1>
              <p className="text-gray-600">
                Entraînez-vous à l'oral avec notre IA vocale avancée et recevez
                un feedback détaillé sur votre communication
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye size={16} />
                Guide
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Rapports
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 flex items-center gap-2">
                <Calendar size={16} />
                Planifier Entretien
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="space-y-6"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="schedule">Planifier</TabsTrigger>
                  <TabsTrigger value="live">En Direct</TabsTrigger>
                  <TabsTrigger value="reports">Rapports</TabsTrigger>
                  <TabsTrigger value="progress">Progression</TabsTrigger>
                </TabsList>

                {/* Schedule Tab */}
                <TabsContent value="schedule" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="text-blue-600" size={20} />
                        Planifier votre Entretien Vocal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Call Type Selection */}
                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          Type d'appel
                        </Label>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div
                            onClick={() => setSelectedCallType('web_call')}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedCallType === 'web_call'
                                ? 'border-purple-300 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <Video className="text-purple-600" size={24} />
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  Appel Web
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Directement dans votre navigateur
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-700">
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-500"
                                />
                                <span>Analyse vidéo en temps réel</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-500"
                                />
                                <span>Enregistrement automatique</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-500"
                                />
                                <span>Feedback visuel instantané</span>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={() => setSelectedCallType('phone_call')}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedCallType === 'phone_call'
                                ? 'border-purple-300 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <Phone className="text-green-600" size={24} />
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  Appel Téléphonique
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Sur votre téléphone
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-700">
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-500"
                                />
                                <span>Focus 100% sur la voix</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-500"
                                />
                                <span>Situation réelle d'entretien</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-500"
                                />
                                <span>Analyse vocale approfondie</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interview Type Selection */}
                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          Type d'entretien
                        </Label>
                        <div className="space-y-3">
                          {speechSoftSkillsData.interviewTypes.map(type => (
                            <div
                              key={type.id}
                              onClick={() => setSelectedInterviewType(type)}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedInterviewType.id === type.id
                                  ? 'border-indigo-300 bg-indigo-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">
                                  {type.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={getLevelColor(type.difficulty)}
                                  >
                                    {type.difficulty}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700"
                                  >
                                    {type.duration}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {type.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {type.focusAreas.map((area, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs bg-gray-50"
                                  >
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Interviewer Selection */}
                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          Choisir votre Intervieweur IA
                        </Label>
                        <div className="grid md:grid-cols-2 gap-4">
                          {speechSoftSkillsData.aiInterviewers.map(ai => (
                            <div
                              key={ai.id}
                              onClick={() => setSelectedAI(ai)}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedAI.id === ai.id
                                  ? 'border-emerald-300 bg-emerald-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <img
                                  src={ai.avatar}
                                  alt={ai.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">
                                    {ai.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {ai.personality}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star
                                      className="text-amber-400 fill-current"
                                      size={12}
                                    />
                                    <span className="text-xs text-gray-600">
                                      {ai.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">
                                {ai.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {ai.specialization
                                  .slice(0, 2)
                                  .map((spec, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-emerald-50 text-emerald-700"
                                    >
                                      {spec}
                                    </Badge>
                                  ))}
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
                        <div className="grid md:grid-cols-2 gap-3">
                          {speechSoftSkillsData.availableSlots.map(slot => (
                            <div
                              key={slot.id}
                              onClick={() =>
                                slot.available && setSelectedSlot(slot)
                              }
                              className={`p-4 border-2 rounded-lg transition-all ${
                                !slot.available
                                  ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                  : selectedSlot?.id === slot.id
                                    ? 'border-purple-300 bg-purple-50 cursor-pointer'
                                    : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Calendar
                                    size={16}
                                    className="text-gray-500"
                                  />
                                  <span className="font-medium text-gray-900">
                                    {slot.date}
                                  </span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={
                                    slot.available
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-gray-50 text-gray-500'
                                  }
                                >
                                  {slot.available ? 'Disponible' : 'Occupé'}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span>{slot.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Timer size={14} />
                                  <span>{slot.duration}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Schedule Button */}
                      <div className="pt-4 border-t">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                          disabled={!selectedSlot}
                        >
                          <Calendar size={16} className="mr-2" />
                          Confirmer la Planification
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Live Tab */}
                <TabsContent value="live" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mic className="text-red-600" size={20} />
                        Entretien en Direct
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!isCallActive ? (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Video className="text-purple-600" size={40} />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Prêt pour votre entretien ?
                          </h3>
                          <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Votre entretien avec {selectedAI.name} est
                            programmé. Cliquez pour démarrer l'appel.
                          </p>

                          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
                            <div className="text-center">
                              <Mic
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                Audio HD
                              </p>
                              <p className="text-xs text-gray-600">
                                Qualité optimale
                              </p>
                            </div>
                            <div className="text-center">
                              <Brain
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                IA Avancée
                              </p>
                              <p className="text-xs text-gray-600">
                                Analyse en temps réel
                              </p>
                            </div>
                            <div className="text-center">
                              <Shield
                                className="text-gray-400 mx-auto mb-2"
                                size={24}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                Sécurisé
                              </p>
                              <p className="text-xs text-gray-600">
                                Données protégées
                              </p>
                            </div>
                          </div>

                          <Button
                            onClick={() => setIsCallActive(true)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                          >
                            <PlayCircle size={16} className="mr-2" />
                            Démarrer l'Entretien
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Call Interface */}
                          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={selectedAI.avatar}
                                  alt={selectedAI.name}
                                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {selectedAI.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {selectedAI.personality}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-emerald-600">
                                      En ligne
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                  {formatDuration(callDuration)}
                                </div>
                                <p className="text-sm text-gray-600">
                                  Durée de l'appel
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-center gap-4">
                              <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full"
                              >
                                <Mic size={20} />
                              </Button>
                              <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full"
                              >
                                <Video size={20} />
                              </Button>
                              <Button
                                variant="destructive"
                                size="lg"
                                className="rounded-full"
                                onClick={() => setIsCallActive(false)}
                              >
                                <Phone size={20} />
                              </Button>
                            </div>
                          </div>

                          {/* Real-time Feedback */}
                          <div className="grid md:grid-cols-3 gap-4">
                            <Card className="p-4 border border-blue-200 bg-blue-50">
                              <div className="flex items-center gap-2 mb-2">
                                <Volume2 className="text-blue-600" size={16} />
                                <span className="font-medium text-blue-900">
                                  Clarté Vocale
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress value={88} className="flex-1" />
                                <span className="text-sm font-medium text-blue-700">
                                  88%
                                </span>
                              </div>
                            </Card>

                            <Card className="p-4 border border-emerald-200 bg-emerald-50">
                              <div className="flex items-center gap-2 mb-2">
                                <Heart className="text-emerald-600" size={16} />
                                <span className="font-medium text-emerald-900">
                                  Confiance
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress value={75} className="flex-1" />
                                <span className="text-sm font-medium text-emerald-700">
                                  75%
                                </span>
                              </div>
                            </Card>

                            <Card className="p-4 border border-purple-200 bg-purple-50">
                              <div className="flex items-center gap-2 mb-2">
                                <Waves className="text-purple-600" size={16} />
                                <span className="font-medium text-purple-900">
                                  Rythme
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress value={92} className="flex-1" />
                                <span className="text-sm font-medium text-purple-700">
                                  92%
                                </span>
                              </div>
                            </Card>
                          </div>

                          {/* Current Question */}
                          <Card className="border border-amber-200 bg-amber-50">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <MessageSquare
                                  className="text-amber-600"
                                  size={20}
                                />
                                <span className="font-medium text-amber-900">
                                  Question en cours
                                </span>
                              </div>
                              <p className="text-gray-800 text-lg mb-4">
                                "Parlez-moi d'une situation où vous avez dû
                                gérer un conflit au sein de votre équipe.
                                Comment avez-vous procédé ?"
                              </p>
                              <div className="flex items-center gap-4 text-sm text-amber-800">
                                <div className="flex items-center gap-1">
                                  <Timer size={14} />
                                  <span>Temps recommandé: 2-3 minutes</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target size={14} />
                                  <span>Focus: Gestion de conflit</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reports Tab */}
                <TabsContent value="reports" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="text-emerald-600" size={20} />
                        Rapport d'Analyse Vocale
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overall Score */}
                        <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                          <div
                            className={`text-5xl font-bold ${getScoreColor(selectedReport.overallScore)} mb-2`}
                          >
                            {selectedReport.overallScore}%
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Performance Globale
                          </h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            Entretien de {selectedReport.duration} avec{' '}
                            {selectedReport.questionsAnswered} questions
                          </p>
                          <div className="flex justify-center gap-4 mt-4">
                            <Badge className="bg-emerald-500 text-white">
                              Niveau: Intermédiaire+
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700"
                            >
                              Percentile:{' '}
                              {selectedReport.comparisonData.percentile}%
                            </Badge>
                          </div>
                        </div>

                        {/* Voice Analysis Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Assertiveness */}
                          <Card className="p-4 border border-blue-200 bg-blue-50">
                            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                              <Target size={16} />
                              Assertivité (
                              {selectedReport.voiceAnalysis.assertiveness.score}
                              %)
                            </h4>
                            <p className="text-sm text-blue-800 mb-3">
                              {
                                selectedReport.voiceAnalysis.assertiveness
                                  .description
                              }
                            </p>
                            <div className="space-y-2">
                              <h5 className="font-medium text-blue-900 text-sm">
                                Exemples positifs:
                              </h5>
                              {selectedReport.voiceAnalysis.assertiveness.examples
                                .slice(0, 2)
                                .map((example, index) => (
                                  <p
                                    key={index}
                                    className="text-xs text-blue-700 flex items-start gap-2"
                                  >
                                    <CheckCircle
                                      size={12}
                                      className="mt-0.5 flex-shrink-0"
                                    />
                                    {example}
                                  </p>
                                ))}
                            </div>
                          </Card>

                          {/* Tone Analysis */}
                          <Card className="p-4 border border-purple-200 bg-purple-50">
                            <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                              <Volume2 size={16} />
                              Ton ({selectedReport.voiceAnalysis.tone.score}%)
                            </h4>
                            <p className="text-sm text-purple-800 mb-3">
                              Ton dominant:{' '}
                              {selectedReport.voiceAnalysis.tone.dominantTone}
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-purple-700">
                                  Variation tonale
                                </span>
                                <span className="font-medium">
                                  {
                                    selectedReport.voiceAnalysis.tone
                                      .toneVariation
                                  }
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  selectedReport.voiceAnalysis.tone
                                    .toneVariation
                                }
                                className="h-2"
                              />
                            </div>
                          </Card>

                          {/* Emotion Analysis */}
                          <Card className="p-4 border border-emerald-200 bg-emerald-50">
                            <h4 className="font-medium text-emerald-900 mb-3 flex items-center gap-2">
                              <Heart size={16} />
                              Gestion Émotionnelle (
                              {selectedReport.voiceAnalysis.emotion.score}%)
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-emerald-700">
                                  Stabilité
                                </span>
                                <div className="font-medium">
                                  {
                                    selectedReport.voiceAnalysis.emotion
                                      .emotionalStability
                                  }
                                  %
                                </div>
                              </div>
                              <div>
                                <span className="text-emerald-700">
                                  Confiance
                                </span>
                                <div className="font-medium">
                                  {
                                    selectedReport.voiceAnalysis.emotion
                                      .confidence
                                  }
                                  %
                                </div>
                              </div>
                              <div>
                                <span className="text-emerald-700">Stress</span>
                                <div className="font-medium">
                                  {selectedReport.voiceAnalysis.emotion.stress}%
                                </div>
                              </div>
                              <div>
                                <span className="text-emerald-700">
                                  Enthousiasme
                                </span>
                                <div className="font-medium">
                                  {
                                    selectedReport.voiceAnalysis.emotion
                                      .enthusiasm
                                  }
                                  %
                                </div>
                              </div>
                            </div>
                          </Card>

                          {/* Speech Pattern */}
                          <Card className="p-4 border border-amber-200 bg-amber-50">
                            <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
                              <Waves size={16} />
                              Patterns de Parole
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-amber-700">Rythme</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis.speechPattern
                                        .pace.score
                                    }
                                    %
                                  </span>
                                </div>
                                <p className="text-xs text-amber-800">
                                  {
                                    selectedReport.voiceAnalysis.speechPattern
                                      .pace.wordsPerMinute
                                  }{' '}
                                  mots/min
                                </p>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-amber-700">Clarté</span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis.speechPattern
                                        .clarity.score
                                    }
                                    %
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-amber-700">
                                    Fluidité
                                  </span>
                                  <span className="font-medium">
                                    {
                                      selectedReport.voiceAnalysis.speechPattern
                                        .fluency.score
                                    }
                                    %
                                  </span>
                                </div>
                                <p className="text-xs text-amber-800">
                                  {
                                    selectedReport.voiceAnalysis.speechPattern
                                      .fluency.fillerWords
                                  }{' '}
                                  mots de remplissage
                                </p>
                              </div>
                            </div>
                          </Card>
                        </div>

                        {/* Emotional Journey */}
                        <Card className="p-4">
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <Activity size={16} />
                            Parcours Émotionnel
                          </h4>
                          <div className="space-y-3">
                            {selectedReport.voiceAnalysis.emotion.emotionalJourney.map(
                              (point, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                                >
                                  {getEmotionIcon(point.emotion)}
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-gray-900">
                                        {point.emotion}
                                      </span>
                                      <span className="text-sm text-gray-600">
                                        {point.timestamp}
                                      </span>
                                    </div>
                                    <Progress
                                      value={point.intensity}
                                      className="h-2 mt-1"
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </Card>

                        {/* Strengths and Improvements */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="p-4 border border-emerald-200 bg-emerald-50">
                            <h4 className="font-medium text-emerald-900 mb-3 flex items-center gap-2">
                              <ThumbsUp size={16} />
                              Points Forts
                            </h4>
                            <ul className="space-y-2">
                              {selectedReport.strengths.map(
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
                              {selectedReport.improvements.map(
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

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-6 border-t">
                          <Button className="bg-emerald-500 hover:bg-emerald-600">
                            <Download size={16} className="mr-2" />
                            Télécharger le Rapport
                          </Button>
                          <Button variant="outline">
                            <Share size={16} className="mr-2" />
                            Partager
                          </Button>
                          <Button variant="outline">
                            <Calendar size={16} className="mr-2" />
                            Planifier Suivi
                          </Button>
                          <Button variant="outline">
                            <Bookmark size={16} className="mr-2" />
                            Sauvegarder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Progress Tab */}
                <TabsContent value="progress" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="text-blue-600" size={20} />
                        Progression Vocale
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Progress Overview */}
                        <div className="grid md:grid-cols-4 gap-4">
                          <Card className="p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {speechSoftSkillsData.userProgress.totalSessions}
                            </div>
                            <p className="text-sm text-gray-600">Sessions</p>
                          </Card>
                          <Card className="p-4 text-center">
                            <div
                              className={`text-2xl font-bold ${getScoreColor(speechSoftSkillsData.userProgress.averageScore)} mb-1`}
                            >
                              {speechSoftSkillsData.userProgress.averageScore}%
                            </div>
                            <p className="text-sm text-gray-600">Score Moyen</p>
                          </Card>
                          <Card className="p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              +
                              {
                                speechSoftSkillsData.userProgress
                                  .improvementRate
                              }
                              %
                            </div>
                            <p className="text-sm text-gray-600">
                              Amélioration
                            </p>
                          </Card>
                          <Card className="p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              {speechSoftSkillsData.userProgress.totalTimeSpent}
                            </div>
                            <p className="text-sm text-gray-600">Temps Total</p>
                          </Card>
                        </div>

                        {/* Skills Progress */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">
                            Compétences Développées
                          </h4>
                          <div className="space-y-3">
                            {speechSoftSkillsData.userProgress.strongestAreas.map(
                              (area, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg"
                                >
                                  <span className="font-medium text-emerald-900">
                                    {area}
                                  </span>
                                  <Badge className="bg-emerald-500 text-white">
                                    Maîtrisé
                                  </Badge>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Areas to Improve */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">
                            Axes d'Amélioration
                          </h4>
                          <div className="space-y-3">
                            {speechSoftSkillsData.userProgress.improvementAreas.map(
                              (area, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                                >
                                  <span className="font-medium text-amber-900">
                                    {area}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="border-amber-200 text-amber-700"
                                  >
                                    En cours
                                  </Badge>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Session History */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">
                            Historique des Sessions
                          </h4>
                          <div className="space-y-3">
                            {speechSoftSkillsData.userProgress.sessionsHistory.map(
                              (session, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                                >
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-gray-900">
                                        {session.focus}
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {session.date}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1">
                                      <span
                                        className={`font-medium ${getScoreColor(session.score)}`}
                                      >
                                        Score: {session.score}%
                                      </span>
                                      <span className="text-sm text-emerald-600">
                                        +{session.improvement}% d'amélioration
                                      </span>
                                    </div>
                                  </div>
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-6 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-purple-600" size={20} />
                    Intervieweurs IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {speechSoftSkillsData.aiInterviewers.slice(0, 3).map(ai => (
                    <div
                      key={ai.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={ai.avatar}
                        alt={ai.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {ai.name}
                        </h4>
                        <p className="text-xs text-gray-600">{ai.experience}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star
                            className="text-amber-400 fill-current"
                            size={10}
                          />
                          <span className="text-xs text-gray-600">
                            {ai.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-amber-600" size={20} />
                    Conseils Vocaux
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {speechSoftSkillsData.tips.slice(0, 4).map((tip, index) => (
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
                    <Settings className="text-gray-600" size={20} />
                    Prérequis Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Globe size={14} />
                      Appel Web
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Chrome 90+ recommandé</li>
                      <li>• Connexion 1 Mbps min</li>
                      <li>• Microphone de qualité</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Smartphone size={14} />
                      Appel Téléphone
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ligne fixe ou mobile</li>
                      <li>• Environnement silencieux</li>
                      <li>• Forfait illimité conseillé</li>
                    </ul>
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
