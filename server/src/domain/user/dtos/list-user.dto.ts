import { type User } from '@prisma/client'

import { type UserWithoutPassword } from '../types/UserWithoutPassword'

interface ListUserDTO {
  id: User['id']
  uuid: User['uuid']
  name: User['name']
  username: User['username']
  email: User['email']
  status: User['status']
  profileId: User['profileId']
  createdAt: User['createdAt']
  updatedAt: User['updatedAt']
  createdBy: User['createdBy']
  updatedBy: User['updatedBy']
  deletedAt: User['deletedAt']
  profileDesc: string | null
  statusDesc: string | null
}

interface ListUserWithCountDTO {
  users: UserWithoutPassword[]
  count: number
}

export type { ListUserDTO, ListUserWithCountDTO }
