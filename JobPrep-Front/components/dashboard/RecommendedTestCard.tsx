'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Mic } from 'lucide-react';

interface RecommendedTestProps {
  testId: string;
  testName: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedDuration: string;
  expectedImpact: string;
  reason: string;
  onStart?: () => void;
  icon?: React.ReactNode;
}

const RecommendedTestCard: React.FC<RecommendedTestProps> = ({
  testId,
  testName,
  priority,
  estimatedDuration,
  expectedImpact,
  reason,
  onStart,
  icon = <PlayCircle size={14} className="mr-1" />,
}) => {
  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'border-red-200 text-red-700 bg-red-50',
      high: 'border-orange-200 text-orange-700 bg-orange-50',
      medium: 'border-amber-200 text-amber-700 bg-amber-50',
      low: 'border-blue-200 text-blue-700 bg-blue-50',
    };
    return (
      colors[priority as keyof typeof colors] ||
      'border-gray-200 text-gray-700 bg-gray-50'
    );
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className={getPriorityColor(priority)}>
          {priority === 'critical'
            ? 'Critique'
            : priority === 'high'
              ? 'Élevée'
              : priority === 'medium'
                ? 'Modérée'
                : 'Faible'}
        </Badge>
        <span className="text-xs text-gray-500">{estimatedDuration}</span>
      </div>

      <h4 className="font-medium text-gray-900 mb-1">{testName}</h4>
      <p className="text-sm text-gray-600 mb-3">{reason}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-600">
          {expectedImpact}
        </span>
        <Button
          size="sm"
          className="bg-indigo-500 hover:bg-indigo-600"
          onClick={onStart}
        >
          {icon}
          Commencer
        </Button>
      </div>
    </div>
  );
};

export default RecommendedTestCard;
