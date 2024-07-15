import { Module } from '@nestjs/common'

import { CancelEventPurchaseByExpiredTimeUseCase } from '@/domain/admsjp/use-cases/event-purchase/cancel-event-purchase-by-expired-time'
import { ConfirmEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/confirm-event-purchase'
import { CreateEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/create-event-purchase'
import { ListEventPurchasesByEventIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-event-purchases-by-event-id'
import { ListEventPurchasesByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-event-purchases-by-user-id'
import { ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-unexpired-event-purchases-with-details-by-user-id'
import { OnConfirmEventPurchase } from '@/domain/notification/application/subscribers/on-confirm-event-purchase'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'

import { CancelEventPurchaseByExpiredTimeController } from './controllers/cancel-event-purchase-by-expired-time.controller'
import { ConfirmEventPurchaseController } from './controllers/confirm-event-purchase.controller'
import { CreateEventPurchaseController } from './controllers/create-event-purchase.controller'
import { ListEventPurchasesByEventIdController } from './controllers/list-event-purchases-by-event-id.controller'
import { ListEventPurchasesByUserIdController } from './controllers/list-event-purchases-by-user-id.controller'
import { ListUnexpiredEventPurchasesWithDetailsByUserIdController } from './controllers/list-unexpired-event-purchases-with-details-by-user-id.controller'

@Module({
  imports: [DatabaseModule, GeneratorsModule],
  controllers: [
    CreateEventPurchaseController,
    ListUnexpiredEventPurchasesWithDetailsByUserIdController,
    ListEventPurchasesByUserIdController,
    ListEventPurchasesByEventIdController,
    CancelEventPurchaseByExpiredTimeController,
    ConfirmEventPurchaseController,
  ],
  providers: [
    CreateEventPurchaseUseCase,
    ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase,
    ListEventPurchasesByUserIdUseCase,
    CancelEventPurchaseByExpiredTimeUseCase,
    ListEventPurchasesByEventIdUseCase,
    ConfirmEventPurchaseUseCase,
    OnConfirmEventPurchase,
  ],
})
export class EventPurchaseHttpModule {}
