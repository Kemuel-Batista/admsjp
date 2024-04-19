import { type User } from '@prisma/client'

interface CreateUserDTO {
  username: User['username']
  email: User['email']
  name: User['name']
  password: User['password']
  status: User['status']
  departmentId: User['departmentId']
  profileId: User['profileId']
  createdBy: User['createdBy']
}

export type { CreateUserDTO }
