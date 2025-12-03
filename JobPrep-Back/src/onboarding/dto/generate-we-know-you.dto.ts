import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class GenerateWeKnowYouDto {
  @ApiProperty({ 
    description: 'Full name', 
    example: 'John Doe' 
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({ 
    description: 'Desired position', 
    example: 'Chef de projet digital' 
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  desiredPosition!: string;

  @ApiProperty({ 
    description: 'Location', 
    example: 'Lyon, France',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @ApiProperty({ 
    description: 'LinkedIn profile URL', 
    example: 'https://linkedin.com/in/johndoe',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  linkedin?: string;

  @ApiProperty({ 
    description: 'Additional context for AI generation', 
    example: 'Spécialisé en agilité, bilingue français-anglais',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  additionalContext?: string;
}
