import { Controller, Get, HttpCode, Req } from '@nestjs/common'
import { Request } from 'express'

import HttpStatusCode from '@/core/enums/HttpStatusCode'

import { GetUserPermissionsUseCase } from './get-user-permission'

@Controller('')
export class GetUserPermissionController {
  constructor(private getUserPermission: GetUserPermissionsUseCase) {}

  @Get()
  @HttpCode(HttpStatusCode.OK)
  async handle(@Req() request: Request) {
    const { user } = request

    const userPermission = await this.getUserPermission.execute(user.id)

    return userPermission
  }
}
