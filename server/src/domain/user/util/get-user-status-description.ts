import { type User } from '@prisma/client'

import { i18n } from '@/core/i18n/i18n'

import { UserStatus } from '../enums/user-status'

export function getUserStatusDescription(
  status: User['status'],
): string | null {
  const keys = {
    [UserStatus.ACTIVE]: 'user.status.active',
    [UserStatus.INACTIVE]: 'user.status.inactive',
  }

  const key = keys[status]

  const statusDescription = key ? i18n.t(key) : null

  return statusDescription
}
