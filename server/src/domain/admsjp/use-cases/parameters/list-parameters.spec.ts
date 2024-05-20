import { makeParameter } from 'test/factories/make-parameter'
import { InMemoryParametersRepository } from 'test/repositories/in-memory-parameters-repository'

import { ListParametersUseCase } from './list-parameters'

let inMemoryParametersRepository: InMemoryParametersRepository

let sut: ListParametersUseCase

describe('List parameters', () => {
  beforeEach(() => {
    inMemoryParametersRepository = new InMemoryParametersRepository()

    sut = new ListParametersUseCase(inMemoryParametersRepository)
  })

  it('should be able to list parameters', async () => {
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        inMemoryParametersRepository.create(
          makeParameter({
            key: `parameter-${index}`,
          }),
        ),
      ),
    )

    const result = await sut.execute({})

    expect(result.isSuccess()).toBe(true)
    expect(result.value?.parameters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'parameter-1',
        }),
        expect.objectContaining({
          key: 'parameter-3',
        }),
        expect.objectContaining({
          key: 'parameter-2',
        }),
      ]),
    )
  })
})
