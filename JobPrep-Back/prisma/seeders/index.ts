import { PrismaClient } from '@prisma/client';
import { UserSeeder } from './UserSeeder';
import { OnboardingSessionSeeder } from './OnboardingSessionSeeder';
import { CandidateSeeder } from './CandidateSeeder';
import { AppFileSeeder } from './AppFileSeeder';
import { CandidateJobPreferenceSeeder } from './CandidateJobPreferenceSeeder';
import { PermissionSeeder } from './PermissionSeeder';
import { RoleSeeder } from './RoleSeeder';
import { ModuleSeeder } from './ModuleSeeder';
import { seedPricing } from "./PricingSeeder";

const prisma = new PrismaClient();

interface Seeder {
  seed(): Promise<void>;
}

const seeders: Array<new (prisma: PrismaClient) => Seeder> = [
  ModuleSeeder,
  PermissionSeeder,
  RoleSeeder,
  UserSeeder,
  OnboardingSessionSeeder,
  CandidateSeeder,
  AppFileSeeder,
  CandidateJobPreferenceSeeder,
];

async function main() {
  console.log(`Running ${seeders.length} seeders...`);

  for (const SeederClass of seeders) {
    try {
      console.log(`Running seeder: ${SeederClass.name}`);
      const seederInstance = new SeederClass(prisma);
      await seederInstance.seed();
      console.log(`Seeder ${SeederClass.name} completed successfully`);
    } catch (error) {
      console.error(`Error running seeder ${SeederClass.name}:`, error);
    }
  }

  // Exécuter le seeder de pricing
  try {
    console.log('Running pricing seeder...');
    await seedPricing();
    console.log('Pricing seeder completed successfully');
  } catch (error) {
    console.error('Error running pricing seeder:', error);
  }

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
