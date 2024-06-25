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
exports.ListOrdersByTransactionIdController = void 0;
const common_1 = require("@nestjs/common");
const list_orders_by_transaction_id_1 = require("../../../../domain/admsjp/use-cases/orders/list-orders-by-transaction-id");
let ListOrdersByTransactionIdController = class ListOrdersByTransactionIdController {
    listOrdersByTransactionIdUseCase;
    constructor(listOrdersByTransactionIdUseCase) {
        this.listOrdersByTransactionIdUseCase = listOrdersByTransactionIdUseCase;
    }
    async handle(transactionId) {
        const result = await this.listOrdersByTransactionIdUseCase.execute({
            transactionId,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException();
        }
        const orders = result.value.orders;
        return {
            orders,
        };
    }
};
exports.ListOrdersByTransactionIdController = ListOrdersByTransactionIdController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('transactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListOrdersByTransactionIdController.prototype, "handle", null);
exports.ListOrdersByTransactionIdController = ListOrdersByTransactionIdController = __decorate([
    (0, common_1.Controller)('/transactions/:transactionId'),
    __metadata("design:paramtypes", [list_orders_by_transaction_id_1.ListOrdersByTransactionIdUseCase])
], ListOrdersByTransactionIdController);
//# sourceMappingURL=list-orders-by-transaction-id.controller.js.map