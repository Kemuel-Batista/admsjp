import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/list/default/list-profile-permission'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/')
export class ListProfilePermissionController {
  constructor(private listProfilePermission: ListProfilePermissionUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    @Req() request: Request,
  ) {
    const { page, pageSize, allRecords } = query
    const { search } = request.cookies

    const parsedSearch = search ? JSON.parse(search) : []
    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const profilePermissions = await this.listProfilePermission.execute(
      options,
      parsedSearch,
    )

    return profilePermissions
  }
}
