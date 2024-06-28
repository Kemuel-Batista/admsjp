import { Module } from '@nestjs/common'

import { CreateProfileUseCase } from '@/domain/admsjp/use-cases/profile/create-profile'
import { ListProfileUseCase } from '@/domain/admsjp/use-cases/profile/list-profile'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateProfileController } from './controllers/create-profile.controller'
import { ListProfileController } from './controllers/list-profile.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ListProfileController, CreateProfileController],
  providers: [ListProfileUseCase, CreateProfileUseCase],
  exports: [ListProfileUseCase],
})
export class ProfileHttpModule {}
