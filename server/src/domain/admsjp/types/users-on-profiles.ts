import type { Prisma } from '@prisma/client'

export type UsersOnProfilesWithDetails = Prisma.UsersOnProfilesGetPayload<{
  include: {
    profile: {
      select: {
        name: true
      }
    }
  }
}>
