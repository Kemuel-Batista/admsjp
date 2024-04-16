import { Controller, Get, Query, Req, Res } from '@nestjs/common'
import { type Request, type Response } from 'express'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'

import { ListProfileUseCase } from './list-profile'

@Controller()
export class ListProfileController {
  constructor(private listProfileUseCase: ListProfileUseCase) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { page, pageSize, allRecords } = query
    const { search } = request.cookies
    const { user } = request

    const parsedSearch = search ? JSON.parse(search) : []
    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }
    const { profiles, count } = await this.listProfileUseCase.execute(
      options,
      parsedSearch,
      user,
    )

    response.setHeader('X-Total-Count', count)

    return response.status(HttpStatusCode.OK).json(profiles)
  }
}
