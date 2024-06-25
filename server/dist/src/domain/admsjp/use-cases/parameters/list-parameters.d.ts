import { Parameter } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { Either } from '@/core/either';
import { IListOptions } from '@/core/repositories/list-options';
import { ParametersRepository } from '../../repositories/parameters-repository';
interface ListParametersUseCaseRequest {
    options?: IListOptions;
    searchParams?: ISearchParamDTO[];
}
type ListParametersUseCaseResponse = Either<null, {
    parameters: Parameter[];
    count: number;
}>;
export declare class ListParametersUseCase {
    private parametersRepository;
    constructor(parametersRepository: ParametersRepository);
    execute({ options, searchParams, }: ListParametersUseCaseRequest): Promise<ListParametersUseCaseResponse>;
}
export {};
