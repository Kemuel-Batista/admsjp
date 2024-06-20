import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UserWithoutPassword } from '@/domain/admsjp/types/user/user-without-password'

import { ProfilePermissionsRepository } from '../../repositories/profile-permissions-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface GetUserPermissionUseCaseRequest {
  userId: User['id']
}

type GetUserPermissionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    userWithPermission: UserWithoutPassword
  }
>

@Injectable()
export class GetUserPermissionUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private profilePermissionsRepository: ProfilePermissionsRepository,
  ) {}

  async execute({
    userId,
  }: GetUserPermissionUseCaseRequest): Promise<GetUserPermissionUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.notFound',
          key: userId.toString(),
        }),
      )
    }

    const profilePermissions =
      await this.profilePermissionsRepository.listByProfileId(user.profileId)

    const permissions = new Set<string>([])

    for (const profilePermission of profilePermissions) {
      permissions.add(profilePermission.key)
    }

    delete user.password

    const userWithPermission = {
      ...user,
      permissions: [...permissions],
    }

    return success({
      userWithPermission,
    })
  }
}
