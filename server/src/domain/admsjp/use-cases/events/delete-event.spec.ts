import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventPurchase } from 'test/factories/make-event-purchase'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceHasAssociationsError } from '@/core/errors/errors/resource-has-associations-error'

import { DeleteEventUseCase } from './delete-event'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository

let sut: DeleteEventUseCase

describe('Delete Event', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryEventLotsRepository,
    )
    inMemoryEventPurchasesRepository = new InMemoryEventPurchasesRepository(
      inMemoryUsersRepository,
      inMemoryEventsRepository,
      inMemoryEventTicketsRepository,
    )

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

    const eventPurchaseFactory = makeEventPurchase({
      eventId: event.id,
    })
    const eventPurchase =
      await inMemoryEventPurchasesRepository.create(eventPurchaseFactory)

    const eventTicketFactory = makeEventTicket({
      eventPurchaseId: eventPurchase.id,
      eventLotId: eventLot.id,
    })
    await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      id: event.id,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceHasAssociationsError)
  })
})
