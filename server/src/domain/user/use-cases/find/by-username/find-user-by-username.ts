import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { UsersRepository } from '@/domain/user/repositories/users-repository'

type TFindUserByUsernameUseCase<Options extends IFindOptions> =
  | User
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindUserByUsernameUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute<Options extends IFindOptions>(
    username: User['username'],
    options: Partial<Options> = {},
  ): Promise<TFindUserByUsernameUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'user.create.username.alreadyExists',
      errorKeyNotFound = 'user.find.username.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let user: User | null = null

    if (username !== null) {
      user = await this.userRepository.findByUsername(username)
    }

    if (throwIfFound && user) {
      throw new AppError(
        i18n.t(errorKeyFound, { username }),

        errorCodeFound,
      )
    }

    if (throwIfNotFound && !user) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { username }),

        errorCodeNotFound,
      )
    }

    return user as TFindUserByUsernameUseCase<Options>
  }
}
