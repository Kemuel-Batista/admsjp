import { Body, Controller, HttpCode, Put } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
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

@Controller('/self-password')
export class UserUpdateSelfPasswordController {
  constructor(private userUpdateSelfPassword: UserUpdateSelfPasswordUseCase) {}

  @Put()
  @HttpCode(HttpStatusCode.NO_CONTENT)
  async handle(
    @Body(bodyValidationPipe) body: UserUpdateSelfPasswordBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { oldPassword, newPassword } = body

    await this.userUpdateSelfPassword.execute(
      user.sub.id,
      oldPassword,
      newPassword,
    )
  }
}
