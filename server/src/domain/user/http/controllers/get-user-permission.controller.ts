import { Controller, Get, HttpCode } from '@nestjs/common'

import HttpStatusCode from '@/core/enums/http-status-code'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { GetUserPermissionsUseCase } from '../../use-cases/find/me/get-user-permission'

@Controller('/me')
export class GetUserPermissionController {
  constructor(private getUserPermission: GetUserPermissionsUseCase) {}

  @Get()
  @HttpCode(HttpStatusCode.OK)
  async handle(@CurrentUser() user: UserPayload) {
    const userPermission = await this.getUserPermission.execute(user.sub.id)

    return userPermission
  }
}
