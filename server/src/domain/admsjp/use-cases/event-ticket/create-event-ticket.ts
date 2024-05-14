import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error'

import { TicketGenerator } from '../../generators/ticket-generator'
import { EventLotsRepository } from '../../repositories/event-lots-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventsRepository } from '../../repositories/events-repository'
import { UsersRepository } from '../../repositories/users-repository'

export interface CreateEventTicketUseCaseRequest {
  lot: EventTicket['lot']
  eventId: EventTicket['eventId']
  userId: EventTicket['id']
}

type CreateEventTicketUseCaseResponse = Either<
  ResourceNotFoundError | TicketsSoldOutError,
  {
    eventTicket: EventTicket
  }
>

@Injectable()
export class CreateEventTicketUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private eventsRepository: EventsRepository,
    private eventLotsRepository: EventLotsRepository,
    private usersRepository: UsersRepository,
    private ticketGenerator: TicketGenerator,
  ) {}

  async execute({
    userId,
    eventId,
    lot,
  }: CreateEventTicketUseCaseRequest): Promise<CreateEventTicketUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: eventId.toString(),
        }),
      )
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.notFound',
          key: userId.toString(),
        }),
      )
    }

    const eventLot = await this.eventLotsRepository.findByEventIdAndLot(
      eventId,
      lot,
    )

    if (!eventLot) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventLot.find.notFound',
          key: lot.toString(),
        }),
      )
    }

    if (eventLot.quantity === eventLot.fulfilledQuantity) {
      return failure(
        new TicketsSoldOutError({
          errorKey: 'eventLot.sales.sold-out',
          key: lot.toString(),
        }),
      )
    }

    eventLot.fulfilledQuantity += 1
    await this.eventLotsRepository.update(eventLot)

    const lastTicket = await this.eventTicketsRepository.lastTicket()
    const ticket = await this.ticketGenerator.generate('EV', lastTicket) // EV = Events

    const eventTicket = await this.eventTicketsRepository.create({
      lot,
      eventId,
      userId,
      ticket,
    })

    return success({
      eventTicket,
    })
  }
}
