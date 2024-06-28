import { Injectable } from '@nestjs/common'
import type { EventTicket, User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface CompleteEventTicketInfoUseCaseRequest {
  id?: EventTicket['id']
  eventPurchaseId?: EventTicket['eventPurchaseId']
  name?: EventTicket['name']
  email?: EventTicket['email']
  cpf?: EventTicket['cpf']
  phone?: EventTicket['phone']
  birthday?: EventTicket['birthday']
  shirtSize?: EventTicket['shirtSize']
}

type CompleteEventTicketInfoUseCaseResponse = Either<
  ResourceNotFoundError | IncorrectAssociationError,
  null
>

@Injectable()
export class CompleteEventTicketInfoUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private eventPurchasesRepository: EventPurchasesRepository,
  ) {}

  async execute(
    data: CompleteEventTicketInfoUseCaseRequest[],
    requestedBy: User['id'],
  ): Promise<CompleteEventTicketInfoUseCaseResponse> {
    const eventTicketsPromise = data.map(async (item) => {
      const eventTicket = await this.eventTicketsRepository.findById(item.id)

      if (!eventTicket) {
        return failure(
          new ResourceNotFoundError({
            errorKey: 'eventTicket.find.notFound',
            key: String(item.id),
          }),
        )
      }

      const eventPurchase = await this.eventPurchasesRepository.findById(
        item.eventPurchaseId,
      )

      if (!eventPurchase) {
        return failure(
          new ResourceNotFoundError({
            errorKey: 'eventPurchase.find.notFound',
            key: String(item.id),
          }),
        )
      }

      if (eventPurchase.buyerId !== requestedBy) {
        return failure(
          new IncorrectAssociationError({
            errorKey: 'eventPurchase.find.incorrectAssociation',
          }),
        )
      }

      if (eventTicket.eventPurchaseId !== item.eventPurchaseId) {
        return failure(
          new IncorrectAssociationError({
            errorKey: 'eventTicket.find.incorrectAssociation',
          }),
        )
      }
    })

    await Promise.all(eventTicketsPromise)

    for (const item of data) {
      const eventTicket = await this.eventTicketsRepository.findById(item.id)

      eventTicket.name = item.name
      eventTicket.email = item.email
      eventTicket.cpf = item.cpf
      eventTicket.phone = item.phone
      eventTicket.birthday = item.birthday
      eventTicket.shirtSize = item.shirtSize

      await this.eventTicketsRepository.save(eventTicket)
    }

    return success(null)
  }
}
