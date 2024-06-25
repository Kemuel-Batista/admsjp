import { Injectable } from '@nestjs/common'
import { Parameter } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ParametersRepository } from '../../repositories/parameters-repository'

interface FindParameterByIdUseCaseRequest {
  id: Parameter['id']
}

type FindParameterByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    parameter: Parameter
  }
>

@Injectable()
export class FindParameterByIdUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({
    id,
  }: FindParameterByIdUseCaseRequest): Promise<FindParameterByIdUseCaseResponse> {
    const parameter = await this.parametersRepository.findById(id)

    if (!parameter) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'parameter.find.notFound',
          key: id.toString(),
        }),
      )
    }

    return success({
      parameter,
    })
  }
}
