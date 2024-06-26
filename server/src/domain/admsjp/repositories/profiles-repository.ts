import { Prisma, Profile } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

export abstract class ProfilesRepository {
  abstract create(data: Prisma.ProfileUncheckedCreateInput): Promise<Profile>
  abstract update(data: Profile): Promise<Profile>
  abstract list(options?: ListOptions): Promise<Profile[]>
  abstract findById(id: Profile['id']): Promise<Profile | null>
  abstract findByName(name: Profile['name']): Promise<Profile | null>
}
