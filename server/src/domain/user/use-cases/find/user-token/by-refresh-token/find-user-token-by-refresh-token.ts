import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { UserTokensRepository } from '@/domain/user/modules/user-token/repositories/user-tokens-repository'

type TFindUserTokenByRefreshTokenUseCase<Options extends IFindOptions> =
  | UserToken
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindUserTokenByRefreshTokenUseCase {
  constructor(private userTokenRepository: UserTokensRepository) {}

  async execute<Options extends IFindOptions>(
    userId: UserToken['userId'],
    refreshToken: UserToken['refreshToken'],
    options: Partial<Options> = {},
  ): Promise<TFindUserTokenByRefreshTokenUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'auth.refreshToken.invalidRefreshToken',
      errorKeyNotFound = 'auth.refreshToken.invalidRefreshToken',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.UNAUTHORIZED,
    } = options

    let userToken: UserToken | null = null

    if (userId !== null && refreshToken !== null) {
      userToken = await this.userTokenRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken,
      )
    }

    if (throwIfFound && userToken) {
      throw new AppError(i18n.t(errorKeyFound), errorCodeFound)
    }

    if (throwIfNotFound && !userToken) {
      throw new AppError(i18n.t(errorKeyNotFound), errorCodeNotFound)
    }

    return userToken as TFindUserTokenByRefreshTokenUseCase<Options>
  }
}
