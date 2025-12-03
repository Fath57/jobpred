export interface HRInterviewTest extends Test {
  category: 'hr_interview_prep';
  interviewType:
    | 'behavioral'
    | 'situational'
    | 'motivational'
    | 'technical_hr'
    | 'panel'
    | 'cultural_fit'
    | 'stress'
    | 'case_study';
  interviewFormat:
    | 'structured'
    | 'semi_structured'
    | 'unstructured'
    | 'competency_based';
  industryFocus: string[];
  positionLevels: string[];
  companyTypes: string[];
  interviewQuestions: InterviewQuestion[];
  evaluationFrameworks: EvaluationFramework[];
  simulationScenarios: SimulationScenario[];
  feedbackCriteria: FeedbackCriteria[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type:
    | 'behavioral'
    | 'situational'
    | 'motivational'
    | 'technical'
    | 'hypothetical'
    | 'case_based';
  category: string;
  difficulty: string;
  timeLimit: number; // in seconds
  evaluationCriteria: string[];
  sampleAnswers: SampleAnswer[];
  followUpQuestions: string[];
  commonMistakes: string[];
  scoringRubric: InterviewScoringRubric[];
  industrySpecific: boolean;
  positionSpecific: boolean;
}

export interface SampleAnswer {
  quality: 'poor' | 'fair' | 'good' | 'excellent' | 'outstanding';
  answer: string;
  score: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  framework: string; // e.g., "STAR", "CAR", "SOAR"
}

export interface InterviewScoringRubric {
  criterion: string;
  weight: number; // 0-1
  levels: RubricLevel[];
  examples: string[];
  commonErrors: string[];
}

export interface RubricLevel {
  level: string;
  score: number; // 0-100
  description: string;
  indicators: string[];
  examples: string[];
}

export interface EvaluationFramework {
  framework: string;
  description: string;
  components: FrameworkComponent[];
  applicability: string[];
  strengths: string[];
  limitations: string[];
  usage: string[];
}

export interface FrameworkComponent {
  component: string;
  description: string;
  weight: number; // 0-1
  evaluationCriteria: string[];
  scoringMethod: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  rolePlay: boolean;
  stakeholders: string[];
  objectives: string[];
  constraints: string[];
  timeLimit: number; // in minutes
  evaluationDimensions: string[];
  difficultyFactors: string[];
  successCriteria: string[];
}

export interface FeedbackCriteria {
  criterion: string;
  description: string;
  weight: number; // 0-1
  observableBehaviors: string[];
  positiveFeedback: string[];
  developmentFeedback: string[];
  actionableAdvice: string[];
}

export interface HRInterviewTestResult extends TestResult {
  interviewPerformance: InterviewPerformance;
  communicationAnalysis: InterviewCommunicationAnalysis;
  behavioralAssessment: InterviewBehavioralAssessment;
  competencyEvaluation: CompetencyEvaluation;
  culturalFitAssessment: CulturalFitAssessment;
  interviewReadiness: InterviewReadiness;
  improvementPlan: InterviewImprovementPlan;
}

export interface InterviewPerformance {
  overallScore: number; // 0-100
  confidence: number; // 0-100
  authenticity: number; // 0-100
  preparedness: number; // 0-100
  professionalism: number; // 0-100
  engagement: number; // 0-100
  responseQuality: number; // 0-100
  timeManagement: number; // 0-100
  questionHandling: QuestionHandling[];
}

export interface QuestionHandling {
  questionId: string;
  questionType: string;
  responseTime: number; // in seconds
  responseQuality: number; // 0-100
  structure: number; // 0-100
  content: number; // 0-100
  delivery: number; // 0-100
  strengths: string[];
  improvements: string[];
  framework: string;
}

export interface InterviewCommunicationAnalysis {
  verbalCommunication: VerbalCommunication;
  nonVerbalCommunication: NonVerbalCommunication;
  listeningSkills: ListeningSkills;
  questionAsking: QuestionAsking;
  storytelling: Storytelling;
  persuasiveness: number; // 0-100
  clarity: number; // 0-100
  conciseness: number; // 0-100
}

export interface VerbalCommunication {
  articulation: number; // 0-100
  pace: number; // 0-100
  volume: number; // 0-100
  tone: number; // 0-100
  vocabulary: number; // 0-100
  grammar: number; // 0-100
  fillerWords: number; // frequency
  pauseManagement: number; // 0-100
}

export interface NonVerbalCommunication {
  eyeContact: number; // 0-100
  facialExpressions: number; // 0-100
  gestures: number; // 0-100
  posture: number; // 0-100
  overallPresence: number; // 0-100
  confidence: number; // 0-100
  engagement: number; // 0-100
  professionalism: number; // 0-100
}

export interface ListeningSkills {
  activeListening: number; // 0-100
  comprehension: number; // 0-100
  clarificationSeeking: number; // 0-100
  responseRelevance: number; // 0-100
  attentiveness: number; // 0-100
  interruptionManagement: number; // 0-100
}

export interface QuestionAsking {
  questionQuality: number; // 0-100
  relevance: number; // 0-100
  timing: number; // 0-100
  preparation: number; // 0-100
  curiosity: number; // 0-100
  strategicThinking: number; // 0-100
  questionsAsked: InterviewQuestionAsked[];
}

export interface InterviewQuestionAsked {
  question: string;
  category: string;
  quality: number; // 0-100
  timing: string;
  purpose: string;
  effectiveness: number; // 0-100
}

export interface Storytelling {
  structure: number; // 0-100
  engagement: number; // 0-100
  relevance: number; // 0-100
  impact: number; // 0-100
  authenticity: number; // 0-100
  memorability: number; // 0-100
  frameworks: string[];
  improvementAreas: string[];
}

export interface InterviewBehavioralAssessment {
  leadership: number; // 0-100
  teamwork: number; // 0-100
  problemSolving: number; // 0-100
  adaptability: number; // 0-100
  initiative: number; // 0-100
  resilience: number; // 0-100
  integrity: number; // 0-100
  emotionalIntelligence: number; // 0-100
  behaviorExamples: BehaviorExample[];
  developmentAreas: string[];
}

export interface BehaviorExample {
  behavior: string;
  example: string;
  context: string;
  effectiveness: number; // 0-100
  impact: string;
  learnings: string[];
}

export interface CompetencyEvaluation {
  coreCompetencies: CoreCompetency[];
  technicalCompetencies: TechnicalCompetency[];
  leadershipCompetencies: LeadershipCompetency[];
  overallCompetencyScore: number; // 0-100
  competencyGaps: CompetencyGap[];
  developmentPriorities: string[];
}

export interface CoreCompetency {
  competency: string;
  score: number; // 0-100
  level: string;
  evidence: string[];
  gaps: string[];
  developmentActions: string[];
}

export interface TechnicalCompetency {
  competency: string;
  score: number; // 0-100
  level: string;
  demonstration: string[];
  knowledge: number; // 0-100
  application: number; // 0-100
  innovation: number; // 0-100
}

export interface LeadershipCompetency {
  competency: string;
  score: number; // 0-100
  potential: number; // 0-100
  readiness: string;
  examples: string[];
  developmentNeeds: string[];
}

export interface CompetencyGap {
  competency: string;
  currentLevel: string;
  requiredLevel: string;
  gap: number; // 0-100
  priority: 'low' | 'medium' | 'high' | 'critical';
  developmentPlan: string[];
  timeframe: string;
}

export interface CulturalFitAssessment {
  overallFit: number; // 0-100
  valueAlignment: ValueAlignment[];
  workStyleFit: number; // 0-100
  teamFit: number; // 0-100
  organizationalFit: number; // 0-100
  adaptabilityToCulture: number; // 0-100
  culturalContribution: string[];
  potentialChallenges: string[];
}

export interface ValueAlignment {
  value: string;
  alignment: number; // 0-100
  importance: 'low' | 'medium' | 'high' | 'critical';
  demonstration: string[];
  gaps: string[];
}

export interface InterviewReadiness {
  overallReadiness: number; // 0-100
  preparationLevel: number; // 0-100
  confidenceLevel: number; // 0-100
  skillReadiness: number; // 0-100
  knowledgeReadiness: number; // 0-100
  presentationReadiness: number; // 0-100
  readinessFactors: ReadinessFactor[];
  improvementAreas: string[];
}

export interface ReadinessFactor {
  factor: string;
  score: number; // 0-100
  importance: 'low' | 'medium' | 'high' | 'critical';
  status: 'ready' | 'needs_improvement' | 'not_ready';
  actions: string[];
}

export interface InterviewImprovementPlan {
  priorityAreas: InterviewPriorityArea[];
  practiceRecommendations: PracticeRecommendation[];
  skillDevelopment: SkillDevelopmentPlan[];
  preparationStrategy: PreparationStrategy;
  timeline: ImprovementTimeline[];
  resources: InterviewResource[];
  mockInterviewPlan: MockInterviewPlan;
}

export interface InterviewPriorityArea {
  area: string;
  currentScore: number;
  targetScore: number;
  importance: 'low' | 'medium' | 'high' | 'critical';
  timeAllocation: number; // percentage
  specificActions: string[];
  successMetrics: string[];
}

export interface PracticeRecommendation {
  type:
    | 'mock_interview'
    | 'question_practice'
    | 'scenario_simulation'
    | 'skill_building'
    | 'knowledge_review';
  description: string;
  frequency: string;
  duration: string;
  difficulty: string;
  focus: string[];
  expectedOutcome: string;
}

export interface SkillDevelopmentPlan {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  developmentActions: string[];
  practiceActivities: string[];
  timeframe: string;
  milestones: string[];
  resources: string[];
}

export interface PreparationStrategy {
  researchAreas: string[];
  practiceSchedule: string;
  materialPreparation: string[];
  mentalPreparation: string[];
  physicalPreparation: string[];
  contingencyPlanning: string[];
}

export interface ImprovementTimeline {
  phase: string;
  duration: string;
  objectives: string[];
  activities: string[];
  milestones: string[];
  assessments: string[];
}

export interface InterviewResource {
  type:
    | 'book'
    | 'course'
    | 'video'
    | 'coach'
    | 'mentor'
    | 'practice_platform'
    | 'community';
  name: string;
  provider: string;
  description: string;
  relevance: number; // 0-100
  cost: string;
  duration: string;
  difficulty: string;
  url?: string;
  rating?: number;
}

export interface MockInterviewPlan {
  frequency: string;
  interviewTypes: string[];
  progressionPlan: string[];
  feedbackMechanism: string;
  improvementTracking: string;
  realismLevel: string;
  stressSimulation: boolean;
}
