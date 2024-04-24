import { randomUUID } from 'node:crypto'

import { UserToken } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import { CreateUserTokenDTO } from '@/domain/admsjp/dtos/user-token'
import { UserTokensRepository } from '@/domain/admsjp/repositories/user-tokens-repository'

export class InMemoryUserTokensRepository implements UserTokensRepository {
  public items: UserToken[] = []

  async create(data: CreateUserTokenDTO): Promise<UserToken> {
    const id = getLastInsertedId(this.items)

    const user = {
      id,
      uuid: randomUUID(),
      token: data.token,
      refreshToken: data.refreshToken,
      expiresAt: data.expiresAt,
      userId: data.userId,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByUserId(userId: number): Promise<UserToken> {
    const userToken = this.items.find((item) => item.userId === userId)

    if (!userToken) {
      return null
    }

    return userToken
  }

  async findByUserIdAndRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<UserToken> {
    const userToken = this.items.find(
      (item) => item.userId === userId && item.refreshToken === refreshToken,
    )

    if (!userToken) {
      return null
    }

    return userToken
  }

  async delete(userTokenId: number): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === userTokenId)

    this.items.splice(itemIndex, 1)
  }

  async deleteByUserId(userId: number): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.userId === userId)

    this.items.splice(itemIndex, 1)
  }
}
