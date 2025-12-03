import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class Step1PersonalInfoRequestDto {
  @ApiProperty({ description: 'User ID', example: 'e6a2b615-fa01-41f3-a2b1-6b118ec0aa11' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty({ description: 'Full name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({ description: 'Email address', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ description: 'Phone number', example: '+33123456789', required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone!: string;

  @ApiProperty({ description: 'LinkedIn profile URL', example: 'https://linkedin.com/in/johndoe', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  linkedin?: string;

  @ApiProperty({ description: 'Location', example: 'Paris, France', required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location!: string;
}
