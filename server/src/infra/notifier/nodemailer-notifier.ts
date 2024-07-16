import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import {
  MailNotifier,
  MailNotifierProps,
} from '@/domain/notification/application/notifiers/mail-notifier'

import { logger } from '../config/winston-config'
import { EnvService } from '../env/env.service'

@Injectable()
export class NodemailerNotifier implements MailNotifier {
  private NODEMAILER_EMAIL_ADDRESS: string

  constructor(
    private mailerService: MailerService,
    private env: EnvService,
  ) {
    this.NODEMAILER_EMAIL_ADDRESS = this.env.get('NODEMAILER_EMAIL_ADDRESS')
  }

  async send({
    title,
    email,
    renderedHtml,
    attachments,
  }: MailNotifierProps): Promise<void> {
    const message = {
      to: email,
      from: `UMADSJP ${this.NODEMAILER_EMAIL_ADDRESS}`,
      subject: title,
      html: renderedHtml,
      attachDataUrls: true,
      attachments,
    }

    await this.mailerService.sendMail(message).catch((err) => {
      logger.error(`Nodemailer Notifier Error - ${JSON.stringify(err)}`)
    })
  }
}
