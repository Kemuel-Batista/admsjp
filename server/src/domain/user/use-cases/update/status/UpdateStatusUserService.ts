import { type IUpdateUserStatusDTO } from '@modules/user/dtos/IUpdateUserStatusDTO'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { ILogProvider } from '@shared/container/providers/log-provider/model/ILogProvider'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { LogLevel } from '@shared/enums/LogLevel'
import { AppError } from '@shared/errors/AppError'
import { i18n } from '@shared/i18n/i18n'
import { injectable } from '@nestjs/common'

import { FindUserByIdUseCase } from '../../find/by-id/FindUserByIdUseCase'

@injectable()
class UpdateStatusUserUseCase {
  private readonly findUserByIdUseCase: FindUserByIdUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('LogProvider')
    private readonly logProvider: ILogProvider,
  ) {
    this.findUserByIdUseCase = new FindUserByIdUseCase(userRepository)
  }

  async execute({
    id,
    status,
    updatedBy,
  }: IUpdateUserStatusDTO): Promise<void> {
    const currentUser = await this.findUserByIdUseCase.execute(id, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    if (currentUser.status === status) {
      throw new AppError(
        i18n.t('user.update.status.alreadyHasThisStatus', { status }),
        HttpStatusCode.BAD_REQUEST,
      )
    }

    const user = await this.userRepository.update({
      id,
      status,
      updatedBy,
    })

    await this.logProvider.log({
      process: 'user.update-status-user',
      level: LogLevel.INFO,
      userId: updatedBy,
      value: `${user.status}`,
      oldValue: `${currentUser.status}`,
      note: `user.id: ${user.id} | user.username: ${user.username} | user.status: ${user.status}`,
    })
  }
}

export { UpdateStatusUserUseCase }
