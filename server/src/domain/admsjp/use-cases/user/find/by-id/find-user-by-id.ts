import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'

type TFindUserById<Options extends IFindOptions> =
  | User
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindUserByIdUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute<Options extends IFindOptions>(
    userId: User['id'],
    options: Partial<Options> = {},
  ): Promise<TFindUserById<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'user.create.id.alreadyExists',
      errorKeyNotFound = 'user.find.id.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let user: User | null = null

    if (userId !== null) {
      user = await this.userRepository.findById(userId)
    }

    if (throwIfFound && user) {
      throw new AppError(i18n.t(errorKeyFound), errorCodeFound)
    }

    if (throwIfNotFound && !user) {
      throw new AppError(i18n.t(errorKeyNotFound), errorCodeNotFound)
    }

    return user as TFindUserById<Options>
  }
}
