import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,"refresh-token-strategy") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh_token"),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secretForRefreshToken,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, name: payload.name };
  }
}