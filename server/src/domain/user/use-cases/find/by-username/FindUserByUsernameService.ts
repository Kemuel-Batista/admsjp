import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type User } from '@prisma/client'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { AppError } from '@shared/errors/AppError'
import { i18n } from '@shared/i18n/i18n'
import { type IFindOptions } from '@shared/interfaces/IFindOptions'
import { injectable } from '@nestjs/common'

type TFindUserByUsernameUseCase<Options extends IFindOptions> =
  | User
  | (Options['throwIfNotFound'] extends true ? never : null)

@injectable()
class FindUserByUsernameUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
  ) {}

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

export { FindUserByUsernameUseCase }
