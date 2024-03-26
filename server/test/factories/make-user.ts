import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    })

    return user
  }
}
