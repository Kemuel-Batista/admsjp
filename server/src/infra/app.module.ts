import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { AuthModule } from './auth/auth.module'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { HttpModule } from './http/http.module'
import { JobsModule } from './jobs/jobs.module'
import { WebsocketModule } from './websocket/websocket.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    WebsocketModule,
    AuthModule,
    HttpModule,
    EnvModule,
    JobsModule,
  ],
})
export class AppModule {}
