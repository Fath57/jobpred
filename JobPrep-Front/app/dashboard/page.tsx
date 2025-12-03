'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ChatWidget from '@/components/chat/ChatWidget';
import {
  useSidebar,
  useAuth,
  useUserProfile,
  useAppMetrics,
} from '@/lib/hooks';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  FileText,
  Mail,
  Brain,
  Mic,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Calendar,
  Award,
} from 'lucide-react';

export default function DashboardPage() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const { isAuthenticated, user: authUser } = useAuth();
  const { profile, isLoading: profileLoading } = useUserProfile();
  const { getMetrics } = useAppMetrics();

  const user = profile || authUser;
  const metrics = getMetrics();

  // Utilisation des données réelles depuis les stores
  const quickStats = [
    {
      label: 'Lettres de Motivation',
      value: metrics.content.totalMotivationLetters.toString(),
      icon: FileText,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Tests Réalisés',
      value: metrics.content.totalTests.toString(),
      icon: Brain,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Sessions Vocales',
      value: metrics.content.totalSpeechSessions.toString(),
      icon: Mic,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'CV Créés',
      value: metrics.content.totalResumes.toString(),
      icon: MessageSquare,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'resume',
      title: 'Analyse CV complétée',
      time: '2h',
      status: 'completed',
    },
    {
      id: 2,
      type: 'letter',
      title: 'Lettre de motivation générée',
      time: '4h',
      status: 'completed',
    },
    {
      id: 3,
      type: 'test',
      title: 'Test Soft Skills en cours',
      time: '1j',
      status: 'in-progress',
    },
    {
      id: 4,
      type: 'speech',
      title: 'Simulation entretien HR',
      time: '2j',
      status: 'pending',
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Terminer le test de personnalité',
      priority: 'high',
      dueDate: "Aujourd'hui",
    },
    {
      id: 2,
      title: "Réviser les réponses d'entretien",
      priority: 'medium',
      dueDate: 'Demain',
    },
    {
      id: 3,
      title: 'Mettre à jour le profil LinkedIn',
      priority: 'low',
      dueDate: 'Cette semaine',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bonjour, {user?.firstName || 'Utilisateur'} ! 👋
            </h1>
            <p className="text-gray-600">
              Voici un aperçu de votre progression et de vos prochaines étapes
              pour décrocher votre emploi idéal.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className={`${stat.color}`} size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-emerald-600" size={20} />
                    Activités Récentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map(activity => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {activity.status === 'completed' && (
                          <CheckCircle className="text-emerald-500" size={20} />
                        )}
                        {activity.status === 'in-progress' && (
                          <Clock className="text-amber-500" size={20} />
                        )}
                        {activity.status === 'pending' && (
                          <AlertCircle className="text-gray-400" size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Il y a {activity.time}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          activity.status === 'completed'
                            ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                            : activity.status === 'in-progress'
                              ? 'border-amber-200 text-amber-700 bg-amber-50'
                              : 'border-gray-200 text-gray-700 bg-gray-50'
                        }
                      >
                        {activity.status === 'completed'
                          ? 'Terminé'
                          : activity.status === 'in-progress'
                            ? 'En cours'
                            : 'En attente'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="text-blue-600" size={20} />
                    Tâches à Venir
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingTasks.map(task => (
                    <div
                      key={task.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          variant="outline"
                          className={
                            task.priority === 'high'
                              ? 'border-red-200 text-red-700 bg-red-50'
                              : task.priority === 'medium'
                                ? 'border-amber-200 text-amber-700 bg-amber-50'
                                : 'border-gray-200 text-gray-700 bg-gray-50'
                          }
                        >
                          {task.priority === 'high'
                            ? 'Urgent'
                            : task.priority === 'medium'
                              ? 'Moyen'
                              : 'Faible'}
                        </Badge>
                      </div>
                      <p className="font-medium text-gray-900 mb-1">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        {task.dueDate}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="text-purple-600" size={20} />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <FileText size={24} />
                  <span className="text-sm font-medium">Analyser CV</span>
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">
                  <Mail size={24} />
                  <span className="text-sm font-medium">Nouvelle Lettre</span>
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200">
                  <Brain size={24} />
                  <span className="text-sm font-medium">Test Compétences</span>
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200">
                  <Mic size={24} />
                  <span className="text-sm font-medium">Simulation Vocale</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <ChatWidget />
    </div>
  );
}
