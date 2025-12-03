import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../shared/prisma';
import * as bcrypt from 'bcrypt';
import * as ErrorCodes from '../shared/constants/error-codes.json';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: true
          }
        },
        candidate: {
          include: {
            candidateJobPreferences: {
              include: {
                cv: true  // CV is now linked to CandidateJobPreferences, not Candidate
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException({
        ...ErrorCodes.USER.INVALID_CREDENTIALS,
        statusCode: 401
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        ...ErrorCodes.USER.INVALID_CREDENTIALS,
        statusCode: 401
      });
    }

    // Add derived permission_names array on role from permissions relation
    if ((user as any)?.role) {
      const permissions = ((user as any).role.permissions ?? []) as Array<{ name?: string }>;
      (user as any).role = {
        ...(user as any).role,
        permission_names: permissions.map(p => p?.name).filter((n): n is string => Boolean(n)),
      } as any;
    }

    const { password: _, ...result } = user as any;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const mapRoleNameToUserRole = (roleName?: string): string => {
      switch (roleName) {
        case 'Admin': return 'ADMIN';
        case 'Recruiter': return 'RECRUITER';
        case 'Candidate': return 'CANDIDATE';
        default: return 'CANDIDATE';
      }
    };

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(userId: string) {
    return { success: true, message: 'Logged out successfully' };
  }

  async register(registerUserDTO: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerUserDTO.email },
      });

      if (existingUser) {
        throw new ConflictException({
          ...ErrorCodes.USER.EMAIL_EXISTS,
          statusCode: 409
        });
      }

      const hashedPassword = await bcrypt.hash(registerUserDTO.password, 10);

      const { roleId, ...rest } = registerUserDTO as any;
      const connectRole = roleId ? { id: roleId } : { name: 'Candidate' };

      const user = await this.prisma.user.create({
        data: {
          onboardingStep: 1,
          ...rest,
          password: hashedPassword,
          role: { connect: connectRole },
        },
        include: { role: { include: { permissions: true } } },
      });

      // Générer le token directement après la création
      const payload = {
        sub: user.id,
        email: user.email,
      };

      // Ajouter permission_names comme pour le login
      if ((user as any)?.role) {
        const permissions = ((user as any).role.permissions ?? []) as Array<{ name?: string }>;
        (user as any).role = {
          ...(user as any).role,
          permission_names: permissions.map(p => p?.name).filter((n): n is string => Boolean(n)),
        } as any;
      }

      const { password, ...result } = user;
      return {
        user: result,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error in register:', error);
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

  async updateOnboardingStep(userId: string, step: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { onboardingStep: step },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            permissions: true
          }
        },
        candidate: {
          include: {
            candidateJobPreferences: {
              include: {
                cv: true  // CV is now linked to CandidateJobPreferences, not Candidate
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Add derived permission_names array on role from permissions relation
    if ((user as any)?.role) {
      const permissions = ((user as any).role.permissions ?? []) as Array<{ name?: string }>;
      (user as any).role = {
        ...(user as any).role,
        permission_names: permissions.map(p => p?.name).filter((n): n is string => Boolean(n)),
      } as any;
    }

    const { password, ...result } = user as any;
    return result;
  }
}