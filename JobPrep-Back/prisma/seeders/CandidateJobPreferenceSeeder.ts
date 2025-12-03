import {
    PrismaClient,
    ExperienceLevel,
    WorkMode,
    FormalityLevel,
  } from '@prisma/client';
  import { faker } from '@faker-js/faker';
  
  export class CandidateJobPreferenceSeeder {
    constructor(private prisma: PrismaClient) {}
  
    async seed() {
      console.log('Seeding job preferences...');
  
      const candidates = await this.prisma.candidate.findMany({
        select: { id: true, fullName: true },
      });
  
      for (const c of candidates) {
        const existingCount = await this.prisma.candidateJobPreference.count({
          where: { candidateId: c.id },
        });
        if (existingCount > 0) {
          console.log(`Candidate ${c.id} already has ${existingCount} job preference(s), skipping...`);
          continue;
        }
  
        const desiredPosition = faker.person.jobTitle();
        const jobDescription = faker.lorem.sentences({ min: 1, max: 3 });
  
        await this.prisma.candidateJobPreference.create({
          data: {
            candidateId: c.id,
            desiredPosition,
            jobDescription,
            experience: faker.helpers.arrayElement([
              ExperienceLevel.JUNIOR,
              ExperienceLevel.INTERMEDIATE,
              ExperienceLevel.SENIOR,
              ExperienceLevel.EXPERT,
            ]),
            workMode: faker.helpers.arrayElement([
              WorkMode.REMOTE,
              WorkMode.HYBRID,
              WorkMode.IN_PERSON,
            ]),
            formalityLevel: faker.helpers.arrayElement([
              FormalityLevel.DECONTRACTE,
              FormalityLevel.PROFESSIONAL,
              FormalityLevel.FORMEL,
            ]),
          },
        });
      }
  
      console.log('Job preferences seeding completed');
    }
  }
  