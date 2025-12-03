'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Rocket, CheckCircle, AlertTriangle } from 'lucide-react';

interface CareerReadinessProps {
  title?: string;
  icon?: React.ReactNode;
  readinessPercentage: number;
  confidenceLevel: string;
  interviewSuccessRate?: number;
  strengths: string[];
  criticalGaps: string[];
  timeToReadiness: string;
  iconComponent?: React.ReactNode;
}

const CareerReadinessCard: React.FC<CareerReadinessProps> = ({
  title = 'Impact Professionnel',
  icon = <Rocket className="text-indigo-600" size={20} />,
  readinessPercentage,
  confidenceLevel,
  interviewSuccessRate,
  strengths,
  criticalGaps,
  timeToReadiness,
  iconComponent,
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
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg mb-4">
          <div
            className={`text-3xl font-bold ${getScoreColor(readinessPercentage)} mb-1`}
          >
            {readinessPercentage}%
          </div>
          <p className="text-gray-700">Niveau de préparation</p>
        </div>

        {interviewSuccessRate && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taux de réussite entretien</span>
            <div className="flex items-center gap-2">
              <Progress value={interviewSuccessRate} className="w-16 h-2" />
              <span className="font-medium">{interviewSuccessRate}%</span>
            </div>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Niveau de confiance</span>
          <span className="font-medium">{confidenceLevel}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Temps pour niveau optimal</span>
          <span className="font-medium">{timeToReadiness}</span>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Forces clés:</h4>
          <ul className="text-sm space-y-1">
            {strengths.slice(0, 3).map((strength, index) => (
              <li key={index} className="text-gray-700 flex items-start gap-2">
                <CheckCircle
                  size={14}
                  className="mt-0.5 text-emerald-500 flex-shrink-0"
                />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Lacunes critiques:</h4>
          <ul className="text-sm space-y-1">
            {criticalGaps.map((gap, index) => (
              <li key={index} className="text-gray-700 flex items-start gap-2">
                <AlertTriangle
                  size={14}
                  className="mt-0.5 text-amber-500 flex-shrink-0"
                />
                {gap}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerReadinessCard;
