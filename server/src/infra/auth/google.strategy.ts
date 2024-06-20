import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth2'

import { Env } from '../env/env'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService<Env, true>) {
    const clientId = config.get('GOOGLE_CLIENT_ID', { infer: true })
    const clientSecret = config.get('GOOGLE_CLIENT_SECRET', { infer: true })
    const baseURL = config.get('BASE_URL', { infer: true })

    super({
      clientID: clientId,
      clientSecret,
      callbackURL: `${baseURL}/auth/google-redirect`,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    }
    done(null, user)
  }
}
