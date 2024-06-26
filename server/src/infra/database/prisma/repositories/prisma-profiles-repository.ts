import { Injectable } from '@nestjs/common'
import { Prisma, Profile } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaProfilesRepository implements ProfilesRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    name,
    status,
    visible,
    createdBy,
  }: Prisma.ProfileUncheckedCreateInput): Promise<Profile> {
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
  }: Profile): Promise<Profile> {
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

  async list(options?: ListOptions): Promise<Profile[]> {
    const { skip, take } = calcPagination(options)

    const profiles = await this.prisma.profile.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    })

    return profiles
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
