import { Injectable } from '@nestjs/common'
import { Parameter } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'

import { ParametersRepository } from '../../repositories/parameters-repository'

interface ListParametersUseCaseRequest {
  options?: ListOptions
}

type ListParametersUseCaseResponse = Either<
  null,
  {
    parameters: Parameter[]
  }
>

@Injectable()
export class ListParametersUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({
    options = {},
  }: ListParametersUseCaseRequest): Promise<ListParametersUseCaseResponse> {
    const parameters = await this.parametersRepository.list(options)

    return success({
      parameters,
    })
  }
}
