import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PackOptionDto {
  @ApiProperty({ description: 'ID de l\'option' })
  @IsString()
  optionId: string;

  @ApiProperty({ description: 'Quantité de l\'option dans le pack', default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreatePackDto {
  @ApiProperty({ description: 'Nom du pack' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description du pack' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Prix du pack' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Code unique du pack' })
  @IsString()
  code: string;

  @ApiPropertyOptional({ description: 'Statut actif du pack', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ 
    description: 'Options incluses dans le pack',
    type: [PackOptionDto]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackOptionDto)
  options?: PackOptionDto[];
}

export class UpdatePackDto {
  @ApiPropertyOptional({ description: 'Nom du pack' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Description du pack' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Prix du pack' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiPropertyOptional({ description: 'Code unique du pack' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Statut actif du pack' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ 
    description: 'Options incluses dans le pack',
    type: [PackOptionDto]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackOptionDto)
  options?: PackOptionDto[];
}

