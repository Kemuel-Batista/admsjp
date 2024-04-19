import { Module } from '@nestjs/common'

import { DateProviderModule } from '@/infra/providers/date-provider.module'

import { UserCryptographyModule } from '../cryptography/user-cryptography.module'
import { UserDatabaseModule } from '../database/user-database.module'
import { GenerateUserTokenUseCase } from '../modules/user-token/use-cases/generate/generate-user-token'
import { CompareHashUserPassword } from '../use-cases/auth/compare-hash-user-password/compare-hash-user-password'
import { AuthUserUseCase } from '../use-cases/auth/default/auth-user'
import { CreateUserTokenUseCase } from '../use-cases/create/user-token/create-user-token'
import { DeleteRefreshTokenUseCase } from '../use-cases/delete/refresh-token/delete-refresh-token'
import { FindUserByUsernameUseCase } from '../use-cases/find/by-username/find-user-by-username'
import { FindUserTokenByRefreshTokenUseCase } from '../use-cases/find/user-token/by-refresh-token/find-user-token-by-refresh-token'
import { GenerateTokenAndRefreshTokenUseCase } from '../use-cases/generate-token-and-refresh-token/generate-token-and-refresh-token'
import { RefreshTokenUseCase } from '../use-cases/refresh-token/refresh-token'
import { AuthUserController } from './controllers/auth-user.controller'
import { RefreshTokenController } from './controllers/refresh-token.controller'

@Module({
  imports: [UserDatabaseModule, UserCryptographyModule, DateProviderModule],
  controllers: [AuthUserController, RefreshTokenController],
  providers: [
    AuthUserUseCase,
    RefreshTokenUseCase,
    FindUserByUsernameUseCase,
    CompareHashUserPassword,
    CreateUserTokenUseCase,
    GenerateUserTokenUseCase,
    FindUserTokenByRefreshTokenUseCase,
    DeleteRefreshTokenUseCase,
    GenerateTokenAndRefreshTokenUseCase,
  ],
})
export class AuthHttpModule {}
