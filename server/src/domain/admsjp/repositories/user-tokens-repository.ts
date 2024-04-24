import { UserToken } from '@prisma/client'

import { CreateUserTokenDTO } from '../dtos/user-token'

export abstract class UserTokensRepository {
  abstract create(data: CreateUserTokenDTO): Promise<UserToken>
  abstract findByUserId(userId: UserToken['userId']): Promise<UserToken | null>
  abstract findByUserIdAndRefreshToken(
    userId: UserToken['userId'],
    refreshToken: UserToken['refreshToken'],
  ): Promise<UserToken | null>

  abstract delete(userTokenId: UserToken['id']): Promise<void>
  abstract deleteByUserId(userId: UserToken['userId']): Promise<void>
}
