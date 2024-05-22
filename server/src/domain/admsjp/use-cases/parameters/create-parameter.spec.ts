import { makeUser } from 'test/factories/make-user'
import { InMemoryParametersRepository } from 'test/repositories/in-memory-parameters-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'

import { ParameterStatus, ParameterVisible } from '../../enums/parameter'
import { CreateParameterUseCase } from './create-parameter'

let inMemoryParametersRepository: InMemoryParametersRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: CreateParameterUseCase

describe('Create parameter', () => {
  beforeEach(() => {
    inMemoryParametersRepository = new InMemoryParametersRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new CreateParameterUseCase(
      inMemoryParametersRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to create a new parameter', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const result = await sut.execute({
      key: 'order.payment.type',
      keyInfo:
        'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
      value: 'manual',
      createdBy: user.id,
      status: ParameterStatus.ACTIVE,
      visible: ParameterVisible.VISIBLE,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryParametersRepository.items).toHaveLength(1)
    expect(inMemoryParametersRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'order.payment.type',
          keyInfo:
            'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
          value: 'manual',
          status: ParameterStatus.ACTIVE,
          visible: ParameterVisible.VISIBLE,
          createdBy: user.id,
        }),
      ]),
    )
  })

  it('should not be able to create a new parameter if it already exists', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    await sut.execute({
      key: 'order.payment.type',
      keyInfo:
        'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
      value: 'manual',
      createdBy: user.id,
      status: ParameterStatus.ACTIVE,
      visible: ParameterVisible.VISIBLE,
    })

    const result = await sut.execute({
      key: 'order.payment.type',
      keyInfo:
        'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
      value: 'manual',
      createdBy: user.id,
      status: ParameterStatus.ACTIVE,
      visible: ParameterVisible.VISIBLE,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
    expect(inMemoryParametersRepository.items).toHaveLength(1)
  })
})
