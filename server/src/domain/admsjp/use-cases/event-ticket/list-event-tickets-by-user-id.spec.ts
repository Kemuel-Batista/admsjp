import { makeDepartment } from 'test/factories/make-department'
import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ListEventTicketsByUserIdUseCase } from './list-event-tickets-by-user-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository

let sut: ListEventTicketsByUserIdUseCase

describe('List event tickets by user id', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryUsersRepository,
      inMemoryDepartmentsRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
    )

    sut = new ListEventTicketsByUserIdUseCase(
      inMemoryEventTicketsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to list event tickets with details by user id', async () => {
    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent({
      departmentId: department.id,
    })
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
      userId: user.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      eventTickets: expect.arrayContaining([
        expect.objectContaining({
          userId: user.id,
          eventId: event.id,
          lot: eventLot.lot,
          eventLot: expect.objectContaining({
            lot: eventLot.lot,
          }),
          event: expect.objectContaining({
            id: event.id,
            title: event.title,
            department: expect.objectContaining({
              name: department.name,
            }),
          }),
        }),
      ]),
    })
  })
})
