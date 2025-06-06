import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { EventLotStatus } from '../../enums/event-lot'
import { EditEventLotUseCase } from './edit-event-lot'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository

let sut: EditEventLotUseCase

describe('Edit event lot', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()

    inMemoryEventPurchasesRepository = new InMemoryEventPurchasesRepository(
      inMemoryUsersRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
    )

    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryEventLotsRepository,
      inMemoryEventPurchasesRepository,
    )

    sut = new EditEventLotUseCase(
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
    )
  })

  it('should be able to edit an event lot with all information', async () => {
    const eventLotFactory = makeEventLot({
      quantity: 50,
      value: 60,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const result = await sut.execute({
      id: eventLot.id,
      eventId: eventLot.eventId,
      lot: eventLot.lot,
      quantity: 100,
      value: 1000,
      status: EventLotStatus.ACTIVE,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventLotsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: eventLot.id,
          eventId: eventLot.eventId,
          lot: eventLot.lot,
          quantity: 100,
          value: 1000,
          status: EventLotStatus.ACTIVE,
        }),
      ]),
    )
  })

  it('should be able to edit just quantity because have ticket associations to lot', async () => {
    const eventLotFactory = makeEventLot({
      quantity: 50,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const eventTicketFactory = makeEventTicket({
      eventLotId: eventLot.id,
    })
    await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      id: eventLot.id,
      eventId: eventLot.eventId,
      lot: eventLot.lot,
      quantity: 100,
      status: EventLotStatus.ACTIVE,
      value: 1000,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventLotsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          eventId: eventLot.eventId,
          lot: eventLot.lot,
          quantity: 100,
          value: eventLot.value,
          status: eventLot.status,
        }),
      ]),
    )
  })
})
