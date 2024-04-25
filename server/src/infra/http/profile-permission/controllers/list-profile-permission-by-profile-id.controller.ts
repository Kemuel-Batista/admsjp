import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'

import HttpStatusCode from '@/core/enums/http-status-code'
import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListProfilePermissionByProfileIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/list/by-profile-Id/list-profile-permission-by-profile-id'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/by-profile-id/:profileId')
class ListProfilePermissionByProfileIdController {
  constructor(
    private listProfilePermissionByProfileId: ListProfilePermissionByProfileIdUseCase,
  ) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    @Param('profileId', paramsValidationPipe) profileId: ParamsSchema,
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

    const profilePermissions =
      await this.listProfilePermissionByProfileId.execute(
        profileId,
        options,
        parsedSearch,
      )

    return profilePermissions
  }
}

export { ListProfilePermissionByProfileIdController }
