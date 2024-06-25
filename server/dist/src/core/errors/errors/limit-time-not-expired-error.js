"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitTimeNotExpiredError = void 0;
const i18n_1 = require("../../i18n/i18n");
class LimitTimeNotExpiredError extends Error {
    constructor({ errorKey, key }) {
        super(`${i18n_1.i18n.t(errorKey, { key })}.`);
    }
}
exports.LimitTimeNotExpiredError = LimitTimeNotExpiredError;
//# sourceMappingURL=limit-time-not-expired-error.js.map