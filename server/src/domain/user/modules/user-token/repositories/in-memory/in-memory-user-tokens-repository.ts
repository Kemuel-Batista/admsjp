import { type UserToken } from '@prisma/client'

import { ICreateUserTokenDTO } from '@/domain/user/dtos/create-user-token-dto'

import { UserTokensRepository } from '../user-tokens-repository'

export class InMemoryUserTokensRepository implements UserTokensRepository {
  private readonly items: UserToken[] = []

  async create({
    token,
    refreshToken,
    expiresAt,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    throw new Error('Method not implemented.')
  }

  async findByUserId(userId: UserToken['userId']): Promise<UserToken> {
    throw new Error('Method not implemented.')
  }

  async findByUserIdAndRefreshToken(
    userId: UserToken['userId'],
    refreshToken: UserToken['refreshToken'],
  ): Promise<UserToken> {
    throw new Error('Method not implemented.')
  }

  async delete(userTokenId: UserToken['id']): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteByUserId(userId: UserToken['userId']): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
