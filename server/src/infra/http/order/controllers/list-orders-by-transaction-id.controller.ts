import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { z } from 'zod'

import { ListOrdersByTransactionIdUseCase } from '@/domain/admsjp/use-cases/orders/list-orders-by-transaction-id'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const paramsSchema = z.coerce.number().int().positive()
const paramValidationPipe = new ZodValidationPipe(paramsSchema)
type ParamSchema = z.infer<typeof paramsSchema>

@Controller('/transactions/:transactionId')
export class ListOrdersByTransactionIdController {
  constructor(
    private listOrdersByTransactionIdUseCase: ListOrdersByTransactionIdUseCase,
  ) {}

  @Get()
  async handle(
    @Param('transactionId', paramValidationPipe) transactionId: ParamSchema,
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
