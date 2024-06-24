import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/either'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'

type ClearExpiredPurchasesJobResponse = Either<null, null>

@Injectable()
export class ClearExpiredPurchasesJob {
  constructor(private eventPurchasesRepository: EventPurchasesRepository) {}

  async execute(): Promise<ClearExpiredPurchasesJobResponse> {
    const eventPurchases =
      await this.eventPurchasesRepository.listCloseToExpiry()

    for (const eventPurchase of eventPurchases) {
      const now = new Date()

      if (eventPurchase.expiresAt < now) {
        await this.eventPurchasesRepository.delete(eventPurchase.id)
      }
    }

    return success(null)
  }
}
