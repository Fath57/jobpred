import { Controller, Post, Body, UseGuards, Request, Param, Put, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SkipAuth } from '../shared/decorators/skip-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @SkipAuth()
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 200, description: 'Register successful' })
  @ApiResponse({ status: 400, description: 'Register failed' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @SkipAuth()
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @Put('onboarding-step/:step')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update onboarding step' })
  @ApiResponse({ status: 200, description: 'Step updated successfully' })
  async updateOnboardingStep(
    @Request() req,
    @Param('step') step: string
  ) {
    return this.authService.updateOnboardingStep(req.user.id, parseInt(step, 10));
  }
}