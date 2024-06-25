"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmOrderPaymentController = void 0;
const common_1 = require("@nestjs/common");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const params_schema_1 = require("../../../../core/schemas/params-schema");
const confirm_order_payment_1 = require("../../../../domain/admsjp/use-cases/orders/confirm-order-payment");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
let ConfirmOrderPaymentController = class ConfirmOrderPaymentController {
    confirmOrderPayment;
    constructor(confirmOrderPayment) {
        this.confirmOrderPayment = confirmOrderPayment;
    }
    async handle(orderId, user) {
        const result = await this.confirmOrderPayment.execute({
            id: orderId,
            confirmedBy: user.sub.id,
        });
        if (result.isError()) {
            const error = result.value;
            switch (error.constructor) {
                case resource_not_found_error_1.ResourceNotFoundError:
                    throw new common_1.NotFoundException(error.message);
                default:
                    throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.ConfirmOrderPaymentController = ConfirmOrderPaymentController;
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('orderId', params_schema_1.paramsValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ConfirmOrderPaymentController.prototype, "handle", null);
exports.ConfirmOrderPaymentController = ConfirmOrderPaymentController = __decorate([
    (0, common_1.Controller)('/confirm/:orderId'),
    __metadata("design:paramtypes", [confirm_order_payment_1.ConfirmOrderPaymentUseCase])
], ConfirmOrderPaymentController);
//# sourceMappingURL=confirm-order-payment.controller.js.map