import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryParametersRepository } from 'test/repositories/in-memory-parameters-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeEventSocket } from 'test/websocket/fake-event-socket'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FindLastEventTicketUnexpiredUseCase } from './find-last-event-ticket-unexpired'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryParametersRepository: InMemoryParametersRepository
let fakeEventSocket: FakeEventSocket

let sut: FindLastEventTicketUnexpiredUseCase

describe('Find last event ticket unexpired', () => {
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
    inMemoryParametersRepository = new InMemoryParametersRepository()
    fakeEventSocket = new FakeEventSocket()

    sut = new FindLastEventTicketUnexpiredUseCase(
      inMemoryEventTicketsRepository,
      inMemoryParametersRepository,
      fakeEventSocket,
    )
  })

  it('should not be able to send event socket if parameter key does not exist', async () => {
    const result = await sut.execute({
      userId: 1,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
