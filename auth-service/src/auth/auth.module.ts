import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  providers: [AuthService],
  imports:[UtilityModule],
})
export class AuthModule {}
