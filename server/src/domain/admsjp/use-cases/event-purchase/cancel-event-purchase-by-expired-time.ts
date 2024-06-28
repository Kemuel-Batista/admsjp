import { Injectable } from '@nestjs/common'
import type { EventPurchase } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { LimitTimeNotExpiredError } from '@/core/errors/errors/limit-time-not-expired-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface CancelEventPurchaseByExpiredTimeUseCaseRequest {
  purchaseId: EventPurchase['id']
}

type CancelEventPurchaseByExpiredTimeUseCaseResponse = Either<
  ResourceNotFoundError | LimitTimeNotExpiredError,
  null
>

@Injectable()
export class CancelEventPurchaseByExpiredTimeUseCase {
  constructor(
    private eventPurchasesRepository: EventPurchasesRepository,
    private eventTicketsRepository: EventTicketsRepository,
  ) {}

  async execute({
    purchaseId,
  }: CancelEventPurchaseByExpiredTimeUseCaseRequest): Promise<CancelEventPurchaseByExpiredTimeUseCaseResponse> {
    const eventPurchase =
      await this.eventPurchasesRepository.findById(purchaseId)

    if (!eventPurchase) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventPurchase.find.notFound',
          key: purchaseId,
        }),
      )
    }

    const now = new Date()
    if (eventPurchase.expiresAt.getTime() > now.getTime()) {
      return failure(
        new LimitTimeNotExpiredError({
          errorKey: 'eventPurchase.delete.timeNotExpired',
        }),
      )
    }

    const eventTickets =
      await this.eventTicketsRepository.listByEventPurchaseId(purchaseId)

    for (const eventTicket of eventTickets) {
      await this.eventTicketsRepository.delete(eventTicket.id)
    }

    await this.eventPurchasesRepository.delete(purchaseId)

    return success(null)
  }
}
