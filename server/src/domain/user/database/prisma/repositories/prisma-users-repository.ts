import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/buildSearchFilter'
import { calcPagination } from '@/core/util/pagination/calcPagination'
import { CreateUserDTO } from '@/domain/user/dtos/create-user.dto'
import { ListUserWithCountDTO } from '@/domain/user/dtos/list-user.dto'
import { UpdateUserDTO } from '@/domain/user/dtos/update-user.dto'
import { UserVisible } from '@/domain/user/enums/user-visible'
import { UsersRepository } from '@/domain/user/repositories/users-repository'
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
    name,
    password,
    status,
    profileId,
    updatedBy,
  }: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: username ?? undefined,
        name: name ?? undefined,
        password: password ?? undefined,
        status: status ?? undefined,
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

    // search only visibles
    searchParams.push({
      field: 'visible',
      condition: 'equals',
      value: UserVisible.VISIBLE,
    })

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
          profileId: true,
          createdAt: true,
          updatedAt: true,
          createdBy: true,
          updatedBy: true,
          deletedAt: true,
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
