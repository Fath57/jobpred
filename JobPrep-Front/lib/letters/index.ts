// Index file for letters domain
export { motivationLetterData } from './motivationLetterData';
export { followUpLetterData } from './followUpLetterData';

// Re-export types for easier imports
export type {
  JobOffer,
  Template as MotivationTemplate,
  Tone,
  PersonalInfo,
  CustomizationOptions as MotivationCustomizationOptions,
  GeneratedLetter as MotivationGeneratedLetter,
  GenerationStep as MotivationGenerationStep,
} from './motivationLetterData';

export type {
  Application,
  TimingOption,
  Template as FollowUpTemplate,
  CustomizationOptions as FollowUpCustomizationOptions,
  GeneratedLetter as FollowUpGeneratedLetter,
  GenerationStep as FollowUpGenerationStep,
} from './followUpLetterData';
