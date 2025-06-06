import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { ListDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/list-department'

@Controller()
export class ListDepartmentsController {
  constructor(private listDepartmentsUseCase: ListDepartmentUseCase) {}

  @Get()
  async handle(@Query(queryValidationPipe) query: PageQueryParamSchema) {
    const { page, pageSize, allRecords } = query

    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const result = await this.listDepartmentsUseCase.execute({
      options,
    })

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of departments')
    }

    const { departments } = result.value

    return {
      departments,
    }
  }
}
