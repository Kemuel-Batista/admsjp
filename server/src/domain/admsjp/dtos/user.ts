import { User } from '@prisma/client'

import { UserWithoutPassword } from '../types/user/user-without-password'

export interface AuthUserDTO {
  username: User['username']
  password: User['password']
}

export interface CreateUserDTO {
  username: User['username']
  email: User['email']
  name: User['name']
  password: User['password']
  status: User['status']
  departmentId: User['departmentId']
  profileId: User['profileId']
  createdBy: User['createdBy']
}

export interface ListUserDTO {
  id: User['id']
  uuid: User['uuid']
  name: User['name']
  username: User['username']
  email: User['email']
  status: User['status']
  departmentId: User['departmentId']
  profileId: User['profileId']
  createdAt: User['createdAt']
  updatedAt: User['updatedAt']
  createdBy: User['createdBy']
  updatedBy: User['updatedBy']
  deletedAt: User['deletedAt']
  deletedBy: User['deletedBy']
  profileDesc: string | null
  statusDesc: string | null
}

export interface ListUserWithCountDTO {
  users: UserWithoutPassword[]
  count: number
}

export interface UpdateUserStatusDTO {
  id: User['id']
  status: User['status']
  updatedBy: User['updatedBy']
}

export interface UpdateUserDTO {
  id: User['id']
  name?: User['name']
  username?: User['username']
  email?: User['email']
  password?: User['password']
  status?: User['status']
  departmentId?: User['departmentId']
  profileId?: User['profileId']
  updatedBy: User['updatedBy']
}
