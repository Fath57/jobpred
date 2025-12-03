import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class OnboardingStepDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId!: string;

  @ApiProperty({ description: 'Step number' })
  @IsNumber()
  step!: number;

  @ApiProperty({ description: 'Step data' })
  @IsObject()
  data!: Record<string, any>;

  @ApiProperty({ description: 'Additional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
