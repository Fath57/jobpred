import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; description?: string | null }) {
    return this.prisma.module.create({ data: { name: data.name, description: data.description ?? null } });
  }

  async findAll() {
    return this.prisma.module.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findWithPermissions() {
    return this.prisma.module.findMany({ include: { permissions: true }, orderBy: { createdAt: 'desc' } });
  }
}
