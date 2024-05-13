import { Injectable } from '@nestjs/common'
import { EventLot } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { IListOptions } from '@/core/repositories/list-options'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface ListEventLotByEventIdUseCaseRequest {
  eventId: EventLot['eventId']
  options: IListOptions
  searchParams: ISearchParamDTO[]
}

type ListEventLotByEventIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventLots: EventLot[]
    count: number
  }
>

@Injectable()
export class ListEventLotByEventIdUseCase {
  constructor(
    private eventLotsRepository: EventLotsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    eventId,
    options = {},
    searchParams = [],
  }: ListEventLotByEventIdUseCaseRequest): Promise<ListEventLotByEventIdUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(eventId),
        }),
      )
    }

    searchParams.push({
      condition: 'equals',
      field: 'eventId',
      value: eventId,
    })

    const { eventLots, count } = await this.eventLotsRepository.list(
      options,
      searchParams,
    )

    return success({
      eventLots,
      count,
    })
  }
}
