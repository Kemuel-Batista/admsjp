import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceHasAssociationsError } from '@/core/errors/errors/resource-has-associations-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventLotsRepository } from '../../repositories/event-lots-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventsRepository } from '../../repositories/events-repository'

interface DeleteEventUseCaseRequest {
  id: Event['id']
}

type DeleteEventUseCaseResponse = Either<
  ResourceNotFoundError | ResourceHasAssociationsError,
  null
>

@Injectable()
export class DeleteEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private eventLotsRepository: EventLotsRepository,
    private eventTicketsRepository: EventTicketsRepository,
  ) {}

  async execute({
    id,
  }: DeleteEventUseCaseRequest): Promise<DeleteEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(id)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(id),
        }),
      )
    }

    const eventLots = await this.eventLotsRepository.listByEventId(event.id, {})

    for (const eventLot of eventLots) {
      const eventTickets = await this.eventTicketsRepository.listByEventLotId(
        eventLot.id,
      )

      if (eventTickets.length > 0) {
        return failure(
          new ResourceHasAssociationsError({
            errorKey: 'event.delete.hasAssociations',
          }),
        )
      }
    }

    await this.eventsRepository.delete(id)

    return success(null)
  }
}
