import { Module } from '@nestjs/common'

import { CancelEventTicketsUseCase } from '@/domain/admsjp/use-cases/event-ticket/cancel-event-tickets'
import { CompleteEventTicketInfoUseCase } from '@/domain/admsjp/use-cases/event-ticket/complete-event-ticket-info'
import { CreateEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/create-event-ticket'
import { GetAllInformationAboutEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/get-all-information-about-event-ticket'
import { ListEventTicketsByEventIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-event-id'
import { ListEventTicketsByUserIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-user-id'
import { ListEventTicketsUnexpiredByUserUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-unexpired-by-user'
import { RegisterEventQueue } from '@/domain/admsjp/use-cases/queues/register-event-queue'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'
import { QueueModule } from '@/infra/queue/queue.module'
import { WebsocketModule } from '@/infra/websocket/websocket.module'

import { CancelEventTicketsController } from './controllers/cancel-event-tickets.controller'
import { CompleteEventTicketInfoController } from './controllers/complete-event-ticket-info.controller'
import { CreateEventTicketController } from './controllers/create-event-ticket.controller'
import { GetAllInformationAboutEventTicketController } from './controllers/get-all-information-about-event-ticket.controller'
import { ListEventTicketsByEventIdController } from './controllers/list-event-tickets-by-event-id.controller'
import { ListEventTicketsByUserIdController } from './controllers/list-event-tickets-by-user-id.controller'
import { ListEventTicketsUnexpiredByUserController } from './controllers/list-event-tickets-unexpired-by-user.controller'

@Module({
  imports: [DatabaseModule, QueueModule, GeneratorsModule, WebsocketModule],
  controllers: [
    CreateEventTicketController,
    ListEventTicketsByEventIdController,
    ListEventTicketsByUserIdController,
    ListEventTicketsUnexpiredByUserController,
    GetAllInformationAboutEventTicketController,
    CompleteEventTicketInfoController,
    CancelEventTicketsController,
  ],
  providers: [
    CreateEventTicketUseCase,
    ListEventTicketsByEventIdUseCase,
    ListEventTicketsByUserIdUseCase,
    GetAllInformationAboutEventTicketUseCase,
    RegisterEventQueue,
    CompleteEventTicketInfoUseCase,
    CancelEventTicketsUseCase,
    ListEventTicketsUnexpiredByUserUseCase,
  ],
})
export class EventTicketHttpModule {}
