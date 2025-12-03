import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BigIntSerializerInterceptor } from './shared/interceptors/bigint-serializer.interceptor';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ResumeModule } from './resume/resume.module';
import { LettersModule } from './letters/letters.module';
import { TestsModule } from './tests/tests.module';
import { SpeechModule } from './speech/speech.module';
import { AdminModule } from './admin/admin.module';
import { PricingModule } from './pricing/pricing.module';
import { PrismaModule } from './shared/prisma';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    PrismaModule,
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),

    // Feature modules
    AuthModule,
    UsersModule,
    OnboardingModule,
    ResumeModule,
    LettersModule,
    TestsModule,
    SpeechModule,
    AdminModule,
    RolesModule,
    PermissionsModule,
    ModulesModule,
    PricingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntSerializerInterceptor,
    },
  ],
})
export class AppModule {}
