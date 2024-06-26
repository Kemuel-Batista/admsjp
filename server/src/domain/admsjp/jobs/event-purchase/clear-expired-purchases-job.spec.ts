import { faker } from '@faker-js/faker'
import { makeEventPurchase } from 'test/factories/make-event-purchase'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ClearExpiredPurchasesJob } from './clear-expired-purchases-job'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository

let sut: ClearExpiredPurchasesJob

describe('Clear Expired Tickets Job', () => {
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

    sut = new ClearExpiredPurchasesJob(
      inMemoryEventPurchasesRepository,
      inMemoryEventTicketsRepository,
    )
  })

  it('should be able to clear expired purchases', async () => {
    const eventPurchaseFactory = makeEventPurchase({
      expiresAt: faker.date.past(),
    })
    await inMemoryEventPurchasesRepository.create(eventPurchaseFactory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventPurchasesRepository.items).toHaveLength(0)
  })
})
