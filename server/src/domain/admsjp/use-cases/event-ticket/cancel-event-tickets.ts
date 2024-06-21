import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface CancelEventTicketsUseCaseRequest {
  tickets: Array<EventTicket['id']>
  requestedBy: number
}

type CancelEventTicketsUseCaseResponse = Either<
  ResourceNotFoundError | IncorrectAssociationError,
  null
>

@Injectable()
export class CancelEventTicketsUseCase {
  constructor(private eventTicketsRepository: EventTicketsRepository) {}

  async execute({
    tickets,
    requestedBy,
  }: CancelEventTicketsUseCaseRequest): Promise<CancelEventTicketsUseCaseResponse> {
    const ticketsPromises = tickets.map(async (ticket) => {
      const eventTicket = await this.eventTicketsRepository.findById(ticket)

      if (!eventTicket) {
        return failure(
          new ResourceNotFoundError({
            errorKey: 'eventTicket.find.notFound',
            key: ticket,
          }),
        )
      }

      if (eventTicket.createdBy !== requestedBy) {
        return failure(
          new IncorrectAssociationError({
            errorKey: 'eventTicket.find.incorrectAssociation',
            key: ticket,
          }),
        )
      }
    })

    await Promise.all(ticketsPromises)

    for (const eventTicketId of tickets) {
      await this.eventTicketsRepository.delete(eventTicketId)
    }

    return success(null)
  }
}
