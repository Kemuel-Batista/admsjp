import { randomUUID } from 'node:crypto'

import { Department } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import {
  CreateDepartmentDTO,
  ListDepartmentDTO,
  UpdateDepartmentDTO,
} from '@/domain/admsjp/dtos/department'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'

export class InMemoryDepartmentsRepository implements DepartmentsRepository {
  public items: Department[] = []

  async create(data: CreateDepartmentDTO): Promise<Department> {
    const id = getLastInsertedId(this.items)

    const department = {
      id,
      uuid: randomUUID(),
      name: data.name,
      description: data.description,
      status: data.status,
      visible: data.visible,
      createdAt: new Date(),
      createdBy: data.createdBy,
      updatedAt: new Date(),
      updatedBy: data.createdBy,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(department)

    return department
  }

  async update(data: UpdateDepartmentDTO): Promise<Department> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const department = this.items[itemIndex]

    const departmentUpdated = {
      ...department,
      name: data.name,
      description: data.description,
      status: data.status,
      visible: data.visible,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = departmentUpdated

    return department
  }

  async list(): Promise<ListDepartmentDTO> {
    const departments = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const count = departments.length

    return { departments, count }
  }

  async findById(id: number): Promise<Department> {
    const department = this.items.find((item) => item.id === id)

    if (!department) {
      return null
    }

    return department
  }

  async findByName(name: string): Promise<Department> {
    const department = this.items.find((item) => item.name === name)

    if (!department) {
      return null
    }

    return department
  }
}
