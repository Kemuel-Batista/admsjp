import { Injectable } from '@nestjs/common'
import { Prisma, UsersOnProfiles } from '@prisma/client'

import { UsersOnProfilesRepository } from '@/domain/admsjp/repositories/users-on-profiles-repository'
import { UsersOnProfilesWithDetails } from '@/domain/admsjp/types/users-on-profiles'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersOnProfilesRepository
  implements UsersOnProfilesRepository
{
  constructor(private prisma: PrismaService) {}

  async create({
    profileId,
    userId,
  }: Prisma.UsersOnProfilesUncheckedCreateInput): Promise<UsersOnProfiles> {
    const userOnProfile = await this.prisma.usersOnProfiles.create({
      data: {
        profileId,
        userId,
      },
    })

    return userOnProfile
  }

  async listByUserIdWithDetails(
    userId: UsersOnProfiles['userId'],
  ): Promise<UsersOnProfilesWithDetails[]> {
    const usersOnProfiles = await this.prisma.usersOnProfiles.findMany({
      where: {
        userId,
      },
      include: {
        profile: {
          select: {
            name: true,
          },
        },
      },
    })

    return usersOnProfiles
  }
}
