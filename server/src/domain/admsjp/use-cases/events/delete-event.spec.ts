import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'

import { ResourceHasAssociationsError } from '@/core/errors/errors/resource-has-associations-error'

import { DeleteEventUseCase } from './delete-event'

let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository

let sut: DeleteEventUseCase

describe('Delete Event', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository()

    sut = new DeleteEventUseCase(
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
    )
  })

  it('should be able to delete an event', async () => {
    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const result = await sut.execute({
      id: event.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an event if there are event tickets associated to it', async () => {
    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const eventTicketFactory = makeEventTicket({
      eventId: event.id,
      lot: eventLot.lot,
    })
    await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      id: event.id,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceHasAssociationsError)
  })
})
