import { Parameter } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ParametersRepository } from '../../repositories/parameters-repository';
interface FindParameterByIdUseCaseRequest {
    id: Parameter['id'];
}
type FindParameterByIdUseCaseResponse = Either<ResourceNotFoundError, {
    parameter: Parameter;
}>;
export declare class FindParameterByIdUseCase {
    private parametersRepository;
    constructor(parametersRepository: ParametersRepository);
    execute({ id, }: FindParameterByIdUseCaseRequest): Promise<FindParameterByIdUseCaseResponse>;
}
export {};
