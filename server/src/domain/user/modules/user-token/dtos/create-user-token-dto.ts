import { UserToken } from '@prisma/client'

export interface ICreateUserTokenDTO {
  token: UserToken['token']
  refreshToken: UserToken['refreshToken']
  expiresAt: UserToken['expiresAt']
  userId: UserToken['userId']
}
