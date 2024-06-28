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
import { FindDepartmentByNameUseCase } from '@/domain/admsjp/use-cases/departments/find-department-by-name'
import { FindProfileByNameUseCase } from '@/domain/admsjp/use-cases/profile/find-profile-by-name'
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
    private findProfileByName: FindProfileByNameUseCase,
    private findDepartmentByName: FindDepartmentByNameUseCase,
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
      const profile = await this.findProfileByName.execute({
        name: 'GENERAL',
      })

      const department = await this.findDepartmentByName.execute({
        name: 'GENERAL',
      })

      await this.registerUser.execute({
        name: `${reqUser.firstName} ${reqUser.lastName}`,
        email: reqUser.email,
        password: '123456',
        photo: reqUser.picture,
        provider: 'google',
        profileId: profile.id,
        departmentId: department.id,
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
      httpOnly: false,
      secure: true, // HTTPS
      sameSite: 'none',
    })

    response.redirect(
      `${process.env.APP_BASE_URL}/google/redirect/${accessToken}`,
    )
  }
}
