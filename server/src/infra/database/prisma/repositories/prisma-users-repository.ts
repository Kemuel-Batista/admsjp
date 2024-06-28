import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    email,
    name,
    password,
    photo,
    status,
    departmentId,
    provider,
    createdBy,
  }: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        photo,
        status,
        departmentId,
        provider,
        createdBy,
        updatedBy: createdBy,
      },
    })

    return user
  }

  async update({
    id,
    email,
    name,
    password,
    status,
    departmentId,
    updatedBy,
  }: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: email ?? undefined,
        name: name ?? undefined,
        password: password ?? undefined,
        status: status ?? undefined,
        departmentId: departmentId ?? undefined,
        updatedBy,
      },
    })

    return user
  }

  async list(options?: ListOptions): Promise<User[]> {
    const { skip, take } = calcPagination(options)

    const users = await this.prisma.user.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    })

    return users
  }

  async findById(id: User['id']): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
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
