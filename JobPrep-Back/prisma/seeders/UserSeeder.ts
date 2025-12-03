import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export class UserSeeder {
    constructor(private prisma: PrismaClient) {}

    async seed() {
        console.log('Seeding users...');

        await this.createUser({
            email: 'admin@example.com',
            password: 'Admin123!',
            firstName: 'Admin',
            lastName: 'User',
            roleName: 'Admin',
            isActive: true
        });

        await this.createUser({
            email: 'recruiter@example.com',
            password: 'Recruiter123!',
            firstName: 'Recruiter',
            lastName: 'User',
            roleName: 'Recruiter',
            isActive: true
        });

        // Create 5 candidate users
        for (let i = 0; i < 5; i++) {
            await this.createUser({
                email: faker.internet.email(),
                password: 'Candidate123!',
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                phone: faker.phone.number(),
                location: `${faker.location.city()}, ${faker.location.country()}`,
                roleName: 'Candidate',
                isActive: true
            });
        }

        console.log('User seeding completed');
    }

    private async createUser(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
        location?: string;
        roleName: 'Admin' | 'Recruiter' | 'Candidate';
        isActive: boolean;
    }) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });

        if (existingUser) {
            console.log(`User with email ${userData.email} already exists, skipping...`);
            return;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Dynamically resolve role by name to ensure proper linkage
        const role = await this.prisma.role.findUnique({ where: { name: userData.roleName } });
        if (!role) {
            console.warn(`Role '${userData.roleName}' not found. Skipping user ${userData.email} creation.`);
            return;
        }

        await this.prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                location: userData.location,
                isActive: userData.isActive,
                role: { connect: { id: role.id } },
                onboardingStep: userData.roleName === 'Candidate' ? 1 : 5, // Les candidats commencent à l'étape 1, les autres sont considérés comme ayant terminé
            },
        });
    }
}