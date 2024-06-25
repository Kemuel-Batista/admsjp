import { z } from 'zod'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const paramsSchema = z.string().transform(Number).pipe(z.number().min(1))

export const paramsValidationPipe = new ZodValidationPipe(paramsSchema)

export type ParamsSchema = z.infer<typeof paramsSchema>
