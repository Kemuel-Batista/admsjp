import { IUserTokenRepository } from '@modules/user/modules/user-token/repositories/IUserTokenRepository'
import { type UserToken } from '@prisma/client'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { AppError } from '@shared/errors/AppError'
import { i18n } from '@shared/i18n/i18n'
import { type IFindOptions } from '@shared/interfaces/IFindOptions'
import { injectable } from '@nestjs/common'

type TFindUserTokenByRefreshTokenUseCase<Options extends IFindOptions> =
  | UserToken
  | (Options['throwIfNotFound'] extends true ? never : null)
@injectable()
class FindUserTokenByRefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

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

export { FindUserTokenByRefreshTokenUseCase }
