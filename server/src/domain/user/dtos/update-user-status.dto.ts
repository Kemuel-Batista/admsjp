import { type User } from '@prisma/client'

interface UpdateUserStatusDTO {
  id: User['id']
  status: User['status']
  updatedBy: User['updatedBy']
}

export type { UpdateUserStatusDTO }
