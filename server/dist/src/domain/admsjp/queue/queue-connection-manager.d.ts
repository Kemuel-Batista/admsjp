import { Channel } from 'amqplib';
export declare abstract class QueueConnectionManager {
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract createChannel(): Promise<Channel | undefined>;
}
