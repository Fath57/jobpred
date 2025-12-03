import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
  UseGuards,
  Request,
  Put
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';
import { GenerateWeKnowYouDto } from './dto/generate-we-know-you.dto';
import { DeepResearchResponseDto } from './dto/deep-research-response.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { OnboardingUpdateDto } from './dto/onboarding-update.dto';
import { Step1PersonalInfoDto } from './dto/step1-personal-info.dto';
import { Step2ProfessionalInfoDto } from './dto/step2-professional-info.dto';
import { Step4JobDescriptionDto } from './dto/step4-job-description.dto';

@ApiTags('Onboarding')
@Controller('onboarding')
@UseGuards(AuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  // Route générique (conservée pour compatibilité)
  @Put('update')
  @ApiOperation({ summary: 'Update onboarding information based on current step' })
  @ApiBody({ type: OnboardingUpdateDto })
  @ApiResponse({ status: 200, description: 'Onboarding information updated successfully' })
  async updateOnboarding(@Request() req, @Body() updateDto: OnboardingUpdateDto) {
    return this.onboardingService.updateOnboarding(req.user.id, updateDto);
  }

  // Routes spécifiques par étape avec DTOs typés
  @Put('step/1/personal-info')
  @ApiOperation({ summary: 'Step 1: Update personal information' })
  @ApiBody({ type: Step1PersonalInfoDto })
  @ApiResponse({ status: 200, description: 'Personal information updated successfully' })
  async updateStep1PersonalInfo(@Request() req, @Body() updateDto: Step1PersonalInfoDto) {
    return this.onboardingService.updatePersonalInfo(req.user.id, updateDto);
  }

  @Put('step/2/professional-info')
  @ApiOperation({ summary: 'Step 2: Update professional information' })
  @ApiBody({ type: Step2ProfessionalInfoDto })
  @ApiResponse({ status: 200, description: 'Professional information updated successfully' })
  async updateStep2ProfessionalInfo(@Request() req, @Body() updateDto: Step2ProfessionalInfoDto) {
    return this.onboardingService.updateProfessionalInfo(req.user.id, updateDto);
  }

  @Put('step/4/job-description')
  @ApiOperation({ summary: 'Step 4: Update job description' })
  @ApiBody({ type: Step4JobDescriptionDto })
  @ApiResponse({ status: 200, description: 'Job description updated successfully' })
  async updateStep4JobDescription(@Request() req, @Body() updateDto: Step4JobDescriptionDto) {
    return this.onboardingService.updateJobDescription(req.user.id, updateDto);
  }

  @Post('generate-profile')
  @ApiOperation({ summary: 'Generate "We know you" text using deep research AI' })
  @ApiBody({ type: GenerateWeKnowYouDto, description: 'Data for AI deep research generation' })
  @ApiResponse({ 
    status: 200, 
    description: 'Deep research and AI text generated successfully',
    type: DeepResearchResponseDto
  })
  async generateWeKnowYouText(@Request() req, @Body() generateDto: GenerateWeKnowYouDto) {
    return this.onboardingService.generateWeKnowYouText(req.user.id, generateDto);
  }

  @Post('upload-cv')
  @ApiOperation({ summary: 'Upload CV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }))
  async uploadCv(
    @Request() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Validation personnalisée du type de fichier
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Type de fichier non valide. Types acceptés: ${allowedMimeTypes.join(', ')}`
      );
    }

    return this.onboardingService.uploadCv(req.user.id, file);
  }

  @Get('progress')
  @ApiOperation({ summary: 'Get onboarding progress' })
  @ApiResponse({ status: 200, description: 'Onboarding progress retrieved' })
  async getProgress(@Request() req) {
    return this.onboardingService.getProgress(req.user.id);
  }

  @Get('content')
  @ApiOperation({ summary: 'Get onboarding content' })
  @ApiResponse({ status: 200, description: 'Onboarding content retrieved' })
  async getContent() {
    return this.onboardingService.getContent();
  }

  // ============================================================
  // ENDPOINTS: Postuler à une autre offre
  // ============================================================

  @Post('applications/new')
  @ApiOperation({ summary: 'Create a new application (job preference)' })
  @ApiBody({ type: Step2ProfessionalInfoDto })
  @ApiResponse({ status: 201, description: 'New application created successfully' })
  async createNewApplication(@Request() req, @Body() data: Step2ProfessionalInfoDto) {
    return this.onboardingService.createNewApplication(req.user.id, data);
  }

  @Post('applications/:jobPreferenceId/upload-cv')
  @ApiOperation({ summary: 'Upload CV for a specific application' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }))
  async uploadCvForApplication(
    @Request() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { jobPreferenceId } = req.params;

    // Validation du type de fichier
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Type de fichier non valide. Types acceptés: ${allowedMimeTypes.join(', ')}`
      );
    }

    return this.onboardingService.uploadCvForApplication(req.user.id, jobPreferenceId, file);
  }

  @Put('applications/:jobPreferenceId/job-description')
  @ApiOperation({ summary: 'Update job description for a specific application' })
  @ApiBody({ type: Step4JobDescriptionDto })
  @ApiResponse({ status: 200, description: 'Job description updated successfully' })
  async updateApplicationJobDescription(
    @Request() req,
    @Body() data: Step4JobDescriptionDto,
  ) {
    const { jobPreferenceId } = req.params;
    return this.onboardingService.updateApplicationJobDescription(req.user.id, jobPreferenceId, data);
  }

  @Get('applications')
  @ApiOperation({ summary: 'List all applications for the current user' })
  @ApiResponse({ status: 200, description: 'Applications list retrieved' })
  async listApplications(@Request() req) {
    return this.onboardingService.listApplications(req.user.id);
  }

  @Put('applications/:jobPreferenceId/activate')
  @ApiOperation({ summary: 'Set an application as active' })
  @ApiResponse({ status: 200, description: 'Application activated successfully' })
  async setActiveApplication(@Request() req) {
    const { jobPreferenceId } = req.params;
    return this.onboardingService.setActiveApplication(req.user.id, jobPreferenceId);
  }

  @Get('applications/:jobPreferenceId')
  @ApiOperation({ summary: 'Get details of a specific application' })
  @ApiResponse({ status: 200, description: 'Application details retrieved' })
  async getApplicationDetails(@Request() req) {
    const { jobPreferenceId } = req.params;
    return this.onboardingService.getApplicationDetails(req.user.id, jobPreferenceId);
  }
}