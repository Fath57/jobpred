'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mic, Eye, Download, Share } from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';
import VoiceAnalysisCard from '@/components/dashboard/VoiceAnalysisCard';
import CategoryCard from '@/components/dashboard/CategoryCard';
import InsightCard from '@/components/dashboard/InsightCard';
import SkillGapCard from '@/components/dashboard/SkillGapCard';
import CareerReadinessCard from '@/components/dashboard/CareerReadinessCard';
import RecommendedTestCard from '@/components/dashboard/RecommendedTestCard';
import ProgressEvolutionCard from '@/components/dashboard/ProgressEvolutionCard';
import MilestoneCard from '@/components/dashboard/MilestoneCard';
import ActionPlan from '@/components/dashboard/ActionPlan';

interface VoiceFeedbackReportProps {
  feedbackData: any;
}

const VoiceFeedbackReport: React.FC<VoiceFeedbackReportProps> = ({
  feedbackData,
}) => {
  return (
    <>
      <PageHeader
        title="Rapport Vocal IA"
        description="Analyse complète de vos performances vocales et recommandations personnalisées pour votre communication"
        icon={Mic}
        iconColor="text-indigo-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/speech', label: 'Speech' },
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
          label="Score Vocal Global"
          value={`${feedbackData.overallPerformance.averageScore}%`}
          icon={Mic}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
          trend={{
            value: `+${feedbackData.overallPerformance.improvementRate}%`,
            isPositive: true,
            label: 'ce mois',
          }}
        />

        <StatCard
          label="Tests Vocaux Complétés"
          value={feedbackData.overallPerformance.totalTestsCompleted}
          icon={Headphones}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          trend={{
            value: feedbackData.overallPerformance.totalTimeSpent,
            isPositive: true,
            label: 'investies',
          }}
        />

        <StatCard
          label="Certificats Vocaux"
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
          label="Impact Entretien"
          value={`${feedbackData.voiceCareerReadiness.interviewSuccessRate}%`}
          icon={Rocket}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
          trend={{
            value: 'Taux de réussite estimé',
            isPositive: true,
            label: '',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Analysis Summary */}
          <VoiceAnalysisCard
            assertiveness={feedbackData.voiceAnalysisSummary.assertiveness}
            tone={feedbackData.voiceAnalysisSummary.tone}
            emotionalExpression={
              feedbackData.voiceAnalysisSummary.emotionalExpression
            }
            speechPatterns={feedbackData.voiceAnalysisSummary.speechPatterns}
          />

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
                Insights Vocaux Personnalisés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.voicePersonalizedInsights.map((insight: any) => (
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
                Analyse des Lacunes Vocales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.voiceSkillGaps.map((gap: any, index: number) => (
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
          {/* Voice Career Readiness */}
          <CareerReadinessCard
            title="Impact Vocal Professionnel"
            icon={<Rocket className="text-indigo-600" size={20} />}
            readinessPercentage={
              feedbackData.voiceCareerReadiness.readinessPercentage
            }
            confidenceLevel={feedbackData.voiceCareerReadiness.confidenceLevel}
            interviewSuccessRate={
              feedbackData.voiceCareerReadiness.interviewSuccessRate
            }
            strengths={feedbackData.voiceCareerReadiness.strengths}
            criticalGaps={feedbackData.voiceCareerReadiness.criticalGaps}
            timeToReadiness={feedbackData.voiceCareerReadiness.timeToReadiness}
          />

          {/* Recommended Tests */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-yellow-600" size={20} />
                Tests Vocaux Recommandés
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackData.recommendedVoiceTests
                .slice(0, 3)
                .map((test: any) => (
                  <RecommendedTestCard
                    key={test.testId}
                    testId={test.testId}
                    testName={test.testName}
                    priority={test.priority}
                    estimatedDuration={test.estimatedDuration}
                    expectedImpact={test.expectedImpact}
                    reason={test.reason}
                    icon={<Mic size={14} className="mr-1" />}
                  />
                ))}

              <Button variant="outline" className="w-full">
                Voir tous les tests recommandés
              </Button>
            </CardContent>
          </Card>

          {/* Progress Evolution */}
          <ProgressEvolutionCard
            title="Évolution Vocale"
            icon={<TrendingUp className="text-emerald-600" size={20} />}
            progressItems={feedbackData.voiceProgressEvolution.map(
              (progress: any) => ({
                date: progress.date,
                score: progress.overallScore,
                milestone: progress.milestone,
              })
            )}
          />

          {/* Next Milestones */}
          <MilestoneCard
            title="Prochains Objectifs Vocaux"
            icon={<Flag className="text-purple-600" size={20} />}
            milestones={feedbackData.nextMilestones}
          />

          {/* Action Plan */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="text-blue-600" size={20} />
                Plan d'Action Vocal
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

const Headphones: React.FC<{ className?: string; size?: number }> = ({
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
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
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

const Rocket: React.FC<{ className?: string; size?: number }> = ({
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
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
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

export default VoiceFeedbackReport;
