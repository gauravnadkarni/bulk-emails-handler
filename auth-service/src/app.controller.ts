import { Body, Controller, Get, HttpCode, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AccessJwtAuthGuard } from './auth/access-jwt-auth.guard';
import { RefreshJwtAuthGuard } from './auth/refresh-jwt-auth.guard';
import { Tokens } from './auth/dto/token.dto';
import { ConfigService } from '@nestjs/config';
import { SignIn } from './auth/dto/sign-in.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('auth/signin')
  async login(@Body() signIn:SignIn, @Request() req, @Res({ passthrough: true }) res: Response) {
    const accessTokenExpiryTimeInSec = this.configService.getOrThrow("EXPIRES_IN_TIME_FOR_ACCESS_TOKEN_IN_SECONDS");
    const cookieName = this.configService.getOrThrow("TOKENS_COOKIES_NAME");
    const tokens:Tokens = await this.authService.signin(req.user);
    if(signIn.setInCookie===true) {
      res.cookie(cookieName, `${tokens.access_token} ${tokens.refresh_token}`, {
        expires: new Date(new Date().getTime() + accessTokenExpiryTimeInSec * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
    }
    return tokens;
  }

  @UseGuards(AccessJwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const userFromRequest = req.user;
    const user = this.authService.getUserDetailsById(userFromRequest.userId)
    return user;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @HttpCode(200)
  @Post('auth/refresh')
  async refreshTokens(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
