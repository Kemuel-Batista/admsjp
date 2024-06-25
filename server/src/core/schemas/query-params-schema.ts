import { z } from 'zod'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const pageQueryParamSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  pageSize: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  allRecords: z.string().optional().default('false'),
})

export const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
