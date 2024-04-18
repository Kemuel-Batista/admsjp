import { Module } from '@nestjs/common'

import { ProfileDatabaseModule } from '../database/profile-database.module'
import { CreateProfileUseCase } from '../use-cases/create/create-profile'
import { FindProfileByIdUseCase } from '../use-cases/find/by-id/find-profile-by-id'
import { FindProfileByNameUseCase } from '../use-cases/find/by-name/find-profile-by-name'
import { ListProfileUseCase } from '../use-cases/list/default/list-profile'
import { CreateProfileController } from './controllers/create-profile.controller'
import { ListProfileController } from './controllers/list-profile.controller'

@Module({
  imports: [ProfileDatabaseModule],
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
