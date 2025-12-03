import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FormalityLevel } from '@prisma/client';

export class Step4JobDescriptionDto {
  @ApiProperty({ description: 'Job description', required: true })
  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @ApiProperty({ enum: FormalityLevel, required: false })
  @IsEnum(FormalityLevel)
  @IsOptional()
  formalityLevel?: FormalityLevel;
}
