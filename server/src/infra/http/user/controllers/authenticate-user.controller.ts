import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { Response } from 'express'
import { z } from 'zod'

import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '@/domain/admsjp/use-cases/user/authenticate-user'
import { Public } from '@/infra/auth/public'
import { logger } from '@/infra/config/winston-config'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserSchema>

const bodyValidationPipe = new ZodValidationPipe(authenticateUserSchema)

@Controller('/session')
@Public()
export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body(bodyValidationPipe) body: AuthenticateUserBodySchema,
    @Res() response: Response,
  ) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({ email, password })

    if (result.isError()) {
      const error = result.value
      logger.error(`Authenticate User Error - ${error.message}`)

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return response
      .cookie('nextauth.token', accessToken, {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hora em milissegundos
        httpOnly: true,
        path: '/',
        secure: true, // HTTPS
        sameSite: true,
      })
      .status(200)
      .send()
  }
}
