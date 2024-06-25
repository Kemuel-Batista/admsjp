import { Injectable } from '@nestjs/common'
import { Prisma, ProfilePermission } from '@prisma/client'

import { IListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaProfilePermissionsRepository
  implements ProfilePermissionsRepository
{
  constructor(private prisma: PrismaService) {}

  async create({
    profileId,
    key,
    createdBy,
  }: Prisma.ProfilePermissionUncheckedCreateInput): Promise<ProfilePermission> {
    const profilePermission = await this.prisma.profilePermission.create({
      data: { profileId, key, createdBy, updatedBy: createdBy },
    })

    return profilePermission
  }

  async list(options?: IListOptions): Promise<ProfilePermission[]> {
    const { skip, take } = calcPagination(options)

    const profilePermissions = await this.prisma.profilePermission.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    })

    return profilePermissions
  }

  async listByProfileId(
    profileId: ProfilePermission['profileId'],
    options?: IListOptions,
  ): Promise<ProfilePermission[]> {
    const { skip, take } = calcPagination(options)

    const profilePermissions = await this.prisma.profilePermission.findMany({
      where: {
        profileId,
      },
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
