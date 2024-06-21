import { Injectable } from '@nestjs/common'
import { EventTicket, User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error'
import { i18n } from '@/core/i18n/i18n'

import { OrderPaymentMethod, OrderStatus } from '../../enums/order'
import { TicketGenerator } from '../../generators/ticket-generator'
import { EventLotsRepository } from '../../repositories/event-lots-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventsRepository } from '../../repositories/events-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { ParametersRepository } from '../../repositories/parameters-repository'
import { EventSocket } from '../../websocket/event-socket'

export interface CreateEventTicketUseCaseRequest {
  lot: EventTicket['lot']
  eventId: EventTicket['eventId']
  quantity: number
  userId: User['id']
}

type CreateEventTicketUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError | TicketsSoldOutError,
  null
>

@Injectable()
export class CreateEventTicketUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private eventsRepository: EventsRepository,
    private eventLotsRepository: EventLotsRepository,
    private ordersRepository: OrdersRepository,
    private ticketGenerator: TicketGenerator,
    private parametersRepository: ParametersRepository,
    private eventSocket: EventSocket,
  ) {}

  async execute(
    data: CreateEventTicketUseCaseRequest[],
  ): Promise<CreateEventTicketUseCaseResponse> {
    const { eventId, userId } = data[0]

    const orderPaymentType =
      await this.parametersRepository.findByKey('order.payment.type')

    if (!orderPaymentType) {
      await this.eventSocket.emit({
        to: `purchase:${userId}`,
        event: 'order-processing-error',
        data: {
          errorMessage: i18n.t('parameter.find.notFound'),
        },
      })

      return failure(
        new ResourceNotFoundError({
          errorKey: 'parameter.find.notFound',
          key: 'order.payment.type',
        }),
      )
    }

    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: eventId.toString(),
        }),
      )
    }

    for (const event of data) {
      const eventLot = await this.eventLotsRepository.findByEventIdAndLot(
        eventId,
        event.lot,
      )

      if (!eventLot) {
        return failure(
          new ResourceNotFoundError({
            errorKey: 'eventLot.find.notFound',
            key: event.lot.toString(),
          }),
        )
      }

      if (eventLot.quantity === eventLot.fulfilledQuantity) {
        await this.eventSocket.emit({
          to: `purchase:${userId}`,
          event: 'order-processing-error',
          data: {
            errorMessage: i18n.t('eventLot.sales.sold-out'),
          },
        })

        return failure(
          new TicketsSoldOutError({
            errorKey: 'eventLot.sales.sold-out',
            key: event.lot.toString(),
          }),
        )
      }

      eventLot.fulfilledQuantity += 1
      await this.eventLotsRepository.save(eventLot)

      const lastTicket = await this.eventTicketsRepository.lastTicket()
      const ticket = await this.ticketGenerator.generate('EV', lastTicket) // EV = Events

      const now = new Date()
      const expiresAt = new Date(now.getTime() + 15) // 15 * 60000 milissegundos == 15 min

      const eventTicket = await this.eventTicketsRepository.create({
        eventId: event.eventId,
        lot: eventLot.lot,
        ticket,
        expiresAt,
        createdBy: event.userId,
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

      const data = {
        eventTicketId: eventTicket.id,
        orderPaymentType: orderPaymentType.value,
      }

      await this.eventSocket.emit({
        to: `purchase:${userId}`,
        event: 'order-processing-completed',
        data,
      })
    }

    return success(null)
  }
}
