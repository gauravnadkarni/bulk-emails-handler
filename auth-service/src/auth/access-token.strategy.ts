import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,"access-token-strategy") {
  static accessTokenCookieName=null;
  constructor(private readonly configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secretForAccessToken,
    });
    AccessTokenStrategy.accessTokenCookieName=this.configService.get("TOKENS_COOKIES_NAME")
  }

  private static extractJWT(req): string | null {
    const cookieName = AccessTokenStrategy.accessTokenCookieName
    if (
      req.cookies &&
      cookieName in req.cookies &&
      req.cookies[cookieName].length > 0
    ) {
      return req.cookies[cookieName];
    }
    return null;
  }

  async validate(payload: any) {
    return { userId: payload.sub, name: payload.name };
  }
}