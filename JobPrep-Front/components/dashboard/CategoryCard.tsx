'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  category: string;
  icon: LucideIcon;
  color: string;
  averageScore: number | string;
  testsCompleted: number;
  totalTests: number;
  level: string;
  trend: 'up' | 'down' | 'stable';
  topStrengths: string[];
  keyImprovements: string[];
  nextRecommendedTest: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  icon: Icon,
  color,
  averageScore,
  testsCompleted,
  totalTests,
  level,
  trend,
  topStrengths,
  keyImprovements,
  nextRecommendedTest,
  onClick,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50';
    if (score >= 70) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <svg
            className="text-emerald-500"
            width="16"
            height="16"
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
        );
      case 'down':
        return (
          <svg
            className="text-red-500"
            width="16"
            height="16"
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
        );
      default:
        return (
          <svg
            className="text-gray-500"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}
          >
            <Icon className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{category}</h4>
            <p className="text-sm text-gray-600">
              {testsCompleted}/{totalTests} tests complétés
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-bold ${
                averageScore === 'N/A'
                  ? 'text-gray-600'
                  : getScoreColor(Number(averageScore))
              }`}
            >
              {averageScore}
            </span>
            {averageScore !== 'N/A' && getTrendIcon(trend)}
          </div>
          <Badge
            variant="outline"
            className={
              averageScore === 'N/A'
                ? 'bg-gray-50 text-gray-700'
                : getScoreBg(Number(averageScore))
            }
          >
            {level}
          </Badge>
        </div>
      </div>

      {averageScore !== 'N/A' && (
        <div className="mb-3">
          <Progress value={Number(averageScore)} className="h-2" />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium text-gray-700 mb-1">Points forts:</p>
          <p className="text-gray-600">{topStrengths.slice(0, 2).join(', ')}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700 mb-1">À améliorer:</p>
          <p className="text-gray-600">
            {keyImprovements.slice(0, 2).join(', ')}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-sm text-blue-600 font-medium">
          Prochain test recommandé: {nextRecommendedTest}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
