import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  NewBeliever,
  NewBelieverProps,
} from '@/domain/admsjp/enterprise/entities/new-believer'
import { PrismaNewBelieverMapper } from '@/infra/database/prisma/mappers/prisma-new-believer-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeNewBeliever(
  override: Partial<NewBelieverProps> = {},
  id?: UniqueEntityID,
) {
  const newBeliever = NewBeliever.create(
    {
      churchId: new UniqueEntityID(),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      birthday: faker.date.birthdate(),
      street: faker.location.streetAddress(),
      neighborhood: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.countryCode(),
      number: faker.location.buildingNumber(),
      lgpd: true,
      ...override,
    },
    id,
  )

  return newBeliever
}

@Injectable()
export class NewBelieverFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNewBeliever(
    data: Partial<NewBelieverProps> = {},
  ): Promise<NewBeliever> {
    const newBeliever = makeNewBeliever(data)

    await this.prisma.newBeliever.create({
      data: PrismaNewBelieverMapper.toPersistency(newBeliever),
    })

    return newBeliever
  }
}
