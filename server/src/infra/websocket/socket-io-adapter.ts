import { INestApplicationContext, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server, ServerOptions, Socket } from 'socket.io'

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
    port = this.configService.get('SOCKETIO_SERVER_PORT')
    const path = this.configService.get('SOCKETIO_SERVER_PATH')

    options.path = path
    options.cors = {
      origin: '*',
    }

    this.logger.log('Configuring SocketIO server')

    const jwtService = this.app.get(JwtService)
    const server: Server = super.createIOServer(port, options)

    server.use(this.createTokenMiddleware(jwtService, this.logger))

    return server
  }

  createTokenMiddleware =
    (jwtService: JwtService, logger: Logger) =>
    (socket: SocketWithAuth, next) => {
      const token =
        socket.handshake.auth.token || socket.handshake.headers.token

      logger.debug(`Validating auth token before connection: ${token}`)

      try {
        const payload: UserPayload = jwtService.verify(token)

        socket.sub = payload.sub

        next()
      } catch (error) {
        next(new Error('FORBIDDEN'))
      }
    }
}
