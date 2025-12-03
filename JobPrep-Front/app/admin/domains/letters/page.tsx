'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Mail,
  FileText,
  TrendingUp,
  Users,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Download,
} from 'lucide-react';
import AdminStatsCard from '@/components/admin/AdminStatsCard';

export default function AdminLettersPage() {
  const lettersStats = [
    {
      title: 'Lettres Générées',
      value: '45,231',
      change: '+12.5%',
      trend: 'up' as const,
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Utilisateurs Actifs',
      value: '8,234',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Taux de Réussite',
      value: '87%',
      change: '+5.7%',
      trend: 'up' as const,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Score Moyen',
      value: '89/100',
      change: '+3.2%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const recentLetters = [
    {
      id: '1',
      type: 'Motivation',
      user: 'Jean René R.',
      company: 'TechCorp Solutions',
      position: 'Directeur IT',
      score: 92,
      status: 'sent',
      createdAt: '2024-01-20T10:30:00Z',
      template: 'Executive Pro',
      tone: 'Professionnel',
    },
    {
      id: '2',
      type: 'Follow-up',
      user: 'Marie D.',
      company: 'Digital Innovations',
      position: 'Chef de Projet',
      score: 85,
      status: 'generated',
      createdAt: '2024-01-20T09:15:00Z',
      template: 'Relance Polie',
      tone: 'Bienveillant',
    },
    {
      id: '3',
      type: 'Motivation',
      user: 'Pierre M.',
      company: 'StartupTech',
      position: 'Développeur Senior',
      score: 78,
      status: 'draft',
      createdAt: '2024-01-20T08:45:00Z',
      template: 'Modern Impact',
      tone: 'Enthousiaste',
    },
  ];

  const templateStats = [
    { name: 'Executive Pro', usage: 34, avgScore: 91, satisfaction: 4.8 },
    { name: 'Modern Impact', usage: 28, avgScore: 87, satisfaction: 4.6 },
    {
      name: 'Creative Storyteller',
      usage: 18,
      avgScore: 84,
      satisfaction: 4.7,
    },
    { name: 'Consultant Expert', usage: 20, avgScore: 89, satisfaction: 4.9 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'border-emerald-200 text-emerald-700 bg-emerald-50';
      case 'generated':
        return 'border-blue-200 text-blue-700 bg-blue-50';
      case 'draft':
        return 'border-amber-200 text-amber-700 bg-amber-50';
      default:
        return 'border-gray-200 text-gray-700 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Domaine Letters</h1>
          <p className="text-gray-600 mt-2">
            Supervision des lettres de motivation et de relance
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <BarChart3 size={16} className="mr-2" />
            Analytics Détaillées
          </Button>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exporter Données
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lettersStats.map((stat, index) => (
          <AdminStatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Letters */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="text-emerald-600" size={20} />
                Lettres Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLetters.map(letter => (
                  <div
                    key={letter.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            {letter.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getStatusColor(letter.status)}
                          >
                            {letter.status === 'sent'
                              ? 'Envoyée'
                              : letter.status === 'generated'
                                ? 'Générée'
                                : 'Brouillon'}
                          </Badge>
                          <span
                            className={`font-bold ${getScoreColor(letter.score)}`}
                          >
                            {letter.score}/100
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-1">
                          {letter.user} → {letter.company}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {letter.position}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Template: {letter.template}</span>
                          <span>Ton: {letter.tone}</span>
                          <span>
                            <Clock size={12} className="inline mr-1" />
                            {new Date(letter.createdAt).toLocaleDateString(
                              'fr-FR'
                            )}
                          </span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        Voir Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Performance */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-purple-600" size={20} />
                Performance Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templateStats.map((template, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {template.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {template.usage}% usage
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Score moyen:</span>
                        <span
                          className={`ml-1 font-medium ${getScoreColor(template.avgScore)}`}
                        >
                          {template.avgScore}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Satisfaction:</span>
                        <span className="ml-1 font-medium text-amber-600">
                          {template.satisfaction}/5
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-blue-600" size={20} />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText size={16} className="mr-2" />
                  Nouveau Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp size={16} className="mr-2" />
                  Analyser Performance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users size={16} className="mr-2" />
                  Gérer Utilisateurs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle size={16} className="mr-2" />
                  Alertes Qualité
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Métriques de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Temps de génération moyen</span>
                <span className="font-medium">3.2s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Taux de satisfaction</span>
                <span className="font-medium text-emerald-600">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Lettres par utilisateur/mois
                </span>
                <span className="font-medium">5.7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Taux de conversion entretien
                </span>
                <span className="font-medium text-purple-600">23%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes & Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                <CheckCircle className="text-emerald-500" size={16} />
                <div>
                  <p className="text-sm font-medium text-emerald-900">
                    IA Generation Service
                  </p>
                  <p className="text-xs text-emerald-700">
                    Opérationnel - 99.9% uptime
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                <CheckCircle className="text-emerald-500" size={16} />
                <div>
                  <p className="text-sm font-medium text-emerald-900">
                    Template Engine
                  </p>
                  <p className="text-xs text-emerald-700">
                    Opérationnel - Performance optimale
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <AlertTriangle className="text-amber-500" size={16} />
                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Analytics Pipeline
                  </p>
                  <p className="text-xs text-amber-700">
                    Latence légèrement élevée
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
