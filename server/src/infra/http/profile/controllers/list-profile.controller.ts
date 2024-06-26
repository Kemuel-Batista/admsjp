import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListProfileUseCase } from '@/domain/admsjp/use-cases/profile/list-profile'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller()
export class ListProfileController {
  constructor(private listProfileUseCase: ListProfileUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  async handle(@Query(queryValidationPipe) query: PageQueryParamSchema) {
    const { page, pageSize, allRecords } = query

    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const profiles = await this.listProfileUseCase.execute({
      options,
    })

    return {
      profiles,
    }
  }
}
