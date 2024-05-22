import { forwardRef, Inject, Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { FindLastEventTicketUnexpiredUseCase } from '@/domain/admsjp/use-cases/event-ticket/find-last-event-ticket-unexpired'
import {
  EventSocket,
  EventSocketEmmiter,
} from '@/domain/admsjp/websocket/event-socket'

import { SocketWithAuth } from './socket-io-adapter'

@WebSocketGateway()
export class EventSocketIO
  implements
    EventSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer() server: Server

  constructor(
    @Inject(forwardRef(() => FindLastEventTicketUnexpiredUseCase))
    private findLastEventTicketUnexpiredUseCase: FindLastEventTicketUnexpiredUseCase,
  ) {}

  private readonly logger = new Logger(EventSocketIO.name)

  afterInit(): void {
    this.logger.log('Websocket gateway initialized.')
  }

  async handleConnection(socket: SocketWithAuth) {
    this.logger.log(`WS Client with ID: ${socket.id} connected`)

    await socket.join(`purchase:${socket.sub.id}`)
  }

  handleDisconnect(socket: SocketWithAuth) {
    this.logger.log(
      `Socket.id: ${socket.id} | Socket.to: ${String(
        socket.to,
      )} - Cliente desconectado`,
    )
  }

  async emit(data: EventSocketEmmiter): Promise<void> {
    if (data !== null) {
      this.server.emit(data.to, JSON.stringify(data))
    } else {
      this.server.emit(data.to, JSON.stringify(data))
    }
  }

  @SubscribeMessage('event-entry')
  async handleEvent(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    await socket.join(`purchase:${data.userId}`)

    await this.findLastEventTicketUnexpiredUseCase.execute({
      userId: data.userId,
    })
  }
}
