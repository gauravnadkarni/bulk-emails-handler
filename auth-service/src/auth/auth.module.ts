import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilityModule } from 'src/utility/utility.module';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './access-token.strategy';
import { RefreshTokenStrategy } from './refresh-token.strategy';

@Module({
  providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
  imports:[
    UtilityModule,
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ],
  exports:[AuthService],
})
export class AuthModule {}
