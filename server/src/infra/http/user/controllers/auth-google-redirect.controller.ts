import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'

import { GoogleOAuthGuard } from '@/infra/auth/google-oauth.guard'
import { Public } from '@/infra/auth/public'

@Controller('/google-redirect')
@Public()
export class AuthGoogleRedirectController {
  constructor() {}
  @Get()
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handle(@Req() request, @Res() response: Response) {
    const user = request.user

    console.log(user)
  }
}
