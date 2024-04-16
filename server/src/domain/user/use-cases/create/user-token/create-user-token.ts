import { type ICreateUserTokenDTO } from '@modules/user/dtos/ICreateUserTokenDTO'
import { IUserTokenRepository } from '@modules/user/modules/user-token/repositories/IUserTokenRepository'
import { Injectable } from '@nestjs/common'
import { type UserToken } from '@prisma/client'

@Injectable()
class CreateUserTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async execute({
    token,
    refreshToken,
    expiresAt,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = await this.userTokenRepository.create({
      token,
      refreshToken,
      expiresAt,
      userId,
    })

    return userToken
  }
}

export { CreateUserTokenUseCase }
