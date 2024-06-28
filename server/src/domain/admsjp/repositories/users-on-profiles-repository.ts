import { Prisma, UsersOnProfiles } from '@prisma/client'

import { UsersOnProfilesWithDetails } from '../types/users-on-profiles'

export abstract class UsersOnProfilesRepository {
  abstract create(
    data: Prisma.UsersOnProfilesUncheckedCreateInput,
  ): Promise<UsersOnProfiles>

  abstract listByUserIdWithDetails(
    userId: UsersOnProfiles['userId'],
  ): Promise<UsersOnProfilesWithDetails[]>
}
