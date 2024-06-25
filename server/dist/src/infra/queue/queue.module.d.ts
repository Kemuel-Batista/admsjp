import { OnModuleInit } from '@nestjs/common';
import { EventQueueConsumer } from './event-queue-consumer';
export declare class QueueModule implements OnModuleInit {
    private eventQueueConsumer;
    constructor(eventQueueConsumer: EventQueueConsumer);
    onModuleInit(): Promise<void>;
}
