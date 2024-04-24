import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { CreateProfileDTO } from '@/domain/profile/dtos/create-profile.dto'
import { ListProfileDTO } from '@/domain/profile/dtos/list-profile.dto'
import { UpdateProfileDTO } from '@/domain/profile/dtos/update-profile.dto'
import { ProfileRepository } from '@/domain/profile/repositories/profile-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    name,
    status,
    visible,
    createdBy,
  }: CreateProfileDTO): Promise<Profile> {
    const profile = await this.prisma.profile.create({
      data: {
        name,
        status,
        visible,
        createdBy,
        updatedBy: createdBy,
      },
    })
    return profile
  }

  async update({
    id,
    name,
    status,
    visible,
    updatedBy,
  }: UpdateProfileDTO): Promise<Profile> {
    const profile = await this.prisma.profile.update({
      where: {
        id,
      },
      data: {
        name: name ?? undefined,
        status: status ?? undefined,
        visible: visible ?? undefined,
        updatedBy,
      },
    })

    return profile
  }

  async list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListProfileDTO> {
    const { skip, take } = calcPagination(options)

    const search = buildSearchFilter<Profile>(searchParams)

    const [profiles, count] = await this.prisma.$transaction([
      this.prisma.profile.findMany({
        where: search,
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
      this.prisma.profile.count({ where: search }),
    ])

    return { profiles, count }
  }

  async findById(id: Profile['id']): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id,
      },
    })

    return profile
  }

  async findByName(name: Profile['name']): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        name,
      },
    })

    return profile
  }
}
