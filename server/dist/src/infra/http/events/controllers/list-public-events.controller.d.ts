import { ListPublicEventsUseCase } from '@/domain/admsjp/use-cases/events/list-public-events';
export declare class ListPublicEventsController {
    private listPublicEventsUseCase;
    constructor(listPublicEventsUseCase: ListPublicEventsUseCase);
    handle(): Promise<{
        events: {
            id: number;
            uuid: string;
            title: string;
            slug: string;
            description: string;
            initialDate: Date;
            finalDate: Date;
            status: number;
            visible: number;
            departmentId: number;
            eventType: number;
            imagePath: string;
            pixKey: string;
            pixType: number;
            message: string;
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
