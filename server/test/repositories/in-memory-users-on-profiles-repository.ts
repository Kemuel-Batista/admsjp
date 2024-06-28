import { Prisma, UsersOnProfiles } from '@prisma/client'

import { UsersOnProfilesRepository } from '@/domain/admsjp/repositories/users-on-profiles-repository'
import { UsersOnProfilesWithDetails } from '@/domain/admsjp/types/users-on-profiles'

import { InMemoryProfilesRepository } from './in-memory-profiles-repository'

export class InMemoryUsersOnProfilesRepository
  implements UsersOnProfilesRepository
{
  public items: UsersOnProfiles[] = []

  constructor(private profilesRepository: InMemoryProfilesRepository) {}

  async create(
    data: Prisma.UsersOnProfilesUncheckedCreateInput,
  ): Promise<UsersOnProfiles> {
    const userOnProfile = {
      profileId: data.profileId,
      userId: data.userId,
    }

    this.items.push(userOnProfile)

    return userOnProfile
  }

  async listByUserIdWithDetails(
    userId: UsersOnProfiles['userId'],
  ): Promise<UsersOnProfilesWithDetails[]> {
    const usersOnProfiles = this.items
      .filter((item) => item.userId === userId)
      .map((userProfile) => {
        const profile = this.profilesRepository.items.find(
          (item) => item.id === userProfile.profileId,
        )

        if (!profile) {
          throw new Error(
            `Profile not found for user profile ID: ${userProfile.profileId.toString()}`,
          )
        }

        return {
          ...userProfile,
          profile: {
            name: profile.name,
          },
        }
      })

    return usersOnProfiles
  }
}
