import { Prisma, ProfilePermission } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

export abstract class ProfilePermissionsRepository {
  abstract create(
    data: Prisma.ProfilePermissionUncheckedCreateInput,
  ): Promise<ProfilePermission>

  abstract list(options?: ListOptions): Promise<ProfilePermission[]>

  abstract listByProfileId(
    profileId: ProfilePermission['profileId'],
    options?: ListOptions,
  ): Promise<ProfilePermission[]>

  abstract findById(
    id: ProfilePermission['id'],
  ): Promise<ProfilePermission | null>

  abstract findByKeyProfileId(
    key: ProfilePermission['key'],
    profileId: ProfilePermission['profileId'],
  ): Promise<ProfilePermission | null>

  abstract delete(id: ProfilePermission['id']): Promise<void>
}
