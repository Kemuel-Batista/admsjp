import { Body, Controller, HttpCode, Put } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { UpdateUserPasswordUseCase } from './update-user-password'

const updateUserPasswordSchema = z.object({
  id: z.number().int().positive(),
  password: z.string().min(6).max(20),
})

type UpdateUserPasswordBodySchema = z.infer<typeof updateUserPasswordSchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserPasswordSchema)

@Controller('/password')
class UpdateUserPasswordController {
  constructor(private updateUserPassword: UpdateUserPasswordUseCase) {}

  @Put()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserPasswordBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id, password } = body

    await this.updateUserPassword.execute(id, password, user.sub.id)
  }
}

export { UpdateUserPasswordController }
