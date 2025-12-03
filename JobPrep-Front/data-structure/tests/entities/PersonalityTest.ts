export interface PersonalityTest extends Test {
  category: 'personality_skills';
  framework:
    | 'big_five'
    | 'mbti'
    | 'disc'
    | 'enneagram'
    | 'strengths'
    | 'values'
    | 'emotional_intelligence';
  dimensions: PersonalityDimension[];
  assessmentType:
    | 'self_report'
    | 'behavioral_observation'
    | 'situational_judgment'
    | 'projective'
    | 'mixed';
  scientificValidity: number; // 0-100
  testRetestReliability: number; // 0-100
  culturalAdaptations: CulturalAdaptation[];
  businessApplications: string[];
  interpretationGuidelines: InterpretationGuideline[];
}

export interface PersonalityDimension {
  dimension: string;
  description: string;
  facets: PersonalityFacet[];
  scoringMethod: 'likert' | 'forced_choice' | 'ranking' | 'scenario_based';
  interpretationRanges: InterpretationRange[];
  behavioralIndicators: string[];
}

export interface PersonalityFacet {
  facet: string;
  description: string;
  questions: string[];
  weight: number; // 0-1
  reversedItems: boolean[];
}

export interface InterpretationRange {
  range: string;
  minScore: number;
  maxScore: number;
  description: string;
  characteristics: string[];
  implications: string[];
  developmentSuggestions: string[];
}

export interface CulturalAdaptation {
  culture: string;
  adaptations: string[];
  considerations: string[];
  validationStudies: ValidationStudy[];
  localNorms: LocalNorm[];
}

export interface ValidationStudy {
  study: string;
  sampleSize: number;
  reliability: number;
  validity: number;
  findings: string[];
  limitations: string[];
}

export interface LocalNorm {
  demographic: string;
  meanScore: number;
  standardDeviation: number;
  percentiles: Percentile[];
}

export interface Percentile {
  percentile: number;
  score: number;
}

export interface InterpretationGuideline {
  context: string;
  guidelines: string[];
  limitations: string[];
  recommendations: string[];
  ethicalConsiderations: string[];
}

export interface PersonalityTestResult extends TestResult {
  personalityProfile: PersonalityProfile;
  dimensionScores: DimensionScore[];
  personalityType?: string;
  typeDescription?: string;
  reliability: number; // 0-100
  consistency: number; // 0-100
  careerImplications: CareerImplications;
  teamDynamics: PersonalityTeamDynamics;
  leadershipStyle: LeadershipStyle;
  communicationPreferences: CommunicationPreferences;
  workStylePreferences: WorkStylePreferences;
  stressProfile: StressProfile;
  motivationProfile: MotivationProfile;
  developmentRecommendations: PersonalityDevelopmentRecommendation[];
}

export interface PersonalityProfile {
  framework: string;
  profileSummary: string;
  keyCharacteristics: string[];
  strengths: string[];
  potentialChallenges: string[];
  uniqueQualities: string[];
  commonMisconceptions: string[];
  developmentOpportunities: string[];
}

export interface DimensionScore {
  dimension: string;
  rawScore: number;
  percentileScore: number;
  level: 'very_low' | 'low' | 'average' | 'high' | 'very_high';
  description: string;
  facetScores: FacetScore[];
  behavioralImplications: string[];
  developmentAreas: string[];
}

export interface FacetScore {
  facet: string;
  score: number;
  level: string;
  description: string;
  examples: string[];
}

export interface CareerImplications {
  idealRoles: IdealRole[];
  workEnvironments: WorkEnvironment[];
  careerMotivators: string[];
  potentialDerailers: string[];
  leadershipPotential: number; // 0-100
  entrepreneurialFit: number; // 0-100
  teamPlayerFit: number; // 0-100
  independentWorkerFit: number; // 0-100
}

export interface IdealRole {
  role: string;
  fitScore: number; // 0-100
  reasons: string[];
  requirements: string[];
  challenges: string[];
  developmentNeeds: string[];
}

export interface WorkEnvironment {
  environment: string;
  fitScore: number; // 0-100
  characteristics: string[];
  benefits: string[];
  challenges: string[];
  adaptationStrategies: string[];
}

export interface PersonalityTeamDynamics {
  teamRole: string;
  collaborationStyle: string;
  conflictStyle: string;
  communicationStyle: string;
  decisionMakingStyle: string;
  teamContribution: string[];
  potentialFrictions: string[];
  teamCompatibility: TeamPersonalityCompatibility[];
}

export interface TeamPersonalityCompatibility {
  personalityType: string;
  compatibility: number; // 0-100
  synergies: string[];
  challenges: string[];
  workingTips: string[];
}

export interface LeadershipStyle {
  primaryStyle: string;
  secondaryStyle?: string;
  leadershipStrengths: string[];
  leadershipChallenges: string[];
  influenceStyle: string;
  decisionMakingApproach: string;
  teamManagementApproach: string;
  changeManagementStyle: string;
  developmentFocus: string[];
}

export interface CommunicationPreferences {
  preferredStyle: string;
  communicationStrengths: string[];
  communicationChallenges: string[];
  listeningStyle: string;
  feedbackStyle: string;
  conflictCommunication: string;
  persuasionStyle: string;
  adaptationNeeds: string[];
}

export interface WorkStylePreferences {
  workPace: string;
  structurePreference: string;
  autonomyNeeds: string;
  collaborationPreference: string;
  innovationOrientation: string;
  riskTolerance: string;
  changeAdaptation: string;
  workLifeBalance: string;
  motivationalFactors: string[];
}

export interface StressProfile {
  stressTriggers: StressTrigger[];
  stressResponses: StressResponse[];
  copingStrategies: CopingStrategy[];
  resilience: number; // 0-100
  burnoutRisk: 'low' | 'medium' | 'high';
  stressManagementEffectiveness: number; // 0-100
  recoveryPatterns: string[];
}

export interface StressTrigger {
  trigger: string;
  intensity: 'low' | 'medium' | 'high';
  frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
  impact: string;
  managementStrategies: string[];
}

export interface StressResponse {
  response: string;
  effectiveness: number; // 0-100
  consequences: string[];
  alternatives: string[];
}

export interface CopingStrategy {
  strategy: string;
  effectiveness: number; // 0-100
  applicability: string[];
  limitations: string[];
  improvements: string[];
}

export interface MotivationProfile {
  primaryMotivators: Motivator[];
  demotivators: string[];
  motivationalPattern: string;
  intrinsicMotivation: number; // 0-100
  extrinsicMotivation: number; // 0-100
  achievementOrientation: number; // 0-100
  affiliationNeeds: number; // 0-100
  powerMotivation: number; // 0-100
  autonomyNeeds: number; // 0-100
}

export interface Motivator {
  motivator: string;
  strength: number; // 0-100
  contexts: string[];
  manifestations: string[];
  supportStrategies: string[];
}

export interface PersonalityDevelopmentRecommendation {
  area: string;
  currentLevel: string;
  targetLevel: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  developmentActions: DevelopmentAction[];
  timeframe: string;
  successMetrics: string[];
  resources: PersonalityResource[];
  potentialObstacles: string[];
  supportNeeds: string[];
}

export interface DevelopmentAction {
  action: string;
  description: string;
  frequency: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedOutcome: string;
  progressIndicators: string[];
}

export interface PersonalityResource {
  type:
    | 'book'
    | 'course'
    | 'coach'
    | 'mentor'
    | 'assessment'
    | 'exercise'
    | 'community';
  name: string;
  provider: string;
  description: string;
  relevance: number; // 0-100
  cost: string;
  duration: string;
  url?: string;
}
