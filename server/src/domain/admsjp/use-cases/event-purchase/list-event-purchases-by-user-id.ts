import { Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { EventPurchaseWithEvent } from '../../types/event-purchase'

interface ListEventPurchasesByUserIdUseCaseRequest {
  buyerId: User['id']
}

type ListEventPurchasesByUserIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventPurchases: EventPurchaseWithEvent[]
  }
>

@Injectable()
export class ListEventPurchasesByUserIdUseCase {
  constructor(
    private eventPurchasesRepository: EventPurchasesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    buyerId,
  }: ListEventPurchasesByUserIdUseCaseRequest): Promise<ListEventPurchasesByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(buyerId)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.id.notFound',
        }),
      )
    }

    const eventPurchases =
      await this.eventPurchasesRepository.listByBuyerId(buyerId)

    return success({
      eventPurchases,
    })
  }
}
