import { makeEventPurchase } from 'test/factories/make-event-purchase'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ListOrdersByTransactionIdUseCase } from './list-orders-by-transaction-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository

let sut: ListOrdersByTransactionIdUseCase

describe('List orders by transaction id', () => {
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
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
    )
    inMemoryOrdersRepository = new InMemoryOrdersRepository()

    sut = new ListOrdersByTransactionIdUseCase(inMemoryOrdersRepository)
  })

  it('should be able to list orders by transaction id', async () => {
    const eventPurchaseFactory = makeEventPurchase()
    const eventPurchase =
      await inMemoryEventPurchasesRepository.create(eventPurchaseFactory)

    const orderFactory = makeOrder({
      transactionId: eventPurchase.id,
    })
    const order = await inMemoryOrdersRepository.create(orderFactory)

    const result = await sut.execute({
      transactionId: order.transactionId,
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
