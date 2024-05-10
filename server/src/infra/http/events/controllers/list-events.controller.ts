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
import { ListEventsUseCase } from '@/domain/admsjp/use-cases/events/list/default/list-events'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

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

    const result = await this.listEventsUseCase.execute({
      profileId: user.sub.profileId,
      departmentId: user.sub.departmentId,
      options,
      searchParams: parsedSearch,
    })

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of events')
    }

    const { events, count } = result.value

    response.setHeader('X-Total-Count', count)

    return response.status(HttpStatus.OK).json(events)
  }
}
