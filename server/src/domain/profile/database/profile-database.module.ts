import { Module } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { ProfileRepository } from '../repositories/profile-repository'
import { PrismaProfileRepository } from './prisma/repositories/prisma-profile-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
  exports: [PrismaService, ProfileRepository],
})
export class ProfileDatabaseModule {}
