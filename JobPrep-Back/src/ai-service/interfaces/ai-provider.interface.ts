export interface AIGenerationOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model?: string;
}

export interface IAIProvider {
  /**
   * Génère du texte à partir d'un prompt
   * @param prompt Le prompt à envoyer au modèle IA
   * @param options Options de génération
   * @returns La réponse générée par l'IA
   */
  generate(prompt: string, options?: AIGenerationOptions): Promise<AIResponse>;

  /**
   * Génère une réponse structurée en JSON
   * @param prompt Le prompt à envoyer au modèle IA
   * @param schema Le schéma JSON attendu
   * @param options Options de génération
   * @returns La réponse structurée
   */
  generateJSON<T>(prompt: string, schema?: any, options?: AIGenerationOptions): Promise<T>;

  /**
   * Retourne le nom du provider
   */
  getName(): string;

  /**
   * Vérifie si le provider est disponible (clé API configurée, etc.)
   */
  isAvailable(): Promise<boolean>;
}
