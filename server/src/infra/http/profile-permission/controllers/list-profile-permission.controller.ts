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
import { ListProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/list-profile-permission'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/')
export class ListProfilePermissionController {
  constructor(private listProfilePermission: ListProfilePermissionUseCase) {}

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

    const result = await this.listProfilePermission.execute({
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
