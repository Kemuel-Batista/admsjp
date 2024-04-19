import { Module } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { DepartmentsRepository } from '../repositories/departments-repository'
import { PrismaDepartmentRepository } from './prisma/repositories/prisma-departments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentRepository,
    },
  ],
  exports: [PrismaService, DepartmentsRepository],
})
export class DepartmentsDatabaseModule {}
