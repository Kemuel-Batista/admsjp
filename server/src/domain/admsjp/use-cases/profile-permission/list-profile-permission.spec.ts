import { makeProfilePermission } from 'test/factories/make-profile-permission'
import { InMemoryProfilePermissionsRepository } from 'test/repositories/in-memory-profile-permissions-repository'

import { ListProfilePermissionUseCase } from './list-profile-permission'

let inMemoryProfilePermissionsRepository: InMemoryProfilePermissionsRepository

let sut: ListProfilePermissionUseCase

describe('List profile permissions', () => {
  beforeEach(() => {
    inMemoryProfilePermissionsRepository =
      new InMemoryProfilePermissionsRepository()

    sut = new ListProfilePermissionUseCase(inMemoryProfilePermissionsRepository)
  })

  it('should be able to list profile permissions', async () => {
    const profilePermissionFactory = makeProfilePermission()
    const profilePermission01 =
      await inMemoryProfilePermissionsRepository.create(
        profilePermissionFactory,
      )

    const profilePermissionFactory02 = makeProfilePermission()
    const profilePermission02 =
      await inMemoryProfilePermissionsRepository.create(
        profilePermissionFactory02,
      )

    const result = await sut.execute({
      options: {},
      searchParams: [],
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      profilePermissions: expect.arrayContaining([
        expect.objectContaining({
          id: profilePermission01.id,
          key: profilePermission01.key,
          profileId: profilePermission01.profileId,
        }),
        expect.objectContaining({
          id: profilePermission02.id,
          key: profilePermission02.key,
          profileId: profilePermission02.profileId,
        }),
      ]),
    })
  })
})
