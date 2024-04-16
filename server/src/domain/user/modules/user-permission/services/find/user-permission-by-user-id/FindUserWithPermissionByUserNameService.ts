import { IProfilePermissionRepository } from '@modules/profile/modules/profile-permission/repositories/IProfilePermissionRepository'
import { ListProfilePermissionByProfileIdService } from '@modules/profile/modules/profile-permission/services/list/by-profile-Id/ListProfilePermissionByProfileIdService'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { FindUserByUsernameService } from '@modules/user/services/find/by-username/FindUserByUsernameService'
import { Injectable } from '@nestjs/common'
import { type User } from '@prisma/client'

import { IFindOptions } from '@/core/repositories/find-options'

import { type UserWithPermission } from '../../../types/UserWithPermission'

type TFindUserWithPermissionByUserNameService<Options extends IFindOptions> =
  | UserWithPermission
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
class FindUserWithPermissionByUserNameService {
  private readonly listProfilePermissionByProfileIdService: ListProfilePermissionByProfileIdService
  private readonly findUserByUsernameService: FindUserByUsernameService

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly profilePermissionRepository: IProfilePermissionRepository,
  ) {
    this.listProfilePermissionByProfileIdService =
      new ListProfilePermissionByProfileIdService(
        this.profilePermissionRepository,
      )

    this.findUserByUsernameService = new FindUserByUsernameService(
      this.userRepository,
    )
  }

  async execute<Options extends IFindOptions>(
    userName: User['username'],
    options: Partial<Options> = {},
  ): Promise<TFindUserWithPermissionByUserNameService<Options>> {
    let user: User | null = null
    let userPermissions: UserWithPermission | null = null

    if (userName) {
      user = await this.findUserByUsernameService.execute(userName, options)
    }

    if (user) {
      const profilePermissions =
        await this.listProfilePermissionByProfileIdService.execute(
          user.profileId,
          { allRecords: true },
        )

      const permissions = new Set<string>([])

      for (const profilePermission of profilePermissions) {
        permissions.add(profilePermission.key)
      }

      const { password, ...userWithoutPassword } = user

      userPermissions = {
        ...userWithoutPassword,
        permissions: [...permissions],
      }
    }
    return userPermissions as TFindUserWithPermissionByUserNameService<Options>
  }
}

export { FindUserWithPermissionByUserNameService }
