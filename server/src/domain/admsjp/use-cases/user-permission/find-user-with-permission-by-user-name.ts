import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { IFindOptions } from '@/core/repositories/find-options'
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission'

import { ListProfilePermissionByProfileIdUseCase } from '../profile-permission/list-profile-permission-by-profile-id'
import { FindUserByUsernameUseCase } from '../user/find/by-username/find-user-by-username'

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
  ): Promise<TFindUserWithPermissionByUserNameUseCase<Options>> {
    let userPermissions: UserWithPermission | null = null

    const user = await this.findUserByUsernameUseCase.execute(userName)

    const resultProfilePermissions =
      await this.listProfilePermissionByProfileId.execute({
        profileId: user.profileId,
        options: {
          allRecords: true,
        },
        searchParams: [],
      })

    if (resultProfilePermissions.isError()) {
      throw new Error('resultProfilePermissions')
    }

    const permissions = new Set<string>([])

    for (const profilePermission of resultProfilePermissions.value
      .profilePermissions) {
      permissions.add(profilePermission.key)
    }

    delete user.password

    userPermissions = {
      ...user,
      permissions: [...permissions],
    }

    return userPermissions as TFindUserWithPermissionByUserNameUseCase<Options>
  }
}
