import { Module } from '@nestjs/common'

import { CreateEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/create-event-purchase'
import { ListEventPurchasesByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-event-purchases-by-user-id'
import { ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-unexpired-event-purchases-with-details-by-user-id'
import { DatabaseModule } from '@/infra/database/database.module'
import { GeneratorsModule } from '@/infra/generators/generators.module'
import { QueueModule } from '@/infra/queue/queue.module'

import { CreateEventPurchaseController } from './controllers/create-event-purchase.controller'
import { ListEventPurchasesByUserIdController } from './controllers/list-event-purchases-by-user-id.controller'
import { ListUnexpiredEventPurchasesWithDetailsByUserIdController } from './controllers/list-unexpired-event-purchases-with-details-by-user-id.controller'

@Module({
  imports: [DatabaseModule, QueueModule, GeneratorsModule],
  controllers: [
    CreateEventPurchaseController,
    ListUnexpiredEventPurchasesWithDetailsByUserIdController,
    ListEventPurchasesByUserIdController,
  ],
  providers: [
    CreateEventPurchaseUseCase,
    ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase,
    ListEventPurchasesByUserIdUseCase,
  ],
})
export class EventPurchaseHttpModule {}
