"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsSoldOutError = void 0;
const i18n_1 = require("../../i18n/i18n");
class TicketsSoldOutError extends Error {
    constructor({ errorKey, key }) {
        super(`${i18n_1.i18n.t(errorKey, { key })}.`);
    }
}
exports.TicketsSoldOutError = TicketsSoldOutError;
//# sourceMappingURL=tickets-sold-out-error.js.map