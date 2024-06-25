import { Channel } from 'amqplib';
import { QueueConnectionManager } from '@/domain/admsjp/queue/queue-connection-manager';
export declare class RabbitMQQueueConnectionManager implements QueueConnectionManager {
    private connection;
    private channel;
    private url;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    createChannel(): Promise<Channel | undefined>;
}
