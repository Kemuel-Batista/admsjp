import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'

import {
  EventSocket,
  EventSocketEmmiter,
} from '@/domain/admsjp/websocket/event-socket'

import { SocketWithAuth } from './socket-io-adapter'

@WebSocketGateway(0, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATH', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Authorization',
      'Content-Type',
      'Accept',
      'Origin',
      'X-Request-With',
    ],
  },
})
export class EventSocketIO
  implements
    EventSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  private readonly logger = new Logger(EventSocketIO.name)

  @WebSocketServer() server: Server

  afterInit(): void {
    this.logger.log('Websocket gateway initialized.')
  }

  handleConnection(socket: SocketWithAuth) {
    this.logger.log(`WS Client with ID: ${socket.id} connected`)
  }

  handleDisconnect(socket: SocketWithAuth) {
    this.logger.log(`Socket.id: ${socket.id} - Cliente desconectado`)
  }

  async emit(data: EventSocketEmmiter): Promise<void> {
    if (data !== null) {
      this.server.to(data.to).emit(data.event, JSON.stringify(data))
    } else {
      this.server.to(data.to).emit(data.event)
    }
  }

  @SubscribeMessage('event-entry')
  async handleEvent(@ConnectedSocket() socket: SocketWithAuth) {
    const userId = socket.sub.id
    socket.join(`purchase:${userId}`)
  }
}
