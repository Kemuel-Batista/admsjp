import { faker } from '@faker-js/faker'
import { makeEventTicket } from 'test/factories/make-event-ticket'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ClearExpiredTicketsJob } from './clear-expired-tickets-job'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository

let sut: ClearExpiredTicketsJob

describe('Clear Expired Tickets Job', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()

    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryUsersRepository,
      inMemoryDepartmentsRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
    )

    sut = new ClearExpiredTicketsJob(inMemoryEventTicketsRepository)
  })

  it('should be able to clear expired tickets', async () => {
    const eventTicketFactory = makeEventTicket({
      expiresAt: faker.date.past(),
    })
    await inMemoryEventTicketsRepository.create(eventTicketFactory)

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventTicketsRepository.items).toHaveLength(0)
  })
})
