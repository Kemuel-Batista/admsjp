import { Module } from '@nestjs/common'

import { DepartmentsDatabaseModule } from '../database/departments-database.module'
import { CreateDepartmentUseCase } from '../../../../domain/departments/use-cases/create/create-department'
import { FindDepartmentByIdUseCase } from '../../../../domain/departments/use-cases/find/by-id/find-department-by-id'
import { FindDepartmentByNameUseCase } from '../../../../domain/departments/use-cases/find/by-name/find-department-by-name'
import { ListDepartmentUseCase } from '../../../../domain/departments/use-cases/list/default/list-department'
import { CreateDepartmentController } from './controllers/create-department.controller'
import { ListDepartmentsController } from './controllers/list-departments.controller'

@Module({
  imports: [DepartmentsDatabaseModule],
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
