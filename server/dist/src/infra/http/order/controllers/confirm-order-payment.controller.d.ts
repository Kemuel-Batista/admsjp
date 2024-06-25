import { ParamsSchema } from '@/core/schemas/params-schema';
import { ConfirmOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/confirm-order-payment';
import { UserPayload } from '@/infra/auth/jwt.strategy';
export declare class ConfirmOrderPaymentController {
    private confirmOrderPayment;
    constructor(confirmOrderPayment: ConfirmOrderPaymentUseCase);
    handle(orderId: ParamsSchema, user: UserPayload): Promise<void>;
}
