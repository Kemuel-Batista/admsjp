import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventPurchase } from 'test/factories/make-event-purchase'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeUser } from 'test/factories/make-user'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ListEventTicketsByPurchaseIdUseCase } from './list-event-tickets-by-purchase-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository

let sut: ListEventTicketsByPurchaseIdUseCase

describe('List event tickets by event id', () => {
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

    sut = new ListEventTicketsByPurchaseIdUseCase(
      inMemoryEventTicketsRepository,
      inMemoryEventPurchasesRepository,
    )
  })

  it('should be able to list event tickets with details by event id', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

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
      purchaseId: eventPurchase.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      eventTickets: expect.arrayContaining([
        expect.objectContaining({
          createdBy: user.id,
          eventId: event.id,
          lot: eventLot.lot,
          user: expect.objectContaining({
            email: user.email,
            name: user.name,
          }),
          eventLot: expect.objectContaining({
            lot: eventLot.lot,
          }),
        }),
      ]),
    })
  })
})
