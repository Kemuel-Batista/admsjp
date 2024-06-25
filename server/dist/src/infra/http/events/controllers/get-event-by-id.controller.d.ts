import { z } from 'zod';
import { GetEventByIdUseCase } from '@/domain/admsjp/use-cases/events/get-event-by-id';
declare const paramsSchema: z.ZodNumber;
type ParamSchema = z.infer<typeof paramsSchema>;
export declare class GetEventByIdController {
    private getEventById;
    constructor(getEventById: GetEventByIdUseCase);
    handle(id: ParamSchema): Promise<{
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
export {};
