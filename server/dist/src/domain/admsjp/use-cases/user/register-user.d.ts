import { Either } from '@/core/either';
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { HashGenerator } from '../../cryptography/hash-generator';
import { DepartmentsRepository } from '../../repositories/departments-repository';
import { ProfilesRepository } from '../../repositories/profiles-repository';
import { UsersRepository } from '../../repositories/users-repository';
interface RegisterUserUseCaseRequest {
    email: string;
    name: string;
    password: string;
    photo?: string;
    status: number;
    departmentId: number;
    profileId: number;
    provider: string;
}
type RegisterUserUseCaseResponse = Either<ResourceNotFoundError | ResourceAlreadyExistsError, null>;
export declare class RegisterUserUseCase {
    private usersRepository;
    private departmentsRepository;
    private profilesRepository;
    private hashGenerator;
    constructor(usersRepository: UsersRepository, departmentsRepository: DepartmentsRepository, profilesRepository: ProfilesRepository, hashGenerator: HashGenerator);
    execute({ email, name, password, status, photo, departmentId, profileId, provider, }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>;
}
export {};
