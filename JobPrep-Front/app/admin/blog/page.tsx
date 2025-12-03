'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Search,
  Plus,
  Edit,
  Eye,
  Calendar,
  User,
  TrendingUp,
  Globe,
  Target,
  BarChart3,
} from 'lucide-react';
import AdminStatsCard from '@/components/admin/AdminStatsCard';

export default function AdminBlogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const blogStats = [
    {
      title: 'Articles Publiés',
      value: '127',
      change: '+8.2%',
      trend: 'up' as const,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Vues Mensuelles',
      value: '45,231',
      change: '+23.5%',
      trend: 'up' as const,
      icon: Eye,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Trafic SEO',
      value: '12,456',
      change: '+31.2%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Conversions',
      value: '892',
      change: '+15.7%',
      trend: 'up' as const,
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const articles = [
    {
      id: '1',
      title: "Comment optimiser votre CV avec l'IA en 2024",
      slug: 'optimiser-cv-ia-2024',
      excerpt:
        "Découvrez les dernières techniques d'optimisation de CV utilisant l'intelligence artificielle...",
      author: 'Marie Dubois',
      status: 'published',
      publishDate: '2024-01-20',
      views: 2847,
      category: 'Resume',
      tags: ['CV', 'IA', 'Optimisation', 'ATS'],
      seoScore: 92,
      readingTime: '5 min',
    },
    {
      id: '2',
      title: "Les 10 questions d'entretien les plus posées en 2024",
      slug: 'questions-entretien-2024',
      excerpt:
        "Préparez-vous aux questions d'entretien les plus fréquentes avec nos conseils d'experts...",
      author: 'Pierre Martin',
      status: 'draft',
      publishDate: null,
      views: 0,
      category: 'Interview',
      tags: ['Entretien', 'Questions', 'Préparation', 'RH'],
      seoScore: 78,
      readingTime: '8 min',
    },
    {
      id: '3',
      title: 'Soft Skills vs Hard Skills : Guide complet 2024',
      slug: 'soft-skills-vs-hard-skills-guide',
      excerpt:
        'Comprenez la différence entre soft skills et hard skills et leur importance...',
      author: 'Sophie Laurent',
      status: 'published',
      publishDate: '2024-01-18',
      views: 4521,
      category: 'Skills',
      tags: ['Soft Skills', 'Hard Skills', 'Compétences', 'Carrière'],
      seoScore: 88,
      readingTime: '12 min',
    },
    {
      id: '4',
      title: "L'avenir des tests de personnalité en recrutement",
      slug: 'tests-personnalite-recrutement-avenir',
      excerpt:
        'Analyse des tendances et évolutions des tests de personnalité dans le processus de recrutement...',
      author: 'Jean Dupont',
      status: 'scheduled',
      publishDate: '2024-01-25',
      views: 0,
      category: 'Personality',
      tags: ['Tests', 'Personnalité', 'Recrutement', 'Tendances'],
      seoScore: 85,
      readingTime: '10 min',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'border-emerald-200 text-emerald-700 bg-emerald-50';
      case 'draft':
        return 'border-gray-200 text-gray-700 bg-gray-50';
      case 'scheduled':
        return 'border-blue-200 text-blue-700 bg-blue-50';
      case 'archived':
        return 'border-red-200 text-red-700 bg-red-50';
      default:
        return 'border-gray-200 text-gray-700 bg-gray-50';
    }
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Blog</h1>
          <p className="text-gray-600 mt-2">
            Création et gestion de contenu pour la stratégie SEO
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <BarChart3 size={16} className="mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Nouvel Article
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogStats.map((stat, index) => (
          <AdminStatsCard key={index} {...stat} />
        ))}
      </div>

      {/* SEO Performance */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="text-emerald-600" size={20} />
              Performance SEO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  94
                </div>
                <p className="text-sm text-emerald-800">Score SEO Moyen</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  1,247
                </div>
                <p className="text-sm text-blue-800">Mots-clés Classés</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  67
                </div>
                <p className="text-sm text-purple-800">Backlinks</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  3.2%
                </div>
                <p className="text-sm text-amber-800">Taux Conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-purple-600" size={20} />
              Top Mots-clés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { keyword: 'optimiser cv', position: 3, volume: 2400 },
                { keyword: 'lettre motivation', position: 5, volume: 1800 },
                { keyword: 'test personnalité', position: 7, volume: 1200 },
                { keyword: 'entretien embauche', position: 12, volume: 3200 },
              ].map((kw, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{kw.keyword}</p>
                    <p className="text-xs text-gray-600">
                      {kw.volume} recherches/mois
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      kw.position <= 3
                        ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                        : kw.position <= 10
                          ? 'border-amber-200 text-amber-700 bg-amber-50'
                          : 'border-red-200 text-red-700 bg-red-50'
                    }
                  >
                    #{kw.position}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Articles List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            Articles du Blog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option value="all">Tous les statuts</option>
              <option value="published">Publiés</option>
              <option value="draft">Brouillons</option>
              <option value="scheduled">Programmés</option>
            </select>
          </div>

          <div className="space-y-4">
            {articles.map(article => (
              <div
                key={article.id}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {article.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={getStatusColor(article.status)}
                      >
                        {article.status === 'published'
                          ? 'Publié'
                          : article.status === 'draft'
                            ? 'Brouillon'
                            : article.status === 'scheduled'
                              ? 'Programmé'
                              : 'Archivé'}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-4">{article.excerpt}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          {article.publishDate
                            ? new Date(article.publishDate).toLocaleDateString(
                                'fr-FR'
                              )
                            : 'Non programmé'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={14} />
                        <span>{article.views.toLocaleString()} vues</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${getSEOScoreColor(article.seoScore)}`}
                        >
                          SEO: {article.seoScore}/100
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        {article.category}
                      </Badge>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {article.readingTime} de lecture
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-gray-50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye size={16} className="mr-2" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-2" />
                      Éditer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
