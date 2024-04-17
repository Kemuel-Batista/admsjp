import { Injectable } from '@nestjs/common'
import { type User } from '@prisma/client'

import { UsersRepository } from '@/domain/user/repositories/users-repository'

import { FindUserByIdUseCase } from '../../find/by-id/find-user-by-id'

interface DeleteUserByIdUseCaseRequest {
  userId: User['id']
  deletedBy: User['id']
}

@Injectable()
export class DeleteUserByIdUseCase {
  constructor(
    private userRepository: UsersRepository,
    private findUserbyId: FindUserByIdUseCase,
  ) {}

  async execute({ userId }: DeleteUserByIdUseCaseRequest): Promise<void> {
    await this.findUserbyId.execute(userId, {
      throwIfNotFound: true,
    })

    await this.userRepository.delete(userId)
  }
}
