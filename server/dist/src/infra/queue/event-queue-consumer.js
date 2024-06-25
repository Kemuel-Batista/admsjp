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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueueConsumer = void 0;
const common_1 = require("@nestjs/common");
const amqp = require("amqplib");
const create_event_purchase_1 = require("../../domain/admsjp/use-cases/event-purchase/create-event-purchase");
const event_socket_1 = require("../../domain/admsjp/websocket/event-socket");
let EventQueueConsumer = class EventQueueConsumer {
    createEventPurchase;
    eventSocket;
    queueName = 'event_queue';
    connection;
    channel;
    constructor(createEventPurchase, eventSocket) {
        this.createEventPurchase = createEventPurchase;
        this.eventSocket = eventSocket;
    }
    async onModuleInit() {
        await this.initialize();
        await this.execute();
    }
    async initialize() {
        try {
            this.connection = await amqp.connect({
                protocol: 'amqp',
                hostname: 'localhost',
                port: 5672,
                username: 'rabbitmq',
                password: 'rabbitmq',
            });
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queueName, { durable: true });
        }
        catch (error) {
            console.error('Failed to connect to RabbitMQ', error);
        }
    }
    async execute() {
        this.channel.consume(this.queueName, async (msg) => {
            if (msg !== null) {
                const event = JSON.parse(msg.content.toString());
                await this.eventSocket.emit({
                    to: `purchase:${event.userId}`,
                    event: 'order-processing-started',
                });
                await this.createEventPurchase.execute(event);
                this.channel.ack(msg);
            }
        }, { noAck: false });
    }
};
exports.EventQueueConsumer = EventQueueConsumer;
exports.EventQueueConsumer = EventQueueConsumer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_event_purchase_1.CreateEventPurchaseUseCase,
        event_socket_1.EventSocket])
], EventQueueConsumer);
//# sourceMappingURL=event-queue-consumer.js.map