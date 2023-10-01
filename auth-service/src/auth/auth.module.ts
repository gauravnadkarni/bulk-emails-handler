import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilityModule } from 'src/utility/utility.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  imports:[UtilityModule, UsersModule],
})
export class AuthModule {}
