import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Church, ChurchProps } from '@/domain/admsjp/enterprise/entities/church'
import { PrismaChurchMapper } from '@/infra/database/prisma/mappers/prisma-church-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeChurch(
  override: Partial<ChurchProps> = {},
  id?: UniqueEntityID,
) {
  const church = Church.create(
    {
      name: faker.commerce.productMaterial(),
      description: faker.commerce.productDescription(),
      street: faker.location.streetAddress(),
      neighborhood: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.countryCode(),
      number: faker.location.buildingNumber(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return church
}

@Injectable()
export class ChurchFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaChurch(data: Partial<ChurchProps> = {}): Promise<Church> {
    const church = makeChurch(data)

    await this.prisma.church.create({
      data: PrismaChurchMapper.toPersistency(church),
    })

    return church
  }
}
