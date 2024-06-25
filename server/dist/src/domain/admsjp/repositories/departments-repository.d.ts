import { Department } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { CreateDepartmentDTO, ListDepartmentDTO, UpdateDepartmentDTO } from '../dtos/department';
export declare abstract class DepartmentsRepository {
    abstract create(data: CreateDepartmentDTO): Promise<Department>;
    abstract update(data: UpdateDepartmentDTO): Promise<Department>;
    abstract list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListDepartmentDTO>;
    abstract findById(id: Department['id']): Promise<Department | null>;
    abstract findByName(name: Department['name']): Promise<Department | null>;
}
