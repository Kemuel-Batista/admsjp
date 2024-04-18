import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { IFindOptions } from '@/core/repositories/find-options'
import { ListProfilePermissionByProfileIdUseCase } from '@/domain/profile/modules/profile-permission/use-cases/list/by-profile-Id/list-profile-permission-by-profile-id'
import { FindUserByUsernameUseCase } from '@/domain/user/use-cases/find/by-username/find-user-by-username'

import { UserWithPermission } from '../../../../../types/user-with-permission'

type TFindUserWithPermissionByUserNameUseCase<Options extends IFindOptions> =
  | UserWithPermission
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindUserWithPermissionByUserNameUseCase {
  constructor(
    private findUserByUsernameUseCase: FindUserByUsernameUseCase,
    private listProfilePermissionByProfileId: ListProfilePermissionByProfileIdUseCase,
  ) {}

  async execute<Options extends IFindOptions>(
    userName: User['username'],
    options: Partial<Options> = {},
  ): Promise<TFindUserWithPermissionByUserNameUseCase<Options>> {
    let user: User | null = null
    let userPermissions: UserWithPermission | null = null

    if (userName) {
      user = await this.findUserByUsernameUseCase.execute(userName, options)
    }

    if (user) {
      const profilePermissions =
        await this.listProfilePermissionByProfileId.execute(user.profileId, {
          allRecords: true,
        })

      const permissions = new Set<string>([])

      for (const profilePermission of profilePermissions) {
        permissions.add(profilePermission.key)
      }

      delete user.password

      userPermissions = {
        ...user,
        permissions: [...permissions],
      }
    }
    return userPermissions as TFindUserWithPermissionByUserNameUseCase<Options>
  }
}
