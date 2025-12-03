import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, MaxLength } from 'class-validator';
import { ExperienceLevel, WorkMode } from '@prisma/client';

export class Step3ProfessionalInfoDto {
  @ApiProperty({
    description: 'Desired position', 
    example: 'Chef de projet digital' 
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  desiredPosition!: string;

  @ApiProperty({ 
    description: 'Experience level', 
    enum: ExperienceLevel,
    example: ExperienceLevel.INTERMEDIATE
  })
  @IsEnum(ExperienceLevel)
  experience!: ExperienceLevel;

  @ApiProperty({ 
    description: 'Work mode preference', 
    enum: WorkMode,
    example: WorkMode.HYBRID 
  })
  @IsEnum(WorkMode)
  workMode!: WorkMode;
}
