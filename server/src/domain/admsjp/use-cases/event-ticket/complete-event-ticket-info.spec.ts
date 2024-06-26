import { makeDepartment } from 'test/factories/make-department'
import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventPurchase } from 'test/factories/make-event-purchase'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CompleteEventTicketInfoUseCase } from './complete-event-ticket-info'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository

let sut: CompleteEventTicketInfoUseCase

describe('Complete event ticket info', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryEventLotsRepository,
    )
    inMemoryEventPurchasesRepository = new InMemoryEventPurchasesRepository(
      inMemoryUsersRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
    )

    sut = new CompleteEventTicketInfoUseCase(
      inMemoryEventTicketsRepository,
      inMemoryEventPurchasesRepository,
    )
  })

  it('should be able to complete an event ticket information', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const eventFactory = makeEvent({
      departmentId: department.id,
    })
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
      eventLotId: eventLot.id,
      eventPurchaseId: eventPurchase.id,
    })
    const eventTicket =
      await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute(
      [
        {
          id: eventTicket.id,
          eventPurchaseId: eventPurchase.id,
          name: user.name,
          email: user.email,
          cpf: '123124234312',
          phone: '81989943240',
          birthday: new Date(),
        },
      ],
      user.id,
    )

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: eventTicket.id,
          name: user.name,
          email: user.email,
          cpf: '123124234312',
          phone: '81989943240',
          birthday: expect.any(Date),
          createdBy: user.id,
        }),
      ]),
    )
  })
})
