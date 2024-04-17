import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'

import { CompareHashUserPassword } from '../../auth/compare-hash-user-password/compare-hash-user-password'
import { FindUserByIdUseCase } from '../../find/by-id/find-user-by-id'
import { UpdateUserUseCase } from '../default/update-user'

@Injectable()
export class UserUpdateSelfPasswordUseCase {
  constructor(
    private findUserById: FindUserByIdUseCase,
    private compareHashUserPassword: CompareHashUserPassword,
    private updateUser: UpdateUserUseCase,
  ) {}

  async execute(
    userId: User['id'],
    oldPassword: User['password'],
    newPassword: User['password'],
  ): Promise<void> {
    const user = await this.findUserById.execute(userId, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    await this.compareHashUserPassword.execute(oldPassword, user.password, {
      throwIfPasswordNotMatch: true,
      errorKeyPasswordNotMatch: 'user.auth.oldPassword.invalid',
      errorCodePasswordNotMatch: HttpStatusCode.BAD_REQUEST,
    })

    await this.updateUser.execute({
      id: user.id,
      password: newPassword,
      updatedBy: user.id,
    })
  }
}
