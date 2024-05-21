import { Module } from '@nestjs/common'

import { ConfirmOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/confirm-order-payment'
import { CreateManualOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/create-manual-order-payment'
import { ListOrdersByTransactionIdUseCase } from '@/domain/admsjp/use-cases/orders/list-orders-by-transaction-id'
import { DatabaseModule } from '@/infra/database/database.module'
import { StorageModule } from '@/infra/storage/storage.module'

import { ConfirmOrderPaymentController } from './controllers/confirm-order-payment.controller'
import { CreateManualOrderPaymentController } from './controllers/create-manual-order-payment.controller'
import { ListOrdersByTransactionIdController } from './controllers/list-orders-by-transaction-id.controller'

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [
    CreateManualOrderPaymentController,
    ListOrdersByTransactionIdController,
    ConfirmOrderPaymentController,
  ],
  providers: [
    CreateManualOrderPaymentUseCase,
    ListOrdersByTransactionIdUseCase,
    ConfirmOrderPaymentUseCase,
  ],
})
export class OrderHttpModule {}
