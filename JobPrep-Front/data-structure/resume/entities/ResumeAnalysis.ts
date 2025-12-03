export interface ResumeAnalysis {
  id: string;
  resumeId: string;
  userId: string;
  analysisType: 'full' | 'quick' | 'ats' | 'keyword' | 'structure' | 'content';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  results: AnalysisResults;
  recommendations: AnalysisRecommendation[];
  benchmarks: BenchmarkComparison;
  processingTime: number; // in seconds
  aiModel: string;
  aiVersion: string;
  createdAt: Date;
  completedAt?: Date;
  errorMessage?: string;
}

export interface AnalysisResults {
  overallScore: number; // 0-100
  categoryScores: CategoryScore[];
  detailedMetrics: DetailedMetrics;
  issuesFound: AnalysisIssue[];
  strengths: AnalysisStrength[];
  keywordAnalysis: KeywordAnalysisResult;
  atsCompatibility: ATSCompatibilityResult;
  readabilityMetrics: ReadabilityMetrics;
  structureAnalysis: StructureAnalysisResult;
  contentAnalysis: ContentAnalysisResult;
}

export interface CategoryScore {
  category:
    | 'content'
    | 'structure'
    | 'formatting'
    | 'keywords'
    | 'ats'
    | 'readability';
  score: number; // 0-100
  weight: number; // 0-1
  description: string;
  subScores: SubScore[];
}

export interface SubScore {
  metric: string;
  score: number; // 0-100
  description: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export interface DetailedMetrics {
  wordCount: number;
  pageCount: number;
  sectionCount: number;
  bulletPointCount: number;
  quantifiedAchievements: number;
  actionVerbsUsed: number;
  passiveVoicePercentage: number;
  averageSentenceLength: number;
  readingLevel: string;
  keywordDensity: number;
}

export interface AnalysisIssue {
  id: string;
  type: 'error' | 'warning' | 'suggestion';
  category:
    | 'content'
    | 'structure'
    | 'formatting'
    | 'grammar'
    | 'ats'
    | 'keywords';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: IssueLocation;
  suggestedFix: string;
  impact: string;
  priority: number; // 1-10
}

export interface IssueLocation {
  section?: string;
  subsection?: string;
  paragraph?: number;
  sentence?: number;
  line?: number;
  character?: number;
}

export interface AnalysisStrength {
  category: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  examples: string[];
}

export interface KeywordAnalysisResult {
  totalKeywords: number;
  uniqueKeywords: number;
  industryKeywords: IndustryKeyword[];
  missingKeywords: MissingKeyword[];
  keywordDensity: KeywordDensity[];
  competitorComparison: KeywordComparison;
}

export interface IndustryKeyword {
  keyword: string;
  frequency: number;
  relevance: number; // 0-100
  category: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export interface MissingKeyword {
  keyword: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  suggestedPlacement: string[];
  competitorUsage: number; // percentage
}

export interface KeywordDensity {
  keyword: string;
  count: number;
  density: number; // percentage
  optimal: boolean;
  recommendation: 'increase' | 'decrease' | 'maintain';
}

export interface KeywordComparison {
  industryAverage: number;
  topPerformers: number;
  yourScore: number;
  percentile: number;
  gapAnalysis: string[];
}

export interface ATSCompatibilityResult {
  overallScore: number; // 0-100
  systemCompatibility: SystemCompatibility[];
  formatIssues: FormatIssue[];
  structureIssues: StructureIssue[];
  recommendations: ATSRecommendation[];
}

export interface SystemCompatibility {
  system: string;
  compatibility: number; // 0-100
  issues: string[];
  recommendations: string[];
}

export interface FormatIssue {
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  fix: string;
  affectedSystems: string[];
}

export interface StructureIssue {
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  fix: string;
  impact: string;
}

export interface ATSRecommendation {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  implementation: string;
  expectedImprovement: number; // points
}

export interface ReadabilityMetrics {
  fleschScore: number; // 0-100
  fleschKincaidGrade: number;
  averageWordsPerSentence: number;
  averageSyllablesPerWord: number;
  complexWords: number;
  readingTime: number; // in minutes
  readingLevel:
    | 'Elementary'
    | 'Middle School'
    | 'High School'
    | 'College'
    | 'Graduate';
}

export interface StructureAnalysisResult {
  sectionAnalysis: SectionAnalysis[];
  orderOptimization: OrderOptimization;
  lengthAnalysis: LengthAnalysis;
  balanceAnalysis: BalanceAnalysis;
}

export interface SectionAnalysis {
  section: string;
  isPresent: boolean;
  isOptimal: boolean;
  score: number; // 0-100
  issues: string[];
  recommendations: string[];
  industryStandard: boolean;
}

export interface OrderOptimization {
  currentOrder: string[];
  recommendedOrder: string[];
  reasoning: string[];
  impactScore: number; // 0-100
}

export interface LengthAnalysis {
  totalLength: 'too_short' | 'optimal' | 'too_long';
  sectionLengths: SectionLength[];
  recommendations: string[];
}

export interface SectionLength {
  section: string;
  currentLength: number;
  optimalRange: {
    min: number;
    max: number;
  };
  status: 'too_short' | 'optimal' | 'too_long';
}

export interface BalanceAnalysis {
  contentBalance: number; // 0-100
  sectionBalance: SectionBalance[];
  recommendations: string[];
}

export interface SectionBalance {
  section: string;
  percentage: number;
  optimalPercentage: number;
  status: 'underrepresented' | 'optimal' | 'overrepresented';
}

export interface ContentAnalysisResult {
  qualityScore: number; // 0-100
  impactAnalysis: ImpactAnalysis;
  achievementAnalysis: AchievementAnalysis;
  skillsAnalysis: SkillsAnalysis;
  experienceAnalysis: ExperienceAnalysis;
  languageAnalysis: LanguageAnalysis;
}

export interface ImpactAnalysis {
  quantifiedAchievements: number;
  actionVerbsUsed: string[];
  impactStatements: ImpactStatement[];
  recommendations: string[];
}

export interface ImpactStatement {
  statement: string;
  section: string;
  impact: 'low' | 'medium' | 'high';
  hasQuantification: boolean;
  suggestions: string[];
}

export interface AchievementAnalysis {
  totalAchievements: number;
  quantifiedAchievements: number;
  qualityScore: number; // 0-100
  topAchievements: Achievement[];
  improvementSuggestions: string[];
}

export interface Achievement {
  text: string;
  section: string;
  impact: 'low' | 'medium' | 'high';
  quantified: boolean;
  relevance: number; // 0-100
}

export interface SkillsAnalysis {
  technicalSkills: SkillAnalysis[];
  softSkills: SkillAnalysis[];
  missingSkills: MissingSkill[];
  skillsRelevance: number; // 0-100
  recommendations: string[];
}

export interface SkillAnalysis {
  skill: string;
  category: string;
  relevance: number; // 0-100
  marketDemand: 'low' | 'medium' | 'high' | 'very_high';
  proficiencyLevel?: string;
  yearsOfExperience?: number;
}

export interface MissingSkill {
  skill: string;
  category: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  marketDemand: 'low' | 'medium' | 'high' | 'very_high';
  learningPath: string[];
}

export interface ExperienceAnalysis {
  totalExperience: number; // in years
  relevantExperience: number; // in years
  careerProgression: ProgressionAnalysis;
  gapsAnalysis: GapAnalysis[];
  recommendations: string[];
}

export interface ProgressionAnalysis {
  trend: 'upward' | 'lateral' | 'downward' | 'mixed';
  promotions: number;
  responsibilityGrowth: number; // 0-100
  skillsDevelopment: number; // 0-100
  industryExperience: IndustryExperience[];
}

export interface IndustryExperience {
  industry: string;
  years: number;
  relevance: number; // 0-100
  transferableSkills: string[];
}

export interface GapAnalysis {
  type: 'employment' | 'education' | 'skills';
  duration: number; // in months
  explanation?: string;
  impact: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface LanguageAnalysis {
  grammarScore: number; // 0-100
  clarityScore: number; // 0-100
  professionalismScore: number; // 0-100
  consistencyScore: number; // 0-100
  issues: LanguageIssue[];
  suggestions: LanguageSuggestion[];
}

export interface LanguageIssue {
  type: 'grammar' | 'spelling' | 'style' | 'consistency' | 'clarity';
  severity: 'low' | 'medium' | 'high';
  description: string;
  location: IssueLocation;
  correction: string;
}

export interface LanguageSuggestion {
  type: 'improvement' | 'enhancement' | 'alternative';
  description: string;
  before: string;
  after: string;
  reasoning: string;
}

export interface AnalysisRecommendation {
  id: string;
  type: 'immediate' | 'short_term' | 'long_term';
  category: 'content' | 'structure' | 'formatting' | 'keywords' | 'skills';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: string;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  resources: string[];
}

export interface BenchmarkComparison {
  industry: string;
  position: string;
  experienceLevel: string;
  metrics: BenchmarkMetric[];
  ranking: Ranking;
  insights: string[];
}

export interface BenchmarkMetric {
  metric: string;
  yourScore: number;
  industryAverage: number;
  topPerformers: number;
  percentile: number;
  interpretation: string;
}

export interface Ranking {
  overall: number; // 1-100 percentile
  byCategory: CategoryRanking[];
  competitiveAdvantages: string[];
  improvementAreas: string[];
}

export interface CategoryRanking {
  category: string;
  percentile: number;
  rank: string; // e.g., "Top 10%"
  comparison: string;
}
