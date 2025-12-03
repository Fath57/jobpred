# Service IA Modulaire - Documentation

## Vue d'ensemble

Service IA réutilisable et modulaire qui supporte **Gemini** et **OpenAI (GPT)** avec fallback automatique.

---

## Architecture

```
src/ai-service/
├── interfaces/
│   └── ai-provider.interface.ts    # Interface IAIProvider
├── providers/
│   ├── gemini.provider.ts          # Implémentation Google Gemini
│   └── openai.provider.ts          # Implémentation OpenAI GPT
├── ai.service.ts                   # Service principal
├── ai.module.ts                    # Module NestJS
└── README.md                       # Cette documentation
```

---

## Configuration

### Variables d'environnement

```env
# Provider par défaut (gemini ou openai)
AI_DEFAULT_PROVIDER=gemini

# Clés API
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: Configurez au moins une clé API. Le service utilisera automatiquement le fallback si le provider par défaut n'est pas disponible.

---

## Utilisation

### Importer le module

```typescript
import { AIModule } from '../ai-service/ai.module';

@Module({
  imports: [AIModule],
  // ...
})
export class YourModule {}
```

### Injecter le service

```typescript
import { AIService } from '../ai-service/ai.service';

@Injectable()
export class YourService {
  constructor(private aiService: AIService) {}
}
```

---

## Méthodes disponibles

### 1. `generate()` - Génération de texte simple

Génère du texte à partir d'un prompt.

```typescript
const response = await this.aiService.generate(
  'Écris une brève introduction pour un développeur Full Stack',
  {
    temperature: 0.7,    // Optionnel, défaut: 0.7
    maxTokens: 500,      // Optionnel, défaut: 1000
    model: 'gemini-1.5-flash'  // Optionnel
  }
);

console.log(response.content);  // Le texte généré
console.log(response.usage);    // Statistiques d'utilisation
console.log(response.model);    // Modèle utilisé
```

**Options**:
- `temperature` (0-1): Contrôle la créativité. 0 = déterministe, 1 = créatif
- `maxTokens`: Nombre maximum de tokens dans la réponse
- `model`: Modèle spécifique à utiliser

### 2. `generateJSON()` - Génération structurée JSON

Génère une réponse au format JSON.

```typescript
interface JobPreferenceName {
  name: string;
  confidence: number;
}

const result = await this.aiService.generateJSON<JobPreferenceName>(
  'Génère un nom pour une candidature de Développeur Full Stack Senior en remote',
  {
    type: 'object',
    properties: {
      name: { type: 'string' },
      confidence: { type: 'number' }
    }
  },
  {
    temperature: 0.5,
    maxTokens: 100
  }
);

console.log(result.name);        // "Développeur Full Stack Senior - Remote"
console.log(result.confidence);  // 0.95
```

### 3. `generateJobPreferenceName()` - Génération de nom de candidature

Méthode spécialisée pour générer un nom descriptif pour une candidature.

```typescript
const name = await this.aiService.generateJobPreferenceName({
  desiredPosition: 'Développeur Full Stack',
  jobDescription: 'Startup FinTech recherche...',  // Optionnel
  experience: 'SENIOR',                            // Optionnel
  workMode: 'REMOTE'                               // Optionnel
});

console.log(name);  // "Développeur Full Stack Senior - Startup FinTech"
```

**Caractéristiques**:
- Génère un nom court et descriptif (max 50 caractères)
- En français
- Inclut le poste, l'expérience et le mode de travail
- Fallback automatique en cas d'erreur

### 4. `getAvailableProviders()` - Vérifier les providers disponibles

```typescript
const available = await this.aiService.getAvailableProviders();
console.log(available);  // ['gemini', 'openai'] ou ['gemini'] ou ['openai']
```

---

## Providers

### Gemini Provider

**Modèles supportés**:
- `gemini-1.5-flash` (par défaut) - Rapide et économique
- `gemini-1.5-pro` - Plus puissant
- `gemini-2.0-flash-exp` - Expérimental

**Configuration**:
```env
GEMINI_API_KEY=your_key
```

**Obtenir une clé**: https://makersuite.google.com/app/apikey

### OpenAI Provider

**Modèles supportés**:
- `gpt-4o-mini` (par défaut) - Rapide et économique
- `gpt-4o` - Plus puissant
- `gpt-4-turbo`

**Configuration**:
```env
OPENAI_API_KEY=your_key
```

**Obtenir une clé**: https://platform.openai.com/api-keys

---

## Fallback automatique

Le service gère automatiquement le fallback entre providers :

1. Essaie d'utiliser le provider par défaut (configuré dans `.env`)
2. Si indisponible (pas de clé API), essaie le provider alternatif
3. Si aucun provider n'est disponible, lève une erreur

```typescript
// Exemple de logs
[AIService] Gemini provider not available, trying fallback
[AIService] Using fallback provider: openai
[AIService] Generating text with OpenAI
```

---

## Spécifier un provider

Vous pouvez forcer l'utilisation d'un provider spécifique :

```typescript
import { AIProviderType } from '../ai-service/ai.service';

// Forcer Gemini
const response = await this.aiService.generate(
  'Your prompt',
  {},
  AIProviderType.GEMINI
);

// Forcer OpenAI
const response = await this.aiService.generate(
  'Your prompt',
  {},
  AIProviderType.OPENAI
);
```

---

## Gestion des erreurs

```typescript
try {
  const response = await this.aiService.generate('Your prompt');
  console.log(response.content);
} catch (error) {
  if (error.message.includes('No AI provider available')) {
    // Aucune clé API configurée
    console.error('Configurez au moins GEMINI_API_KEY ou OPENAI_API_KEY');
  } else if (error.message.includes('API key not configured')) {
    // Provider spécifique pas configuré
    console.error('Provider non configuré');
  } else {
    // Autre erreur (rate limit, erreur réseau, etc.)
    console.error('Erreur IA:', error.message);
  }
}
```

---

## Exemple complet

```typescript
import { Injectable } from '@nestjs/common';
import { AIService, AIProviderType } from '../ai-service/ai.service';

@Injectable()
export class MyService {
  constructor(private aiService: AIService) {}

  async generateProductDescription(product: Product) {
    // Vérifier les providers disponibles
    const available = await this.aiService.getAvailableProviders();
    console.log('Providers disponibles:', available);

    // Génération de texte simple
    const description = await this.aiService.generate(
      `Écris une description marketing pour: ${product.name}`,
      {
        temperature: 0.8,
        maxTokens: 200
      }
    );

    // Génération JSON structuré
    interface Analysis {
      tone: string;
      targetAudience: string[];
      keywords: string[];
    }

    const analysis = await this.aiService.generateJSON<Analysis>(
      `Analyse cette description: ${description.content}`,
      {
        type: 'object',
        properties: {
          tone: { type: 'string' },
          targetAudience: { type: 'array', items: { type: 'string' } },
          keywords: { type: 'array', items: { type: 'string' } }
        }
      }
    );

    return {
      description: description.content,
      analysis,
      model: description.model,
      usage: description.usage
    };
  }
}
```

---

## Ajouter un nouveau provider

Pour ajouter un nouveau provider (ex: Claude, Mistral) :

### 1. Créer le provider

```typescript
// src/ai-service/providers/claude.provider.ts
import { Injectable } from '@nestjs/common';
import { IAIProvider, AIGenerationOptions, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class ClaudeProvider implements IAIProvider {
  constructor(private configService: ConfigService) {}

  getName(): string {
    return 'Claude';
  }

  async isAvailable(): Promise<boolean> {
    // Vérifier si la clé API est configurée
    return !!this.configService.get<string>('CLAUDE_API_KEY');
  }

  async generate(prompt: string, options?: AIGenerationOptions): Promise<AIResponse> {
    // Implémenter l'appel à l'API Claude
  }

  async generateJSON<T>(prompt: string, schema?: any, options?: AIGenerationOptions): Promise<T> {
    // Implémenter la génération JSON
  }
}
```

### 2. Enregistrer dans le module

```typescript
// src/ai-service/ai.module.ts
import { ClaudeProvider } from './providers/claude.provider';

@Module({
  providers: [AIService, GeminiProvider, OpenAIProvider, ClaudeProvider],
  exports: [AIService],
})
export class AIModule {}
```

### 3. Ajouter dans le service

```typescript
// src/ai-service/ai.service.ts
export enum AIProviderType {
  GEMINI = 'gemini',
  OPENAI = 'openai',
  CLAUDE = 'claude',  // Nouveau
}

constructor(
  private geminiProvider: GeminiProvider,
  private openaiProvider: OpenAIProvider,
  private claudeProvider: ClaudeProvider,  // Nouveau
) {
  this.providers.set(AIProviderType.CLAUDE, this.claudeProvider);
}
```

---

## Performances

### Latence typique
- **Gemini Flash**: ~500-1000ms
- **GPT-4o-mini**: ~800-1500ms
- **GPT-4o**: ~1500-3000ms

### Coût approximatif (par 1M tokens)
- **Gemini Flash**: Gratuit (quota) / $0.15 (payant)
- **GPT-4o-mini**: $0.15 input / $0.60 output
- **GPT-4o**: $2.50 input / $10.00 output

**Recommandation**: Utilisez Gemini Flash ou GPT-4o-mini pour la production.

---

## Tests

```typescript
describe('AIService', () => {
  it('should generate text', async () => {
    const response = await aiService.generate('Hello');
    expect(response.content).toBeDefined();
  });

  it('should fallback to alternative provider', async () => {
    // Désactiver le provider par défaut
    process.env.GEMINI_API_KEY = '';
    const response = await aiService.generate('Hello');
    expect(response.model).toContain('gpt');
  });
});
```

---

## FAQ

**Q: Quel provider choisir ?**
A: Gemini Flash pour le meilleur rapport qualité/prix. GPT-4o-mini si vous avez besoin de JSON structuré complexe.

**Q: Comment gérer le rate limiting ?**
A: Les erreurs de rate limit sont propagées. Implémentez un retry avec backoff exponentiel côté appelant.

**Q: Puis-je utiliser les deux providers simultanément ?**
A: Oui, spécifiez le provider dans chaque appel. Utile pour comparer les résultats ou répartir la charge.

**Q: Le service met en cache les réponses ?**
A: Non, chaque appel déclenche une nouvelle requête. Implémentez votre propre cache si nécessaire.

---

## Support

Pour toute question ou problème, consultez :
- Documentation Gemini: https://ai.google.dev/docs
- Documentation OpenAI: https://platform.openai.com/docs
