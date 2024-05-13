import { makeEvent } from 'test/factories/make-event'
import { makeEventAddress } from 'test/factories/make-event-address'
import { InMemoryEventAddressesRepository } from 'test/repositories/in-memory-event-addresses-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'

import { GetEventAddressByEventIdUseCase } from './get-event-address-by-event-id'

let inMemoryEventAddressesRepository: InMemoryEventAddressesRepository
let inMemoryEventsRepository: InMemoryEventsRepository

let sut: GetEventAddressByEventIdUseCase

describe('Get event address by event ID', () => {
  beforeEach(() => {
    inMemoryEventAddressesRepository = new InMemoryEventAddressesRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()

    sut = new GetEventAddressByEventIdUseCase(
      inMemoryEventAddressesRepository,
      inMemoryEventsRepository,
    )
  })

  it('should be able to get event address by event ID', async () => {
    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventAddressFactory = makeEventAddress({
      eventId: event.id,
    })
    const eventAddress =
      await inMemoryEventAddressesRepository.create(eventAddressFactory)

    const result = await sut.execute({
      eventId: event.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toMatchObject({
      eventAddress: expect.objectContaining({
        street: eventAddress.street,
        number: eventAddress.number,
      }),
    })
  })
})
