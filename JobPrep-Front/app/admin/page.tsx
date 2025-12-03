'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  BarChart3,
  Globe,
} from 'lucide-react';
import AdminStatsCard from '@/components/admin/AdminStatsCard';
import AdminChart from '@/components/admin/AdminChart';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminDashboard() {
  const globalStats = [
    {
      title: 'Utilisateurs Actifs',
      value: '12,847',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Lettres Générées',
      value: '45,231',
      change: '+8.2%',
      trend: 'up' as const,
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Tests Complétés',
      value: '89,456',
      change: '+15.7%',
      trend: 'up' as const,
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Revenus Mensuel',
      value: '€127,890',
      change: '+23.1%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const recentActivity = [
    {
      type: 'user',
      message: 'Nouveau utilisateur premium inscrit',
      time: '2 min',
    },
    {
      type: 'system',
      message: 'Mise à jour du modèle IA déployée',
      time: '15 min',
    },
    { type: 'alert', message: 'Pic de trafic détecté (+150%)', time: '1h' },
    { type: 'success', message: 'Sauvegarde automatique réussie', time: '2h' },
  ];

  const domainPerformance = [
    {
      domain: 'Letters',
      users: 8234,
      growth: 12.5,
      revenue: 45600,
      status: 'excellent',
    },
    {
      domain: 'Resume',
      users: 6789,
      growth: 18.3,
      revenue: 38900,
      status: 'good',
    },
    {
      domain: 'Tests',
      users: 9876,
      growth: 22.1,
      revenue: 52400,
      status: 'excellent',
    },
    {
      domain: 'Speech',
      users: 3456,
      growth: 35.7,
      revenue: 21800,
      status: 'growing',
    },
  ];

  return (
    <DashboardLayout> 
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de Bord Administrateur
        </h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble de la plateforme JobPrep
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((stat, index) => (
          <AdminStatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Domain Performance */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} />
                Performance par Domaine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domainPerformance.map((domain, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">
                          {domain.domain[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {domain.domain}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {domain.users.toLocaleString()} utilisateurs
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="text-emerald-500" size={16} />
                        <span className="font-medium text-emerald-600">
                          +{domain.growth}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        €{domain.revenue.toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        domain.status === 'excellent'
                          ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                          : domain.status === 'good'
                            ? 'border-blue-200 text-blue-700 bg-blue-50'
                            : 'border-amber-200 text-amber-700 bg-amber-50'
                      }
                    >
                      {domain.status === 'excellent'
                        ? 'Excellent'
                        : domain.status === 'good'
                          ? 'Bon'
                          : 'En croissance'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-purple-600" size={20} />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'user'
                          ? 'bg-blue-100'
                          : activity.type === 'system'
                            ? 'bg-purple-100'
                            : activity.type === 'alert'
                              ? 'bg-amber-100'
                              : 'bg-emerald-100'
                      }`}
                    >
                      {activity.type === 'user' && (
                        <Users size={16} className="text-blue-600" />
                      )}
                      {activity.type === 'system' && (
                        <Activity size={16} className="text-purple-600" />
                      )}
                      {activity.type === 'alert' && (
                        <AlertTriangle size={16} className="text-amber-600" />
                      )}
                      {activity.type === 'success' && (
                        <CheckCircle size={16} className="text-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        Il y a {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <AdminChart
          title="Croissance Utilisateurs"
          type="line"
          data={{
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
            datasets: [
              {
                label: 'Nouveaux utilisateurs',
                data: [1200, 1900, 3000, 5000, 7500, 8900],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              },
            ],
          }}
        />

        <AdminChart
          title="Revenus par Domaine"
          type="doughnut"
          data={{
            labels: ['Letters', 'Resume', 'Tests', 'Speech'],
            datasets: [
              {
                data: [45600, 38900, 52400, 21800],
                backgroundColor: [
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(147, 51, 234, 0.8)',
                  'rgba(245, 158, 11, 0.8)',
                ],
              },
            ],
          }}
        />
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="text-emerald-600" size={20} />
            État du Système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-emerald-900">API Status</p>
              <p className="text-xs text-emerald-700">Opérationnel</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-emerald-900">
                Base de Données
              </p>
              <p className="text-xs text-emerald-700">Opérationnel</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-emerald-900">
                IA Services
              </p>
              <p className="text-xs text-emerald-700">Opérationnel</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-amber-900">CDN</p>
              <p className="text-xs text-amber-700">Maintenance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}
