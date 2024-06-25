import { UseCaseError, UseCaseErrorProps } from '@/core/errors/use-case-error';
export declare class InvalidAttachmentTypeError extends Error implements UseCaseError {
    constructor({ errorKey, key }: UseCaseErrorProps);
}
