'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface ProgressItem {
  date: string;
  score: number;
  improvement?: number;
  milestone?: string;
}

interface ProgressEvolutionProps {
  title?: string;
  icon?: React.ReactNode;
  progressItems: ProgressItem[];
}

const ProgressEvolutionCard: React.FC<ProgressEvolutionProps> = ({
  title = 'Évolution des Performances',
  icon = <TrendingUp className="text-emerald-600" size={20} />,
  progressItems,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progressItems.map((progress, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{progress.date}</span>
                  <span
                    className={`font-medium ${getScoreColor(progress.score)}`}
                  >
                    {progress.score}%
                  </span>
                </div>
                {progress.milestone && (
                  <p className="text-xs text-indigo-600 font-medium">
                    {progress.milestone}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressEvolutionCard;
