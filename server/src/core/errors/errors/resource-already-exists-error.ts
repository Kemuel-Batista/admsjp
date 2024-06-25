import { UseCaseError, UseCaseErrorProps } from '@/core/errors/use-case-error'
import { i18n } from '@/core/i18n/i18n'

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor({ errorKey, key }: UseCaseErrorProps) {
    super(`${i18n.t(errorKey, { key })}`)
  }
}
