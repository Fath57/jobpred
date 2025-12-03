export interface SoftSkillsTest extends Test {
  category: 'soft_skills';
  skillDomain: string;
  competencies: string[];
  scenarios: TestScenario[];
  behavioralIndicators: BehavioralIndicator[];
  assessmentMethods: AssessmentMethod[];
  contextualFactors: ContextualFactor[];
  industryRelevance: number; // 0-100
  roleApplicability: string[];
}

export interface TestScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  stakeholders: string[];
  constraints: string[];
  objectives: string[];
  difficulty: string;
  timeLimit: number; // in minutes
  evaluationDimensions: string[];
  sampleResponses: SampleResponse[];
}

export interface SampleResponse {
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  response: string;
  score: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  reasoning: string;
}

export interface BehavioralIndicator {
  behavior: string;
  description: string;
  observableActions: string[];
  positiveIndicators: string[];
  negativeIndicators: string[];
  assessmentCriteria: string[];
  weight: number; // 0-1
}

export interface AssessmentMethod {
  method:
    | 'self_assessment'
    | 'scenario_response'
    | 'behavioral_observation'
    | 'peer_evaluation'
    | 'situational_judgment';
  description: string;
  reliability: number; // 0-100
  validity: number; // 0-100
  applicableSkills: string[];
  limitations: string[];
}

export interface ContextualFactor {
  factor: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  considerations: string[];
  adaptations: string[];
}

export interface SoftSkillsTestResult extends TestResult {
  competencyScores: CompetencyScore[];
  behavioralAnalysis: BehavioralAnalysis;
  interpersonalEffectiveness: InterpersonalAnalysis;
  emotionalIntelligence: EmotionalIntelligenceAnalysis;
  leadershipPotential: LeadershipAnalysis;
  communicationStyle: CommunicationAnalysis;
  teamDynamics: TeamDynamicsAnalysis;
  adaptabilityProfile: AdaptabilityAnalysis;
}

export interface CompetencyScore {
  competency: string;
  score: number; // 0-100
  level: string;
  behaviorExamples: string[];
  developmentAreas: string[];
  strengths: string[];
  applicationContexts: string[];
  improvementPlan: string[];
}

export interface BehavioralAnalysis {
  dominantBehaviors: DominantBehavior[];
  behavioralFlexibility: number; // 0-100
  consistencyScore: number; // 0-100
  adaptabilityIndicators: string[];
  stressResponses: StressResponse[];
  motivationalDrivers: string[];
  decisionMakingStyle: string;
}

export interface DominantBehavior {
  behavior: string;
  frequency: number; // percentage
  contexts: string[];
  effectiveness: number; // 0-100
  impact: 'positive' | 'negative' | 'neutral';
  alternatives: string[];
}

export interface StressResponse {
  stressor: string;
  response: string;
  effectiveness: number; // 0-100
  frequency: number; // percentage
  impact: string;
  copingStrategies: string[];
}

export interface InterpersonalAnalysis {
  relationshipBuilding: number; // 0-100
  conflictResolution: number; // 0-100
  influenceStyle: string;
  collaborationEffectiveness: number; // 0-100
  networkingAbility: number; // 0-100
  culturalSensitivity: number; // 0-100
  trustBuilding: number; // 0-100
}

export interface EmotionalIntelligenceAnalysis {
  selfAwareness: number; // 0-100
  selfRegulation: number; // 0-100
  motivation: number; // 0-100
  empathy: number; // 0-100
  socialSkills: number; // 0-100
  overallEQ: number; // 0-100
  emotionalTriggers: string[];
  copingMechanisms: string[];
  developmentAreas: string[];
}

export interface LeadershipAnalysis {
  leadershipStyle: string;
  leadershipPotential: number; // 0-100
  visionaryCommunication: number; // 0-100
  teamMotivation: number; // 0-100
  decisionMaking: number; // 0-100
  changeManagement: number; // 0-100
  delegation: number; // 0-100
  coaching: number; // 0-100
  readinessLevel: string;
  developmentPriorities: string[];
}

export interface CommunicationAnalysis {
  communicationStyle: string;
  clarity: number; // 0-100
  persuasiveness: number; // 0-100
  activeListening: number; // 0-100
  nonVerbalCommunication: number; // 0-100
  writtenCommunication: number; // 0-100
  presentationSkills: number; // 0-100
  feedbackDelivery: number; // 0-100
  culturalAdaptation: number; // 0-100
}

export interface TeamDynamicsAnalysis {
  teamRole: string;
  collaborationStyle: string;
  conflictStyle: string;
  contributionType: string;
  teamInfluence: number; // 0-100
  supportiveness: number; // 0-100
  accountability: number; // 0-100
  teamCompatibility: TeamCompatibility[];
}

export interface TeamCompatibility {
  teamType: string;
  compatibility: number; // 0-100
  strengths: string[];
  challenges: string[];
  recommendations: string[];
}

export interface AdaptabilityAnalysis {
  changeReadiness: number; // 0-100
  learningAgility: number; // 0-100
  resilience: number; // 0-100
  flexibility: number; // 0-100
  innovationOrientation: number; // 0-100
  ambiguityTolerance: number; // 0-100
  adaptationStrategies: string[];
  changeBarriers: string[];
}
