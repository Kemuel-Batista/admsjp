import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceHasAssociationsError } from '@/core/errors/errors/resource-has-associations-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
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
    private eventPurchasesRepository: EventPurchasesRepository,
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

    const { eventPurchases } =
      await this.eventPurchasesRepository.listByEventId(event.id)

    if (eventPurchases.length > 0) {
      return failure(
        new ResourceHasAssociationsError({
          errorKey: 'event.delete.hasAssociations',
        }),
      )
    }

    await this.eventsRepository.delete(id)

    return success(null)
  }
}
