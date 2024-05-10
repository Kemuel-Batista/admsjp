import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Prisma, ProfilePermission } from '@prisma/client'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface ProfilePermissionProps
  extends Prisma.ProfilePermissionUncheckedCreateInput {}

export function makeProfilePermission(
  override: Partial<ProfilePermissionProps> = {},
): ProfilePermissionProps {
  return {
    uuid: randomUUID(),
    profileId: faker.number.int({ max: 10 }),
    key: faker.hacker.abbreviation(),
    createdBy: 1,
    ...override,
  }
}

@Injectable()
export class ProfilePermissionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProfilePermission(
    data: Partial<ProfilePermissionProps> = {},
  ): Promise<ProfilePermission> {
    const profilePermission = makeProfilePermission(data)

    const createdProfilePermission = await this.prisma.profilePermission.upsert(
      {
        where: {
          uuid: profilePermission.uuid,
        },
        create: profilePermission,
        update: {},
      },
    )

    return createdProfilePermission
  }
}
