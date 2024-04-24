import { Controller, Get, HttpCode, Param, Query, Req } from '@nestjs/common'
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

import { ListProfilePermissionByProfileIdUseCase } from '../../use-cases/list/by-profile-Id/list-profile-permission-by-profile-id'

@Controller('/:profileId')
class ListProfilePermissionByProfileIdController {
  constructor(
    private listProfilePermissionByProfileId: ListProfilePermissionByProfileIdUseCase,
  ) {}

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
