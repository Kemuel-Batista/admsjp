import { Module } from '@nestjs/common'

import { RegisterUserUseCase } from '@/domain/admsjp/use-cases/user/register-user'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { RegisterUserController } from './controllers/register-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [RegisterUserController],
  providers: [RegisterUserUseCase],
})
export class UserHttpModule {}
