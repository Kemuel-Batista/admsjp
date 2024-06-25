import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '@/domain/admsjp/use-cases/user/authenticate-user';
import { GetUserByEmailUseCase } from '@/domain/admsjp/use-cases/user/get-user-by-email';
import { RegisterUserUseCase } from '@/domain/admsjp/use-cases/user/register-user';
export declare class AuthGoogleRedirectController {
    private getUserByEmail;
    private authenticateUser;
    private registerUser;
    constructor(getUserByEmail: GetUserByEmailUseCase, authenticateUser: AuthenticateUserUseCase, registerUser: RegisterUserUseCase);
    handle(request: Request, response: Response): Promise<void>;
}
