import { ListEventsUseCase } from '@/domain/admsjp/use-cases/events/list-events';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class ListEventsController {
    private listEventsUseCase;
    constructor(listEventsUseCase: ListEventsUseCase);
    handle(user: UserPayload): Promise<{
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
