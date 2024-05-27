import { faker } from '@faker-js/faker'
import { Decimal } from '@prisma/client/runtime/library'
import { makeEvent } from 'test/factories/make-event'
import { makeUser } from 'test/factories/make-user'
import { InMemoryEventAddressesRepository } from 'test/repositories/in-memory-event-addresses-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CreateEventAddressUseCase } from './create-event-address'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventAddressesRepository: InMemoryEventAddressesRepository
let inMemoryEventsRepository: InMemoryEventsRepository

let sut: CreateEventAddressUseCase

describe('Create event address', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventAddressesRepository = new InMemoryEventAddressesRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()

    sut = new CreateEventAddressUseCase(
      inMemoryEventAddressesRepository,
      inMemoryEventsRepository,
    )
  })

  it('should be able to create a new event address', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const result = await sut.execute({
      eventId: event.id,
      street: faker.location.streetName(),
      complement: faker.location.secondaryAddress(),
      neighborhood: faker.location.streetName(),
      number: faker.location.zipCode(),
      city: 1,
      state: 2,
      latitude: new Decimal(faker.location.latitude()),
      longitude: new Decimal(faker.location.longitude()),
      createdBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventAddressesRepository.items).toHaveLength(1)
    expect(inMemoryEventAddressesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          eventId: event.id,
        }),
      ]),
    )
  })
})
