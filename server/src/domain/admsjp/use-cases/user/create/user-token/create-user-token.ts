import { Injectable } from '@nestjs/common'
import { type UserToken } from '@prisma/client'

import { CreateUserTokenDTO } from '@/domain/admsjp/dtos/user-token'
import { UserTokensRepository } from '@/domain/admsjp/repositories/user-tokens-repository'

@Injectable()
export class CreateUserTokenUseCase {
  constructor(private userTokensRepository: UserTokensRepository) {}

  async execute({
    token,
    refreshToken,
    expiresAt,
    userId,
  }: CreateUserTokenDTO): Promise<UserToken> {
    const userToken = await this.userTokensRepository.create({
      token,
      refreshToken,
      expiresAt,
      userId,
    })

    return userToken
  }
}
