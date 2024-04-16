import { ProfileRepositoryPrisma } from '@modules/profile/infra/prisma/repositories/ProfileRepositoryPrisma'
import { FindProfileByIdUseCase } from '@modules/profile/usecases/find/by-id/FindProfileByIdUseCase'
import {
  type IListUserDTO,
  type IListUserWithCountDTO,
} from '@modules/user/dtos/IListUserDTO'
import { UsersRepository } from '@modules/user/repositories/UsersRepository'
import { type UserWithoutPassword } from '@modules/user/types/UserWithoutPassword'
import { getUserNameByUserId } from '@modules/user/util/getUserNameByUserId'
import { getUserStatusDescription } from '@modules/user/util/getUserStatusDescription'
import { type ISearchParamDTO } from '@shared/dtos/ISearchParamDTO'
import { type IListOptions } from '@shared/interfaces/IListOptions'
import { injectable } from '@nestjs/common'

@injectable()
class ListUserUseCase {
  private readonly findProfileByIdUseCase: FindProfileByIdUseCase
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UsersRepository,
    @inject('ProfileRepository')
    private readonly profileRepository: ProfileRepositoryPrisma,
  ) {
    this.findProfileByIdUseCase = new FindProfileByIdUseCase(
      this.profileRepository,
    )
  }

  async execute(
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
  ): Promise<IListUserWithCountDTO> {
    const { users, count }: { users: UserWithoutPassword[]; count: number } =
      await this.userRepository.list(options, searchParams)

    let usersResponse: IListUserDTO[] = []

    for (const user of users) {
      const profile = await this.findProfileByIdUseCase.execute(
        user.profileId,
        { throwIfFound: false },
      )

      const userResponse: IListUserDTO = {
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

export { ListUserUseCase }
