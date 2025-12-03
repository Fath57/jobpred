'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ThumbsUp,
  Target,
  Lightbulb,
  AlertTriangle,
  Info,
  ExternalLink,
  PlayCircle,
} from 'lucide-react';

interface InsightCardProps {
  type: 'strength' | 'improvement' | 'opportunity' | 'warning';
  title: string;
  description: string;
  actionable?: boolean;
  impact?: 'high' | 'medium' | 'low';
  relatedTests?: string[];
  onAction?: () => void;
  onViewRelated?: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({
  type,
  title,
  description,
  actionable = false,
  impact,
  relatedTests,
  onAction,
  onViewRelated,
}) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength':
        return <ThumbsUp className="text-emerald-500" size={16} />;
      case 'improvement':
        return <Target className="text-amber-500" size={16} />;
      case 'opportunity':
        return <Lightbulb className="text-blue-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <Info className="text-gray-500" size={16} />;
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'strength':
        return 'border-emerald-200 bg-emerald-50';
      case 'improvement':
        return 'border-amber-200 bg-amber-50';
      case 'opportunity':
        return 'border-blue-200 bg-blue-50';
      case 'warning':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <Alert className={getAlertClass(type)}>
      <div className="flex items-start gap-3">
        {getInsightIcon(type)}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900">{title}</h4>
            {impact && (
              <Badge variant="outline" className="text-xs">
                {impact === 'high'
                  ? 'Impact Élevé'
                  : impact === 'medium'
                    ? 'Impact Modéré'
                    : 'Impact Faible'}
              </Badge>
            )}
          </div>
          <AlertDescription className="text-gray-700 mb-2">
            {description}
          </AlertDescription>
          {actionable && (
            <div className="flex gap-2">
              {onAction && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={onAction}
                >
                  <PlayCircle size={12} className="mr-1" />
                  Agir maintenant
                </Button>
              )}
              {relatedTests && relatedTests.length > 0 && onViewRelated && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={onViewRelated}
                >
                  <ExternalLink size={12} className="mr-1" />
                  Tests liés
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default InsightCard;
