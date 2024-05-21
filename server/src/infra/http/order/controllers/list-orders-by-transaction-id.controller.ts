import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { ListOrdersByTransactionIdUseCase } from '@/domain/admsjp/use-cases/orders/list-orders-by-transaction-id'

@Controller('/transactions/:transactionId')
export class ListOrdersByTransactionIdController {
  constructor(
    private listOrdersByTransactionIdUseCase: ListOrdersByTransactionIdUseCase,
  ) {}

  @Get()
  async handle(
    @Param('transactionId', paramsValidationPipe) transactionId: ParamsSchema,
  ) {
    const result = await this.listOrdersByTransactionIdUseCase.execute({
      transactionId,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const orders = result.value.orders

    return {
      orders,
    }
  }
}
