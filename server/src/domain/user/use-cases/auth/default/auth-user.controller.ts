import { Body, Controller, HttpCode, Post } from '@nestjs/common'
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
  async handle(@Body(bodyValidationPipe) body: AuthUserBodySchema) {
    const { username, password } = body

    const auth = await this.authUser.execute({ username, password })

    const { token, refreshToken } = auth

    return {
      token,
      refreshToken,
    }
  }
}
