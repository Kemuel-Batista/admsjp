import { IHashProvider } from '@modules/user/providers/hash-provider/models/IHashProvider'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type User } from '@prisma/client'
import { ILogProvider } from '@shared/container/providers/log-provider/model/ILogProvider'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { LogLevel } from '@shared/enums/LogLevel'
import { response } from 'express'
import { injectable } from '@nestjs/common'

import { FindUserByIdUseCase } from '../../find/by-id/FindUserByIdUseCase'

@injectable()
class UpdateUserPasswordUseCase {
  private readonly findUserByIdUseCase: FindUserByIdUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @inject('LogProvider')
    private readonly logProvider: ILogProvider,
  ) {
    this.findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
  }

  async execute(
    id: User['id'],
    password: User['password'],
    updatedBy: User['id'],
  ): Promise<void> {
    const currentUser = await this.findUserByIdUseCase.execute(id, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    password = await this.hashProvider.generateHash(password)

    await this.userRepository.update({
      id,
      password,
      updatedBy,
    })

    await this.logProvider.log({
      process: 'user.update-password',
      level: LogLevel.INFO,
      userId: updatedBy,
      value: currentUser.username,
      note: `user.id: ${currentUser.id} | user.username: ${currentUser.username}`,
    })
  }
}

export { UpdateUserPasswordUseCase }
