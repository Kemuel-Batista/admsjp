import { Body, Controller, HttpCode, Put } from '@nestjs/common'
import { Request } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
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
    request: Request,
  ) {
    const { id, password } = body
    const { user } = request

    await this.updateUserPassword.execute(id, password, user.id)
  }
}

export { UpdateUserPasswordController }
