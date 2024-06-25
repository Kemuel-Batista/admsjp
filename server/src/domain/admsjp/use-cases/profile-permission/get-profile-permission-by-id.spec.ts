import { makeProfilePermission } from 'test/factories/make-profile-permission'
import { InMemoryProfilePermissionsRepository } from 'test/repositories/in-memory-profile-permissions-repository'

import { GetProfilePermissionByIdUseCase } from './get-profile-permission-by-id'

let inMemoryProfilePermissionsRepository: InMemoryProfilePermissionsRepository

let sut: GetProfilePermissionByIdUseCase

describe('Get profile permission by id', () => {
  beforeEach(() => {
    inMemoryProfilePermissionsRepository =
      new InMemoryProfilePermissionsRepository()

    sut = new GetProfilePermissionByIdUseCase(
      inMemoryProfilePermissionsRepository,
    )
  })

  it('should be able to get details of profile permission by id', async () => {
    const profilePermissionFactory = makeProfilePermission()
    const profilePermission = await inMemoryProfilePermissionsRepository.create(
      profilePermissionFactory,
    )

    const result = await sut.execute({
      id: profilePermission.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      profilePermission: expect.objectContaining({
        id: profilePermission.id,
        key: profilePermission.key,
        profileId: profilePermission.profileId,
      }),
    })
  })
})
