import { PrismaClient, Permission } from '@prisma/client';

export class RoleSeeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    console.log('Seeding roles and role-permissions...');

    // Ensure permissions exist (PermissionSeeder should run before this seeder)
    const allPermissions = await this.prisma.permission.findMany();
    const byName = new Map(allPermissions.map((p) => [p.name, p]));

    // Helper to pick permissions by names safely
    const pick = (names: string[]) =>
      names
        .map((n) => byName.get(n))
        .filter((p): p is Permission => Boolean(p))
        .map((p) => ({ id: p.id }));

    // Define role -> permissions mapping based on PermissionSeeder
    const candidatePermNames = [
      'VIEW_JOBS',
      'APPLY_JOB',
      'EDIT_PROFILE',
      'UPLOAD_CV',
      'VIEW_APPLICATION_STATUS',
    ];

    const recruiterPermNames = [
      'CREATE_JOB',
      'EDIT_JOB',
      'DELETE_JOB',
      'VIEW_CANDIDATES',
      'MANAGE_APPLICATIONS',
      'EDIT_COMPANY_PROFILE',
    ];

    // Admin will receive all permissions
    const adminPermIds = allPermissions.map((p) => ({ id: p.id }));

    // Upsert roles and set permissions (idempotent)
    await this.prisma.role.upsert({
      where: { name: 'Candidate' },
      update: {
        description: 'Role for job seekers',
        permissions: { set: pick(candidatePermNames) },
      },
      create: {
        name: 'Candidate',
        description: 'Role for job seekers',
        permissions: { connect: pick(candidatePermNames) },
      },
    });

    await this.prisma.role.upsert({
      where: { name: 'Recruiter' },
      update: {
        description: 'Role for recruiters and employers',
        permissions: { set: pick(recruiterPermNames) },
      },
      create: {
        name: 'Recruiter',
        description: 'Role for recruiters and employers',
        permissions: { connect: pick(recruiterPermNames) },
      },
    });

    await this.prisma.role.upsert({
      where: { name: 'Admin' },
      update: {
        description: 'Administrator role with full access',
        permissions: { set: adminPermIds },
      },
      create: {
        name: 'Admin',
        description: 'Administrator role with full access',
        permissions: { connect: adminPermIds },
      },
    });

    console.log('Roles and permissions seeding completed');
  }
}
