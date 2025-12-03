'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminChartProps {
  title: string;
  type: 'line' | 'bar' | 'doughnut' | 'pie';
  data: {
    labels: string[];
    datasets: any[];
  };
}

export default function AdminChart({ title, type, data }: AdminChartProps) {
  // This is a placeholder component for charts
  // In a real implementation, you would use a charting library like Chart.js, Recharts, etc.

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              {type === 'line' && '📈'}
              {type === 'bar' && '📊'}
              {type === 'doughnut' && '🍩'}
              {type === 'pie' && '🥧'}
            </div>
            <p className="text-gray-600 text-sm">Graphique {type}</p>
            <p className="text-xs text-gray-500 mt-1">
              {data.datasets.length} dataset(s), {data.labels.length} points
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
