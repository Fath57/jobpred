import { PrismaClient, OnboardingStatus, OnboardingStep } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class OnboardingSessionSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding onboarding sessions...');

    const users = await this.prisma.user.findMany();
    for (const u of users) {
      const exists = await this.prisma.onboardingSession.findUnique({
        where: { userId: u.id },
      });
      if (exists) {
        console.log(`OnboardingSession for user ${u.email} exists, skipping...`);
        continue;
      }

      const isCompleted = u.roleId && (await this.prisma.role.findUnique({ where: { id: u.roleId } }))?.name !== 'Candidate';
      const status = isCompleted ? OnboardingStatus.COMPLETED : OnboardingStatus.IN_PROGRESS;

      const possibleSteps = [
        OnboardingStep.REGISTRATION,
        OnboardingStep.PERSONAL_INFO,
        OnboardingStep.WE_KNOW_YOU,
        OnboardingStep.PROFESSIONAL_INFO,
        OnboardingStep.CV_UPLOAD,
        OnboardingStep.JOB_DESCRIPTION,
        OnboardingStep.COMPLETED,
      ];

      const currentStep = isCompleted
        ? OnboardingStep.COMPLETED
        : faker.helpers.arrayElement(possibleSteps.slice(0, -1)); // sans COMPLETED

      const completedSteps = isCompleted
        ? possibleSteps
        : [OnboardingStep.REGISTRATION];

      await this.prisma.onboardingSession.create({
        data: {
          userId: u.id,
          currentStep,
          status,
          completedSteps,
          data: { notes: isCompleted ? 'auto-completed' : 'seed progress' },
          completedAt: isCompleted ? new Date() : null,
        },
      });
    }

    console.log('Onboarding sessions seeding completed');
  }
}
