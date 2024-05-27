import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface GetEventByIdUseCaseRequest {
  id: Event['id']
}

type GetEventByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    event: Event
  }
>

@Injectable()
export class GetEventByIdUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    id,
  }: GetEventByIdUseCaseRequest): Promise<GetEventByIdUseCaseResponse> {
    const event = await this.eventsRepository.findById(id)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: id.toString(),
        }),
      )
    }

    return success({
      event,
    })
  }
}
