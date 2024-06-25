import { makeProfile } from 'test/factories/make-profile'
import { makeUser } from 'test/factories/make-user'
import { InMemoryProfilePermissionsRepository } from 'test/repositories/in-memory-profile-permissions-repository'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CreateProfilePermissionUseCase } from './create-profile-permission'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProfilesRepository: InMemoryProfilesRepository
let inMemoryProfilePermissionsRepository: InMemoryProfilePermissionsRepository

let sut: CreateProfilePermissionUseCase

describe('Create profile permission', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    inMemoryProfilePermissionsRepository =
      new InMemoryProfilePermissionsRepository()

    sut = new CreateProfilePermissionUseCase(
      inMemoryProfilePermissionsRepository,
      inMemoryProfilesRepository,
    )
  })

  it('should be able to create a new profile permission', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const profileFactory = makeProfile()
    const profile = await inMemoryProfilesRepository.create(profileFactory)

    const result = await sut.execute({
      profileId: profile.id,
      key: 'profile',
      createdBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryProfilePermissionsRepository.items).toHaveLength(1)
    expect(inMemoryProfilePermissionsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          profileId: profile.id,
          key: 'profile',
        }),
      ]),
    )
  })
})
