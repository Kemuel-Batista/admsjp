import { Module } from '@nestjs/common'

import { CreateProfileUseCase } from '@/domain/admsjp/use-cases/profile/create/create-profile'
import { FindProfileByIdUseCase } from '@/domain/admsjp/use-cases/profile/find/by-id/find-profile-by-id'
import { FindProfileByNameUseCase } from '@/domain/admsjp/use-cases/profile/find/by-name/find-profile-by-name'
import { ListProfileUseCase } from '@/domain/admsjp/use-cases/profile/list/default/list-profile'
import { DatabaseModule } from '@/infra/database/database.module'

import { CreateProfileController } from './controllers/create-profile.controller'
import { ListProfileController } from './controllers/list-profile.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ListProfileController, CreateProfileController],
  providers: [
    ListProfileUseCase,
    FindProfileByIdUseCase,
    FindProfileByNameUseCase,
    CreateProfileUseCase,
  ],
  exports: [ListProfileUseCase, FindProfileByIdUseCase],
})
export class ProfileHttpModule {}
