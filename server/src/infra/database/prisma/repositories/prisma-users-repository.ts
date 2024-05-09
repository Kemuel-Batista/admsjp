import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import {
  CreateUserDTO,
  ListUserWithCountDTO,
  UpdateUserDTO,
} from '@/domain/admsjp/dtos/user'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    username,
    email,
    name,
    password,
    status,
    departmentId,
    profileId,
    createdBy,
  }: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        name,
        password,
        status,
        departmentId,
        profileId,
        createdBy,
        updatedBy: createdBy,
      },
    })

    return user
  }

  async update({
    id,
    username,
    email,
    name,
    password,
    status,
    departmentId,
    profileId,
    updatedBy,
  }: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: username ?? undefined,
        email: email ?? undefined,
        name: name ?? undefined,
        password: password ?? undefined,
        status: status ?? undefined,
        departmentId: departmentId ?? undefined,
        profileId: profileId ?? undefined,
        updatedBy,
      },
    })

    return user
  }

  async list(
    options?: IListOptions,
    searchParams: ISearchParamDTO[] = [],
  ): Promise<ListUserWithCountDTO> {
    const { skip, take } = calcPagination(options)

    const search = buildSearchFilter<User>(searchParams)

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: search,
        select: {
          id: true,
          uuid: true,
          name: true,
          username: true,
          email: true,
          password: false,
          status: true,
          departmentId: true,
          profileId: true,
          createdAt: true,
          updatedAt: true,
          createdBy: true,
          updatedBy: true,
          deletedAt: true,
          deletedBy: true,
        },
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
      this.prisma.user.count({ where: search }),
    ])

    return { users, count }
  }

  async findById(id: User['id']): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByUsername(username: User['username']): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    return user
  }

  async delete(userId: User['id']): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
