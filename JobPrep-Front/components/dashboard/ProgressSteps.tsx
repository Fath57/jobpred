'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  ArrowRight,
  DivideIcon as LucideIcon,
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  isDisabled?: boolean;
  activeColor?: string;
  completedColor?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  onStepChange,
  isDisabled = false,
  activeColor = 'bg-blue-100 text-blue-700 border border-blue-200',
  completedColor = 'bg-emerald-100 text-emerald-700 border border-emerald-200',
}) => {
  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <Card className="mb-6 border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id);

            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => onStepChange && onStepChange(step.id)}
                  disabled={isDisabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    status === 'current'
                      ? activeColor
                      : status === 'completed'
                        ? completedColor
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  } ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  {status === 'completed' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Icon size={20} />
                  )}
                  <span className="font-medium">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <ArrowRight className="mx-4 text-gray-400" size={20} />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSteps;
