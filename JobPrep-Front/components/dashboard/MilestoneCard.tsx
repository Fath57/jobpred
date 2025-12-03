'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flag, Calendar } from 'lucide-react';

interface MilestoneProps {
  title?: string;
  icon?: React.ReactNode;
  milestones: {
    title: string;
    description: string;
    targetDate: string;
    reward: string;
  }[];
}

const MilestoneCard: React.FC<MilestoneProps> = ({
  title = 'Prochains Objectifs',
  icon = <Flag className="text-purple-600" size={20} />,
  milestones,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.slice(0, 2).map((milestone, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg"
          >
            <h4 className="font-medium text-purple-900 mb-1">
              {milestone.title}
            </h4>
            <p className="text-sm text-purple-800 mb-2">
              {milestone.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-700">
              <Calendar size={12} />
              <span>Cible: {milestone.targetDate}</span>
            </div>
            <div className="mt-2">
              <Badge
                variant="outline"
                className="text-xs bg-purple-100 text-purple-700"
              >
                {milestone.reward}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;
