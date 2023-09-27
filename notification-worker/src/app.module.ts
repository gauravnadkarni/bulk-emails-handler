import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagingModule } from './messaging/messaging.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    EmailModule,
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
