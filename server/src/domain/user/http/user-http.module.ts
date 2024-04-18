import { Module } from '@nestjs/common'

import { ProfileHttpModule } from '@/domain/profile/http/profile-http.module'
import { ProfilePermissionHttpModule } from '@/domain/profile/modules/profile-permission/http/profile-permission-http.module'

import { UserCryptographyModule } from '../cryptography/user-cryptography.module'
import { UserDatabaseModule } from '../database/user-database.module'
import { FindUserWithPermissionByUserNameController } from '../modules/user-permission/http/controllers/find-user-with-permission-by-user-name.controller'
import { FindUserWithPermissionByUserNameUseCase } from '../modules/user-permission/use-cases/find/user-permission-by-user-name/find-user-with-permission-by-user-name'
import { CompareHashUserPassword } from '../use-cases/auth/compare-hash-user-password/compare-hash-user-password'
import { CreateUserUseCase } from '../use-cases/create/default/create-user'
import { DeleteUserByIdUseCase } from '../use-cases/delete/by-id/delete-user-by-id'
import { FindUserByIdUseCase } from '../use-cases/find/by-id/find-user-by-id'
import { FindUserByUsernameUseCase } from '../use-cases/find/by-username/find-user-by-username'
import { ListUserUseCase } from '../use-cases/list-user/default/list-user'
import { UpdateUserUseCase } from '../use-cases/update/default/update-user'
import { UpdateUserPasswordUseCase } from '../use-cases/update/password/update-user-password'
import { UserUpdateSelfPasswordUseCase } from '../use-cases/update/self-password/user-update-self-password'
import { UpdateStatusUserUseCase } from '../use-cases/update/status/update-status-user'
import { CreateUserController } from './controllers/create-user.controller'
import { DeleteUserByIdController } from './controllers/delete-user-by-id.controller'
import { FindUserByIdController } from './controllers/find-user-by-id.controller'
import { ListUserController } from './controllers/list-user.controller'
import { UpdateStatusUserController } from './controllers/update-status-user.controller'
import { UpdateUserController } from './controllers/update-user.controller'
import { UpdateUserPasswordController } from './controllers/update-user-password.controller'
import { UserUpdateSelfPasswordController } from './controllers/user-update-self-password.controller'

@Module({
  imports: [
    UserDatabaseModule,
    UserCryptographyModule,
    ProfileHttpModule,
    ProfilePermissionHttpModule,
  ],
  controllers: [
    ListUserController,
    FindUserByIdController,
    CreateUserController,
    UpdateUserController,
    UserUpdateSelfPasswordController,
    UpdateUserPasswordController,
    UpdateStatusUserController,
    DeleteUserByIdController,
    FindUserWithPermissionByUserNameController,
  ],
  providers: [
    ListUserUseCase,
    FindUserByIdUseCase,
    FindUserByUsernameUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    UserUpdateSelfPasswordUseCase,
    UpdateUserPasswordUseCase,
    UpdateStatusUserUseCase,
    DeleteUserByIdUseCase,
    CompareHashUserPassword,
    FindUserWithPermissionByUserNameUseCase,
  ],
  exports: [FindUserByIdUseCase, FindUserWithPermissionByUserNameUseCase],
})
export class UserHttpModule {}
