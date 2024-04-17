import { Module } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { UserTokensRepositoryPrisma } from '../modules/user-token/database/prisma/repositories/prisma-user-tokens-repository'
import { UserTokensRepository } from '../modules/user-token/repositories/user-tokens-repository'
import { UsersRepository } from '../repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UserTokensRepository,
      useClass: UserTokensRepositoryPrisma,
    },
  ],
  exports: [PrismaService, UsersRepository, UserTokensRepository],
})
export class UserDatabaseModule {}
