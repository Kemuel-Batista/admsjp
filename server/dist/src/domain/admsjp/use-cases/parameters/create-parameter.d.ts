import { Parameter } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ParametersRepository } from '../../repositories/parameters-repository';
import { UsersRepository } from '../../repositories/users-repository';
interface CreateParameterUseCaseRequest {
    key: Parameter['key'];
    keyInfo: Parameter['keyInfo'];
    value: Parameter['value'];
    status: Parameter['status'];
    visible: Parameter['visible'];
    createdBy: Parameter['createdBy'];
}
type CreateParameterUseCaseResponse = Either<ResourceNotFoundError | ResourceAlreadyExistsError, {
    parameter: Parameter;
}>;
export declare class CreateParameterUseCase {
    private parametersRepository;
    private usersRepository;
    constructor(parametersRepository: ParametersRepository, usersRepository: UsersRepository);
    execute({ key, keyInfo, value, status, visible, createdBy, }: CreateParameterUseCaseRequest): Promise<CreateParameterUseCaseResponse>;
}
export {};
