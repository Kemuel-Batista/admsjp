import { Module } from '@nestjs/common'

import { CreateProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/create-profile-permission'
import { DeleteProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/delete-profile-permission-by-id'
import { GetProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/get-profile-permission-by-id'
import { ListProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/list-profile-permission'
import { ListProfilePermissionByProfileIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/list-profile-permission-by-profile-id'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateProfilePermissionController } from './controllers/create-profile-permission.controller'
import { DeleteProfilePermissionByIdController } from './controllers/delete-profile-permission-by-id.controller'
import { GetProfilePermissionByIdController } from './controllers/get-profile-permission-by-id.controller'
import { ListProfilePermissionController } from './controllers/list-profile-permission.controller'
import { ListProfilePermissionByProfileIdController } from './controllers/list-profile-permission-by-profile-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ListProfilePermissionController,
    ListProfilePermissionByProfileIdController,
    GetProfilePermissionByIdController,
    CreateProfilePermissionController,
    DeleteProfilePermissionByIdController,
  ],
  providers: [
    ListProfilePermissionUseCase,
    ListProfilePermissionByProfileIdUseCase,
    GetProfilePermissionByIdUseCase,
    CreateProfilePermissionUseCase,
    DeleteProfilePermissionByIdUseCase,
  ],
  exports: [ListProfilePermissionByProfileIdUseCase],
})
export class ProfilePermissionHttpModule {}
