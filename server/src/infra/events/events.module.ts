import { Module } from '@nestjs/common'

import { OnNewBelieverCreated } from '@/domain/notification/application/subscribers/on-new-believer-created'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

import { DatabaseModule } from '../database/database.module'
import { NotifierModule } from '../notifier/notifier.module'

@Module({
  imports: [DatabaseModule, NotifierModule],
  providers: [OnNewBelieverCreated, SendNotificationUseCase],
})
export class EventsModule {}
