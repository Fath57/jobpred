import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDate, IsEnum, IsUUID, IsObject, ValidateNested, IsArray } from 'class-validator';

import { OnboardingStep, OnboardingStatus } from '@prisma/client';

export class OnboardingSession {
  @ApiProperty({ description: 'Session ID' })
  id!: string;

  @ApiProperty({ description: 'User ID' })
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId!: string;

  @ApiProperty({ description: 'Current step' })
  @IsNotEmpty({ message: 'Current step is required' })
  @IsEnum(OnboardingStep, { message: 'Current step must be a valid onboarding step' })
  currentStep!: OnboardingStep;

  @ApiProperty({ description: 'Session status' })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(OnboardingStatus, { message: 'Status must be a valid onboarding status' })
  status!: OnboardingStatus;

  @ApiProperty({ description: 'Completed steps' })
  @IsArray({ message: 'Completed steps must be an array' })
  @IsEnum(OnboardingStep, { each: true, message: 'Each completed step must be a valid onboarding step' })
  completedSteps!: OnboardingStep[];

  @ApiProperty({ description: 'Session data' })
  @IsObject({ message: 'Session data must be an object' })
  data!: Record<string, any>;

  @ApiProperty({ description: 'Session creation date' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt!: Date;

  @ApiProperty({ description: 'Completion date', required: false })
  @IsOptional()
  @IsDate({ message: 'Completion date must be a valid date' })
  completedAt?: Date;

}
