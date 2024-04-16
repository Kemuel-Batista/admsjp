import { Module } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { ProfilePermissionsRepository } from '../repositories/profile-permissions-repository'
import { PrismaProfilePermissionsRepository } from './prisma/repositories/prisma-profile-permissions-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: ProfilePermissionsRepository,
      useClass: PrismaProfilePermissionsRepository,
    },
  ],
  exports: [PrismaService, ProfilePermissionsRepository],
})
export class ProfilePermissionsDatabaseModule {}
