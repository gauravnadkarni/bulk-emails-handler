import { Injectable } from '@nestjs/common';
import { Message } from '../messaging/dto/message.dto';

@Injectable()
export class EmailService {
    constructor(){}

    async sendEmail(message:Message){
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => {
            console.log("Email sent");
        });
    }
}
