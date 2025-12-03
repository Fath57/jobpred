import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; description?: string | null; moduleId: string }) {
    try {
      // Ensure module exists
      const mod = await this.prisma.module.findUnique({ where: { id: data.moduleId } });
      if (!mod) throw new NotFoundException('Module not found');

      return await this.prisma.permission.create({
        data: {
          name: data.name,
          description: data.description ?? null,
          moduleId: data.moduleId,
        },
        include: { module: true },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Permission with this name already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.permission.findMany({ include: { module: true }, orderBy: { createdAt: 'desc' } });
  }

  async findByModule(moduleId: string) {
    return this.prisma.permission.findMany({ where: { moduleId }, include: { module: true } });
  }
}
