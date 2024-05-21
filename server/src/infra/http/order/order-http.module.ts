import { Module } from '@nestjs/common'

import { CreateManualOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/create-manual-order-payment'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateManualOrderPaymentController } from './controllers/create-manual-order-payment.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateManualOrderPaymentController],
  providers: [CreateManualOrderPaymentUseCase],
})
export class OrderHttpModule {}
