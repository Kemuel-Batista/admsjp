import { EventQueue, EventQueueProps } from '@/domain/admsjp/queue/event-queue';
export declare class EventQueueRabbitMQ implements EventQueue {
    private readonly queueName;
    private connection;
    private channel;
    constructor();
    private initialize;
    enqueue(event: EventQueueProps): Promise<void>;
}
