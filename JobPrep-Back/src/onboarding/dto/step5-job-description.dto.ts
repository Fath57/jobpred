import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, MaxLength, IsUUID } from 'class-validator';
import { FormalityLevel } from '@prisma/client';

export class Step5JobDescriptionDto {
  @ApiProperty({
    description: 'User ID', 
    example: 'e6a2b615-fa01-41f3-a2b1-6b118ec0aa11' 
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

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
