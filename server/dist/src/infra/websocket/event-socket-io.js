"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EventSocketIO_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSocketIO = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let EventSocketIO = EventSocketIO_1 = class EventSocketIO {
    logger = new common_1.Logger(EventSocketIO_1.name);
    server;
    afterInit() {
        this.logger.log('Websocket gateway initialized.');
    }
    handleConnection(socket) {
        this.logger.log(`WS Client with ID: ${socket.id} connected`);
    }
    handleDisconnect(socket) {
        this.logger.log(`Socket.id: ${socket.id} - Cliente desconectado`);
    }
    async emit(data) {
        if (data !== null) {
            this.server.to(data.to).emit(data.event, JSON.stringify(data));
        }
        else {
            this.server.to(data.to).emit(data.event);
        }
    }
    async handleEvent(socket) {
        const userId = socket.sub.id;
        socket.join(`purchase:${userId}`);
    }
};
exports.EventSocketIO = EventSocketIO;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventSocketIO.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('event-entry'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventSocketIO.prototype, "handleEvent", null);
exports.EventSocketIO = EventSocketIO = EventSocketIO_1 = __decorate([
    (0, websockets_1.WebSocketGateway)(0, {
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
], EventSocketIO);
//# sourceMappingURL=event-socket-io.js.map