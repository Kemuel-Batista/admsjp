import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { UserStatus } from '@/domain/admsjp/enums/user'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface UserProps extends Prisma.UserUncheckedCreateInput {}

export function makeUser(override: Partial<UserProps> = {}): UserProps {
  return {
    name: faker.person.firstName(),
    status: UserStatus.ACTIVE,
    email: faker.internet.email(),
    password: faker.internet.password(),
    departmentId: randomUUID(),
    createdBy: randomUUID(),
    ...override,
  }
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    const createdUser = await this.prisma.user.upsert({
      where: {
        email: user.email,
      },
      create: user,
      update: {},
    })

    return createdUser
  }
}
