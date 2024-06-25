import { Department } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error';
import { CreateDepartmentDTO } from '@/domain/admsjp/dtos/department';
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository';
type CreateDepartmentUseCaseResponse = Either<ResourceAlreadyExistsError, {
    department: Department;
}>;
export declare class CreateDepartmentUseCase {
    private departmentsRepository;
    constructor(departmentsRepository: DepartmentsRepository);
    execute({ name, description, status, visible, createdBy, }: CreateDepartmentDTO): Promise<CreateDepartmentUseCaseResponse>;
}
export {};
