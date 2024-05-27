import { Injectable } from '@nestjs/common'
import { EventLot } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

import { EventsRepository } from '../../repositories/events-repository'

export interface CreateEventLotUseCaseRequest {
  eventId?: EventLot['eventId']
  quantity?: EventLot['quantity']
  lot?: EventLot['lot']
  value?: EventLot['value']
  status?: EventLot['status']
  createdBy?: EventLot['createdBy']
}

type CreateEventLotUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventLot: EventLot
  }
>

@Injectable()
export class CreateEventLotUseCase {
  constructor(
    private eventLotsRepository: EventLotsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    eventId,
    quantity,
    status = 1,
    value,
    createdBy,
  }: CreateEventLotUseCaseRequest): Promise<CreateEventLotUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(eventId),
        }),
      )
    }

    const maxEventLot =
      await this.eventLotsRepository.findMaxLotByEventId(eventId)

    const eventLot = await this.eventLotsRepository.create({
      eventId,
      quantity,
      lot: maxEventLot + 1,
      status,
      value,
      createdBy,
    })

    return success({
      eventLot,
    })
  }
}
