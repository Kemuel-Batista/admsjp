import { Either } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error';
import { Encrypter } from '../../cryptography/encrypter';
import { HashComparer } from '../../cryptography/hash-comparer';
import { UsersRepository } from '../../repositories/users-repository';
interface AuthenticateUserUseCaseRequest {
    email: string;
    password: string;
}
type AuthenticateUserUseCaseResponse = Either<WrongCredentialsError, {
    accessToken: string;
    userProvider: string;
}>;
export declare class AuthenticateUserUseCase {
    private usersRepository;
    private hashComparer;
    private encrypter;
    constructor(usersRepository: UsersRepository, hashComparer: HashComparer, encrypter: Encrypter);
    execute({ email, password, }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>;
}
export {};
