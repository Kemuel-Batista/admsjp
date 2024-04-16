import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type User } from '@prisma/client'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { AppError } from '@shared/errors/AppError'
import { i18n } from '@shared/i18n/i18n'
import { type IFindOptions } from '@shared/interfaces/IFindOptions'
import { injectable } from '@nestjs/common'

type TFindUserById<Options extends IFindOptions> =
  | User
  | (Options['throwIfNotFound'] extends true ? never : null)

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
  ) {}

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

export { FindUserByIdUseCase }
