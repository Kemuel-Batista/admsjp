import { Module } from '@nestjs/common'

import { LogsRepository } from '@/core/repositories/logs-repository'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'
import { UserTokensRepository } from '@/domain/admsjp/repositories/user-tokens-repository'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaDepartmentRepository } from './prisma/repositories/prisma-departments-repository'
import { PrismaLogsRepository } from './prisma/repositories/prisma-logs-repository'
import { PrismaUserTokensRepository } from './prisma/repositories/prisma-user-tokens-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: LogsRepository,
      useClass: PrismaLogsRepository,
    },
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UserTokensRepository,
      useClass: PrismaUserTokensRepository,
    },
  ],
  exports: [
    PrismaService,
    LogsRepository,
    DepartmentsRepository,
    UsersRepository,
    UserTokensRepository,
  ],
})
export class DatabaseModule {}
