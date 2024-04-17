import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'

import { UserTokensRepository } from '@/domain/user/modules/user-token/repositories/user-tokens-repository'

@Injectable()
export class DeleteRefreshTokenUseCase {
  constructor(private userTokensRepository: UserTokensRepository) {}

  async execute(userTokenId: UserToken['id']): Promise<void> {
    await this.userTokensRepository.delete(userTokenId)
  }
}
