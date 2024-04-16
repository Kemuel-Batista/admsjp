import { UserToken } from '@prisma/client'

import { ICreateUserTokenDTO } from '../dtos/create-user-token-dto'

export abstract class UserTokensRepository {
  abstract create(data: ICreateUserTokenDTO): Promise<UserToken>
  abstract findByUserId(userId: UserToken['userId']): Promise<UserToken | null>
  abstract findByUserIdAndRefreshToken(
    userId: UserToken['userId'],
    refreshToken: UserToken['refreshToken'],
  ): Promise<UserToken | null>

  abstract delete(userTokenId: UserToken['id']): Promise<void>
  abstract deleteByUserId(userId: UserToken['userId']): Promise<void>
}
