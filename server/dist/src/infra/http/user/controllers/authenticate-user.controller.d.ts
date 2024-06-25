import { Response } from 'express';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '@/domain/admsjp/use-cases/user/authenticate-user';
declare const authenticateUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
type AuthenticateUserBodySchema = z.infer<typeof authenticateUserSchema>;
export declare class AuthenticateUserController {
    private authenticateUser;
    constructor(authenticateUser: AuthenticateUserUseCase);
    handle(body: AuthenticateUserBodySchema, response: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
