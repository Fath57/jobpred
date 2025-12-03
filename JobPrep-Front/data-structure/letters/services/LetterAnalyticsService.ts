import {
  LetterAnalytics,
  AnalyticsMetrics,
  AnalyticsEvent,
} from '../entities/LetterGeneration';

export interface LetterAnalyticsService {
  // Event tracking
  trackEvent(
    letterId: string,
    event: Omit<AnalyticsEvent, 'timestamp'>
  ): Promise<void>;
  trackLetterSent(letterId: string, channel: string): Promise<void>;
  trackResponse(
    letterId: string,
    responseType: string,
    responseTime: number
  ): Promise<void>;

  // Metrics calculation
  calculateLetterMetrics(letterId: string): Promise<AnalyticsMetrics>;
  calculateUserMetrics(userId: string): Promise<UserAnalyticsMetrics>;
  calculateGlobalMetrics(): Promise<GlobalAnalyticsMetrics>;

  // Performance analysis
  analyzeLetterPerformance(letterId: string): Promise<PerformanceAnalysis>;
  compareLetterPerformance(letterIds: string[]): Promise<PerformanceComparison>;

  // Reporting
  generateUserReport(
    userId: string,
    period: DateRange
  ): Promise<UserAnalyticsReport>;
  generateGlobalReport(period: DateRange): Promise<GlobalAnalyticsReport>;

  // Insights
  getPersonalizedInsights(userId: string): Promise<PersonalizedInsight[]>;
  getIndustryBenchmarks(industry: string): Promise<IndustryBenchmarks>;
}

export interface UserAnalyticsMetrics {
  totalLetters: number;
  averageScore: number;
  responseRate: number;
  interviewRate: number;
  averageResponseTime: number; // in hours
  improvementRate: number; // percentage
  bestPerformingTemplate: string;
  bestPerformingTone: string;
  totalTimeSaved: number; // in hours
}

export interface GlobalAnalyticsMetrics {
  totalUsers: number;
  totalLetters: number;
  averageUserScore: number;
  globalResponseRate: number;
  globalInterviewRate: number;
  mostPopularTemplate: string;
  mostPopularTone: string;
  averageGenerationTime: number; // in seconds
}

export interface PerformanceAnalysis {
  letterId: string;
  score: number;
  responseReceived: boolean;
  responseTime?: number; // in hours
  interviewScheduled: boolean;
  performanceFactors: PerformanceFactor[];
  recommendations: string[];
  benchmarkComparison: {
    industryAverage: number;
    percentile: number;
    topPerformers: number;
  };
}

export interface PerformanceFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number; // 0-1
  description: string;
}

export interface PerformanceComparison {
  letters: {
    letterId: string;
    score: number;
    responseRate: number;
    interviewRate: number;
  }[];
  insights: string[];
  bestPractices: string[];
  commonPatterns: string[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface UserAnalyticsReport {
  userId: string;
  period: DateRange;
  summary: UserAnalyticsMetrics;
  trends: TrendAnalysis[];
  achievements: Achievement[];
  recommendations: string[];
  nextSteps: string[];
}

export interface GlobalAnalyticsReport {
  period: DateRange;
  summary: GlobalAnalyticsMetrics;
  trends: TrendAnalysis[];
  topPerformers: TopPerformer[];
  industryInsights: IndustryInsight[];
  platformImprovements: string[];
}

export interface TrendAnalysis {
  metric: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  changePercentage: number;
  period: string;
  significance: 'low' | 'medium' | 'high';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: Date;
  category: 'performance' | 'consistency' | 'improvement' | 'milestone';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

export interface TopPerformer {
  userId: string;
  metric: string;
  value: number;
  rank: number;
  anonymizedName: string;
}

export interface IndustryInsight {
  industry: string;
  averageResponseRate: number;
  averageInterviewRate: number;
  bestPerformingTemplates: string[];
  bestPerformingTones: string[];
  seasonalTrends: SeasonalTrend[];
}

export interface SeasonalTrend {
  period: string;
  metric: string;
  value: number;
  comparison: 'above_average' | 'average' | 'below_average';
}

export interface PersonalizedInsight {
  type: 'strength' | 'improvement' | 'opportunity' | 'warning';
  title: string;
  description: string;
  actionable: boolean;
  impact: 'low' | 'medium' | 'high';
  timeframe: 'immediate' | 'short_term' | 'long_term';
  relatedMetrics: string[];
  recommendations: string[];
}

export interface IndustryBenchmarks {
  industry: string;
  averageResponseRate: number;
  averageInterviewRate: number;
  averageLetterScore: number;
  topPerformingStrategies: string[];
  commonMistakes: string[];
  seasonalFactors: string[];
  competitionLevel: 'low' | 'medium' | 'high';
}
