import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { type Request, type Response } from 'express'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/list-department'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller()
export class ListDepartmentsController {
  constructor(private listDepartmentsUseCase: ListDepartmentUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
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

    const result = await this.listDepartmentsUseCase.execute({
      options,
      searchParams: parsedSearch,
      profileId: user.sub.profileId,
    })

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of departments')
    }

    const { departments, count } = result.value

    response.setHeader('X-Total-Count', count)

    return response.status(HttpStatus.OK).json(departments)
  }
}
