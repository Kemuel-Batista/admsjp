/// <reference types="node" />
import { Order, User } from '@prisma/client';
import { Either } from '@/core/either';
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error';
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error';
import { OrderPaymentAlreadyCompletedError } from '@/core/errors/errors/order-payment-already-completed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { EventPurchasesRepository } from '../../repositories/event-purchases-repository';
import { OrdersRepository } from '../../repositories/orders-repository';
import { Uploader } from '../../storage/uploader';
interface CreateManualOrderPaymentUseCaseRequest {
    transactionId: Order['transactionId'];
    fileName: string;
    fileType: string;
    body: Buffer;
    paidBy: User['id'];
}
type CreateManualOrderPaymentUseCaseResponse = Either<InvalidAttachmentTypeError | ResourceNotFoundError | IncorrectAssociationError | OrderPaymentAlreadyCompletedError, null>;
export declare class CreateManualOrderPaymentUseCase {
    private ordersRepository;
    private eventPurchasesRepository;
    private uploader;
    constructor(ordersRepository: OrdersRepository, eventPurchasesRepository: EventPurchasesRepository, uploader: Uploader);
    execute({ transactionId, fileName, fileType, body, paidBy, }: CreateManualOrderPaymentUseCaseRequest): Promise<CreateManualOrderPaymentUseCaseResponse>;
}
export {};
