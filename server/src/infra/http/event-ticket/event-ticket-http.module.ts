import { Module } from '@nestjs/common'

import { CancelEventTicketsUseCase } from '@/domain/admsjp/use-cases/event-ticket/cancel-event-tickets'
import { CompleteEventTicketInfoUseCase } from '@/domain/admsjp/use-cases/event-ticket/complete-event-ticket-info'
import { GetAllInformationAboutEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/get-all-information-about-event-ticket'
import { ListEventTicketsByEventIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-event-id'
import { RegisterEventQueue } from '@/domain/admsjp/use-cases/queues/register-event-queue'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'
import { QueueModule } from '@/infra/queue/queue.module'
import { WebsocketModule } from '@/infra/websocket/websocket.module'

import { CancelEventTicketsController } from './controllers/cancel-event-tickets.controller'
import { CompleteEventTicketInfoController } from './controllers/complete-event-ticket-info.controller'
import { GetAllInformationAboutEventTicketController } from './controllers/get-all-information-about-event-ticket.controller'
import { ListEventTicketsByEventIdController } from './controllers/list-event-tickets-by-event-id.controller'

@Module({
  imports: [DatabaseModule, QueueModule, GeneratorsModule, WebsocketModule],
  controllers: [
    ListEventTicketsByEventIdController,
    GetAllInformationAboutEventTicketController,
    CompleteEventTicketInfoController,
    CancelEventTicketsController,
  ],
  providers: [
    ListEventTicketsByEventIdUseCase,
    GetAllInformationAboutEventTicketUseCase,
    RegisterEventQueue,
    CompleteEventTicketInfoUseCase,
    CancelEventTicketsUseCase,
  ],
})
export class EventTicketHttpModule {}
