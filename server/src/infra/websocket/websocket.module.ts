import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { FindLastEventTicketUnexpiredUseCase } from '@/domain/admsjp/use-cases/event-ticket/find-last-event-ticket-unexpired'
import { EventSocket } from '@/domain/admsjp/websocket/event-socket'

import { DatabaseModule } from '../database/database.module'
import { EventSocketIO } from './event-socket-io'

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [
    { provide: EventSocket, useClass: EventSocketIO },
    FindLastEventTicketUnexpiredUseCase,
  ],
  exports: [EventSocket],
})
export class WebsocketModule {}
