import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { DepartmentStatus, DepartmentVisible } from '../../enums/department'
import { CreateDepartmentUseCase } from './create-department'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryDepartmentsRepository: InMemoryDepartmentsRepository

let sut: CreateDepartmentUseCase

describe('Create department', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryDepartmentsRepository = new InMemoryDepartmentsRepository()

    sut = new CreateDepartmentUseCase(inMemoryDepartmentsRepository)
  })

  it('should be able to create department', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const result = await sut.execute({
      name: 'UMADSJP',
      description: 'Departamento de jovens',
      createdBy: user.id,
      status: DepartmentStatus.ACTIVE,
      visible: DepartmentVisible.VISIBLE,
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryDepartmentsRepository.items).toHaveLength(1)
    expect(inMemoryDepartmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'UMADSJP',
          description: 'Departamento de jovens',
          createdBy: user.id,
          status: DepartmentStatus.ACTIVE,
          visible: DepartmentVisible.VISIBLE,
        }),
      ]),
    )
  })
})
