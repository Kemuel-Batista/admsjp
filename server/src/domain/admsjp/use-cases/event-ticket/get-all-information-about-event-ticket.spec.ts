import { makeDepartment } from 'test/factories/make-department'
import { makeEvent } from 'test/factories/make-event'
import { makeEventLot } from 'test/factories/make-event-lot'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeOrder } from 'test/factories/make-order'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { GetAllInformationAboutEventTicketUseCase } from './get-all-information-about-event-ticket'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository

let sut: GetAllInformationAboutEventTicketUseCase

describe('Get all information about event ticket', () => {
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
    inMemoryOrdersRepository = new InMemoryOrdersRepository()

    sut = new GetAllInformationAboutEventTicketUseCase(
      inMemoryEventTicketsRepository,
      inMemoryOrdersRepository,
    )
  })

  it('should be able to get all information about event ticket', async () => {
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

    const eventTicketFactory = makeEventTicket({
      eventId: event.id,
      userId: user.id,
      lot: eventLot.lot,
    })
    const eventTicket =
      await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const orderFactory = makeOrder({
      transactionId: eventTicket.id,
    })
    await inMemoryOrdersRepository.create(orderFactory)

    const result = await sut.execute({
      eventTicketId: eventTicket.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      eventTicketDetails: expect.objectContaining({
        event: expect.objectContaining({
          id: event.id,
          title: event.title,
          department: expect.objectContaining({
            name: department.name,
          }),
        }),
        eventLot: expect.objectContaining({
          lot: eventLot.lot,
          value: eventLot.value,
        }),
        orders: expect.arrayContaining([
          expect.objectContaining({
            transactionId: orderFactory.transactionId,
          }),
        ]),
      }),
    })
  })
})
