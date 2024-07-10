import { Injectable } from '@nestjs/common'
import { EventPurchase } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchaseStatus } from '../../enums/event-purchase'
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'

interface ConfirmEventPurchaseUseCaseRequest {
  purchaseId: EventPurchase['id']
}

type ConfirmEventPurchaseUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class ConfirmEventPurchaseUseCase {
  constructor(private eventPurchasesRepository: EventPurchasesRepository) {}

  async execute({
    purchaseId,
  }: ConfirmEventPurchaseUseCaseRequest): Promise<ConfirmEventPurchaseUseCaseResponse> {
    const purchase = await this.eventPurchasesRepository.findById(purchaseId)

    if (!purchase) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventPurchase.find.notFound',
          key: String(purchaseId),
        }),
      )
    }

    purchase.status = EventPurchaseStatus.CONFIRMED

    await this.eventPurchasesRepository.save(purchase)

    return success(null)
  }
}
