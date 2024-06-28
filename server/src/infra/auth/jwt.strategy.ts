import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'

import { Env } from '../env/env'

const tokenPayloadSchema = z.object({
  sub: z.object({
    id: z.string().uuid(),
    name: z.string(),
    status: z.number(),
    roles: z.array(z.string()),
    departmentId: z.string().uuid(),
    email: z.string().email(),
    permissions: z.array(z.string()).optional(),
  }),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  private static extractJWT(request: Request): string | null {
    if (
      request.cookies &&
      'nextauth_token' in request.cookies &&
      request.cookies.nextauth_token.length > 0
    ) {
      return request.cookies.nextauth_token
    }
    return null
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}
