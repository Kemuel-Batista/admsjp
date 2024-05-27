import { Module } from '@nestjs/common'

import { CreateDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/create-department'
import { GetDepartmentByIdUseCase } from '@/domain/admsjp/use-cases/departments/get-department-by-id'
import { ListDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/list-department'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateDepartmentController } from './controllers/create-department.controller'
import { GetDepartmentByIdController } from './controllers/get-department-by-id.controller'
import { ListDepartmentsController } from './controllers/list-departments.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ListDepartmentsController,
    CreateDepartmentController,
    GetDepartmentByIdController,
  ],
  providers: [
    ListDepartmentUseCase,
    GetDepartmentByIdUseCase,
    CreateDepartmentUseCase,
  ],
})
export class DepartmentsHttpModule {}
