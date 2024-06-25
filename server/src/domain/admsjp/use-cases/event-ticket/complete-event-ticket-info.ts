import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface CompleteEventTicketInfoUseCaseRequest {
  id: string
  eventPurchaseId: string
  name: string
  email: string
  cpf: string
  phone: string
  birthday: Date
  requestedBy: number
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

  async execute({
    id,
    eventPurchaseId,
    name,
    email,
    cpf,
    phone,
    birthday,
    requestedBy,
  }: CompleteEventTicketInfoUseCaseRequest): Promise<CompleteEventTicketInfoUseCaseResponse> {
    const eventTicket = await this.eventTicketsRepository.findById(id)

    if (!eventTicket) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventTicket.find.notFound',
          key: id.toString(),
        }),
      )
    }

    const eventPurchase =
      await this.eventPurchasesRepository.findById(eventPurchaseId)

    if (!eventPurchase) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventPurchase.find.notFound',
          key: id.toString(),
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

    if (eventTicket.eventPurchaseId !== eventPurchaseId) {
      return failure(
        new IncorrectAssociationError({
          errorKey: 'eventTicket.find.incorrectAssociation',
        }),
      )
    }

    eventTicket.name = name
    eventTicket.email = email
    eventTicket.cpf = cpf
    eventTicket.phone = phone
    eventTicket.birthday = birthday

    await this.eventTicketsRepository.save(eventTicket)

    return success(null)
  }
}
