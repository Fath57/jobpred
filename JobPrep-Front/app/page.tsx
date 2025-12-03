'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Calendar,
  Building,
  Sparkles,
  Target,
  Zap,
  Award,
  Rocket,
  FileText,
  Mail,
  Brain,
  Mic,
  MessageSquare,
} from 'lucide-react';
import { testimonials, stats, features } from '@/lib/mockData';
import Link from 'next/link';
// import LoginDialog from '@/components/auth/LoginDialog';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">JP</span>
              </div>
              <span className="font-bold text-2xl text-gray-900">JobPrep</span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Témoignages
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Tarifs
              </a>
            </nav>

            <div className="flex items-center gap-4">
              {/* Remplace le modal de connexion par une redirection vers /login */}
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                asChild
              >
                <Link href="/onboarding">
                  Commencer <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2">
              <Sparkles className="mr-2" size={16} />
              Plateforme IA de préparation aux entretiens
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Décrochez le poste de
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> vos rêves</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Notre IA révolutionnaire vous accompagne dans chaque étape de votre recherche d&apos;emploi :
              de l&apos;optimisation de votre CV à la préparation d&apos;entretiens personnalisés.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/onboarding">
                  <Rocket className="mr-2" size={20} />
                  Commencer gratuitement
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-gray-50"
              >
                <Target className="mr-2" size={20} />
                Voir la démo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => {
                const iconComponents = {
                  Users,
                  TrendingUp,
                  Calendar,
                  Building,
                };
                const Icon = iconComponents[stat.icon as keyof typeof iconComponents];

                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="text-emerald-600" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
              <Zap className="mr-2" size={16} />
              Fonctionnalités IA
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Votre kit de réussite complet
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des outils intelligents qui s&apos;adaptent à votre profil et maximisent vos chances de décrocher l&apos;entretien
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const iconComponents = {
                FileText,
                Mail,
                Brain,
                Mic,
                MessageSquare,
                Target,
              };
              const Icon = iconComponents[feature.icon as keyof typeof iconComponents];

              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-amber-100 text-amber-700 border-amber-200">
              <Award className="mr-2" size={16} />
              Témoignages
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ce que disent nos candidats
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <Card
                key={testimonial.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-amber-400 fill-current"
                        size={20}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    &quot;{testimonial.text}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre carrière ?
          </h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Rejoignez les milliers de candidats qui ont déjà décroché leur
            emploi idéal grâce à notre IA
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/onboarding">
                Commencer maintenant <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">JP</span>
                </div>
                <span className="font-bold text-2xl">JobPrep</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                La plateforme IA qui révolutionne la recherche d&apos;emploi et la préparation aux entretiens.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carrières
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JobPrep. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
