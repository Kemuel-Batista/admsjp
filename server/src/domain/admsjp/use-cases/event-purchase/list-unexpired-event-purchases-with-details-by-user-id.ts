import { Injectable } from '@nestjs/common'
import { EventPurchase } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { EventPurchaseWithEventTicketsAndLot } from '../../types/event-purchase'

interface ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseRequest {
  buyerId: EventPurchase['buyerId']
}

type ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventPurchases: EventPurchaseWithEventTicketsAndLot[]
  }
>

@Injectable()
export class ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase {
  constructor(
    private eventPurchasesRepository: EventPurchasesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    buyerId,
  }: ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseRequest): Promise<ListUnexpiredEventPurchasesWithDetailsByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(buyerId)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.id.notFound',
        }),
      )
    }

    const eventPurchases =
      await this.eventPurchasesRepository.listUnexpiredByUserId(buyerId)

    return success({
      eventPurchases,
    })
  }
}
