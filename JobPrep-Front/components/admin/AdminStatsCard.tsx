'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AdminStatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function AdminStatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
  bgColor,
}: AdminStatsCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
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
              ) : trend === 'down' ? (
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
              ) : (
                <svg
                  className="text-gray-500"
                  width="14"
                  height="14"
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
              )}
              <span
                className={`text-sm ${
                  trend === 'up'
                    ? 'text-emerald-600'
                    : trend === 'down'
                      ? 'text-red-600'
                      : 'text-gray-600'
                }`}
              >
                {change}
              </span>
            </div>
          </div>
          <div
            className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}
          >
            <Icon className={color} size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
