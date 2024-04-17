import { Module } from '@nestjs/common'

import { ProfileDatabaseModule } from '../database/profile-database.module'
import { FindProfileByIdUseCase } from '../use-cases/find/by-id/find-profile-by-id'
import { ListProfileUseCase } from '../use-cases/list/default/list-profile'
import { ListProfileController } from '../use-cases/list/default/list-profile.controller'

@Module({
  imports: [ProfileDatabaseModule],
  controllers: [ListProfileController],
  providers: [ListProfileUseCase, FindProfileByIdUseCase],
  exports: [ListProfileUseCase, FindProfileByIdUseCase],
})
export class ProfileHttpModule {}
