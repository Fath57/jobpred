import { PrismaClient } from '@prisma/client';

export class PermissionSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding permissions...');

    // Load modules by name
    const modules = await this.prisma.module.findMany();
    const moduleByName = new Map(modules.map((m) => [m.name, m]));

    type Perm = { name: string; description: string; module: string };
      const permissions: Perm[] = [
          // Resume module
          { name: 'RESUME_VIEW', description: 'Voir le module CV', module: 'RESUME' },
          { name: 'RESUME_ANALYSIS', description: 'Analyser un CV', module: 'RESUME' },
          { name: 'RESUME_CONFECTION', description: 'Confectionner un CV', module: 'RESUME' },

          // Letters module
          { name: 'LETTERS_VIEW', description: 'Voir le module Lettres', module: 'LETTERS' },
          { name: 'MOTIVATION_LETTER', description: 'Créer une lettre de motivation', module: 'LETTERS' },
          { name: 'FOLLOWUP_LETTER', description: 'Créer une lettre de suivi', module: 'LETTERS' },

          // Skills Tests module
          { name: 'SKILLS_TESTS_VIEW', description: 'Voir le module Tests de compétences', module: 'SKILLS_TESTS' },
          { name: 'SOFT_SKILLS_TEST', description: 'Passer un test Soft Skills', module: 'SKILLS_TESTS' },
          { name: 'HARD_SKILLS_TEST', description: 'Passer un test Hard Skills', module: 'SKILLS_TESTS' },
          { name: 'LANGUAGE_SKILLS_TEST', description: 'Passer un test de langues', module: 'SKILLS_TESTS' },
          { name: 'PERSONALITY_SKILLS_TEST', description: 'Passer un test de personnalité', module: 'SKILLS_TESTS' },
          { name: 'HR_INTERVIEW_PREP', description: 'Préparation entretien RH', module: 'SKILLS_TESTS' },
          { name: 'TEST_FEEDBACK', description: 'Voir les retours de test', module: 'SKILLS_TESTS' },

          // Speech Skills module
          { name: 'SPEECH_SKILLS_VIEW', description: 'Voir le module Compétences orales', module: 'SPEECH_SKILLS' },
          { name: 'SPEECH_SOFT_SKILLS', description: 'Pratiquer Soft Skills oral', module: 'SPEECH_SKILLS' },
          { name: 'SPEECH_HARD_SKILLS', description: 'Pratiquer Hard Skills oral', module: 'SPEECH_SKILLS' },
          { name: 'SPEECH_LANGUAGE_SKILLS', description: 'Pratiquer Langues oral', module: 'SPEECH_SKILLS' },
          { name: 'SPEECH_PERSONALITY_SKILLS', description: 'Pratiquer personnalité oral', module: 'SPEECH_SKILLS' },
          { name: 'SPEECH_HR_PREP', description: 'Préparation entretien RH oral', module: 'SPEECH_SKILLS' },
          { name: 'SPEECH_FEEDBACK', description: 'Voir feedback oral', module: 'SPEECH_SKILLS' },

          // Communication Bundle module
          { name: 'COMMUNICATION_VIEW', description: 'Voir le module Communication', module: 'COMMUNICATION_BUNDLE' },
          { name: 'SUGGESTED_SUBJECTS', description: 'Voir sujets suggérés', module: 'COMMUNICATION_BUNDLE' },
          { name: 'COMMUNICATION_PLANNING', description: 'Planifier la communication', module: 'COMMUNICATION_BUNDLE' },
          { name: 'LINKEDIN_CONNECTION', description: 'Suggestions d’amélioration via LinkedIn', module: 'COMMUNICATION_BUNDLE' },


          // User management
          { name: 'USER_VIEW', description: 'Voir les utilisateurs', module: 'USER_MANAGEMENT' },
          { name: 'USER_CREATE', description: 'Créer un utilisateur', module: 'USER_MANAGEMENT' },
          { name: 'USER_EDIT', description: 'Modifier un utilisateur', module: 'USER_MANAGEMENT' },
          { name: 'USER_DELETE', description: 'Supprimer un utilisateur', module: 'USER_MANAGEMENT' },
          { name: 'ROLE_MANAGE', description: 'Gérer les rôles', module: 'USER_MANAGEMENT' },
          { name: 'PERMISSION_MANAGE', description: 'Gérer les permissions', module: 'USER_MANAGEMENT' },

          { name: 'VIEW_REPORTS', description: 'Consulter les rapports et statistiques', module: 'ADMIN' },
          { name: 'SYSTEM_SETTINGS', description: 'Modifier les paramètres globaux', module: 'ADMIN' },

          // Pricing module
          { name: 'PRICING_VIEW', description: 'Voir le module Pricing', module: 'PRICING' },
          { name: 'PRICING_OPTIONS', description: 'Gérer les options de pricing', module: 'PRICING' },
          { name: 'PRICING_PACKS', description: 'Gérer les packs de pricing', module: 'PRICING' },
          { name: 'PRICING_ANALYTICS', description: 'Voir les statistiques de pricing', module: 'PRICING' },
      ];

    for (const p of permissions) {
      const mod = moduleByName.get(p.module);
      if (!mod) {
        console.warn(`Module not found for permission ${p.name}: ${p.module}`);
        continue;
      }
      await this.prisma.permission.upsert({
        where: { name: p.name },
        update: { description: p.description, moduleId: mod.id },
        create: { name: p.name, description: p.description, moduleId: mod.id },
      });
    }

    console.log('Permissions seeding completed');
  }
}
