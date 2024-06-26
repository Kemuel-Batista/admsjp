import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/list-department'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller()
export class ListDepartmentsController {
  constructor(private listDepartmentsUseCase: ListDepartmentUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
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
