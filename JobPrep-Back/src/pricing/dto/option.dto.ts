import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOptionDto {
  @ApiProperty({ description: 'Nom de l\'option' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description de l\'option' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Prix de l\'option' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Code unique de l\'option' })
  @IsString()
  code: string;

  @ApiPropertyOptional({ description: 'Statut actif de l\'option', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateOptionDto {
  @ApiPropertyOptional({ description: 'Nom de l\'option' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Description de l\'option' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Prix de l\'option' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiPropertyOptional({ description: 'Code unique de l\'option' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Statut actif de l\'option' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

