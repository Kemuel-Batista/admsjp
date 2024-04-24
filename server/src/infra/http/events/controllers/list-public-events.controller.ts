import { Controller, Get, Query, Req, Res } from '@nestjs/common'
import { type Request, type Response } from 'express'

import HttpStatusCode from '@/core/enums/http-status-code'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { ListPublicEventsUseCase } from '@/domain/admsjp/use-cases/events/list/public/list-public-events'
import { Public } from '@/infra/auth/public'

@Controller('/')
@Public()
export class ListPublicEventsController {
  constructor(private listPublicEventsUseCase: ListPublicEventsUseCase) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { page, pageSize, allRecords } = query
    const { search } = request.cookies

    const parsedSearch = search ? JSON.parse(search) : []
    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const { events, count } = await this.listPublicEventsUseCase.execute(
      options,
      parsedSearch,
    )

    response.setHeader('X-Total-Count', count)

    return response.status(HttpStatusCode.OK).json(events)
  }
}
