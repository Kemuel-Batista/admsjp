import { makeEvent } from 'test/factories/make-event'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'

import { GetEventByIdUseCase } from './get-event-by-id'

let inMemoryEventsRepository: InMemoryEventsRepository

let sut: GetEventByIdUseCase

describe('Get event by id', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()

    sut = new GetEventByIdUseCase(inMemoryEventsRepository)
  })

  it('should be able to get details of event by id', async () => {
    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const result = await sut.execute({
      id: event.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(result.value).toMatchObject({
      event: expect.objectContaining({
        title: event.title,
        description: event.description,
      }),
    })
  })
})
