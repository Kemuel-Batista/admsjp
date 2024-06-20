import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { UserStatus } from '@/domain/admsjp/enums/user'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface UserProps extends Omit<Prisma.UserUncheckedCreateInput, 'profileId'> {
  profileId: number
}

export function makeUser(override: Partial<UserProps> = {}): UserProps {
  return {
    name: faker.person.firstName(),
    status: UserStatus.ACTIVE,
    profileId: 1,
    email: faker.internet.email(),
    password: faker.internet.password(),
    departmentId: 1,
    createdBy: 1,
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
