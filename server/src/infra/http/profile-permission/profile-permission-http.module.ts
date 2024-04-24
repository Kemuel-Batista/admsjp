import { Module } from '@nestjs/common'

import { FindProfileByIdUseCase } from '@/domain/admsjp/use-cases/profile/find/by-id/find-profile-by-id'
import { CreateProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/create/create-profile-permission'
import { DeleteProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/delete/by-id/delete-profile-permission-by-id'
import { FindProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/find/by-id/find-profile-permission-by-id'
import { FindProfilePermissionByKeyProfileIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/find/by-key-profile-id/find-profile-permission-by-key-profile-id'
import { ListProfilePermissionByProfileIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/list/by-profile-Id/list-profile-permission-by-profile-id'
import { ListProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/list/default/list-profile-permission'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateProfilePermissionController } from './controllers/create-profile-permission.controller'
import { DeleteProfilePermissionByIdController } from './controllers/delete-profile-permission-by-id.controller'
import { FindProfilePermissionByIdController } from './controllers/find-profile-permission-by-id.controller'
import { ListProfilePermissionController } from './controllers/list-profile-permission.controller'
import { ListProfilePermissionByProfileIdController } from './controllers/list-profile-permission-by-profile-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ListProfilePermissionController,
    ListProfilePermissionByProfileIdController,
    FindProfilePermissionByIdController,
    CreateProfilePermissionController,
    DeleteProfilePermissionByIdController,
  ],
  providers: [
    ListProfilePermissionUseCase,
    ListProfilePermissionByProfileIdUseCase,
    FindProfilePermissionByIdUseCase,
    CreateProfilePermissionUseCase,
    DeleteProfilePermissionByIdUseCase,
    FindProfilePermissionByKeyProfileIdUseCase,
    FindProfileByIdUseCase,
  ],
  exports: [ListProfilePermissionByProfileIdUseCase],
})
export class ProfilePermissionHttpModule {}
