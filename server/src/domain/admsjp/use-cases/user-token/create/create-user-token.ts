import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'

import { CreateUserTokenDTO } from '@/domain/admsjp/dtos/user-token'
import { UserTokensRepository } from '@/domain/admsjp/repositories/user-tokens-repository'

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
  }: CreateUserTokenDTO): Promise<UserToken> {
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
