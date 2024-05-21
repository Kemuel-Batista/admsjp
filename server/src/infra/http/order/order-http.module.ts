import { Module } from '@nestjs/common'

import { CreateManualOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/create-manual-order-payment'
import { ListOrdersByTransactionIdUseCase } from '@/domain/admsjp/use-cases/orders/list-orders-by-transaction-id'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateManualOrderPaymentController } from './controllers/create-manual-order-payment.controller'
import { ListOrdersByTransactionIdController } from './controllers/list-orders-by-transaction-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateManualOrderPaymentController,
    ListOrdersByTransactionIdController,
  ],
  providers: [
    CreateManualOrderPaymentUseCase,
    ListOrdersByTransactionIdUseCase,
  ],
})
export class OrderHttpModule {}
