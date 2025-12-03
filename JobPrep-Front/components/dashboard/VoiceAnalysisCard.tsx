'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Volume2, Music, Activity, Heart } from 'lucide-react';

interface VoiceAnalysisProps {
  assertiveness: {
    score: number;
    level: string;
    trend: 'up' | 'down' | 'stable';
    strengths: string[];
    improvements: string[];
  };
  tone: {
    score: number;
    dominantTone: string;
    variability: number;
    strengths: string[];
    improvements: string[];
  };
  emotionalExpression: {
    score: number;
    stability: number;
    authenticity: number;
    strengths: string[];
    improvements: string[];
  };
  speechPatterns: {
    pace: {
      score: number;
      wordsPerMinute: number;
      optimal: boolean;
      trend: 'up' | 'down' | 'stable';
    };
    clarity: {
      score: number;
      articulation: number;
      trend: 'up' | 'down' | 'stable';
    };
    fluency: {
      score: number;
      hesitations: number;
      fillerWords: number;
      trend: 'up' | 'down' | 'stable';
    };
  };
}

const VoiceAnalysisCard: React.FC<VoiceAnalysisProps> = ({
  assertiveness,
  tone,
  emotionalExpression,
  speechPatterns,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <svg
            className="text-emerald-500"
            width="16"
            height="16"
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
        );
      case 'down':
        return (
          <svg
            className="text-red-500"
            width="16"
            height="16"
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
        );
      default:
        return (
          <svg
            className="text-gray-500"
            width="16"
            height="16"
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
        );
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="text-indigo-600" size={20} />
          Analyse Vocale Globale
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Assertiveness */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Volume2 size={18} className="text-indigo-600" />
                Assertivité Vocale
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-bold ${getScoreColor(assertiveness.score)}`}
                >
                  {assertiveness.score}%
                </span>
                {getTrendIcon(assertiveness.trend)}
              </div>
            </div>
            <p className="text-gray-700 mb-3">
              {assertiveness.level}: {assertiveness.strengths[0]}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500" />
                  Forces
                </h4>
                <ul className="text-sm space-y-1">
                  {assertiveness.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-700">
                      • {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Target size={14} className="text-amber-500" />
                  Améliorations
                </h4>
                <ul className="text-sm space-y-1">
                  {assertiveness.improvements.map((improvement, index) => (
                    <li key={index} className="text-gray-700">
                      • {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tone & Speech Patterns */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-blue-900 flex items-center gap-2">
                  <Music size={16} />
                  Ton Vocal
                </h4>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getScoreColor(tone.score)}`}>
                    {tone.score}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-blue-800 mb-2">
                Dominant:{' '}
                <span className="font-medium">{tone.dominantTone}</span>
              </p>
              <p className="text-sm text-blue-800 mb-2">
                Variabilité:{' '}
                <span className="font-medium">{tone.variability}%</span>
              </p>
              <div className="mt-2">
                <h5 className="text-xs font-medium text-blue-900 mb-1">
                  À améliorer:
                </h5>
                <p className="text-xs text-blue-800">{tone.improvements[0]}</p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                <Activity size={16} />
                Patterns Vocaux
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-800">Rythme</span>
                    <span className="font-medium text-purple-900">
                      {speechPatterns.pace.wordsPerMinute} mots/min
                      {speechPatterns.pace.optimal && (
                        <span className="ml-1 text-emerald-600">(optimal)</span>
                      )}
                    </span>
                  </div>
                  <Progress
                    value={speechPatterns.pace.score}
                    className="h-1.5"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-800">Clarté</span>
                    <span className="font-medium text-purple-900">
                      {speechPatterns.clarity.score}%
                      {getTrendIcon(speechPatterns.clarity.trend)}
                    </span>
                  </div>
                  <Progress
                    value={speechPatterns.clarity.score}
                    className="h-1.5"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-800">Fluidité</span>
                    <span className="font-medium text-purple-900">
                      {speechPatterns.fluency.score}%
                      {getTrendIcon(speechPatterns.fluency.trend)}
                    </span>
                  </div>
                  <Progress
                    value={speechPatterns.fluency.score}
                    className="h-1.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emotional Expression */}
          <div className="p-4 bg-amber-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-amber-900 flex items-center gap-2">
                <Heart size={16} />
                Expression Émotionnelle
              </h4>
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${getScoreColor(emotionalExpression.score)}`}
                >
                  {emotionalExpression.score}%
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-800">Stabilité</span>
                  <span className="font-medium text-amber-900">
                    {emotionalExpression.stability}%
                  </span>
                </div>
                <Progress
                  value={emotionalExpression.stability}
                  className="h-1.5 mb-3"
                />
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-800">Authenticité</span>
                  <span className="font-medium text-amber-900">
                    {emotionalExpression.authenticity}%
                  </span>
                </div>
                <Progress
                  value={emotionalExpression.authenticity}
                  className="h-1.5"
                />
              </div>
              <div>
                <h5 className="text-sm font-medium text-amber-900 mb-2">
                  Principaux points à améliorer:
                </h5>
                <ul className="text-sm space-y-1">
                  {emotionalExpression.improvements
                    .slice(0, 2)
                    .map((improvement, index) => (
                      <li key={index} className="text-amber-800">
                        • {improvement}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add missing CheckCircle component
const CheckCircle: React.FC<{ size: number; className: string }> = ({
  size,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default VoiceAnalysisCard;
