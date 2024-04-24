import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common'
import { type Request, type Response } from 'express'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/user/enums/user-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

import { ListEventsUseCase } from '../../use-cases/list/default/list-events'

@Controller('/')
export class ListEventsController {
  constructor(private listEventsUseCase: ListEventsUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR, UserProfile.EVENTS)
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

    const { events, count } = await this.listEventsUseCase.execute(
      options,
      parsedSearch,
      user.sub.profileId,
      user.sub.departmentId,
    )

    response.setHeader('X-Total-Count', count)

    return response.status(HttpStatusCode.OK).json(events)
  }
}
