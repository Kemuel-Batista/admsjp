import { Controller, Get, Query } from '@nestjs/common'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { ListProfileUseCase } from '@/domain/admsjp/use-cases/profile/list-profile'

@Controller()
export class ListProfileController {
  constructor(private listProfileUseCase: ListProfileUseCase) {}

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
