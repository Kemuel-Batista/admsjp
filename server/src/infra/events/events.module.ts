import { Module } from '@nestjs/common'

import { OnConfirmEventPurchase } from '@/domain/notification/application/subscribers/on-confirm-event-purchase'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

import { DatabaseModule } from '../database/database.module'
import { GeneratorsModule } from '../generators/generators.module'
import { NotifierModule } from '../notifier/notifier.module'

@Module({
  imports: [DatabaseModule, NotifierModule, GeneratorsModule],
  providers: [OnConfirmEventPurchase, SendNotificationUseCase],
  exports: [OnConfirmEventPurchase, SendNotificationUseCase],
})
export class EventsModule {}
