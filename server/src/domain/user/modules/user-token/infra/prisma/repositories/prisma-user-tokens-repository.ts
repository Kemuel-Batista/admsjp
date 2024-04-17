import { UserToken } from '@prisma/client'

import { CreateUserTokenDTO } from '@/domain/user/dtos/create-user-token.dto'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { UserTokensRepository } from '../../../repositories/user-tokens-repository'

export class UserTokensRepositoryPrisma implements UserTokensRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    token,
    refreshToken,
    expiresAt,
    userId,
  }: CreateUserTokenDTO): Promise<UserToken> {
    const newToken = await this.prisma.userToken.create({
      data: {
        token,
        refreshToken,
        expiresAt,
        userId,
      },
    })

    return newToken
  }

  async findByUserId(userId: UserToken['userId']): Promise<UserToken | null> {
    const token = await this.prisma.userToken.findFirst({
      where: {
        userId,
      },
    })

    return token
  }

  async findByUserIdAndRefreshToken(
    userId: UserToken['userId'],
    refreshToken: UserToken['refreshToken'],
  ): Promise<UserToken | null> {
    const token = await this.prisma.userToken.findFirst({
      where: {
        userId,
        refreshToken,
      },
    })

    return token
  }

  async delete(userTokenId: UserToken['id']): Promise<void> {
    await this.prisma.userToken.delete({
      where: {
        id: userTokenId,
      },
    })
  }

  async deleteByUserId(userId: UserToken['userId']): Promise<void> {
    await this.prisma.userToken.deleteMany({
      where: {
        userId,
      },
    })
  }
}
