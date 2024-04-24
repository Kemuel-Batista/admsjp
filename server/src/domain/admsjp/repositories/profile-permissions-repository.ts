import { ProfilePermission } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { CreateProfilePermissionDTO } from '../dtos/profile-permission'

export abstract class ProfilePermissionsRepository {
  abstract create(data: CreateProfilePermissionDTO): Promise<ProfilePermission>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ProfilePermission[]>

  abstract listByProfileId(
    profileId: ProfilePermission['profileId'],
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
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
