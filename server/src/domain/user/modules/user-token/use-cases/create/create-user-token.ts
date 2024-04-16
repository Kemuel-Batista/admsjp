import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'

import { ICreateUserTokenDTO } from '../../dtos/create-user-token-dto'
import { UserTokensRepository } from '../../repositories/user-tokens-repository'
import { DeleteUserTokenByUserIdUseCase } from '../delete/by-user-id/delete-user-token-by-user-id'

@Injectable()
export class CreateUserTokenUseCase {
  constructor(
    private userTokenRepository: UserTokensRepository,
    private deleteUserTokenByUserIdUseCase: DeleteUserTokenByUserIdUseCase,
  ) {}

  async execute({
    token,
    refreshToken,
    expiresAt,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    await this.deleteUserTokenByUserIdUseCase.execute({
      userId,
    })

    const userToken = await this.userTokenRepository.create({
      token,
      refreshToken,
      expiresAt,
      userId,
    })

    return userToken
  }
}
