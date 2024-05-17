import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeUser } from 'test/factories/make-user'
import { FakeTicketGenerator } from 'test/generators/fake-ticket-generator'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error'

import { CreateEventTicketUseCase } from './create-event-ticket'

let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let fakeTicketGenerator: FakeTicketGenerator

let sut: CreateEventTicketUseCase

describe('Create Event Ticket', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryUsersRepository,
      inMemoryEventLotsRepository,
    )
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository()

    fakeTicketGenerator = new FakeTicketGenerator()

    sut = new CreateEventTicketUseCase(
      inMemoryEventTicketsRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
      inMemoryUsersRepository,
      inMemoryOrdersRepository,
      fakeTicketGenerator,
    )
  })

  it('should be able to create a new event ticket', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const result = await sut.execute({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toMatchObject({
      eventTicket: expect.objectContaining({
        ticket: expect.any(String),
      }),
    })

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: user.id,
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

    await sut.execute({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })

    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')

    const result = await sut.execute({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: user.id,
          eventId: event.id,
          lot: eventLot.lot,
          ticket: `${year}${month}${day}EV0001`,
        }),
        expect.objectContaining({
          userId: user.id,
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

    const result = await sut.execute({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })

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

    const result = await sut.execute({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })

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

    const result = await sut.execute({
      userId: user.id,
      eventId: 54654,
      lot: eventLot.lot,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a new event ticket if already exists a ticket for current user', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
      value: 0,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const eventTicketFactory = makeEventTicket({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })
    await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })

  it('should be able to create a order payment when event is free', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const eventLotFactory = makeEventLot({
      eventId: event.id,
      value: 0,
    })
    const eventLot = await inMemoryEventLotsRepository.create(eventLotFactory)

    const result = await sut.execute({
      userId: user.id,
      eventId: event.id,
      lot: eventLot.lot,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: user.id,
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
          transactionId: event.id,
          paidAt: expect.any(Date),
        }),
      ]),
    )
  })
})
