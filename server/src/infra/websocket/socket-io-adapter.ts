import { INestApplicationContext, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { IoAdapter } from '@nestjs/platform-socket.io'
import * as cookie from 'cookie'
import { Server, ServerOptions, Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'

import { UserPayload } from '../auth/jwt.strategy'

export type SocketWithAuth = Socket & UserPayload

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name)

  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app)
  }

  createIOServer(port: number, options?: ServerOptions) {
    this.logger.log('Configuring SocketIO server')

    const server: Server = super.createIOServer(port, options)

    const jwtService = this.app.get(JwtService)

    server.use(
      (socket: SocketWithAuth, next: (err?: ExtendedError) => void) => {
        try {
          const cookies = cookie.parse(socket.handshake.headers.cookie || '')
          const token = cookies.nextauth_token

          const jwtKey = this.configService.get('JWT_KEY')
          const payload: UserPayload = jwtService.verify(token, {
            secret: jwtKey,
          })

          socket.sub = payload.sub

          next()
        } catch (error) {
          this.logger.error('Error verifying JWT token:', error)
          next(new Error('Unauthorized'))
        }
      },
    )

    this.logger.log('Server connected')

    return server
  }
}
