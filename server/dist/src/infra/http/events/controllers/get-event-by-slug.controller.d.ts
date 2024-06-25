import { GetEventBySlugUseCase } from '@/domain/admsjp/use-cases/events/get-event-by-slug';
export declare class GetEventBySlugController {
    private getEventBySlug;
    constructor(getEventBySlug: GetEventBySlugUseCase);
    handle(slug: string): Promise<{
        event: {
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
        };
    }>;
}
