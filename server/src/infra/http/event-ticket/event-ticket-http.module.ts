import { Module } from '@nestjs/common'

import { CreateEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/create-event-ticket'
import { ListEventTicketsByEventIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-event-id'
import { ListEventTicketsByUserIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-user-id'
import { RegisterEventQueue } from '@/domain/admsjp/use-cases/queues/register-event-queue'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'
import { QueueModule } from '@/infra/queue/queue.module'

import { CreateEventTicketController } from './controllers/create-event-ticket.controller'
import { ListEventTicketsByEventIdController } from './controllers/list-event-tickets-by-event-id.controller'
import { ListEventTicketsByUserIdController } from './controllers/list-event-tickets-by-user-id.controller'

@Module({
  imports: [DatabaseModule, QueueModule, GeneratorsModule],
  controllers: [
    CreateEventTicketController,
    ListEventTicketsByEventIdController,
    ListEventTicketsByUserIdController,
  ],
  providers: [
    CreateEventTicketUseCase,
    ListEventTicketsByEventIdUseCase,
    ListEventTicketsByUserIdUseCase,
    RegisterEventQueue,
  ],
})
export class EventTicketHttpModule {}
