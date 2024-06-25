import { type Request } from 'express';
import { ParamsSchema } from '@/core/schemas/params-schema';
import { PageQueryParamSchema } from '@/core/schemas/query-params-schema';
import { ListEventLotByEventIdUseCase } from '@/domain/admsjp/use-cases/event-lot/list-event-lot-by-event-id';
export declare class ListEventLotByEventIdController {
    private listEventLotByEventIdUseCase;
    constructor(listEventLotByEventIdUseCase: ListEventLotByEventIdUseCase);
    handle(id: ParamsSchema, query: PageQueryParamSchema, request: Request): Promise<{
        eventLots: {
            id: string;
            eventId: number;
            name: string;
            description: string;
            lot: number;
            quantity: number;
            fulfilledQuantity: number;
            value: number;
            status: number;
            createdAt: Date;
            createdBy: number;
            updatedAt: Date;
            updatedBy: number;
            deletedAt: Date;
            deletedBy: number;
        }[];
        'x-total-count': number;
    }>;
}
