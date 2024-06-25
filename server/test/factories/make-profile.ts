import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Prisma, Profile } from '@prisma/client'

import { ProfileStatus, ProfileVisible } from '@/domain/admsjp/enums/profile'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

interface ProfileProps extends Prisma.ProfileUncheckedCreateInput {}

export function makeProfile(
  override: Partial<ProfileProps> = {},
): ProfileProps {
  return {
    name: faker.commerce.department(),
    status: ProfileStatus.ACTIVE,
    visible: ProfileVisible.VISIBLE,
    createdBy: 1,
    ...override,
  }
}

@Injectable()
export class ProfileFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProfile(data: Partial<ProfileProps> = {}): Promise<Profile> {
    const profile = makeProfile(data)

    const createdProfile = await this.prisma.profile.upsert({
      where: {
        name: profile.name,
      },
      create: profile,
      update: {},
    })

    return createdProfile
  }
}
