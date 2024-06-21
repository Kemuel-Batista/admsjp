import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { ListEventTicketsUnexpiredByUserUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-unexpired-by-user'
import { EventSocket } from '@/domain/admsjp/websocket/event-socket'

import { DatabaseModule } from '../database/database.module'
import { EventSocketIO } from './event-socket-io'

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [
    { provide: EventSocket, useClass: EventSocketIO },
    ListEventTicketsUnexpiredByUserUseCase,
  ],
  exports: [EventSocket],
})
export class WebsocketModule {}
