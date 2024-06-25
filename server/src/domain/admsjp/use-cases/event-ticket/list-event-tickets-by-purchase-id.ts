import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventTicketWithEventLot } from '../../types/event-ticket'

interface ListEventTicketsByPurchaseIdUseCaseRequest {
  purchaseId: EventTicket['eventPurchaseId']
}

type ListEventTicketsByPurchaseIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventTickets: EventTicketWithEventLot[]
  }
>

@Injectable()
export class ListEventTicketsByPurchaseIdUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private eventPurchasesRepository: EventPurchasesRepository,
  ) {}

  async execute({
    purchaseId,
  }: ListEventTicketsByPurchaseIdUseCaseRequest): Promise<ListEventTicketsByPurchaseIdUseCaseResponse> {
    const eventPurchase =
      await this.eventPurchasesRepository.findById(purchaseId)

    if (!eventPurchase) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventPurchase.find.notFound',
          key: String(purchaseId),
        }),
      )
    }

    const eventTickets =
      await this.eventTicketsRepository.listByEventPurchaseId(purchaseId)

    return success({
      eventTickets,
    })
  }
}
