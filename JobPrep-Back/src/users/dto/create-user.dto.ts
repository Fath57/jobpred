import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsString, Length, Matches, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User email' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  password!: string;

  @ApiProperty({ description: 'User first name' })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  firstName!: string;

  @ApiProperty({ description: 'User last name' })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  lastName!: string;

  @ApiProperty({ description: 'User phone number', required: false })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: 'Phone number must be a valid phone number'
  })
  phone?: string;

  @ApiProperty({ description: 'User location', required: false })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location?: string;

  @ApiProperty({ description: 'Account active status', required: false, default: true })
  @IsOptional()
  @IsBoolean({ message: 'Account active status must be a boolean' })
  isActive?: boolean;

  @ApiProperty({ description: 'Role ID to assign', required: false, example: 'uuid-of-role' })
  @IsOptional()
  @IsUUID('4', { message: 'Role ID must be a valid UUID' })
  roleId?: string;
}
