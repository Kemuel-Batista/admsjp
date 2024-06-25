import { makeParameter } from 'test/factories/make-parameter'
import { makeUser } from 'test/factories/make-user'
import { InMemoryParametersRepository } from 'test/repositories/in-memory-parameters-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'

import { ParameterStatus, ParameterVisible } from '../../enums/parameter'
import { EditParameterUseCase } from './edit-parameter'

let inMemoryParametersRepository: InMemoryParametersRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: EditParameterUseCase

describe('Edit parameter', () => {
  beforeEach(() => {
    inMemoryParametersRepository = new InMemoryParametersRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new EditParameterUseCase(
      inMemoryParametersRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to edit a parameter', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const parameterFactory = makeParameter()
    const parameter =
      await inMemoryParametersRepository.create(parameterFactory)

    const result = await sut.execute({
      id: parameter.id,
      key: 'order.payment.type',
      keyInfo:
        'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
      value: 'manual',
      updatedBy: user.id,
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
        }),
      ]),
    )
  })

  it('should not be able to edit a parameter if the key it already exists', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const parameterFactory = makeParameter({
      key: 'order.payment.type',
    })
    await inMemoryParametersRepository.create(parameterFactory)

    const parameter02Factory = makeParameter()
    const parameter02 =
      await inMemoryParametersRepository.create(parameter02Factory)

    const result = await sut.execute({
      id: parameter02.id,
      key: 'order.payment.type',
      keyInfo:
        'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
      value: 'manual',
      updatedBy: user.id,
      status: ParameterStatus.ACTIVE,
      visible: ParameterVisible.VISIBLE,
    })

    expect(result.isError()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
