import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { UserStatus } from '@/domain/admsjp/enums/user'
import { AuthenticateUserUseCase } from '@/domain/admsjp/use-cases/user/authenticate-user'
import { GetUserByEmailUseCase } from '@/domain/admsjp/use-cases/user/get-user-by-email'
import { RegisterUserUseCase } from '@/domain/admsjp/use-cases/user/register-user'
import { UserGooglePayload } from '@/infra/auth/google.strategy'
import { GoogleOAuthGuard } from '@/infra/auth/google-oauth.guard'
import { Public } from '@/infra/auth/public'

@Controller('/google-redirect')
@Public()
export class AuthGoogleRedirectController {
  constructor(
    private getUserByEmail: GetUserByEmailUseCase,
    private authenticateUser: AuthenticateUserUseCase,
    private registerUser: RegisterUserUseCase,
  ) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handle(@Req() request: Request, @Res() response: Response) {
    const reqUser = request.user as UserGooglePayload

    const user = await this.getUserByEmail.execute({
      email: reqUser.email,
    })

    let accessToken: string

    if (user) {
      const result = await this.authenticateUser.execute({
        email: user.email,
        password: '123456',
      })

      if (result.isError()) {
        response.redirect(`${process.env.APP_BASE_URL}`)
        return
      }

      accessToken = result.value.accessToken
    } else {
      await this.registerUser.execute({
        name: `${reqUser.firstName} ${reqUser.lastName}`,
        email: reqUser.email,
        password: '123456',
        photo: reqUser.picture,
        provider: 'google',
        profileId: 2, // General profile
        departmentId: 3, // General Department
        status: UserStatus.ACTIVE,
      })

      const result = await this.authenticateUser.execute({
        email: reqUser.email,
        password: '123456',
      })

      if (result.isError()) {
        response.redirect(`${process.env.APP_BASE_URL}`)
        return
      }

      accessToken = result.value.accessToken
    }

    response.cookie('nextauth_token', accessToken, {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hora em milissegundos
      httpOnly: true,
      secure: true, // HTTPS
    })

    response.redirect(`${process.env.APP_BASE_URL}`)
  }
}
