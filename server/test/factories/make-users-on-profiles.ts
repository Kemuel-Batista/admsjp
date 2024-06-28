import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { UsersOnProfiles } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeUsersOnProfiles(
  override: Partial<UsersOnProfiles> = {},
): UsersOnProfiles {
  return {
    profileId: randomUUID(),
    userId: randomUUID(),
    ...override,
  }
}

@Injectable()
export class UsersOnProfilesFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUsersOnProfiles(
    data: Partial<UsersOnProfiles> = {},
  ): Promise<UsersOnProfiles> {
    const usersOnProfiles = makeUsersOnProfiles(data)

    const createdUsersOnProfiles = await this.prisma.usersOnProfiles.upsert({
      where: {
        userId_profileId: {
          profileId: usersOnProfiles.profileId,
          userId: usersOnProfiles.userId,
        },
      },
      create: usersOnProfiles,
      update: {},
    })

    return createdUsersOnProfiles
  }
}
