export interface LanguageSkillsTest extends Test {
  category: 'language_skills';
  language: string;
  languageCode: string;
  skillType: 'listening' | 'speaking' | 'reading' | 'writing' | 'integrated';
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  isAdaptive: boolean;
  audioComponents: AudioComponent[];
  speakingComponents: SpeakingComponent[];
  writingComponents: WritingComponent[];
  readingComponents: ReadingComponent[];
  culturalContext: CulturalContext[];
  businessRelevance: number; // 0-100
  academicRelevance: number; // 0-100
}

export interface AudioComponent {
  id: string;
  title: string;
  audioUrl: string;
  duration: number; // in seconds
  accent: string;
  speakingRate: 'slow' | 'normal' | 'fast';
  audioQuality: 'standard' | 'high' | 'studio';
  transcript: string;
  vocabulary: VocabularyItem[];
  culturalReferences: string[];
  difficulty: string;
}

export interface VocabularyItem {
  word: string;
  definition: string;
  partOfSpeech: string;
  frequency: 'common' | 'intermediate' | 'advanced' | 'specialized';
  context: string;
  synonyms: string[];
  examples: string[];
}

export interface SpeakingComponent {
  id: string;
  prompt: string;
  preparationTime: number; // in seconds
  responseTime: number; // in seconds
  evaluationCriteria: SpeakingCriteria[];
  sampleResponse?: string;
  vocabulary: string[];
  grammarFocus: string[];
  culturalConsiderations: string[];
}

export interface SpeakingCriteria {
  criterion:
    | 'pronunciation'
    | 'fluency'
    | 'vocabulary'
    | 'grammar'
    | 'discourse'
    | 'task_achievement';
  weight: number; // 0-1
  description: string;
  scoringLevels: SpeakingLevel[];
}

export interface SpeakingLevel {
  level: string;
  score: number; // 0-100
  description: string;
  indicators: string[];
  examples: string[];
}

export interface WritingComponent {
  id: string;
  prompt: string;
  taskType:
    | 'essay'
    | 'letter'
    | 'report'
    | 'summary'
    | 'creative'
    | 'technical';
  wordLimit: {
    min: number;
    max: number;
  };
  timeLimit: number; // in minutes
  evaluationCriteria: WritingCriteria[];
  sampleResponse?: string;
  vocabulary: string[];
  grammarFocus: string[];
  styleRequirements: string[];
}

export interface WritingCriteria {
  criterion:
    | 'task_response'
    | 'coherence_cohesion'
    | 'lexical_resource'
    | 'grammatical_accuracy'
    | 'style'
    | 'organization';
  weight: number; // 0-1
  description: string;
  scoringLevels: WritingLevel[];
}

export interface WritingLevel {
  level: string;
  score: number; // 0-100
  description: string;
  indicators: string[];
  examples: string[];
}

export interface ReadingComponent {
  id: string;
  title: string;
  text: string;
  textType:
    | 'article'
    | 'academic'
    | 'business'
    | 'literary'
    | 'technical'
    | 'news';
  wordCount: number;
  readingTime: number; // estimated in minutes
  vocabulary: VocabularyItem[];
  comprehensionQuestions: ComprehensionQuestion[];
  culturalContext: string[];
  difficulty: string;
}

export interface ComprehensionQuestion {
  id: string;
  type:
    | 'main_idea'
    | 'detail'
    | 'inference'
    | 'vocabulary'
    | 'author_purpose'
    | 'text_structure';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  textReference: string;
  difficulty: string;
}

export interface CulturalContext {
  aspect: string;
  description: string;
  relevance: number; // 0-100
  examples: string[];
  considerations: string[];
  businessImplications: string[];
}

export interface LanguageSkillsTestResult extends TestResult {
  cefrLevel: string;
  skillBreakdown: LanguageSkillBreakdown;
  linguisticAnalysis: LinguisticAnalysis;
  communicativeCompetence: CommunicativeCompetence;
  culturalCompetence: CulturalCompetence;
  businessLanguageSkills: BusinessLanguageSkills;
  improvementPlan: LanguageImprovementPlan;
}

export interface LanguageSkillBreakdown {
  listening: SkillAssessment;
  speaking: SkillAssessment;
  reading: SkillAssessment;
  writing: SkillAssessment;
  integrated: SkillAssessment;
  overallProficiency: string;
}

export interface SkillAssessment {
  score: number; // 0-100
  cefrLevel: string;
  strengths: string[];
  weaknesses: string[];
  subSkills: SubSkillScore[];
  recommendations: string[];
  nextLevelRequirements: string[];
}

export interface SubSkillScore {
  subSkill: string;
  score: number; // 0-100
  description: string;
  examples: string[];
  improvementTips: string[];
}

export interface LinguisticAnalysis {
  vocabulary: VocabularyAnalysis;
  grammar: GrammarAnalysis;
  pronunciation: PronunciationAnalysis;
  fluency: FluencyAnalysis;
  discourse: DiscourseAnalysis;
}

export interface VocabularyAnalysis {
  range: number; // 0-100
  accuracy: number; // 0-100
  appropriateness: number; // 0-100
  sophistication: number; // 0-100
  collocations: number; // 0-100
  idiomaticExpressions: number; // 0-100
  technicalVocabulary: number; // 0-100
  gaps: string[];
  strengths: string[];
}

export interface GrammarAnalysis {
  accuracy: number; // 0-100
  complexity: number; // 0-100
  range: number; // 0-100
  consistency: number; // 0-100
  commonErrors: GrammarError[];
  strengths: string[];
  improvementAreas: string[];
}

export interface GrammarError {
  errorType: string;
  frequency: number; // percentage
  examples: string[];
  correction: string;
  rule: string;
  difficulty: string;
}

export interface PronunciationAnalysis {
  overall: number; // 0-100
  segmentals: number; // 0-100 (individual sounds)
  suprasegmentals: number; // 0-100 (stress, intonation, rhythm)
  intelligibility: number; // 0-100
  nativelikeness: number; // 0-100
  specificIssues: PronunciationIssue[];
  strengths: string[];
}

export interface PronunciationIssue {
  sound: string;
  description: string;
  frequency: number; // percentage
  impact: 'low' | 'medium' | 'high';
  exercises: string[];
  examples: string[];
}

export interface FluencyAnalysis {
  speechRate: number; // words per minute
  pausePatterns: PausePattern[];
  hesitations: number; // per minute
  selfCorrections: number; // per minute
  fillerWords: number; // per minute
  overall: number; // 0-100
  naturalness: number; // 0-100
}

export interface PausePattern {
  type: 'appropriate' | 'inappropriate' | 'excessive';
  frequency: number; // per minute
  averageDuration: number; // in seconds
  impact: string;
}

export interface DiscourseAnalysis {
  coherence: number; // 0-100
  cohesion: number; // 0-100
  organization: number; // 0-100
  topicDevelopment: number; // 0-100
  registerAppropriate: number; // 0-100
  pragmaticCompetence: number; // 0-100
}

export interface CommunicativeCompetence {
  taskAchievement: number; // 0-100
  interactionalCompetence: number; // 0-100
  strategicCompetence: number; // 0-100
  sociolinguisticCompetence: number; // 0-100
  overallEffectiveness: number; // 0-100
  communicationStrategies: string[];
}

export interface CulturalCompetence {
  culturalAwareness: number; // 0-100
  culturalSensitivity: number; // 0-100
  crossCulturalCommunication: number; // 0-100
  culturalAdaptation: number; // 0-100
  businessEtiquette: number; // 0-100
  culturalGaps: string[];
  strengths: string[];
}

export interface BusinessLanguageSkills {
  professionalCommunication: number; // 0-100
  businessVocabulary: number; // 0-100
  formalWriting: number; // 0-100
  presentationSkills: number; // 0-100
  negotiationLanguage: number; // 0-100
  meetingParticipation: number; // 0-100
  emailCommunication: number; // 0-100
  industrySpecificLanguage: number; // 0-100
}

export interface LanguageImprovementPlan {
  currentLevel: string;
  targetLevel: string;
  estimatedTimeToTarget: string;
  priorityAreas: PriorityArea[];
  learningPath: LanguageLearningStep[];
  resources: LanguageResource[];
  milestones: LanguageMilestone[];
  assessmentSchedule: AssessmentSchedule[];
}

export interface PriorityArea {
  skill: string;
  currentScore: number;
  targetScore: number;
  importance: 'low' | 'medium' | 'high' | 'critical';
  timeAllocation: number; // percentage
  specificGoals: string[];
}

export interface LanguageLearningStep {
  step: number;
  title: string;
  description: string;
  skills: string[];
  activities: string[];
  duration: string;
  difficulty: string;
  prerequisites: string[];
  outcomes: string[];
}

export interface LanguageResource {
  type: 'course' | 'app' | 'book' | 'podcast' | 'video' | 'tutor' | 'exchange';
  name: string;
  provider: string;
  level: string;
  skills: string[];
  duration: string;
  cost: string;
  rating: number;
  url?: string;
  description: string;
}

export interface LanguageMilestone {
  milestone: string;
  targetDate: Date;
  requirements: string[];
  assessmentMethod: string;
  reward: string;
  progress: number; // 0-100
}

export interface AssessmentSchedule {
  assessmentType: string;
  frequency: string;
  nextAssessment: Date;
  purpose: string;
  expectedOutcome: string;
}
