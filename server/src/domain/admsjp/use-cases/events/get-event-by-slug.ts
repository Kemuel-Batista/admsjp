import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface GetEventBySlugUseCaseRequest {
  slug: Event['slug']
}

type GetEventBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    event: Event
  }
>

@Injectable()
export class GetEventBySlugUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    slug,
  }: GetEventBySlugUseCaseRequest): Promise<GetEventBySlugUseCaseResponse> {
    const event = await this.eventsRepository.findBySlug(slug)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: slug,
        }),
      )
    }

    return success({
      event,
    })
  }
}
