import { Body, Controller, HttpCode, Put, Req } from '@nestjs/common'
import { Request } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { UserUpdateSelfPasswordUseCase } from './user-update-self-password'

const userUpdateSelfPasswordSchema = z.object({
  newPassword: z.string().min(6).max(20),
  oldPassword: z.string().min(6).max(20),
})

type UserUpdateSelfPasswordBodySchema = z.infer<
  typeof userUpdateSelfPasswordSchema
>

const bodyValidationPipe = new ZodValidationPipe(userUpdateSelfPasswordSchema)

@Controller('')
export class UserUpdateSelfPasswordController {
  constructor(private userUpdateSelfPassword: UserUpdateSelfPasswordUseCase) {}

  @Put()
  @HttpCode(HttpStatusCode.NO_CONTENT)
  async handle(
    @Body(bodyValidationPipe) body: UserUpdateSelfPasswordBodySchema,
    @Req() request: Request,
  ) {
    const { oldPassword, newPassword } = body
    const { user } = request

    await this.userUpdateSelfPassword.execute(user.id, oldPassword, newPassword)
  }
}
