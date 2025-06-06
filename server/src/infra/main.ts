import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { Env } from './env/env'
import { HttpExceptionFilter } from './middlewares/http-exception.filter'
import { SocketIOAdapter } from './websocket/socket-io-adapter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const corsOptions: CorsOptions = {
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'PATH',
      'OPTIONS',
      'HEAD',
    ],
    origin: ['http://localhost:3000', 'https://umadsjp.vercel.app'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'Authorization',
      'Content-Type',
      'Accept',
    ],
    exposedHeaders: ['Set-Cookie'],
  }

  app.enableCors(corsOptions)

  app.use(cookieParser())

  app.useGlobalFilters(new HttpExceptionFilter())

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService))

  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
