import { Injectable } from '@nestjs/common'
import { EventLot } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ListOptions } from '@/core/repositories/list-options'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface ListEventLotByEventIdUseCaseRequest {
  eventId: EventLot['eventId']
  options: ListOptions
}

type ListEventLotByEventIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventLots: EventLot[]
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

    const eventLots = await this.eventLotsRepository.listByEventId(
      eventId,
      options,
    )

    return success({
      eventLots,
    })
  }
}
