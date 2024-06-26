import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'

import { ListEventLotByEventIdUseCase } from './list-event-lot-by-event-id'

let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository

let sut: ListEventLotByEventIdUseCase

describe('List event lots by event id', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()

    sut = new ListEventLotByEventIdUseCase(
      inMemoryEventLotsRepository,
      inMemoryEventsRepository,
    )
  })

  it('should be able to fetch event lots by event id', async () => {
    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLot01 = makeEventLot({
      eventId: event.id,
      lot: 1,
    })
    await inMemoryEventLotsRepository.create(eventLot01)

    const eventLot02 = makeEventLot({
      eventId: event.id,
      lot: 2,
    })
    await inMemoryEventLotsRepository.create(eventLot02)

    const result = await sut.execute({
      eventId: event.id,
      options: {},
    })

    expect(result.isSuccess()).toBe(true)
    if (result.isSuccess()) {
      expect(result.value.eventLots).toHaveLength(2)
      expect(result.value.eventLots).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            lot: 1,
          }),
          expect.objectContaining({
            lot: 2,
          }),
        ]),
      )
    }
  })
})
