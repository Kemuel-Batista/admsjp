import { IProfilePermissionRepository } from '@modules/profile/modules/profile-permission/repositories/IProfilePermissionRepository'
import { FindUserWithPermissionByUserNameUseCase } from '@modules/user/modules/user-permission/usecases/find/user-permission-by-user-id/FindUserWithPermissionByUserNameUseCase'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type UserWithoutPassword } from '@modules/user/types/UserWithoutPassword'
import { type User } from '@prisma/client'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { injectable } from '@nestjs/common'

import { FindUserByIdUseCase } from '../by-id/FindUserByIdUseCase'

@injectable()
class GetUserPermissionsUseCase {
  private readonly findUserByIdUseCase: FindUserByIdUseCase
  private readonly findUserWithPermissionByUserNameUseCase: FindUserWithPermissionByUserNameUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('ProfilePermissionRepository')
    private readonly profilePermissionRepository: IProfilePermissionRepository,
  ) {
    this.findUserByIdUseCase = new FindUserByIdUseCase(this.userRepository)

    this.findUserWithPermissionByUserNameUseCase =
      new FindUserWithPermissionByUserNameUseCase(
        this.userRepository,
        this.profilePermissionRepository,
      )
  }

  async execute(userId: User['id']): Promise<UserWithoutPassword | null> {
    const user = await this.findUserByIdUseCase.execute(userId, {
      throwIfNotFound: true,
      errorKeyNotFound: 'auth.credentials.invalidCredentials',
      errorCodeNotFound: HttpStatusCode.UNAUTHORIZED,
    })

    const userWithPermission =
      await this.findUserWithPermissionByUserNameUseCase.execute(user.username)

    return userWithPermission
  }
}

export { GetUserPermissionsUseCase }
