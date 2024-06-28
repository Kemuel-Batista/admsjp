import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'

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
  ) {
    const { page, pageSize, allRecords } = query

    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const result = await this.listEventLotByEventIdUseCase.execute({
      eventId: id,
      options,
    })

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of events')
    }

    const { eventLots } = result.value

    return {
      eventLots,
    }
  }
}
