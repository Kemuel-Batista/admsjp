import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { EventTicketWithEventAndEventLot } from '../../types/event-ticket'

interface ListEventTicketsByUserIdUseCaseRequest {
  createdBy: EventTicket['createdBy']
}

type ListEventTicketsByUserIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventTickets: EventTicketWithEventAndEventLot[]
  }
>

@Injectable()
export class ListEventTicketsByUserIdUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    createdBy,
  }: ListEventTicketsByUserIdUseCaseRequest): Promise<ListEventTicketsByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(createdBy)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.id.notFound',
        }),
      )
    }

    const eventTickets =
      await this.eventTicketsRepository.listDetailsByUserId(createdBy)

    return success({
      eventTickets,
    })
  }
}
