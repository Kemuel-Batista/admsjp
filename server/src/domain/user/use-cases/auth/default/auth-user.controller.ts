import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { AuthUserUseCase } from './auth-user'

const authUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
})

type AuthUserBodySchema = z.infer<typeof authUserSchema>

const bodyValidationPipe = new ZodValidationPipe(authUserSchema)

@Controller('/session')
@Public()
export class AuthUserController {
  constructor(private authUser: AuthUserUseCase) {}
  @Post()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Body(bodyValidationPipe) body: AuthUserBodySchema,
    @Res() response: Response,
  ) {
    const { username, password } = body

    const token = await this.authUser.execute({ username, password })

    return response.json(token)
  }
}
