import { Module } from '@nestjs/common'

import { UserDatabaseModule } from '../../database/user-database.module'
import { CreateUserController } from '../../use-cases/create/default/create-use.controller'
import { CreateUserUseCase } from '../../use-cases/create/default/create-user'
import { FindUserByIdUseCase } from '../../use-cases/find/by-id/find-user-by-id'
import { FindUserByIdController } from '../../use-cases/find/by-id/find-user-by-id.controller'
import { FindUserByUsernameUseCase } from '../../use-cases/find/by-username/find-user-by-username'

@Module({
  imports: [UserDatabaseModule],
  controllers: [FindUserByIdController, CreateUserController],
  providers: [
    FindUserByIdUseCase,
    FindUserByUsernameUseCase,
    CreateUserUseCase,
  ],
})
export class UserHttpModule {}
