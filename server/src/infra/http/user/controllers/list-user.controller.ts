import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'

import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListUserUseCase } from '@/domain/admsjp/use-cases/user/list-user/default/list-user'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/')
export class ListUserController {
  constructor(private listUser: ListUserUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { allRecords, page, pageSize } = query
    const { search } = request.cookies

    const parsedSearch = search ? JSON.parse(search) : []
    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const { users, count } = await this.listUser.execute(options, parsedSearch)

    response.header('X-Total-Count', String(count))

    return response.json(users)
  }
}
