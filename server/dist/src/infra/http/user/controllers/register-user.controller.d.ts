import { z } from 'zod';
import { UserStatus } from '@/domain/admsjp/enums/user';
import { RegisterUserUseCase } from '@/domain/admsjp/use-cases/user/register-user';
declare const RegisterUserSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    photo: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodNumber;
    profileId: z.ZodNumber;
    status: z.ZodNativeEnum<typeof UserStatus>;
}, "strip", z.ZodTypeAny, {
    email?: string;
    name?: string;
    password?: string;
    photo?: string;
    departmentId?: number;
    profileId?: number;
    status?: UserStatus;
}, {
    email?: string;
    name?: string;
    password?: string;
    photo?: string;
    departmentId?: number;
    profileId?: number;
    status?: UserStatus;
}>;
type RegisterUserBodySchema = z.infer<typeof RegisterUserSchema>;
export declare class RegisterUserController {
    private registerUser;
    constructor(registerUser: RegisterUserUseCase);
    handle(body: RegisterUserBodySchema): Promise<void>;
}
export {};
