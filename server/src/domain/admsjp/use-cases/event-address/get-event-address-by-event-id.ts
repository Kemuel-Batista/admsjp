import { Injectable } from '@nestjs/common'
import { EventAddress } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface GetEventAddressByEventIdUseCaseRequest {
  eventId: EventAddress['eventId']
}

type GetEventAddressByEventIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventAddress: EventAddress
  }
>

@Injectable()
export class GetEventAddressByEventIdUseCase {
  constructor(
    private eventAddressesRepository: EventAddressesRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    eventId,
  }: GetEventAddressByEventIdUseCaseRequest): Promise<GetEventAddressByEventIdUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(eventId),
        }),
      )
    }

    const eventAddress =
      await this.eventAddressesRepository.findByEventId(eventId)

    if (!eventAddress) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventAddress.find.notFound',
          key: String(eventId),
        }),
      )
    }

    return success({
      eventAddress,
    })
  }
}
