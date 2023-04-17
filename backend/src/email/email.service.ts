import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import  * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/Entities/Email.entity';

const EMAIL_SENDER = 'lika_208@mail.ru'
const PASSWORD = 'wFN0jyakuzY5gcLJRrAS'

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter
    private emailSender: typeof EMAIL_SENDER
    private password: typeof PASSWORD

    constructor(
        @InjectRepository(Email)
        private emailRepository: Repository<Email>
    ){
        this.emailSender = EMAIL_SENDER
        this.password = PASSWORD
        this.transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,

            secure: true,
              auth: {
                user: this.emailSender,
                pass: this.password
              }
        });      
    }

    async sendEmail(to: string, subject: string, message: string){
        const email = await this.transporter.sendMail({
            from: this.emailSender,
            to: 'lika_208@mail.ru',
            subject,
            text: message
        })
    }

    async sendEmailWithTransaction(transactionManager: EntityManager, emailData: EmailSendInterface){
        const {
            message,
            subject,
            to
        } = emailData
        const log = new Email();
        log.dateSended = new Date()
        log.email = to
        this.sendEmail(to, subject, message)
        transactionManager.save(log)
    }
}
