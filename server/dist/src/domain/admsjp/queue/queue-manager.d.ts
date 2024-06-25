import { Channel } from 'amqplib';
export declare abstract class QueueManager {
    abstract declareQueue(queueName: string): Promise<void>;
    abstract publishMessage(channel: Channel, queueName: string, message: string): Promise<void>;
    abstract consumeMessage(queueName: string, callback: (message: string) => Promise<void>): Promise<void>;
}
