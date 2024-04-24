import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'

import { UserTokensRepository } from '@/domain/admsjp/repositories/user-tokens-repository'

@Injectable()
export class DeleteRefreshTokenUseCase {
  constructor(private userTokensRepository: UserTokensRepository) {}

  async execute(userTokenId: UserToken['id']): Promise<void> {
    await this.userTokensRepository.delete(userTokenId)
  }
}
