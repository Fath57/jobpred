export interface HardSkillsTest extends Test {
  category: 'hard_skills';
  technicalDomain: string;
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
  concepts: string[];
  practicalComponents: PracticalComponent[];
  codeExamples: CodeExample[];
  architectureQuestions: ArchitectureQuestion[];
  industryRelevance: number; // 0-100
  marketDemand: 'Low' | 'Medium' | 'High' | 'Very High';
  salaryImpact: string;
}

export interface PracticalComponent {
  id: string;
  type:
    | 'coding'
    | 'debugging'
    | 'architecture'
    | 'system_design'
    | 'code_review';
  title: string;
  description: string;
  timeLimit: number; // in minutes
  difficulty: string;
  environment: CodingEnvironment;
  testCases: TestCase[];
  evaluationCriteria: EvaluationCriteria[];
}

export interface CodingEnvironment {
  language: string;
  version: string;
  allowedLibraries: string[];
  restrictedFunctions: string[];
  memoryLimit: number; // in MB
  timeLimit: number; // in seconds
  inputFormat: string;
  outputFormat: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  weight: number; // 0-1
  description?: string;
  timeLimit?: number; // in seconds
}

export interface EvaluationCriteria {
  criterion: string;
  weight: number; // 0-1
  description: string;
  scoringRubric: ScoringRubric[];
}

export interface ScoringRubric {
  level: string;
  score: number; // 0-100
  description: string;
  indicators: string[];
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  explanation: string;
  concepts: string[];
  difficulty: string;
  commonMistakes: string[];
}

export interface ArchitectureQuestion {
  id: string;
  scenario: string;
  requirements: string[];
  constraints: string[];
  evaluationAspects: string[];
  sampleSolution?: string;
  alternativeSolutions: string[];
  tradeoffs: Tradeoff[];
}

export interface Tradeoff {
  aspect: string;
  options: TradeoffOption[];
  recommendation: string;
  reasoning: string[];
}

export interface TradeoffOption {
  option: string;
  pros: string[];
  cons: string[];
  suitability: string[];
}

export interface HardSkillsTestResult extends TestResult {
  technicalScores: TechnicalScore[];
  codeQuality: CodeQualityAnalysis;
  problemSolvingApproach: ProblemSolvingAnalysis;
  architecturalThinking: ArchitecturalAnalysis;
  bestPracticesAdherence: BestPracticesAnalysis;
  industryReadiness: IndustryReadinessAnalysis;
}

export interface TechnicalScore {
  technology: string;
  score: number; // 0-100
  level: string;
  questionsCorrect: number;
  totalQuestions: number;
  practicalScore: number; // 0-100
  theoryScore: number; // 0-100
  applicationScore: number; // 0-100;
  improvement: number; // vs previous
  marketValue: number; // 0-100
}

export interface CodeQualityAnalysis {
  overallQuality: number; // 0-100
  readability: number; // 0-100
  maintainability: number; // 0-100
  efficiency: number; // 0-100
  security: number; // 0-100
  testability: number; // 0-100
  documentation: number; // 0-100
  bestPractices: BestPracticeViolation[];
  codeSmells: CodeSmell[];
  suggestions: CodeSuggestion[];
}

export interface BestPracticeViolation {
  practice: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  fix: string;
  impact: string;
}

export interface CodeSmell {
  smell: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  location: string;
  refactoring: string;
  priority: number; // 1-10
}

export interface CodeSuggestion {
  type:
    | 'optimization'
    | 'refactoring'
    | 'security'
    | 'readability'
    | 'performance';
  description: string;
  before: string;
  after: string;
  reasoning: string;
  impact: 'low' | 'medium' | 'high';
}

export interface ProblemSolvingAnalysis {
  approach: 'systematic' | 'intuitive' | 'trial_error' | 'pattern_matching';
  efficiency: number; // 0-100
  creativity: number; // 0-100
  thoroughness: number; // 0-100
  timeManagement: number; // 0-100
  debuggingSkills: number; // 0-100
  testingApproach: number; // 0-100
  solutionQuality: number; // 0-100
}

export interface ArchitecturalAnalysis {
  systemThinking: number; // 0-100
  scalabilityConsideration: number; // 0-100
  securityAwareness: number; // 0-100
  performanceOptimization: number; // 0-100
  maintainabilityFocus: number; // 0-100
  tradeoffAnalysis: number; // 0-100
  documentationQuality: number; // 0-100
}

export interface BestPracticesAnalysis {
  codingStandards: number; // 0-100
  securityPractices: number; // 0-100
  testingPractices: number; // 0-100
  documentationPractices: number; // 0-100
  versionControlUsage: number; // 0-100
  codeReviewReadiness: number; // 0-100
  industryStandards: number; // 0-100
}

export interface IndustryReadinessAnalysis {
  overallReadiness: number; // 0-100
  technicalCompetency: number; // 0-100
  practicalExperience: number; // 0-100
  industryKnowledge: number; // 0-100
  toolProficiency: number; // 0-100
  collaborationReadiness: number; // 0-100
  continuousLearning: number; // 0-100
  recommendedRoles: string[];
  skillGaps: SkillGap[];
  learningPath: LearningPathItem[];
}

export interface SkillGap {
  skill: string;
  currentLevel: string;
  requiredLevel: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  timeToAcquire: string;
  learningResources: string[];
  priority: number; // 1-10
}

export interface LearningPathItem {
  step: number;
  title: string;
  description: string;
  skills: string[];
  estimatedTime: string;
  difficulty: string;
  prerequisites: string[];
  resources: string[];
  milestones: string[];
}
