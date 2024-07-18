import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface ListEventTicketsOnlyWithShirtsUseCaseRequest {
  options?: ListOptions
}

type ListEventTicketsOnlyWithShirtsUseCaseResponse = Either<
  null,
  {
    eventTickets: EventTicket[]
    count: number
  }
>

@Injectable()
export class ListEventTicketsOnlyWithShirtsUseCase {
  constructor(private eventTicketsRepository: EventTicketsRepository) {}

  async execute({
    options,
  }: ListEventTicketsOnlyWithShirtsUseCaseRequest): Promise<ListEventTicketsOnlyWithShirtsUseCaseResponse> {
    const { eventTickets, count } =
      await this.eventTicketsRepository.listOnlyWithShirts(options)

    return success({
      eventTickets,
      count,
    })
  }
}
