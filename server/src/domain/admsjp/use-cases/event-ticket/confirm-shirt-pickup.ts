import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketAlreadyPickedUpError } from '@/core/errors/errors/ticket-already-picked-up-error'

import { EventTicketStatus } from '../../enums/event-ticket'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface ConfirmShirtPickupUseCaseRequest {
  id: EventTicket['id']
  deliveredBy: EventTicket['deliveredBy']
}

type ConfirmShirtPickupUseCaseResponse = Either<
  ResourceNotFoundError | TicketAlreadyPickedUpError,
  null
>

@Injectable()
export class ConfirmShirtPickupUseCase {
  constructor(private eventTicketsRepository: EventTicketsRepository) {}

  async execute({
    id,
    deliveredBy,
  }: ConfirmShirtPickupUseCaseRequest): Promise<ConfirmShirtPickupUseCaseResponse> {
    const eventTicket = await this.eventTicketsRepository.findById(id)

    if (!eventTicket) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventTicket.find.notFound',
          key: String(id),
        }),
      )
    }

    if (eventTicket.deliveredBy) {
      return failure(
        new TicketAlreadyPickedUpError({
          errorKey: 'eventTicket.pickup.alreadyPickedUp',
        }),
      )
    }

    eventTicket.status = EventTicketStatus.DELIVERED
    eventTicket.deliveredBy = deliveredBy
    eventTicket.deliveredAt = new Date()

    await this.eventTicketsRepository.save(eventTicket)

    return success(null)
  }
}
