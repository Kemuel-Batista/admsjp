import { SetMetadata } from '@nestjs/common'
import { User } from '@prisma/client'

export const Profiles = (...args: Array<User['profileId']>) =>
  SetMetadata('profiles', args)
