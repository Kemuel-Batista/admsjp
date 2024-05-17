import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common'
import { type Request, type Response } from 'express'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { ListEventLotByEventIdUseCase } from '@/domain/admsjp/use-cases/event-lot/list-event-lot-by-event-id'
import { Public } from '@/infra/auth/public'

@Controller('/event/:id')
@Public()
export class ListEventLotByEventIdController {
  constructor(
    private listEventLotByEventIdUseCase: ListEventLotByEventIdUseCase,
  ) {}

  @Get()
  async handle(
    @Param('id', paramsValidationPipe) id: ParamsSchema,
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

    const result = await this.listEventLotByEventIdUseCase.execute({
      eventId: id,
      options,
      searchParams: parsedSearch,
    })

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of events')
    }

    const { eventLots, count } = result.value

    response.setHeader('X-Total-Count', count)

    return response.status(HttpStatus.OK).json(eventLots)
  }
}
