import { Injectable } from '@nestjs/common'
import { MailService } from '@sendgrid/mail'

import {
  MailNotifier,
  MailNotifierProps,
} from '@/domain/admsjp/notifiers/mail-notifier'

import { logger } from '../config/winston-config'
import { EnvService } from '../env/env.service'

@Injectable()
export class SendGridNotifier implements MailNotifier {
  private client: MailService
  private SENDGRID_EMAIL_ADDRESS: string

  constructor(private env: EnvService) {
    const sendGridApiKey = env.get('SENDGRID_API_KEY')

    this.client = new MailService()
    this.client.setApiKey(sendGridApiKey)
    this.SENDGRID_EMAIL_ADDRESS = env.get('SENDGRID_EMAIL_ADDRESS')
  }

  async send({
    email,
    title,
    content,
    renderedHtml,
  }: MailNotifierProps): Promise<void> {
    const msg = {
      to: email,
      from: this.SENDGRID_EMAIL_ADDRESS,
      subject: title,
      text: content,
      html: renderedHtml,
    }

    await this.client.send(msg).catch((err) => {
      logger.error(`SendGrid Notifier Error - ${JSON.stringify(err)}`)
    })
  }
}
