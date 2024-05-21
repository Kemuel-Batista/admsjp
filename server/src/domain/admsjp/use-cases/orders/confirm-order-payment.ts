import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { OrderStatus } from '../../enums/order'
import { OrdersRepository } from '../../repositories/orders-repository'

interface ConfirmOrderPaymentUseCaseRequest {
  id: Order['id']
  confirmedBy: Order['confirmedBy']
}

type ConfirmOrderPaymentUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class ConfirmOrderPaymentUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
    confirmedBy,
  }: ConfirmOrderPaymentUseCaseRequest): Promise<ConfirmOrderPaymentUseCaseResponse> {
    const order = await this.ordersRepository.findById(id)

    if (!order) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'order.find.notFound',
          key: id.toString(),
        }),
      )
    }

    order.confirmedBy = confirmedBy
    order.status = OrderStatus.PAID
    order.paidAt = new Date()

    await this.ordersRepository.update(order)

    return success(null)
  }
}
