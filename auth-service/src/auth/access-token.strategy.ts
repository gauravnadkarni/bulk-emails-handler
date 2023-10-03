import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,"access-token-strategy") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secretForAccessToken,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, name: payload.name };
  }
}