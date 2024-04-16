import { z } from 'zod'

import { UserStatus } from '../enums/user-status'

export const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
  name: z.string().min(3).max(50),
  status: z.nativeEnum(UserStatus),
  profileId: z.number().int().positive(),
})

export const listUserSchema = z.object({
  allRecords: z.boolean().optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
})

export const deleteUserSchema = z.object({
  userId: z.number().int().positive(),
})

export const findUserByIdSchema = z.object({
  userId: z.number().int().positive(),
})

export const updateStatusUser = z.object({
  userId: z.number().int().positive(),
  status: z.number().int().min(0).max(1),
})

export const updateSelfPassword = z.object({
  newPassword: z.string().min(6).max(20),
})
