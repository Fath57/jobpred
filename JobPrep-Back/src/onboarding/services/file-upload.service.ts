import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  private readonly uploadPath: string;
  private readonly maxFileSize: number;
  private readonly allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  constructor(private configService: ConfigService) {
    this.uploadPath = this.configService.get('UPLOAD_PATH', './uploads/cv');
    this.maxFileSize = this.configService.get('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
    this.ensureUploadDirectory();
  }

  private ensureUploadDirectory(): void {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadCv(file: Express.Multer.File, userId: string): Promise<{
    filePath: string;
    fileName: string;
    fileSize: number;
  }> {
    this.logger.log(`Starting CV upload for user ${userId}`);
    this.logger.log(`File details: originalname=${file.originalname}, mimetype=${file.mimetype}, size=${file.size}`);
    this.logger.log(`File buffer exists: ${!!file.buffer}, buffer type: ${typeof file.buffer}`);
    
    // Check if file buffer exists
    if (!file.buffer) {
      this.logger.error(`File buffer is undefined for user ${userId}`);
      throw new BadRequestException('File buffer is undefined. Please ensure the file is properly uploaded.');
    }
    
    // Validate file
    this.validateFile(file);

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `${userId}-${uuidv4()}${fileExtension}`;
    const filePath = path.join(this.uploadPath, fileName);

    this.logger.log(`Generated file path: ${filePath}`);

    try {
      // Save file
      fs.writeFileSync(filePath, file.buffer);
      
      this.logger.log(`CV uploaded successfully for user ${userId}: ${fileName}`);
      
      return {
        filePath,
        fileName,
        fileSize: file.size
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error uploading CV for user ${userId}:`, error);
        this.logger.error(`Error details: ${error.message}`);
        throw new BadRequestException(`Failed to upload CV file: ${error.message}`);
      } else {
        this.logger.error(`Unexpected error uploading CV for user ${userId}:`, error);
        throw new BadRequestException('Failed to upload CV file: Unknown error');
      }
    }
  }

  private validateFile(file: Express.Multer.File): void {
    // Check file size
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(`File size exceeds maximum allowed size of ${this.maxFileSize / (1024 * 1024)}MB`);
    }

    // Check MIME type
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only PDF, DOC, and DOCX files are allowed');
    }

    // Check file extension
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('Invalid file extension. Only .pdf, .doc, and .docx files are allowed');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        this.logger.log(`File deleted: ${filePath}`);
      }
    } catch (error) {
      this.logger.error(`Error deleting file ${filePath}:`, error);
    }
  }

  getFileUrl(filePath: string): string {
    const relativePath = path.relative(process.cwd(), filePath);
    return `/uploads/cv/${path.basename(relativePath)}`;
  }

  async getFileStats(filePath: string): Promise<{
    exists: boolean;
    size: number;
    created: Date;
  }> {
    try {
      const stats = fs.statSync(filePath);
      return {
        exists: true,
        size: stats.size,
        created: stats.birthtime
      };
    } catch (error) {
      return {
        exists: false,
        size: 0,
        created: new Date()
      };
    }
  }
}
