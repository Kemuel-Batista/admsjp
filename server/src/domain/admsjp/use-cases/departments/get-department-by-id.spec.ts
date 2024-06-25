import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { GetDepartmentByIdUseCase } from './get-department-by-id'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: GetDepartmentByIdUseCase

describe('Get department by id', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new GetDepartmentByIdUseCase(inMemoryDepartmentsRepository)
  })

  it('should be able to get department by id', async () => {
    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const result = await sut.execute({
      id: department.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      department: expect.objectContaining({
        id: department.id,
        name: department.name,
        description: department.description,
      }),
    })
  })
})
