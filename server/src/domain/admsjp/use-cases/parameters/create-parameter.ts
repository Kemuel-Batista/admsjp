import { Injectable } from '@nestjs/common'
import { Parameter } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ParametersRepository } from '../../repositories/parameters-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface CreateParameterUseCaseRequest {
  key: Parameter['key']
  keyInfo: Parameter['keyInfo']
  value: Parameter['value']
  status: Parameter['status']
  visible: Parameter['visible']
  createdBy: Parameter['createdBy']
}

type CreateParameterUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  {
    parameter: Parameter
  }
>

@Injectable()
export class CreateParameterUseCase {
  constructor(
    private parametersRepository: ParametersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    key,
    keyInfo,
    value,
    status,
    visible,
    createdBy,
  }: CreateParameterUseCaseRequest): Promise<CreateParameterUseCaseResponse> {
    const user = await this.usersRepository.findById(createdBy)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.id.notFound',
        }),
      )
    }

    const parameterAlreadyExists =
      await this.parametersRepository.findByKey(key)

    if (parameterAlreadyExists) {
      return failure(
        new ResourceAlreadyExistsError({
          errorKey: 'parameter.create.alreadyExists',
        }),
      )
    }

    const parameter = await this.parametersRepository.create({
      key,
      keyInfo,
      value,
      status,
      visible,
      createdBy,
    })

    return success({
      parameter,
    })
  }
}
