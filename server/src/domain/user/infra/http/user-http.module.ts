import { Module } from '@nestjs/common'

import { FindUserByIdUseCase } from '../../use-cases/find/by-id/find-user-by-id'
import { FindUserByIdController } from '../../use-cases/find/by-id/find-user-by-id.controller'
import { FindUserByUsernameUseCase } from '../../use-cases/find/by-username/find-user-by-username'

@Module({
  controllers: [FindUserByIdController],
  providers: [FindUserByIdUseCase, FindUserByUsernameUseCase],
})
export class UserHttpModule {}
