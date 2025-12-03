'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface SkillGapProps {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  estimatedTimeToImprove: string;
  recommendedActions: string[];
  onClick?: () => void;
}

const SkillGapCard: React.FC<SkillGapProps> = ({
  skill,
  currentLevel,
  targetLevel,
  importance,
  estimatedTimeToImprove,
  recommendedActions,
  onClick,
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
    <div
      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">{skill}</h4>
        <Badge variant="outline" className={getPriorityColor(importance)}>
          {importance === 'critical'
            ? 'Critique'
            : importance === 'high'
              ? 'Élevée'
              : importance === 'medium'
                ? 'Modérée'
                : 'Faible'}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Niveau Actuel</p>
          <p className="font-medium text-gray-900">{currentLevel}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Niveau Cible</p>
          <p className="font-medium text-gray-900">{targetLevel}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Temps Estimé</p>
          <p className="font-medium text-gray-900">{estimatedTimeToImprove}</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-900 mb-2">Actions Recommandées:</p>
        <ul className="space-y-1">
          {recommendedActions.map((action, actionIndex) => (
            <li
              key={actionIndex}
              className="text-sm text-gray-700 flex items-start gap-2"
            >
              <ChevronRight
                size={14}
                className="mt-0.5 text-gray-400 flex-shrink-0"
              />
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillGapCard;
