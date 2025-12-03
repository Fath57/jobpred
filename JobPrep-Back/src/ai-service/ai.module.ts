import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AIService } from './ai.service';
import { GeminiProvider } from './providers/gemini.provider';
import { OpenAIProvider } from './providers/openai.provider';

@Module({
  imports: [ConfigModule],
  providers: [AIService, GeminiProvider, OpenAIProvider],
  exports: [AIService],
})
export class AIModule {}
