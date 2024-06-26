import { makeDepartment } from 'test/factories/make-department'
import { makeEvent } from 'test/factories/make-event'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { UserProfile } from '@/domain/admsjp/enums/user'

import { ListEventsUseCase } from './list-events'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository

let sut: ListEventsUseCase

describe('List Events', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()

    sut = new ListEventsUseCase(inMemoryEventsRepository)
  })

  it('should be able to fetch all events with admin user', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory01 = makeEvent()
    const event01 = await inMemoryEventsRepository.create(eventFactory01)

    const eventFactory02 = makeEvent()
    const event02 = await inMemoryEventsRepository.create(eventFactory02)

    const result = await sut.execute({
      departmentId: user.departmentId,
      profileId: user.profileId,
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
      profileId: UserProfile.EVENTS,
    })
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory01 = makeEvent({
      departmentId: department.id,
    })
    const event01 = await inMemoryEventsRepository.create(eventFactory01)

    const eventFactory02 = makeEvent({ departmentId: 2 })
    await inMemoryEventsRepository.create(eventFactory02)

    const result = await sut.execute({
      departmentId: user.departmentId,
      profileId: user.profileId,
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

    for (let i = 1; i <= 22; i++) {
      await inMemoryEventsRepository.create(makeEvent())
    }

    const result = await sut.execute({
      departmentId: user.departmentId,
      profileId: user.profileId,
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
