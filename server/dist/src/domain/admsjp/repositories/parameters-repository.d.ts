import { Parameter, Prisma } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListParameterDTO } from '../dtos/parameter';
export declare abstract class ParametersRepository {
    abstract create(data: Prisma.ParameterUncheckedCreateInput): Promise<Parameter>;
    abstract update(data: Parameter): Promise<Parameter>;
    abstract list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListParameterDTO>;
    abstract findById(id: Parameter['id']): Promise<Parameter | null>;
    abstract findByKey(key: Parameter['key']): Promise<Parameter | null>;
}
