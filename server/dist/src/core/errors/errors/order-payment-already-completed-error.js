"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPaymentAlreadyCompletedError = void 0;
const i18n_1 = require("../../i18n/i18n");
class OrderPaymentAlreadyCompletedError extends Error {
    constructor({ errorKey, key }) {
        super(`${i18n_1.i18n.t(errorKey, { key })}`);
    }
}
exports.OrderPaymentAlreadyCompletedError = OrderPaymentAlreadyCompletedError;
//# sourceMappingURL=order-payment-already-completed-error.js.map