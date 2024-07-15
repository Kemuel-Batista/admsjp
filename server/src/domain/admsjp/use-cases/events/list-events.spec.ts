import { randomUUID } from 'node:crypto'

import { makeDepartment } from 'test/factories/make-department'
import { makeEvent } from 'test/factories/make-event'
import { makeProfile } from 'test/factories/make-profile'
import { makeUser } from 'test/factories/make-user'
import { makeUsersOnProfiles } from 'test/factories/make-users-on-profiles'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'
import { InMemoryUsersOnProfilesRepository } from 'test/repositories/in-memory-users-on-profiles-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ListEventsUseCase } from './list-events'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProfilesRepository: InMemoryProfilesRepository
let inMemoryUsersOnProfilesRepository: InMemoryUsersOnProfilesRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository

let sut: ListEventsUseCase

describe('List Events', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    inMemoryUsersOnProfilesRepository = new InMemoryUsersOnProfilesRepository(
      inMemoryProfilesRepository,
    )

    inMemoryEventsRepository = new InMemoryEventsRepository()

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

    sut = new ListEventsUseCase(
      inMemoryEventsRepository,
      inMemoryEventPurchasesRepository,
      inMemoryEventTicketsRepository,
    )
  })

  it('should be able to fetch all events with admin user', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const profileFactory = makeProfile({
      name: 'ADMIN',
    })
    const profile = await inMemoryProfilesRepository.create(profileFactory)

    const usersOnProfilesFactory = makeUsersOnProfiles({
      userId: user.id,
      profileId: profile.id,
    })
    await inMemoryUsersOnProfilesRepository.create(usersOnProfilesFactory)

    const eventFactory01 = makeEvent()
    const event01 = await inMemoryEventsRepository.create(eventFactory01)

    const eventFactory02 = makeEvent()
    const event02 = await inMemoryEventsRepository.create(eventFactory02)

    const result = await sut.execute({
      departmentId: user.departmentId,
      roles: [profile.name],
      options: {},
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.events).toHaveLength(2)
      expect(result.value.events).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: event01.title,
          }),
          expect.objectContaining({
            title: event02.title,
          }),
        ]),
      )
    }
  })

  it('should be able to fetch parsed events with non-admin user', async () => {
    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const userFactory = makeUser({
      departmentId: department.id,
    })
    const user = await inMemoryUsersRepository.create(userFactory)

    const profileFactory = makeProfile({
      name: 'GENERAL',
    })
    const profile = await inMemoryProfilesRepository.create(profileFactory)

    const usersOnProfilesFactory = makeUsersOnProfiles({
      userId: user.id,
      profileId: profile.id,
    })
    await inMemoryUsersOnProfilesRepository.create(usersOnProfilesFactory)

    const eventFactory01 = makeEvent({
      departmentId: department.id,
    })
    const event01 = await inMemoryEventsRepository.create(eventFactory01)

    const eventFactory02 = makeEvent({ departmentId: randomUUID() })
    await inMemoryEventsRepository.create(eventFactory02)

    const result = await sut.execute({
      departmentId: user.departmentId,
      roles: [profile.name],
      options: {},
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.events).toHaveLength(1)
      expect(result.value.events).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: event01.title,
          }),
        ]),
      )
    }
  })

  it('should be able to fetch paginated all events with admin user', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const profileFactory = makeProfile({
      name: 'ADMIN',
    })
    const profile = await inMemoryProfilesRepository.create(profileFactory)

    const usersOnProfilesFactory = makeUsersOnProfiles({
      userId: user.id,
      profileId: profile.id,
    })
    await inMemoryUsersOnProfilesRepository.create(usersOnProfilesFactory)

    for (let i = 1; i <= 22; i++) {
      await inMemoryEventsRepository.create(makeEvent())
    }

    const result = await sut.execute({
      departmentId: user.departmentId,
      roles: [profile.name],
      options: {
        allRecords: null,
        page: 1,
        pageSize: 2,
      },
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.events).toHaveLength(2)
    }
  })
})
