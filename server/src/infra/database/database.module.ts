import { Module } from '@nestjs/common'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { UsersRepository } from '@/domain/repositories/users-repository'
import { PrismaService } from './prisma/prisma.service'
import { PrismaDepartmentsRepository } from './prisma/repositories/prisma-departments-repository'
import { DepartmentsRepository } from '@/domain/repositories/departments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, DepartmentsRepository],
})
export class DatabaseModule {}
