import { Injectable } from '@nestjs/common';
import { Message } from '../messaging/dto/message.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    constructor(private configService: ConfigService,private mailerService: MailerService) {}

    async sendEmail(message:Message){
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => {
            console.log("Email sent");
        });
    }

    async sendEmailToUser(to:string, message:Message) {
        console.log(to)
        await this.mailerService.sendMail({
            to,
            subject: 'Email from Bulk email handler utility',
            template: './notify',
            context: {
                jobId: message.jobId,
                echoNum: message.numOfEmailsSentSoFar,
            },
        });
    }
}
