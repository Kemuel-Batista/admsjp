"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQQueueConnectionManager = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = require("amqplib");
let RabbitMQQueueConnectionManager = class RabbitMQQueueConnectionManager {
    connection = null;
    channel = null;
    url = process.env.RABBITMQ_URL;
    async connect() {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)(this.url);
            this.channel = await this.connection.createChannel();
        }
    }
    async disconnect() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
            this.channel = null;
        }
    }
    async createChannel() {
        if (!this.channel) {
            console.error('Channel not established');
            return;
        }
        return this.channel;
    }
};
exports.RabbitMQQueueConnectionManager = RabbitMQQueueConnectionManager;
exports.RabbitMQQueueConnectionManager = RabbitMQQueueConnectionManager = __decorate([
    (0, common_1.Injectable)()
], RabbitMQQueueConnectionManager);
//# sourceMappingURL=rabbitmq-queue-connection-manager.js.map