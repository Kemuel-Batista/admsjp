import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { ListDepartmentUseCase } from './list-department'

let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: ListDepartmentUseCase

describe('List departments', () => {
  beforeEach(() => {
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new ListDepartmentUseCase(inMemoryDepartmentsRepository)
  })

  it('should be able to list departments', async () => {
    const departmentFactory = makeDepartment()
    const department =
      await inMemoryDepartmentsRepository.create(departmentFactory)

    const result = await sut.execute({
      options: {},
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      count: 1,
      departments: expect.arrayContaining([
        expect.objectContaining({
          id: department.id,
          name: department.name,
          status: department.status,
          visible: department.visible,
        }),
      ]),
    })
  })
})
