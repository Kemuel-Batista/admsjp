import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventSocket, EventSocketEmmiter } from '@/domain/admsjp/websocket/event-socket';
import { SocketWithAuth } from './socket-io-adapter';
export declare class EventSocketIO implements EventSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger;
    server: Server;
    afterInit(): void;
    handleConnection(socket: SocketWithAuth): void;
    handleDisconnect(socket: SocketWithAuth): void;
    emit(data: EventSocketEmmiter): Promise<void>;
    handleEvent(socket: SocketWithAuth): Promise<void>;
}
