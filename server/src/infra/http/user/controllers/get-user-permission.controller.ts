import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import { GetUserPermissionsUseCase } from '@/domain/admsjp/use-cases/user/find/me/get-user-permission'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/me')
export class GetUserPermissionController {
  constructor(private getUserPermission: GetUserPermissionsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@CurrentUser() user: UserPayload) {
    const userPermission = await this.getUserPermission.execute(user.sub.id)

    return userPermission
  }
}
