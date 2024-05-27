import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/either'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

type ClearExpiredTicketsJobResponse = Either<null, null>

@Injectable()
export class ClearExpiredTicketsJob {
  constructor(private eventTicketsRepository: EventTicketsRepository) {}

  async execute(): Promise<ClearExpiredTicketsJobResponse> {
    const eventTickets = await this.eventTicketsRepository.listCloseToExpiry()

    for (const eventTicket of eventTickets) {
      const now = new Date()

      if (eventTicket.expiresAt < now) {
        await this.eventTicketsRepository.delete(eventTicket.id)
      }
    }

    return success(null)
  }
}
