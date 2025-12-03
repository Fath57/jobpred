import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SKIP_AUTH } from '../decorators/skip-auth.decorator';
import { PrismaService } from '../prisma';

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface RequestWithUser extends Request {
  user: {
    id: string;
    accountType: string; // computed from role.name
    [key: string]: any;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authorization token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      // Fetch user from database
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { role: true },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Map role name to legacy UserRole string for compatibility
      const mapRoleNameToUserRole = (roleName?: string): string => {
        switch (roleName) {
          case 'Admin': return 'ADMIN';
          case 'Recruiter': return 'RECRUITER';
          case 'Candidate': return 'CANDIDATE';
          default: return 'CANDIDATE';
        }
      };

      // Add user to request with computed accountType
      (request as RequestWithUser).user = {
        ...user,
        accountType: mapRoleNameToUserRole(user.role?.name),
      } as any;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    // Handle Bearer token format
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return authHeader;
  }
}
