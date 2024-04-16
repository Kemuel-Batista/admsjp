import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'

import { UserTokensRepository } from '../../../repositories/user-tokens-repository'

type TFindUserTokenByUserIdUseCase<Options extends IFindOptions> =
  | UserToken
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindUserTokenByUserIdUseCase {
  constructor(private userTokensRepository: UserTokensRepository) {}

  async execute<Options extends IFindOptions>(
    userId: UserToken['userId'],
    options: Partial<Options> = {},
  ): Promise<TFindUserTokenByUserIdUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'user.token.create.alreadyExists',
      errorKeyNotFound = 'user.token.find.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let userToken: UserToken | null = null

    if (userId !== null) {
      userToken = await this.userTokensRepository.findByUserId(userId)
    }

    if (throwIfFound && userToken) {
      throw new AppError(i18n.t(errorKeyFound, { userId }), errorCodeFound)
    }

    if (throwIfNotFound && !userToken) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { userId }),

        errorCodeNotFound,
      )
    }

    return userToken as TFindUserTokenByUserIdUseCase<Options>
  }
}
