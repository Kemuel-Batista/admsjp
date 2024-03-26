import { UseCaseError } from '@/core/errors/use-case-error'

export class DepartmentAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Department with same "${identifier}" already exists.`)
  }
}
