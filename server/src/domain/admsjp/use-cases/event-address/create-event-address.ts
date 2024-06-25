import { Injectable } from '@nestjs/common'
import { EventAddress } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'

import { EventsRepository } from '../../repositories/events-repository'

export interface CreateEventAddressUseCaseRequest {
  eventId?: EventAddress['eventId']
  street?: EventAddress['street']
  number?: EventAddress['number']
  complement?: EventAddress['complement']
  neighborhood?: EventAddress['neighborhood']
  state?: EventAddress['state']
  city?: EventAddress['city']
  latitude?: EventAddress['latitude']
  longitude?: EventAddress['longitude']
  createdBy?: EventAddress['createdBy']
}

type CreateEventAddressUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventAddress: EventAddress
  }
>

@Injectable()
export class CreateEventAddressUseCase {
  constructor(
    private eventAddressesRepository: EventAddressesRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    eventId,
    street,
    complement,
    neighborhood,
    number,
    city,
    state,
    latitude,
    longitude,
    createdBy,
  }: CreateEventAddressUseCaseRequest): Promise<CreateEventAddressUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(eventId),
        }),
      )
    }

    const eventAddress = await this.eventAddressesRepository.create({
      eventId,
      street,
      complement,
      neighborhood,
      number,
      city,
      state,
      latitude,
      longitude,
      createdBy,
    })

    return success({
      eventAddress,
    })
  }
}
