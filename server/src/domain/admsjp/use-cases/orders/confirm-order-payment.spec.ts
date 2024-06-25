import { makeOrder } from 'test/factories/make-order'
import { makeUser } from 'test/factories/make-user'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { OrderStatus } from '../../enums/order'
import { ConfirmOrderPaymentUseCase } from './confirm-order-payment'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: ConfirmOrderPaymentUseCase

describe('Confirm order payment', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new ConfirmOrderPaymentUseCase(inMemoryOrdersRepository)
  })

  it('should be able to confirm order payment', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const orderFactory = makeOrder()
    const order = await inMemoryOrdersRepository.create(orderFactory)

    const result = await sut.execute({
      id: order.id,
      confirmedBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryOrdersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: order.id,
          confirmedBy: user.id,
          status: OrderStatus.PAID,
          paidAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })
})
