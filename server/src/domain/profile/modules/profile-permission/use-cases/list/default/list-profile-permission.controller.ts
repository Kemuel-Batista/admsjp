import { Controller, Get, Query } from '@nestjs/common'
import { Request } from 'express'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'

import { ListProfilePermissionUseCase } from './list-profile-permission'

@Controller('/')
export class ListProfilePermissionController {
  constructor(private listProfilePermission: ListProfilePermissionUseCase) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    request: Request,
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
