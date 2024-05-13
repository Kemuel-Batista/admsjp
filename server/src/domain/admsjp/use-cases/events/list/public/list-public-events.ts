import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { Either, success } from '@/core/either'
import { IListOptions } from '@/core/repositories/list-options'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface ListPublicEventsUseCaseRequest {
  options?: IListOptions
  searchParams?: ISearchParamDTO[]
}

type ListPublicEventsUseCaseResponse = Either<
  null,
  {
    events: Event[]
    count: number
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

    const { events, count } = await this.eventsRepository.list(
      options,
      searchParams,
    )

    return success({
      events,
      count,
    })
  }
}
