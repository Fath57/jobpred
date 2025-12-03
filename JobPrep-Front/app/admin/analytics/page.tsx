'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Globe,
  Target,
  Zap,
  Calendar,
  Download,
} from 'lucide-react';
import AdminStatsCard from '@/components/admin/AdminStatsCard';
import AdminChart from '@/components/admin/AdminChart';

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const overallStats = [
    {
      title: 'Revenus Totaux',
      value: '€127,890',
      change: '+23.1%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Utilisateurs Actifs',
      value: '8,456',
      change: '+15.7%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Taux Conversion',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up' as const,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Engagement',
      value: '87%',
      change: '+5.2%',
      trend: 'up' as const,
      icon: Activity,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const domainAnalytics = [
    {
      domain: 'Letters',
      users: 8234,
      revenue: 45600,
      growth: 12.5,
      conversion: 4.2,
      engagement: 89,
      color: 'bg-emerald-500',
    },
    {
      domain: 'Resume',
      users: 6789,
      revenue: 38900,
      growth: 18.3,
      conversion: 3.8,
      engagement: 85,
      color: 'bg-blue-500',
    },
    {
      domain: 'Tests',
      users: 9876,
      revenue: 52400,
      growth: 22.1,
      conversion: 2.9,
      engagement: 92,
      color: 'bg-purple-500',
    },
    {
      domain: 'Speech',
      users: 3456,
      revenue: 21800,
      growth: 35.7,
      conversion: 5.1,
      engagement: 78,
      color: 'bg-amber-500',
    },
  ];

  const topFeatures = [
    {
      feature: 'Génération Lettres IA',
      usage: 89,
      satisfaction: 4.8,
      revenue: 34500,
    },
    { feature: 'Analyse CV ATS', usage: 76, satisfaction: 4.6, revenue: 28900 },
    {
      feature: 'Tests Soft Skills',
      usage: 82,
      satisfaction: 4.7,
      revenue: 31200,
    },
    {
      feature: 'Entretiens Vocaux',
      usage: 45,
      satisfaction: 4.9,
      revenue: 18700,
    },
    {
      feature: 'Optimisation CV',
      usage: 67,
      satisfaction: 4.5,
      revenue: 22100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Globales
          </h1>
          <p className="text-gray-600 mt-2">
            Analyse des performances et métriques de la plateforme
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <AdminStatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="domains">Par Domaine</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AdminChart
              title="Évolution du Trafic"
              type="line"
              data={{
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                datasets: [
                  {
                    label: 'Visiteurs uniques',
                    data: [12000, 19000, 25000, 32000, 28000, 35000],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  },
                ],
              }}
            />

            <AdminChart
              title="Conversion par Canal"
              type="doughnut"
              data={{
                labels: ['Organique', 'Payant', 'Social', 'Direct', 'Email'],
                datasets: [
                  {
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                      'rgba(34, 197, 94, 0.8)',
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(147, 51, 234, 0.8)',
                      'rgba(245, 158, 11, 0.8)',
                      'rgba(239, 68, 68, 0.8)',
                    ],
                  },
                ],
              }}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-purple-600" size={20} />
                Top Fonctionnalités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {feature.feature}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>Usage: {feature.usage}%</span>
                        <span>Satisfaction: {feature.satisfaction}/5</span>
                        <span>
                          Revenus: €{feature.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${feature.usage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} />
                Performance par Domaine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {domainAnalytics.map((domain, index) => (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${domain.color}`}
                        ></div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {domain.domain}
                        </h3>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700"
                      >
                        +{domain.growth}% croissance
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {domain.users.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Utilisateurs
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          €{domain.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Revenus</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {domain.conversion}%
                        </div>
                        <div className="text-sm text-gray-600">Conversion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {domain.engagement}%
                        </div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">
                          +{domain.growth}%
                        </div>
                        <div className="text-sm text-gray-600">Croissance</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AdminChart
              title="Acquisition Utilisateurs"
              type="bar"
              data={{
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                datasets: [
                  {
                    label: 'Nouveaux utilisateurs',
                    data: [1200, 1900, 3000, 5000, 7500, 8900],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  },
                ],
              }}
            />

            <AdminChart
              title="Rétention Utilisateurs"
              type="line"
              data={{
                labels: ['Jour 1', 'Jour 7', 'Jour 30', 'Jour 90'],
                datasets: [
                  {
                    label: 'Taux de rétention',
                    data: [100, 65, 45, 32],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  },
                ],
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AdminChart
              title="Évolution des Revenus"
              type="line"
              data={{
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                datasets: [
                  {
                    label: 'Revenus (€)',
                    data: [45000, 52000, 67000, 89000, 112000, 127890],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  },
                ],
              }}
            />

            <AdminChart
              title="Revenus par Plan"
              type="doughnut"
              data={{
                labels: ['Premium', 'Pro', 'Freemium'],
                datasets: [
                  {
                    data: [65, 25, 10],
                    backgroundColor: [
                      'rgba(147, 51, 234, 0.8)',
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(156, 163, 175, 0.8)',
                    ],
                  },
                ],
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
