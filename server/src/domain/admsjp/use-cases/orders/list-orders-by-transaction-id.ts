import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'

import { Either, success } from '@/core/either'

import { OrdersRepository } from '../../repositories/orders-repository'

interface ListOrdersByTransactionIdUseCaseRequest {
  transactionId: Order['transactionId']
}

type ListOrdersByTransactionIdUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

@Injectable()
export class ListOrdersByTransactionIdUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    transactionId,
  }: ListOrdersByTransactionIdUseCaseRequest): Promise<ListOrdersByTransactionIdUseCaseResponse> {
    const orders =
      await this.ordersRepository.listByTransactionId(transactionId)

    return success({
      orders,
    })
  }
}
