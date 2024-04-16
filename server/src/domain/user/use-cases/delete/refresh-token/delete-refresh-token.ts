import { IUserTokenRepository } from '@modules/user/modules/user-token/repositories/IUserTokenRepository'
import { Injectable } from '@nestjs/common'
import { UserToken } from '@prisma/client'

@Injectable()
class DeleteRefreshTokenUseCase {
  constructor(private readonly userTokenRepository: IUserTokenRepository) {}

  async execute(userTokenId: UserToken['id']): Promise<void> {
    await this.userTokenRepository.delete(userTokenId)
  }
}

export { DeleteRefreshTokenUseCase }
