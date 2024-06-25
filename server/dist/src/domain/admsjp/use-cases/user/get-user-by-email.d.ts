import { User } from '@prisma/client';
import { UsersRepository } from '../../repositories/users-repository';
interface GetUserByEmailUseCaseRequest {
    email: string;
}
export declare class GetUserByEmailUseCase {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    execute({ email }: GetUserByEmailUseCaseRequest): Promise<User | null>;
}
export {};
