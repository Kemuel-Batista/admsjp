import { Module } from '@nestjs/common'

import { CreateEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/create-event-ticket'
import { RegisterEventQueue } from '@/domain/admsjp/use-cases/queues/register-event-queue'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'
import { QueueModule } from '@/infra/queue/queue.module'

import { CreateEventTicketController } from './controllers/create-event-ticket.controller'

@Module({
  imports: [DatabaseModule, QueueModule, GeneratorsModule],
  controllers: [CreateEventTicketController],
  providers: [CreateEventTicketUseCase, RegisterEventQueue],
})
export class EventTicketHttpModule {}
