import { z } from 'zod'

import { UserStatus } from '../enums/user-status'

export const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  name: z.string().min(3).max(50),
  status: z.nativeEnum(UserStatus),
  departmentId: z.number().int().positive(),
  profileId: z.number().int().positive(),
})

export type CreateUserFormData = z.infer<typeof createUserSchema>
