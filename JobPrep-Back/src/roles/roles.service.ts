import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoleDto) {
    try {
      // Build connect array from provided permission IDs only
      const byIds = (data.permissionIds ?? []) as string[];

      const connect: Prisma.PermissionWhereUniqueInput[] = [];
      const seenIds = new Set<string>();

      for (const id of byIds) {
        if (id && !seenIds.has(id)) {
          seenIds.add(id);
          connect.push({ id } as Prisma.PermissionWhereUniqueInput);
        }
      }

      // Validate that all provided permission IDs exist in the database
      const uniqueIds = Array.from(seenIds);
      if (uniqueIds.length) {
        const existing = await this.prisma.permission.findMany({
          where: { id: { in: uniqueIds } },
          select: { id: true },
        });
        const existingSet = new Set(existing.map((p) => p.id));
        const missing = uniqueIds.filter((id) => !existingSet.has(id));
        if (missing.length) {
          throw new NotFoundException(`Permissions not found: ${missing.join(', ')}`);
        }
      }

      const role = await this.prisma.role.create({
        data: {
          name: data.name,
          description: data.description ?? null,
          permissions: connect.length ? { connect } : undefined,
        },
        include: { permissions: true },
      });
      return role;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Role with this name already exists');
      } else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        // Fallback in case of race conditions where a permission disappears between check and connect
        throw new NotFoundException('One or more permissions not found');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
      include: { permissions: true },
    });
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id }, include: { permissions: true } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: string, data: UpdateRoleDto) {
    try {
      // ensure exists
      await this.findOne(id);

      // If permissionIds provided, validate and prepare set/connect
      let permissionsUpdate: Prisma.RoleUpdateInput['permissions'] | undefined = undefined;
      if (data.permissionIds) {
        const seen = new Set<string>();
        const uniqueIds = (data.permissionIds || []).filter((x): x is string => !!x && !seen.has(x) && (seen.add(x), true));
        if (uniqueIds.length) {
          const existing = await this.prisma.permission.findMany({
            where: { id: { in: uniqueIds } },
            select: { id: true },
          });
          const existingSet = new Set(existing.map((p) => p.id));
          const missing = uniqueIds.filter((id) => !existingSet.has(id));
          if (missing.length) {
            throw new NotFoundException(`Permissions not found: ${missing.join(', ')}`);
          }
        }
        // Replace the relations fully with provided set
        permissionsUpdate = {
          set: uniqueIds.map((id) => ({ id })),
        } as Prisma.RoleUpdateInput['permissions'];
      }

      const updated = await this.prisma.role.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description ?? null,
          ...(permissionsUpdate ? { permissions: permissionsUpdate } : {}),
        },
        include: { permissions: true },
      });
      return updated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Role with this name already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    // ensure exists
    await this.findOne(id);
    await this.prisma.role.delete({ where: { id } });
    return { message: 'Role deleted successfully' };
  }
}
