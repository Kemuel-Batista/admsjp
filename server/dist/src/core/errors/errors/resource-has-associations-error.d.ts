import { UseCaseError, UseCaseErrorProps } from '@/core/errors/use-case-error';
export declare class ResourceHasAssociationsError extends Error implements UseCaseError {
    constructor({ errorKey, key }: UseCaseErrorProps);
}
