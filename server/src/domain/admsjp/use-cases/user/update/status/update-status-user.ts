import { Injectable } from '@nestjs/common'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { UpdateUserStatusDTO } from '@/domain/admsjp/dtos/user'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'

import { FindUserByIdUseCase } from '../../find/by-id/find-user-by-id'

@Injectable()
export class UpdateStatusUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private findUserById: FindUserByIdUseCase,
  ) {}

  async execute({ id, status, updatedBy }: UpdateUserStatusDTO): Promise<void> {
    const currentUser = await this.findUserById.execute(id, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    if (currentUser.status === status) {
      throw new AppError(
        i18n.t('user.update.status.alreadyHasThisStatus', { status }),
        HttpStatusCode.BAD_REQUEST,
      )
    }

    await this.usersRepository.update({
      id,
      status,
      updatedBy,
    })
  }
}
