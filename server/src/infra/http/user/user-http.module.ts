import { Module } from '@nestjs/common'

import { CompareHashUserPassword } from '@/domain/admsjp/use-cases/user/auth/compare-hash-user-password/compare-hash-user-password'
import { CreateUserUseCase } from '@/domain/admsjp/use-cases/user/create/default/create-user'
import { DeleteUserByIdUseCase } from '@/domain/admsjp/use-cases/user/delete/by-id/delete-user-by-id'
import { FindUserByIdUseCase } from '@/domain/admsjp/use-cases/user/find/by-id/find-user-by-id'
import { FindUserByUsernameUseCase } from '@/domain/admsjp/use-cases/user/find/by-username/find-user-by-username'
import { ListUserUseCase } from '@/domain/admsjp/use-cases/user/list-user/default/list-user'
import { UpdateUserUseCase } from '@/domain/admsjp/use-cases/user/update/default/update-user'
import { UpdateUserPasswordUseCase } from '@/domain/admsjp/use-cases/user/update/password/update-user-password'
import { UserUpdateSelfPasswordUseCase } from '@/domain/admsjp/use-cases/user/update/self-password/user-update-self-password'
import { UpdateStatusUserUseCase } from '@/domain/admsjp/use-cases/user/update/status/update-status-user'
import { FindUserWithPermissionByUserNameUseCase } from '@/domain/admsjp/use-cases/user-permission/find/user-permission-by-user-name/find-user-with-permission-by-user-name'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { ProfileHttpModule } from '@/infra/http/profile/profile-http.module'
import { ProfilePermissionHttpModule } from '@/infra/http/profile-permission/profile-permission-http.module'

import { CreateUserController } from './controllers/create-user.controller'
import { DeleteUserByIdController } from './controllers/delete-user-by-id.controller'
import { FindUserByIdController } from './controllers/find-user-by-id.controller'
import { FindUserWithPermissionByUserNameController } from './controllers/find-user-with-permission-by-user-name.controller'
import { ListUserController } from './controllers/list-user.controller'
import { UpdateStatusUserController } from './controllers/update-status-user.controller'
import { UpdateUserController } from './controllers/update-user.controller'
import { UpdateUserPasswordController } from './controllers/update-user-password.controller'
import { UserUpdateSelfPasswordController } from './controllers/user-update-self-password.controller'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
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
