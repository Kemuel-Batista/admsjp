import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/either'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

type ClearExpiredPurchasesJobResponse = Either<null, null>

@Injectable()
export class ClearExpiredPurchasesJob {
  constructor(
    private eventPurchasesRepository: EventPurchasesRepository,
    private eventTicketsRepository: EventTicketsRepository,
  ) {}

  async execute(): Promise<ClearExpiredPurchasesJobResponse> {
    const eventPurchases =
      await this.eventPurchasesRepository.listCloseToExpiry()

    for (const eventPurchase of eventPurchases) {
      const now = new Date()

      if (eventPurchase.expiresAt < now) {
        const eventTickets =
          await this.eventTicketsRepository.listByEventPurchaseId(
            eventPurchase.id,
          )

        for (const eventTicket of eventTickets) {
          await this.eventTicketsRepository.delete(eventTicket.id)
        }

        await this.eventPurchasesRepository.delete(eventPurchase.id)
      }
    }

    return success(null)
  }
}
