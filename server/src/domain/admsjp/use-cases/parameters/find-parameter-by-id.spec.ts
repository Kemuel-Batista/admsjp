import { makeParameter } from 'test/factories/make-parameter'
import { InMemoryParametersRepository } from 'test/repositories/in-memory-parameters-repository'

import { FindParameterByIdUseCase } from './find-parameter-by-id'

let inMemoryParametersRepository: InMemoryParametersRepository

let sut: FindParameterByIdUseCase

describe('Find parameter by id', () => {
  beforeEach(() => {
    inMemoryParametersRepository = new InMemoryParametersRepository()

    sut = new FindParameterByIdUseCase(inMemoryParametersRepository)
  })

  it('should be able to find a parameter by id', async () => {
    const parameterFactory = makeParameter()
    const parameter =
      await inMemoryParametersRepository.create(parameterFactory)

    const result = await sut.execute({
      id: parameter.id,
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      parameter: expect.objectContaining({
        key: parameter.key,
        keyInfo: parameter.keyInfo,
        value: parameter.value,
        status: parameter.status,
        visible: parameter.visible,
      }),
    })
  })
})
