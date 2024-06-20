import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/admsjp/use-cases/user/authenticate-user'
import { GetUserByEmailUseCase } from '@/domain/admsjp/use-cases/user/get-user-by-email'
import { RegisterUserUseCase } from '@/domain/admsjp/use-cases/user/register-user'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DateProviderModule } from '@/infra/providers/date-provider.module'

import { AuthGoogleController } from './controllers/auth-google.controller'
import { AuthGoogleRedirectController } from './controllers/auth-google-redirect.controller'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { LogoutUserController } from './controllers/logout-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, DateProviderModule],
  controllers: [
    AuthenticateUserController,
    AuthGoogleController,
    AuthGoogleRedirectController,
    LogoutUserController,
  ],
  providers: [
    AuthenticateUserUseCase,
    GetUserByEmailUseCase,
    RegisterUserUseCase,
  ],
})
export class AuthHttpModule {}
