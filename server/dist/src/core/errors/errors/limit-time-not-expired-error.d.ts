import { UseCaseError, UseCaseErrorProps } from '@/core/errors/use-case-error';
export declare class LimitTimeNotExpiredError extends Error implements UseCaseError {
    constructor({ errorKey, key }: UseCaseErrorProps);
}
