import { makeEvent } from 'test/factories/make-event'
import { makeUser } from 'test/factories/make-user'
import { InMemoryEventAddressesRepository } from 'test/repositories/in-memory-event-addresses-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeUploader } from 'test/storage/fake-storage'

import { UpdateEventUseCase } from './update-event'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventAddressesRepository: InMemoryEventAddressesRepository
let fakeUploader: FakeUploader

let sut: UpdateEventUseCase

describe('Update Event', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventAddressesRepository = new InMemoryEventAddressesRepository()

    fakeUploader = new FakeUploader()

    sut = new UpdateEventUseCase(
      inMemoryEventsRepository,
      inMemoryEventAddressesRepository,
      inMemoryEventLotsRepository,
      fakeUploader,
    )
  })

  it('should be able to edit an existent event', async () => {
    const user = makeUser()
    inMemoryUsersRepository.create({
      ...user,
      profileId: user.profileId,
    })

    const event = makeEvent()
  })
})
