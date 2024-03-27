import { Module } from '@nestjs/common'

import { ChurchDepartmentMembersRepository } from '@/domain/admsjp/application/repositories/church-department-members-repository'
import { ChurchDepartmentsRepository } from '@/domain/admsjp/application/repositories/church-departments-repository'
import { ChurchLeadersRepository } from '@/domain/admsjp/application/repositories/church-leaders-repository'
import { ChurchsRepository } from '@/domain/admsjp/application/repositories/churchs-repository'
import { DepartmentsRepository } from '@/domain/admsjp/application/repositories/departments-repository'
import { UsersRepository } from '@/domain/admsjp/application/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaChurchDepartmentMembersRepository } from './prisma/repositories/prisma-church-department-members-repository'
import { PrismaChurchDepartmentsRepository } from './prisma/repositories/prisma-church-departments-repository'
import { PrismaChurchLeadersRepository } from './prisma/repositories/prisma-church-leaders-repository'
import { PrismaChurchsRepository } from './prisma/repositories/prisma-churchs-repository'
import { PrismaDepartmentsRepository } from './prisma/repositories/prisma-departments-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

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
    {
      provide: ChurchsRepository,
      useClass: PrismaChurchsRepository,
    },
    {
      provide: ChurchLeadersRepository,
      useClass: PrismaChurchLeadersRepository,
    },
    {
      provide: ChurchDepartmentsRepository,
      useClass: PrismaChurchDepartmentsRepository,
    },
    {
      provide: ChurchDepartmentMembersRepository,
      useClass: PrismaChurchDepartmentMembersRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    DepartmentsRepository,
    ChurchsRepository,
    ChurchLeadersRepository,
    ChurchDepartmentsRepository,
    ChurchDepartmentMembersRepository,
  ],
})
export class DatabaseModule {}
