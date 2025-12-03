import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { IAIProvider, AIGenerationOptions, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider implements IAIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  private openai: OpenAI | null = null;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
    if (this.apiKey) {
      this.openai = new OpenAI({
        apiKey: this.apiKey,
      });
    }
  }

  getName(): string {
    return 'OpenAI';
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey && !!this.openai;
  }

  async generate(prompt: string, options?: AIGenerationOptions): Promise<AIResponse> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: options?.model || 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 1000,
      });

      const message = completion.choices[0]?.message;

      if (!message?.content) {
        throw new Error('No content in OpenAI response');
      }

      return {
        content: message.content,
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
        model: completion.model,
      };
    } catch (error: any) {
      this.logger.error(`OpenAI generation error: ${error?.message || 'Unknown error'}`, error?.stack);
      throw error;
    }
  }

  async generateJSON<T>(prompt: string, schema?: any, options?: AIGenerationOptions): Promise<T> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: options?.model || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that responds only with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 1000,
        response_format: { type: 'json_object' },
      });

      const message = completion.choices[0]?.message;

      if (!message?.content) {
        throw new Error('No content in OpenAI response');
      }

      return JSON.parse(message.content);
    } catch (error: any) {
      this.logger.error(`OpenAI JSON generation error: ${error?.message || 'Unknown error'}`, error?.stack);
      throw error;
    }
  }
}
