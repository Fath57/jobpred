'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
    label: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
  trend,
}) => {
  return (
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
};

export default StatCard;
