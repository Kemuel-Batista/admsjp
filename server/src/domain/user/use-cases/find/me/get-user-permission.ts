import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { FindUserWithPermissionByUserNameUseCase } from '@/domain/user/modules/user-permission/use-cases/find/user-permission-by-user-name/find-user-with-permission-by-user-name'
import { UserWithoutPassword } from '@/domain/user/types/user-without-password'

import { FindUserByIdUseCase } from '../by-id/find-user-by-id'

@Injectable()
class GetUserPermissionsUseCase {
  constructor(
    private findUserById: FindUserByIdUseCase,
    private findUserWithPermissionByUserName: FindUserWithPermissionByUserNameUseCase,
  ) {}

  async execute(userId: User['id']): Promise<UserWithoutPassword | null> {
    const user = await this.findUserById.execute(userId, {
      throwIfNotFound: true,
      errorKeyNotFound: 'auth.credentials.invalidCredentials',
      errorCodeNotFound: HttpStatusCode.UNAUTHORIZED,
    })

    const userWithPermission =
      await this.findUserWithPermissionByUserName.execute(user.username)

    return userWithPermission
  }
}

export { GetUserPermissionsUseCase }
