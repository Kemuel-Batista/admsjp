import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeUser } from 'test/factories/make-user'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ListEventTicketsByEventIdUseCase } from './list-event-tickets-by-event-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository

let sut: ListEventTicketsByEventIdUseCase

describe('List event tickets by event id', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryUsersRepository,
      inMemoryEventLotsRepository,
    )

    sut = new ListEventTicketsByEventIdUseCase(
      inMemoryEventTicketsRepository,
      inMemoryEventsRepository,
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

    const eventTicketFactory = makeEventTicket({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })
    await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      eventId: event.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      eventTickets: expect.arrayContaining([
        expect.objectContaining({
          userId: user.id,
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
