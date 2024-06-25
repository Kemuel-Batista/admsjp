/// <reference types="multer" />
import { CreateManualOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/create-manual-order-payment';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class CreateManualOrderPaymentController {
    private createManualOrderPayment;
    constructor(createManualOrderPayment: CreateManualOrderPaymentUseCase);
    handle(file: Express.Multer.File, transactionId: string, user: UserPayload): Promise<void>;
}
