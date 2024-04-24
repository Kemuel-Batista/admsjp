import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListUserDTO, ListUserWithCountDTO } from '@/domain/admsjp/dtos/user'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'
import { UserWithoutPassword } from '@/domain/admsjp/types/user/user-without-password'
import { getUserNameByUserId } from '@/domain/admsjp/utils/user/get-user-name-by-user-id'
import { getUserStatusDescription } from '@/domain/admsjp/utils/user/get-user-status-description'

import { FindProfileByIdUseCase } from '../../../profile/find/by-id/find-profile-by-id'

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
