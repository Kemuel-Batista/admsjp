import { Module } from '@nestjs/common'

import { MailNotifier } from '@/domain/admsjp/notifiers/mail-notifier'

import { EnvModule } from '../env/env.module'
import { SendGridNotifier } from './sendgrid-notifier'

@Module({
  imports: [EnvModule],
  providers: [{ provide: MailNotifier, useClass: SendGridNotifier }],
  exports: [MailNotifier],
})
export class NotifierModule {}
