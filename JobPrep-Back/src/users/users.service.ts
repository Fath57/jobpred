import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import ErrorCodes from '../shared/constants/error-codes.json';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async listUsers() {
    const users = await this.prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'desc' },
    });
    console.log("users",users);
    // Remove password before returning
    return users.map(({ password, ...u }) => u);
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException({
          ...ErrorCodes.USER.EMAIL_EXISTS,
          statusCode: 409
        });
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const { roleId, ...rest } = createUserDto as any;
      const connectRole = roleId ? { id: roleId } : { name: 'Candidate' };

      const user = await this.prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
          role: { connect: connectRole },
        },
        include: { role: true },
      });

      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException({
          ...ErrorCodes.USER.EMAIL_EXISTS,
          statusCode: 409
        });
      }
        }
      throw error;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException({
          ...ErrorCodes.USER.NOT_FOUND,
          statusCode: 404
        });
      }

      const updateData: any = { ...updateUserDto };

      if (updateData.email && updateData.email !== existingUser.email) {
        const emailExists = await this.prisma.user.findUnique({
          where: { email: updateData.email },
        });

        if (emailExists) {
          throw new ConflictException({
            ...ErrorCodes.USER.EMAIL_EXISTS,
            statusCode: 409,
            message: "Email is already in use"
          });
        }
      }

      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      if (updateData.roleId) {
        updateData.role = { connect: { id: updateData.roleId } };
        delete updateData.roleId;
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
        include: { role: true },
      });

      const { password, ...result } = updatedUser;
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException({
            ...ErrorCodes.USER.EMAIL_EXISTS,
            statusCode: 409,
            message: "Email is already in use"
          });
        }
      }
      throw error;
    }
  }

  async deleteUser(id: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException({
        ...ErrorCodes.USER.NOT_FOUND,
        statusCode: 404,
      });
    }

    // Perform cascading clean-up in a transaction to avoid FK violations
    const result = await this.prisma.$transaction(async (tx) => {
      // Delete onboarding session if exists
      await tx.onboardingSession.deleteMany({ where: { userId: id } });

      // If candidate profile exists for this user, delete its dependencies first
      const candidate = await tx.candidate.findUnique({ where: { userId: id } });
      if (candidate) {
        await tx.candidateJobPreference.deleteMany({ where: { candidateId: candidate.id } });
        // You may also want to nullify candidate.cv relation if needed, but FK is from Candidate -> AppFile
        await tx.candidate.delete({ where: { id: candidate.id } });
      }

      // Finally delete the user
      const deleted = await tx.user.delete({
        where: { id },
        include: { role: true },
      });

      const { password, ...safe } = deleted as any;
      return safe;
    });

    return result;
  }
}
