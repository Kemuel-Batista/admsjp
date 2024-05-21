import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ListOrdersByTransactionIdUseCase } from './list-orders-by-transaction-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository

let sut: ListOrdersByTransactionIdUseCase

describe('List orders by transaction id', () => {
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

    sut = new ListOrdersByTransactionIdUseCase(inMemoryOrdersRepository)
  })

  it('should be able to list orders by transaction id', async () => {
    const eventTicketFactory = makeEventTicket()
    const eventTicket =
      await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const orderFactory = makeOrder({
      transactionId: eventTicket.id,
    })
    await inMemoryOrdersRepository.create(orderFactory)

    const result = await sut.execute({
      transactionId: 1,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      orders: expect.arrayContaining([
        expect.objectContaining({
          status: orderFactory.status,
        }),
      ]),
    })
  })
})
