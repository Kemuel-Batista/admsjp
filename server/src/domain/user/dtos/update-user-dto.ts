import { type User } from '@prisma/client'

interface IUpdateUserDTO {
  id: User['id']
  name?: User['name']
  username?: User['username']
  password?: User['password']
  status?: User['status']
  profileId?: User['profileId']
  updatedBy: User['updatedBy']
}

export type { IUpdateUserDTO }
