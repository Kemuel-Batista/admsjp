import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ListOptions } from '@/core/repositories/list-options'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventsRepository } from '../../repositories/events-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { EventPurchaseWithOrder } from '../../types/event-purchase'

interface ListEventPurchasesByEventIdUseCaseRequest {
  eventId: Event['id']
  options?: ListOptions
}

type ListEventPurchasesByEventIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventPurchases: EventPurchaseWithOrder[]
    count: number
  }
>

@Injectable()
export class ListEventPurchasesByEventIdUseCase {
  constructor(
    private eventPurchasesRepository: EventPurchasesRepository,
    private eventsRepository: EventsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    eventId,
    options,
  }: ListEventPurchasesByEventIdUseCaseRequest): Promise<ListEventPurchasesByEventIdUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
        }),
      )
    }

    const { eventPurchases, count } =
      await this.eventPurchasesRepository.listByEventId(eventId, options)

    const eventPurchasesWithOrder: EventPurchaseWithOrder[] = []

    for (const eventPurchase of eventPurchases) {
      const order = await this.ordersRepository.findByTransactionId(
        eventPurchase.id,
      )

      eventPurchasesWithOrder.push({
        ...eventPurchase,
        buyerEmail: eventPurchase.user.email,
        buyerName: eventPurchase.user.name,
        order,
      })
    }

    return success({
      eventPurchases: eventPurchasesWithOrder,
      count,
    })
  }
}
