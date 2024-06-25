import { Order } from '@prisma/client';
import { Either } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { OrdersRepository } from '../../repositories/orders-repository';
interface ConfirmOrderPaymentUseCaseRequest {
    id: Order['id'];
    confirmedBy: Order['confirmedBy'];
}
type ConfirmOrderPaymentUseCaseResponse = Either<ResourceNotFoundError, null>;
export declare class ConfirmOrderPaymentUseCase {
    private ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    execute({ id, confirmedBy, }: ConfirmOrderPaymentUseCaseRequest): Promise<ConfirmOrderPaymentUseCaseResponse>;
}
export {};
