import { z } from 'zod'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const paramsSchema = z.string().uuid()

export const paramsValidationPipe = new ZodValidationPipe(paramsSchema)

export type ParamsSchema = z.infer<typeof paramsSchema>
