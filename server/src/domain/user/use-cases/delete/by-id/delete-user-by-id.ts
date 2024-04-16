import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type User } from '@prisma/client'
import { ILogProvider } from '@shared/container/providers/log-provider/model/ILogProvider'
import { LogLevel } from '@shared/enums/LogLevel'
import { injectable } from '@nestjs/common'

import { FindUserByIdUseCase } from '../../find/by-id/FindUserByIdUseCase'

@injectable()
class DeleteUserByIdUseCase {
  private readonly findUserbyIdUseCase: FindUserByIdUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('LogProvider')
    private readonly logProvider: ILogProvider,
  ) {
    this.findUserbyIdUseCase = new FindUserByIdUseCase(userRepository)
  }

  async execute(userId: User['id'], deletedBy: User['id']): Promise<void> {
    const user = await this.findUserbyIdUseCase.execute(userId, {
      throwIfNotFound: true,
    })

    await this.userRepository.delete(userId)

    await this.logProvider.log({
      process: 'user.delete-user',
      level: LogLevel.INFO,
      userId: deletedBy,
      value: `${user.username}`,
      note: `user.id: ${user.id} | user.username: ${user.username}`,
    })
  }
}

export { DeleteUserByIdUseCase }
