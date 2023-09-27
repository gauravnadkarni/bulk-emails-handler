import { AmqpConnection, Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Message } from './dto/message.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class MessagingService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        private readonly emailService:EmailService
    ){}

    @RabbitRPC({
        exchange: 'x.direct',
        routingKey: 'route.email.process',
        queue: 'q.emailProcessor'
    })
    async processMessage(message:Message){
        try{
            message.status = "running";
            let isFailed = false;
            for(let i=1;i<=message.numOfEmailsToBeSent;i++) {
                try{
                    message.numOfEmailsSentSoFar++
                    await this.emailService.sendEmail(message);
                    await this.pushMessage(message);
                } catch(err) {
                    message.numOfEmailsSentSoFar--;
                    isFailed =true;
                }
            }
            message.isDone=true;
            if(message.numOfEmailsSentSoFar===message.numOfEmailsToBeSent && isFailed===false) {
                message.status = "success";
            } else {
                message.status = "failed";
            }
            await this.pushMessage(message);
            return new Nack();  //positivly ack
        } catch(err) {
            return new Nack(true);  //requeue
        } 
    }

    async pushMessage(message:Message):Promise<void> {
        await this.amqpConnection.publish<Message>('x.direct','route.email.update',message);
    }
}
