import { Module } from '@nestjs/common'

import { AuthenticateUseCase } from '@/domain/admsjp/application/use-cases/administrators/authenticate'
import { CreateAccountUseCase } from '@/domain/admsjp/application/use-cases/administrators/create-account'
import { CreateChurchUseCase } from '@/domain/admsjp/application/use-cases/churchs/create-church'
import { EditChurchUseCase } from '@/domain/admsjp/application/use-cases/churchs/edit-church'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateChurchController } from './controllers/churchs/create-church.controller'
import { EditChurchController } from './controllers/churchs/edit-church.controller'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateChurchController,
    EditChurchController,
  ],
  providers: [
    AuthenticateUseCase,
    CreateAccountUseCase,
    CreateChurchUseCase,
    EditChurchUseCase,
  ],
})
export class HttpModule {}
