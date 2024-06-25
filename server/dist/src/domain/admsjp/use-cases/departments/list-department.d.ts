import { Department } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { Either } from '@/core/either';
import { IListOptions } from '@/core/repositories/list-options';
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository';
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission';
interface ListDepartmentUseCaseRequest {
    options: IListOptions;
    searchParams: ISearchParamDTO[];
    profileId: UserWithPermission['profileId'];
}
type ListDepartmentUseCaseResponse = Either<null, {
    departments: Department[];
    count: number;
}>;
export declare class ListDepartmentUseCase {
    private departmentsRepository;
    constructor(departmentsRepository: DepartmentsRepository);
    execute({ profileId, options, searchParams, }: ListDepartmentUseCaseRequest): Promise<ListDepartmentUseCaseResponse>;
}
export {};
