import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateUseCase } from '@/domain/use-cases/administrators/authenticate'
import { CreateAccountUseCase } from '@/domain/use-cases/administrators/create-account'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController, CreateAccountController],
  providers: [AuthenticateUseCase, CreateAccountUseCase],
})
export class HttpModule {}
