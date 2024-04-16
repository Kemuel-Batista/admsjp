import { type IAuthUserDTO } from '@modules/user/dtos/IAuthUserDTO'
import { UserStatus } from '@modules/user/enums/UserStatus'
import { IUserTokenRepository } from '@modules/user/modules/user-token/repositories/IUserTokenRepository'
import { IHashProvider } from '@modules/user/providers/hash-provider/models/IHashProvider'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { Injectable, injectable } from '@nestjs/common'
import { IDateProvider } from '@shared/container/providers/date-provider/models/IDateProvider'
import { ILogProvider } from '@shared/container/providers/log-provider/model/ILogProvider'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { LogLevel } from '@shared/enums/LogLevel'
import { AuthError } from '@shared/errors/AuthError'

import { GenerateUserTokenUseCase } from '../../../modules/user-token/usecases/generate/GenerateUserTokenUseCase'
import { FindUserByUsernameUseCase } from '../../find/by-username/FindUserByUsernameUseCase'
import { CompareHashUserPassword } from '../compare-hash-user-password/CompareHashUserPassword'

interface IResponse {
  token: string
  refreshToken: string
}

@Injectable()
class AuthUserUseCase {
  private readonly findUserByUsernameUseCase: FindUserByUsernameUseCase
  private readonly compareHashUserPassword: CompareHashUserPassword
  private readonly generateUserTokenUseCase: GenerateUserTokenUseCase

  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('LogProvider')
    private readonly logProvider: ILogProvider,
  ) {
    this.findUserByUsernameUseCase = new FindUserByUsernameUseCase(
      this.userRepository,
    )

    this.compareHashUserPassword = new CompareHashUserPassword(
      this.hashProvider,
    )

    this.generateUserTokenUseCase = new GenerateUserTokenUseCase(
      this.userTokenRepository,
      this.dateProvider,
    )
  }

  async execute({ username, password }: IAuthUserDTO): Promise<IResponse> {
    // Verifica se o usuário existe no sistema
    const user = await this.findUserByUsernameUseCase.execute(username)

    if (user === null) {
      throw new AuthError(
        'user.auth.invalidCredentials',
        HttpStatusCode.UNAUTHORIZED,
      )
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new AuthError('user.auth.inactiveUser', HttpStatusCode.UNAUTHORIZED)
    }

    // Verifica se a senha informada é válida
    await this.compareHashUserPassword.execute(password, user.password)

    // Gera o token e o refresh token
    const tokenAndRefreshToken =
      await this.generateUserTokenUseCase.execute(user)

    await this.logProvider.log({
      process: 'user.auth-user',
      level: LogLevel.TRACE,
      userId: user.id,
      value: `${user.username}`,
      note: `user.id: ${user.id} | user.username: ${user.username}`,
    })

    return tokenAndRefreshToken
  }
}

export { AuthUserUseCase }
