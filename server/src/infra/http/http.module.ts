import { Module } from '@nestjs/common'

import { AuthenticateUseCase } from '@/domain/admsjp/application/use-cases/administrators/authenticate'
import { CreateAccountUseCase } from '@/domain/admsjp/application/use-cases/administrators/create-account'
import { CreateChurchUseCase } from '@/domain/admsjp/application/use-cases/churchs/create-church'
import { EditChurchUseCase } from '@/domain/admsjp/application/use-cases/churchs/edit-church'
import { SaveChurchDepartmentUseCase } from '@/domain/admsjp/application/use-cases/churchs/save-church-department'
import { SaveChurchLeaderUseCase } from '@/domain/admsjp/application/use-cases/churchs/save-church-leader'
import { CreateDepartmentUseCase } from '@/domain/admsjp/application/use-cases/departments/create-department'
import { DeleteDepartmentUseCase } from '@/domain/admsjp/application/use-cases/departments/delete-department'
import { EditDepartmentUseCase } from '@/domain/admsjp/application/use-cases/departments/edit-department'
import { FetchDepartmentsUseCase } from '@/domain/admsjp/application/use-cases/departments/fetch-departments'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateChurchController } from './controllers/churchs/create-church.controller'
import { EditChurchController } from './controllers/churchs/edit-church.controller'
import { SaveChurchDepartmentController } from './controllers/churchs/save-church-department.controller'
import { SaveChurchLeaderController } from './controllers/churchs/save-church-leader.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateDepartmentController } from './controllers/departments/create-department.controller'
import { DeleteDepartmentController } from './controllers/departments/delete-department.controller'
import { EditDepartmentController } from './controllers/departments/edit-department.controller'
import { FetchDepartmentsController } from './controllers/departments/fetch-departments.controller'
import { FetchChurchsController } from './controllers/churchs/fetch-churchs.controller'
import { FetchChurchsUseCase } from '@/domain/admsjp/application/use-cases/churchs/fetch-churchs'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateChurchController,
    EditChurchController,
    SaveChurchLeaderController,
    SaveChurchDepartmentController,
    FetchChurchsController,
    CreateDepartmentController,
    EditDepartmentController,
    DeleteDepartmentController,
    FetchDepartmentsController,
  ],
  providers: [
    AuthenticateUseCase,
    CreateAccountUseCase,
    CreateChurchUseCase,
    EditChurchUseCase,
    SaveChurchLeaderUseCase,
    SaveChurchDepartmentUseCase,
    FetchChurchsUseCase,
    CreateDepartmentUseCase,
    EditDepartmentUseCase,
    DeleteDepartmentUseCase,
    FetchDepartmentsUseCase,
  ],
})
export class HttpModule {}
