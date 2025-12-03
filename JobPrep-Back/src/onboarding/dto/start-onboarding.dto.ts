import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ExperienceLevel, WorkMode } from '@prisma/client';

export class StartOnboardingDto {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'User first name' })
  @IsString()
  firstName!: string;

  @ApiProperty({ description: 'User last name' })
  @IsString()
  lastName!: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  password!: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'LinkedIn profile', required: false })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({ description: 'Location', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Experience level', required: false, enum: ExperienceLevel })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experience?: ExperienceLevel;

  @ApiProperty({ description: 'Work mode preference', required: false, enum: WorkMode })
  @IsOptional()
  @IsEnum(WorkMode)
  workMode?: WorkMode;
}
