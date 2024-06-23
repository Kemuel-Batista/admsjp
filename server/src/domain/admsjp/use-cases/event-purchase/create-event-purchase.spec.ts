import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeParameter } from 'test/factories/make-parameter'
import { makeUser } from 'test/factories/make-user'
import { FakeTicketGenerator } from 'test/generators/fake-ticket-generator'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryParametersRepository } from 'test/repositories/in-memory-parameters-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error'

import { CreateEventPurchaseUseCase } from './create-event-purchase'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryParametersRepository: InMemoryParametersRepository
let fakeTicketGenerator: FakeTicketGenerator

let sut: CreateEventPurchaseUseCase

describe('Create Event Ticket', () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryEventLotsRepository,
    )
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryParametersRepository = new InMemoryParametersRepository()
    inMemoryEventPurchasesRepository = new InMemoryEventPurchasesRepository(
      inMemoryEventsRepository,
    )

    fakeTicketGenerator = new FakeTicketGenerator()

    sut = new CreateEventPurchaseUseCase(
      inMemoryEventPurchasesRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
      inMemoryUsersRepository,
      fakeTicketGenerator,
    )

    const parameterFactory = makeParameter({
      key: 'order.payment.type',
    })
    await inMemoryParametersRepository.create(parameterFactory)
  })

  it('should be able to create a new event purchase', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
      fulfilledQuantity: 30,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const events = [
      {
        eventLotId: eventLot.id,
        quantity: 2,
      },
    ]

    const result = await sut.execute({
      buyerId: user.id,
      eventId: event.id,
      eventLotInfo: events,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          createdBy: user.id,
          eventId: event.id,
          lot: eventLot.lot,
          ticket: expect.any(String),
        }),
      ]),
    )
  })

  it('should be able to generate a new ticket number when creating a new event ticket', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const events = [
      {
        userId: user.id,
        eventId: event.id,
        lot: eventLot.lot,
        quantity: 1,
      },
    ]

    await sut.execute(events)

    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')

    const result = await sut.execute(events)

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          createdBy: user.id,
          eventId: event.id,
          lot: eventLot.lot,
          ticket: `${year}${month}${day}EV0001`,
        }),
        expect.objectContaining({
          createdBy: user.id,
          eventId: event.id,
          lot: eventLot.lot,
          ticket: `${year}${month}${day}EV0002`,
        }),
      ]),
    )
  })

  it('should not be able to create a new event ticket if all events tickets are sold out', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
      quantity: 50,
      fulfilledQuantity: 50,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const events = [
      {
        userId: user.id,
        eventId: event.id,
        lot: eventLot.lot,
        quantity: 1,
      },
    ]

    const result = await sut.execute(events)

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(TicketsSoldOutError)
  })

  it('should not be able to create a new event ticket if event lot is not associated to event', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: 2,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const events = [
      {
        userId: user.id,
        eventId: event.id,
        lot: eventLot.lot,
        quantity: 1,
      },
    ]

    const result = await sut.execute(events)

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a new event ticket if event not exists', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: 2,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const events = [
      {
        userId: user.id,
        eventId: 1232131,
        lot: eventLot.lot,
        quantity: 1,
      },
    ]

    const result = await sut.execute(events)

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to create a order payment when event is free', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
      value: 0,
      fulfilledQuantity: 540,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const events = [
      {
        userId: user.id,
        eventId: event.id,
        lot: eventLot.lot,
        quantity: 1,
      },
    ]

    const result = await sut.execute(events)

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          createdBy: user.id,
          eventId: event.id,
          lot: eventLot.lot,
          ticket: expect.any(String),
          expiresAt: null,
        }),
      ]),
    )

    expect(inMemoryOrdersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          transactionId: expect.any(String),
          paidAt: expect.any(Date),
        }),
      ]),
    )
  })
})
