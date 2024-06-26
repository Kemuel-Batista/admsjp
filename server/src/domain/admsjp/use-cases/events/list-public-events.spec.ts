import { makeEvent } from 'test/factories/make-event'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'

import { ListPublicEventsUseCase } from './list-public-events'

let inMemoryEventsRepository: InMemoryEventsRepository

let sut: ListPublicEventsUseCase

describe('List Events', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()

    sut = new ListPublicEventsUseCase(inMemoryEventsRepository)
  })

  it('should be able to fetch all events with admin user', async () => {
    const eventFactory01 = makeEvent()
    const event01 = await inMemoryEventsRepository.create(eventFactory01)

    const eventFactory02 = makeEvent()
    const event02 = await inMemoryEventsRepository.create(eventFactory02)

    const result = await sut.execute({
      options: {},
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.events).toHaveLength(2)
      expect(result.value.events).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: event01.title,
          }),
          expect.objectContaining({
            title: event02.title,
          }),
        ]),
      )
    }
  })

  it('should be able to fetch paginated all events with admin user', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryEventsRepository.create(makeEvent())
    }

    const result = await sut.execute({
      options: {
        allRecords: false,
        page: 1,
        pageSize: 2,
      },
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.events).toHaveLength(2)
    }
  })

  it('should not be able to fetch events with final date gte to now date', async () => {
    const eventFactory01 = makeEvent({
      finalDate: new Date('2020-01-01'),
    })
    await inMemoryEventsRepository.create(eventFactory01)

    const result = await sut.execute({
      options: {},
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.events).toHaveLength(0)
    }
  })

  it('should be able to display events whose end date is greater than the current date', async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1) // Tomorrow

    const eventFactory01 = makeEvent({
      finalDate: tomorrow,
    })
    await inMemoryEventsRepository.create(eventFactory01)

    const result = await sut.execute({
      options: {},
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.events).toHaveLength(1)
    }
  })
})
