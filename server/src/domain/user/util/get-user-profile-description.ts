import { type User } from '@prisma/client'

import { i18n } from '@/core/i18n/i18n'

import { UserProfile } from '../enums/user-profile'

export function getUserProfileDescription(
  profileId: User['profileId'],
): string | null {
  // TODO: Implements profile
  const keys = {
    [UserProfile.ADMINISTRADOR]: 'user.profile.administrator',
    [UserProfile.ADMSJP_DIRETORIA]: 'user.profile.admsjp_diretoria',
  }

  const key = keys[profileId]

  const statusDescription = key ? i18n.t(key) : null

  return statusDescription
}
