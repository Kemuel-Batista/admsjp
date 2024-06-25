import { Parameter } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ParametersRepository } from '../../repositories/parameters-repository';
import { UsersRepository } from '../../repositories/users-repository';
interface EditParameterUseCaseRequest {
    id: Parameter['id'];
    key: Parameter['key'];
    keyInfo: Parameter['keyInfo'];
    value: Parameter['value'];
    status: Parameter['status'];
    visible: Parameter['visible'];
    updatedBy: Parameter['updatedBy'];
}
type EditParameterUseCaseResponse = Either<ResourceNotFoundError | ResourceAlreadyExistsError, {
    parameter: Parameter;
}>;
export declare class EditParameterUseCase {
    private parametersRepository;
    private usersRepository;
    constructor(parametersRepository: ParametersRepository, usersRepository: UsersRepository);
    execute({ id, key, keyInfo, value, status, visible, updatedBy, }: EditParameterUseCaseRequest): Promise<EditParameterUseCaseResponse>;
}
export {};
