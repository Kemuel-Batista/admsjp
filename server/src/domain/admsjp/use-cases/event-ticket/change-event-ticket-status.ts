import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface ChangeEventTicketStatusUseCaseRequest {
  id: EventTicket['id']
  status: EventTicket['status']
  updatedBy: EventTicket['updatedBy']
}

type ChangeEventTicketStatusUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

@Injectable()
export class ChangeEventTicketStatusUseCase {
  constructor(private eventTicketsRepository: EventTicketsRepository) {}

  async execute({
    id,
    status,
    updatedBy,
  }: ChangeEventTicketStatusUseCaseRequest): Promise<ChangeEventTicketStatusUseCaseResponse> {
    const eventTicket = await this.eventTicketsRepository.findById(id)

    if (!eventTicket) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventTicket.find.notFound',
          key: String(id),
        }),
      )
    }

    eventTicket.status = status
    eventTicket.updatedBy = updatedBy
    eventTicket.updatedAt = new Date()

    await this.eventTicketsRepository.save(eventTicket)

    return success(null)
  }
}
