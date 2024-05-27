import { makeProfile } from 'test/factories/make-profile'
import { makeProfilePermission } from 'test/factories/make-profile-permission'
import { InMemoryProfilePermissionsRepository } from 'test/repositories/in-memory-profile-permissions-repository'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'

import { ListProfilePermissionByProfileIdUseCase } from './list-profile-permission-by-profile-id'

let inMemoryProfilesRepository: InMemoryProfilesRepository
let inMemoryProfilePermissionsRepository: InMemoryProfilePermissionsRepository

let sut: ListProfilePermissionByProfileIdUseCase

describe('List profile permission by profile ID', () => {
  beforeEach(() => {
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    inMemoryProfilePermissionsRepository =
      new InMemoryProfilePermissionsRepository()

    sut = new ListProfilePermissionByProfileIdUseCase(
      inMemoryProfilePermissionsRepository,
      inMemoryProfilesRepository,
    )
  })

  it('should be able to list profile permissions by profile id', async () => {
    const profileFactory = makeProfile()
    const profile = await inMemoryProfilesRepository.create(profileFactory)

    const profilePermissionFactory = makeProfilePermission({
      profileId: profile.id,
    })
    const profilePermission = await inMemoryProfilePermissionsRepository.create(
      profilePermissionFactory,
    )

    const result = await sut.execute({
      profileId: profile.id,
      options: {},
      searchParams: [],
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      profilePermissions: expect.arrayContaining([
        expect.objectContaining({
          id: profilePermission.id,
          key: profilePermission.key,
        }),
      ]),
    })
  })
})
