import { Module } from '@nestjs/common'

import { OnConfirmEventPurchase } from '@/domain/notification/application/subscribers/on-confirm-event-purchase'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

import { DatabaseModule } from '../database/database.module'
import { NotifierModule } from '../notifier/notifier.module'

@Module({
  imports: [DatabaseModule, NotifierModule],
  providers: [OnConfirmEventPurchase, SendNotificationUseCase],
})
export class EventsModule {}
