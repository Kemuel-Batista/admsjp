import { Department } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { CreateDepartmentDTO, ListDepartmentDTO, UpdateDepartmentDTO } from '@/domain/admsjp/dtos/department';
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
export declare class PrismaDepartmentRepository implements DepartmentsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ name, description, status, visible, createdBy, }: CreateDepartmentDTO): Promise<Department>;
    update({ id, name, description, status, visible, updatedBy, }: UpdateDepartmentDTO): Promise<Department>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListDepartmentDTO>;
    findById(id: Department['id']): Promise<Department | null>;
    findByName(name: Department['name']): Promise<Department | null>;
}
