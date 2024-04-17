import { type User } from '@prisma/client'

interface UpdateUserDTO {
  id: User['id']
  name?: User['name']
  username?: User['username']
  email?: User['email']
  password?: User['password']
  status?: User['status']
  profileId?: User['profileId']
  updatedBy: User['updatedBy']
}

export type { UpdateUserDTO }
