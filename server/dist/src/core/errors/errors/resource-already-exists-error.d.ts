import { UseCaseError, UseCaseErrorProps } from '@/core/errors/use-case-error';
export declare class ResourceAlreadyExistsError extends Error implements UseCaseError {
    constructor({ errorKey, key }: UseCaseErrorProps);
}
