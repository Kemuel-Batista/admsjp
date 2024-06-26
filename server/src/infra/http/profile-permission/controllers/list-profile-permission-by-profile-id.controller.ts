import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '@/core/schemas/query-params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListProfilePermissionByProfileIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/list-profile-permission-by-profile-id'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/by-profile-id/:profileId')
class ListProfilePermissionByProfileIdController {
  constructor(
    private listProfilePermissionByProfileId: ListProfilePermissionByProfileIdUseCase,
  ) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Query(queryValidationPipe) query: PageQueryParamSchema,
    @Param('profileId', paramsValidationPipe) profileId: ParamsSchema,
  ) {
    const { page, pageSize, allRecords } = query

    const parsedAllRecords = allRecords === 'true'

    const options = {
      page,
      pageSize,
      allRecords: parsedAllRecords,
    }

    const result = await this.listProfilePermissionByProfileId.execute({
      profileId,
      options,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const profilePermissions = result.value.profilePermissions

    return {
      profilePermissions,
    }
  }
}

export { ListProfilePermissionByProfileIdController }
