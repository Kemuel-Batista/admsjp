import { Controller, Get, Query, Req, Res } from '@nestjs/common'
import { type Request, type Response } from 'express'

import HttpStatusCode from '@/core/enums/http-status-code'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { ListProfileUseCase } from '@/domain/admsjp/use-cases/profile/list/default/list-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller()
export class ListProfileController {
  constructor(private listProfileUseCase: ListProfileUseCase) {}

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

    const { profiles, count } = await this.listProfileUseCase.execute(
      options,
      parsedSearch,
      user.sub.profileId,
    )

    response.setHeader('X-Total-Count', count)

    return response.status(HttpStatusCode.OK).json(profiles)
  }
}
