import { UseCaseError, UseCaseErrorProps } from '@/core/errors/use-case-error';
export declare class OrderPaymentAlreadyCompletedError extends Error implements UseCaseError {
    constructor({ errorKey, key }: UseCaseErrorProps);
}
