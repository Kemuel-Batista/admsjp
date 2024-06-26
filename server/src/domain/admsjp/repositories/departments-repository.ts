import { Department, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

export abstract class DepartmentsRepository {
  abstract create(
    data: Prisma.DepartmentUncheckedCreateInput,
  ): Promise<Department>

  abstract update(data: Department): Promise<Department>

  abstract list(options?: ListOptions): Promise<Department[]>

  abstract findById(id: Department['id']): Promise<Department | null>
  abstract findByName(name: Department['name']): Promise<Department | null>
}
