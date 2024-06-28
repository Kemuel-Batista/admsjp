import { z } from 'zod'

export const departmentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('Department'),
])

export type DepartmentSubject = z.infer<typeof departmentSubject>
