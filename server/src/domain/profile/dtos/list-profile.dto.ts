import { Profile } from '@prisma/client'

export interface ListProfileDTO {
  profiles: Profile[]
  count: number
}
