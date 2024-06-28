import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { UsersRepository } from '../../repositories/users-repository'

interface GetUserPermissionUseCaseRequest {
  userId: User['id']
}

type GetUserPermissionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class GetUserPermissionUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserPermissionUseCaseRequest): Promise<GetUserPermissionUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'user.find.notFound',
          key: userId.toString(),
        }),
      )
    }

    return success({
      user,
    })
  }
}
