import { Profile } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { CreateProfileDTO } from '../dtos/create-profile.dto'
import { ListProfileDTO } from '../dtos/list-profile.dto'
import { UpdateProfileDTO } from '../dtos/update-profile.dto'

export abstract class ProfileRepository {
  abstract create(data: CreateProfileDTO): Promise<Profile>
  abstract update(data: UpdateProfileDTO): Promise<Profile>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListProfileDTO>

  abstract findById(id: Profile['id']): Promise<Profile | null>
  abstract findByName(name: Profile['name']): Promise<Profile | null>
}
