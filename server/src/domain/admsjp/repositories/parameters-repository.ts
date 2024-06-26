import { Parameter, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

export abstract class ParametersRepository {
  abstract create(
    data: Prisma.ParameterUncheckedCreateInput,
  ): Promise<Parameter>

  abstract update(data: Parameter): Promise<Parameter>
  abstract list(options?: ListOptions): Promise<Parameter[]>
  abstract findById(id: Parameter['id']): Promise<Parameter | null>
  abstract findByKey(key: Parameter['key']): Promise<Parameter | null>
}
