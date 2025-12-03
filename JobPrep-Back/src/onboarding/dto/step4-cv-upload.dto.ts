import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class Step4CvUploadDto {
  @ApiProperty({
    description: 'CV file path', 
    example: '/uploads/cv/john-doe-cv.pdf',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  cvFilePath?: string;

  @ApiProperty({ 
    description: 'CV file name', 
    example: 'john-doe-cv.pdf',
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  cvFileName?: string;

  @ApiProperty({ 
    description: 'CV file size in bytes', 
    example: 2048576,
    required: false 
  })
  @IsOptional()
  cvFileSize?: number;
}
