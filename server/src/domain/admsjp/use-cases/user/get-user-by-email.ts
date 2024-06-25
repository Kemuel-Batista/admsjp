import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { UsersRepository } from '../../repositories/users-repository'

interface GetUserByEmailUseCaseRequest {
  email: string
}

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: GetUserByEmailUseCaseRequest): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return null
    }

    return user
  }
}
