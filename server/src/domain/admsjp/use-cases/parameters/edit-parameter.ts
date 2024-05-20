import { Injectable } from '@nestjs/common'
import { Parameter } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ParametersRepository } from '../../repositories/parameters-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface EditParameterUseCaseRequest {
  id: Parameter['id']
  key: Parameter['key']
  keyInfo: Parameter['keyInfo']
  value: Parameter['value']
  status: Parameter['status']
  visible: Parameter['visible']
  updatedBy: Parameter['updatedBy']
}

type EditParameterUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  {
    parameter: Parameter
  }
>

@Injectable()
export class EditParameterUseCase {
  constructor(
    private parametersRepository: ParametersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    key,
    keyInfo,
    value,
    status,
    visible,
    updatedBy,
  }: EditParameterUseCaseRequest): Promise<EditParameterUseCaseResponse> {
    const parameter = await this.parametersRepository.findById(id)

    if (!parameter) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'parameter.find.notFound',
          key: String(id),
        }),
      )
    }

    const user = await this.usersRepository.findById(updatedBy)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.id.notFound',
        }),
      )
    }

    if (parameter.key !== key) {
      const parameterAlreadyExists =
        await this.parametersRepository.findByKey(key)

      if (parameterAlreadyExists) {
        return failure(
          new ResourceAlreadyExistsError({
            errorKey: 'parameter.create.alreadyExists',
          }),
        )
      }

      parameter.key = key
    }

    parameter.value = value
    parameter.keyInfo = keyInfo
    parameter.status = status
    parameter.visible = visible

    await this.parametersRepository.update(parameter)

    return success({
      parameter,
    })
  }
}
