import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'

import { MailNotifier } from '@/domain/notification/application/notifiers/mail-notifier'

import { EnvModule } from '../env/env.module'
// import { SendGridNotifier } from './sendgrid-notifier'
import { NodemailerNotifier } from './nodemailer-notifier'

@Module({
  imports: [
    EnvModule,
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_EMAIL_ADDRESS,
          pass: process.env.NODEMAILER_API_KEY,
        },
      },
    }),
  ],
  providers: [{ provide: MailNotifier, useClass: NodemailerNotifier }],
  exports: [MailNotifier],
})
export class NotifierModule {}
