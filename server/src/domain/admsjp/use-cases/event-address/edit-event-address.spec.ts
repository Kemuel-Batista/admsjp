import { makeEvent } from 'test/factories/make-event'
import { makeEventAddress } from 'test/factories/make-event-address'
import { InMemoryEventAddressesRepository } from 'test/repositories/in-memory-event-addresses-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'

import { EventType } from '@/domain/admsjp/enums/event'

import { InvalidEventTypeError } from '../../../../core/errors/errors/invalid-event-type-error'
import { EditEventAddressUseCase } from './edit-event-address'

let inMemoryEventAddressesRepository: InMemoryEventAddressesRepository
let inMemoryEventsRepository: InMemoryEventsRepository

let sut: EditEventAddressUseCase

describe('Update event address', () => {
  beforeEach(() => {
    inMemoryEventAddressesRepository = new InMemoryEventAddressesRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()

    sut = new EditEventAddressUseCase(
      inMemoryEventAddressesRepository,
      inMemoryEventsRepository,
    )
  })

  it('should be able to update an event address', async () => {
    const eventFactory = makeEvent({
      eventType: EventType.PRESENCIAL,
    })
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventAddressFactory = makeEventAddress({
      eventId: event.id,
    })
    const eventAddress =
      await inMemoryEventAddressesRepository.create(eventAddressFactory)

    const result = await sut.execute({
      id: eventAddress.id,
      street: 'Rua do teste',
      number: '321A',
      complement: eventAddress.complement,
      neighborhood: eventAddress.neighborhood,
      state: eventAddress.state,
      city: eventAddress.city,
      latitude: eventAddress.latitude,
      longitude: eventAddress.longitude,
      updatedBy: 1,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventAddressesRepository.items[0]).toMatchObject({
      street: 'Rua do teste',
      number: '321A',
    })
  })

  it('should not be able to edit an event address that event is remote', async () => {
    const eventFactory = makeEvent({
      eventType: EventType.REMOTO,
    })
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventAddressFactory = makeEventAddress({
      eventId: event.id,
    })
    const eventAddress =
      await inMemoryEventAddressesRepository.create(eventAddressFactory)

    const result = await sut.execute({
      id: eventAddress.id,
      street: 'Rua do teste',
      number: '321A',
      complement: eventAddress.complement,
      neighborhood: eventAddress.neighborhood,
      state: eventAddress.state,
      city: eventAddress.city,
      latitude: eventAddress.latitude,
      longitude: eventAddress.longitude,
      updatedBy: 1,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidEventTypeError)
  })
})
