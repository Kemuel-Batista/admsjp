import { Module } from '@nestjs/common'

import { CompareHashUserPassword } from '@/domain/admsjp/use-cases/user/auth/compare-hash-user-password/compare-hash-user-password'
import { AuthUserUseCase } from '@/domain/admsjp/use-cases/user/auth/default/auth-user'
import { DeleteRefreshTokenUseCase } from '@/domain/admsjp/use-cases/user/delete/refresh-token/delete-refresh-token'
import { FindUserByUsernameUseCase } from '@/domain/admsjp/use-cases/user/find/by-username/find-user-by-username'
import { FindUserTokenByRefreshTokenUseCase } from '@/domain/admsjp/use-cases/user/find/user-token/by-refresh-token/find-user-token-by-refresh-token'
import { GenerateTokenAndRefreshTokenUseCase } from '@/domain/admsjp/use-cases/user/generate-token-and-refresh-token/generate-token-and-refresh-token'
import { RefreshTokenUseCase } from '@/domain/admsjp/use-cases/user/refresh-token/refresh-token'
import { CreateUserTokenUseCase } from '@/domain/admsjp/use-cases/user-token/create/create-user-token'
import { DeleteUserTokenByUserIdUseCase } from '@/domain/admsjp/use-cases/user-token/delete/by-user-id/delete-user-token-by-user-id'
import { GenerateUserTokenUseCase } from '@/domain/admsjp/use-cases/user-token/generate/generate-user-token'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { DateProviderModule } from '@/infra/providers/date-provider.module'

import { AuthUserController } from './controllers/auth-user.controller'
import { RefreshTokenController } from './controllers/refresh-token.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, DateProviderModule],
  controllers: [AuthUserController, RefreshTokenController],
  providers: [
    AuthUserUseCase,
    RefreshTokenUseCase,
    CreateUserTokenUseCase,
    GenerateUserTokenUseCase,
    CompareHashUserPassword,
    DeleteRefreshTokenUseCase,
    GenerateTokenAndRefreshTokenUseCase,
    DeleteUserTokenByUserIdUseCase,
    FindUserTokenByRefreshTokenUseCase,
    FindUserByUsernameUseCase,
  ],
})
export class AuthHttpModule {}
