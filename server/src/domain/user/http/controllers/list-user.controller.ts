import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { Request, Response } from 'express'

import HttpStatusCode from '@/core/enums/http-status-code'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'

import { ListUserUseCase } from '../../use-cases/list-user/default/list-user'

@Controller('/')
export class ListUserController {
  constructor(private listUser: ListUserUseCase) {}

  @Get()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    request: Request,
    response: Response,
  ) {
    const { allRecords, page, pageSize } = query
    const { search } = request.cookies

    const parsedSearch = search ? JSON.parse(search) : []
    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const { users, count } = await this.listUser.execute(options, parsedSearch)

    response.header('X-Total-Count', String(count))

    return users
  }
}
