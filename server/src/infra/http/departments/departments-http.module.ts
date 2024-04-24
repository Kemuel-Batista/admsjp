import { Module } from '@nestjs/common'

import { CreateDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/create/create-department'
import { FindDepartmentByIdUseCase } from '@/domain/admsjp/use-cases/departments/find/by-id/find-department-by-id'
import { FindDepartmentByNameUseCase } from '@/domain/admsjp/use-cases/departments/find/by-name/find-department-by-name'
import { ListDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/list/default/list-department'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateDepartmentController } from './controllers/create-department.controller'
import { ListDepartmentsController } from './controllers/list-departments.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ListDepartmentsController, CreateDepartmentController],
  providers: [
    ListDepartmentUseCase,
    FindDepartmentByIdUseCase,
    FindDepartmentByNameUseCase,
    CreateDepartmentUseCase,
  ],
  exports: [ListDepartmentUseCase, FindDepartmentByIdUseCase],
})
export class DepartmentsHttpModule {}
