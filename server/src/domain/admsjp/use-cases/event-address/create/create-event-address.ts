import { Injectable } from '@nestjs/common'
import { EventAddress } from '@prisma/client'

import { CreateEventAddressDTO } from '@/domain/admsjp/dtos/event-address'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'

import { FindEventByIdUseCase } from '../../events/find/by-id/find-event-by-id'

@Injectable()
export class CreateEventAddressUseCase {
  constructor(
    private eventAddressesRepository: EventAddressesRepository,
    private findEventByIdUseCase: FindEventByIdUseCase,
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
  }: CreateEventAddressDTO): Promise<EventAddress> {
    await this.findEventByIdUseCase.execute(eventId, {
      throwIfFound: true,
    })

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

    return eventAddress
  }
}
