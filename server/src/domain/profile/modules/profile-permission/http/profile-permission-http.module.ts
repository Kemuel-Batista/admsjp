import { Module } from '@nestjs/common'

import { ProfileDatabaseModule } from '@/domain/profile/database/profile-database.module'
import { FindProfileByIdUseCase } from '@/domain/profile/use-cases/find/by-id/find-profile-by-id'

import { ProfilePermissionsDatabaseModule } from '../database/profile-permission-database.module'
import { CreateProfilePermissionUseCase } from '../use-cases/create/create-profile-permission'
import { CreateProfilePermissionController } from '../use-cases/create/create-profile-permission.controller'
import { DeleteProfilePermissionByIdUseCase } from '../use-cases/delete/by-id/delete-profile-permission-by-id'
import { DeleteProfilePermissionByIdController } from '../use-cases/delete/by-id/delete-profile-permission-by-id.controller'
import { FindProfilePermissionByIdUseCase } from '../use-cases/find/by-id/find-profile-permission-by-id'
import { FindProfilePermissionByIdController } from '../use-cases/find/by-id/find-profile-permission-by-id.controller'
import { FindProfilePermissionByKeyProfileIdUseCase } from '../use-cases/find/by-key-profile-id/find-profile-permission-by-key-profile-id'
import { ListProfilePermissionByProfileIdUseCase } from '../use-cases/list/by-profile-Id/list-profile-permission-by-profile-id'
import { ListProfilePermissionByProfileIdController } from '../use-cases/list/by-profile-Id/list-profile-permission-by-profile-id.controller'
import { ListProfilePermissionUseCase } from '../use-cases/list/default/list-profile-permission'
import { ListProfilePermissionController } from '../use-cases/list/default/list-profile-permission.controller'

@Module({
  imports: [ProfilePermissionsDatabaseModule, ProfileDatabaseModule],
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
