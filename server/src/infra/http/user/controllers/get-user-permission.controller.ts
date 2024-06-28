import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import { GetUserPermissionUseCase } from '@/domain/admsjp/use-cases/user/get-user-permission'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/me')
export class GetUserPermissionController {
  constructor(private getUserPermission: GetUserPermissionUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.getUserPermission.execute({
      userId: user.sub.id,
    })

    if (result.isError()) {
      throw new BadRequestException('Erro ao carregar as permissões')
    }

    const userPermission = result.value.user

    return {
      user: userPermission,
    }
  }
}
