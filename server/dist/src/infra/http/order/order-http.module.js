"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHttpModule = void 0;
const common_1 = require("@nestjs/common");
const confirm_order_payment_1 = require("../../../domain/admsjp/use-cases/orders/confirm-order-payment");
const create_manual_order_payment_1 = require("../../../domain/admsjp/use-cases/orders/create-manual-order-payment");
const list_orders_by_transaction_id_1 = require("../../../domain/admsjp/use-cases/orders/list-orders-by-transaction-id");
const database_module_1 = require("../../database/database.module");
const storage_module_1 = require("../../storage/storage.module");
const confirm_order_payment_controller_1 = require("./controllers/confirm-order-payment.controller");
const create_manual_order_payment_controller_1 = require("./controllers/create-manual-order-payment.controller");
const list_orders_by_transaction_id_controller_1 = require("./controllers/list-orders-by-transaction-id.controller");
let OrderHttpModule = class OrderHttpModule {
};
exports.OrderHttpModule = OrderHttpModule;
exports.OrderHttpModule = OrderHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, storage_module_1.StorageModule],
        controllers: [
            create_manual_order_payment_controller_1.CreateManualOrderPaymentController,
            list_orders_by_transaction_id_controller_1.ListOrdersByTransactionIdController,
            confirm_order_payment_controller_1.ConfirmOrderPaymentController,
        ],
        providers: [
            create_manual_order_payment_1.CreateManualOrderPaymentUseCase,
            list_orders_by_transaction_id_1.ListOrdersByTransactionIdUseCase,
            confirm_order_payment_1.ConfirmOrderPaymentUseCase,
        ],
    })
], OrderHttpModule);
//# sourceMappingURL=order-http.module.js.map