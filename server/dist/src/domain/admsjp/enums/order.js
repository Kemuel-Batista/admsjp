"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.OrderPaymentMethod = void 0;
var OrderPaymentMethod;
(function (OrderPaymentMethod) {
    OrderPaymentMethod[OrderPaymentMethod["PIX"] = 0] = "PIX";
    OrderPaymentMethod[OrderPaymentMethod["CARD"] = 1] = "CARD";
    OrderPaymentMethod[OrderPaymentMethod["MANUAL"] = 2] = "MANUAL";
})(OrderPaymentMethod || (exports.OrderPaymentMethod = OrderPaymentMethod = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PENDING"] = 0] = "PENDING";
    OrderStatus[OrderStatus["WAITING_CONFIRMATION"] = 1] = "WAITING_CONFIRMATION";
    OrderStatus[OrderStatus["PAID"] = 10] = "PAID";
    OrderStatus[OrderStatus["REFUNDED"] = 20] = "REFUNDED";
    OrderStatus[OrderStatus["FAILED"] = 90] = "FAILED";
    OrderStatus[OrderStatus["CANCELED"] = 91] = "CANCELED";
    OrderStatus[OrderStatus["EXPIRED"] = 99] = "EXPIRED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
//# sourceMappingURL=order.js.map