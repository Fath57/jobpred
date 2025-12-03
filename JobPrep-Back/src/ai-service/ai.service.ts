import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiProvider } from './providers/gemini.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { IAIProvider, AIGenerationOptions, AIResponse } from './interfaces/ai-provider.interface';

export enum AIProviderType {
  GEMINI = 'gemini',
  OPENAI = 'openai',
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private providers: Map<AIProviderType, IAIProvider>;
  private defaultProvider: AIProviderType;

  constructor(
    private configService: ConfigService,
    private geminiProvider: GeminiProvider,
    private openaiProvider: OpenAIProvider,
  ) {
    this.providers = new Map();
    this.providers.set(AIProviderType.GEMINI, this.geminiProvider);
    this.providers.set(AIProviderType.OPENAI, this.openaiProvider);

    // Définir le provider par défaut depuis les variables d'environnement
    const defaultProviderConfig = this.configService.get<string>('AI_DEFAULT_PROVIDER') || 'gemini';
    this.defaultProvider = defaultProviderConfig.toLowerCase() === 'openai'
      ? AIProviderType.OPENAI
      : AIProviderType.GEMINI;
  }

  /**
   * Récupère un provider disponible (par défaut ou fallback)
   */
  private async getAvailableProvider(preferredProvider?: AIProviderType): Promise<IAIProvider> {
    const providerToUse = preferredProvider || this.defaultProvider;
    const provider = this.providers.get(providerToUse);

    if (!provider) {
      throw new Error(`Provider ${providerToUse} not found`);
    }

    const isAvailable = await provider.isAvailable();

    if (!isAvailable) {
      this.logger.warn(`Provider ${providerToUse} not available, trying fallback`);

      // Essayer le fallback
      for (const [type, fallbackProvider] of this.providers.entries()) {
        if (type !== providerToUse && await fallbackProvider.isAvailable()) {
          this.logger.log(`Using fallback provider: ${type}`);
          return fallbackProvider;
        }
      }

      throw new Error('No AI provider available. Please configure at least one API key.');
    }

    return provider;
  }

  /**
   * Génère du texte avec le provider spécifié ou le provider par défaut
   */
  async generate(
    prompt: string,
    options?: AIGenerationOptions,
    provider?: AIProviderType
  ): Promise<AIResponse> {
    const aiProvider = await this.getAvailableProvider(provider);
    this.logger.log(`Generating text with ${aiProvider.getName()}`);
    return aiProvider.generate(prompt, options);
  }

  /**
   * Génère une réponse structurée en JSON
   */
  async generateJSON<T>(
    prompt: string,
    schema?: any,
    options?: AIGenerationOptions,
    provider?: AIProviderType
  ): Promise<T> {
    const aiProvider = await this.getAvailableProvider(provider);
    this.logger.log(`Generating JSON with ${aiProvider.getName()}`);
    return aiProvider.generateJSON<T>(prompt, schema, options);
  }

  /**
   * Génère un nom pour une candidature (CandidateJobPreferences)
   */
  async generateJobPreferenceName(data: {
    desiredPosition: string;
    jobDescription?: string;
    experience?: string;
    workMode?: string;
  }): Promise<string> {
    const prompt = `
Génère un nom court et descriptif (maximum 50 caractères) pour une candidature basée sur les informations suivantes :

- Poste souhaité: ${data.desiredPosition}
${data.jobDescription ? `- Description du poste: ${data.jobDescription.substring(0, 200)}...` : ''}
${data.experience ? `- Niveau d'expérience: ${data.experience}` : ''}
${data.workMode ? `- Mode de travail: ${data.workMode}` : ''}

Le nom doit être:
- Court et concis (max 50 caractères)
- Descriptif et facile à identifier
- En français
- Sans guillemets ni caractères spéciaux

Exemples:
- "Développeur Full Stack - Startup FinTech"
- "Chef de Projet Digital - Remote"
- "Data Scientist Senior - Paris"

Réponds uniquement avec le nom, sans explication.
    `.trim();

    try {
      const response = await this.generate(prompt, {
        temperature: 0.7,
        maxTokens: 100,
      });

      // Nettoyer la réponse
      let name = response.content.trim();
      name = name.replace(/^["']|["']$/g, ''); // Enlever les guillemets
      name = name.substring(0, 50); // Limiter à 50 caractères

      return name || `${data.desiredPosition} - ${new Date().toLocaleDateString('fr-FR')}`;
    } catch (error: any) {
      this.logger.error(`Error generating job preference name: ${error?.message || 'Unknown error'}`);
      // Fallback: générer un nom simple
      return `${data.desiredPosition} - ${new Date().toLocaleDateString('fr-FR')}`;
    }
  }

  /**
   * Vérifie quels providers sont disponibles
   */
  async getAvailableProviders(): Promise<string[]> {
    const available: string[] = [];

    for (const [type, provider] of this.providers.entries()) {
      if (await provider.isAvailable()) {
        available.push(type);
      }
    }

    return available;
  }
}
