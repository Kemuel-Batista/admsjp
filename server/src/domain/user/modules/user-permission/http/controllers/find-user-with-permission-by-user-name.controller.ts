import { Controller, Get, HttpCode, Param } from '@nestjs/common'

import HttpStatusCode from '@/core/enums/http-status-code'

import { FindUserWithPermissionByUserNameUseCase } from '../../use-cases/find/user-permission-by-user-name/find-user-with-permission-by-user-name'

@Controller('/:userName')
export class FindUserWithPermissionByUserNameController {
  constructor(
    private findUserWithPermissionByUserName: FindUserWithPermissionByUserNameUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatusCode.OK)
  async handle(@Param('userName') userName: string) {
    const userPermissions =
      await this.findUserWithPermissionByUserName.execute(userName)

    return userPermissions
  }
}
