import { z } from 'zod'

export const createProfilePermissionSchema = z.object({
  key: z.string(),
  profileId: z.number().int().positive(),
})

export const deleteProfilePermissionSchema = z.number().int().positive()
