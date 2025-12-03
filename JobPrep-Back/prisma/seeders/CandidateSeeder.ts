import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class CandidateSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding candidates...');

    const users = await this.prisma.user.findMany({
      where: { role: { name: 'Candidate' } },
    });

    for (const u of users) {
      const existing = await this.prisma.candidate.findUnique({
        where: { userId: u.id }, // userId est unique
      });
      if (existing) {
        console.log(`Candidate for ${u.email} exists, skipping...`);
        continue;
      }

      const fullName = `${u.firstName} ${u.lastName}`.trim();

      await this.prisma.candidate.create({
        data: {
          userId: u.id,
          fullName,
          email: u.email,
          phone: u.phone ?? faker.phone.number(),
          linkedin:  `https://www.linkedin.com/in/${faker.internet.userName()}`,
          location: u.location ?? `${faker.location.city()}, ${faker.location.country()}`,
          aiProfileDescription: faker.lorem.sentences({ min: 2, max: 4 }),
          customizedProfileDescription: null,
        },
      });
    }

    console.log('Candidate seeding completed');
  }
}
