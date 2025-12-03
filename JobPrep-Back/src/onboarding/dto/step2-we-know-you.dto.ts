import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class Step2WeKnowYouDto {
 @ApiProperty({
    description: 'AI generated profile description', 
    example: 'Tu es un chef de projet digital basé à Lyon, tu maîtrises l\'agilité et tu parles couramment l\'anglais.' 
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  aiProfileDescription!: string;

  @ApiProperty({ 
    description: 'User customized profile description', 
    example: 'Je suis un chef de projet digital basé à Lyon, spécialisé en agilité et bilingue français-anglais.',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  customizedProfileDescription?: string;
}
