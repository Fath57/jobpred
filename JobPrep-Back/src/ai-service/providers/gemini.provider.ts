import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIProvider, AIGenerationOptions, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class GeminiProvider implements IAIProvider {
  private readonly logger = new Logger(GeminiProvider.name);
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  getName(): string {
    return 'Gemini';
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey && !!this.genAI;
  }

  async generate(prompt: string, options?: AIGenerationOptions): Promise<AIResponse> {
    if (!this.genAI) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: options?.model || 'gemini-2.0-flash',
      });

      const generationConfig = {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 1000,
      };

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig,
      });

      const response = result.response;
      const text = response.text();

      return {
        content: text,
        usage: {
          promptTokens: 0, // Gemini ne fournit pas toujours ces métriques
          completionTokens: 0,
          totalTokens: 0,
        },
        model: options?.model || 'gemini-1.5-flash',
      };
    } catch (error: any) {
      this.logger.error(`Gemini generation error: ${error?.message || 'Unknown error'}`, error?.stack);
      throw error;
    }
  }

  async generateJSON<T>(prompt: string, schema?: any, options?: AIGenerationOptions): Promise<T> {
    if (!this.genAI) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: options?.model || 'gemini-2.0-flash',
      });

      const generationConfig = {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 1000,
        responseMimeType: 'application/json',
        responseSchema: schema,
      };

      const enhancedPrompt = schema
        ? `${prompt}\n\nRespond with valid JSON only.`
        : `${prompt}\n\nRespond with valid JSON only.`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
        generationConfig,
      });

      const response = result.response;
      const text = response.text();

      return JSON.parse(text);
    } catch (error: any) {
      this.logger.error(`Gemini JSON generation error: ${error?.message || 'Unknown error'}`, error?.stack);
      throw error;
    }
  }
}
