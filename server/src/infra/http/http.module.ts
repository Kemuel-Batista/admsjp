import { Module } from '@nestjs/common'

import { AuthenticateUseCase } from '@/domain/admsjp/application/use-cases/administrators/authenticate'
import { CreateAccountUseCase } from '@/domain/admsjp/application/use-cases/administrators/create-account'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController, CreateAccountController],
  providers: [AuthenticateUseCase, CreateAccountUseCase],
})
export class HttpModule {}
