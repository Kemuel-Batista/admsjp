import { makeEventTicket } from 'test/factories/make-event-ticket'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeUploader } from 'test/storage/fake-storage'

import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'

import { OrderPaymentMethod, OrderStatus } from '../../enums/order'
import { CreateManualOrderPaymentUseCase } from './create-manual-order-payment'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let fakeUploader: FakeUploader

let sut: CreateManualOrderPaymentUseCase

describe('Create manual order payment', () => {
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
    fakeUploader = new FakeUploader()

    sut = new CreateManualOrderPaymentUseCase(
      inMemoryOrdersRepository,
      inMemoryEventTicketsRepository,
      fakeUploader,
    )
  })

  it('should be able to create a new manual order payment', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventTicketFactory = makeEventTicket({
      userId: user.id,
    })
    const eventTicket =
      await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      transactionId: eventTicket.id,
      fileName: 'attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      paidBy: user.id,
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

  it('should not be able to create a new manual order payment if the ticket owner is not the same', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventTicketFactory = makeEventTicket({
      userId: 2,
    })
    const eventTicket =
      await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      transactionId: eventTicket.id,
      fileName: 'attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      paidBy: user.id,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(IncorrectAssociationError)
  })

  it('should be able to create a new manual order payment and update event ticket expiresAt to null', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventTicketFactory = makeEventTicket({
      userId: user.id,
      expiresAt: new Date(),
    })
    const eventTicket =
      await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute({
      transactionId: eventTicket.id,
      fileName: 'attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      paidBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          expiresAt: null,
        }),
      ]),
    )
  })
})
