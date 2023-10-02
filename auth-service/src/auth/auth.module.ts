import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilityModule } from 'src/utility/utility.module';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports:[
    UtilityModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretForAccessToken,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports:[AuthService],
})
export class AuthModule {}
