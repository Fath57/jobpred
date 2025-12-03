'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Package,
  Users,
  BarChart3,
  Download,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AdminPricingAnalyticsPage() {
  const revenueStats = [
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
      title: 'Revenus Moyens',
      value: '€89.50',
      change: '+5.2%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Conversion',
      value: '12.4%',
      change: '-1.2%',
      trend: 'down' as const,
      icon: Target,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Clients Premium',
      value: '2,456',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const topPerformingPacks = [
    { name: 'Pack Basique', sales: 145, revenue: '€13,050', growth: '+15.2%' },
    { name: 'Pack Basique+', sales: 98, revenue: '€11,760', growth: '+8.7%' },
    { name: 'Pack Basique++', sales: 67, revenue: '€10,050', growth: '+23.1%' },
    { name: 'Pack Premium', sales: 34, revenue: '€8,500', growth: '+5.4%' }
  ];

  const topPerformingOptions = [
    { name: 'Refonte de CV', sales: 234, revenue: '€11,700', growth: '+18.3%' },
    { name: 'Lettre de motivation', sales: 198, revenue: '€5,940', growth: '+12.1%' },
    { name: 'Skills tests', sales: 156, revenue: '€3,900', growth: '+9.8%' },
    { name: 'Communication bundle', sales: 123, revenue: '€4,920', growth: '+7.2%' }
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 8500, packs: 95, options: 234 },
    { month: 'Fév', revenue: 9200, packs: 108, options: 267 },
    { month: 'Mar', revenue: 10800, packs: 127, options: 298 },
    { month: 'Avr', revenue: 11500, packs: 134, options: 312 },
    { month: 'Mai', revenue: 13200, packs: 145, options: 345 },
    { month: 'Juin', revenue: 12789, packs: 142, options: 338 }
  ];

  return (
    <DashboardLayout> 
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Pricing</h1>
          <p className="text-gray-600 mt-2">Analyse des performances des prix et des ventes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={20} />
            Période
          </Button>
          <Button className="flex items-center gap-2">
            <Download size={20} />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="text-emerald-600" size={16} />
                      ) : (
                        <TrendingDown className="text-red-600" size={16} />
                      )}
                      <p className={`text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.change}
                      </p>
                    </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Packs les plus performants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="text-blue-600" size={20} />
              Packs les Plus Performants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingPacks.map((pack, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{pack.name}</h4>
                      <p className="text-sm text-gray-600">{pack.sales} ventes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{pack.revenue}</div>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                      {pack.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Options les plus performantes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="text-purple-600" size={20} />
              Options les Plus Performantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingOptions.map((option, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{option.name}</h4>
                      <p className="text-sm text-gray-600">{option.sales} ventes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{option.revenue}</div>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                      {option.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Évolution des revenus */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-emerald-600" size={20} />
            Évolution des Revenus (6 derniers mois)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Graphique simple (placeholder) */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Graphique des revenus</p>
                <p className="text-sm text-gray-500">Intégration avec une librairie de graphiques recommandée</p>
              </div>
            </div>

            {/* Tableau des données */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Mois</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Revenus</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Packs Vendus</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Options Vendues</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRevenue.map((month, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-medium">{month.month}</td>
                      <td className="py-3 px-4 text-right">€{month.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{month.packs}</td>
                      <td className="py-3 px-4 text-right">{month.options}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommandations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Opportunités d'Amélioration</h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900">Pack Premium</h4>
                  <p className="text-sm text-blue-700">
                    Le Pack Premium montre une croissance faible (+5.4%). 
                    Considérez ajuster le prix ou ajouter plus de valeur.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-900">Taux de Conversion</h4>
                  <p className="text-sm text-amber-700">
                    Le taux de conversion a baissé de 1.2%. 
                    Analysez les points de friction dans le processus d'achat.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Points Forts</h3>
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <h4 className="font-medium text-emerald-900">Pack Basique++</h4>
                  <p className="text-sm text-emerald-700">
                    Excellente performance (+23.1%). 
                    Ce pack semble bien positionné sur le marché.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900">Refonte de CV</h4>
                  <p className="text-sm text-green-700">
                    Service le plus populaire (+18.3%). 
                    Considérez créer des variantes premium.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}
