import {
  ResumeAnalysis,
  AnalysisResults,
  AnalysisRecommendation,
} from '../entities/ResumeAnalysis';

export interface ResumeAnalysisRepository {
  // Analysis CRUD operations
  findById(id: string): Promise<ResumeAnalysis | null>;
  findByResumeId(resumeId: string): Promise<ResumeAnalysis[]>;
  findByUserId(userId: string): Promise<ResumeAnalysis[]>;
  create(
    analysisData: Omit<ResumeAnalysis, 'id' | 'createdAt' | 'completedAt'>
  ): Promise<ResumeAnalysis>;
  update(
    id: string,
    analysisData: Partial<ResumeAnalysis>
  ): Promise<ResumeAnalysis>;
  delete(id: string): Promise<boolean>;

  // Analysis filtering and search
  findByStatus(status: ResumeAnalysis['status']): Promise<ResumeAnalysis[]>;
  findByAnalysisType(
    analysisType: ResumeAnalysis['analysisType']
  ): Promise<ResumeAnalysis[]>;
  findRecentAnalyses(userId: string, limit: number): Promise<ResumeAnalysis[]>;
  findByScoreRange(
    minScore: number,
    maxScore: number
  ): Promise<ResumeAnalysis[]>;

  // Analysis statistics
  getAnalysisStatistics(userId: string): Promise<AnalysisStatistics>;
  getGlobalAnalysisStats(): Promise<GlobalAnalysisStats>;
  getAnalysisTrends(period: DatePeriod): Promise<AnalysisTrend[]>;

  // Benchmarking
  getBenchmarkData(
    industry: string,
    position: string,
    experienceLevel: string
  ): Promise<BenchmarkData>;
  updateBenchmarks(analysisId: string): Promise<void>;

  // Recommendations tracking
  trackRecommendationImplementation(
    analysisId: string,
    recommendationId: string,
    implemented: boolean
  ): Promise<void>;
  getRecommendationEffectiveness(): Promise<RecommendationEffectiveness[]>;
}

export interface ResumeAnalysisService {
  // Analysis execution
  analyzeResume(
    resumeId: string,
    analysisType: AnalysisType,
    options?: AnalysisOptions
  ): Promise<ResumeAnalysis>;
  reanalyzeResume(analysisId: string): Promise<ResumeAnalysis>;

  // Batch analysis
  analyzeBatchResumes(
    resumeIds: string[],
    analysisType: AnalysisType
  ): Promise<BatchAnalysisResult>;

  // Analysis comparison
  compareAnalyses(analysisIds: string[]): Promise<AnalysisComparison>;
  trackAnalysisProgress(resumeId: string): Promise<AnalysisProgress>;

  // Recommendations
  generateRecommendations(
    analysisId: string
  ): Promise<AnalysisRecommendation[]>;
  prioritizeRecommendations(
    analysisId: string
  ): Promise<PrioritizedRecommendation[]>;
  implementRecommendation(
    analysisId: string,
    recommendationId: string
  ): Promise<ImplementationResult>;

  // Industry insights
  getIndustryInsights(industry: string): Promise<IndustryInsights>;
  getPositionInsights(position: string): Promise<PositionInsights>;

  // Quality assurance
  validateAnalysisQuality(analysisId: string): Promise<QualityValidation>;
  calibrateAnalysisModel(
    feedbackData: CalibrationData[]
  ): Promise<CalibrationResult>;
}

export interface AnalysisType {
  type:
    | 'full'
    | 'quick'
    | 'ats'
    | 'keyword'
    | 'structure'
    | 'content'
    | 'competitive';
  depth: 'basic' | 'standard' | 'comprehensive';
  focus?: string[]; // specific areas to focus on
}

export interface AnalysisOptions {
  includeComparison: boolean;
  includeBenchmarks: boolean;
  includeRecommendations: boolean;
  targetJob?: string;
  targetIndustry?: string;
  competitorResumes?: string[];
  customCriteria?: AnalysisCriteria[];
}

export interface AnalysisCriteria {
  name: string;
  weight: number; // 0-1
  description: string;
  evaluationMethod: string;
}

export interface BatchAnalysisResult {
  batchId: string;
  totalResumes: number;
  completedAnalyses: number;
  failedAnalyses: number;
  analyses: ResumeAnalysis[];
  errors: BatchAnalysisError[];
  summary: BatchAnalysisSummary;
  processingTime: number; // in seconds
}

export interface BatchAnalysisError {
  resumeId: string;
  errorMessage: string;
  errorCode: string;
  timestamp: Date;
}

export interface BatchAnalysisSummary {
  averageScore: number;
  scoreDistribution: ScoreDistribution;
  commonIssues: CommonIssue[];
  topPerformers: string[]; // resumeIds
  improvementOpportunities: string[];
}

export interface ScoreDistribution {
  excellent: number; // 90-100
  good: number; // 80-89
  average: number; // 70-79
  belowAverage: number; // 60-69
  poor: number; // 0-59
}

export interface CommonIssue {
  issue: string;
  frequency: number; // percentage
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedResumes: string[];
  commonFix: string;
}

export interface AnalysisComparison {
  analyses: ResumeAnalysis[];
  metrics: ComparisonMetric[];
  trends: ComparisonTrend[];
  insights: ComparisonInsight[];
  recommendations: string[];
}

export interface ComparisonMetric {
  metric: string;
  values: MetricValue[];
  trend: 'improving' | 'stable' | 'declining';
  significance: 'low' | 'medium' | 'high';
}

export interface MetricValue {
  analysisId: string;
  value: number;
  timestamp: Date;
  rank: number;
}

export interface ComparisonTrend {
  metric: string;
  direction: 'up' | 'down' | 'stable';
  magnitude: number;
  period: string;
  significance: 'low' | 'medium' | 'high';
}

export interface ComparisonInsight {
  type: 'improvement' | 'regression' | 'consistency' | 'volatility';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface AnalysisProgress {
  resumeId: string;
  analyses: ProgressAnalysis[];
  overallTrend: 'improving' | 'stable' | 'declining';
  improvementRate: number; // percentage
  nextMilestone: Milestone;
  recommendations: ProgressRecommendation[];
}

export interface ProgressAnalysis {
  analysisId: string;
  date: Date;
  score: number;
  improvement: number;
  keyChanges: string[];
}

export interface Milestone {
  title: string;
  description: string;
  targetScore: number;
  estimatedDate: Date;
  requirements: string[];
}

export interface ProgressRecommendation {
  type: 'immediate' | 'short_term' | 'long_term';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  expectedImpact: number; // score points
  timeToImplement: string;
}

export interface PrioritizedRecommendation {
  recommendation: AnalysisRecommendation;
  priorityScore: number; // 0-100
  urgency: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[]; // other recommendation IDs
  estimatedROI: number;
  implementationOrder: number;
}

export interface ImplementationResult {
  recommendationId: string;
  success: boolean;
  changes: ImplementationChange[];
  scoreImprovement: number;
  newIssues: string[];
  resolvedIssues: string[];
  nextSteps: string[];
}

export interface ImplementationChange {
  section: string;
  changeType: 'added' | 'modified' | 'removed' | 'reordered';
  description: string;
  impact: 'low' | 'medium' | 'high';
  before?: string;
  after?: string;
}

export interface IndustryInsights {
  industry: string;
  averageScore: number;
  scoreDistribution: ScoreDistribution;
  commonStrengths: string[];
  commonWeaknesses: string[];
  topKeywords: IndustryKeyword[];
  successFactors: SuccessFactor[];
  trends: IndustryTrend[];
}

export interface IndustryKeyword {
  keyword: string;
  frequency: number; // percentage
  impact: number; // 0-100
  category: string;
  trending: boolean;
}

export interface SuccessFactor {
  factor: string;
  importance: number; // 0-100
  description: string;
  examples: string[];
  implementation: string;
}

export interface IndustryTrend {
  trend: string;
  direction: 'increasing' | 'decreasing' | 'stable';
  impact: 'low' | 'medium' | 'high';
  timeframe: string;
  description: string;
}

export interface PositionInsights {
  position: string;
  averageScore: number;
  requiredSkills: PositionSkill[];
  preferredExperience: ExperienceRequirement[];
  commonResponsibilities: string[];
  successMetrics: string[];
  careerProgression: CareerPath[];
}

export interface PositionSkill {
  skill: string;
  importance: 'required' | 'preferred' | 'nice_to_have';
  frequency: number; // percentage in job postings
  marketValue: number; // 0-100
  category: 'technical' | 'soft' | 'industry_specific';
}

export interface ExperienceRequirement {
  type: 'years' | 'projects' | 'achievements' | 'certifications';
  description: string;
  importance: 'required' | 'preferred' | 'nice_to_have';
  frequency: number; // percentage in job postings
}

export interface CareerPath {
  fromPosition: string;
  toPosition: string;
  frequency: number; // percentage
  averageTime: string;
  requiredSkills: string[];
  typicalProgression: string;
}

export interface QualityValidation {
  isValid: boolean;
  confidence: number; // 0-100
  issues: ValidationIssue[];
  recommendations: ValidationRecommendation[];
  calibrationNeeded: boolean;
}

export interface ValidationIssue {
  type: 'accuracy' | 'consistency' | 'completeness' | 'relevance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedMetrics: string[];
  suggestedFix: string;
}

export interface ValidationRecommendation {
  type:
    | 'model_update'
    | 'data_refresh'
    | 'criteria_adjustment'
    | 'manual_review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  implementation: string;
  expectedImprovement: string;
}

export interface CalibrationData {
  analysisId: string;
  expertScore: number;
  aiScore: number;
  feedback: string;
  category: string;
  weight: number;
}

export interface CalibrationResult {
  modelVersion: string;
  improvementAchieved: number; // percentage
  accuracyIncrease: number; // percentage
  calibratedMetrics: string[];
  validationResults: ValidationResult[];
}

export interface ValidationResult {
  metric: string;
  beforeAccuracy: number;
  afterAccuracy: number;
  improvement: number;
  confidence: number;
}

export interface AnalysisStatistics {
  totalAnalyses: number;
  averageScore: number;
  improvementRate: number;
  mostCommonIssues: string[];
  averageProcessingTime: number; // in seconds
  userSatisfaction: number; // 0-100
  recommendationImplementationRate: number; // percentage
}

export interface GlobalAnalysisStats {
  totalAnalyses: number;
  totalUsers: number;
  averageGlobalScore: number;
  topPerformingIndustries: string[];
  mostAnalyzedPositions: string[];
  commonImprovementAreas: string[];
  platformEffectiveness: number; // 0-100
}

export interface AnalysisTrend {
  metric: string;
  period: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  changePercentage: number;
  significance: 'low' | 'medium' | 'high';
  factors: string[];
}

export interface DatePeriod {
  startDate: Date;
  endDate: Date;
  granularity: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface BenchmarkData {
  industry: string;
  position: string;
  experienceLevel: string;
  averageScore: number;
  scoreDistribution: ScoreDistribution;
  topPerformingMetrics: BenchmarkMetric[];
  commonStrengths: string[];
  commonWeaknesses: string[];
  successFactors: string[];
}

export interface BenchmarkMetric {
  metric: string;
  averageValue: number;
  topPerformers: number;
  industryStandard: number;
  importance: number; // 0-100
}

export interface RecommendationEffectiveness {
  recommendationType: string;
  implementationRate: number; // percentage
  averageImpact: number; // score improvement
  userSatisfaction: number; // 0-100
  timeToImplement: number; // in hours
  successRate: number; // percentage
}
