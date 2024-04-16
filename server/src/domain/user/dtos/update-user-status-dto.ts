import { type User } from '@prisma/client'

interface IUpdateUserStatusDTO {
  id: User['id']
  status: User['status']
  updatedBy: User['updatedBy']
}

export type { IUpdateUserStatusDTO }
