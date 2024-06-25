import { z } from 'zod';
import { CreateProfileUseCase } from '@/domain/admsjp/use-cases/profile/create/create-profile';
import { UserPayload } from '@/infra/auth/jwt.strategy';
declare const createProfileSchema: z.ZodObject<{
    name: z.ZodString;
    visible: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    visible?: number;
    status?: number;
}, {
    name?: string;
    visible?: number;
    status?: number;
}>;
type CreateProfileSchema = z.infer<typeof createProfileSchema>;
export declare class CreateProfileController {
    private createProfile;
    constructor(createProfile: CreateProfileUseCase);
    handle(body: CreateProfileSchema, user: UserPayload): Promise<{
        id: number;
        uuid: string;
        name: string;
        status: number;
        visible: number;
        createdAt: Date;
        createdBy: number;
        updatedAt: Date;
        updatedBy: number;
        deletedAt: Date;
        deletedBy: number;
    }>;
}
export {};
