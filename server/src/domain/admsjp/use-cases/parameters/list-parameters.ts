import { Injectable } from '@nestjs/common'
import { Parameter } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { Either, success } from '@/core/either'
import { IListOptions } from '@/core/repositories/list-options'

import { ParametersRepository } from '../../repositories/parameters-repository'

interface ListParametersUseCaseRequest {
  options?: IListOptions
  searchParams?: ISearchParamDTO[]
}

type ListParametersUseCaseResponse = Either<
  null,
  {
    parameters: Parameter[]
    count: number
  }
>

@Injectable()
export class ListParametersUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({
    options = {},
    searchParams = [],
  }: ListParametersUseCaseRequest): Promise<ListParametersUseCaseResponse> {
    const { parameters, count } = await this.parametersRepository.list(
      options,
      searchParams,
    )

    return success({
      parameters,
      count,
    })
  }
}
