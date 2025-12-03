import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WorkMode, ExperienceLevel, FormalityLevel } from '@prisma/client';

export class OnboardingUpdateDto {
  @ApiProperty({ description: 'Full name of the user', required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: 'Email address', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'LinkedIn profile URL', required: false })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiProperty({ description: 'Location/City', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'AI generated profile description', required: false })
  @IsString()
  @IsOptional()
  aiProfileDescription?: string;

  @ApiProperty({ description: 'Customized profile description', required: false })
  @IsString()
  @IsOptional()
  customizedProfileDescription?: string;

  @ApiProperty({ description: 'Desired position', required: false })
  @IsString()
  @IsOptional()
  desiredPosition?: string;

  @ApiProperty({ enum: ExperienceLevel, required: false })
  @IsEnum(ExperienceLevel)
  @IsOptional()
  experience?: ExperienceLevel;

  @ApiProperty({ enum: WorkMode, required: false })
  @IsEnum(WorkMode)
  @IsOptional()
  workMode?: WorkMode;

  @ApiProperty({ description: 'Job description', required: false })
  @IsString()
  @IsOptional()
  jobDescription?: string;

  @ApiProperty({ enum: FormalityLevel, required: false })
  @IsEnum(FormalityLevel)
  @IsOptional()
  formalityLevel?: FormalityLevel;

  @ApiProperty({ description: 'Current onboarding step', required: false })
  @IsOptional()
  currentStep?: number;
}