import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'
import { SearchParams } from '@/core/repositories/search-params'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface ListPublicEventsUseCaseRequest {
  options?: ListOptions
  searchParams?: SearchParams[]
}

type ListPublicEventsUseCaseResponse = Either<
  null,
  {
    events: Event[]
  }
>

@Injectable()
export class ListPublicEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    options = {},
    searchParams = [],
  }: ListPublicEventsUseCaseRequest): Promise<ListPublicEventsUseCaseResponse> {
    searchParams.push({
      condition: 'equals',
      field: 'visible',
      value: 1,
    })

    const date = new Date()

    searchParams.push({
      condition: 'gte',
      field: 'finalDate',
      value: date,
    })

    const events = await this.eventsRepository.list(options, searchParams)

    return success({
      events,
    })
  }
}
