import { Module, OnModuleInit } from '@nestjs/common'

import { EventQueue } from '@/domain/admsjp/queue/event-queue'
import { CreateEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/create-event-purchase'

import { DatabaseModule } from '../database/database.module'
import { GeneratorsModule } from '../generators/generators.module'
import { WebsocketModule } from '../websocket/websocket.module'
import { EventQueueConsumer } from './event-queue-consumer'
import { EventQueueRabbitMQ } from './event-queue-rabbitmq'

@Module({
  imports: [DatabaseModule, GeneratorsModule, WebsocketModule],
  providers: [
    { provide: EventQueue, useClass: EventQueueRabbitMQ },
    CreateEventPurchaseUseCase,
    EventQueueConsumer,
  ],
  exports: [EventQueue],
})
export class QueueModule implements OnModuleInit {
  constructor(private eventQueueConsumer: EventQueueConsumer) {}

  async onModuleInit() {
    this.eventQueueConsumer.execute()
  }
}
