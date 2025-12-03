import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, MaxLength } from 'class-validator';
import { FormalityLevel } from '@prisma/client';

export class Step5JobDescriptionRequestDto {
  @ApiProperty({ 
    description: 'Job description', 
    example: 'Recherche un poste de chef de projet digital dans une entreprise innovante...' 
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  jobDescription!: string;

  @ApiProperty({ 
    description: 'Formality level', 
    enum: FormalityLevel,
    example: FormalityLevel.PROFESSIONAL 
  })
  @IsEnum(FormalityLevel)
  formalityLevel!: FormalityLevel;
}
