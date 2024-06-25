"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueueRabbitMQ = void 0;
const amqp = require("amqplib");
class EventQueueRabbitMQ {
    queueName = 'event_queue';
    connection;
    channel;
    constructor() {
        this.initialize();
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
    async enqueue(event) {
        if (!this.channel) {
            throw new Error('Channel is not initialized');
        }
        const buffer = Buffer.from(JSON.stringify(event));
        this.channel.sendToQueue(this.queueName, buffer, { persistent: true });
    }
}
exports.EventQueueRabbitMQ = EventQueueRabbitMQ;
//# sourceMappingURL=event-queue-rabbitmq.js.map