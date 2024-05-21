import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventsRepository } from '../../repositories/events-repository'
import { EventTicketWithUserAndEventLot } from '../../types/event-ticket'

interface ListEventTicketsByEventIdUseCaseRequest {
  eventId: EventTicket['eventId']
}

type ListEventTicketsByEventIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventTickets: EventTicketWithUserAndEventLot[]
  }
>

@Injectable()
export class ListEventTicketsByEventIdUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    eventId,
  }: ListEventTicketsByEventIdUseCaseRequest): Promise<ListEventTicketsByEventIdUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(eventId),
        }),
      )
    }

    const eventTickets =
      await this.eventTicketsRepository.listDetailsByEventId(eventId)

    return success({
      eventTickets,
    })
  }
}
