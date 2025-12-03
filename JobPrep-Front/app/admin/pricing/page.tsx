'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Users,
  ArrowRight,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminPricingPage() {
  const stats = [
    {
      title: 'Revenus Totaux',
      value: '€127,890',
      change: '+23.1%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Packs Actifs',
      value: '12',
      change: '+2',
      trend: 'up' as const,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Options Disponibles',
      value: '18',
      change: '+3',
      trend: 'up' as const,
      icon: Settings,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Clients Premium',
      value: '2,456',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    }
  ];

  const quickActions = [
    {
      title: 'Gestion des Options',
      description: 'Créer et gérer les options individuelles',
      icon: Settings,
      href: '/admin/pricing/options',
      color: 'bg-blue-500'
    },
    {
      title: 'Gestion des Packs',
      description: 'Créer et gérer les packs de services',
      icon: Package,
      href: '/admin/pricing/packs',
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics Pricing',
      description: 'Analyser les performances des prix',
      icon: TrendingUp,
      href: '/admin/pricing/analytics',
      color: 'bg-emerald-500'
    }
  ];

  const recentActivity = [
    { action: 'Nouveau pack créé', item: 'Pack Premium', time: '2 min' },
    { action: 'Option modifiée', item: 'CV Redesign - €55', time: '15 min' },
    { action: 'Pack désactivé', item: 'Pack Basique', time: '1h' },
    { action: 'Prix mis à jour', item: 'Communication Bundle', time: '2h' }
  ];

  return (
    <DashboardLayout> 
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Prix</h1>
          <p className="text-gray-600 mt-2">Gérez les options et packs de services</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-emerald-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`${stat.color}`} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actions rapides */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} href={action.href}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${action.color} text-white`}>
                              <Icon size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{action.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                            </div>
                            <ArrowRight size={20} className="text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activité récente */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.item}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Informations sur les packs par défaut */}
      <Card>
        <CardHeader>
          <CardTitle>Packs par Défaut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Pack Basique - €90</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Refonte de CV</li>
                <li>• Lettre de motivation</li>
                <li>• Skills tests</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Pack Basique+ - €120</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tout le Pack Basique</li>
                <li>• Communication bundle</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Pack Basique++ - €150</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tout le Pack Basique+</li>
                <li>• Resume analysis</li>
                <li>• Follow up letter</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}
