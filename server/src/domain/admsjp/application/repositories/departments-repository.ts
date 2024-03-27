import { Department, Prisma } from '@prisma/client'

import { PaginationParams } from '@/core/repositories/paginations-params'

export abstract class DepartmentsRepository {
  abstract findById(id: string): Promise<Department | null>
  abstract findByName(name: string, id?: string): Promise<Department | null>
  abstract findAll(): Promise<Department[]>
  abstract findMany(params: PaginationParams): Promise<Department[]>
  abstract create(data: Prisma.DepartmentUncheckedCreateInput): Promise<void>
  abstract save(data: Department): Promise<void>
}
