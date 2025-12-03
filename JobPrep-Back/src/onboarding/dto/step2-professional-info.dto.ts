import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WorkMode, ExperienceLevel } from '@prisma/client';

export class Step2ProfessionalInfoDto {
  @ApiProperty({ description: 'Desired position', required: true })
  @IsString()
  @IsNotEmpty()
  desiredPosition: string;

  @ApiProperty({ enum: ExperienceLevel, required: true })
  @IsEnum(ExperienceLevel)
  @IsNotEmpty()
  experience: ExperienceLevel;

  @ApiProperty({ enum: WorkMode, required: true })
  @IsEnum(WorkMode)
  @IsNotEmpty()
  workMode: WorkMode;
}
