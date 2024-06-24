import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { EventSocket } from '@/domain/admsjp/websocket/event-socket'

import { DatabaseModule } from '../database/database.module'
import { EventSocketIO } from './event-socket-io'

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [{ provide: EventSocket, useClass: EventSocketIO }],
  exports: [EventSocket],
})
export class WebsocketModule {}
