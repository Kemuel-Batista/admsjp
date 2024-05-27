import { makeEvent } from 'test/factories/make-event'
import { makeUser } from 'test/factories/make-user'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CreateEventLotUseCase } from './create-event-lot'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository

let sut: CreateEventLotUseCase

describe('Create event lot', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()

    sut = new CreateEventLotUseCase(
      inMemoryEventLotsRepository,
      inMemoryEventsRepository,
    )
  })

  it('should be able to create a new event lot to event', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)
    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const result = await sut.execute({
      eventId: event.id,
      lot: 1,
      quantity: 1,
      value: 100,
      createdBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventLotsRepository.items).toHaveLength(1)
    expect(inMemoryEventLotsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          eventId: event.id,
          lot: 1,
          value: 100,
        }),
      ]),
    )
  })
})
