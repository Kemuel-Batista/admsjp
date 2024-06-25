import { makeProfilePermission } from 'test/factories/make-profile-permission'
import { makeUser } from 'test/factories/make-user'
import { InMemoryProfilePermissionsRepository } from 'test/repositories/in-memory-profile-permissions-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { DeleteProfilePermissionByIdUseCase } from './delete-profile-permission-by-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProfilePermissionsRepository: InMemoryProfilePermissionsRepository

let sut: DeleteProfilePermissionByIdUseCase

describe('Delete profile permission', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProfilePermissionsRepository =
      new InMemoryProfilePermissionsRepository()

    sut = new DeleteProfilePermissionByIdUseCase(
      inMemoryProfilePermissionsRepository,
    )
  })

  it('should be able to delete a profile permission', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const profilePermissionFactory = makeProfilePermission()
    const profilePermission = await inMemoryProfilePermissionsRepository.create(
      profilePermissionFactory,
    )

    const result = await sut.execute({
      id: profilePermission.id,
      deletedBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryProfilePermissionsRepository.items).toHaveLength(0)
  })
})
