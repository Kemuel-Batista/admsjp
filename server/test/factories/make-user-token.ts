import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { Prisma, UserToken } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface UserTokenProps extends Prisma.UserTokenUncheckedCreateInput {}

export function makeUserToken(
  override: Partial<UserTokenProps> = {},
): UserTokenProps {
  return {
    uuid: randomUUID(),
    token: randomUUID(),
    refreshToken: randomUUID(),
    expiresAt: new Date(),
    userId: 1,
    ...override,
  }
}

@Injectable()
export class UserTokenFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUserToken(
    data: Partial<UserTokenProps> = {},
  ): Promise<UserToken> {
    const userToken = makeUserToken(data)

    const createdUserToken = await this.prisma.userToken.upsert({
      where: {
        uuid: userToken.uuid,
      },
      create: userToken,
      update: {},
    })

    return createdUserToken
  }
}
