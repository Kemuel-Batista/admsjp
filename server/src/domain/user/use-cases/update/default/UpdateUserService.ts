import { type IUpdateUserDTO } from '@modules/user/dtos/IUpdateUserDTO'
import { IHashProvider } from '@modules/user/providers/hash-provider/models/IHashProvider'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type User } from '@prisma/client'
import { ILogProvider } from '@shared/container/providers/log-provider/model/ILogProvider'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { LogLevel } from '@shared/enums/LogLevel'
import { injectable } from '@nestjs/common'

import { FindUserByIdUseCase } from '../../find/by-id/FindUserByIdUseCase'
import { FindUserByUsernameUseCase } from '../../find/by-username/FindUserByUsernameUseCase'

@injectable()
class UpdateUserUseCase {
  private readonly findUserByIdUseCase: FindUserByIdUseCase
  private readonly findUserByUsernameUseCase: FindUserByUsernameUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @inject('LogProvider')
    private readonly logProvider: ILogProvider,
  ) {
    this.findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
    this.findUserByUsernameUseCase = new FindUserByUsernameUseCase(
      userRepository,
    )
  }

  async execute({
    id,
    name,
    username,
    password,
    status,
    profileId,
    updatedBy,
  }: IUpdateUserDTO): Promise<User> {
    const currentUser = await this.findUserByIdUseCase.execute(id, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    if (username && username !== null) {
      if (currentUser.username !== username) {
        await this.findUserByUsernameUseCase.execute(username, {
          throwIfFound: true,
          errorKeyFound: 'user.update.username.alreadyExists',
          errorCodeFound: HttpStatusCode.BAD_REQUEST,
        })
      }
    }

    if (password && password !== null) {
      password = await this.hashProvider.generateHash(password)
    }

    const user = await this.userRepository.update({
      id,
      name,
      username,
      password,
      status,
      profileId,
      updatedBy,
    })

    await this.logProvider.log({
      process: 'user.update-user',
      level: LogLevel.INFO,
      userId: updatedBy,
      value: `${user.username}`,
      note: `user.id: ${user.id} | user.username: ${user.username} | user.status | ${user.status} | user.profileId | ${user.profileId}`,
    })

    return user
  }
}

export { UpdateUserUseCase }
