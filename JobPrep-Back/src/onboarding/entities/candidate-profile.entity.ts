import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsDate, IsEnum, IsString, IsUUID, IsNumber, Length, Matches, Min } from 'class-validator';
import { ExperienceLevel, WorkMode, FormalityLevel  } from '@prisma/client';

export class CandidateProfile {
  @ApiProperty({ description: 'Profile ID' })
  id!: string;

  @ApiProperty({ description: 'User ID' })
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId!: string;

  // Personal Information
  @ApiProperty({ description: 'Full name' })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  @Length(2, 100, { message: 'Full name must be between 2 and 100 characters' })
  fullName!: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: 'Phone number must be a valid phone number'
  })
  phone?: string;

  @ApiProperty({ description: 'LinkedIn profile', required: false })
  @IsOptional()
  @IsString({ message: 'LinkedIn profile must be a string' })
  @Matches(/^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/, {
    message: 'LinkedIn profile must be a valid LinkedIn URL'
  })
  linkedin?: string;

  @ApiProperty({ description: 'Location', required: false })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location?: string;

  // "We know you" section
  @ApiProperty({ description: 'AI generated profile description' })
  @IsString({ message: 'AI profile description must be a string' })
  @IsNotEmpty({ message: 'AI profile description is required' })
  aiProfileDescription!: string;

  @ApiProperty({ description: 'User customized profile description', required: false })
  @IsOptional()
  @IsString({ message: 'Customized profile description must be a string' })
  customizedProfileDescription?: string;

  // Professional Information
  @ApiProperty({ description: 'Desired position' })
  @IsString({ message: 'Desired position must be a string' })
  @IsNotEmpty({ message: 'Desired position is required' })
  desiredPosition!: string;

  @ApiProperty({ description: 'Experience level' })
  @IsNotEmpty({ message: 'Experience level is required' })
  @IsEnum(ExperienceLevel, { message: 'Experience level must be a valid experience level' })
  experience!: ExperienceLevel;

  @ApiProperty({ description: 'Work mode preference' })
  @IsNotEmpty({ message: 'Work mode is required' })
  @IsEnum(WorkMode, { message: 'Work mode must be a valid work mode' })
  workMode!: WorkMode;

  // CV Information
  @ApiProperty({ description: 'CV file path', required: false })
  @IsOptional()
  @IsString({ message: 'CV file path must be a string' })
  cvFilePath?: string;

  @ApiProperty({ description: 'CV file name', required: false })
  @IsOptional()
  @IsString({ message: 'CV file name must be a string' })
  cvFileName?: string;

  @ApiProperty({ description: 'CV file size', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'CV file size must be a number' })
  @Min(0, { message: 'CV file size must be a positive number' })
  cvFileSize?: number;

  // Job Description
  @ApiProperty({ description: 'Job description' })
  @IsString({ message: 'Job description must be a string' })
  @IsNotEmpty({ message: 'Job description is required' })
  jobDescription!: string;

  @ApiProperty({ description: 'Formality level' })
  @IsNotEmpty({ message: 'Formality level is required' })
  @IsEnum(FormalityLevel, { message: 'Formality level must be a valid formality level' })
  formalityLevel!: FormalityLevel;

  // Metadata
  @ApiProperty({ description: 'Profile creation date' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt!: Date;

  @ApiProperty({ description: 'Profile completion date', required: false })
  @IsOptional()
  @IsDate({ message: 'Completion date must be a valid date' })
  completedAt?: Date;
}
