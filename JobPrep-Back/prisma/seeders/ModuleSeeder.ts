import { PrismaClient } from '@prisma/client';

export class ModuleSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding modules...');

      const modules: { name: string; description?: string }[] = [
          { name: 'RESUME', description: 'Gestion du CV et analyses' },
          { name: 'LETTERS', description: 'Gestion des lettres de motivation et suivi' },
          { name: 'SKILLS_TESTS', description: 'Tests de compétences et évaluations' },
          { name: 'SPEECH_SKILLS', description: 'Compétences orales et préparation aux entretiens' },
          { name: 'COMMUNICATION_BUNDLE', description: 'Planification et suggestions de communication' },
          { name: 'USER_MANAGEMENT', description: 'Gestion des utilisateurs et rôles' },
          { name: 'JOBS', description: 'Gestion des offres et candidatures' },
          { name: 'ADMIN', description: 'Fonctionnalités d’administration' },
          { name: 'PRICING', description: 'Gestion des prix et packs' },
      ];


      for (const m of modules) {
      await this.prisma.module.upsert({
        where: { name: m.name },
        update: { description: m.description ?? null },
        create: { name: m.name, description: m.description ?? null },
      });
    }

    console.log('Modules seeding completed');
  }
}
