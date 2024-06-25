import { makeEvent } from 'test/factories/make-event'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'

import { GetEventBySlugUseCase } from './get-event-by-slug'

let inMemoryEventsRepository: InMemoryEventsRepository

let sut: GetEventBySlugUseCase

describe('Get event by slug', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()

    sut = new GetEventBySlugUseCase(inMemoryEventsRepository)
  })

  it('should be able to get details of event by slug', async () => {
    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const result = await sut.execute({
      slug: event.slug,
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
