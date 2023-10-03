import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AccessJwtAuthGuard } from './auth/access-jwt-auth.guard';
import { RefreshJwtAuthGuard } from './auth/refresh-jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('auth/signin')
  async login(@Request() req) {
    return this.authService.signin(req.user);
  }

  @UseGuards(AccessJwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @HttpCode(200)
  @Post('auth/refresh')
  async refreshTokens(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
