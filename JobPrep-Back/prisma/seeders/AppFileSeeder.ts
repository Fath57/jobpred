import { PrismaClient } from '@prisma/client';

export class AppFileSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding app files (CVs)...');
    console.log('Note: CV seeding is now handled through CandidateJobPreferences');

    // Le CV est maintenant lié à CandidateJobPreferences, pas à Candidate
    // Ce seeder est conservé pour compatibilité mais ne fait plus rien

    console.log('AppFile (CV) seeding completed (skipped - obsolete)');
  }
}
