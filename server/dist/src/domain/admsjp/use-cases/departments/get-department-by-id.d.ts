import { Department } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository';
interface GetDepartmentByIdUseCaseRequest {
    id: Department['id'];
}
type GetDepartmentByIdUseCaseResponse = Either<ResourceNotFoundError, {
    department: Department;
}>;
export declare class GetDepartmentByIdUseCase {
    private departmentsRepository;
    constructor(departmentsRepository: DepartmentsRepository);
    execute({ id, }: GetDepartmentByIdUseCaseRequest): Promise<GetDepartmentByIdUseCaseResponse>;
}
export {};
