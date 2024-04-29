import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { FindUserWithPermissionByUserNameUseCase } from '@/domain/admsjp/use-cases/user-permission/find/user-permission-by-user-name/find-user-with-permission-by-user-name'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/with-permission-by-username/:userName')
export class FindUserWithPermissionByUserNameController {
  constructor(
    private findUserWithPermissionByUserName: FindUserWithPermissionByUserNameUseCase,
  ) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('userName') userName: string) {
    const userPermissions =
      await this.findUserWithPermissionByUserName.execute(userName)

    return userPermissions
  }
}
