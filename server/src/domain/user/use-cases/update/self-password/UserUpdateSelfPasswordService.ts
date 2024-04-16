import { IHashProvider } from '@modules/user/providers/hash-provider/models/IHashProvider'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type User } from '@prisma/client'
import { ILogProvider } from '@shared/container/providers/log-provider/model/ILogProvider'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { LogLevel } from '@shared/enums/LogLevel'
import { injectable } from '@nestjs/common'

import { CompareHashUserPassword } from '../../auth/compare-hash-user-password/compare-hash-user-password'
import { FindUserByIdUseCase } from '../../find/by-id/FindUserByIdUseCase'
import { UpdateUserUseCase } from '../default/UpdateUserUseCase'

@injectable()
class UserUpdateSelfPasswordUseCase {
  private readonly findUserByIdUseCase: FindUserByIdUseCase
  private readonly compareHashUserPassword: CompareHashUserPassword
  private readonly updateUserUseCase: UpdateUserUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @inject('LogProvider')
    private readonly logProvider: ILogProvider,
  ) {
    this.findUserByIdUseCase = new FindUserByIdUseCase(this.userRepository)

    this.compareHashUserPassword = new CompareHashUserPassword(
      this.hashProvider,
    )

    this.updateUserUseCase = new UpdateUserUseCase(
      this.userRepository,
      this.hashProvider,
      this.logProvider,
    )
  }

  async execute(
    userId: User['id'],
    oldPassword: User['password'],
    newPassword: User['password'],
  ): Promise<void> {
    const user = await this.findUserByIdUseCase.execute(userId, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    await this.compareHashUserPassword.execute(oldPassword, user.password, {
      throwIfPasswordNotMatch: true,
      errorKeyPasswordNotMatch: 'user.auth.oldPassword.invalid',
      errorCodePasswordNotMatch: HttpStatusCode.BAD_REQUEST,
    })

    await this.updateUserUseCase.execute({
      id: user.id,
      password: newPassword,
      updatedBy: user.id,
    })

    await this.logProvider.log({
      process: 'user.update-self-password',
      level: LogLevel.TRACE,
      userId: user.id,
      value: `${user.username}`,
      note: `user.id: ${user.id} | user.username: ${user.username}`,
    })
  }
}
export { UserUpdateSelfPasswordUseCase }
