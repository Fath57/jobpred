import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { PerplexityService } from './services/perplexity.service';
import { FileUploadService } from './services/file-upload.service';
import { AuthModule } from '../auth/auth.module';
import { AIModule } from '../ai-service/ai.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/cv',
    }),
    AuthModule, // Import du AuthModule pour avoir accès à AuthService
    AIModule,   // Import du AIModule pour le service IA
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, PerplexityService, FileUploadService],
  exports: [OnboardingService, PerplexityService, FileUploadService],
})
export class OnboardingModule {}