import { randomUUID } from 'node:crypto'

import { makeEventPurchase } from 'test/factories/make-event-purchase'
import { makeUser } from 'test/factories/make-user'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeUploader } from 'test/storage/fake-storage'

import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'

import { OrderPaymentMethod, OrderStatus } from '../../enums/order'
import { CreateManualOrderPaymentUseCase } from './create-manual-order-payment'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let fakeUploader: FakeUploader

let sut: CreateManualOrderPaymentUseCase

describe('Create manual order payment', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()

    inMemoryEventPurchasesRepository = new InMemoryEventPurchasesRepository(
      inMemoryUsersRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
    )

    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryEventLotsRepository,
      inMemoryEventPurchasesRepository,
    )

    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    fakeUploader = new FakeUploader()

    sut = new CreateManualOrderPaymentUseCase(
      inMemoryOrdersRepository,
      inMemoryEventPurchasesRepository,
      fakeUploader,
    )
  })

  it('should be able to create a new manual order payment', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventPurchaseFactory = makeEventPurchase({
      buyerId: user.id,
    })
    const eventPurchase =
      await inMemoryEventPurchasesRepository.create(eventPurchaseFactory)

    const result = await sut.execute({
      transactionId: eventPurchase.id,
      fileName: 'attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      paidBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryOrdersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          transactionId: eventPurchase.id,
          status: OrderStatus.WAITING_CONFIRMATION,
          paymentMethod: OrderPaymentMethod.MANUAL,
        }),
      ]),
    )
  })

  it('should not be able to create a new manual order payment if the ticket owner is not the same', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventPurchaseFactory = makeEventPurchase({
      buyerId: randomUUID(),
    })
    const eventPurchase =
      await inMemoryEventPurchasesRepository.create(eventPurchaseFactory)

    const result = await sut.execute({
      transactionId: eventPurchase.id,
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

    const eventPurchaseFactory = makeEventPurchase({
      buyerId: user.id,
      expiresAt: new Date(),
    })
    const eventPurchase =
      await inMemoryEventPurchasesRepository.create(eventPurchaseFactory)

    const result = await sut.execute({
      transactionId: eventPurchase.id,
      fileName: 'attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      paidBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventPurchasesRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          expiresAt: null,
        }),
      ]),
    )
  })
})
