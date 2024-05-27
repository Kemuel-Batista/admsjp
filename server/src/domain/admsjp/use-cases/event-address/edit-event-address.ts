import { Injectable } from '@nestjs/common'
import { EventAddress } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventType } from '@/domain/admsjp/enums/event'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

import { InvalidEventTypeError } from '../../../../core/errors/errors/invalid-event-type-error'

interface EditEventAddressUseCaseRequest {
  id: EventAddress['id']
  street: EventAddress['street']
  number: EventAddress['number']
  complement: EventAddress['complement']
  neighborhood: EventAddress['neighborhood']
  state: EventAddress['state']
  city: EventAddress['city']
  latitude: EventAddress['latitude']
  longitude: EventAddress['longitude']
  updatedBy: EventAddress['updatedBy']
}

type EditEventAddressUseCaseResponse = Either<
  ResourceNotFoundError | IncorrectAssociationError | InvalidEventTypeError,
  {
    eventAddress: EventAddress
  }
>

@Injectable()
export class EditEventAddressUseCase {
  constructor(
    private eventAddressesRepository: EventAddressesRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    id,
    street,
    number,
    complement,
    neighborhood,
    state,
    city,
    latitude,
    longitude,
    updatedBy,
  }: EditEventAddressUseCaseRequest): Promise<EditEventAddressUseCaseResponse> {
    const eventAddress = await this.eventAddressesRepository.findById(id)

    if (!eventAddress) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventAddress.find.notFound',
          key: String(id),
        }),
      )
    }

    const event = await this.eventsRepository.findById(eventAddress.eventId)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(eventAddress.eventId),
        }),
      )
    }

    if (eventAddress.eventId !== event.id) {
      return failure(
        new IncorrectAssociationError({
          errorKey: 'eventAddress.find.incorrectAssociation',
        }),
      )
    }

    if (event.eventType === EventType.REMOTO) {
      return failure(
        new InvalidEventTypeError({
          errorKey: 'event.find.invalidEventType',
          key: String(event.eventType),
        }),
      )
    }

    eventAddress.street = street
    eventAddress.number = number
    eventAddress.complement = complement
    eventAddress.neighborhood = neighborhood
    eventAddress.state = state
    eventAddress.city = city
    eventAddress.latitude = latitude
    eventAddress.longitude = longitude
    eventAddress.updatedBy = updatedBy

    await this.eventAddressesRepository.update(eventAddress)

    return success({
      eventAddress,
    })
  }
}
