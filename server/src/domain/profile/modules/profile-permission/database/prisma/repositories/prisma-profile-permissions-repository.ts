import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { CreateProfilePermissionDTO } from '../../../dtos/create-profile-permission.dto'
import { ProfilePermissionsRepository } from '../../../repositories/profile-permissions-repository'

@Injectable()
export class PrismaProfilePermissionsRepository
  implements ProfilePermissionsRepository
{
  constructor(private prisma: PrismaService) {}

  async create({
    profileId,
    key,
    createdBy,
  }: CreateProfilePermissionDTO): Promise<ProfilePermission> {
    const profilePermission = await this.prisma.profilePermission.create({
      data: { profileId, key, createdBy, updatedBy: createdBy },
    })

    return profilePermission
  }

  async list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ProfilePermission[]> {
    const { skip, take } = calcPagination(options)

    const search = buildSearchFilter<ProfilePermission>(searchParams)

    const profilePermissions = await this.prisma.profilePermission.findMany({
      where: search,
      skip,
      take,
      orderBy: { id: 'asc' },
    })

    return profilePermissions
  }

  async listByProfileId(
    profileId: ProfilePermission['profileId'],
    options?: IListOptions,
    searchParams: ISearchParamDTO[] = [],
  ): Promise<ProfilePermission[]> {
    const { skip, take } = calcPagination(options)

    searchParams.push({
      field: 'profileId',
      condition: 'equals',
      value: profileId,
    })

    const search = buildSearchFilter<ProfilePermission>(searchParams)

    const profilePermissions = await this.prisma.profilePermission.findMany({
      where: search,
      skip,
      take,
      orderBy: { id: 'asc' },
    })

    return profilePermissions
  }

  async findById(
    id: ProfilePermission['id'],
  ): Promise<ProfilePermission | null> {
    const profilePermission = await this.prisma.profilePermission.findUnique({
      where: { id },
    })

    return profilePermission
  }

  async findByKeyProfileId(
    key: ProfilePermission['key'],
    profileId: ProfilePermission['profileId'],
  ): Promise<ProfilePermission | null> {
    const profilePermission = await this.prisma.profilePermission.findUnique({
      where: { KeyProfileId: { key, profileId } },
    })

    return profilePermission
  }

  async delete(id: ProfilePermission['id']): Promise<void> {
    await this.prisma.profilePermission.delete({
      where: { id },
    })
  }
}
