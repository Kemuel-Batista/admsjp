import { Module } from '@nestjs/common'

import { CompleteEventTicketInfoUseCase } from '@/domain/admsjp/use-cases/event-ticket/complete-event-ticket-info'
import { ListEventTicketsByPurchaseIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-purchase-id'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'
import { WebsocketModule } from '@/infra/websocket/websocket.module'

import { CompleteEventTicketInfoController } from './controllers/complete-event-ticket-info.controller'
import { ListEventTicketsByPurchaseIdController } from './controllers/list-event-tickets-by-purchase-id.controller'

@Module({
  imports: [DatabaseModule, GeneratorsModule, WebsocketModule],
  controllers: [
    ListEventTicketsByPurchaseIdController,
    CompleteEventTicketInfoController,
  ],
  providers: [
    ListEventTicketsByPurchaseIdUseCase,
    CompleteEventTicketInfoUseCase,
  ],
})
export class EventTicketHttpModule {}
