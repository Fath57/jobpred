'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Eye, Download, Share, Rocket } from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';
import CategoryCard from '@/components/dashboard/CategoryCard';
import InsightCard from '@/components/dashboard/InsightCard';
import SkillGapCard from '@/components/dashboard/SkillGapCard';
import CareerReadinessCard from '@/components/dashboard/CareerReadinessCard';
import RecommendedTestCard from '@/components/dashboard/RecommendedTestCard';
import ProgressEvolutionCard from '@/components/dashboard/ProgressEvolutionCard';
import MilestoneCard from '@/components/dashboard/MilestoneCard';
import ActionPlan from '@/components/dashboard/ActionPlan';

interface TestFeedbackReportProps {
  feedbackData: typeof import('@/lib/tests/testFeedbackData').testFeedbackData;
}

const TestFeedbackReport: React.FC<TestFeedbackReportProps> = ({
  feedbackData,
}) => {
  return (
    <>
      <PageHeader
        title="Rapport de Performance IA"
        description="Analyse complète de vos performances et recommandations personnalisées pour votre réussite"
        icon={BarChart3}
        iconColor="text-emerald-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/tests', label: 'Tests' },
          { label: 'Test Feedback', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Aperçu', icon: Eye, variant: 'outline' },
          { label: 'Télécharger PDF', icon: Download, variant: 'outline' },
          { label: 'Partager', icon: Share, variant: 'outline' },
        ]}
      />

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Score Global"
          value={`${feedbackData.overallPerformance.averageScore}%`}
          icon={Trophy}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
          trend={{
            value: `+${feedbackData.overallPerformance.improvementRate}%`,
            isPositive: true,
            label: 'ce mois',
          }}
        />

        <StatCard
          label="Tests Complétés"
          value={feedbackData.overallPerformance.totalTestsCompleted}
          icon={CheckCircle}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          trend={{
            value: feedbackData.overallPerformance.totalTimeSpent,
            isPositive: true,
            label: 'investies',
          }}
        />

        <StatCard
          label="Certificats Obtenus"
          value={feedbackData.overallPerformance.certificatesEarned}
          icon={Award}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          trend={{
            value: `Niveau ${feedbackData.overallPerformance.currentLevel}`,
            isPositive: true,
            label: '',
          }}
        />

        <StatCard
          label="Prêt pour le Poste"
          value={`${feedbackData.careerReadiness.readinessPercentage}%`}
          icon={Rocket}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
          trend={{
            value: `Confiance ${feedbackData.careerReadiness.confidenceLevel}`,
            isPositive: true,
            label: '',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Career Readiness */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-emerald-600" size={20} />
                Analyse de Préparation Carrière
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Overall Readiness */}
                <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                  <div
                    className={`text-5xl font-bold ${getScoreColor(feedbackData.careerReadiness.overallScore)} mb-2`}
                  >
                    {feedbackData.careerReadiness.overallScore}%
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Niveau de Préparation:{' '}
                    {feedbackData.careerReadiness.confidenceLevel}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Vous êtes prêt à{' '}
                    {feedbackData.careerReadiness.readinessPercentage}% pour
                    votre poste cible de{' '}
                    {feedbackData.candidateProfile.targetPosition}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Briefcase size={16} />
                      Probabilité d'Obtention
                    </h4>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={feedbackData.careerReadiness.jobMatchProbability}
                        className="flex-1"
                      />
                      <span className="font-bold text-blue-700">
                        {feedbackData.careerReadiness.jobMatchProbability}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                      <MessageSquare size={16} />
                      Succès en Entretien
                    </h4>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={
                          feedbackData.careerReadiness.interviewSuccessRate
                        }
                        className="flex-1"
                      />
                      <span className="font-bold text-purple-700">
                        {feedbackData.careerReadiness.interviewSuccessRate}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Strengths and Gaps */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <ThumbsUp className="text-emerald-500" size={16} />
                      Forces Principales
                    </h4>
                    <ul className="space-y-2">
                      {feedbackData.careerReadiness.strengths.map(
                        (strength: string, index: number) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <CheckCircle
                              size={14}
                              className="mt-0.5 text-emerald-500 flex-shrink-0"
                            />
                            {strength}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="text-amber-500" size={16} />
                      Lacunes Critiques
                    </h4>
                    <ul className="space-y-2">
                      {feedbackData.careerReadiness.criticalGaps.map(
                        (gap: string, index: number) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <Target
                              size={14}
                              className="mt-0.5 text-amber-500 flex-shrink-0"
                            />
                            {gap}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Time to Readiness */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                    <Clock size={16} />
                    Temps Estimé pour Être 100% Prêt
                  </h4>
                  <p className="text-2xl font-bold text-blue-700 mb-2">
                    {feedbackData.careerReadiness.timeToReadiness}
                  </p>
                  <p className="text-sm text-blue-800">
                    En suivant notre plan d'action personnalisé
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} />
                Performance par Catégorie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.categoryInsights.map((category: any) => (
                  <CategoryCard
                    key={category.category}
                    category={category.category}
                    icon={getCategoryIcon(category.category)}
                    color={category.color}
                    averageScore={category.averageScore}
                    testsCompleted={category.testsCompleted}
                    totalTests={category.totalTests}
                    level={category.level}
                    trend={category.trend}
                    topStrengths={category.topStrengths}
                    keyImprovements={category.keyImprovements}
                    nextRecommendedTest={category.nextRecommendedTest}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personalized Insights */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-amber-600" size={20} />
                Insights Personnalisés IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.personalizedInsights.map((insight: any) => (
                  <InsightCard
                    key={insight.id}
                    type={insight.type}
                    title={insight.title}
                    description={insight.description}
                    actionable={insight.actionable}
                    impact={insight.impact}
                    relatedTests={insight.relatedTests}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Gaps Analysis */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-red-600" size={20} />
                Analyse des Lacunes de Compétences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.skillGaps.map((gap: any, index: number) => (
                  <SkillGapCard
                    key={index}
                    skill={gap.skill}
                    currentLevel={gap.currentLevel}
                    targetLevel={gap.targetLevel}
                    importance={gap.importance}
                    estimatedTimeToImprove={gap.estimatedTimeToImprove}
                    recommendedActions={gap.recommendedActions}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Recommended Tests */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-yellow-600" size={20} />
                Tests Recommandés
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackData.recommendedTests.slice(0, 3).map((test: any) => (
                <RecommendedTestCard
                  key={test.testId}
                  testId={test.testId}
                  testName={test.testName}
                  priority={test.priority}
                  estimatedDuration={test.estimatedDuration}
                  expectedImpact={test.expectedImpact}
                  reason={test.reason}
                  icon={<PlayCircle size={14} className="mr-1" />}
                />
              ))}

              <Button variant="outline" className="w-full">
                Voir tous les tests recommandés
              </Button>
            </CardContent>
          </Card>

          {/* Progress Evolution */}
          <ProgressEvolutionCard
            title="Évolution des Performances"
            icon={<TrendingUp className="text-emerald-600" size={20} />}
            progressItems={feedbackData.progressEvolution.map(
              (progress: any) => ({
                date: progress.date,
                score: progress.overallScore,
                milestone: progress.milestone,
              })
            )}
          />

          {/* Next Milestones */}
          <MilestoneCard
            title="Prochains Objectifs"
            icon={<Flag className="text-purple-600" size={20} />}
            milestones={feedbackData.nextMilestones}
          />

          {/* Action Plan */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="text-blue-600" size={20} />
                Plan d'Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActionPlan
                immediate={feedbackData.actionPlan.immediate}
                shortTerm={feedbackData.actionPlan.shortTerm}
                longTerm={feedbackData.actionPlan.longTerm}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// Add missing components
const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-red-600';
};

const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.FC<{ className?: string; size?: number }>;
  iconColor: string;
  iconBgColor: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
    label: string;
  };
}> = ({ label, value, icon: Icon, iconColor, iconBgColor, trend }) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p
            className={`text-3xl font-bold ${typeof value === 'string' && value.includes('%') ? iconColor : 'text-gray-900'} mt-1`}
          >
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <svg
                  className="text-emerald-500"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L12 20M12 4L18 10M12 4L6 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="text-red-500"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20L12 4M12 20L18 14M12 20L6 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span
                className={`text-sm ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}
              >
                {trend.value} {trend.label}
              </span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}
        >
          <Icon className={iconColor} size={24} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Soft Skills':
      return Users;
    case 'Hard Skills':
      return Code;
    case 'Language Skills':
      return Globe;
    case 'Personality Skills':
      return Brain;
    case 'HR Interview Prep':
      return MessageSquare;
    default:
      return FileText;
  }
};

const Trophy: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const CheckCircle: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const Award: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="6"></circle>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
  </svg>
);

const Target: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const AlertTriangle: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
);

const Clock: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Briefcase: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const MessageSquare: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const TrendingUp: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const Flag: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" x2="4" y1="22" y2="15"></line>
  </svg>
);

const Zap: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const PlayCircle: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10 8 16 12 10 16 10 8"></polygon>
  </svg>
);

const Lightbulb: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
  </svg>
);

const ThumbsUp: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 10v12"></path>
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
  </svg>
);

const Users: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Code: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const Globe: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" x2="22" y1="12" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const Brain: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const FileText: React.FC<{ className?: string; size?: number }> = ({
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" x2="8" y1="13" y2="13"></line>
    <line x1="16" x2="8" y1="17" y2="17"></line>
    <line x1="10" x2="8" y1="9" y2="9"></line>
  </svg>
);

export default TestFeedbackReport;
