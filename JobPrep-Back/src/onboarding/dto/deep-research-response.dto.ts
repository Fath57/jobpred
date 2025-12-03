import { ApiProperty } from '@nestjs/swagger';

export class DeepResearchResponseDto {
  @ApiProperty({ 
    description: 'Success message',
    example: 'Deep research and AI profile description generated successfully'
  })
  message!: string;

  @ApiProperty({ 
    description: 'AI generated profile description based on research',
    example: 'Tu es Marie Dubois, basée à Lyon, dans le domaine de Développeuse Full Stack. avec 5 ans d\'expérience professionnelle. Tu maîtrises React, Node.js, TypeScript. Tu as une expérience solide dans la réalisation de projets complexes. Tu recherches de nouvelles opportunités professionnelles qui correspondent à ton expertise.'
  })
  aiProfileDescription!: string;

  @ApiProperty({ 
    description: 'Deep research content about the candidate',
    example: 'Marie Dubois est une développeuse Full Stack expérimentée basée à Lyon. Elle a 5 ans d\'expérience dans le développement web avec une expertise particulière en React, Node.js et TypeScript. Elle a travaillé sur plusieurs projets complexes pour des entreprises technologiques...'
  })
  research!: string;

  @ApiProperty({ 
    description: 'Sources used for the research',
    example: ['https://linkedin.com/in/marie-dubois', 'https://github.com/marie-dubois', 'https://company.com/team/marie-dubois']
  })
  sources!: string[];

  @ApiProperty({ 
    description: 'Confidence level of the research (0-100)',
    example: 85,
    minimum: 0,
    maximum: 100
  })
  confidence!: number;

  @ApiProperty({ 
    description: 'Current onboarding step',
    example: 'WE_KNOW_YOU'
  })
  currentStep!: string;
}
