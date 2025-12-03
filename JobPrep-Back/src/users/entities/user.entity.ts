
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsDate, IsString, Length, Matches, IsEnum } from 'class-validator';

export class User {
  @ApiProperty({ description: 'User ID' })
  id!: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  password!: string;

  @ApiProperty({ description: 'User full name' })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  @Length(2, 100, { message: 'Full name must be between 2 and 100 characters' })
  fullName!: string;

  @ApiProperty({ description: 'User phone number', required: false })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: 'Phone number must be a valid phone number'
  })
  phone?: string;

  @ApiProperty({ description: 'LinkedIn profile', required: false })
  @IsOptional()
  @IsString({ message: 'LinkedIn profile must be a string' })
  @Matches(/^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/, {
    message: 'LinkedIn profile must be a valid LinkedIn URL'
  })
  linkedin?: string;

  @ApiProperty({ description: 'User location', required: false })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location?: string;

  @ApiProperty({ description: 'Account active status' })
  @IsBoolean({ message: 'Account active status must be a boolean' })
  isActive!: boolean;

  @ApiProperty({ description: 'Last login date', required: false })
  @IsOptional()
  @IsDate({ message: 'Last login date must be a valid date' })
  lastLoginAt?: Date;

  @ApiProperty({ description: 'Account creation date' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt!: Date;

}
