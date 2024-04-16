import { type User } from '@prisma/client'

import { i18n } from '@/core/i18n/i18n'

import { UserProfile } from '../enums/user-profile'

export function getUserProfileDescription(
  profileId: User['profileId'],
): string | null {
  // TODO: Implements profile
  const keys = {
    [UserProfile.SUPERVISOR]: 'user.profile.supervisor',
    [UserProfile.ADMINISTRADOR]: 'user.profile.operator',
  }

  const key = keys[profileId]

  const statusDescription = key ? i18n.t(key) : null

  return statusDescription
}
