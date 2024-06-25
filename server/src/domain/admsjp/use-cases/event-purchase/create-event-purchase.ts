import { Injectable } from '@nestjs/common'
import { EventPurchase } from '@prisma/client'

import { Either, failure } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error'

import { EventPurchaseStatus } from '../../enums/event-purchase'
import { TicketGenerator } from '../../generators/ticket-generator'
import { EventLotsRepository } from '../../repositories/event-lots-repository'
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventsRepository } from '../../repositories/events-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface CreateEventPurchaseUseCaseRequest {
  eventId: number
  buyerId: number
  eventLotInfo: {
    eventLotId?: string
    quantity?: number
  }[]
}

type CreateEventPurchaseUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventPurchase: EventPurchase
  }
>

@Injectable()
export class CreateEventPurchaseUseCase {
  constructor(
    private eventPurchasesRepository: EventPurchasesRepository,
    private eventsRepository: EventsRepository,
    private eventLotsRepository: EventLotsRepository,
    private eventTicketsRepository: EventTicketsRepository,
    private usersRepository: UsersRepository,
    private ticketGenerator: TicketGenerator,
  ) {}

  async execute({
    eventId,
    buyerId,
    eventLotInfo,
  }: CreateEventPurchaseUseCaseRequest): Promise<CreateEventPurchaseUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)
    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(eventId),
        }),
      )
    }

    const buyer = await this.usersRepository.findById(buyerId)
    if (!buyer) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.notFound',
          key: String(buyerId),
        }),
      )
    }

    const eventLotsPromise = eventLotInfo.map(async (item) => {
      const eventLot = await this.eventLotsRepository.findById(item.eventLotId)

      if (!eventLot) {
        return failure(
          new ResourceNotFoundError({
            errorKey: 'eventLot.find.notFound',
            key: String(item.eventLotId),
          }),
        )
      }

      if (eventLot.quantity === eventLot.fulfilledQuantity) {
        return failure(
          new TicketsSoldOutError({
            errorKey: 'eventLot.sales.sold-out',
            key: eventLot.lot.toString(),
          }),
        )
      }

      const remainingQuantity = eventLot.quantity - eventLot.fulfilledQuantity

      if (item.quantity > remainingQuantity) {
        return failure(
          new ResourceNotFoundError({
            errorKey: 'eventLot.sales.remaining-qty-not-enough',
            key: String(item.eventLotId),
          }),
        )
      }

      eventLot.fulfilledQuantity += item.quantity
      await this.eventLotsRepository.save(eventLot)

      return eventLot
    })

    await Promise.all(eventLotsPromise)

    const lastInvoiceNumber =
      await this.eventPurchasesRepository.lastInvoiceNumber()
    const invoiceNumber = await this.ticketGenerator.generate(
      'EV',
      lastInvoiceNumber,
    ) // EV = Events

    const now = new Date()
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000) // 15 * 60000 milissegundos == 15 min

    const eventPurchase = await this.eventPurchasesRepository.create({
      eventId,
      buyerId,
      invoiceNumber,
      expiresAt,
      status: EventPurchaseStatus.NEW,
    })

    const eventTicketsPromise = eventLotInfo.flatMap((item, lotIndex) => {
      return Array.from({ length: item.quantity }, (_, ticketIndex) => {
        const index = lotIndex * 1000 + ticketIndex

        return this.eventTicketsRepository.create({
          eventPurchaseId: eventPurchase.id,
          eventLotId: item.eventLotId,
          ticket: `${eventPurchase.invoiceNumber}-${index}`,
          qrCodeImage: '',
          qrCodeText: '',
        })
      })
    })

    await Promise.all(eventTicketsPromise)
  }
}
