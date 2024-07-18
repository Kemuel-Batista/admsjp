import { Module } from '@nestjs/common'

import { ChangeEventTicketStatusUseCase } from '@/domain/admsjp/use-cases/event-ticket/change-event-ticket-status'
import { CompleteEventTicketInfoUseCase } from '@/domain/admsjp/use-cases/event-ticket/complete-event-ticket-info'
import { ConfirmShirtPickupUseCase } from '@/domain/admsjp/use-cases/event-ticket/confirm-shirt-pickup'
import { ListEventTicketsByPurchaseIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-purchase-id'
import { ListEventTicketsOnlyWithShirtsUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-only-with-shirts'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'
import { WebsocketModule } from '@/infra/websocket/websocket.module'

import { ChangeEventTicketStatusController } from './controllers/change-event-ticket-status.controller'
import { CompleteEventTicketInfoController } from './controllers/complete-event-ticket-info.controller'
import { ConfirmShirtPickupController } from './controllers/confirm-shirt-pickup.controller'
import { ListEventTicketsByPurchaseIdController } from './controllers/list-event-tickets-by-purchase-id.controller'
import { ListEventTicketsOnlyWithShirtsController } from './controllers/list-event-tickets-only-with-shirts.controller'

@Module({
  imports: [DatabaseModule, GeneratorsModule, WebsocketModule],
  controllers: [
    ListEventTicketsByPurchaseIdController,
    CompleteEventTicketInfoController,
    ListEventTicketsOnlyWithShirtsController,
    ConfirmShirtPickupController,
    ChangeEventTicketStatusController,
  ],
  providers: [
    ListEventTicketsByPurchaseIdUseCase,
    CompleteEventTicketInfoUseCase,
    ListEventTicketsOnlyWithShirtsUseCase,
    ConfirmShirtPickupUseCase,
    ChangeEventTicketStatusUseCase,
  ],
})
export class EventTicketHttpModule {}
