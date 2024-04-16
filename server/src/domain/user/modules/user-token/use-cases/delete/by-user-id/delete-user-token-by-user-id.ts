import { Injectable } from '@nestjs/common'
import { type UserToken } from '@prisma/client'

import { UserTokensRepository } from '../../../repositories/user-tokens-repository'

export interface DeleteUserTokenByUserIdUseCaseRequest {
  userId: UserToken['userId']
}

@Injectable()
export class DeleteUserTokenByUserIdUseCase {
  constructor(private userTokensRepository: UserTokensRepository) {}

  async execute({
    userId,
  }: DeleteUserTokenByUserIdUseCaseRequest): Promise<void> {
    await this.userTokensRepository.deleteByUserId(userId)
  }
}
