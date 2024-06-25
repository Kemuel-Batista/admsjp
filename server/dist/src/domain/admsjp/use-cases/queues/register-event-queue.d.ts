import { EventQueue, EventQueueProps } from '../../queue/event-queue';
export declare class RegisterEventQueue {
    private eventQueue;
    constructor(eventQueue: EventQueue);
    execute(data: EventQueueProps): Promise<void>;
}
