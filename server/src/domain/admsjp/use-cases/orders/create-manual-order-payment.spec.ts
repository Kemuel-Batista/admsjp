import { makeEventTicket } from 'test/factories/make-event-ticket'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeUploader } from 'test/storage/fake-storage'

import { OrderPaymentMethod, OrderStatus } from '../../enums/order'
import { CreateManualOrderPaymentUseCase } from './create-manual-order-payment'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let fakeUploader: FakeUploader

let sut: CreateManualOrderPaymentUseCase

describe('Create manual order payment', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryUsersRepository,
      inMemoryEventLotsRepository,
    )
    fakeUploader = new FakeUploader()

    sut = new CreateManualOrderPaymentUseCase(
      inMemoryOrdersRepository,
      inMemoryEventTicketsRepository,
      fakeUploader,
    )
  })

  it('should be able to create a new manual order payment', async () => {
    const eventTicketFactory = makeEventTicket()
    const eventTicket =
      await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      transactionId: eventTicket.id,
      fileName: 'attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryOrdersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          transactionId: eventTicket.id,
          status: OrderStatus.WAITING_CONFIRMATION,
          paymentMethod: OrderPaymentMethod.MANUAL,
        }),
      ]),
    )
  })
})
