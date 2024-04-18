import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { FindProfileByIdUseCase } from '@/domain/profile/use-cases/find/by-id/find-profile-by-id'
import {
  ListUserDTO,
  ListUserWithCountDTO,
} from '@/domain/user/dtos/list-user.dto'
import { UsersRepository } from '@/domain/user/repositories/users-repository'
import { UserWithoutPassword } from '@/domain/user/types/user-without-password'
import { getUserNameByUserId } from '@/domain/user/util/get-user-name-by-user-id'
import { getUserStatusDescription } from '@/domain/user/util/get-user-status-description'

@Injectable()
export class ListUserUseCase {
  constructor(
    private userRepository: UsersRepository,
    private findProfileById: FindProfileByIdUseCase,
  ) {}

  async execute(
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
  ): Promise<ListUserWithCountDTO> {
    const { users, count }: { users: UserWithoutPassword[]; count: number } =
      await this.userRepository.list(options, searchParams)

    let usersResponse: ListUserDTO[] = []

    for (const user of users) {
      const profile = await this.findProfileById.execute(user.profileId, {
        throwIfFound: false,
      })

      const userResponse: ListUserDTO = {
        ...user,
        profileDesc: profile?.name ?? null,
        statusDesc: getUserStatusDescription(user.status),
      }
      usersResponse.push(userResponse)
    }

    usersResponse = await getUserNameByUserId(
      usersResponse,
      this.userRepository,
    )

    return { users: usersResponse, count }
  }
}
