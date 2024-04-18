import { Module } from '@nestjs/common'

import { ProfileHttpModule } from '@/domain/profile/http/profile-http.module'
import { ProfilePermissionHttpModule } from '@/domain/profile/modules/profile-permission/http/profile-permission-http.module'

import { UserCryptographyModule } from '../cryptography/user-cryptography.module'
import { UserDatabaseModule } from '../database/user-database.module'
import { FindUserWithPermissionByUserNameUseCase } from '../modules/user-permission/use-cases/find/user-permission-by-user-name/find-user-with-permission-by-user-name'
import { FindUserWithPermissionByUserNameController } from '../modules/user-permission/use-cases/find/user-permission-by-user-name/find-user-with-permission-by-user-name.controller'
import { CompareHashUserPassword } from '../use-cases/auth/compare-hash-user-password/compare-hash-user-password'
import { CreateUserController } from '../use-cases/create/default/create-use.controller'
import { CreateUserUseCase } from '../use-cases/create/default/create-user'
import { DeleteUserByIdUseCase } from '../use-cases/delete/by-id/delete-user-by-id'
import { DeleteUserByIdController } from '../use-cases/delete/by-id/delete-user-by-id.controller'
import { FindUserByIdUseCase } from '../use-cases/find/by-id/find-user-by-id'
import { FindUserByIdController } from '../use-cases/find/by-id/find-user-by-id.controller'
import { FindUserByUsernameUseCase } from '../use-cases/find/by-username/find-user-by-username'
import { ListUserUseCase } from '../use-cases/list-user/default/list-user'
import { ListUserController } from '../use-cases/list-user/default/list-user.controller'
import { UpdateUserUseCase } from '../use-cases/update/default/update-user'
import { UpdateUserController } from '../use-cases/update/default/update-user.controller'
import { UpdateUserPasswordUseCase } from '../use-cases/update/password/update-user-password'
import { UpdateUserPasswordController } from '../use-cases/update/password/update-user-password.controller'
import { UserUpdateSelfPasswordUseCase } from '../use-cases/update/self-password/user-update-self-password'
import { UserUpdateSelfPasswordController } from '../use-cases/update/self-password/user-update-self-password.controller'
import { UpdateStatusUserUseCase } from '../use-cases/update/status/update-status-user'
import { UpdateStatusUserController } from '../use-cases/update/status/update-status-user.controller'

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
