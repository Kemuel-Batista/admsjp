import { Injectable } from '@nestjs/common'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AuthError } from '@/core/errors/AuthError'
import { AuthUserDTO } from '@/domain/user/dtos/auth-user.dto'
import { UserStatus } from '@/domain/user/enums/user-status'
import { GenerateUserTokenUseCase } from '@/domain/user/modules/user-token/use-cases/generate/generate-user-token'

import { FindUserByUsernameUseCase } from '../../find/by-username/find-user-by-username'
import { CompareHashUserPassword } from '../compare-hash-user-password/compare-hash-user-password'

interface IResponse {
  token: string
  refreshToken: string
}

@Injectable()
export class AuthUserUseCase {
  constructor(
    private findUserByUsername: FindUserByUsernameUseCase,
    private compareHashUserPassword: CompareHashUserPassword,
    private generateUserToken: GenerateUserTokenUseCase,
  ) {}

  async execute({ username, password }: AuthUserDTO): Promise<IResponse> {
    // Verifica se o usuário existe no sistema
    const user = await this.findUserByUsername.execute(username)

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
    const tokenAndRefreshToken = await this.generateUserToken.execute(user)

    return tokenAndRefreshToken
  }
}
