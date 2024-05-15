import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error'

import { OrderPaymentMethod, OrderStatus } from '../../enums/order'
import { TicketGenerator } from '../../generators/ticket-generator'
import { EventLotsRepository } from '../../repositories/event-lots-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventsRepository } from '../../repositories/events-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { UsersRepository } from '../../repositories/users-repository'

export interface CreateEventTicketUseCaseRequest {
  lot: EventTicket['lot']
  eventId: EventTicket['eventId']
  userId: EventTicket['id']
}

type CreateEventTicketUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError | TicketsSoldOutError,
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
    private ordersRepository: OrdersRepository,
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

    const alreadyExistsAnEventTicketForThisUser =
      await this.eventTicketsRepository.findByEventIdAndUserId(eventId, userId)

    // Evento gratuito só pode apenas uma inscrição por usuário
    if (eventLot.value === 0 && alreadyExistsAnEventTicketForThisUser) {
      return failure(
        new ResourceAlreadyExistsError({
          errorKey: 'eventTicket.create.keyAlreadyExists',
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

    const now = new Date()
    const expiresAt = new Date(now.getTime() + 15 * 60000) // 15 * 60000 milissegundos == 15 min

    const eventTicket = await this.eventTicketsRepository.create({
      lot,
      eventId,
      userId,
      ticket,
      expiresAt,
    })

    if (eventLot.value === 0) {
      await this.ordersRepository.create({
        paidAt: new Date(),
        paymentMethod: OrderPaymentMethod.PIX,
        transactionId: eventTicket.id,
        status: OrderStatus.PAID,
      })

      eventTicket.expiresAt = null

      await this.eventTicketsRepository.update(eventTicket)
    }

    return success({
      eventTicket,
    })
  }
}
