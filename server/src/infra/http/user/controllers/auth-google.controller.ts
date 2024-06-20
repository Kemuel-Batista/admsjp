import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'

import { GoogleOAuthGuard } from '@/infra/auth/google-oauth.guard'
import { Public } from '@/infra/auth/public'

@Controller()
@Public()
export class AuthGoogleController {
  constructor() {}
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handle() {}
}
