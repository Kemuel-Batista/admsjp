import { type ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO'
import { UserStatus } from '@modules/user/enums/UserStatus'
import { IHashProvider } from '@modules/user/providers/hash-provider/models/IHashProvider'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type UserWithoutPassword } from '@modules/user/types/UserWithoutPassword'
import { Injectable } from '@nestjs/common'
import { type User } from '@prisma/client'
import { ILogProvider } from '@shared/container/providers/log-provider/model/ILogProvider'
import { LogLevel } from '@shared/enums/LogLevel'

import { FindUserByUsernameUseCase } from '../../find/by-username/FindUserByUsernameUseCase'

@Injectable()
class CreateUserUseCase {
  private readonly findUserByUsernameUseCase: FindUserByUsernameUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @inject('LogProvider')
    private readonly logProvider: ILogProvider,
  ) {
    this.findUserByUsernameUseCase = new FindUserByUsernameUseCase(
      userRepository,
    )
  }

  async execute({
    username,
    name,
    password,
    status = UserStatus.ACTIVE,
    profileId,
    createdBy,
  }: ICreateUserDTO): Promise<UserWithoutPassword> {
    await this.findUserByUsernameUseCase.execute(username, {
      throwIfFound: true,
    })

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user: UserWithoutPassword = await this.userRepository.create({
      username,
      name,
      password: hashedPassword,
      status,
      profileId,
      createdBy,
    })

    await this.logProvider.log({
      process: 'user.create-user',
      level: LogLevel.INFO,
      userId: createdBy,
      value: `${user.username}`,
      note: `user.id: ${user.id} | user.username: ${user.username} | user.name: ${user.name}`,
    })

    return user
  }
}

export { CreateUserUseCase }
