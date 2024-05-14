import { Module, OnModuleInit } from '@nestjs/common'

import { EventQueue } from '@/domain/admsjp/queue/event-queue'
import { CreateEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/create-event-ticket'

import { DatabaseModule } from '../database/database.module'
import { GeneratorsModule } from '../generators/generators.module'
import { EventQueueConsumer } from './event-queue-consumer'
import { EventQueueRabbitMQ } from './event-queue-rabbitmq'

@Module({
  imports: [DatabaseModule, GeneratorsModule],
  providers: [
    { provide: EventQueue, useClass: EventQueueRabbitMQ },
    CreateEventTicketUseCase,
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
