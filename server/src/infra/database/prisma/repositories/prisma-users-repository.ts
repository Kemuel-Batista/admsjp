import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '@/domain/admsjp/application/repositories/users-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    })

    return user
  }
}
