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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmOrderPaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const order_1 = require("../../enums/order");
const orders_repository_1 = require("../../repositories/orders-repository");
let ConfirmOrderPaymentUseCase = class ConfirmOrderPaymentUseCase {
    ordersRepository;
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }
    async execute({ id, confirmedBy, }) {
        const order = await this.ordersRepository.findById(id);
        if (!order) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'order.find.notFound',
                key: id.toString(),
            }));
        }
        order.confirmedBy = confirmedBy;
        order.status = order_1.OrderStatus.PAID;
        order.paidAt = new Date();
        await this.ordersRepository.update(order);
        return (0, either_1.success)(null);
    }
};
exports.ConfirmOrderPaymentUseCase = ConfirmOrderPaymentUseCase;
exports.ConfirmOrderPaymentUseCase = ConfirmOrderPaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository])
], ConfirmOrderPaymentUseCase);
//# sourceMappingURL=confirm-order-payment.js.map