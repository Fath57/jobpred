'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Award,
  Eye,
  Download,
  RefreshCw,
  Zap,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';

interface ResumeAnalysisProps {
  resumeAnalysisData: typeof import('@/lib/resume/resumeAnalysisData').resumeAnalysisData;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({
  resumeAnalysisData,
}) => {
  const [selectedCV, setSelectedCV] = useState(
    resumeAnalysisData.cvAnalyses[0]
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeCV = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="text-emerald-500" size={16} />;
      case 'down':
        return <ArrowDown className="text-red-500" size={16} />;
      default:
        return <Minus className="text-gray-500" size={16} />;
    }
  };

  return (
    <>
      <PageHeader
        title="Analyse de CV"
        description="Optimisez votre CV avec notre analyse IA avancée"
        icon={FileText}
        iconColor="text-blue-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/resume', label: 'Resume' },
          { label: 'Analysis', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Prévisualiser', icon: Eye, variant: 'outline' },
          { label: 'Télécharger', icon: Download, variant: 'outline' },
        ]}
        isGenerating={isAnalyzing}
        onGenerate={handleAnalyzeCV}
        generateButtonText="Nouvelle Analyse"
        generateLoadingText="Analyse en cours..."
        generateButtonGradient="bg-emerald-500 hover:bg-emerald-600"
      />

      {/* CV Selection */}
      <Card className="mb-6 border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            CV Analysés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumeAnalysisData.cvAnalyses.map((cv: any) => (
              <div
                key={cv.id}
                onClick={() => setSelectedCV(cv)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedCV.id === cv.id
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{cv.fileName}</h3>
                  <Badge
                    variant="outline"
                    className={getScoreBg(cv.overallScore)}
                  >
                    {cv.overallScore}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{cv.position}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={12} />
                  {cv.lastAnalyzed}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score Overview */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-emerald-600" size={20} />
                Score Global
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div
                  className={`text-4xl font-bold ${getScoreColor(selectedCV.overallScore)} mb-2`}
                >
                  {selectedCV.overallScore}%
                </div>
                <div className="flex items-center justify-center gap-2">
                  {getTrendIcon(selectedCV.trend)}
                  <span className="text-sm text-gray-600">
                    vs analyse précédente
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedCV.categoryScores.map((category: any) => (
                  <div key={category.category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{category.category}</span>
                      <span
                        className={`font-medium ${getScoreColor(category.score)}`}
                      >
                        {category.score}%
                      </span>
                    </div>
                    <Progress value={category.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-purple-600" size={20} />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Mots-clés trouvés</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {selectedCV.keywordsFound}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sections manquantes</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  {selectedCV.missingSections}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Longueur optimale</span>
                <Badge
                  variant="outline"
                  className={
                    selectedCV.optimalLength
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  }
                >
                  {selectedCV.optimalLength ? 'Oui' : 'Non'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="recommendations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              <TabsTrigger value="keywords">Mots-clés</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="comparison">Comparaison</TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-emerald-600" size={20} />
                    Recommandations d'Amélioration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCV.recommendations.map((rec: any, index: number) => (
                    <Alert
                      key={index}
                      className={
                        rec.priority === 'high'
                          ? 'border-red-200 bg-red-50'
                          : rec.priority === 'medium'
                            ? 'border-amber-200 bg-amber-50'
                            : 'border-blue-200 bg-blue-50'
                      }
                    >
                      <div className="flex items-start gap-3">
                        {rec.priority === 'high' ? (
                          <AlertTriangle
                            className="text-red-600 mt-0.5"
                            size={16}
                          />
                        ) : rec.priority === 'medium' ? (
                          <Target className="text-amber-600 mt-0.5" size={16} />
                        ) : (
                          <CheckCircle
                            className="text-blue-600 mt-0.5"
                            size={16}
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {rec.title}
                            </span>
                            <Badge
                              variant="outline"
                              className={
                                rec.priority === 'high'
                                  ? 'border-red-200 text-red-700 bg-red-50'
                                  : rec.priority === 'medium'
                                    ? 'border-amber-200 text-amber-700 bg-amber-50'
                                    : 'border-blue-200 text-blue-700 bg-blue-50'
                              }
                            >
                              {rec.priority === 'high'
                                ? 'Urgent'
                                : rec.priority === 'medium'
                                  ? 'Important'
                                  : 'Suggestion'}
                            </Badge>
                          </div>
                          <AlertDescription className="text-gray-700">
                            {rec.description}
                          </AlertDescription>
                          {rec.impact && (
                            <div className="mt-2 text-sm text-gray-600">
                              <strong>Impact:</strong> {rec.impact}
                            </div>
                          )}
                        </div>
                      </div>
                    </Alert>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-purple-600" size={20} />
                    Analyse des Mots-clés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="text-emerald-500" size={16} />
                        Mots-clés Présents
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCV.keywordAnalysis.present.map(
                          (keyword: string, index: number) => (
                            <Badge
                              key={index}
                              className="bg-emerald-50 text-emerald-700 border-emerald-200"
                            >
                              {keyword}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={16} />
                        Mots-clés Manquants
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCV.keywordAnalysis.missing.map(
                          (keyword: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-red-200 text-red-700 bg-red-50"
                            >
                              {keyword}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="text-amber-500" size={16} />
                      Suggestions d'Optimisation
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCV.keywordAnalysis.suggestions.map(
                        (keyword: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-amber-200 text-amber-700 bg-amber-50"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-blue-600" size={20} />
                    Analyse de Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCV.structureAnalysis.map(
                      (section: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {section.status === 'present' ? (
                              <CheckCircle
                                className="text-emerald-500"
                                size={20}
                              />
                            ) : section.status === 'missing' ? (
                              <AlertTriangle
                                className="text-red-500"
                                size={20}
                              />
                            ) : (
                              <Target className="text-amber-500" size={20} />
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {section.section}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {section.feedback}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              section.status === 'present'
                                ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                                : section.status === 'missing'
                                  ? 'border-red-200 text-red-700 bg-red-50'
                                  : 'border-amber-200 text-amber-700 bg-amber-50'
                            }
                          >
                            {section.status === 'present'
                              ? 'Présent'
                              : section.status === 'missing'
                                ? 'Manquant'
                                : 'À améliorer'}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-indigo-600" size={20} />
                    Comparaison Sectorielle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">
                        Votre Position
                      </h4>
                      <div className="space-y-3">
                        {selectedCV.industryComparison.map(
                          (metric: any, index: number) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700">
                                  {metric.metric}
                                </span>
                                <span className="font-medium">
                                  {metric.yourScore}% (Moyenne:{' '}
                                  {metric.industryAverage}%)
                                </span>
                              </div>
                              <div className="relative">
                                <Progress
                                  value={metric.industryAverage}
                                  className="h-2 bg-gray-200"
                                />
                                <Progress
                                  value={metric.yourScore}
                                  className="h-2 absolute top-0 left-0"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">
                        Insights Sectoriels
                      </h4>
                      <div className="space-y-3">
                        <Alert className="border-blue-200 bg-blue-50">
                          <AlertDescription className="text-blue-800">
                            Votre CV se situe dans le top 25% des candidats de
                            votre secteur.
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-amber-200 bg-amber-50">
                          <AlertDescription className="text-amber-800">
                            Les compétences techniques sont sous-représentées
                            par rapport à la moyenne du secteur.
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-emerald-200 bg-emerald-50">
                          <AlertDescription className="text-emerald-800">
                            Votre expérience internationale est un atout
                            différenciant.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

// Add missing components
const Clock: React.FC<{ size?: number }> = ({ size }) => (
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
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Star: React.FC<{ className?: string; size?: number }> = ({
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
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

export default ResumeAnalysis;
