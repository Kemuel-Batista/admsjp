import { OnModuleInit } from '@nestjs/common';
import { CreateEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/create-event-purchase';
import { EventSocket } from '@/domain/admsjp/websocket/event-socket';
export declare class EventQueueConsumer implements OnModuleInit {
    private createEventPurchase;
    private eventSocket;
    private readonly queueName;
    private connection;
    private channel;
    constructor(createEventPurchase: CreateEventPurchaseUseCase, eventSocket: EventSocket);
    onModuleInit(): Promise<void>;
    private initialize;
    execute(): Promise<void>;
}
